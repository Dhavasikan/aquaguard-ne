import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import knowledgeBase from "./knowledgeBase";

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Hi! I'm your AquaGuard NE assistant. Ask me about diseases like cholera, typhoid, hepatitis A, diarrhea, or leptospirosis. I can also tell you about water quality, hygiene, ORS, and your live report/case stats. Try asking: 'How many pending cases?' or 'Tell me about cholera'.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const REPORTS_URL = "https://aquaguard-ne.onrender.com/api/reports";
  const WATER_URL = "https://aquaguard-ne.onrender.com/api/water";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const findDiseaseAnswer = (question) => {
    const lowerQ = question.toLowerCase();
    for (const entry of knowledgeBase) {
      for (const keyword of entry.keywords) {
        if (lowerQ.includes(keyword)) {
          let answer = `**${entry.disease}**\n\n${entry.summary}\n\n`;
          if (lowerQ.includes("symptom")) {
            answer = `**${entry.disease} - Symptoms:**\n${entry.symptoms}`;
          } else if (lowerQ.includes("prevent") || lowerQ.includes("avoid")) {
            answer = `**${entry.disease} - Prevention:**\n${entry.prevention}`;
          } else if (lowerQ.includes("treat") || lowerQ.includes("cure") || lowerQ.includes("medicine")) {
            answer = `**${entry.disease} - Treatment:**\n${entry.treatment}`;
          } else if (lowerQ.includes("doctor") || lowerQ.includes("help") || lowerQ.includes("emergency")) {
            answer = `**${entry.disease} - When to Seek Help:**\n${entry.whenToSeekHelp}`;
          } else {
            answer += `Symptoms: ${entry.symptoms}\n\nPrevention: ${entry.prevention}\n\nTreatment: ${entry.treatment}\n\nWhen to seek help: ${entry.whenToSeekHelp}`;
          }
          return answer;
        }
      }
    }
    return null;
  };

  const handleLiveDataQuestion = async (question) => {
    const lowerQ = question.toLowerCase();

    if (
      lowerQ.includes("pending") ||
      lowerQ.includes("resolved") ||
      lowerQ.includes("verified") ||
      lowerQ.includes("total") ||
      lowerQ.includes("how many case") ||
      lowerQ.includes("how many report")
    ) {
      try {
        const res = await axios.get(REPORTS_URL);
        const reports = res.data;
        const total = reports.length;
        const pending = reports.filter((r) => r.status === "PENDING").length;
        const verified = reports.filter((r) => r.status === "VERIFIED").length;
        const resolved = reports.filter((r) => r.status === "RESOLVED").length;

        if (lowerQ.includes("pending")) {
          return `There are currently **${pending}** pending case report(s) out of ${total} total.`;
        }
        if (lowerQ.includes("verified")) {
          return `There are currently **${verified}** verified case report(s) out of ${total} total.`;
        }
        if (lowerQ.includes("resolved")) {
          return `There are currently **${resolved}** resolved case report(s) out of ${total} total.`;
        }
        return `Total reports: ${total}\nPending: ${pending}\nVerified: ${verified}\nResolved: ${resolved}`;
      } catch (err) {
        return "Sorry, I couldn't fetch the live case report data right now.";
      }
    }

    if (lowerQ.includes("water quality") || lowerQ.includes("water reading") || lowerQ.includes("risk level")) {
      try {
        const res = await axios.get(WATER_URL);
        const readings = res.data;

        if (readings.length === 0) {
          return "There are no water quality readings recorded yet.";
        }

        const districtMatch = readings.find((r) =>
          lowerQ.includes(r.district ? r.district.toLowerCase() : "___none___")
        );

        if (districtMatch) {
          return `Latest reading for ${districtMatch.district}: ${districtMatch.sourceName} — pH ${districtMatch.ph}, Turbidity ${districtMatch.turbidity}, Risk: ${districtMatch.riskLevel}.`;
        }

        const highRisk = readings.filter(
          (r) => r.riskLevel && r.riskLevel.toLowerCase() === "high"
        );
        return `There are ${readings.length} water readings recorded. ${highRisk.length} of them are High Risk.`;
      } catch (err) {
        return "Sorry, I couldn't fetch the live water quality data right now.";
      }
    }

    return null;
  };

  const handleSend = async () => {
    const question = input.trim();
    if (!question) return;

    addMessage("user", question);
    setInput("");
    setLoading(true);

    const diseaseAnswer = findDiseaseAnswer(question);
    if (diseaseAnswer) {
      addMessage("bot", diseaseAnswer);
      setLoading(false);
      return;
    }

    const liveAnswer = await handleLiveDataQuestion(question);
    if (liveAnswer) {
      addMessage("bot", liveAnswer);
      setLoading(false);
      return;
    }

    try {
        const aiRes = await axios.post("https://aquaguard-ne.onrender.com/api/chat/ask", {
          question: question,
        });
        const aiText = aiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        addMessage("bot", aiText || "Sorry, I couldn't get an answer right now. Please try again.");
      } catch (err) {
        console.error("AI chat error:", err);
        addMessage(
          "bot",
          "I'm having trouble reaching the AI assistant right now. Try asking about a specific disease, water quality, or your live case/report stats."
        );
      }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const pageStyle = {
    padding: "30px",
    backgroundColor: "#0d2b1f",
    minHeight: "100vh",
    color: "#e6f4ea",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const chatCardStyle = {
    backgroundColor: "#123626",
    borderRadius: "12px",
    padding: "20px",
    width: "100%",
    maxWidth: "700px",
    display: "flex",
    flexDirection: "column",
    height: "70vh",
  };

  const messagesAreaStyle = {
    flex: 1,
    overflowY: "auto",
    marginBottom: "15px",
    paddingRight: "5px",
  };

  const bubbleStyle = (sender) => ({
    backgroundColor: sender === "user" ? "#2fb872" : "#1c4a33",
    color: sender === "user" ? "#0d2b1f" : "#e6f4ea",
    padding: "10px 15px",
    borderRadius: "12px",
    marginBottom: "10px",
    maxWidth: "80%",
    marginLeft: sender === "user" ? "auto" : "0",
    whiteSpace: "pre-wrap",
    lineHeight: "1.5",
  });

  const inputRowStyle = {
    display: "flex",
    gap: "10px",
  };

  const inputStyle = {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #2f6e4e",
    backgroundColor: "#0d2b1f",
    color: "#e6f4ea",
    fontSize: "14px",
  };

  const sendButtonStyle = {
    backgroundColor: "#2fb872",
    color: "#0d2b1f",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  return (
    <div style={pageStyle}>
      <h2 style={{ marginBottom: "5px" }}>💬 Health & Water Assistant</h2>
      <p style={{ color: "#8fd4ac", marginBottom: "20px" }}>
        Ask about diseases, prevention, water safety, or your live app data
      </p>

      <div style={chatCardStyle}>
        <div style={messagesAreaStyle}>
          {messages.map((msg, idx) => (
            <div key={idx} style={bubbleStyle(msg.sender)}>
              {msg.text}
            </div>
          ))}
          {loading && <div style={bubbleStyle("bot")}>Thinking...</div>}
          <div ref={chatEndRef} />
        </div>

        <div style={inputRowStyle}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button style={sendButtonStyle} onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;