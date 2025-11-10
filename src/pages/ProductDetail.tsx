import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { 
  IconArrowLeft,
  IconHeart,
  IconStar,
  IconShoppingCart,
  IconMapPin,
  IconTruck,
  IconShield,
  IconCamera
} from '@tabler/icons-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/contexts/CartContext';
import { ARViewer } from '@/components/ARViewer';
import bluePottery from '@/assets/blue-pottery.jpg';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showARView, setShowARView] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    if (!id) return;
    setLoading(true);
    const { data } = await supabase
      .from('products')
      .select(`
        *,
        artisans (
          profiles (full_name)
        )
      `)
      .eq('id', id)
      .single();
    
    setProduct(data);
    setLoading(false);
  };

  const handleAddToCart = async () => {
    if (!product) return;
    await addToCart(product.id, quantity);
    toast({
      title: "Added to Cart!",
      description: `${quantity}x ${product.name} added successfully`,
    });
  };

  const handleBuyNow = async () => {
    if (!product) return;
    await addToCart(product.id, quantity);
    navigate('/checkout');
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from Favorites" : "Added to Favorites",
      description: isFavorited ? "Item removed from your wishlist" : "Item saved to your wishlist",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/marketplace')}
            className="p-2"
          >
            <IconArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="p-2">
              <IconCamera className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleFavorite}
              className="p-2"
            >
              <IconHeart className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </Button>
          </div>
        </div>
      </header>

      <div className="pb-24">
        {/* Product Images */}
        <div className="relative">
          <img 
            src={product.images?.[0] || bluePottery} 
            alt={product.name}
            className="w-full h-80 object-cover"
          />
          {product.ar_model_url && (
            <Button
              onClick={() => setShowARView(true)}
              className="absolute bottom-4 left-4 bg-white/90 text-gray-900 hover:bg-white backdrop-blur-sm"
            >
              <IconCamera className="h-4 w-4 mr-2" />
              View in AR
            </Button>
          )}
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-2xl font-bold text-gray-900 flex-1">{product.name}</h1>
              <div className="flex items-center gap-1 ml-4">
                <IconStar className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-gray-500 text-sm">({product.reviews})</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-2">
              Handcrafted by {product.artisans?.profiles?.full_name || 'Artisan'}
            </p>
            <div className="flex items-center gap-1 mb-4">
              <IconMapPin className="h-4 w-4 text-gray-500" />
              <span className="text-gray-500 text-sm">{product.region || 'India'}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
              </Badge>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-gray-300 font-medium">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* About This Style */}
          <Card className="p-4 bg-orange-50 border border-orange-200">
            <h3 className="font-bold text-gray-900 mb-2">About this style</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              {product.description}
            </p>
            {product.ai_generated_story && (
              <p className="text-gray-700 text-sm leading-relaxed">
                {product.ai_generated_story}
              </p>
            )}
          </Card>

          {/* Specifications */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Product Details</h3>
            <div className="space-y-2">
              {product.materials && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Materials:</span>
                  <span className="font-medium text-gray-900">{product.materials.join(', ')}</span>
                </div>
              )}
              {product.craft_type && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Craft Type:</span>
                  <span className="font-medium text-gray-900">{product.craft_type}</span>
                </div>
              )}
              {product.category && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium text-gray-900">{product.category}</span>
                </div>
              )}
            </div>
          </div>

          {/* Shipping Info */}
          <Card className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <IconTruck className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Free Shipping</p>
                  <p className="text-sm text-gray-600">Delivery in {product.delivery}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <IconShield className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Authenticity Guaranteed</p>
                  <p className="text-sm text-gray-600">100% handcrafted by verified artisans</p>
                </div>
              </div>
            </div>
          </Card>

        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="flex gap-3">
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className="flex-1 border-samhita-gold text-samhita-gold hover:bg-samhita-gold hover:text-white"
          >
            <IconShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            onClick={handleBuyNow}
            className="flex-1 bg-samhita-gold hover:bg-yellow-600 text-samhita-dark font-semibold"
          >
            Buy Now
          </Button>
        </div>
      </div>

      {/* AR View Modal */}
      <Dialog open={showARView} onOpenChange={setShowARView}>
        <DialogContent className="max-w-4xl h-[80vh] p-0">
          <div className="w-full h-full">
            <ARViewer 
              modelUrl={product.ar_model_url} 
              productName={product.name}
              className="w-full h-full" 
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetail;