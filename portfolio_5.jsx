import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Github, Linkedin, Twitter, ExternalLink, Mail, 
  Code, Cpu, Globe, Wrench, Award, BookOpen, 
  Users, Briefcase, GraduationCap, ChevronRight,
  MessageSquare, Send, Quote, Terminal, Sparkles, 
  Zap, Layers, ShieldCheck, Database, Rocket
} from 'lucide-react';

/**
 * GENESIS APEX: THE ULTIMATE DIGITAL ARTIFACT
 * A Masterclass in React Motion & Aesthetic Engineering
 */

// --- HOOKS ---

const useScrollVelocity = () => {
  const [velocity, setVelocity] = useState(0);
  const lastScroll = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const currentScroll = window.scrollY;
      const dt = now - lastTime.current;
      const dx = currentScroll - lastScroll.current;
      if (dt > 0) setVelocity(dx / dt);
      lastScroll.current = currentScroll;
      lastTime.current = now;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return velocity;
};

// --- CORE COMPONENTS ---

const NeonText = ({ children, className = "" }) => (
  <span className={`text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x ${className}`}>
    {children}
  </span>
);

const GlassCard = ({ children, className = "", delay = 0, interactive = true }) => (
  <div 
    className={`
      glass group relative overflow-hidden rounded-[2.5rem] border border-white/10 
      bg-black/20 backdrop-blur-2xl transition-all duration-700 
      ${interactive ? 'hover:border-cyan-400/50 hover:bg-white/[0.03] hover:-translate-y-2 hover:shadow-[0_20px_80px_rgba(0,245,255,0.1)]' : ''}
      ${className}
    `}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-cyan-500/[0.02] pointer-events-none" />
    <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] group-hover:animate-shimmer pointer-events-none" />
    {children}
  </div>
);

const SectionTitle = ({ subtitle, title, alignment = "left" }) => (
  <div className={`mb-20 reveal ${alignment === "center" ? "text-center" : ""}`}>
    <div className={`flex items-center gap-4 mb-4 ${alignment === "center" ? "justify-center" : ""}`}>
      <div className="h-[1px] w-12 bg-cyan-500/50" />
      <span className="text-cyan-400 font-mono text-xs tracking-[0.4em] uppercase">
        {subtitle}
      </span>
    </div>
    <h2 className="text-6xl md:text-8xl font-black tracking-tight text-white leading-[0.9]">
      {title}
    </h2>
  </div>
);

// --- MAIN APPLICATION ---

