import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { 
  Github, Linkedin, ExternalLink, Mail, ChevronRight, Code2, 
  BrainCircuit, Layers, Cpu, FileText, GraduationCap, Heart, 
  Award, MessageSquare, ArrowRight, Sparkles, Terminal, ShieldCheck, Zap,
  Globe, FlaskConical, BookOpen, Fingerprint, Activity, MousePointer2
} from 'lucide-react';

// --- Specialized Interactive Background ---

const InteractiveGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null };

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
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.4;
        this.color = Math.random() > 0.5 ? '#6366f1' : '#22d3ee';
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
          this.reset();
        }

        if (mouse.x) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            this.x -= dx * 0.02;
            this.y -= dy * 0.02;
            this.opacity = Math.min(0.8, this.opacity + 0.01);
          } else {
            this.opacity = Math.max(0.1, this.opacity - 0.01);
          }
        }
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 120; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.5 }} />;
};

// --- Config & Massive Data Store ---

const DATA = {
  profile: {
    name: "Alex Sterling",
    role: "Lead Machine Learning Engineer",
    company: "Vanguard AI",
    location: "San Francisco / Remote",
    tagline: "Building high-bandwidth interfaces between human intent and machine execution.",
    bio: "Senior MLE with 8+ years specializing in distributed training, low-latency inference, and the productization of LLMs. Former Research Lead at OpenBrain. I focus on building resilient, deterministic systems within the chaos of probabilistic modeling."
  },
  metrics: [
    { label: "Models Shipped", value: 24, icon: <Zap className="w-4 h-4" /> },
    { label: "Citations", value: "850+", icon: <FileText className="w-4 h-4" /> },
    { label: "PRs Merged", value: "2.1k", icon: <Github className="w-4 h-4" /> },
    { label: "Uptime Avg", value: "99.98%", icon: <ShieldCheck className="w-4 h-4" /> }
  ],
  skills: [
    { title: "AI / ML Architecture", items: ["Transformer Optimization", "RLHF Pipeline Design", "TensorRT / ONNX Runtime", "CUDA Kernels", "Multi-Modal Fusion"], color: "from-indigo-500/20" },
    { title: "Systems Engineering", items: ["Distributed Systems (Rust/Go)", "Kubernetes (EKS/GKE)", "Bare Metal Optimization", "WASM Inference", "Vector Databases"], color: "from-cyan-500/20" },
    { title: "Product & Strategy", items: ["Generative UX Patterns", "Data Flywheel Strategy", "Ethics & Alignment", "Cost-Performance Scaling"], color: "from-purple-500/20" }
  ],
  projects: [
    {
      id: "01",
      title: "Hyperion-V Inference Engine",
      category: "Infrastructure",
      description: "A specialized distributed inference engine for MoE (Mixture of Experts) models, reducing inter-node communication overhead by 40% using custom RDMA protocols.",
      challenges: "Handling sub-millisecond routing across 256 H100 nodes while maintaining strict token-per-second requirements.",
      tags: ["Rust", "Triton", "NVIDIA NCCL", "C++"],
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "02",
      title: "NeuralCanvas Orchestrator",
      category: "Creative Tech",
      description: "Enterprise-grade diffusion orchestrator that allows 500+ concurrent designers to fine-tune and generate assets in a shared latent space with per-layer control.",
      challenges: "Real-time synchronization of VAE states across browser clients and GPU workers using WebRTC and specialized compression.",
      tags: ["TypeScript", "Python", "WebGPU", "Redis"],
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "03",
      title: "Sentry-ML (Open Source)",
      category: "Security",
      description: "A first-of-its-kind adversarial firewall for LLMs that detects and neutralizes prompt injection attacks in < 5ms of overhead.",
      challenges: "Developing a robust detection model small enough to run on the edge while maintaining a 99.9% recall on jailbreak attempts.",
      tags: ["Python", "ONNX", "WASM", "Go"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
    }
  ],
  research: [
    {
      title: "Dynamic Sparsity in Long-Context Transformers",
      abstract: "In this paper, we introduce a novel attention mechanism that dynamically prunes unimportant tokens based on real-time activation maps, allowing for million-token context windows on consumer hardware.",
      pub: "NeurIPS 2023 - Best Paper Track",
      impact: "Reduced memory consumption by 65% compared to standard FlashAttention-2."
    },
    {
      title: "Neural ODEs for Continuous Latent Spaces",
      abstract: "Exploring the intersections of differential equations and deep learning to create more fluid, time-dependent generative models for physics simulations.",
      pub: "ICML 2022",
      impact: "Implemented in 3 global climate modeling frameworks."
    }
  ],
  experience: [
    {
      year: "2022 — Present",
      role: "Lead Machine Learning Engineer",
      company: "Vanguard AI",
      location: "SF / London",
      points: [
        "Architected the foundational inference layer supporting 10M+ daily active users.",
        "Optimized GPU utilization across 4 clusters, saving $2.4M in annual compute spend.",
        "Built the 'Safety First' alignment team from 0 to 12 engineers."
      ]
    },
    {
      year: "2020 — 2022",
      role: "Senior Research Scientist",
      company: "OpenBrain",
      location: "Palo Alto",
      points: [
        "Led the efficiency track for the 'Mega-Model' project (1.2T parameters).",
        "Pioneered Sparse Mixture of Experts (SMoE) implementation for real-time translation.",
        "Published 4 patents in the field of automated weights quantization."
      ]
    },
    {
      year: "2018 — 2020",
      role: "Software Engineer III (Core ML)",
      company: "Stripe",
      location: "Seattle",
      points: [
        "Deployed the fraud detection v4 model, increasing precision by 18%.",
        "Refactored the Ruby-based ML gateway into a high-performance Go service.",
        "Created the 'Stripe-ML-Bench' tool for internal latency tracking."
      ]
    }
  ],
  education: [
    { school: "Stanford University", degree: "M.S. Computer Science (AI Track)", honors: "4.0 GPA, Research Fellow", year: "2018" },
    { school: "Georgia Tech", degree: "B.S. Computational Science", honors: "Highest Honors", year: "2016" }
  ],
  volunteer: [
    { org: "Code 4 Good", role: "Board Member", description: "Helping non-profits modernize their data infrastructure." },
    { org: "AI Ethics Coalition", role: "Contributor", description: "Drafting policy frameworks for open-source model transparency." }
  ],
  creds: [
    "AWS Certified Machine Learning Specialist",
    "NVIDIA CUDA Expert Certification",
    "Google Cloud Professional Data Engineer",
    "DeepLearning.AI Advanced Specialization"
  ],
  voices: [
    { name: "Dr. Aris Thorne", role: "CEO @ NeuralFlow", quote: "Alex is that rare 1% of engineers who can lead a research team on Monday and ship a production-hardened C++ kernel on Friday." },
    { name: "Sarah Jenkins", role: "VP Engineering @ Stripe", quote: "Absolute technical clarity. He doesn't just build systems; he builds systems that other engineers actually enjoy maintaining." }
  ]
};

// --- Specialized UI Components ---

const GlassCard = ({ children, className = "", hover = true }) => (
  <motion.div 
    whileHover={hover ? { y: -8, transition: { duration: 0.3, ease: "easeOut" } } : {}}
    className={`relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-2xl ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

const Badge = ({ children, color = "indigo" }) => (
  <span className={`px-2.5 py-1 text-[10px] font-black tracking-[0.1em] uppercase bg-${color}-500/10 text-${color}-400 border border-${color}-500/20 rounded-lg`}>
    {children}
  </span>
);

const SectionHeading = ({ title, subtitle, count }) => (
  <div className="space-y-4 mb-16">
    <div className="flex items-center gap-4">
      <span className="text-indigo-500 font-black text-xs tracking-[0.5em] uppercase">{subtitle}</span>
      <div className="h-[1px] flex-grow bg-white/5" />
      {count && <span className="text-white/20 font-mono text-sm">{count}</span>}
    </div>
    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">{title}</h2>
  </div>
);

// --- Sections ---

const Navbar = () => {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-black text-black text-xs">A</div>
          <span className="text-white font-black uppercase tracking-widest text-sm hidden md:block">Sterling</span>
        </div>
        
        <div className="px-2 py-1.5 bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 flex items-center gap-1">
          {['home', 'about', 'work', 'research', 'contact'].map((item) => (
            <button 
              key={item}
              onClick={() => setActive(item)}
              className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${active === item ? 'bg-white text-black shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              {item}
            </button>
          ))}
        </div>

        <button className="px-5 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
          Resume.PDF
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]"
          >
            <Activity className="w-3 h-3 animate-pulse" /> Core Infrastructure Status: Optimized
          </motion.div>
          
          <div className="space-y-4">
             <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter text-white leading-[0.8]">
              <motion.span initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="block">ALEX</motion.span>
              <motion.span initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-white to-cyan-400">STERLING</motion.span>
            </h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-slate-400 max-w-2xl mx-auto text-xl md:text-2xl font-light leading-relaxed"
          >
            {DATA.profile.tagline}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-8 pt-8"
          >
            <button className="group relative px-10 py-5 bg-white text-black font-black rounded-2xl overflow-hidden transition-all active:scale-95">
              <span className="relative z-10 flex items-center gap-3 uppercase text-[10px] tracking-[0.2em]">
                View Neural Architecture <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <div className="flex gap-6">
              {[Github, Linkedin, Mail].map((Icon, idx) => (
                <a key={idx} href="#" className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 text-white transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 hidden lg:flex items-center gap-4 text-white/20">
        <Fingerprint className="w-10 h-10" />
        <div className="text-[10px] font-black uppercase tracking-widest leading-tight">
          System Authorized<br />Access: Level 4
        </div>
      </div>
      
      {/* Dynamic Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-500/[0.03] blur-[200px] rounded-full -z-10" />
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-40 container mx-auto px-6">
      <SectionHeading subtitle="Information Architecture" title="Intelligence Layer" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Bio */}
        <GlassCard className="lg:col-span-8 p-12 flex flex-col justify-between group">
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-500 p-[1px]">
                <div className="w-full h-full rounded-3xl bg-black overflow-hidden flex items-center justify-center">
                   <Terminal className="w-10 h-10 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-4xl font-black text-white leading-none mb-2">{DATA.profile.name}</h3>
                <p className="text-indigo-400 font-black text-xs uppercase tracking-[0.2em]">{DATA.profile.role}</p>
              </div>
            </div>
            <p className="text-slate-300 text-2xl font-light leading-relaxed italic">
              "Building machine learning systems is not about chasing the latest architecture; it's about <span className="text-white font-medium">engineering the data loops</span> that make intelligence inevitable."
            </p>
            <p className="text-slate-400 text-lg font-light leading-relaxed max-w-3xl">
              {DATA.profile.bio}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-12">
            {['Distributed Systems', 'LLM Ops', 'Kernel Optimization', 'Graph Theory', 'Causal Inference'].map(tag => (
              <Badge key={tag} color="indigo">{tag}</Badge>
            ))}
          </div>
        </GlassCard>

        {/* Real-time Metrics */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard className="p-8 h-full bg-gradient-to-br from-indigo-500/10 to-transparent">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-8 flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-500" /> Active Performance
            </h4>
            <div className="grid grid-cols-1 gap-8">
              {DATA.metrics.map((m, i) => (
                <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 text-slate-400">{m.icon}</div>
                    <span className="text-xs font-bold uppercase text-slate-500 tracking-widest">{m.label}</span>
                  </div>
                  <div className="text-2xl font-black text-white">{m.value}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Skills Deep Dive */}
        {DATA.skills.map((skill, i) => (
          <GlassCard key={i} className={`lg:col-span-4 p-8 border-t-2 ${i === 1 ? 'border-cyan-500/30' : 'border-indigo-500/30'}`}>
            <div className="space-y-6">
              <h4 className="text-lg font-black text-white uppercase flex items-center gap-3">
                 <span className="w-2 h-2 rounded-full bg-indigo-500" />
                 {skill.title}
              </h4>
              <div className="space-y-3">
                {skill.items.map((item, j) => (
                  <div key={j} className="flex items-center justify-between group/skill">
                    <span className="text-slate-400 text-sm font-medium group-hover/skill:text-white transition-colors">{item}</span>
                    <div className="w-8 h-[1px] bg-white/10 group-hover/skill:w-12 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

const WorkSection = () => {
  return (
    <section id="work" className="py-40 bg-black/40">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle="Implementation Layer" title="Selected Systems" count="03" />

        <div className="space-y-32">
          {DATA.projects.map((project, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
            >
              <div className="lg:w-1/2 w-full group">
                <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                  <img src={project.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt={project.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-10 left-10 flex flex-wrap gap-2">
                    {project.tags.map(tag => <Badge key={tag} color="cyan">{tag}</Badge>)}
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 w-full space-y-8">
                <div>
                  <span className="text-indigo-500 font-black text-xs uppercase tracking-[0.3em] block mb-2">{project.category}</span>
                  <h3 className="text-5xl font-black text-white leading-tight">{project.title}</h3>
                </div>
                
                <p className="text-slate-400 text-xl font-light leading-relaxed">
                  {project.description}
                </p>

                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                   <div className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] flex items-center gap-2">
                     <Terminal className="w-3 h-3" /> Technical Obstacle
                   </div>
                   <p className="text-slate-300 text-sm italic">"{project.challenges}"</p>
                </div>

                <div className="flex items-center gap-8 pt-4">
                  <button className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest hover:text-indigo-400 transition-colors group">
                    Live Protocol <ExternalLink className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                  </button>
                  <button className="flex items-center gap-2 text-slate-500 font-black text-xs uppercase tracking-widest hover:text-white transition-colors">
                    <Github className="w-4 h-4" /> View Source
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ResearchSection = () => (
  <section id="research" className="py-40 border-y border-white/5">
    <div className="container mx-auto px-6">
      <SectionHeading subtitle="Theoretical Foundation" title="Scientific Contributions" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {DATA.research.map((res, i) => (
          <GlassCard key={i} className="p-10 hover:border-indigo-500/30 transition-all">
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400">
                  <FlaskConical className="w-6 h-6" />
                </div>
                <Badge color="purple">{res.pub}</Badge>
              </div>
              <h3 className="text-2xl font-black text-white leading-tight">{res.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed line-clamp-4">
                {res.abstract}
              </p>
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Core Impact</div>
                  <p className="text-indigo-300 text-xs font-medium">{res.impact}</p>
                </div>
                <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all">
                  <BookOpen className="w-4 h-4" />
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  </section>
);

const TimelineAndCreds = () => (
  <section className="py-40 bg-[#050505]">
    <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20">
      {/* Experience Timeline */}
      <div className="lg:col-span-8 space-y-16">
        <h3 className="text-3xl font-black text-white flex items-center gap-4">
          <Layers className="w-8 h-8 text-indigo-500" /> Career Logbook
        </h3>
        <div className="space-y-12">
          {DATA.experience.map((exp, i) => (
            <div key={i} className="relative pl-12 group">
              <div className="absolute left-0 top-0 w-[1px] h-full bg-white/10 group-hover:bg-indigo-500 transition-colors" />
              <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-white scale-0 group-hover:scale-125 transition-all" />
              
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <h4 className="text-2xl font-black text-white uppercase tracking-tight">{exp.role}</h4>
                  <span className="text-indigo-400 font-mono text-sm">{exp.year}</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-black text-slate-500 uppercase tracking-widest">
                  <span>{exp.company}</span>
                  <div className="w-1 h-1 rounded-full bg-slate-700" />
                  <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {exp.location}</span>
                </div>
                <ul className="space-y-3 pt-2">
                  {exp.points.map((p, j) => (
                    <li key={j} className="text-slate-400 text-sm flex items-start gap-3 leading-relaxed">
                      <ChevronRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education & Sidebar */}
      <div className="lg:col-span-4 space-y-16">
        <div className="space-y-8">
          <h3 className="text-2xl font-black text-white flex items-center gap-3 italic">
            <GraduationCap className="w-6 h-6 text-indigo-500" /> Education
          </h3>
          {DATA.education.map((edu, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="text-xs font-bold text-indigo-500">{edu.year}</div>
              <h4 className="text-lg font-bold text-white">{edu.school}</h4>
              <p className="text-slate-400 text-sm">{edu.degree}</p>
              <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest">{edu.honors}</div>
            </div>
          ))}
        </div>

        <div className="space-y-8 pt-8">
           <h3 className="text-2xl font-black text-white flex items-center gap-3 italic">
            <Award className="w-6 h-6 text-indigo-500" /> Certifications
          </h3>
          <div className="flex flex-wrap gap-2">
            {DATA.creds.map((c, i) => (
              <span key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-[2rem] bg-indigo-500 text-black space-y-6">
           <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 fill-black" />
              <h3 className="text-xl font-black uppercase tracking-tighter">Human Side</h3>
           </div>
           {DATA.volunteer.map((v, i) => (
             <div key={i} className="space-y-1">
               <div className="font-black text-sm uppercase">{v.org}</div>
               <div className="text-xs font-bold opacity-70 italic">{v.role}</div>
               <p className="text-xs font-medium leading-relaxed pt-1">{v.description}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  </section>
);

const TestimonialGrid = () => (
  <section className="py-40 container mx-auto px-6">
    <SectionHeading subtitle="Network Effects" title="Collaborator Peer Review" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {DATA.voices.map((v, i) => (
        <GlassCard key={i} className="p-10 bg-indigo-500/5">
          <div className="space-y-8">
            <div className="flex justify-between items-start">
              <MessageSquare className="w-8 h-8 text-indigo-500 opacity-30" />
              <div className="flex gap-1">
                {[1,2,3,4,5].map(s => <div key={s} className="w-1.5 h-1.5 rounded-full bg-indigo-500" />)}
              </div>
            </div>
            <p className="text-2xl font-light text-slate-300 leading-relaxed italic">"{v.quote}"</p>
            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
              <div className="w-12 h-12 rounded-full bg-slate-800" />
              <div>
                <div className="text-white font-black text-sm uppercase">{v.name}</div>
                <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{v.role}</div>
              </div>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  </section>
);

const Footer = () => (
  <footer id="contact" className="pt-40 pb-12 relative overflow-hidden bg-[#020202]">
    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
           <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.8]">
             Ready to<br /><span className="text-indigo-500 italic">Initialize</span>?
           </h2>
           <p className="text-slate-400 text-xl font-light max-w-md">
             Currently open to strategic partnerships, architectural consulting, and senior technical roles in San Francisco or London.
           </p>
           <div className="flex gap-4">
              <button className="px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-indigo-400 transition-all flex items-center gap-3 group">
                Establish Secure Connection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>

        <form className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Identity Signature</label>
                <input type="text" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all" placeholder="YOUR NAME" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Digital Coordinates</label>
                <input type="email" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all" placeholder="EMAIL@DOMAIN.COM" />
              </div>
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Payload / Message</label>
              <textarea rows="5" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all" placeholder="DESCRIBE THE MISSION..." />
           </div>
           <button className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-500 transition-all uppercase tracking-[0.3em] text-[10px]">
             Execute Transmission
           </button>
        </form>
      </div>

      <div className="mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">
         <div>© 2026 STERLING QUANTUM ARCHIVE. VER 4.2.1</div>
         <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors">Latency: 22ms</a>
            <a href="#" className="hover:text-white transition-colors">Security: AES-256</a>
            <a href="#" className="hover:text-white transition-colors">Fingerprint: 0x8A...F3</a>
         </div>
      </div>
    </div>
    
    <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-indigo-500/[0.02] blur-[200px] rounded-full -z-10" />
  </footer>
);

// --- Root Orchestrator ---

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#000] text-white selection:bg-indigo-500 selection:text-white font-sans antialiased scroll-smooth">
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center space-y-12"
          >
            <div className="relative">
               <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 rounded-full border border-white/5 border-t-indigo-500" 
               />
               <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase tracking-[0.3em] text-white">
                 AS
               </div>
            </div>
            <div className="space-y-2 text-center">
              <div className="text-[10px] font-black uppercase tracking-[0.6em] text-indigo-500 animate-pulse">
                Synchronizing Systems
              </div>
              <div className="text-[8px] font-mono text-slate-700">
                BOOT_SEQUENCE_ALPHA_READY
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="relative">
          <InteractiveGrid />
          <Navbar />
          <main className="relative z-10">
            <Hero />
            <AboutSection />
            <WorkSection />
            <ResearchSection />
            <TimelineAndCreds />
            <TestimonialGrid />
            <Footer />
          </main>
        </div>
      )}
    </div>
  );
}