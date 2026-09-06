import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Trash2, Sparkles, Brain, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import api from "@/services/api";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Typing indicator component
const TypingIndicator = () => (
  <div className="flex items-start gap-2 animate-fade-in">
    <div className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10 border border-primary/20">
      <Bot className="h-4 w-4 text-primary animate-pulse" />
    </div>
    <div className="bg-muted p-3.5 rounded-2xl rounded-tl-none border border-border">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  </div>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I am your TumorMultiNetAI Clinical Intelligence Assistant. Ask me anything about brain MRI scans, tumor classifications (Glioma, Meningioma, Pituitary), or Grad-CAM explainability.",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Close on Escape key or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        isOpen &&
        chatWindowRef.current &&
        !chatWindowRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    const userMessage: Message = {
      id: Date.now(),
      text: userText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Format previous messages for Gemini context
    const history = messages.slice(-5).map((m) => ({
      role: m.isBot ? "model" : "user",
      text: m.text,
    }));

    try {
      const reply = await api.sendChatMessage(userText, history);
      const botResponse: Message = {
        id: Date.now() + 1,
        text: reply,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "I am having trouble connecting to the medical intelligence assistant right now. Please check your network connection and try again.",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        text: "Chat cleared. Feel free to ask me anything about brain tumors, MRI modalities, or Grad-CAM AI.",
        isBot: true,
        timestamp: new Date(),
      },
    ]);
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Backdrop for easy tap-to-close on mobile and desktop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Floating Trigger / Toggle Button */}
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 h-14 w-14 rounded-full medical-gradient shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
        size="icon"
        title={isOpen ? "Close Assistant" : "Open AI Medical Assistant"}
        aria-label={isOpen ? "Close Assistant" : "Open AI Medical Assistant"}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-primary-foreground animate-in spin-in-180 duration-200" />
        ) : (
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
        )}
      </Button>

      {/* Floating Chat Window */}
      <div
        ref={chatWindowRef}
        className={`fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[calc(100dvh-7rem)] h-[540px] bg-card/95 backdrop-blur-2xl border-2 border-primary/30 rounded-3xl shadow-2xl flex flex-col transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-border/80 medical-gradient rounded-t-[22px] text-primary-foreground">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner shrink-0">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-xs sm:text-sm leading-none">TumorMultiNetAI</h3>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/25 font-semibold">Neural AI</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-primary-foreground/85 mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                Online & Ready
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearChat}
              className="h-8 w-8 text-primary-foreground hover:bg-white/20 rounded-lg shrink-0"
              title="Clear conversation"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 px-2.5 bg-white/20 hover:bg-white/30 text-primary-foreground rounded-lg flex items-center gap-1 text-xs font-semibold shadow-xs cursor-pointer shrink-0"
              title="Close chat window"
            >
              <X className="h-4 w-4" />
              <span>Close</span>
            </Button>
          </div>
        </div>

        {/* Messages List */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-1">
                <div className={`flex items-start gap-2.5 ${message.isBot ? "" : "flex-row-reverse"}`}>
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                      message.isBot
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {message.isBot ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                  </div>
                  <div
                    className={`max-w-[78%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                      message.isBot
                        ? "bg-muted text-foreground rounded-tl-none border border-border/80"
                        : "medical-gradient text-primary-foreground rounded-tr-none font-medium"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
                <div className={`text-[10px] text-muted-foreground ${message.isBot ? "ml-10" : "mr-10 text-right"}`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            ))}
            {isTyping && <TypingIndicator />}
          </div>
        </ScrollArea>

        {/* Input Bar */}
        <div className="p-3.5 border-t border-border/80 bg-card/80 rounded-b-[22px]">
          <div className="flex items-center gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask anything about MRI or tumors..."
              className="flex-1 bg-background text-xs sm:text-sm h-10 rounded-xl"
              disabled={isTyping}
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="medical-gradient h-10 w-10 shrink-0 rounded-xl shadow-md"
              disabled={!inputValue.trim() || isTyping}
            >
              {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-2">
            AI screening decision support • TumorMultiNet Intelligence Engine
          </p>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
