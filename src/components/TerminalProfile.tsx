import { useState, useEffect, useRef } from 'react';
import { profileData } from '../data/profile';

interface TerminalProfileProps {
  language: 'EN' | 'ES';
}

export function TerminalProfile({ language }: TerminalProfileProps) {
  const [lines, setLines] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sequence = [
      "root@fsociety:~# ./execute_whoami.sh",
      language === 'EN' ? "Initiating query..." : "Iniciando consulta...",
      language === 'EN' ? "Bypassing firewalls... [OK]" : "Evadiendo firewalls... [OK]",
      language === 'EN' ? "Extracting user profile: YAIR_CUNO_ROJAS" : "Extrayendo perfil de usuario: YAIR_CUNO_ROJAS",
      " ",
      "--- [ ABOUT ME ] ---",
      `> ${profileData[language].bio}`,
      " ",
      "--- [ EXPERIENCE_LOG ] ---",
      ...profileData[language].experience.flatMap(exp => [
        `[*] ${exp.date} : ${exp.role}`,
        ...(exp.tasks?.map(task => `    -> ${task}`) || []),
        " "
      ]),
      "--- [ TECH_STACK_DUMP ] ---",
      `> LANGUAGES: ${profileData.techStack.languages.join(' | ')}`,
      `> TOOLS:     ${profileData.techStack.tools.join(' | ')}`,
      `> CONCEPTS:  ${profileData.techStack.concepts.join(' | ')}`,
      " ",
      "--- [ ACADEMIC_RECORDS ] ---",
      ...profileData[language].education.map(edu => `[*] ${edu.date} : ${edu.institution} -> ${edu.degree}`),
      " ",
      "root@fsociety:~# await instruction_"
    ];

    setLines([]); // Clear on language change
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < sequence.length) {
        setLines(prev => [...prev, sequence[currentIndex]]);
        currentIndex++;
        if (bottomRef.current) {
          bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        clearInterval(interval);
      }
    }, 400); // Typwriter delay

    return () => clearInterval(interval);
  }, [language]); // Re-run when language changes

  return (
    <div className="bg-black/80 backdrop-blur-md border border-[#333] p-6 text-[#00FF41] font-mono text-[11px] md:text-xs h-full overflow-y-auto overflow-x-hidden custom-scrollbar shadow-[0_0_20px_rgba(0,0,0,0.8)] rounded-md">
      <div className="flex justify-between items-center border-b border-[#333] pb-2 mb-4 text-[#888]">
        <span>Terminal - root@kali</span>
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
          <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
        </div>
      </div>
      <div className="leading-relaxed opacity-90">
        {lines.map((line, i) => {
          const isPrompt = line?.includes('root@fsociety');
          const isBullet = line?.startsWith('[*]') || line?.startsWith('    ->') || line?.startsWith('> LANGUAGES:') || line?.startsWith('> TOOLS:') || line?.startsWith('> CONCEPTS:');
          
          return (
            <div 
              key={i} 
              className={`
                ${isPrompt ? 'text-white' : ''} 
                ${isBullet ? 'whitespace-nowrap' : 'whitespace-pre-wrap'}
              `}
            >
              {line}
            </div>
          );
        })}
        
        {lines.includes("root@fsociety:~# await instruction_") && (
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8 animate-pulse pointer-events-auto">
            <span className="text-white">&gt; SELECT_OPTION:</span>
            <a 
              href="mailto:real-fabricio95@hotmail.com" 
              className="px-3 py-1 border border-[#00FF41] hover:bg-[#00FF41] hover:text-black transition-colors duration-300 font-bold text-center w-full md:w-auto"
            >
              [1] SECURE_EMAIL
            </a>
            <a 
              href="https://www.linkedin.com/in/yair-cuno-rojas/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3 py-1 border border-[#00a0dc] text-[#00a0dc] hover:bg-[#00a0dc] hover:text-white transition-colors duration-300 font-bold text-center w-full md:w-auto"
            >
              [2] INFILTRATE_LINKEDIN
            </a>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
