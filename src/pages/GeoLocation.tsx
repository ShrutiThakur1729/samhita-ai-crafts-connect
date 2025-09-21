import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  IconArrowLeft, 
  IconMapPin, 
  IconStar,
  IconEye,
  IconHome,
  IconBookmark,
  IconUser,
  IconShoppingCart
} from '@tabler/icons-react';

const GeoLocation = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const location = {
    name: "Dilli Haat",
    subtitle: "INA Market, Dilli Haat INA, Aurobindo Marg",
    description: "Traditional crafts and cultural market"
  };

  const featuredProducts = [
    {
      id: 1,
      name: "Ramadan's Wood Toys",
      rating: 4.8,
      reviews: 23,
      price: "₹450",
      artisan: "Mohammad Ramadan",
      location: "Delhi",
      category: "Woodwork"
    }
  ];

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"><defs><pattern id="market" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"><rect width="100" height="100" fill="%23e11d48"/><circle cx="50" cy="50" r="20" fill="%23f59e0b" opacity="0.7"/><rect x="30" y="30" width="40" height="40" fill="%23059669" opacity="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(%23market)"/></svg>')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between p-4 pt-12">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/events')}
            className="text-white hover:bg-white/20"
          >
            <IconArrowLeft className="h-5 w-5" />
          </Button>
          <div className="w-8 h-8 bg-white/20 rounded-full"></div>
        </header>

        {/* Location Header */}
        <div className="px-4 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <IconMapPin className="h-5 w-5 text-samhita-gold" />
            <span className="text-white/80 text-sm">Current Location</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{location.name}</h1>
          <p className="text-white/70 text-sm">{location.subtitle}</p>
        </div>

        {/* Market Description */}
        <div className="px-4 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-samhita-gold to-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                <IconMapPin className="h-6 w-6 text-samhita-dark" />
              </div>
              <div className="text-white">
                <h3 className="font-bold text-lg mb-2">Delhi's Cultural Hub</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Dilli Haat is a vibrant marketplace showcasing traditional crafts, 
                  handloom products, and authentic cuisine from across India. 
                  Experience the rich cultural heritage and support local artisans.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Featured Crafts */}
        <div className="px-4 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Featured Crafts at this Location</h2>
          
          {featuredProducts.map((product) => (
            <Card 
              key={product.id}
              className="bg-white/90 backdrop-blur-sm border-white/30 p-6 mb-4 cursor-pointer hover:bg-white/95 transition-all"
              onClick={() => setSelectedProduct(product.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">by {product.artisan}</p>
                  <div className="flex items-center gap-1 mb-2">
                    <IconStar className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconMapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{product.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{product.price}</p>
                  <span className="inline-block bg-samhita-gold text-samhita-dark text-xs font-bold px-2 py-1 rounded-full mt-1">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1 bg-samhita-gold hover:bg-yellow-600 text-samhita-dark font-semibold"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${product.id}`);
                  }}
                >
                  <IconEye className="h-4 w-4 mr-2" />
                  VIEW MORE
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Nearby Locations */}
        <div className="px-4 pb-20">
          <h2 className="text-xl font-bold text-white mb-4">Other Craft Locations Nearby</h2>
          
          <div className="space-y-3">
            {[
              { name: "Khan Market", distance: "2.3 km", crafts: "Textiles, Jewelry" },
              { name: "Karol Bagh", distance: "5.1 km", crafts: "Leather goods, Accessories" },
              { name: "Chandni Chowk", distance: "8.7 km", crafts: "Traditional wear, Spices" }
            ].map((location, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 p-4 hover:bg-white/20 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="text-white">
                    <h3 className="font-semibold">{location.name}</h3>
                    <p className="text-sm text-white/70">{location.crafts}</p>
                  </div>
                  <div className="text-right text-white">
                    <p className="text-sm font-medium">{location.distance}</p>
                    <p className="text-xs text-white/60">away</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
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
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2"
            onClick={() => navigate('/discover')}
          >
            <IconBookmark className="h-5 w-5 text-white/60" />
            <span className="text-xs text-white/60">Discover</span>
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

export default GeoLocation;