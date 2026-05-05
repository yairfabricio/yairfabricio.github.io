import { useRef, useState, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { Html, Text3D, Center } from '@react-three/drei';
import type { Project } from '../data/projects';

interface ProjectNodeProps {
  project: Project;
  onClick: (project: Project) => void;
  isActive: boolean;
  language: 'EN' | 'ES';
}

export function ProjectNode({ project, onClick, isActive, language }: ProjectNodeProps) {
  const groupRef = useRef<Group>(null);
  const [hovered, setHover] = useState(false);

  // Smooth, polished rotation and floating (No glitches)
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth continuous rotation
      groupRef.current.rotation.y += delta * (isActive ? 1.5 : 0.8);
      
      // Gentle floating up and down
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5 + project.position[0]) * 0.2;
    }
  });

  const primaryColor = isActive ? '#E50914' : hovered ? '#00FF41' : '#00AA33';
  const scale = isActive ? 1.5 : hovered ? 1.2 : 1;

  return (
    <group position={project.position} scale={scale}>
      <group
        ref={groupRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick(project);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHover(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <Suspense fallback={null}>
          <Center>
            <Text3D
              font={`${import.meta.env.BASE_URL}helvetiker_bold.typeface.json`}
              size={2}
              height={0.4}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.03}
              bevelSize={0.02}
              bevelOffset={0}
              bevelSegments={5}
            >
              $
              <meshStandardMaterial 
                color={primaryColor} 
                metalness={0.7}
                roughness={0.2}
                emissive={primaryColor}
                emissiveIntensity={isActive ? 0.8 : hovered ? 0.5 : 0.2}
              />
            </Text3D>
          </Center>
        </Suspense>
      </group>
      
      {/* 3D Label */}
      <Html position={[0, -1.8, 0]} center zIndexRange={[100, 0]}>
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onClick(project);
          }}
          onMouseEnter={() => {
            setHover(true);
            document.body.style.cursor = 'pointer';
          }}
          onMouseLeave={() => {
            setHover(false);
            document.body.style.cursor = 'auto';
          }}
          className={`font-mono text-xs whitespace-nowrap px-3 py-1 border transition-colors duration-300 cursor-pointer rounded-sm ${
            isActive 
              ? 'bg-black/90 border-[#E50914] text-[#E50914] shadow-[0_0_15px_rgba(229,9,20,0.5)]' 
              : hovered 
                ? 'bg-black/90 border-[#00FF41] text-[#00FF41] shadow-[0_0_15px_rgba(0,255,65,0.5)]' 
                : 'bg-black/50 border-[#006611] text-[#006611]'
          }`}
        >
          {project.title[language]}
        </div>
      </Html>
    </group>
  );
}

