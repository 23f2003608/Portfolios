import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Database, 
  Cpu, 
  Code2, 
  Terminal, 
  Award, 
  ChevronRight, 
  Layers, 
  Activity,
  User,
  BookOpen,
  Send,
  Sparkles
} from 'lucide-react';

// --- Utility Components ---

const GlassCard = ({ children, className = "", hover = true }) => (
  <motion.div
    whileHover={hover ? { y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" } : {}}
    className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

const GlowingText = ({ children, color = "cobalt" }) => {
  const colors = {
    cobalt: "text-[#0047FF] drop-shadow-[0_0_10px_rgba(0,71,255,0.5)]",
    tangerine: "text-[#FF4D00] drop-shadow-[0_0_10px_rgba(255,77,0,0.5)]"
  };
  return <span className={`${colors[color]} font-bold`}>{children}</span>;
};

// --- Background Neural Mesh (3D-like with Canvas) ---

const NeuralBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
    }

    const init = () => {
      particles = Array.from({ length: 80 }, () => new Particle());
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 71, 255, 0.15)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      
      particles.forEach((p, i) => {
        p.update();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 150) {
            ctx.lineWidth = 1 - dist / 150;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />;
};

// --- Magnetic Component ---

const MagneticButton = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Sections ---

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <motion.section 
      style={{ opacity, scale }}
      className="h-screen flex flex-col items-center justify-center relative z-10 px-6 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs tracking-widest uppercase font-mono text-white/50"
      >
        Based in Chennai • IIT Madras Scholar
      </motion.div>
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-6xl md:text-9xl font-bold tracking-tighter mb-4"
      >
        DATA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047FF] to-[#FF4D00]">STORY</span>TELLER
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-white/60 text-lg md:text-xl max-w-2xl font-light"
      >
        Bridging the gap between raw compute and human intuition. 
        Specializing in High-Dimensional Analytics & Neural Architectures.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/30">Scroll to Explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </motion.section>
  );
};

const About = () => {
  return (
    <section className="min-h-screen py-24 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
          THE <br /> <GlowingText>NARRATIVE</GlowingText>
        </h2>
        <p className="text-white/70 text-lg leading-relaxed max-w-lg">
          My journey started at <span className="text-white font-medium">IIT Madras</span>, where I discovered that data isn't just numbers—it's the digital fingerprint of reality. 
          I don't just build models; I engineer narratives that solve high-stakes clinical and organizational challenges.
        </p>
        <div className="flex gap-4">
          <MagneticButton>
            <button className="px-6 py-3 bg-[#0047FF] hover:bg-[#0036CC] rounded-lg transition-colors flex items-center gap-2 text-sm font-semibold">
              <ExternalLink size={16} /> CV_2024.pdf
            </button>
          </MagneticButton>
          <MagneticButton>
            <button className="px-6 py-3 border border-white/10 hover:bg-white/5 rounded-lg transition-colors text-sm font-semibold">
              Contact Me
            </button>
          </MagneticButton>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0047FF] to-[#FF4D00] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <GlassCard className="p-8 relative aspect-square flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <User className="text-[#0047FF]" />
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-tighter text-white/40">Status</p>
              <p className="text-xs font-mono text-[#FF4D00]">ACTIVE_RESEARCHER</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">IIT Madras BS</h3>
            <p className="text-sm text-white/50 mb-4">Data Science & Applications</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-[10px] text-white/30 uppercase">Scholarship</p>
                <p className="text-xs">Cargill Global Scholar</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-[10px] text-white/30 uppercase">Focus</p>
                <p className="text-xs">Clinical Data ML</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

const Skills = () => {
  const categories = [
    {
      title: "Machine Learning",
      icon: <Cpu size={20} />,
      skills: ["PyTorch", "TensorFlow", "Scikit-Learn", "XGBoost", "Deep Learning"]
    },
    {
      title: "Backend & Cloud",
      icon: <Database size={20} />,
      skills: ["Flask", "Django", "PostgreSQL", "Redis", "AWS", "Docker"]
    },
    {
      title: "Modern Tooling",
      icon: <Terminal size={20} />,
      skills: ["uv", "Poetry", "Git", "DVC", "MLflow", "Spark"]
    }
  ];

  return (
    <section className="py-24 px-6 md:px-20">
      <div className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tighter">THE ENGINE</h2>
        <p className="text-white/40 max-w-xl mx-auto">Propelling data-driven decisions through a modern, robust tech stack.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <GlassCard key={idx} className="p-8 border-t-2 border-t-white/5 group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#0047FF]/10 text-[#0047FF] rounded-lg group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight">{cat.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/60 hover:text-white hover:border-[#0047FF] transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      title: "Lead Data Analyst",
      company: "Tech-Scale Clinical",
      period: "2023 - Present",
      description: "Driving clinical optimization pipelines. Facilitated a career leap during 2nd year of undergrad due to technical proficiency.",
      glow: "cobalt"
    },
    {
      title: "Full Stack ML Intern",
      company: "Herbal Homoeo",
      period: "2022 - 2023",
      description: "Engineered clinical data management systems, reducing data entry friction by 40% using automated OCR and LLM parsing.",
      glow: "tangerine"
    }
  ];

  return (
    <section className="py-24 px-6 md:px-20 overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-bold mb-20 text-center uppercase tracking-tighter">THE JOURNEY</h2>
      
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#0047FF] via-[#FF4D00] to-transparent opacity-20" />
        
        {experiences.map((exp, idx) => (
          <motion.div
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            key={idx}
            className={`flex items-center gap-8 mb-20 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
          >
            <div className={`flex-1 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
              <GlassCard className="p-6 inline-block w-full max-w-sm">
                <p className={`text-[10px] font-mono mb-1 ${exp.glow === 'cobalt' ? 'text-[#0047FF]' : 'text-[#FF4D00]'}`}>
                  {exp.period}
                </p>
                <h3 className="text-xl font-bold">{exp.title}</h3>
                <p className="text-sm text-white/50 mb-3">{exp.company}</p>
                <p className="text-xs text-white/70 leading-relaxed">{exp.description}</p>
              </GlassCard>
            </div>
            
            <div className="relative flex flex-col items-center">
              <div className={`w-4 h-4 rounded-full border-2 ${exp.glow === 'cobalt' ? 'bg-[#0047FF] border-[#0047FF]/50' : 'bg-[#FF4D00] border-[#FF4D00]/50'} shadow-[0_0_15px_rgba(255,255,255,0.2)]`} />
            </div>
            
            <div className="flex-1" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Portfolios",
      subtitle: "Open Source Community",
      tags: ["React", "Firebase", "Node.js"],
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
      links: { demo: "#", github: "#" }
    },
    {
      title: "Herbal Homoeo",
      subtitle: "Clinical Data Engine",
      tags: ["Python", "Flask", "PostgreSQL"],
      img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
      links: { demo: "#", github: "#" }
    }
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-white/2">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">THE LAB</h2>
          <p className="text-white/40 mt-2">Experimental builds and production-grade systems.</p>
        </div>
        <div className="hidden md:block">
          <MagneticButton>
            <a href="#" className="flex items-center gap-2 text-xs font-mono text-[#0047FF] uppercase tracking-widest">
              View All Works <ChevronRight size={14} />
            </a>
          </MagneticButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((proj, idx) => (
          <GlassCard key={idx} className="group relative">
            <div className="aspect-video overflow-hidden">
              <img 
                src={proj.img} 
                alt={proj.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-60 group-hover:opacity-100"
              />
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold">{proj.title}</h3>
                  <p className="text-white/50 text-sm">{proj.subtitle}</p>
                </div>
                <div className="flex gap-2">
                  <MagneticButton>
                    <a href={proj.links.github} className="p-2 bg-white/5 rounded-full border border-white/10 hover:bg-[#0047FF] transition-colors">
                      <Github size={18} />
                    </a>
                  </MagneticButton>
                  <MagneticButton>
                    <a href={proj.links.demo} className="p-2 bg-white/5 rounded-full border border-white/10 hover:bg-[#FF4D00] transition-colors">
                      <ExternalLink size={18} />
                    </a>
                  </MagneticButton>
                </div>
              </div>
              <div className="flex gap-2">
                {proj.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase font-mono px-2 py-1 bg-white/5 border border-white/5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

const DeepTech = () => {
  const topics = [
    { title: "MoE Architectures", content: "Understanding Mixture of Experts for scalable inference and sparse activation in LLMs." },
    { title: "Attention Mechanisms", content: "Deep dive into multi-head attention, self-attention patterns, and KV-cache optimization." },
    { title: "RAG Pipelines", content: "Building sophisticated Retrieval Augmented Generation systems using vector databases." }
  ];

  return (
    <section className="py-24 px-6 md:px-20">
      <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center tracking-tighter">DEEP TECH</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topics.map((topic, idx) => (
          <div key={idx} className="perspective-1000 group">
            <motion.div
              whileHover={{ rotateY: 10, rotateX: 5 }}
              className="relative h-64 w-full transition-transform duration-500 transform-style-3d"
            >
              <GlassCard className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center backface-hidden">
                <BookOpen className="text-[#0047FF] mb-4" size={32} />
                <h3 className="text-xl font-bold">{topic.title}</h3>
                <div className="mt-4 text-[10px] uppercase tracking-widest text-[#0047FF]">Click to expand</div>
              </GlassCard>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  
  return (
    <section className="py-24 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <GlassCard className="p-10 border-t-2 border-t-[#0047FF]">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-6">INITIATE<br /><GlowingText>CONNECTION</GlowingText></h2>
              <div className="space-y-6 text-sm text-white/60">
                <p>Establishing secure handshake protocol...</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Mail size={16} />
                  </div>
                  <span>research@iitm.ac.in</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Linkedin size={16} />
                  </div>
                  <span>linkedin.com/in/datasci-lead</span>
                </div>
              </div>
            </div>

            <div className="flex-[1.5] space-y-4">
              <div className="bg-black/50 p-4 rounded-lg font-mono text-xs border border-white/5">
                <p className="text-[#0047FF] mb-2">$ input --name "{formState.name || '...'}"</p>
                <input 
                  type="text" 
                  placeholder="IDENTIFIER"
                  className="bg-transparent border-none outline-none w-full text-white mb-4"
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                />
                <p className="text-[#0047FF] mb-2">$ input --email "{formState.email || '...'}"</p>
                <input 
                  type="email" 
                  placeholder="SECURE_CHANNEL"
                  className="bg-transparent border-none outline-none w-full text-white mb-4"
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                />
                <p className="text-[#0047FF] mb-2">$ input --message</p>
                <textarea 
                  placeholder="TRANSMISSION_CONTENT"
                  rows="3"
                  className="bg-transparent border-none outline-none w-full text-white resize-none"
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                />
              </div>
              <MagneticButton>
                <button className="w-full py-4 bg-[#0047FF] rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#0036CC] transition-all">
                  EXECUTE_SEND <Send size={16} />
                </button>
              </MagneticButton>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

// --- Footer Marquee ---

const CredsMarquee = () => {
  return (
    <div className="py-12 bg-white/2 border-y border-white/5 overflow-hidden flex whitespace-nowrap">
      <div className="animate-marquee flex gap-12 items-center text-xs font-mono text-white/20 uppercase tracking-[0.4em]">
        <span>Cargill Global Scholar Selection 2023</span>
        <div className="w-1 h-1 rounded-full bg-white/20" />
        <span>Azure Data Fundamental Certified</span>
        <div className="w-1 h-1 rounded-full bg-white/20" />
        <span>IIT Madras Dean's List 2022</span>
        <div className="w-1 h-1 rounded-full bg-white/20" />
        <span>Top 1% Kaggle Competition - Clinical Analytics</span>
        <div className="w-1 h-1 rounded-full bg-white/20" />
        <span>Open Source Contributor @ Portfolios</span>
        <div className="w-1 h-1 rounded-full bg-white/20" />
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-[#030303] text-white selection:bg-[#0047FF] selection:text-white font-sans overflow-x-hidden">
      {/* Custom Cursor Element */}
      <motion.div 
        animate={{ x: mousePos.x - 12, y: mousePos.y - 12 }}
        transition={{ type: "spring", damping: 25, stiffness: 250, mass: 0.5 }}
        className="fixed w-6 h-6 border-2 border-[#0047FF] rounded-full pointer-events-none z-[9999] hidden md:block"
      />
      <motion.div 
        animate={{ x: mousePos.x - 2, y: mousePos.y - 2 }}
        transition={{ type: "spring", damping: 30, stiffness: 350, mass: 0.1 }}
        className="fixed w-1 h-1 bg-white rounded-full pointer-events-none z-[9999] hidden md:block"
      />

      <NeuralBackground />

      <header className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 mix-blend-difference">
        <div className="text-xl font-black tracking-tighter">DS.PROTO</div>
        <nav className="hidden md:flex gap-8 text-[10px] uppercase tracking-widest font-bold">
          <a href="#" className="hover:text-[#0047FF] transition-colors">Origins</a>
          <a href="#" className="hover:text-[#0047FF] transition-colors">Engine</a>
          <a href="#" className="hover:text-[#0047FF] transition-colors">Lab</a>
          <a href="#" className="hover:text-[#0047FF] transition-colors">Terminal</a>
        </nav>
        <div className="flex gap-4">
          <Github size={18} className="cursor-pointer hover:text-[#0047FF] transition-colors" />
          <Linkedin size={18} className="cursor-pointer hover:text-[#0047FF] transition-colors" />
        </div>
      </header>

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <DeepTech />
        <Contact />
        <CredsMarquee />
      </main>

      <footer className="py-12 text-center text-[10px] font-mono text-white/20 uppercase tracking-widest">
        &copy; 2024 Neural Architecture Portfolio • Built with React & Framer Motion
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: 200%;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        ::-webkit-scrollbar {
          width: 5px;
        }
        ::-webkit-scrollbar-track {
          background: #030303;
        }
        ::-webkit-scrollbar-thumb {
          background: #0047FF;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
}