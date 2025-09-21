import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import samhitaLogo from '@/assets/samhita-logo.png';

const Splash = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-samhita-navy via-samhita-dark to-samhita-navy-light flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-samhita-gold rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 border border-samhita-cream rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-8 w-16 h-16 border border-samhita-gold rounded-full animate-pulse delay-500"></div>
      </div>

      <div className={`text-center transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Logo */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <img 
              src={samhitaLogo} 
              alt="Samhita Logo"
              className="w-full h-full object-contain filter drop-shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-samhita-gold/20 to-transparent rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-5xl font-bold text-samhita-cream mb-4 tracking-wider">
          SAMHITA
        </h1>

        {/* Tagline */}
        <p className="text-samhita-cream/80 text-lg mb-2 font-light tracking-wide">
          Weaving Heritage,
        </p>
        <p className="text-samhita-cream/80 text-lg mb-12 font-light tracking-wide">
          Connecting Hands...
        </p>

        {/* CTA Button */}
        <Button
          onClick={handleGetStarted}
          className="bg-samhita-cream text-samhita-dark hover:bg-samhita-gold transition-all duration-300 rounded-full px-12 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Let's Begin!
        </Button>

        {/* Footer */}
        <div className="mt-16 text-samhita-cream/60 text-sm">
          <p>Empowering Indian Artisans</p>
          <p className="mt-1">🇮🇳 Made in India</p>
        </div>
      </div>
    </div>
  );
};

export default Splash;