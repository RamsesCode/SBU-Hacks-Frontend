import React, { useState, useEffect } from 'react';
import './ChatbotTrigger.css';

const ChatbotTrigger: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showAutoTooltip, setShowAutoTooltip] = useState(false);

  useEffect(() => {
    // Start the timer after 15 seconds
    const startTimer = setTimeout(() => {
      setShowAutoTooltip(true);
      
      // Hide after 5 seconds
      const hideTimer = setTimeout(() => {
        setShowAutoTooltip(false);
      }, 5000);

      // Set up interval to repeat every 15 seconds
      const interval = setInterval(() => {
        setShowAutoTooltip(true);
        
        // Hide after 5 seconds
        setTimeout(() => {
          setShowAutoTooltip(false);
        }, 5000);
      }, 15000);

      return () => {
        clearTimeout(hideTimer);
        clearInterval(interval);
      };
    }, 15000);

    return () => {
      clearTimeout(startTimer);
    };
  }, []);

  const handleClick = () => {
    // TODO: Add chatbox opening logic here
    console.log('Chatbot clicked!');
  };

  const showTooltip = isHovered || showAutoTooltip;

  return (
    <div 
      className={`chatbot-trigger ${isHovered ? 'hover' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
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
      {showTooltip && (
        <div className="chatbot-tooltip">
          Chat with me!
        </div>
      )}
    </div>
  );
};

export default ChatbotTrigger;
