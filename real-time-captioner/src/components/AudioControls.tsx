import React from 'react';
import TroubleshootingTips from './TroubleshootingTips';
import './AudioControls.css';

interface AudioControlsProps {
  isListening: boolean;
  isSupported: boolean;
  onToggleListening: () => void;
  onClearCaptions: () => void;
  volume?: number;
  errorMessage?: string;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  isListening,
  isSupported,
  onToggleListening,
  onClearCaptions,
  volume = 0,
  errorMessage
}) => {
  if (!isSupported) {
    return (
      <div className="audio-controls error">
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <p>Speech recognition is not supported in this browser.</p>
          <p className="error-suggestion">
            Try using Chrome, Safari, or Edge for the best experience.
          </p>
        </div>
        <TroubleshootingTips />
      </div>
    );
  }

  return (
    <div className="audio-controls">
      <div className="controls-section">
        <button
          className={`mic-button ${isListening ? 'listening' : 'stopped'}`}
          onClick={onToggleListening}
          onMouseDown={(e) => {
            // Immediate visual feedback
            e.currentTarget.style.transform = 'scale(0.95)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = '';
          }}
          aria-label={isListening ? 'Stop listening' : 'Start listening'}
        >
          <span className="button-text">
            {isListening ? 'STOP' : 'START'}
          </span>
        </button>

        <button
          className="clear-button"
          onClick={onClearCaptions}
          aria-label="Clear all captions"
        >
          <span className="button-text">CLEAR</span>
        </button>
      </div>

      <div className="status-section">
        <div className={`status-indicator ${isListening ? 'active' : 'inactive'}`}>
          <div className="status-dot"></div>
          <span className="status-text">
            {isListening ? 'Listening...' : 'Stopped'}
          </span>
        </div>

        {isListening && (
          <div className="volume-indicator">
            <div className="volume-bars">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`volume-bar ${i < Math.floor(volume * 5) ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioControls;