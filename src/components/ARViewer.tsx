import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage } from '@react-three/drei';
import { Card } from './ui/card';
import { IconRotate360 } from '@tabler/icons-react';

interface ARViewerProps {
  modelUrl?: string;
  className?: string;
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

export const ARViewer: React.FC<ARViewerProps> = ({ modelUrl, className }) => {
  // Default placeholder model if none provided
  const defaultModel = '/placeholder.glb';

  return (
    <Card className={`relative overflow-hidden ${className}`}>
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
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-samhita-gold/90 text-samhita-dark px-4 py-2 rounded-full text-sm font-medium">
        3D Preview
      </div>
    </Card>
  );
};
