import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { API_KEY, API_URL } from '@/config'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface DifyMessage {
  query: string
  answer: string
  created_at: number
}

export async function POST(request: NextRequest) {
  // Auth check - n8n must send X-Internal-Key header
  const secret = request.headers.get('x-internal-key')
  const expectedSecret = process.env.INTERNAL_API_SECRET
  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let conversation_id: string
  let user_id: string

  try {
    const body = await request.json()
    conversation_id = body.conversation_id
    user_id = body.user_id
  }
  catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!conversation_id || !user_id) {
    return NextResponse.json({ error: 'conversation_id and user_id are required' }, { status: 400 })
  }

  // Fetch conversation messages from Dify API
  let messages: DifyMessage[] = []
  try {
    const difyRes = await fetch(
      `${API_URL}/messages?conversation_id=${conversation_id}&user=${encodeURIComponent(user_id)}&limit=100`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    )
    if (!difyRes.ok) {
      const errorText = await difyRes.text()
      console.error('Dify API error:', difyRes.status, errorText)
      return NextResponse.json({ error: 'Failed to fetch conversation from Dify' }, { status: 502 })
    }
    const data = await difyRes.json()
    messages = (data.data || []).reverse() // Dify returns newest first
  }
  catch (err) {
    console.error('Error fetching from Dify:', err)
    return NextResponse.json({ error: 'Failed to reach Dify API' }, { status: 502 })
  }

  if (messages.length === 0) {
    return NextResponse.json({ error: 'No messages found for this conversation' }, { status: 404 })
  }

  // Format conversation text for Claude
  const conversationText = messages
    .map(msg => `المستخدم: ${msg.query}\n\nحمد AI: ${msg.answer}`)
    .join('\n\n---\n\n')

  // Generate summary with Claude
  let summary: string
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      system: `أنت محلل متخصص في تحليل محادثات العملاء المحتملين لبرامج التطوير الشخصي والمالي.
مهمتك: تحليل المحادثة وتقديم ملخص دقيق ومفيد للكلوزر (فريق المبيعات) باللغة العربية.
كن موضوعياً وركز على المعلومات التي تساعد الكلوزر على بناء علاقة وإتمام البيع.`,
      messages: [
        {
          role: 'user',
          content: `حلل هذه المحادثة بين المستخدم وبوت حمد AI، وأعطني ملخصاً منظماً للكلوزر:

${conversationText}

قدم الملخص بهذا الشكل بالضبط:

👤 **الوضع الحالي:** [وصف موجز لوضع الشخص المالي أو الحياتي]

💔 **نقاط الألم:** [المشاكل والتحديات التي ذكرها الشخص بوضوح]

🎯 **أهدافه:** [ما يريد تحقيقه أو تغييره في حياته]

🔥 **مستوى الاستعداد للتغيير:** [عالي / متوسط / منخفض] — [سبب تقييمك]

💬 **أبرز ما قاله:** [اقتباس أو فكرة مهمة تدل على وضعه أو جاهزيته]

📋 **توصية للكلوزر:** [كيف يتعامل معه، ما يركز عليه، ما يتجنبه]`,
        },
      ],
    })

    summary = response.content[0].type === 'text' ? response.content[0].text : ''
  }
  catch (err) {
    console.error('Error calling Claude API:', err)
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 502 })
  }

  return NextResponse.json({
    success: true,
    conversation_id,
    message_count: messages.length,
    summary,
  })
}
