import React from 'react';
import { Caption } from '../types/speech';
import './CaptionDisplay.css';

interface CaptionDisplayProps {
  captions: Caption[];
  fontSize?: number;
  maxLines?: number;
  showConfidence?: boolean;
  backgroundColor?: string;
  textColor?: string;
  autoScroll?: boolean;
}

const CaptionDisplay: React.FC<CaptionDisplayProps> = ({
  captions,
  fontSize = 24,
  maxLines = 8,
  showConfidence = false,
  backgroundColor = '#000000',
  textColor = '#ffffff',
  autoScroll = true
}) => {
  const [visibleCaptions, setVisibleCaptions] = React.useState<Caption[]>([]);

  // Auto-remove captions after 15 seconds and limit to fewer lines for better positioning
  React.useEffect(() => {
    const now = new Date();
    const fifteenSecondsAgo = new Date(now.getTime() - 15000);
    
    // Filter out captions older than 15 seconds and only keep final results
    const filtered = captions.filter(caption => 
      caption.timestamp > fifteenSecondsAgo && caption.isFinal
    );
    
    // Add the latest interim result if it exists
    const latestInterim = captions.find(caption => !caption.isFinal);
    if (latestInterim) {
      filtered.push(latestInterim);
    }
    
    // Limit to maximum 4 lines to prevent overflow and ensure current caption is visible
    setVisibleCaptions(filtered.slice(-Math.min(maxLines, 4)));
  }, [captions, maxLines]);

  // Auto-clean old captions every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const fifteenSecondsAgo = new Date(now.getTime() - 15000);
      
      setVisibleCaptions(prev => 
        prev.filter(caption => caption.timestamp > fifteenSecondsAgo)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getAgeOpacity = (timestamp: Date, position: string): number => {
    const now = new Date();
    const age = now.getTime() - timestamp.getTime();
    const maxAge = 15000; // 15 seconds
    
    // Current caption always has full opacity
    if (position === 'current') return 1;
    
    if (age >= maxAge) return 0;
    if (age <= 3000) return 0.9; // High opacity for first 3 seconds
    
    // Fade from 0.9 to 0.4 over the remaining 12 seconds
    const fadeProgress = (age - 3000) / 12000;
    return Math.max(0.4, 0.9 - (fadeProgress * 0.5));
  };

  const getCaptionPosition = (index: number, total: number): string => {
    if (total === 1) return 'current';
    if (index === total - 1) return 'current'; // Latest caption is current (bottom)
    return 'older'; // Older captions move up
  };

  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 0.8) return '#4CAF50'; // Green - high confidence
    if (confidence >= 0.6) return '#FF9800'; // Orange - medium confidence
    return '#F44336'; // Red - low confidence
  };



  return (
    <div 
      id="caption-container"
      className="caption-display karaoke-style"
      style={{
        backgroundColor,
        color: textColor,
        fontSize: `${fontSize}px`
      }}
    >
      {visibleCaptions.length === 0 ? (
        <div className="no-captions">
          <p>Ready to capture speech...</p>
          <p className="subtitle">Click the microphone button to start</p>
        </div>
      ) : (
        <div className="captions-container">
          {visibleCaptions.map((caption: Caption, index: number) => {
            const position = getCaptionPosition(index, visibleCaptions.length);
            const opacity = getAgeOpacity(caption.timestamp, position);
            
            return (
              <div 
                key={caption.id} 
                className={`caption-line karaoke-caption ${caption.isFinal ? 'final' : 'interim'} ${position}`}
                style={{
                  opacity,
                  borderLeft: showConfidence 
                    ? `4px solid ${getConfidenceColor(caption.confidence)}` 
                    : 'none',
                  transform: position === 'current' ? 'scale(1.2)' : 'scale(0.9)',
                  fontWeight: position === 'current' ? 'bold' : 'normal'
                }}
              >
                <div className="caption-content">
                  <span className="caption-text">{caption.text}</span>
                  {showConfidence && (
                    <span 
                      className="confidence-indicator"
                      style={{ color: getConfidenceColor(caption.confidence) }}
                    >
                      {Math.round(caption.confidence * 100)}%
                    </span>
                  )}
                </div>
                {!caption.isFinal && position === 'current' && (
                  <div className="typing-indicator">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CaptionDisplay;