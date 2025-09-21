import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { VoiceInput } from '@/components/VoiceInput';
import { IconArrowLeft, IconUpload, IconCheck } from '@tabler/icons-react';
import { toast } from '@/components/ui/use-toast';
import craftBackground from '@/assets/craft-background.jpg';

const SellerOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    description: '',
    category: '',
    materials: '',
    dimensions: '',
    photos: [] as File[]
  });
  
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [aiGeneratedDescription, setAiGeneratedDescription] = useState('');

  const handleVoiceTranscript = (transcript: string) => {
    setVoiceTranscript(transcript);
    // Auto-populate basic fields from voice input
    const words = transcript.toLowerCase().split(' ');
    if (!formData.productName && transcript.length > 0) {
      setFormData(prev => ({ ...prev, productName: transcript.slice(0, 50) }));
    }
  };

  const handleAIDescription = (description: string) => {
    setAiGeneratedDescription(description);
    setFormData(prev => ({ ...prev, description }));
    toast({
      title: "AI Story Generated!",
      description: "Your product description has been created with cultural context",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({ 
      ...prev, 
      photos: [...prev.photos, ...files].slice(0, 5) 
    }));
  };

  const handleSubmit = () => {
    toast({
      title: "Product Listed Successfully!",
      description: "Your handcrafted item is now available on Samhita marketplace",
    });
    navigate('/seller-dashboard');
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${craftBackground})`,
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
            onClick={() => step > 1 ? setStep(step - 1) : navigate('/')}
            className="text-white hover:bg-white/20"
          >
            <IconArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-white text-center">
            <h1 className="font-bold">SAMHITA</h1>
            <p className="text-sm opacity-80">Artisan Onboarding</p>
          </div>
          <div className="w-10"></div>
        </header>

        {/* Progress Indicator */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step >= num 
                    ? 'bg-samhita-gold border-samhita-gold text-samhita-dark' 
                    : 'border-white/50 text-white/50'
                }`}>
                  {step > num ? <IconCheck className="h-4 w-4" /> : num}
                </div>
                {num < 3 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    step > num ? 'bg-samhita-gold' : 'bg-white/30'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-2">
            <p className="text-white/80 text-sm">
              {step === 1 && "Tell us about your craft"}
              {step === 2 && "Add photos and details"}
              {step === 3 && "Review and publish"}
            </p>
          </div>
        </div>

        {/* Step Content */}
        <div className="px-4 pb-8">
          {step === 1 && (
            <Card className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-samhita-dark mb-4 text-center">
                Voice-First Product Entry
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Speak about your craft in your comfortable language
              </p>
              
              <VoiceInput 
                onTranscript={handleVoiceTranscript}
                onGeneratedDescription={handleAIDescription}
                language="hi-IN"
                className="mb-6"
              />

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name (Auto-filled from voice)
                  </label>
                  <Input
                    value={formData.productName}
                    onChange={(e) => handleInputChange('productName', e.target.value)}
                    placeholder="E.g., Handwoven Silk Saree"
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹)
                  </label>
                  <Input
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="2500"
                    type="number"
                    className="rounded-xl"
                  />
                </div>

                {aiGeneratedDescription && (
                  <div className="bg-gradient-to-r from-samhita-gold/10 to-yellow-100 rounded-xl p-4 border border-samhita-gold/20">
                    <h4 className="font-medium text-samhita-dark mb-2">AI-Generated Product Story:</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{aiGeneratedDescription}</p>
                  </div>
                )}
              </div>

              <Button 
                onClick={() => setStep(2)}
                disabled={!formData.productName || !formData.price}
                className="w-full mt-6 bg-samhita-gold hover:bg-yellow-600 text-samhita-dark font-semibold rounded-xl py-3"
              >
                Continue to Photos
              </Button>
            </Card>
          )}

          {step === 2 && (
            <Card className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-samhita-dark mb-6 text-center">
                Add Photos & Details
              </h2>

              <div className="space-y-6">
                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Photos (Up to 5)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-samhita-gold transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <IconUpload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Tap to add photos</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {formData.photos.length} of 5 photos selected
                      </p>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-samhita-gold focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    <option value="pottery">Pottery & Ceramics</option>
                    <option value="textiles">Textiles & Fabrics</option>
                    <option value="jewelry">Jewelry</option>
                    <option value="woodwork">Woodwork</option>
                    <option value="paintings">Paintings</option>
                    <option value="metalwork">Metalwork</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Materials Used
                  </label>
                  <Input
                    value={formData.materials}
                    onChange={(e) => handleInputChange('materials', e.target.value)}
                    placeholder="E.g., Clay, Natural glazes, Traditional tools"
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dimensions
                  </label>
                  <Input
                    value={formData.dimensions}
                    onChange={(e) => handleInputChange('dimensions', e.target.value)}
                    placeholder="E.g., 12 x 8 x 6 inches"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button 
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 rounded-xl"
                >
                  Back
                </Button>
                <Button 
                  onClick={() => setStep(3)}
                  disabled={!formData.category || formData.photos.length === 0}
                  className="flex-1 bg-samhita-gold hover:bg-yellow-600 text-samhita-dark font-semibold rounded-xl"
                >
                  Review
                </Button>
              </div>
            </Card>
          )}

          {step === 3 && (
            <Card className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-samhita-dark mb-6 text-center">
                Review Your Listing
              </h2>

              <div className="space-y-4 mb-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-samhita-dark">{formData.productName}</h3>
                  <p className="text-2xl font-bold text-samhita-gold">₹{formData.price}</p>
                  <p className="text-sm text-gray-600 mt-2">Category: {formData.category}</p>
                </div>

                {formData.description && (
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Description:</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {formData.description.slice(0, 200)}...
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Photos: {formData.photos.length} uploaded
                  </h4>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Materials: {formData.materials}
                  </h4>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Dimensions: {formData.dimensions}
                  </h4>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <h4 className="font-medium text-green-800 mb-2">Impact Preview:</h4>
                <p className="text-sm text-green-700">
                  🎯 This listing will directly support traditional Indian craftsmanship
                  <br />
                  🌟 100% of proceeds go to artisan communities
                  <br />
                  📈 Estimated reach: 10,000+ craft enthusiasts
                </p>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex-1 rounded-xl"
                >
                  Back to Edit
                </Button>
                <Button 
                  onClick={handleSubmit}
                  className="flex-1 bg-samhita-gold hover:bg-yellow-600 text-samhita-dark font-semibold rounded-xl"
                >
                  Publish Listing
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerOnboarding;