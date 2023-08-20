'use client'

import { Message } from "@/typing"
import fetcher from "@/utils/fetchMessages"
import { FormEvent, useState } from "react"
import useSWR from "swr"
import {v4 as uuid} from "uuid"


function ChatInput() {
    const [input, setInput] = useState("")
    const {data: messages, error, mutate} = useSWR("/api/getMessages", fetcher)

    // console.log({messages});
    

    const addMessage = async( e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!input) return;
        const messageToSend = input;

        setInput("")
        const id = uuid();
        const message : Message = {
            id,
            message: messageToSend,
            created_at: Date.now(),
            username: 'Soumyadeep Nayak',
            profilePic:"https://scontent.fblr23-1.fna.fbcdn.net/v/t39.30808-6/366543401_6505075012920083_4773671698053064049_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ohIKWQfbV-YAX82Sh3x&_nc_ht=scontent.fblr23-1.fna&oh=00_AfDbWDRbKTgwU64h-KhitJvTs68Pd7SsEgbmYrEs3ecfUA&oe=64E64329",
            email:"soumyadeepnayak97@gmail.com"
        }
        
        const uploadMessageToUpstash=async () => {
            const res = await fetch('/api/addMessage',{
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({message})
            })
            const data = await res.json();
            return[data.message, ...messages!]
            
        }
        await mutate(uploadMessageToUpstash, {
            optimisticData:[message, ...messages!],
            rollbackOnError:true
        })
        // uploadMessageToUpstash()
    }

  return (
    <form 
    onSubmit={addMessage}
    className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-100 bg-white">
        <input type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a message..."
        className="flex-1 rounded border border-gray-300 focus:outline-none focus: ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"/>
        <button type='submit' 
        disabled={!input}
        className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"> Send </button>
    </form>
  )
}

export default ChatInput