import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { SendHorizontal } from "lucide-react";

const ChatInterface = () => {
  const [message, setMessage] = useState("");

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl flex flex-col">
      <div className="bg-primary p-4 text-white rounded-t-lg">
        <h3 className="font-semibold">AI Learning Assistant</h3>
      </div>
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            Hello! How can I help you with your learning journey today?
          </div>
        </div>
      </div>
      <div className="p-4 bg-white border-t">
        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default ChatInterface;