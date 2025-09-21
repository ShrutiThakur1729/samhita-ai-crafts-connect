import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import { IconMicrophone, IconMicrophoneOff } from '@tabler/icons-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface VoiceInputProps {
  onTranscript: (transcript: string) => void;
  onGeneratedDescription?: (description: string) => void;
  onImageAnalysis?: (analysis: string) => void;
  className?: string;
  placeholder?: string;
  language?: string;
  imageFile?: File | null;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ 
  onTranscript, 
  onGeneratedDescription, 
  onImageAnalysis,
  className,
  placeholder = "Tap to speak in your language...",
  language = "hi-IN",
  imageFile
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const { speak } = useSpeechSynthesis();
  const { listen, stop, supported } = useSpeechRecognition({
    onResult: (result) => {
      setTranscript(result);
      onTranscript(result);
    },
    onEnd: () => {
      setIsListening(false);
      if (transcript && onGeneratedDescription) {
        generateProductDescription(transcript);
      }
    }
  });

  const generateProductDescription = async (rawInput: string) => {
    setIsProcessing(true);
    try {
      // Simulate AI processing - In real app, call your AI API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Enhanced AI description with regional context
      const craftTypes = ['pottery', 'textile', 'jewelry', 'woodwork', 'painting', 'metalwork'];
      const detectedCraft = craftTypes.find(craft => 
        rawInput.toLowerCase().includes(craft) || 
        rawInput.toLowerCase().includes(craft.slice(0, -1))
      ) || 'handcrafted item';
      
      const regions = {
        pottery: 'Jaipur, Rajasthan',
        textile: 'Banarasi, Uttar Pradesh', 
        jewelry: 'Kundan, Jodhpur',
        woodwork: 'Channapatna, Karnataka',
        painting: 'Madhubani, Bihar',
        metalwork: 'Moradabad, Uttar Pradesh'
      };
      
      const region = regions[detectedCraft as keyof typeof regions] || 'Traditional Indian';
      
      const enhancedDescription = `This exquisite handcrafted ${rawInput} represents the rich heritage of ${region} artisanship. Meticulously created using traditional techniques passed down through generations, each piece tells a unique story of cultural legacy and skilled craftsmanship. The intricate details and authentic materials make this a treasured addition to any collection, directly supporting the livelihood of talented artisans and preserving centuries-old craft traditions.`;
      
      onGeneratedDescription?.(enhancedDescription);
      
      // Provide voice feedback
      speak({ 
        text: "मैंने आपके उत्पाद के लिए एक सुंदर विवरण तैयार किया है", 
        rate: 0.8,
        voice: undefined 
      });
    } catch (error) {
      console.error('Error generating description:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const analyzeProductImage = async () => {
    if (!imageFile) return;
    
    setIsProcessing(true);
    try {
      // Simulate AI image analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const imageAnalysis = `Based on the uploaded image, this appears to be a traditional Indian handicraft with intricate patterns and vibrant colors. The craftsmanship shows skilled artisan work with attention to detail. The materials appear to be of high quality with traditional finishing techniques. This piece would appeal to collectors of authentic Indian art and cultural enthusiasts looking for unique handmade items.`;
      
      onImageAnalysis?.(imageAnalysis);
      
      speak({ 
        text: "छवि का विश्लेषण पूरा हो गया है", 
        rate: 0.8,
        voice: undefined 
      });
    } catch (error) {
      console.error('Error analyzing image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (imageFile && onImageAnalysis) {
      analyzeProductImage();
    }
  }, [imageFile]);

  const toggleListening = () => {
    if (isListening) {
      stop();
      setIsListening(false);
    } else {
      setTranscript('');
      listen({ lang: language });
      setIsListening(true);
      
      // Voice prompt in Hindi
      speak({ 
        text: "कृपया अपने उत्पाद के बारे में बताएं", 
        rate: 0.8,
        voice: undefined 
      });
    }
  };

  if (!supported) {
    return (
      <div className="text-center p-4 bg-muted rounded-lg">
        <p className="text-muted-foreground">Voice input not supported in this browser</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="relative">
        <Button
          onClick={toggleListening}
          variant={isListening ? "destructive" : "default"}
          size="lg"
          className={cn(
            "w-full h-24 rounded-2xl transition-all duration-300",
            "bg-gradient-to-r from-samhita-gold to-yellow-400",
            "hover:from-yellow-400 hover:to-samhita-gold",
            "text-samhita-dark font-semibold",
            "shadow-lg hover:shadow-xl",
            isListening && "animate-pulse bg-red-500 hover:bg-red-600"
          )}
          disabled={isProcessing}
        >
          <div className="flex flex-col items-center gap-2">
            {isListening ? (
              <IconMicrophoneOff className="h-8 w-8" />
            ) : (
              <IconMicrophone className="h-8 w-8" />
            )}
            <span className="text-sm">
              {isListening 
                ? "सुन रहे हैं... (Listening...)" 
                : isProcessing 
                ? "प्रसंस्करण... (Processing...)"
                : "बोलने के लिए टैप करें (Tap to Speak)"
              }
            </span>
          </div>
        </Button>
        
        {isListening && (
          <div className="absolute inset-0 rounded-2xl animate-ping bg-samhita-gold/20 pointer-events-none" />
        )}
      </div>

      {transcript && (
        <div className="bg-samhita-navy-light/10 rounded-lg p-4 border border-samhita-gold/20">
          <h4 className="font-medium text-samhita-dark mb-2">Your Input:</h4>
          <p className="text-muted-foreground">{transcript}</p>
        </div>
      )}

      {isProcessing && (
        <div className="bg-gradient-to-r from-samhita-gold/10 to-yellow-100 rounded-lg p-4 border border-samhita-gold/20">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-samhita-gold"></div>
            <p className="text-samhita-dark font-medium">
              {imageFile ? "AI is analyzing your product image..." : "AI is crafting your product story..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};