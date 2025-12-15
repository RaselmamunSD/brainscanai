import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const faqData: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    answer: "Hello! I'm the Brain Cancer Detection System assistant. How can I help you? You can ask me about brain tumors, MRI scans, or our AI system."
  },
  {
    keywords: ["brain tumor", "tumor", "what is tumor"],
    answer: "A brain tumor is an abnormal growth of cells in the brain. There are two types: Benign (non-cancerous) and Malignant (cancerous). Common types include: Glioma, Meningioma, and Pituitary tumors. Early detection is crucial for successful treatment."
  },
  {
    keywords: ["glioma"],
    answer: "Glioma is the most common malignant brain tumor. It originates from glial cells. Severity is determined by grade - from Grade I to Grade IV. Grade IV (Glioblastoma) is the most aggressive form."
  },
  {
    keywords: ["meningioma"],
    answer: "Meningioma originates from the brain's covering (meninges). In most cases, it's benign and grows slowly. It's usually completely removable through surgery with a good prognosis."
  },
  {
    keywords: ["pituitary"],
    answer: "Pituitary tumors occur in the pituitary gland. They can affect hormone production. Most pituitary tumors are benign and treatable. Symptoms include vision problems and hormonal changes."
  },
  {
    keywords: ["mri", "scan", "imaging"],
    answer: "MRI (Magnetic Resonance Imaging) is the most effective method for brain tumor detection. Our system can analyze T1, T2, FLAIR, and T1ce type MRIs. It's non-invasive and radiation-free."
  },
  {
    keywords: ["symptoms", "signs", "warning"],
    answer: "Common brain tumor symptoms: 1) Headaches (especially in morning), 2) Nausea, 3) Vision problems, 4) Balance issues, 5) Memory problems, 6) Seizures, 7) Personality changes. Consult a doctor immediately if you experience these symptoms."
  },
  {
    keywords: ["treatment", "therapy", "cure"],
    answer: "Brain tumor treatments include: 1) Surgery - tumor removal, 2) Radiation therapy, 3) Chemotherapy, 4) Targeted therapy, 5) Immunotherapy. Treatment depends on tumor type, location, and grade."
  },
  {
    keywords: ["how", "use", "upload", "work"],
    answer: "To use our system: 1) Go to 'Upload MRI' page, 2) Upload your MRI image (JPG, PNG, DICOM), 3) Click 'Analyze' button, 4) Get AI analysis results in seconds. Grad-CAM visualization shows which areas were detected."
  },
  {
    keywords: ["accuracy", "reliable", "correct"],
    answer: "Our AI model has approximately 95% average accuracy. However, remember this is for research and educational purposes only. Always consult a specialist doctor for final diagnosis."
  },
  {
    keywords: ["grad-cam", "gradcam", "visualization", "heatmap"],
    answer: "Grad-CAM (Gradient-weighted Class Activation Mapping) is an explainable AI technology. It shows which part of the MRI image the AI model focused on to make its decision. In the heatmap: Red = high importance, Blue = low importance."
  },
  {
    keywords: ["team", "who", "developers"],
    answer: "Our team consists of an experienced supervisor and 5 dedicated researchers. We specialize in medical imaging and deep learning. Visit the 'Team' page for more details."
  },
  {
    keywords: ["thank", "thanks"],
    answer: "You're welcome! Feel free to ask if you have any more questions. Stay healthy! 🙏"
  },
  {
    keywords: ["ai", "model", "deep learning", "neural network"],
    answer: "Our system uses a Convolutional Neural Network (CNN) trained on thousands of MRI images. The model can classify four categories: Glioma, Meningioma, Pituitary tumor, and No Tumor. We use transfer learning with state-of-the-art architectures."
  },
  {
    keywords: ["safe", "safety", "radiation"],
    answer: "MRI scans are completely safe and use no radiation. They use magnetic fields and radio waves. However, inform your doctor if you have metal implants, pacemakers, or are pregnant before getting an MRI."
  },
  {
    keywords: ["diagnosis", "result", "report"],
    answer: "After uploading your MRI, you'll receive: 1) Tumor classification result, 2) Confidence percentage, 3) Tumor grade (if applicable), 4) Grad-CAM heatmap visualization. Remember: This is for educational purposes - always consult a doctor."
  },
  {
    keywords: ["prevention", "prevent", "avoid"],
    answer: "While brain tumors can't always be prevented, you can reduce risk by: 1) Avoiding excessive radiation exposure, 2) Maintaining a healthy lifestyle, 3) Regular health checkups, 4) Avoiding known carcinogens, 5) Protecting head from injuries."
  },
  {
    keywords: ["stage", "stages", "grade"],
    answer: "Brain tumor grades: Grade I - Slow growing, benign. Grade II - Slow growing, can become malignant. Grade III - Malignant, faster growing. Grade IV - Most aggressive, rapidly growing. Grade affects treatment options and prognosis."
  },
  {
    keywords: ["cost", "price", "free"],
    answer: "Our Brain Cancer Detection System is completely free to use for research and educational purposes. Simply upload your MRI image and get instant AI analysis at no cost."
  },
  {
    keywords: ["contact", "support", "help"],
    answer: "For support or questions, you can: 1) Use this chatbot, 2) Visit the Team page for contact info, 3) Check our Analytics page for model performance details. We're here to help!"
  }
];

const defaultResponse = "Sorry, I didn't understand your question. You can ask about brain tumors, MRI, symptoms, treatment, or our system. For example: 'What is a brain tumor?', 'How do I use it?', 'What is Glioma?'";

const getResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  for (const faq of faqData) {
    if (faq.keywords.some(keyword => lowerInput.includes(keyword.toLowerCase()))) {
      return faq.answer;
    }
  }
  
  return defaultResponse;
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Typing indicator component
const TypingIndicator = () => (
  <div className="flex items-start gap-2">
    <div className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10">
      <Bot className="h-4 w-4 text-primary" />
    </div>
    <div className="bg-muted p-3 rounded-2xl rounded-tl-none">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
      </div>
    </div>
  </div>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm the Brain Cancer Detection System assistant. Feel free to ask me anything about brain tumors, MRI scans, or our AI system.",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getResponse(userInput),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000 + Math.random() * 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        text: "Hello! I'm the Brain Cancer Detection System assistant. Feel free to ask me anything about brain tumors, MRI scans, or our AI system.",
        isBot: true,
        timestamp: new Date()
      }
    ]);
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full medical-gradient shadow-lg hover:shadow-xl transition-all duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[380px] h-[500px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border medical-gradient rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-foreground">Brain AI Assistant</h3>
              <p className="text-xs text-primary-foreground/80">Always ready to help</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearChat}
              className="text-primary-foreground hover:bg-white/20"
              title="Clear chat"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-1">
                <div
                  className={`flex items-start gap-2 ${message.isBot ? '' : 'flex-row-reverse'}`}
                >
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isBot ? 'bg-primary/10' : 'bg-secondary'
                    }`}
                  >
                    {message.isBot ? (
                      <Bot className="h-4 w-4 text-primary" />
                    ) : (
                      <User className="h-4 w-4 text-secondary-foreground" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                      message.isBot
                        ? 'bg-muted text-foreground rounded-tl-none'
                        : 'medical-gradient text-primary-foreground rounded-tr-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
                <div className={`text-[10px] text-muted-foreground ${message.isBot ? 'ml-10' : 'mr-10 text-right'}`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            ))}
            {isTyping && <TypingIndicator />}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="medical-gradient"
              disabled={!inputValue.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
