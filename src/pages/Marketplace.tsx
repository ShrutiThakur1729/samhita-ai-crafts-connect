import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  IconSearch, 
  IconMapPin, 
  IconUser, 
  IconShoppingCart,
  IconHome,
  IconBookmark,
  IconSettings,
  IconStar
} from '@tabler/icons-react';
import bluePottery from '@/assets/blue-pottery.jpg';
import woodenToy from '@/assets/wooden-toy.jpg';

const Marketplace = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { icon: IconHome, label: 'Decor' },
    { icon: IconSettings, label: 'Crafting' },
    { icon: IconBookmark, label: 'Jewelry' },
    { icon: IconStar, label: 'Paintings' },
    { icon: IconUser, label: 'Kitchen' },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Jaipur Blue Pottery Vase',
      price: '₹2,500',
      rating: 4.8,
      reviews: 23,
      artisan: 'Ramesh Kumar',
      location: 'Jaipur, Rajasthan',
      image: bluePottery,
      tag: 'Bestseller'
    },
    {
      id: 2,
      name: 'Channapatna Wooden Toy',
      price: '₹850',
      rating: 4.9,
      reviews: 45,
      artisan: 'Lakshmi Devi',
      location: 'Channapatna, Karnataka',
      image: woodenToy,
      tag: 'Trending'
    }
  ];

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <IconMapPin className="h-5 w-5 text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Your current location</p>
              <p className="font-semibold text-gray-900">D-2 Vasant Kunj, New Delhi</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="p-2">
              <IconSearch className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2"
              onClick={() => navigate('/cart')}
            >
              <IconShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back,</h1>
            <p className="text-2xl font-bold text-gray-900">Payal.</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-samhita-gold to-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-samhita-dark font-bold text-lg">P</span>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-8">
        {/* Search Bar */}
        <div className="relative">
          <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your product..."
            className="pl-10 py-3 rounded-xl border-gray-300 focus:border-samhita-gold focus:ring-samhita-gold"
          />
        </div>

        {/* Categories */}
        <div className="flex justify-between items-center">
          {categories.map((category, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <category.icon className="h-6 w-6 text-gray-600" />
              </div>
              <span className="text-xs font-medium text-gray-700">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Featured Story */}
        <Card 
          className="relative overflow-hidden rounded-2xl cursor-pointer transform hover:scale-[1.02] transition-all duration-300"
          style={{
            backgroundImage: `url(${bluePottery})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '200px'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
          <div className="relative z-10 p-6 h-full flex flex-col justify-end">
            <Button variant="secondary" size="sm" className="w-fit mb-4 bg-white/20 backdrop-blur-sm text-white border-white/30">
              Read More
            </Button>
            <h3 className="text-2xl font-bold text-white mb-2">A Turbulent Tale</h3>
            <p className="text-white/90 text-sm">The 100 day pottery of Jaipur...</p>
          </div>
        </Card>

        {/* Best Sellers Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Our Best Sellers</h2>
            <button className="text-samhita-gold font-semibold text-sm">View All</button>
          </div>

          {/* India Map Quote */}
          <div className="bg-gradient-to-r from-samhita-navy to-samhita-dark rounded-2xl p-6 mb-6 text-white">
            <div className="flex items-start gap-4">
              <div className="text-6xl">🇮🇳</div>
              <div className="flex-1">
                <p className="text-sm mb-2 italic">"What do you sell, O ye merchants?"</p>
                <p className="text-xs text-white/80 leading-relaxed">
                  Richly your wares are displayed.
                  Turbans of crimson and silver,
                  Tunics of purple brocade,
                  Mirrors with panels of amber,
                  Daggers with handles of jade.
                </p>
                <p className="text-xs text-white/60 mt-3">- Sarojini Naidu</p>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-6">
            {featuredProducts.map((product) => (
              <Card 
                key={product.id}
                className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-samhita-gold text-samhita-dark text-xs font-bold px-3 py-1 rounded-full">
                      {product.tag}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">by {product.artisan}</p>
                  <p className="text-sm text-gray-500 mb-3">{product.location}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">{product.price}</span>
                    <div className="flex items-center gap-1">
                      <IconStar className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
        <div className="flex justify-around items-center">
          <Button variant="ghost" className="flex flex-col items-center gap-1 p-2">
            <IconHome className="h-5 w-5 text-samhita-gold" />
            <span className="text-xs text-samhita-gold font-medium">Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 p-2">
            <IconBookmark className="h-5 w-5 text-gray-400" />
            <span className="text-xs text-gray-400">Saved</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 p-2">
            <IconSettings className="h-5 w-5 text-gray-400" />
            <span className="text-xs text-gray-400">Orders</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 p-2">
            <IconUser className="h-5 w-5 text-gray-400" />
            <span className="text-xs text-gray-400">Profile</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 p-2">
            <IconShoppingCart className="h-5 w-5 text-gray-400" />
            <span className="text-xs text-gray-400">Cart</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Marketplace;