export default function App() {
  const [activeTab, setActiveTab] = useState('Foundational');
  const [isScrolled, setIsScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [mouseInHero, setMouseInHero] = useState({ x: 0, y: 0 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const scrollVelocity = useScrollVelocity();
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    // Intersection Observer for Reveal animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal-active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleHeroMouse = (e) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 35;
    const y = (e.clientY - top - height / 2) / 35;
    setMouseInHero({ x, y });
  };

  const skills = {
    Foundational: [
      { name: 'Architecture Design', level: 98, icon: Layers },
      { name: 'System Security', level: 92, icon: ShieldCheck },
      { name: 'Data Structures', level: 95, icon: Database },
      { name: 'Algorithm Optimization', level: 88, icon: Zap }
    ],
    Cognitive: [
      { name: 'Generative Models', level: 94, icon: Sparkles },
      { name: 'Transformer Engines', level: 90, icon: Cpu },
      { name: 'Neural Networks', level: 85, icon: Terminal },
      { name: 'RLHF Training', level: 78, icon: Users }
    ],
    Spatial: [
      { name: 'WebGL / Shaders', level: 82, icon: Globe },
      { name: 'Three.js Ecosystem', level: 88, icon: Code },
      { name: 'SVG Animation', level: 95, icon: Wrench },
      { name: 'Micro-Interactions', level: 98, icon: Rocket }
    ]
  };

  const experiences = [
    {
      role: 'Founding Engineer',
      company: 'Aether Dynamics',
      period: '2023 - Present',
      desc: 'Architecting the worlds first autonomous UI generation engine using LLMs. Scaling infra to 5M monthly requests.',
      skills: ['Rust', 'Next.js', 'PyTorch']
    },
    {
      role: 'Lead Visual Strategist',
      company: 'NeoTokyo Studio',
      period: '2021 - 2023',
      desc: 'Pioneered immersive spatial web experiences for luxury automotive brands. Increased user engagement by 400%.',
      skills: ['React', 'Three.js', 'GSAP']
    },
    {
      role: 'Full Stack Ninja',
      company: 'RapidLabs',
      period: '2019 - 2021',
      desc: 'Built high-concurrency trading dashboards with real-time WebSocket visualizations.',
      skills: ['Go', 'TypeScript', 'Docker']
    }
  ];

  return (
    <div className="bg-[#020204] text-white selection:bg-cyan-400 selection:text-black min-h-screen font-sans overflow-x-hidden">
      
      {/* Dynamic Cursor System */}
      <div 
        className="fixed top-0 left-0 w-12 h-12 border border-cyan-400/30 rounded-full pointer-events-none z-[9999] transition-transform duration-300 ease-out hidden md:block"
        style={{ transform: `translate3d(${cursorPos.x - 24}px, ${cursorPos.y - 24}px, 0) scale(${Math.min(3, Math.abs(scrollVelocity) * 2 + 1)})` }}
      />
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ transform: `translate3d(${cursorPos.x - 4}px, ${cursorPos.y - 4}px, 0)` }}
      />

      {/* Kinetic Background Mesh */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(10,10,25,1)_0%,_rgba(2,2,4,1)_100%)]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
        <div 
          className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-cyan-600/10 blur-[150px] rounded-full animate-slow-float"
          style={{ transform: `translate3d(${mouseInHero.x * -2}px, ${mouseInHero.y * -2}px, 0)` }}
        />
        <div 
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-800/10 blur-[150px] rounded-full animate-slow-float-delayed"
          style={{ transform: `translate3d(${mouseInHero.x * 3}px, ${mouseInHero.y * 3}px, 0)` }}
        />
      </div>

      {/* Ultra-Nav */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'py-4 bg-black/40 backdrop-blur-2xl border-b border-white/5' : 'py-10'}`}>
        <div className="container mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-white flex items-center justify-center rounded-xl rotate-45 group-hover:rotate-[225deg] transition-transform duration-700">
              <div className="w-4 h-4 bg-black rounded-sm" />
            </div>
            <span className="text-2xl font-black tracking-tighter">GENESIS</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-12">
            {['Origin', 'Skillset', 'Journey', 'Gallery', 'Reach'].map((item, i) => (
              <a key={i} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-cyan-400 transition-all relative group">
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-cyan-400 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <button className="relative group px-8 py-3 overflow-hidden rounded-full border border-white/10 text-xs font-bold tracking-widest uppercase">
            <span className="relative z-10 transition-colors group-hover:text-black">Resume.pdf</span>
            <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </nav>

      <main>
        {/* HERO: FLUX ENGINE */}
        <section 
          id="origin"
          ref={heroRef}
          onMouseMove={handleHeroMouse}
          className="relative min-h-screen flex items-center justify-center pt-20"
        >
          <div className="container mx-auto px-8 z-10 text-center">
            <div className="inline-block overflow-hidden mb-6">
              <span className="block text-cyan-400 font-mono text-sm tracking-[0.5em] animate-slide-up uppercase">
                Protocol: Development & Design
              </span>
            </div>
            
            <h1 className="text-[12vw] md:text-[9vw] font-black leading-[0.8] tracking-tighter mb-12 select-none">
              <span className="block text-white opacity-90 transition-transform duration-300" style={{ transform: `skewX(${scrollVelocity * 5}deg)` }}>
                REDEFINING
              </span>
              <NeonText className="block">DIGITAL.</NeonText>
            </h1>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-16">
              <div className="max-w-xs text-left">
                <p className="text-gray-500 text-sm leading-relaxed border-l border-white/10 pl-6 uppercase tracking-wider">
                  Specializing in high-concurrency systems and immersive front-end architectures.
                </p>
              </div>
              
              <div className="flex gap-4">
                <a href="#gallery" className="w-20 h-20 rounded-full border border-cyan-400/40 flex items-center justify-center group hover:bg-cyan-400 transition-all duration-500">
                  <ArrowDiagonal className="text-cyan-400 group-hover:text-black transition-colors" />
                </a>
                <div className="flex flex-col justify-center text-left">
                  <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Explore</span>
                  <span className="text-xl font-black">LATEST WORK</span>
                </div>
              </div>
            </div>
          </div>

          {/* Background Particles Simulation */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute bg-cyan-400/20 rounded-full blur-xl animate-float-particle"
                style={{
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </section>

        {/* SKILLS: THE ARSENAL */}
        <section id="skillset" className="py-40 container mx-auto px-8">
          <SectionTitle subtitle="Capabilities" title="The Arsenal." alignment="center" />
          
          <div className="flex justify-center gap-4 mb-20 overflow-x-auto pb-4 no-scrollbar">
            {Object.keys(skills).map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all whitespace-nowrap ${activeTab === cat ? 'bg-cyan-400 text-black shadow-[0_0_40px_rgba(0,245,255,0.3)]' : 'bg-white/5 text-gray-500 hover:text-white border border-white/5'}`}
              >
                {cat} Core
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills[activeTab].map((skill, i) => (
              <GlassCard key={i} className="p-10 text-center" delay={i * 100}>
                <div className="w-16 h-16 mx-auto bg-white/5 rounded-3xl flex items-center justify-center text-cyan-400 mb-8 group-hover:bg-cyan-400 group-hover:text-black transition-all duration-500">
                  <skill.icon size={28} />
                </div>
                <h3 className="text-lg font-bold mb-4">{skill.name}</h3>
                <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-cyan-400 transition-all duration-[1.5s] ease-out shadow-[0_0_10px_rgba(0,245,255,1)]"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <div className="mt-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  Proficiency: {skill.level}%
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* JOURNEY: EXPERIENCE TIMELINE */}
        <section id="journey" className="py-40 relative overflow-hidden">
          <div className="container mx-auto px-8 relative z-10">
            <SectionTitle subtitle="History" title="Chronology." />
            
            <div className="space-y-4">
              {experiences.map((exp, i) => (
                <GlassCard key={i} className="group p-0" interactive={false}>
                  <div className="flex flex-col lg:flex-row p-12 gap-10 lg:items-center">
                    <div className="lg:w-1/4">
                      <div className="text-cyan-400 font-mono text-xs tracking-widest mb-2 uppercase">{exp.period}</div>
                      <h3 className="text-3xl font-black">{exp.role}</h3>
                    </div>
                    
                    <div className="lg:w-1/2">
                      <div className="text-xl font-bold text-gray-300 mb-4">{exp.company}</div>
                      <p className="text-gray-500 leading-relaxed max-w-xl">{exp.desc}</p>
                    </div>

                    <div className="lg:w-1/4 flex flex-wrap gap-2">
                      {exp.skills.map(s => (
                        <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold text-cyan-400/70 uppercase">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY: WORK REVEAL */}
        <section id="gallery" className="py-40 bg-white/[0.02]">
          <div className="container mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
              <SectionTitle subtitle="Portfolio" title="Work Artifacts." />
              <div className="pb-10">
                <p className="text-gray-500 text-sm max-w-xs text-right hidden md:block uppercase tracking-wider leading-relaxed">
                  A curation of high-performance interfaces and system architectures.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <ProjectCard 
                title="NEURAL SYNC" 
                cat="AI Platform" 
                img="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200" 
              />
              <div className="grid gap-12">
                <ProjectCard 
                  title="VOID OS" 
                  cat="Infrastructure" 
                  img="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800" 
                />
                <ProjectCard 
                  title="AETHER UI" 
                  cat="Design System" 
                  img="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* REACH: FINAL TRANSMISSION */}
        <section id="reach" className="py-60 container mx-auto px-8 text-center">
          <div className="max-w-4xl mx-auto reveal">
            <h2 className="text-[10vw] font-black tracking-tighter leading-none mb-20 hover:italic transition-all cursor-crosshair">
              READY FOR<br />THE <NeonText>FUTURE?</NeonText>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-32">
              <ContactLink icon={Mail} label="Email" val="hello@genesis.apex" />
              <ContactLink icon={Twitter} label="Twitter" val="@gen_apex" />
              <ContactLink icon={Github} label="Github" val="gen-apex-lab" />
            </div>

            <div className="glass p-1 text-center inline-block rounded-full">
              <a href="mailto:hello@genesis.apex" className="flex items-center gap-6 px-12 py-6 bg-white text-black rounded-full font-black tracking-widest uppercase hover:bg-cyan-400 transition-colors group">
                Initiate Project <Send className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5">
        <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-[9px] font-black tracking-[0.5em] text-gray-600 uppercase">
            Built by Genesis Apex Lab © 2024 / No. 00-112-APEX
          </div>
          <div className="flex gap-8">
            {['Twitter', 'LinkedIn', 'Dribbble', 'Medium'].map(item => (
              <a key={item} href="#" className="text-[10px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest">{item}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* GLOBAL CSS ENGINE */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-50px) translateX(30px); }
        }
        @keyframes slow-float {
          0% { transform: scale(1) translate(0, 0); opacity: 0.1; }
          50% { transform: scale(1.1) translate(20px, 20px); opacity: 0.15; }
          100% { transform: scale(1) translate(0, 0); opacity: 0.1; }
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 6s ease infinite; }
        .animate-shimmer { animation: shimmer 3s infinite; }
        .animate-float-particle { animation: float-particle ease-in-out infinite; }
        .animate-slow-float { animation: slow-float 15s infinite; }
        .animate-slow-float-delayed { animation: slow-float 20s infinite -5s; }
        .animate-slide-up { animation: slide-up 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

        html { scroll-behavior: smooth; }
        body { background-color: #020204; cursor: none !important; }
        a, button { cursor: none !important; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 1s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-active {
          opacity: 1;
          transform: translateY(0);
        }

        .glass {
          box-shadow: inset 0 0 80px rgba(255,255,255,0.02);
        }
      `}} />
    </div>
  );
}

// --- SUB-COMPONENTS ---

const ArrowDiagonal = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const ProjectCard = ({ title, cat, img }) => (
  <div className="group relative cursor-pointer overflow-hidden rounded-[3rem] bg-white/5 border border-white/10">
    <div className="aspect-[16/10] overflow-hidden">
      <img 
        src={img} 
        alt={title} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
    <div className="absolute bottom-12 left-12">
      <div className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase mb-4">{cat}</div>
      <h3 className="text-4xl font-black text-white">{title}</h3>
    </div>
    <div className="absolute top-12 right-12 w-14 h-14 bg-white rounded-full flex items-center justify-center translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
      <ExternalLink className="text-black" size={20} />
    </div>
  </div>
);

const ContactLink = ({ icon: Icon, label, val }) => (
  <div className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-cyan-400/50 transition-all group cursor-pointer">
    <div className="w-12 h-12 mx-auto bg-white/5 rounded-2xl flex items-center justify-center text-gray-500 group-hover:text-cyan-400 transition-colors mb-6">
      <Icon size={24} />
    </div>
    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-2">{label}</div>
    <div className="text-xl font-bold group-hover:text-white transition-colors">{val}</div>
  </div>
);