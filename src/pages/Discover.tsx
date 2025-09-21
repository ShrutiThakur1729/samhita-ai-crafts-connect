import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  IconArrowLeft, 
  IconHome,
  IconBookmark,
  IconUser,
  IconShoppingCart,
  IconSettings
} from '@tabler/icons-react';

const Discover = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-samhita-dark text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 pt-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/marketplace')}
          className="text-white hover:bg-white/20"
        >
          <IconArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="p-2 text-white">
            <IconSettings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="px-4 pb-20">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Discover</h1>
          <p className="text-samhita-gold text-lg font-medium">THE FORGOTTEN ARTFORMS OF INDIA</p>
          <p className="text-white/80 text-sm mt-4 leading-relaxed">
            Art in India is evolving and spreading its wings. One has potential to reach much greater heights.
          </p>
        </div>

        {/* India Map Section */}
        <Card className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-amber-100 to-amber-200 p-8 mb-8">
          <div className="relative">
            {/* Stylized India Map */}
            <div className="relative w-full h-96 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <svg viewBox="0 0 400 500" className="w-full h-full">
                  <defs>
                    <pattern id="traditional-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="2" fill="#d97706" opacity="0.3"/>
                      <path d="M10 20 L30 20 M20 10 L20 30" stroke="#d97706" strokeWidth="0.5" opacity="0.2"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#traditional-pattern)"/>
                </svg>
              </div>
              
              {/* India Map Silhouette */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-60 h-80">
                  <svg viewBox="0 0 200 300" className="w-full h-full">
                    {/* Simplified India outline */}
                    <path 
                      d="M100 50 Q120 40 140 60 Q160 80 150 120 Q145 140 155 160 Q160 180 140 200 Q120 220 100 210 Q80 200 70 180 Q60 160 65 140 Q50 120 60 100 Q70 80 80 60 Q90 45 100 50 Z"
                      fill="#1a1a1a"
                      className="drop-shadow-lg"
                    />
                    {/* State boundaries */}
                    <path 
                      d="M100 80 Q110 85 120 95 M90 120 Q95 125 100 130 M110 150 Q115 155 125 160 M85 170 Q90 175 95 180"
                      stroke="#4a4a4a"
                      strokeWidth="1"
                      fill="none"
                    />
                    {/* Craft region dots */}
                    <circle cx="120" cy="100" r="3" fill="#f59e0b" />
                    <circle cx="85" cy="130" r="3" fill="#f59e0b" />
                    <circle cx="110" cy="170" r="3" fill="#f59e0b" />
                    <circle cx="130" cy="140" r="3" fill="#f59e0b" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Featured Artforms */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Featured Artforms</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'Blue Pottery', region: 'Rajasthan', color: 'bg-blue-500' },
              { name: 'Madhubani', region: 'Bihar', color: 'bg-red-500' },
              { name: 'Warli Art', region: 'Maharashtra', color: 'bg-green-500' },
              { name: 'Kalamkari', region: 'Andhra Pradesh', color: 'bg-purple-500' }
            ].map((art, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 p-4 hover:bg-white/20 transition-colors cursor-pointer">
                <div className={`w-8 h-8 ${art.color} rounded-full mb-3`}></div>
                <h3 className="font-semibold text-white">{art.name}</h3>
                <p className="text-sm text-white/70">{art.region}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Regional Stories */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Regional Stories</h2>
          <Card className="bg-gradient-to-r from-samhita-gold/20 to-yellow-400/20 border-samhita-gold/30 p-6">
            <h3 className="font-bold text-samhita-gold mb-2">The Golden Thread of Gujarat</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Discover the intricate world of Gujarati embroidery, where every stitch tells a story 
              of tradition passed down through generations of skilled artisans.
            </p>
            <Button 
              variant="ghost" 
              className="mt-4 text-samhita-gold hover:bg-samhita-gold/20"
              size="sm"
            >
              Read More
            </Button>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-white/20 px-4 py-2 z-40">
        <div className="flex justify-around items-center">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2"
            onClick={() => navigate('/marketplace')}
          >
            <IconHome className="h-5 w-5 text-white/60" />
            <span className="text-xs text-white/60">Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 p-2">
            <IconBookmark className="h-5 w-5 text-samhita-gold" />
            <span className="text-xs text-samhita-gold font-medium">Discover</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2"
            onClick={() => navigate('/events')}
          >
            <IconShoppingCart className="h-5 w-5 text-white/60" />
            <span className="text-xs text-white/60">Events</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2"
            onClick={() => navigate('/dashboard')}
          >
            <IconUser className="h-5 w-5 text-white/60" />
            <span className="text-xs text-white/60">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Discover;