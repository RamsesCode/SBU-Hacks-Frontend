import React from 'react';
import './PixelBackground.css';

const PixelBackground: React.FC = () => {
  return (
    <div className="pixel-scene" aria-hidden="true">
      {/* Platforms layer */}
      <div className="platforms" aria-hidden="true">
        <div className="platform p1" role="presentation"></div>
        <div className="platform p2" role="presentation"></div>
        <div className="platform p3" role="presentation"></div>
      </div>

      {/* Hero sprite */}
      <div className="hero" aria-hidden="true">
        <div className="pix"></div>
      </div>

      {/* Coins */}
      <div className="coin c1" aria-hidden="true"></div>
      <div className="coin c2" aria-hidden="true"></div>
      <div className="coin c3" aria-hidden="true"></div>
      <div className="coin c4" aria-hidden="true"></div>

      {/* Sparkles */}
      <div className="sparkle s1" aria-hidden="true"></div>
      <div className="sparkle s2" aria-hidden="true"></div>
      <div className="sparkle s3" aria-hidden="true"></div>
      <div className="sparkle s4" aria-hidden="true"></div>
      <div className="sparkle s5" aria-hidden="true"></div>
    </div>
  );
};

export default PixelBackground;