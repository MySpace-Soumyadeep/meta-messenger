'use client'

import fetcher from "@/utils/fetchMessages"
import useSWR from "swr"
import MessageItem from "./MessageItem"
import { useEffect } from "react"
import { clientPusher } from "@/pusher"
import { Message } from "@/typing"

function MessageList() {
    const {data: messages, error, mutate} = useSWR("/api/getMessages", fetcher)

    useEffect(() => {
        
      const channel = clientPusher.subscribe("messages")
      channel.bind('new-message', async(data:Message) => {
        if(!messages){
            mutate(fetcher)
        }
        else{
            if(messages?.find((message) => message.id === data.id)) return;
            mutate(fetcher, {
                optimisticData: [data, ...messages!],
                rollbackOnError: true,
            })
        }
      })
      return () => {
        channel.unbind_all()
        channel.unsubscribe();
      }
    }, [messages, mutate, clientPusher])
    
  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
        {
            messages?.map(msg => (
                <MessageItem key={msg.id} message={msg}/>
            ))
        }
    </div>
  )
}

export default MessageList