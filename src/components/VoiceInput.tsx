import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import { IconMicrophone, IconMicrophoneOff } from '@tabler/icons-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

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
      const { data, error } = await supabase.functions.invoke('generate-product-story', {
        body: {
          productInfo: {
            transcript: rawInput,
            region: 'India'
          },
          language: language.startsWith('hi') ? 'hi' : 'en'
        }
      });

      if (error) {
        console.error('Error generating description:', error);
        throw error;
      }

      const story = data?.story || rawInput;
      onGeneratedDescription?.(story);
      
      // Provide voice feedback
      speak({ 
        text: language.startsWith('hi') 
          ? "मैंने आपके उत्पाद के लिए एक सुंदर विवरण तैयार किया है" 
          : "I've created a beautiful description for your product", 
        rate: 0.8,
        voice: undefined 
      });
    } catch (error) {
      console.error('Error generating description:', error);
      // Fallback to basic description
      onGeneratedDescription?.(rawInput);
    } finally {
      setIsProcessing(false);
    }
  };

  const analyzeProductImage = async () => {
    if (!imageFile) return;
    
    setIsProcessing(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        
        const { data, error } = await supabase.functions.invoke('analyze-product-image', {
          body: {
            imageBase64: base64Image,
            language: language.startsWith('hi') ? 'hi' : 'en'
          }
        });

        if (error) {
          console.error('Error analyzing image:', error);
          throw error;
        }

        const analysis = data?.analysis || "Image analyzed successfully";
        onImageAnalysis?.(analysis);
        
        speak({ 
          text: language.startsWith('hi') 
            ? "छवि का विश्लेषण पूरा हो गया है" 
            : "Image analysis is complete", 
          rate: 0.8,
          voice: undefined 
        });
        setIsProcessing(false);
      };
      reader.readAsDataURL(imageFile);
    } catch (error) {
      console.error('Error analyzing image:', error);
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