import redis from '@/redis';
import { Message } from '@/typing';
import {NextResponse} from 'next/server'

export async function GET(request:Request) {
    // todos in the body of the POST req

    const messagesResp = await redis.hvals('messages')
    const messages: Message[] = messagesResp.map((message) => JSON.parse(message)).sort((a, b) => b.created_at - a.created_at)
    
    return NextResponse.json({messages})
    
}