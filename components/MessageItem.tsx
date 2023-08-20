import { Message } from "@/typing"
import Image from "next/image";
import { text } from "stream/consumers";

type Props = {
    message: Message;
}

function MessageItem({message}:Props) {
    const isUser = true;
  return (
    <div className={`flex w-fit ${isUser && "ml-auto"}`}>
        <div className={`flex-shrink-0  ${isUser && "order-2"}`}>
            <Image
            className="rounded-full mx-2"
            height={10}
            width={50}
            src={message.profilePic}
            alt="Profile pic"
            />
        </div>

        <div>
            <p className={`text-[0.65rem] px-[2px] py-[2px] ${isUser ? "text-blue-400 text-right" : "text-red-400 text-right"}`}>{message.username}</p>

            <div className="flex items-end">
                <div className={`px-3 py-2 rounded-lg w-fit text-white  ${ isUser ? "bg-blue-400 ml-auto order-2 " : "bg-red-400"}`}>
                    <p>{message.message}</p>
                </div>
                <p className={`text-[0.65rem] px-[2px] italic text-gray-300 ${isUser &&" text-right"}`}>{new Date(message.created_at).toLocaleString()}</p>
            </div>
        </div>
    </div>
  )
}

export default MessageItem