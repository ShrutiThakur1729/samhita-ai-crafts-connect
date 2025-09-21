import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import bluePottery from '@/assets/blue-pottery.jpg';
import woodenToy from '@/assets/wooden-toy.jpg';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showARView, setShowARView] = useState(false);

  // Mock product data - in real app, fetch based on ID
  const product = {
    id: parseInt(id || '1'),
    name: id === '1' ? 'Jaipur Blue Pottery Vase' : 'Channapatna Wooden Toy',
    price: id === '1' ? 2500 : 850,
    rating: id === '1' ? 4.8 : 4.9,
    reviews: id === '1' ? 23 : 45,
    artisan: id === '1' ? 'Ramesh Kumar' : 'Lakshmi Devi',
    location: id === '1' ? 'Jaipur, Rajasthan' : 'Channapatna, Karnataka',
    image: id === '1' ? bluePottery : woodenToy,
    images: id === '1' ? [bluePottery, bluePottery, bluePottery] : [woodenToy, woodenToy, woodenToy],
    description: id === '1' 
      ? "This exquisite blue pottery vase represents centuries of Jaipur's artistic heritage. Handcrafted using traditional techniques, each piece features intricate patterns that tell stories of royal Rajasthani culture."
      : "This vibrant Channapatna wooden toy showcases the finest South Indian craftsmanship. Made from sustainable hala wood and colored with natural dyes, it's safe for children and supports local artisan communities.",
    story: id === '1'
      ? "Ramesh Kumar learned this ancient art from his grandfather in the lanes of Jaipur's old city. Each pottery piece takes 3-4 days to complete, involving hand-throwing, intricate painting, and traditional firing techniques passed down through generations."
      : "Lakshmi Devi is a master craftswoman from Channapatna, known as India's toy town. Her wooden elephants are carved from sustainable hala wood and painted with natural, child-safe colors that have made Channapatna toys famous worldwide.",
    specifications: id === '1'
      ? ["Height: 12 inches", "Material: Clay & Natural Glazes", "Weight: 800g", "Dishwasher Safe: No"]
      : ["Size: 6x4 inches", "Material: Hala Wood", "Weight: 200g", "Age: 3+ years"],
    shipping: "₹50",
    delivery: "3-5 business days"
  };

  const similarProducts = [
    { name: 'Blue Ceramic Plate', price: '₹1,200', image: bluePottery },
    { name: 'Wooden Horse Toy', price: '₹650', image: woodenToy }
  ];

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart!",
      description: `${quantity}x ${product.name} added successfully`,
    });
    navigate('/cart');
  };

  const handleBuyNow = () => {
    navigate('/checkout', { state: { product, quantity } });
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from Favorites" : "Added to Favorites",
      description: isFavorited ? "Item removed from your wishlist" : "Item saved to your wishlist",
    });
  };

  const handleARView = () => {
    setShowARView(true);
    toast({
      title: "AR View Activated",
      description: "Point your camera to visualize the product in your space",
    });
  };

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
            src={product.image} 
            alt={product.name}
            className="w-full h-80 object-cover"
          />
          <Button
            onClick={handleARView}
            className="absolute bottom-4 left-4 bg-white/90 text-gray-900 hover:bg-white backdrop-blur-sm"
          >
            <IconCamera className="h-4 w-4 mr-2" />
            View in AR
          </Button>
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
            
            <p className="text-gray-600 mb-2">Handcrafted by {product.artisan}</p>
            <div className="flex items-center gap-1 mb-4">
              <IconMapPin className="h-4 w-4 text-gray-500" />
              <span className="text-gray-500 text-sm">{product.location}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                In Stock
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
            <p className="text-gray-700 text-sm leading-relaxed">
              {product.story}
            </p>
          </Card>

          {/* Specifications */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Product Details</h3>
            <div className="space-y-2">
              {product.specifications.map((spec, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{spec.split(':')[0]}:</span>
                  <span className="font-medium text-gray-900">{spec.split(':')[1]}</span>
                </div>
              ))}
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

          {/* Similar Products */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Similar Products</h3>
            <div className="grid grid-cols-2 gap-4">
              {similarProducts.map((item, index) => (
                <Card key={index} className="overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
                  <div className="p-3">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">{item.name}</h4>
                    <p className="text-samhita-gold font-bold">{item.price}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
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
      {showARView && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-64 h-64 border-2 border-white/30 rounded-lg mb-4 flex items-center justify-center">
              <p className="text-white/80">AR Camera View</p>
            </div>
            <p className="mb-4">Point camera at a flat surface</p>
            <Button 
              onClick={() => setShowARView(false)}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              Exit AR
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;