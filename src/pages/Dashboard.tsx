import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  IconArrowLeft, 
  IconUser, 
  IconEdit, 
  IconClipboardList, 
  IconMapPin,
  IconSettings,
  IconHome,
  IconBookmark,
  IconShoppingCart
} from '@tabler/icons-react';
import bluePottery from '@/assets/blue-pottery.jpg';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { value: 35, label: 'Products', color: 'text-samhita-gold' },
    { value: 2000, label: 'Livelihoods', color: 'text-green-500' },
    { value: 27, label: 'Artforms', color: 'text-blue-500' }
  ];

  const menuItems = [
    { icon: IconEdit, label: 'Edit Profile', action: () => {} },
    { icon: IconClipboardList, label: 'Order History', action: () => {} },
    { icon: IconMapPin, label: 'Shipping Address', action: () => {} }
  ];

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${bluePottery})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/85"></div>
      
      <div className="relative z-10">
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

        <div className="px-4 pb-8 space-y-6">
          {/* Profile Section */}
          <div className="text-center text-white">
            <div className="w-20 h-20 bg-gradient-to-br from-samhita-gold to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-samhita-dark font-bold text-2xl">P</span>
            </div>
            <h1 className="text-2xl font-bold mb-1">Hi, Payal Arora</h1>
            <div className="flex items-center justify-center gap-1 text-white/80 text-sm">
              <IconMapPin className="h-4 w-4" />
              <span>D-2 JAHANPURI, NEW DELHI</span>
            </div>
            <p className="text-white/60 text-sm">ART ENTHUSIAST</p>
          </div>

          {/* Followers/Following */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
            <div className="grid grid-cols-2 gap-4 text-center text-white">
              <div>
                <p className="text-sm text-white/60">FOLLOWERS</p>
                <p className="text-xl font-bold">95</p>
              </div>
              <div>
                <p className="text-sm text-white/60">FOLLOWING</p>
                <p className="text-xl font-bold">100</p>
              </div>
            </div>
          </Card>

          {/* Swadeshi Points */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
            <div className="text-white">
              <p className="text-sm text-white/80 mb-2">YOU HAVE <span className="font-bold text-samhita-gold">300/500</span> SWADESHI POINTS</p>
              <Progress value={60} className="h-2 bg-white/20" />
            </div>
          </Card>

          {/* Impact Stats */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
            <div className="text-white mb-3">
              <p className="text-sm text-white/80">WITH YOUR HELP WE HAVE</p>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <span className="bg-green-500 w-2 h-2 rounded-full"></span>
                <span>1650 Impacted</span>
                <span className="bg-blue-500 w-2 h-2 rounded-full ml-4"></span>
                <span>Supported</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="text-white">
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-sm text-white/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Menu Items */}
          <div className="space-y-3">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={item.action}
                className="w-full justify-start text-white hover:bg-white/20 h-12 rounded-2xl"
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm border-t border-white/20 px-4 py-2 z-40">
        <div className="flex justify-around items-center">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2"
            onClick={() => navigate('/marketplace')}
          >
            <IconHome className="h-5 w-5 text-white/60" />
            <span className="text-xs text-white/60">Home</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2"
            onClick={() => navigate('/discover')}
          >
            <IconBookmark className="h-5 w-5 text-white/60" />
            <span className="text-xs text-white/60">Discover</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 p-2">
            <IconShoppingCart className="h-5 w-5 text-white/60" />
            <span className="text-xs text-white/60">Orders</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 p-2">
            <IconUser className="h-5 w-5 text-samhita-gold" />
            <span className="text-xs text-samhita-gold font-medium">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;