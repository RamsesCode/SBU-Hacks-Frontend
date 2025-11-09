import React, { useState, useEffect } from 'react';
import Chatbot from './Chatbot';
import './ChatbotTrigger.css';

const ChatbotTrigger: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showAutoTooltip, setShowAutoTooltip] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // Don't show tooltip if chat is open
    if (isChatOpen) {
      setShowAutoTooltip(false);
      return;
    }

    // Start the timer after 15 seconds
    const startTimer = setTimeout(() => {
      if (!isChatOpen) {
        setShowAutoTooltip(true);
        
        // Hide after 5 seconds
        const hideTimer = setTimeout(() => {
          setShowAutoTooltip(false);
        }, 5000);

        // Set up interval to repeat every 15 seconds
        const interval = setInterval(() => {
          if (!isChatOpen) {
            setShowAutoTooltip(true);
            
            // Hide after 5 seconds
            setTimeout(() => {
              setShowAutoTooltip(false);
            }, 5000);
          }
        }, 15000);

        return () => {
          clearTimeout(hideTimer);
          clearInterval(interval);
        };
      }
    }, 15000);

    return () => {
      clearTimeout(startTimer);
    };
  }, [isChatOpen]);

  const handleClick = () => {
    setIsChatOpen(true);
    setShowAutoTooltip(false);
    setIsHovered(false);
  };

  const handleClose = () => {
    setIsChatOpen(false);
  };

  const showTooltip = isHovered || showAutoTooltip;

  return (
    <>
      <div 
        className={`chatbot-trigger ${isHovered ? 'hover' : ''} ${isChatOpen ? 'chat-open' : ''}`}
        onClick={handleClick}
        onMouseEnter={() => !isChatOpen && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        aria-label="Open chatbot"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <img 
          src="/chatbot-figure.png" 
          alt="Chatbot assistant" 
          className="chatbot-figure"
        />
        {showTooltip && !isChatOpen && (
          <div className="chatbot-tooltip">
            Chat with me!
          </div>
        )}
      </div>
      
      {isChatOpen && <Chatbot onClose={handleClose} />}
    </>
  );
};

export default ChatbotTrigger;
