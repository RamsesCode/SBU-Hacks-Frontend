import React from 'react';
import './Navbar.css';

interface NavbarProps {
  showDiagnostics: boolean;
  onToggleDiagnostics: () => void;
  onForceReset: () => void;
  onLogout?: () => void;
  userEmail?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  showDiagnostics,
  onToggleDiagnostics,
  onForceReset,
  onLogout,
  userEmail,
}) => {
  return (
    <header className="navbar">
      <h1 className="navbar-title">SpeakEasy</h1>
      <div className="navbar-controls">
        <button 
          className="navbar-button"
          onClick={() => {/* Navigate to home */}}
          aria-label="Home"
        >
          🏠 Home
        </button>
        <button 
          className="navbar-button"
          onClick={() => {/* Navigate to notes */}}
          aria-label="Notes"
        >
          📝 Notes
        </button>
        <button 
          className="navbar-button"
          onClick={onToggleDiagnostics}
          aria-label="Toggle diagnostics"
        >
          � Debug
        </button>
        {showDiagnostics && (
          <button 
            className="navbar-button navbar-button-danger"
            onClick={onForceReset}
            aria-label="Force reset application"
          >
            🔄 Reset
          </button>
        )}
        {onLogout && (
          <button
            className="navbar-button navbar-button-logout"
            onClick={onLogout}
            aria-label="Log out"
          >
            🚪 Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;