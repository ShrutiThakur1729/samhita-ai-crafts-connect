import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage } from '@react-three/drei';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { IconRotate360, IconAugmentedReality, IconDeviceMobile } from '@tabler/icons-react';

interface ARViewerProps {
  modelUrl?: string;
  className?: string;
  productName?: string;
}

function Model({ url }: { url: string }) {
  const group = useRef<any>();
  const { scene } = useGLTF(url);
  
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.01;
    }
  });

  return <primitive ref={group} object={scene} />;
}

export const ARViewer: React.FC<ARViewerProps> = ({ modelUrl, className, productName = 'Product' }) => {
  const defaultModel = '/placeholder.glb';
  const [isARSupported, setIsARSupported] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Detect device type
    const ua = navigator.userAgent;
    const iOS = /iPad|iPhone|iPod/.test(ua);
    const android = /android/i.test(ua);
    
    setIsIOS(iOS);
    setIsAndroid(android);
    
    // Check if WebXR AR is supported
    if ('xr' in navigator) {
      (navigator as any).xr?.isSessionSupported('immersive-ar').then((supported: boolean) => {
        setIsARSupported(supported || iOS || android);
      });
    } else {
      setIsARSupported(iOS || android);
    }
  }, []);

  const handleARView = () => {
    const model = modelUrl || defaultModel;
    
    if (isIOS) {
      // iOS AR Quick Look
      const anchor = document.createElement('a');
      anchor.href = model;
      anchor.rel = 'ar';
      anchor.download = `${productName}.usdz`; // iOS prefers USDZ but can handle GLB
      const img = document.createElement('img');
      anchor.appendChild(img);
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } else if (isAndroid) {
      // Android Scene Viewer
      const intent = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(model)}&mode=ar_preferred&title=${encodeURIComponent(productName)}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(window.location.href)};end;`;
      window.location.href = intent;
    } else if ('xr' in navigator) {
      // WebXR for supported browsers
      startWebXRSession();
    }
  };

  const startWebXRSession = async () => {
    try {
      const xr = (navigator as any).xr;
      if (!xr) return;
      
      const session = await xr.requestSession('immersive-ar', {
        requiredFeatures: ['hit-test'],
        optionalFeatures: ['dom-overlay'],
      });
      
      // WebXR session setup would go here
      console.log('AR Session started', session);
    } catch (error) {
      console.error('Failed to start AR session:', error);
    }
  };

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      {isARSupported && (
        <Button
          onClick={handleARView}
          className="absolute top-4 left-4 z-10 bg-samhita-gold hover:bg-samhita-gold/90 text-samhita-dark gap-2"
          size="sm"
        >
          <IconAugmentedReality className="h-4 w-4" />
          View in AR
        </Button>
      )}
      
      <div className="absolute top-4 right-4 z-10 bg-black/50 text-white px-3 py-2 rounded-lg flex items-center gap-2">
        <IconRotate360 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Rotate to explore</span>
      </div>
      
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <Model url={modelUrl || defaultModel} />
          </Stage>
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={2}
          />
        </Suspense>
      </Canvas>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-samhita-gold/90 text-samhita-dark px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
        {isARSupported && <IconDeviceMobile className="h-4 w-4" />}
        <span>{isARSupported ? 'AR Ready' : '3D Preview'}</span>
      </div>
    </Card>
  );
};
