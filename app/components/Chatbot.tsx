"use client";

import { useState } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const quickReplies = [
    { text: "Care Services", response: "We offer domiciliary care, live-in care, respite care, and specialist care. Would you like to know more about any specific service?" },
    { text: "Work With Us", response: "We're always looking for qualified nurses, care assistants, and support workers. Visit our Work For Us page or click Register to apply." },
    { text: "Contact Info", response: "Call us 24/7 at 0203 441 5474 or email info@reach-healthcare.com. Our office is at Business Design Centre, 52 Upper Street, London N1 0QH." },
    { text: "Book Assessment", response: "Great! We offer free, no-obligation care assessments. Please call us at 0203 441 5474 or visit our Contact page to schedule." },
  ];

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, sender: "user" }]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Replace with your API endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: messages }),
      });
      
      if (!response.ok) throw new Error("API request failed");
      
      const data = await response.json();
      setMessages(prev => [...prev, { text: data.response || data.message, sender: "bot" }]);
    } catch (error) {
      console.error("Chat error:", error);
      // Fallback to local response
      const fallbackResponse = getResponse(userMessage);
      setMessages(prev => [...prev, { text: fallbackResponse, sender: "bot" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getResponse = (msg: string) => {
    const lower = msg.toLowerCase();
    if (lower.includes("care") || lower.includes("service")) return "We provide domiciliary care, live-in care, children & young people care, hospital to home, respite care, end of life care, supported living, and specialist care. Which would you like to know more about?";
    if (lower.includes("work") || lower.includes("job") || lower.includes("recruit")) return "We're recruiting nurses, care assistants, and support workers. We offer flexible hours, competitive pay, and great benefits. Visit our Work For Us page to learn more!";
    if (lower.includes("contact") || lower.includes("phone") || lower.includes("email")) return "You can reach us 24/7 at 0203 441 5474 or email info@reach-healthcare.com. We're here to help!";
    if (lower.includes("price") || lower.includes("cost")) return "Our pricing varies based on your specific care needs. Please contact us for a free assessment and personalized quote.";
    if (lower.includes("location") || lower.includes("where")) return "We're based in London at Business Design Centre, 52 Upper Street, Islington, N1 0QH. We provide services across the UK.";
    return "I'd be happy to help! You can ask about our care services, job opportunities, or contact information. Or call us at 0203 441 5474 for immediate assistance.";
  };

  const handleQuickReply = (reply: { text: string; response: string }) => {
    setMessages(prev => [...prev, { text: reply.text, sender: "user" }, { text: reply.response, sender: "bot" }]);
  };

  return (
    <>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} style={{ position: "fixed", bottom: 24, right: 24, width: 60, height: 60, borderRadius: "50%", background: "#0984e3", color: "#fff", border: "none", boxShadow: "0 4px 20px rgba(9,132,227,0.4)", cursor: "pointer", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div style={{ position: "fixed", bottom: 24, right: 24, width: 380, maxWidth: "calc(100vw - 48px)", height: 550, maxHeight: "calc(100vh - 100px)", background: "#fff", borderRadius: 16, boxShadow: "0 8px 40px rgba(0,0,0,0.15)", zIndex: 1000, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          
          <div style={{ background: "linear-gradient(135deg, #0a4d7c 0%, #0984e3 100%)", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div>
                <p style={{ margin: 0, color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>Reach Healthcare</p>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.8)", fontSize: "0.75rem" }}>We're here to help</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 4 }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "75%", padding: "10px 14px", borderRadius: 12, background: msg.sender === "user" ? "#0984e3" : "#f0f7ff", color: msg.sender === "user" ? "#fff" : "#2c2c2c", fontSize: "0.9rem", lineHeight: 1.5 }}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ padding: "10px 14px", borderRadius: 12, background: "#f0f7ff", display: "flex", gap: 4 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0984e3", animation: "pulse 1.4s ease-in-out infinite" }} />
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0984e3", animation: "pulse 1.4s ease-in-out 0.2s infinite" }} />
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0984e3", animation: "pulse 1.4s ease-in-out 0.4s infinite" }} />
                </div>
              </div>
            )}
            
            {messages.length === 1 && !isLoading && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                {quickReplies.map((reply, i) => (
                  <button key={i} onClick={() => handleQuickReply(reply)} style={{ padding: "8px 14px", borderRadius: 20, background: "#fff", border: "1px solid #0984e3", color: "#0984e3", fontSize: "0.85rem", cursor: "pointer", fontWeight: 600, transition: "all 0.2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#0984e3"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#fff"; (e.currentTarget as HTMLButtonElement).style.color = "#0984e3"; }}>
                    {reply.text}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ padding: "12px 16px", borderTop: "1px solid #e4edf7", display: "flex", gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === "Enter" && handleSend()} placeholder="Type your message..." style={{ flex: 1, padding: "10px 14px", border: "1px solid #ddd", borderRadius: 20, outline: "none", fontSize: "0.9rem", color: "#000" }} />
            <button onClick={handleSend} style={{ width: 40, height: 40, borderRadius: "50%", background: "#0984e3", color: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
