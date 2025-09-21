import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconArrowLeft, IconTrash, IconPlus, IconMinus } from '@tabler/icons-react';
import { toast } from '@/components/ui/use-toast';
import bluePottery from '@/assets/blue-pottery.jpg';
import woodenToy from '@/assets/wooden-toy.jpg';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Channapatna Toy',
      artisan: 'Lakshmi Devi',
      price: 850,
      quantity: 2,
      image: woodenToy
    },
    {
      id: 2,
      name: 'Madhubani art',
      artisan: 'Sita Devi',
      price: 1200,
      quantity: 2,
      image: bluePottery
    },
    {
      id: 3,
      name: 'Gond art',
      artisan: 'Ravi Kumar',
      price: 950,
      quantity: 2,
      image: bluePottery
    }
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Product removed from cart",
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 50;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems, total } });
  };

  return (
    <div className="min-h-screen bg-samhita-dark">
      {/* Header */}
      <header className="flex items-center justify-between p-4 pt-12 text-white">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/marketplace')}
          className="text-white hover:bg-white/20"
        >
          <IconArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-bold text-lg">Shopping Cart</h1>
        <div className="w-10"></div>
      </header>

      <div className="px-4 pb-32">
        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <Card key={item.id} className="bg-samhita-navy-light border-samhita-gold/20 p-4 rounded-2xl">
              <div className="flex items-center gap-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{item.name}</h3>
                  <p className="text-samhita-cream/70 text-sm">by {item.artisan}</p>
                  <p className="text-samhita-gold font-bold">₹{item.price.toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-samhita-dark rounded-lg">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-samhita-cream hover:bg-samhita-gold hover:text-samhita-dark rounded-l-lg transition-colors"
                    >
                      <IconMinus className="h-4 w-4" />
                    </button>
                    <span className="px-3 py-2 text-samhita-cream font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-samhita-cream hover:bg-samhita-gold hover:text-samhita-dark rounded-r-lg transition-colors"
                    >
                      <IconPlus className="h-4 w-4" />
                    </button>
                  </div>

                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                  >
                    <IconTrash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 rounded-2xl">
          <h3 className="font-bold text-samhita-cream text-lg mb-4">Order Summary</h3>
          
          <div className="space-y-3 text-samhita-cream">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}.00</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes and Shipping</span>
              <span>+ ₹{shipping}.00</span>
            </div>
            <hr className="border-white/20" />
            <div className="flex justify-between text-xl font-bold text-samhita-gold">
              <span>Total</span>
              <span>₹{total.toLocaleString()}.00</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Checkout */}
      <div className="fixed bottom-0 left-0 right-0 bg-samhita-dark border-t border-samhita-gold/20 p-4">
        <Button
          onClick={handleCheckout}
          className="w-full bg-samhita-cream text-samhita-dark hover:bg-samhita-gold font-bold py-4 rounded-2xl text-lg"
          disabled={cartItems.length === 0}
        >
          Checkout
        </Button>
        
        {/* Bottom Navigation */}
        <div className="flex justify-around items-center mt-4 text-samhita-cream/60">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/marketplace')}
            className="flex flex-col items-center gap-1 p-2 text-samhita-cream/60 hover:text-samhita-gold"
          >
            <div className="w-6 h-6 rounded-full bg-samhita-cream/20 flex items-center justify-center">
              <span className="text-xs">🏠</span>
            </div>
            <span className="text-xs">Home</span>
          </Button>
          
          <Button variant="ghost" className="flex flex-col items-center gap-1 p-2 text-samhita-cream/60">
            <div className="w-6 h-6 rounded-full bg-samhita-cream/20 flex items-center justify-center">
              <span className="text-xs">📱</span>
            </div>
            <span className="text-xs">Orders</span>
          </Button>
          
          <Button variant="ghost" className="flex flex-col items-center gap-1 p-2 text-samhita-cream/60">
            <div className="w-6 h-6 rounded-full bg-samhita-cream/20 flex items-center justify-center">
              <span className="text-xs">🎨</span>
            </div>
            <span className="text-xs">Crafts</span>
          </Button>
          
          <Button variant="ghost" className="flex flex-col items-center gap-1 p-2 text-samhita-cream/60">
            <div className="w-6 h-6 rounded-full bg-samhita-cream/20 flex items-center justify-center">
              <span className="text-xs">👤</span>
            </div>
            <span className="text-xs">Profile</span>
          </Button>
          
          <Button variant="ghost" className="flex flex-col items-center gap-1 p-2 text-samhita-gold">
            <div className="w-6 h-6 rounded-full bg-samhita-gold/20 flex items-center justify-center">
              <span className="text-xs">🛒</span>
            </div>
            <span className="text-xs">Cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;