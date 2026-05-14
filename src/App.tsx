import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { projectsData, type Project } from './data/projects';
import { ProjectNode } from './components/ProjectNode';
import { TerminalProfile } from './components/TerminalProfile';

function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showProfile, setShowProfile] = useState(true);
  const [language, setLanguage] = useState<'EN' | 'ES'>('EN');

  return (
    <div className="w-screen h-screen bg-[#020202] relative scanlines overflow-hidden font-mono text-[#00FF41]">
      
      {/* 3D Canvas - Represents a network topology map (like Maltego) */}
      <div className="absolute inset-0 z-0 md:left-[620px] lg:left-[820px] xl:left-[920px]">
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }} className="w-full h-full">
          <color attach="background" args={['#020202']} />
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
          <OrbitControls target={[0, 0, 0]} enableZoom={true} enablePan={true} autoRotate={!activeProject} autoRotateSpeed={0.3} maxDistance={25} minDistance={5} />

          {/* Network Nodes */}
          {projectsData.map((project) => (
            <ProjectNode 
              key={project.id} 
              project={project} 
              isActive={activeProject?.id === project.id}
              language={language}
              onClick={(p) => {
                setActiveProject(p);
                if(window.innerWidth < 768) setShowProfile(false); // Hide profile on mobile when project clicked
              }} 
            />
          ))}
        </Canvas>
      </div>
      
      {/* Top Bar - fsociety style */}
      <div className="absolute top-0 left-0 w-full p-4 pointer-events-none z-10 flex justify-between items-center bg-[#000000cc] border-b border-[#333]">
        <div className="flex items-center gap-4">
          <h1 className="text-xl md:text-2xl font-bold tracking-tighter text-white glitch pointer-events-auto cursor-pointer" onClick={() => setShowProfile(!showProfile)}>
            portfolio_data_analysis
          </h1>
          <span className="hidden md:inline-block px-2 py-1 bg-[#E50914] text-white text-xs font-bold uppercase">{language === 'EN' ? 'Target' : 'Objetivo'}: Yair Cuno</span>
        </div>
        <div className="text-right text-[10px] md:text-xs text-[#888] flex items-center gap-3">
          <button 
            className="pointer-events-auto border border-[#333] px-2 py-1 text-xs font-bold bg-black text-white hover:bg-[#00FF41] hover:text-black hover:border-[#00FF41] transition-colors duration-300"
            onClick={() => setLanguage(lang => lang === 'EN' ? 'ES' : 'EN')}
          >
            [{language}]
          </button>
          <span className="text-[#888] tracking-widest hidden md:inline-block">ENCRYPTION: RSA-4096</span>
          <span className="ml-2 text-[#00FF41] animate-pulse">{language === 'EN' ? 'LIVE' : 'ACTIVO'}</span>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="absolute top-20 bottom-4 left-4 right-4 flex flex-col md:flex-row gap-6 pointer-events-none z-10 overflow-hidden">
        
        {/* Left Side: Bio/Profile Terminal */}
        <div className={`w-full md:w-[600px] lg:w-[800px] xl:w-[900px] h-1/2 md:h-full transition-all duration-500 pointer-events-auto shadow-2xl ${showProfile ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full absolute md:relative'}`}>
          <TerminalProfile language={language} />
        </div>

        {/* Right Side: Project Data Dump Overlay */}
        <div className="flex-1 relative h-1/2 md:h-full">
          {activeProject && (
            <div className="absolute top-0 right-0 w-full md:w-[400px] bg-black/90 backdrop-blur-md border border-[#E50914] p-5 shadow-[0_0_30px_rgba(229,9,20,0.2)] pointer-events-auto text-sm">
              <div className="flex justify-between items-center border-b border-[#333] pb-2 mb-4">
                <span className="text-xs tracking-widest text-[#E50914] font-bold">{language === 'EN' ? 'VULNERABILITY_FOUND' : 'VULNERABILIDAD_ENCONTRADA'}</span>
                <button 
                  onClick={() => setActiveProject(null)}
                  className="text-[#888] hover:text-white transition-colors"
                >
                  [{language === 'EN' ? 'DISCONNECT' : 'DESCONECTAR'}]
                </button>
              </div>
              
              <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">
                root@node:~$ cat {activeProject.title.EN.replace(/\s+/g, '_').toLowerCase()}.txt
              </h2>
              
              <h3 className="text-xl font-bold text-[#00FF41] mb-2">{activeProject.title[language]}</h3>

              <div className="flex flex-wrap gap-2 mb-4">
                {activeProject.tech.map((tech) => (
                  <span key={tech} className="px-1.5 py-0.5 text-[10px] text-black bg-[#888] uppercase font-bold">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="border-l border-[#333] pl-3 mb-6 opacity-80">
                <p className="leading-relaxed">
                  {activeProject.description[language]}
                </p>
              </div>
              
              <a 
                href={activeProject.github}
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-2 text-center bg-[#E50914]/10 border border-[#E50914] text-[#E50914] hover:bg-[#E50914] hover:text-white font-bold tracking-widest text-xs uppercase transition-all duration-200"
              >
                &gt; {language === 'EN' ? 'INJECT_PAYLOAD (View Repo)' : 'INJECT_PAYLOAD (Ver Repo)'}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Global Mobile Toggle button if profile hidden */}
      {!showProfile && (
        <button 
          onClick={() => setShowProfile(true)}
          className="absolute bottom-4 left-4 z-20 pointer-events-auto bg-black border border-[#00FF41] text-[#00FF41] px-4 py-2 text-xs uppercase"
        >
          &gt; {language === 'EN' ? 'Open Terminal' : 'Abrir Terminal'}
        </button>
      )}
    </div>
  );
}

export default App;
