import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Github, Linkedin, Twitter, ExternalLink, Mail, 
  Code, Cpu, Globe, Tool, Award, BookOpen, 
  Users, Briefcase, GraduationCap, ChevronRight,
  MessageSquare, Send, Quote, Terminal
} from 'lucide-react';

/**
 * GENESIS ULTRA PREMIER PORTFOLIO
 * Tech Stack: React + Tailwind CSS
 * Design: Futuristic Dark Glassmorphism 2.0
 */

// --- UTILITY COMPONENTS ---

const GlassCard = ({ children, className = "", delay = 0 }) => (
  <div 
    className={`
      glass group relative overflow-hidden rounded-3xl border border-white/10 
      bg-black/40 backdrop-blur-xl transition-all duration-500 
      hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(0,245,255,0.15)]
      ${className}
    `}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    {children}
  </div>
);

const SectionTitle = ({ subtitle, title }) => (
  <div className="mb-16 reveal">
    <span className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase block mb-3">
      {subtitle}
    </span>
    <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white">
      {title}
    </h2>
  </div>
);

// --- MAIN APP ---

export default function App() {
  const [activeTab, setActiveTab] = useState('Programming');
  const [isScrolled, setIsScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [mouseInHero, setMouseInHero] = useState({ x: 0, y: 0 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef(null);

  // Custom Cursor Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', () => setIsScrolled(window.scrollY > 50));
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parallax Hero Effect
  const handleHeroMouse = (e) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    setMouseInHero({ x, y });
  };

  // Section Data
  const skills = {
    Programming: [
      { name: 'Python', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'C++', level: 75 },
      { name: 'Rust', level: 65 }
    ],
    'ML / AI': [
      { name: 'PyTorch', level: 88 },
      { name: 'TensorFlow', level: 82 },
      { name: 'NLP / LLMs', level: 90 },
      { name: 'Computer Vision', level: 80 }
    ],
    'Web Dev': [
      { name: 'React / Next.js', level: 95 },
      { name: 'Tailwind CSS', level: 98 },
      { name: 'Node.js', level: 85 },
      { name: 'Three.js', level: 70 }
    ],
    Tools: [
      { name: 'Docker / K8s', level: 80 },
      { name: 'AWS / GCP', level: 75 },
      { name: 'Git / CI/CD', level: 92 },
      { name: 'Figma', level: 85 }
    ]
  };

  const projects = [
    {
      title: "Neural Engine X",
      category: "Artificial Intelligence",
      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
      stack: ["Python", "PyTorch", "React"],
      desc: "Real-time generative AI interface for latent space exploration."
    },
    {
      title: "Cyber Ledger",
      category: "Blockchain / FinTech",
      img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
      stack: ["Next.js", "Solidity", "Tailwind"],
      desc: "High-security digital asset management platform with biometrics."
    },
    {
      title: "Vortex UI",
      category: "Design Systems",
      img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800",
      stack: ["TypeScript", "Three.js", "Framer"],
      desc: "Component library for motion-heavy immersive web applications."
    }
  ];

  const testimonials = [
    {
      name: "Dr. Elena Vance",
      role: "Lead Researcher at MIT",
      text: "The integration of AI logic with high-end frontend interfaces is the best I've seen in the industry.",
      avatar: "https://i.pravatar.cc/150?u=elena"
    },
    {
      name: "Marcus Aurelius",
      role: "CEO of FutureStack",
      text: "A visionary developer who understands that performance and beauty are not mutually exclusive.",
      avatar: "https://i.pravatar.cc/150?u=marcus"
    }
  ];

  return (
    <div className="bg-[#020205] text-white selection:bg-cyan-400 selection:text-black min-h-screen font-sans">
      
      {/* Custom Cursor */}
      <div 
        className="fixed top-0 left-0 w-8 h-8 border border-cyan-400 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-150 ease-out hidden md:block"
        style={{ transform: `translate3d(${cursorPos.x - 16}px, ${cursorPos.y - 16}px, 0)` }}
      />
      <div 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ transform: `translate3d(${cursorPos.x - 3}px, ${cursorPos.y - 3}px, 0)` }}
      />

      {/* Ambient Background */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150" />
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 bg-black/60 backdrop-blur-md border-b border-white/5' : 'py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter text-white">GENESIS<span className="text-cyan-400">.</span></div>
          <div className="hidden md:flex items-center gap-10">
            {['About', 'Skills', 'Projects', 'Research', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-gray-400 hover:text-cyan-400 transition-colors tracking-widest uppercase">
                {link}
              </a>
            ))}
            <button className="px-6 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-cyan-400 transition-colors uppercase tracking-tighter">
              Resume
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="home"
        ref={heroRef}
        onMouseMove={handleHeroMouse}
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        <div 
          className="container mx-auto px-6 text-center z-10 transition-transform duration-200 ease-out"
          style={{ transform: `translate3d(${mouseInHero.x}px, ${mouseInHero.y}px, 0)` }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold mb-8 uppercase tracking-widest animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            Open for Innovation
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-8">
            <span className="block text-white">FUTURE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">ARCHITECT.</span>
          </h1>
          
          <p className="max-w-xl mx-auto text-gray-400 text-lg md:text-xl mb-12 font-light leading-relaxed">
            Bridging the gap between artificial intelligence and human-centric design through high-performance digital artifacts.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="#projects" className="group relative px-10 py-5 bg-cyan-400 text-black font-bold rounded-2xl transition-all hover:shadow-[0_0_30px_rgba(0,245,255,0.4)]">
              VIEW WORK
            </a>
            <a href="#contact" className="px-10 py-5 border border-white/10 bg-white/5 backdrop-blur-md text-white font-bold rounded-2xl hover:bg-white/10 transition-all">
              CONTACT ME
            </a>
          </div>
        </div>

        {/* Hero Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-cyan-400 rounded-[3rem] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <GlassCard className="p-0 aspect-square rounded-[3rem] rotate-3 hover:rotate-0 transition-all duration-700">
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Profile" />
            </GlassCard>
            <div className="absolute -bottom-6 -right-6 bg-cyan-400 p-8 rounded-3xl text-black font-black text-4xl shadow-2xl">
              08<span className="text-xl">YRS</span>
            </div>
          </div>
          <div>
            <SectionTitle subtitle="01. About Me" title="Evolution of a Developer." />
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Based in the intersection of logic and art, I specialize in building digital experiences that define the next generation of the web. My approach combines rigorous software engineering with the finesse of high-end design.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Projects Completed', val: '120+' },
                { label: 'Lines of Code', val: '2.5M' },
                { label: 'Research Papers', val: '14' },
                { label: 'Github Stars', val: '4.2k' }
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10">
                  <div className="text-3xl font-bold text-white mb-1">{stat.val}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 bg-white/5 backdrop-blur-3xl border-y border-white/5">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="02. Expertise" title="Mastered Arsenal." />
          
          <div className="flex flex-wrap gap-4 mb-16">
            {Object.keys(skills).map(category => (
              <button 
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeTab === category ? 'bg-cyan-400 text-black' : 'bg-white/5 text-gray-400 hover:text-white'}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills[activeTab].map((skill, i) => (
              <GlassCard key={i} className="p-8">
                <div className="flex justify-between items-end mb-4">
                  <div className="text-xl font-bold">{skill.name}</div>
                  <div className="text-cyan-400 font-mono">{skill.level}%</div>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-400 shadow-[0_0_15px_rgba(0,245,255,0.8)] transition-all duration-1000 ease-out" 
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 container mx-auto px-6">
        <SectionTitle subtitle="03. Journey" title="Experience Roadmap." />
        <div className="space-y-6">
          {[
            { role: 'Senior Architect', company: 'Global Tech Inc', date: '2022 - Present', desc: 'Leading cross-functional teams to build enterprise-scale AI dashboards.' },
            { role: 'Full Stack Developer', company: 'Creative Agency NYC', date: '2020 - 2022', desc: 'Built high-fidelity motion experiences for luxury fashion brands.' },
            { role: 'Backend Engineer', company: 'DataStream', date: '2018 - 2020', desc: 'Optimized real-time data pipelines processing millions of events per second.' }
          ].map((item, i) => (
            <GlassCard key={i} className="flex flex-col md:flex-row items-center gap-10 p-10 hover:bg-white/[0.07]">
              <div className="w-full md:w-1/4">
                <div className="text-cyan-400 font-mono text-sm mb-2">{item.date}</div>
                <div className="text-2xl font-black">{item.role}</div>
              </div>
              <div className="w-full md:w-3/4 flex justify-between items-center">
                <div>
                  <div className="text-xl font-bold text-gray-300 mb-4">{item.company}</div>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
                <ChevronRight className="text-gray-700 hidden md:block" />
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-black">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="04. Portfolio" title="Digital Artifacts." />
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-[2rem] mb-6 aspect-[4/5] border border-white/10 bg-white/5">
                  <img src={project.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" alt={project.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                  <div className="absolute bottom-8 left-8">
                    <div className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2">{project.category}</div>
                    <h3 className="text-3xl font-black text-white">{project.title}</h3>
                  </div>
                  <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <ExternalLink size={20} />
                  </div>
                </div>
                <div className="px-4">
                  <p className="text-gray-500 text-sm mb-4">{project.desc}</p>
                  <div className="flex gap-3">
                    {project.stack.map((s, j) => (
                      <span key={j} className="text-[10px] font-bold px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400 uppercase tracking-tighter">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-32 container mx-auto px-6">
        <SectionTitle subtitle="05. Academia" title="Research & Papers." />
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: 'Neural Latent Navigation in GANs', venue: 'CVPR 2023', tags: ['Deep Learning', 'Generative'] },
            { title: 'Scalable Micro-Frontend Architectures', venue: 'IEEE Software', tags: ['Systems', 'Web'] }
          ].map((paper, i) => (
            <GlassCard key={i} className="p-10 border-l-4 border-l-cyan-400">
              <div className="text-cyan-400 font-mono text-xs mb-4 uppercase tracking-[0.2em]">{paper.venue}</div>
              <h3 className="text-2xl font-bold mb-6 hover:text-cyan-400 transition-colors cursor-pointer">{paper.title}</h3>
              <div className="flex gap-2">
                {paper.tags.map(tag => (
                  <span key={tag} className="text-[10px] bg-white/5 border border-white/5 px-2 py-1 rounded text-gray-500">{tag}</span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Education & Creds */}
      <section className="py-32 bg-white/5 border-y border-white/5">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20">
          <div>
            <SectionTitle subtitle="06. Background" title="Education." />
            <div className="space-y-12">
              {[
                { school: 'Stanford University', degree: 'M.S. Computer Science', date: '2020', focus: 'AI & Machine Learning' },
                { school: 'UC Berkeley', degree: 'B.S. Software Engineering', date: '2018', focus: 'Distributed Systems' }
              ].map((edu, i) => (
                <div key={i} className="relative pl-10 border-l border-white/10">
                  <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,245,255,1)]" />
                  <div className="text-white font-black text-2xl mb-1">{edu.school}</div>
                  <div className="text-cyan-400 font-bold mb-2">{edu.degree} — {edu.date}</div>
                  <p className="text-gray-500 text-sm">Focus: {edu.focus}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionTitle subtitle="07. Recognition" title="Credentials." />
            <div className="grid grid-cols-2 gap-4">
              {['AWS Professional Architect', 'Google ML Engineer', 'TensorFlow Cert', 'DeepLearning.AI Spec', 'Certified Scrum Master', 'CKAD Developer'].map((cert, i) => (
                <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center gap-4 group hover:border-cyan-400/50 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                    <Award size={20} />
                  </div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Voices (Testimonials) */}
      <section id="voices" className="py-32 container mx-auto px-6 text-center">
        <SectionTitle subtitle="08. Feedback" title="Voices." />
        <div className="max-w-4xl mx-auto">
          <Quote className="mx-auto text-cyan-400/20 mb-10" size={80} />
          <div className="min-h-[200px] mb-12 flex items-center justify-center">
            <p className="text-2xl md:text-3xl font-light italic text-gray-300 leading-relaxed">
              "{testimonials[activeTestimonial].text}"
            </p>
          </div>
          <div className="flex items-center justify-center gap-6">
            {testimonials.map((t, i) => (
              <button 
                key={i} 
                onClick={() => setActiveTestimonial(i)}
                className={`transition-all duration-500 ${activeTestimonial === i ? 'scale-125 opacity-100' : 'scale-90 opacity-40'}`}
              >
                <img src={t.avatar} className={`w-16 h-16 rounded-full border-2 ${activeTestimonial === i ? 'border-cyan-400' : 'border-transparent'}`} alt={t.name} />
                <div className={`mt-4 ${activeTestimonial === i ? 'block' : 'hidden'}`}>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-xs text-gray-500 uppercase">{t.role}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <SectionTitle subtitle="09. Signal" title="Get in Touch." />
            <p className="text-gray-400 text-lg mb-12">
              Currently accepting selected high-impact projects. If you have a vision that requires architectural excellence, drop a message.
            </p>
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', val: 'hello@genesis.io' },
                { icon: Twitter, label: 'Twitter', val: '@genesis_dev' },
                { icon: Github, label: 'Github', val: 'github.com/genesis' }
              ].map((link, i) => (
                <div key={i} className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-cyan-400 group-hover:text-black transition-all">
                    <link.icon size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-bold mb-1">{link.label}</div>
                    <div className="text-xl font-bold group-hover:text-cyan-400 transition-colors">{link.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <GlassCard className="p-12">
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <input className="bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-cyan-400 outline-none transition-all" placeholder="Name" />
                <input className="bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-cyan-400 outline-none transition-all" placeholder="Email" />
              </div>
              <input className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-cyan-400 outline-none transition-all" placeholder="Subject" />
              <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-cyan-400 outline-none transition-all h-40" placeholder="Message" />
              <button className="w-full py-5 bg-cyan-400 text-black font-black rounded-2xl hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all flex items-center justify-center gap-3">
                SEND TRANSMISSION <Send size={20} />
              </button>
            </form>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 text-center">
        <div className="text-gray-500 text-xs tracking-[0.5em] uppercase mb-8">
          © 2024 GENESIS DESIGN LAB / ALL SYSTEMS OPERATIONAL
        </div>
        <div className="flex justify-center gap-10">
          <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors"><Twitter size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors"><Linkedin size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors"><Github size={20} /></a>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        
        html { scroll-behavior: smooth; }
        body::-webkit-scrollbar { width: 8px; }
        body::-webkit-scrollbar-track { background: #020205; }
        body::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
        body::-webkit-scrollbar-thumb:hover { background: #00f5ff; }

        .glass {
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
        }
      `}} />

    </div>
  );
}