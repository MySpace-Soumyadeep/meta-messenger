import { serverPusher } from '@/pusher';
import redis from '@/redis';
import {NextResponse} from 'next/server'

export async function POST(request:Request) {
    // todos in the body of the POST req
    const { message } = await request.json();

    const newMsg = {
        ...message, created_at:Date.now()
    }

    await redis.hset('messages', message.id, JSON.stringify(newMsg))
    serverPusher.trigger("messages", "new-message", newMsg)
    
    return NextResponse.json({message: newMsg})
    
}