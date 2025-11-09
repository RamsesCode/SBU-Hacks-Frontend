import React, { useState, useRef, useEffect } from 'react';
import { loadSessions } from '../services/sessionStorage';
import { chatWithAI } from '../services/aiService';
import './Chatbot.css';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your study assistant. I can help you with your lecture notes, assignments, and answer questions about what your professor said. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input when chatbot opens
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: input.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Load all saved sessions for context
      const sessions = loadSessions();
      
      // Get AI response
      const response = await chatWithAI(input.trim(), sessions);

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "What assignments did my professor mention?",
    "Summarize yesterday's lecture",
    "What topics have I covered this week?",
    "Help me review for the exam"
  ];

  const handleSuggestionClick = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  return (
    <div className="chatbot-overlay">
      <div className="chatbot-container">
        {/* Speech bubble tail pointing to figure */}
        <div className="chatbot-tail"></div>
        
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-title">
            <span className="chatbot-icon">🤖</span>
            <h3>Study Assistant</h3>
          </div>
          <button 
            className="chatbot-close" 
            onClick={onClose}
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chatbot-message ${message.isUser ? 'user' : 'ai'}`}
            >
              <div className="message-bubble">
                <p>{message.text}</p>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="chatbot-message ai">
              <div className="message-bubble loading">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions (show only if no messages yet) */}
        {messages.length === 1 && !isLoading && (
          <div className="chatbot-suggestions">
            <p className="suggestions-label">Try asking:</p>
            <div className="suggestion-buttons">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  className="suggestion-btn"
                  onClick={() => handleSuggestionClick(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="chatbot-input-container">
          <input
            ref={inputRef}
            type="text"
            className="chatbot-input"
            placeholder="Ask me about your lectures..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <button
            className="chatbot-send"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
