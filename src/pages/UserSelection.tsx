import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { IconMicrophone, IconLanguage, IconChevronDown } from '@tabler/icons-react';
import craftBackground from '@/assets/craft-background.jpg';

const UserSelection = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('US ENGLISH');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const languages = [
    'US ENGLISH',
    'हिंदी (Hindi)',
    'मराठी (Marathi)',
    'বাংলা (Bengali)',
    'தமிழ் (Tamil)',
    'తెలుగు (Telugu)',
    'ગુજરાતી (Gujarati)',
  ];

  const handleBuyerSelect = () => {
    navigate('/marketplace');
  };

  const handleSellerSelect = () => {
    navigate('/seller-onboarding');
  };

  return (
    <div 
      className="min-h-screen relative flex flex-col"
      style={{
        backgroundImage: `url(${craftBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-6 pt-12">
          <div className="w-8"></div>
          
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/30 hover:bg-white/30 transition-all"
            >
              <IconLanguage className="h-4 w-4" />
              <span className="text-sm font-medium">{selectedLanguage}</span>
              <IconChevronDown className={`h-4 w-4 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showLanguageDropdown && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 min-w-48 z-20">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setShowLanguageDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg text-gray-800 text-sm font-medium"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Voice Input Icon */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 shadow-2xl animate-pulse">
              <IconMicrophone className="h-12 w-12 text-white" />
            </div>
          </div>

          {/* App Name */}
          <div className="mb-4 flex items-center gap-2">
            <h1 className="text-white text-2xl font-bold tracking-wider">SAMHITA</h1>
            <div className="w-6 h-6 bg-gradient-to-br from-samhita-gold to-yellow-400 rounded transform rotate-45"></div>
          </div>

          {/* Main Tagline */}
          <h2 className="text-4xl font-bold text-white mb-16 leading-tight">
            <span className="italic">Rediscover India's lost</span><br />
            <span className="italic">treasures.</span>
          </h2>
        </div>

        {/* User Type Selection */}
        <div className="px-6 pb-8 space-y-4">
          <Button
            onClick={handleBuyerSelect}
            className="w-full bg-samhita-cream text-samhita-dark hover:bg-white transition-all duration-300 rounded-2xl py-6 text-xl font-bold shadow-lg hover:shadow-xl"
          >
            BUYER
          </Button>

          <Button
            onClick={handleSellerSelect}
            variant="outline"
            className="w-full bg-transparent text-white border-2 border-white hover:bg-white hover:text-samhita-dark transition-all duration-300 rounded-2xl py-6 text-xl font-bold"
          >
            SELLER (ARTISAN)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;