import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { IconLanguage, IconChevronDown, IconMicrophone } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import samhitaLogo from '@/assets/samhita-logo.png';
import craftBackground from '@/assets/craft-background.jpg';

const UserSelection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' }
  ];

  useEffect(() => {
    if (user) {
      navigate('/marketplace');
    }
  }, [user, navigate]);

  const handleLanguageChange = (lang: typeof languages[0]) => {
    setSelectedLanguage(lang.name);
    i18n.changeLanguage(lang.code);
    setShowLanguageDropdown(false);
  };

  const handleBuyerSelect = () => {
    navigate('/auth?type=buyer');
  };

  const handleSellerSelect = () => {
    navigate('/auth?type=seller');
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
      
      <div className="relative z-10 flex flex-col h-screen">
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="relative mb-6">
            <button 
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white hover:bg-white/20 transition-colors"
            >
              <IconLanguage className="h-5 w-5" />
              <span className="text-sm">{selectedLanguage}</span>
              <IconChevronDown className="h-4 w-4" />
            </button>
            
            {showLanguageDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang)}
                    className="w-full text-left px-4 py-3 hover:bg-samhita-gold/10 text-gray-700 transition-colors"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 mb-4">
            <IconMicrophone className="h-8 w-8 text-samhita-gold" />
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-lg">SAMHITA</h1>
            <p className="text-samhita-cream/90 text-lg">{t('tagline')}</p>
          </div>

          <div className="w-full max-w-sm space-y-4">
            <Button
              onClick={handleBuyerSelect}
              className="w-full py-6 text-xl font-bold bg-samhita-cream text-samhita-dark hover:bg-samhita-gold rounded-2xl shadow-2xl"
            >
              {t('buyer')}
            </Button>
            <Button
              onClick={handleSellerSelect}
              className="w-full py-6 text-xl font-bold bg-samhita-gold text-samhita-dark hover:bg-yellow-400 rounded-2xl shadow-2xl"
            >
              {t('seller')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
