import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  ChevronRight, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Award, 
  Quote, 
  BookOpen,
  Send,
  User,
  Cpu
} from 'lucide-react';

// --- Components ---

const Navbar = ({ activeSection, scrollTo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Research', 'Contact'];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-6 py-8 flex justify-between items-end">
      <div className="text-white text-2xl font-black tracking-tighter cursor-pointer" onClick={() => scrollTo('home')}>
        T/CU<span className="text-blue-500">.</span>
      </div>
      
      {/* Desktop Nav */}
      <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.3em] font-medium text-white/70">
        {navItems.map((item) => (
          <button 
            key={item} 
            onClick={() => scrollTo(item.toLowerCase())}
            className={`hover:text-white transition-colors relative group ${activeSection === item.toLowerCase() ? 'text-white' : ''}`}
          >
            {item}
            <span className={`absolute -bottom-2 left-0 h-[1px] bg-white transition-all duration-500 ${activeSection === item.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </button>
        ))}
      </div>

      {/* Mobile Toggle */}
      <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 animate-in fade-in zoom-in duration-300">
          {navItems.map((item) => (
            <button 
              key={item} 
              onClick={() => { scrollTo(item.toLowerCase()); setIsOpen(false); }}
              className="text-4xl font-bold text-white hover:text-blue-500 transition-colors italic uppercase tracking-tighter"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`min-h-screen relative overflow-hidden ${className}`}>
    {children}
  </section>
);

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const scrollRef = useRef(null);

  // Smooth Scroll & Intersection Observer
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'research', 'contact'];
      const scrollPos = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
        }
      }
    };

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Data
  const projects = [
    { title: "Quantum Pulse", category: "Interactive Design", year: "2024", img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200" },
    { title: "Aether Engine", category: "Game Dev", year: "2023", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" },
    { title: "Void Studio", category: "Branding", year: "2024", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200" }
  ];

  const experience = [
    { role: "Senior Creative Tech", company: "Aesthetic Labs", period: "2022 - Present", desc: "Leading a team of 12 designers and developers to create award-winning immersive experiences." },
    { role: "Interaction Designer", company: "Neon Dynamics", period: "2020 - 2022", desc: "Specialized in motion-driven interfaces and data visualization for fintech leaders." },
    { role: "UI/UX Engineer", company: "Pixel & Dust", period: "2018 - 2020", desc: "Developed fluid web applications with a focus on high-performance animations." }
  ];

  const skills = [
    { name: "Creative Code", level: 95 },
    { name: "Motion Design", level: 90 },
    { name: "3D Rendering", level: 85 },
    { name: "System Architecture", level: 80 }
  ];

  return (
    <div className="bg-black text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      
      {/* Custom Cursor */}
      <div 
        className="hidden md:block fixed w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out mix-blend-difference"
        style={{ left: mousePos.x, top: mousePos.y, transform: `translate(-50%, -50%) scale(${activeSection === 'projects' ? 2 : 1})` }}
      />

      <Navbar activeSection={activeSection} scrollTo={scrollTo} />

      {/* HERO SECTION */}
      <Section id="home" className="flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />
          <img 
            src="https://images.unsplash.com/photo-1464802686167-b939a67e06a1?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-40 scale-110 animate-pulse-slow"
            alt="Hero BG"
            style={{ transform: `translateY(${window.scrollY * 0.1}px)` }}
          />
        </div>
        
        <div className="z-20 px-6 max-w-6xl">
          <p className="text-blue-500 font-mono tracking-[0.5em] mb-4 text-xs uppercase animate-fade-in">Established 1994 // Creative Direction</p>
          <h1 className="text-7xl md:text-[10rem] font-black leading-tight tracking-tighter italic uppercase animate-slide-up">
            Creative <br /> Universe<span className="text-blue-500">.</span>
          </h1>
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 animate-fade-in-delayed">
            <button onClick={() => scrollTo('projects')} className="px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-blue-500 hover:text-white transition-all duration-300 rounded-full group">
              Explore Journey <ArrowRight className="inline ml-2 group-hover:translate-x-2 transition-transform" size={16} />
            </button>
            <div className="flex gap-4">
              <Github className="cursor-pointer hover:text-blue-500 transition-colors" />
              <Linkedin className="cursor-pointer hover:text-blue-500 transition-colors" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-[10px] uppercase tracking-[0.3em]">
          Scroll
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </Section>

      {/* ABOUT SECTION */}
      <Section id="about" className="bg-[#050505] py-24 px-6 md:px-24 flex flex-col md:flex-row items-center gap-20">
        <div className="flex-1 relative group">
          <div className="absolute -inset-4 border border-white/10 group-hover:border-blue-500/50 transition-colors duration-500" />
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
            className="w-full grayscale hover:grayscale-0 transition-all duration-700 aspect-[4/5] object-cover"
            alt="Portrait"
          />
          <div className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 text-[10px] font-bold uppercase">Artist // Architect</div>
        </div>
        
        <div className="flex-1 space-y-12">
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">
            Digital Experiences <br /> Built for <span className="text-blue-500">Humans.</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-light">
            I believe that every pixel tells a story. My mission is to bridge the gap between complex technology and human emotion through cinematic design systems and fluid interactions.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-8">
            <div>
              <div className="text-4xl font-bold mb-2">08+</div>
              <div className="text-xs uppercase text-white/40 tracking-widest">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">120+</div>
              <div className="text-xs uppercase text-white/40 tracking-widest">Projects Completed</div>
            </div>
          </div>
        </div>
      </Section>

      {/* SKILLS SECTION */}
      <Section id="skills" className="py-24 px-6 md:px-24 bg-black">
        <div className="flex flex-col md:flex-row gap-20">
          <div className="w-full md:w-1/3">
             <h3 className="text-xs font-mono text-blue-500 tracking-[0.5em] mb-6 uppercase">Skillset Inventory</h3>
             <h2 className="text-6xl font-bold tracking-tighter mb-8">Mastery <br /> In Motion.</h2>
             <p className="text-white/40 leading-relaxed">Continuous evolution in high-performance web tech and motion principles.</p>
          </div>
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-12">
            {skills.map((skill, i) => (
              <div key={skill.name} className="relative group p-8 border border-white/5 hover:bg-white/5 transition-all duration-500">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-2xl font-bold">{skill.name}</span>
                  <span className="text-blue-500 font-mono text-xs">{skill.level}%</span>
                </div>
                <div className="h-[1px] w-full bg-white/10 relative overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-1000 ease-out"
                    style={{ width: activeSection === 'skills' ? `${skill.level}%` : '0%' }}
                  />
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Cpu size={16} className="text-white/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* EXPERIENCE - HORIZONTAL SEQUENCE */}
      <Section id="experience" className="bg-[#0a0a0a] py-24 flex flex-col justify-center">
        <div className="px-6 md:px-24 mb-16">
          <h2 className="text-7xl font-black italic uppercase tracking-tighter">The Timeline<span className="text-blue-500">.</span></h2>
        </div>
        
        <div className="flex overflow-x-auto pb-12 px-6 md:px-24 gap-8 no-scrollbar scroll-smooth snap-x">
          {experience.map((exp, i) => (
            <div key={i} className="min-w-[350px] md:min-w-[500px] snap-center bg-white/5 p-12 border border-white/10 hover:border-blue-500 transition-all duration-500 group">
              <div className="text-blue-500 font-mono mb-4 text-xs tracking-widest uppercase">{exp.period}</div>
              <h3 className="text-4xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-500">{exp.role}</h3>
              <div className="text-white/40 mb-8 flex items-center gap-2">
                <div className="w-4 h-[1px] bg-white/40" /> {exp.company}
              </div>
              <p className="text-white/60 leading-relaxed text-lg">
                {exp.desc}
              </p>
              <div className="mt-8 flex gap-2">
                {['React', 'WebGL', 'Framer'].map(tag => (
                  <span key={tag} className="text-[10px] border border-white/10 px-3 py-1 rounded-full text-white/40 uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center text-[10px] uppercase tracking-[0.5em] text-white/20 flex flex-col items-center animate-pulse">
          Drag or Scroll to explore
          <div className="w-32 h-[1px] bg-white/10 mt-4" />
        </div>
      </Section>

      {/* PROJECTS SECTION */}
      <Section id="projects" className="bg-black">
        {projects.map((project, i) => (
          <div key={i} className="h-screen w-full relative flex items-center justify-center snap-start overflow-hidden group">
            <div className="absolute inset-0 z-0">
               <img 
                 src={project.img} 
                 className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-1000 ease-out" 
                 alt={project.title}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
            </div>
            
            <div className="z-10 text-center space-y-4 px-6">
              <p className="text-blue-500 font-mono uppercase tracking-[0.6em] text-xs transition-all duration-700 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                Case Study 0{i+1} // {project.category}
              </p>
              <h3 className="text-7xl md:text-[12rem] font-black uppercase italic tracking-tighter leading-none">
                {project.title}
              </h3>
              <div className="pt-8 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300">
                <button className="px-12 py-5 border border-white hover:bg-white hover:text-black transition-all rounded-full font-bold uppercase tracking-widest text-xs">
                  View Case Study <ExternalLink size={14} className="inline ml-2" />
                </button>
              </div>
            </div>
            
            <div className="absolute left-12 bottom-12 hidden md:block text-[10px] text-white/40 uppercase tracking-widest font-mono">
              [ 2024 Release ]
            </div>
            <div className="absolute right-12 bottom-12 hidden md:block text-[10px] text-white/40 uppercase tracking-widest font-mono">
              [ Location: 04.92N / 122.3E ]
            </div>
          </div>
        ))}
      </Section>

      {/* RESEARCH SECTION */}
      <Section id="research" className="bg-white text-black py-32 px-6 md:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <BookOpen className="text-blue-600" />
            <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-black/50">Scientific Inquiry & Publication</h2>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black mb-20 tracking-tighter leading-tight italic">
            Thinking <br /> Deeply.
          </h2>

          <div className="space-y-16">
            {[
              { title: "Neuro-Visual Interaction Models", date: "Jan 2024", type: "Whitepaper", abstract: "Investigating the correlation between visual frame rates and cognitive emotional response in digital interfaces." },
              { title: "The Ethics of Generative UI", date: "Nov 2023", type: "Conference Paper", abstract: "A study on algorithmic bias in automated layout generation and the human role in creative oversight." }
            ].map((paper, i) => (
              <div key={i} className="group border-b border-black/10 pb-12">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-600">{paper.type}</span>
                  <span className="text-xs font-mono text-black/40">{paper.date}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 group-hover:translate-x-4 transition-transform duration-500 cursor-pointer flex items-center justify-between">
                  {paper.title}
                  <ChevronRight size={32} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-black/60 max-w-2xl leading-relaxed text-lg italic border-l-4 border-black/5 pl-8">
                  "{paper.abstract}"
                </p>
                <div className="mt-8 flex gap-6 text-[10px] font-bold uppercase tracking-widest underline decoration-blue-600 underline-offset-8 cursor-pointer hover:text-blue-600 transition-colors">
                  Read Abstract
                  <span>Download PDF</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* VOICES (TESTIMONIALS) */}
      <Section className="bg-black py-32 flex items-center justify-center">
        <div className="max-w-5xl px-6 text-center space-y-12">
          <Quote className="text-blue-500 mx-auto" size={48} />
          <p className="text-3xl md:text-5xl font-medium leading-tight italic text-white/90">
            "They don't just build websites; they build digital legacies. The attention to motion and narrative timing is unparalleled in the industry."
          </p>
          <div className="space-y-2">
            <h4 className="text-xl font-bold uppercase tracking-tighter">Marcus V. Sterling</h4>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">CEO // Horizon Global</p>
          </div>
        </div>
      </Section>

      {/* CONTACT SECTION */}
      <Section id="contact" className="bg-[#050505] py-24 px-6 md:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-24">
          <div className="flex-1 space-y-8">
            <h2 className="text-7xl font-black uppercase tracking-tighter leading-none italic">
              Ready to <br /> <span className="text-blue-500 underline">Evolve?</span>
            </h2>
            <p className="text-2xl text-white/40 font-light max-w-md">
              Currently accepting selected projects for 2025/26. Let's create something immortal.
            </p>
            <div className="space-y-4 pt-8">
              <div className="flex items-center gap-4 text-xl">
                <Mail className="text-blue-500" /> universe@creative.studio
              </div>
              <div className="text-xs text-white/20 uppercase tracking-widest">Global Operations // Remote Friendly</div>
            </div>
          </div>
          
          <div className="flex-1 bg-white/5 p-8 md:p-12 border border-white/10 rounded-2xl relative">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-blue-500 transition-colors peer placeholder:text-transparent"
                />
                <label className="absolute left-0 top-4 text-white/20 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-blue-500 peer-focus:text-xs uppercase tracking-widest peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Your Name</label>
              </div>
              
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-blue-500 transition-colors peer placeholder:text-transparent"
                />
                <label className="absolute left-0 top-4 text-white/20 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-blue-500 peer-focus:text-xs uppercase tracking-widest peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Email Address</label>
              </div>

              <div className="relative group">
                <textarea 
                  rows="4"
                  placeholder="Brief Project Details" 
                  className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-blue-500 transition-colors peer placeholder:text-transparent resize-none"
                />
                <label className="absolute left-0 top-4 text-white/20 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-blue-500 peer-focus:text-xs uppercase tracking-widest peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Project Details</label>
              </div>

              <button className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.4em] text-xs transition-all duration-300 flex items-center justify-center gap-4 group">
                Send Transmission <Send size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="bg-black py-12 px-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-xs text-white/20 font-mono tracking-widest uppercase">
          © 2025 Creative Universe Studio // All Rights Reserved
        </div>
        <div className="flex gap-8 text-[10px] uppercase font-bold tracking-widest">
          <a href="#" className="hover:text-blue-500 transition-colors">Instagram</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Behance</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Dribbble</a>
        </div>
        <div className="text-[10px] text-white/20 uppercase tracking-[0.3em]">
          Designed for Impact // Built for Speed
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-fade-in-delayed {
          animation: fadeIn 1.5s ease-out 0.5s forwards;
          opacity: 0;
        }
        .animate-slide-up {
          animation: slideUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(100px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        ::-webkit-scrollbar {
          width: 5px;
        }
        ::-webkit-scrollbar-track {
          background: #000;
        }
        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #3b82f6;
        }
        html {
          scroll-behavior: smooth;
        }
      `}} />
    </div>
  );
};

export default App;