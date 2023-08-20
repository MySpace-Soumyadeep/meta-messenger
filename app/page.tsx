import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";

export default function HomePage() {
  return (
    <main>
      {/* message list */}
      <MessageList/>

      {/* chat input */}
      <ChatInput/>
    </main>
  )
}
