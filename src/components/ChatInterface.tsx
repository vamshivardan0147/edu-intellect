import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { SendHorizontal, GripVertical, Minimize2, Maximize2, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState({ x: window.innerWidth - 400, y: window.innerHeight - 550 });
  const [size, setSize] = useState({ width: 384, height: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! How can I help you with your learning journey today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const { toast } = useToast();
  const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number }>();
  const resizeRef = useRef<{ startX: number; startY: number; initialWidth: number; initialHeight: number }>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && dragRef.current) {
        const deltaX = e.clientX - dragRef.current.startX;
        const deltaY = e.clientY - dragRef.current.startY;
        
        setPosition({
          x: Math.min(Math.max(0, dragRef.current.initialX + deltaX), window.innerWidth - size.width),
          y: Math.min(Math.max(0, dragRef.current.initialY + deltaY), window.innerHeight - size.height),
        });
      }

      if (isResizing && resizeRef.current) {
        const deltaX = e.clientX - resizeRef.current.startX;
        const deltaY = e.clientY - resizeRef.current.startY;
        
        setSize({
          width: Math.min(Math.max(300, resizeRef.current.initialWidth + deltaX), window.innerWidth - position.x),
          height: Math.min(Math.max(400, resizeRef.current.initialHeight + deltaY), window.innerHeight - position.y),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, position.x, position.y, size.width, size.height]);

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y,
    };
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialWidth: size.width,
      initialHeight: size.height,
    };
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand your question. Let me help you with that...",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (isMinimized) {
      toast({
        title: "Chat window restored",
        duration: 2000,
      });
    }
  };

  if (isMinimized) {
    return (
      <Button
        className="fixed bottom-6 right-6 shadow-lg"
        onClick={toggleMinimize}
      >
        <Maximize2 className="h-4 w-4 mr-2" />
        Open Chat Assistant
      </Button>
    );
  }

  return (
    <Card 
      className="fixed shadow-xl flex flex-col animate-fade-in"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      <div 
        className="bg-primary p-4 text-white rounded-t-lg flex justify-between items-center cursor-grab"
        onMouseDown={handleDragStart}
      >
        <h3 className="font-semibold">AI Learning Assistant</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:text-white hover:bg-primary/90"
            onClick={toggleMinimize}
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <GripVertical className="h-4 w-4" />
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${
                msg.sender === 'user' 
                  ? 'ml-auto bg-primary text-white' 
                  : 'bg-white'
              } p-3 rounded-lg shadow-sm max-w-[80%]`}
            >
              {msg.content}
              <div className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-primary-foreground/80' : 'text-gray-500'}`}>
                {msg.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="bg-white p-3 rounded-lg shadow-sm w-16">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 bg-white border-t">
        <form className="flex gap-2" onSubmit={handleSendMessage}>
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
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
        onMouseDown={handleResizeStart}
        style={{
          transform: "translate(50%, 50%)",
        }}
      />
    </Card>
  );
};

export default ChatInterface;