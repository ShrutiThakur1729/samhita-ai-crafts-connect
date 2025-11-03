import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconArrowLeft, IconTrash, IconPlus, IconMinus, IconShoppingBag } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, total, itemCount } = useCart();
  const { t } = useTranslation();

  const shipping = 50;
  const finalTotal = total + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="p-8 text-center">
          <IconShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">{t('emptyCart')}</h2>
          <Button onClick={() => navigate('/marketplace')} className="mt-4">
            {t('continueShopping')}
          </Button>
        </Card>
      </div>
    );
  }

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
          {items.map((item) => (
            <Card key={item.id} className="bg-samhita-navy-light border-samhita-gold/20 p-4 rounded-2xl">
              <div className="flex items-center gap-4">
                <img 
                  src={item.product.images[0] || '/placeholder.svg'} 
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{item.product.name}</h3>
                  <p className="text-samhita-gold font-bold">₹{item.product.price.toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-samhita-dark rounded-lg">
                    <button 
                      onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                      className="p-2 text-samhita-cream hover:bg-samhita-gold hover:text-samhita-dark rounded-l-lg transition-colors"
                    >
                      <IconMinus className="h-4 w-4" />
                    </button>
                    <span className="px-3 py-2 text-samhita-cream font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                      className="p-2 text-samhita-cream hover:bg-samhita-gold hover:text-samhita-dark rounded-r-lg transition-colors"
                    >
                      <IconPlus className="h-4 w-4" />
                    </button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.product_id)}
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
              <span>{t('subtotal')}</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('shipping')}</span>
              <span>+ ₹{shipping}.00</span>
            </div>
            <hr className="border-white/20" />
            <div className="flex justify-between text-xl font-bold text-samhita-gold">
              <span>{t('total')}</span>
              <span>₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Checkout */}
      <div className="fixed bottom-0 left-0 right-0 bg-samhita-dark border-t border-samhita-gold/20 p-4">
        <Button
          onClick={() => navigate('/checkout')}
          className="w-full bg-samhita-cream text-samhita-dark hover:bg-samhita-gold font-bold py-4 rounded-2xl text-lg"
        >
          {t('checkout')}
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