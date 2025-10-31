import React, { useState, useCallback } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { IconUpload, IconPhoto, IconScan, IconSparkles } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

interface ImageAnalyzerProps {
  onImageUpload: (file: File) => void;
  onAnalysisComplete?: (analysis: string) => void;
  className?: string;
}

export const ImageAnalyzer: React.FC<ImageAnalyzerProps> = ({
  onImageUpload,
  onAnalysisComplete,
  className
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');

  const handleImageSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      onImageUpload(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Auto-analyze
      analyzeImage(file);
    }
  }, [onImageUpload]);

  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        
        const { data, error } = await supabase.functions.invoke('analyze-product-image', {
          body: {
            imageBase64: base64Image,
            language: 'en'
          }
        });

        if (error) {
          console.error('Error analyzing image:', error);
          throw error;
        }

        const analysisResult = data?.analysis || 'Image analyzed successfully';
        setAnalysis(analysisResult);
        onAnalysisComplete?.(analysisResult);
        setIsAnalyzing(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setAnalysis('Error analyzing image. Please try again.');
      setIsAnalyzing(false);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Card className="p-6 bg-gradient-to-br from-white to-gray-50 border-2 border-dashed border-gray-300 hover:border-samhita-gold transition-colors">
        <div className="text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
            id="image-analyzer-upload"
          />
          <label htmlFor="image-analyzer-upload" className="cursor-pointer">
            <div className="mb-4">
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Product preview" 
                    className="w-32 h-32 object-cover rounded-xl mx-auto border-4 border-samhita-gold"
                  />
                  <div className="absolute -top-2 -right-2 bg-samhita-gold rounded-full p-1">
                    <IconScan className="h-4 w-4 text-samhita-dark" />
                  </div>
                </div>
              ) : (
                <div className="w-32 h-32 bg-gray-100 rounded-xl mx-auto flex items-center justify-center">
                  <IconPhoto className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="bg-white hover:bg-samhita-gold/10">
                <IconUpload className="h-4 w-4 mr-2" />
                {selectedImage ? 'Change Photo' : 'Upload Product Photo'}
              </Button>
              <p className="text-sm text-gray-600">
                AI will analyze your craft automatically
              </p>
            </div>
          </label>
        </div>
      </Card>

      {isAnalyzing && (
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-200 border-t-blue-600"></div>
              <IconSparkles className="absolute inset-0 h-8 w-8 text-blue-600 animate-pulse" />
            </div>
            <div>
              <p className="font-medium text-blue-900">AI is analyzing your craft...</p>
              <p className="text-sm text-blue-700">Detecting patterns, materials, and cultural origin</p>
            </div>
          </div>
        </Card>
      )}

      {analysis && !isAnalyzing && (
        <Card className="p-4 bg-gradient-to-r from-samhita-gold/5 to-yellow-50 border border-samhita-gold/20">
          <div className="flex items-start gap-3">
            <div className="bg-samhita-gold rounded-full p-2 flex-shrink-0">
              <IconSparkles className="h-5 w-5 text-samhita-dark" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-samhita-dark mb-2">AI Analysis Results</h4>
              <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                {analysis}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};