import React, { useState } from 'react';
import './Landing.css';

interface LandingProps {
  onLogin: (email: string) => void;
  onCreateAccount?: () => void;
}

const Landing: React.FC<LandingProps> = ({ onLogin, onCreateAccount }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: {email?: string; password?: string} = {};
    if (!email) e.email = 'COMM CHANNEL REQUIRED!';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'INVALID CHANNEL FORMAT!';
    if (!password) e.password = 'SECRET CODE REQUIRED!';
    else if (password.length < 6) e.password = 'CODE TOO WEAK!';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(email);
    }, 800);
  };

  return (
    <div className="landing-root">
      <div className="container">
        <div className="pixel-corner pixel-corner-tl" />
        <div className="pixel-corner pixel-corner-tr" />
        <div className="pixel-corner pixel-corner-bl" />
        <div className="pixel-corner pixel-corner-br" />

        <h1 className="title">SPEAKEASY LOGIN<span className="pixel-cursor" /></h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">COMMUNICATION CHANNEL (EMAIL):</label>
            <div className="input-wrapper">
              <input
                id="email"
                className={`input-box ${errors.email ? 'input-error' : ''}`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <div className="focus-effect" />
            </div>
            <div className="error-message" style={{opacity: errors.email ? 1 : 0}}>{errors.email || ' '}</div>
          </div>

          <div className="form-group">
            <label htmlFor="password">SECRET CODE (PASSWORD):</label>
            <div className="input-wrapper">
              <input
                id="password"
                className={`input-box ${errors.password ? 'input-error' : ''}`}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <div className="focus-effect" />
            </div>
            <div className="error-message" style={{opacity: errors.password ? 1 : 0}}>{errors.password || ' '}</div>
          </div>

          <button type="submit" disabled={loading}>{loading ? 'INITIALIZING…' : 'LOG IN'}</button>
        </form>
        <button className="link-like" onClick={onCreateAccount}>CREATE NEW ACCOUNT</button>
        
        <div className="divider">
          <span>OR CONNECT VIA</span>
        </div>
        
        <div className="social-buttons">
          <button 
            type="button" 
            className="social-btn social-btn-google"
            onClick={() => alert('Google Auth not yet implemented')}
          >
            <span className="social-icon">G</span>
            SIGN IN WITH GOOGLE
          </button>
          <button 
            type="button" 
            className="social-btn social-btn-linkedin"
            onClick={() => alert('LinkedIn Auth not yet implemented')}
          >
            <span className="social-icon">in</span>
            SIGN IN WITH LINKEDIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
