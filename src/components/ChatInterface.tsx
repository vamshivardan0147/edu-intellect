import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { SendHorizontal, GripVertical } from "lucide-react";

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState({ x: window.innerWidth - 400, y: window.innerHeight - 550 });
  const [size, setSize] = useState({ width: 384, height: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number }>();
  const resizeRef = useRef<{ startX: number; startY: number; initialWidth: number; initialHeight: number }>();

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

  return (
    <Card 
      className="fixed shadow-xl flex flex-col"
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
        <GripVertical className="h-4 w-4" />
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