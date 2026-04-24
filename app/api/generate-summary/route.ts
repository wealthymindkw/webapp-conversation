import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { client } from '@/app/api/utils/common'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  const internalKey = request.headers.get('X-Internal-Key')
  if (internalKey !== process.env.INTERNAL_API_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { conversation_id?: string; user_id?: string }
  try {
    body = await request.json()
  }
  catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { conversation_id, user_id } = body
  if (!conversation_id || !user_id) {
    return NextResponse.json({ error: 'conversation_id and user_id are required' }, { status: 400 })
  }

  let messages: any[] = []
  try {
    const { data }: any = await client.getConversationMessages(user_id, conversation_id)
    messages = data || []
  }
  catch (error: any) {
    return NextResponse.json({ error: `Failed to fetch messages: ${error.message}` }, { status: 500 })
  }

  if (messages.length === 0) {
    return NextResponse.json({ summary: 'لا توجد رسائل في هذه المحادثة.' })
  }

  const conversationText = messages
    .map((msg: any) => {
      const parts = []
      if (msg.query)
        parts.push(`العميل: ${msg.query}`)
      if (msg.answer)
        parts.push(`المساعد: ${msg.answer}`)
      return parts.join('\n')
    })
    .join('\n\n')

  let summary: string
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `أنت مساعد متخصص في تلخيص محادثات المبيعات. لخّص المحادثة التالية بشكل مختصر ومفيد للفريق المبيعات (الكلوزر).

اذكر في الملخص:
- اهتمامات العميل الرئيسية
- نقاط الألم أو المشكلات التي يواجهها
- مستوى الاهتمام والجدية
- أي معلومات مهمة ذكرها العميل (الميزانية، التوقيت، الظروف)
- التوصية: هل هذا العميل جاهز للإغلاق؟

المحادثة:
${conversationText}

الملخص:`,
        },
      ],
    })
    summary = (response.content[0] as any).text
  }
  catch (error: any) {
    return NextResponse.json({ error: `Failed to generate summary: ${error.message}` }, { status: 500 })
  }

  return NextResponse.json({ summary })
}
