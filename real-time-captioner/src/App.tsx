import React, { useState, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CaptionDisplay from './components/CaptionDisplay';
import AudioControls from './components/AudioControls';
import Settings from './components/Settings';
import Diagnostics from './components/Diagnostics';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Notes from './components/Notes';
import ChatbotTrigger from './components/ChatbotTrigger';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { Caption, CaptionSettings } from './types/speech';
import './App.css';

const defaultSettings: CaptionSettings = {
  fontSize: 32,
  fontFamily: 'Arial',
  backgroundColor: 'transparent',
  textColor: '#ffffff',
  maxLines: 8,
  autoScroll: true,
  showConfidence: false,
  language: 'en-US',
  enableTranslation: false,
};

function App() {
  const { isAuthenticated, isLoading, user, logout } = useAuth0();
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [settings, setSettings] = useState<CaptionSettings>(defaultSettings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'notes'>('home');

  const handleResult = useCallback((caption: Caption) => {
    setCaptions(prev => {
      // Only keep final results to avoid duplicates
      if (caption.isFinal) {
        // Remove any interim results and add the final one
        const withoutInterim = prev.filter(c => c.isFinal);
        return [...withoutInterim, caption];
      } else {
        // For interim results, replace the last interim result
        const finalResults = prev.filter(c => c.isFinal);
        return [...finalResults, caption];
      }
    });
    // Clear any previous error when we get successful results
    setErrorMessage('');
  }, []);

  const handleError = useCallback((error: string) => {
    console.error('Speech recognition error:', error);
    setErrorMessage(error);
    // Clear error after 10 seconds
    setTimeout(() => setErrorMessage(''), 10000);
  }, []);

  const {
    isListening,
    isSupported,
    toggleListening,
  } = useSpeechRecognition({
    continuous: true,
    interimResults: true,
    language: settings.language,
    onResult: handleResult,
    onError: handleError,
  });

  // Add keyboard shortcut for quick stop (Spacebar)
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only if spacebar is pressed and we're not typing in an input
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        if (isListening) {
          toggleListening(); // Stop immediately on spacebar
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isListening, toggleListening]);

  const clearCaptions = useCallback(() => {
    setCaptions([]);
  }, []);

  const handleSettingsChange = useCallback((newSettings: CaptionSettings) => {
    setSettings(newSettings);
  }, []);

  const handleLogout = useCallback(() => {
    // Clear sensitive state (captions) on logout for privacy
    clearCaptions();
    logout({ logoutParams: { returnTo: window.location.origin } });
  }, [clearCaptions, logout]);

  // Show loading state while Auth0 is checking authentication
  if (isLoading) {
    return (
      <div className="App" style={{ fontFamily: settings.fontFamily }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh',
          color: 'white',
          fontSize: '24px'
        }}>
          Loading...
        </div>
      </div>
    );
  }

  // Render landing page when not authenticated
  if (!isAuthenticated) {
    return (
      <div className="App" style={{ fontFamily: settings.fontFamily }}>
        <Landing onLogin={() => {}} onCreateAccount={() => {}} />
      </div>
    );
  }

  return (
    <div className="App" style={{ fontFamily: settings.fontFamily }}>
      {/* Background removed as requested */}
      <Navbar
        showDiagnostics={showDiagnostics}
        onToggleDiagnostics={() => setShowDiagnostics(!showDiagnostics)}
        onForceReset={() => window.location.reload()}
        onLogout={handleLogout}
        userName={user?.name || user?.nickname || user?.given_name || 'User'}
        onNavigateHome={() => setCurrentPage('home')}
        onNavigateNotes={() => setCurrentPage('notes')}
      />
      {/* Pixel frame overlay that expands to the browser edges between navbar and controls */}
      <div className="pixel-frame" aria-hidden="true" />

      {currentPage === 'notes' ? (
        <Notes />
      ) : (
        <>
          <main className="app-main">
            {errorMessage && (
              <div className="error-banner">
                <span className="error-icon">⚠️</span>
                <span className="error-text">{errorMessage}</span>
                <button
                  className="error-close"
                  onClick={() => setErrorMessage('')}
                  aria-label="Close error message"
                >
                  ×
                </button>
              </div>
            )}
            {showDiagnostics && <Diagnostics isVisible={showDiagnostics} />}
            {showDiagnostics && (
              <div style={{
                position: 'fixed',
                top: '120px',
                right: '20px',
                background: 'rgba(0,0,0,0.8)',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
                fontSize: '12px',
                zIndex: 1000
              }}>
                <div>Is Listening: {isListening ? 'YES' : 'NO'}</div>
                <div>Is Supported: {isSupported ? 'YES' : 'NO'}</div>
                <div>Total Captions: {captions.length}</div>
                <div>Last Caption: {captions[captions.length - 1]?.text?.substring(0, 30) || 'None'}</div>
              </div>
            )}
            <CaptionDisplay
              captions={captions}
              fontSize={settings.fontSize}
              backgroundColor={settings.backgroundColor}
              textColor={settings.textColor}
              autoScroll={settings.autoScroll}
              isListening={isListening}
            />
          </main>

          <AudioControls
            isListening={isListening}
            isSupported={isSupported}
            onToggleListening={toggleListening}
            onClearCaptions={clearCaptions}
            errorMessage={errorMessage}
          />

          <Settings
            settings={settings}
            onSettingsChange={handleSettingsChange}
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
          />

          <ChatbotTrigger />
        </>
      )}
    </div>
  );
}

export default App;
