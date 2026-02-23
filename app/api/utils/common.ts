import type { NextRequest } from 'next/server'
import { ChatClient } from 'dify-client'
import { v4 } from 'uuid'
import { API_KEY, API_URL, APP_ID, APP_INFO } from '@/config'

const userPrefix = `user_${APP_ID}:`

export const getInfo = (request: NextRequest) => {
  // 1. استخراج الآي دي مال المستخدم من Clerk
  let clerkUserId = ''
  const sessionToken = request.cookies.get('__session')?.value
  
  if (sessionToken) {
    try {
      // فك تشفير التوكن مال Clerk عشان نطلع الآي دي بدون ما نكسر باقي ملفات Dify
      const payloadBase64 = sessionToken.split('.')[1]
      const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf-8'))
      if (payload && payload.sub) {
        clerkUserId = payload.sub // هذا هو الـ userId مال Clerk!
      }
    } catch (e) {
      console.error('Error decoding Clerk session', e)
    }
  }

  // 2. إذا مسجل دخول بـ Clerk، نستخدم الآي دي ماله.. وإذا لأ، نستخدم الكوكي العادي
  const sessionId = clerkUserId || request.cookies.get('session_id')?.value || v4()
  const user = userPrefix + sessionId
  
  return {
    sessionId,
    user,
  }
}

export const setSession = (sessionId: string) => {
  if (APP_INFO.disable_session_same_site)
  { return { 'Set-Cookie': `session_id=${sessionId}; SameSite=None; Secure` } }

  return { 'Set-Cookie': `session_id=${sessionId}` }
}

export const client = new ChatClient(API_KEY, API_URL || undefined)
