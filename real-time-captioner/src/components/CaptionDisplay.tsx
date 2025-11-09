import React from 'react';
import { Caption } from '../types/speech';
import { useLanguage } from '../contexts/LanguageContext';
import './CaptionDisplay.css';

interface CaptionDisplayProps {
  captions: Caption[];
  fontSize?: number;
  backgroundColor?: string;
  textColor?: string;
  autoScroll?: boolean;
  isListening?: boolean;
}

const CaptionDisplay: React.FC<CaptionDisplayProps> = ({
  captions,
  fontSize = 24,
  backgroundColor = '#000000',
  textColor = '#ffffff',
  autoScroll = true,
  isListening = false
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const isDualLanguage = language !== 'en';

  // Keep ALL captions - no auto-removal, just manage final vs interim
  const visibleCaptions = React.useMemo(() => {
    // Keep all final results
    const finalResults = captions.filter(c => c.isFinal);
    
    // Add the latest interim result if it exists
    const latestInterim = captions.find(caption => !caption.isFinal);
    if (latestInterim) {
      return [...finalResults, latestInterim];
    }
    
    return finalResults;
  }, [captions]);

  // Debug logging
  React.useEffect(() => {
    console.log('📝 CaptionDisplay - Total captions:', captions.length);
    console.log('📝 CaptionDisplay - Visible captions:', visibleCaptions.length);
    console.log('📝 CaptionDisplay - Captions:', visibleCaptions);
  }, [captions, visibleCaptions]);

  // Auto-scroll to bottom when new captions arrive
  React.useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleCaptions, autoScroll]);

  return (
    <div 
      id="caption-container"
      className={`caption-display notes-style ${isDualLanguage ? 'dual-language' : ''}`}
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
        <>
          {!isListening && (
            <div className="paused-indicator" style={{
              textAlign: 'center',
              padding: '8px',
              fontSize: '14px',
              opacity: 0.6,
              fontStyle: 'italic',
              position: 'sticky',
              top: 0,
              zIndex: 100,
              backgroundColor: 'rgba(0,0,0,0.7)'
            }}>
              Stopped - Click CLEAR to reset or START to continue
            </div>
          )}
          {isDualLanguage ? (
            <div className="dual-language-container" ref={containerRef}>
              <div className="language-column english-column">
                <div className="language-header">English</div>
                <div className="language-captions">
                  {visibleCaptions.map((caption: Caption, index: number) => {
                    const isLast = index === visibleCaptions.length - 1;
                    
                    return (
                      <span 
                        key={`en-${caption.id}`} 
                        className={`notes-caption ${caption.isFinal ? 'final' : 'interim'}`}
                      >
                        <span className="caption-text">
                          {caption.text}
                          {isLast && !caption.isFinal && <span className="pixel-cursor" />}
                        </span>
                        {' '}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="language-column translation-column">
                <div className="language-header">Translation</div>
                <div className="language-captions">
                  {visibleCaptions.map((caption: Caption, index: number) => {
                    const isLast = index === visibleCaptions.length - 1;
                    
                    return (
                      <span 
                        key={`tr-${caption.id}`} 
                        className={`notes-caption ${caption.isFinal ? 'final' : 'interim'}`}
                      >
                        <span className="caption-text">
                          {caption.translatedText || '...'}
                          {isLast && !caption.isFinal && caption.translatedText && <span className="pixel-cursor" />}
                        </span>
                        {' '}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="captions-scrollable-container" ref={containerRef}>
              {visibleCaptions.map((caption: Caption, index: number) => {
                const isLast = index === visibleCaptions.length - 1;
                
                return (
                  <span 
                    key={caption.id} 
                    className={`notes-caption ${caption.isFinal ? 'final' : 'interim'}`}
                  >
                    <span className="caption-text">
                      {caption.text}
                      {isLast && !caption.isFinal && <span className="pixel-cursor" />}
                    </span>
                    {' '}
                  </span>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CaptionDisplay;