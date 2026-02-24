import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Download, 
  Terminal, 
  Cpu, 
  Database, 
  Globe, 
  Award, 
  BookOpen, 
  User,
  Briefcase,
  Layers,
  MessageSquare,
  X,
  Code2,
  Zap,
  ShieldCheck,
  Binary,
  Heart,
  ScrollText,
  FileBadge,
  Activity,
  Command,
  Microscope,
  CpuChip
} from 'lucide-react';

// --- Data Configuration ---
const DATA = {
  profile: {
    name: "ALEX THORNE",
    role: "PRINCIPAL SYSTEMS ARCHITECT",
    subRole: "Specializing in Distributed ML & High-Performance Computing",
    valueProp: "Engineering the infrastructure of the next intelligence era. Production-first, scale-obsessed, and mathematically rigorous.",
    email: "alex.thorne@archive.dev",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    resumeUrl: "#",
    summary: "Dedicated systems thinker with over 8 years of experience bridging the gap between complex machine learning research and robust software engineering. Expert in low-latency inference, distributed state, and reactive frontend architectures.",
    stats: [
      { label: "Production Apps", value: "14" },
      { label: "Total Users Scaled", value: "2M+" },
      { label: "Open Source Contribs", value: "150+" },
      { label: "Patent Pendings", value: "2" }
    ]
  },
  skills: [
    { category: "Core Infrastructure", items: ["Rust", "Go", "C++", "Python", "TypeScript"] },
    { category: "Intelligence", items: ["CUDA", "PyTorch", "TensorRT", "RAG", "LLMOps"] },
    { category: "Data Systems", items: ["PostgreSQL", "ClickHouse", "Redis", "Kafka", "Pinecone"] },
    { category: "Cloud Native", items: ["Kubernetes", "Terraform", "AWS", "gRPC", "Docker"] }
  ],
  projects: [
    {
      id: 1,
      title: "Vortex-1",
      subtitle: "REAL-TIME INFERENCE ENGINE",
      problem: "Standard inference pipelines were too slow for sub-10ms video processing at the edge.",
      solution: "Engineered a custom memory-mapped inference wrapper using C++ and NVIDIA TensorRT with INT8 quantization.",
      impact: "Achieved 4.2ms end-to-end latency. Reduced cloud compute overhead by 68%.",
      tags: ["C++", "CUDA", "TensorRT"],
      status: "STABLE / PROD"
    },
    {
      id: 2,
      title: "OmniGraph",
      subtitle: "DISTRIBUTED ANALYTICS ARCHITECTURE",
      problem: "Legacy systems struggled with 100k+ concurrent real-time data streams for financial modelling.",
      solution: "Developed a reactive Go-based ingestion engine with a high-performance WebGL visual layer.",
      impact: "Adopted by 2 Fortune 500 fintechs. Zero-latency UI updates at 1M records/sec.",
      tags: ["Go", "React", "WebGL", "Redis"],
      status: "LIVE"
    },
    {
      id: 3,
      title: "Synthetix",
      subtitle: "AUTONOMOUS AGENT ORCHESTRATOR",
      problem: "Multi-agent LLM systems lacked deterministic state management and monitoring.",
      solution: "Built a state-machine based orchestrator with real-time observability and memory persistence.",
      impact: "Reduced hallucination rates by 22% through structured prompt-chaining and RAG.",
      tags: ["Python", "LangChain", "VectorDB", "FastAPI"],
      status: "ALPHA"
    }
  ],
  experience: [
    {
      company: "NEURAL CORE SYSTEMS",
      role: "Lead Systems Architect",
      period: "2022 — PRESENT",
      bullets: [
        "Architected a global-scale ML platform processing 4TB of data daily with 99.99% uptime.",
        "Led cross-functional teams in migrating legacy infrastructure to a Kubernetes-native ecosystem.",
        "Engineered proprietary load-balancing algorithms that reduced egress costs by $240k annually."
      ]
    },
    {
      company: "VERTEX AI LABS",
      role: "Senior Research Engineer",
      period: "2019 — 2022",
      bullets: [
        "Optimized deep learning models for mobile deployments, reducing binary sizes by 40%.",
        "Contributed to 3 major open-source LLM frameworks with a focus on attention-mechanism efficiency.",
        "Published research on federated learning privacy at ICML 2021."
      ]
    }
  ],
  research: [
    {
      title: "Deterministic Parallelism in Distributed Systems",
      venue: "IEEE Systems Journal, 2023",
      abstract: "A novel approach to achieving eventual consistency in high-frequency trading environments without locking overhead.",
      link: "#"
    },
    {
      title: "Neural Quantization for Edge Inference",
      venue: "ArXiv Pre-print, 2022",
      abstract: "Evaluation of INT8 vs FP16 precision performance on ARM-based architectures for vision tasks.",
      link: "#"
    }
  ],
  volunteer: [
    {
      org: "CODE FOR GOOD",
      role: "Technical Mentor",
      impact: "Mentored 50+ students in distributed systems fundamentals and cloud architecture."
    },
    {
      org: "OPEN ML FOUNDATION",
      role: "Core Contributor",
      impact: "Optimized data loading utilities reducing training start-up time by 15%."
    }
  ],
  creds: [
    { title: "AWS Solutions Architect Professional", issuer: "Amazon Web Services", date: "2023" },
    { title: "CKAD: Certified Kubernetes Application Developer", issuer: "CNCF", date: "2022" },
    { title: "NVIDIA Deep Learning Institute Graduate", issuer: "NVIDIA", date: "2021" }
  ],
  voices: [
    { 
      name: "SARAH CHEN", 
      role: "VP OF ENGINEERING @ NEURAL CORE", 
      text: "Alex is that rare 1% of engineers who can navigate the entire stack from silicon-level optimizations up to distributed cloud orchestration." 
    },
    { 
      name: "DR. MARCUS VANE", 
      role: "PRINCIPAL SCIENTIST @ VERTEX", 
      text: "Exceptional clarity of thought. Their ability to turn theoretical research into production-hardened systems is unparalleled." 
    }
  ],
  lab: [
    { title: "Writing a JIT compiler in Rust", date: "FEB 2024", readTime: "12 min" },
    { title: "Understanding Vector Databases", date: "JAN 2024", readTime: "8 min" },
    { title: "The cost of abstraction in C++", date: "DEC 2023", readTime: "15 min" }
  ]
};

// --- Advanced UI Components ---

const GlassCard = ({ children, className = "" }) => (
  <div className={`relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl hover:border-blue-500/20 transition-all duration-500 group ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10">{children}</div>
  </div>
);

const SectionHeader = ({ label, title, icon: Icon }) => (
  <div className="mb-16">
    <div className="flex items-center gap-3 mb-4">
      <div className="h-px w-12 bg-blue-500/50" />
      <span className="text-[10px] font-black tracking-[0.4em] text-blue-500 uppercase">{label}</span>
      {Icon && <Icon className="w-4 h-4 text-blue-500/50" />}
    </div>
    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none italic">{title}</h2>
  </div>
);

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-center justify-between p-2 pl-6 rounded-full border transition-all duration-500 ${scrolled ? 'bg-slate-950/80 border-white/10 backdrop-blur-md shadow-2xl' : 'bg-transparent border-transparent'}`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white italic">A</div>
            <span className="text-white font-bold tracking-tighter hidden sm:inline-block">THORNE<span className="text-blue-500 italic">.SYS</span></span>
          </div>
          <div className="hidden lg:flex items-center gap-1">
            <div className="flex gap-1 mr-4">
              {['WORK', 'STACK', 'RESEARCH', 'CREDENTIALS', 'LAB'].map(i => (
                <a key={i} href={`#${i.toLowerCase()}`} className="px-4 py-2 text-[10px] font-bold tracking-widest text-slate-400 hover:text-white transition-colors">{i}</a>
              ))}
            </div>
            <a href="#contact" className="px-6 py-2.5 bg-white text-black text-[10px] font-black tracking-widest rounded-full hover:bg-blue-500 hover:text-white transition-all">
              INITIALIZE CONTACT
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-300" onClick={onClose} />
      <div className="relative bg-slate-900 border border-white/10 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in slide-in-from-bottom-8 duration-500">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white z-10">
          <X className="w-5 h-5" />
        </button>
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12 border-r border-white/5">
            <div className="flex items-center gap-2 mb-6">
              <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-[10px] font-black border border-blue-500/20">{project.status}</span>
              <span className="text-slate-600 text-[10px] font-mono tracking-widest">ID: {project.id}-0x00</span>
            </div>
            <h3 className="text-4xl font-black text-white mb-2 tracking-tighter italic">{project.title}</h3>
            <p className="text-blue-500 text-xs font-bold tracking-[0.3em] uppercase mb-8">{project.subtitle}</p>
            
            <div className="space-y-8">
              <div>
                <h5 className="text-[10px] font-black text-slate-500 tracking-widest uppercase mb-3">Core Objective</h5>
                <p className="text-slate-300 leading-relaxed font-medium">{project.problem}</p>
              </div>
              <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                <h5 className="text-[10px] font-black text-blue-400 tracking-widest uppercase mb-2">Technical Implementation</h5>
                <p className="text-slate-300 text-sm leading-relaxed">{project.solution}</p>
              </div>
            </div>
          </div>
          <div className="p-8 md:p-12 bg-slate-950/30 flex flex-col justify-between">
            <div className="space-y-12">
              <div>
                <h5 className="text-[10px] font-black text-slate-500 tracking-widest uppercase mb-4">Engineering Metrics</h5>
                <div className="text-2xl font-bold text-white tracking-tight border-l-2 border-blue-500 pl-4 py-1 italic">
                  {project.impact}
                </div>
              </div>
              <div>
                <h5 className="text-[10px] font-black text-slate-500 tracking-widest uppercase mb-4">Architecture Stack</h5>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-lg bg-slate-800 border border-white/5 text-xs text-slate-400 font-bold">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-12">
              <button className="flex-1 py-4 bg-white text-black text-xs font-black tracking-widest rounded-xl hover:bg-blue-500 hover:text-white transition-all">VIEW REPOSITORY</button>
              <button className="flex-1 py-4 bg-slate-800 text-white text-xs font-black tracking-widest rounded-xl hover:bg-slate-700 transition-all">SYSTEM DOCS</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 selection:bg-blue-500 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Dynamic Cursor Background */}
      <div 
        className="fixed pointer-events-none w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] z-0 transition-transform duration-300 ease-out hidden lg:block"
        style={{ transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)` }}
      />
      
      <Nav />

      {/* HERO SECTION */}
      <header className="relative min-h-screen flex items-center px-6 pt-20">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 relative z-10">
          <div className="lg:col-span-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-8">
              <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black tracking-widest animate-pulse">
                SYSTEM STATUS: OPTIMIZED
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-500/30 to-transparent" />
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-4 italic leading-[0.8]">
              {DATA.profile.name}
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
              <span className="text-2xl md:text-4xl font-bold text-slate-400 tracking-tight">{DATA.profile.role}</span>
              <div className="hidden md:block w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-sm font-mono text-slate-600 tracking-widest uppercase">{DATA.profile.subRole}</span>
            </div>

            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl leading-relaxed mb-12">
              {DATA.profile.valueProp}
            </p>

            <div className="flex flex-wrap gap-6 items-center">
              <a href="#work" className="group relative px-10 py-5 overflow-hidden rounded-2xl bg-white text-black font-black text-xs tracking-[0.2em] transition-all hover:scale-105 active:scale-95">
                <span className="relative z-10">DISCOVER ARCHIVE</span>
                <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
              <a href={DATA.profile.resumeUrl} className="flex items-center gap-3 text-white text-xs font-black tracking-widest hover:text-blue-500 transition-colors uppercase">
                Download Resume <Download className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:flex items-center justify-center">
             <div className="relative">
                <div className="absolute inset-0 border border-blue-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-8 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                <div className="w-80 h-80 rounded-full border border-white/10 flex items-center justify-center bg-slate-900/40 backdrop-blur-3xl relative">
                  <Terminal className="w-24 h-24 text-blue-500/50" />
                  <div className="absolute bottom-8 text-[10px] font-mono text-slate-600 tracking-widest animate-pulse">
                    PARSING_INTEL...
                  </div>
                </div>
             </div>
          </div>
        </div>
      </header>

      {/* BENTO STATS / ABOUT */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <GlassCard className="md:col-span-2 p-10 flex flex-col justify-between min-h-[400px]">
              <div>
                <SectionHeader label="CORE" title="Systems Thinking" />
                <p className="text-xl text-slate-400 leading-relaxed font-medium max-w-md">
                  "{DATA.profile.summary}"
                </p>
              </div>
              <div className="flex gap-4 pt-8">
                <ShieldCheck className="text-blue-500" />
                <div className="h-px flex-1 bg-white/10 mt-3" />
                <Binary className="text-purple-500" />
              </div>
            </GlassCard>

            <div className="md:col-span-2 grid grid-cols-2 gap-6">
              {DATA.profile.stats.map((stat, idx) => (
                <GlassCard key={idx} className="p-8 flex flex-col items-center justify-center text-center hover:scale-[1.02]">
                  <span className="text-4xl font-black text-white italic mb-2 tracking-tighter">{stat.value}</span>
                  <span className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase">{stat.label}</span>
                </GlassCard>
              ))}
              <GlassCard className="col-span-2 p-8 flex items-center justify-between bg-blue-600/5 group cursor-pointer">
                <span className="text-sm font-bold text-white tracking-widest uppercase">Expertise Verification</span>
                <ChevronRight className="w-5 h-5 text-blue-500 group-hover:translate-x-2 transition-transform" />
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* STACK / SKILLS */}
      <section id="stack" className="py-32 px-6 bg-slate-950/40">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="ARCHITECTURE" title="Engineering Stack" icon={Layers} />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {DATA.skills.map((group, idx) => (
              <div key={idx} className="space-y-6">
                <h4 className="text-[10px] font-black tracking-[0.3em] text-blue-500 uppercase flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {group.category}
                </h4>
                <div className="space-y-3">
                  {group.items.map(item => (
                    <div key={item} className="flex items-center justify-between group cursor-default">
                      <span className="text-lg font-bold text-slate-400 group-hover:text-white transition-colors">{item}</span>
                      <div className="h-px flex-1 mx-4 bg-white/5 group-hover:bg-blue-500/20 transition-all" />
                      <Code2 className="w-3 h-3 text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS / BENTO */}
      <section id="work" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="PROTOTYPES" title="Recent Deployments" icon={Terminal} />
          <div className="grid md:grid-cols-12 gap-8">
            {DATA.projects.map((project, idx) => (
              <GlassCard 
                key={project.id} 
                className={`group cursor-pointer p-0 h-[450px] ${idx === 0 ? 'md:col-span-8' : 'md:col-span-4'}`}
                onClick={() => setActiveProject(project)}
              >
                <div className="p-10 h-full flex flex-col justify-between relative">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-blue-500 text-[10px] font-black tracking-[0.3em] uppercase mb-2 block">{project.subtitle}</span>
                      <h3 className="text-4xl font-black text-white italic tracking-tighter leading-none group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-500">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <p className="text-slate-400 mb-6 max-w-md line-clamp-2 font-medium">
                      {project.problem}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(t => (
                        <span key={t} className="px-3 py-1 rounded bg-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-10 -right-4 text-[12rem] font-black text-white/[0.02] italic leading-none pointer-events-none group-hover:text-blue-500/[0.05] transition-colors duration-500">
                    0{idx + 1}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE / TIMELINE */}
      <section id="experience" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <SectionHeader label="EVOLUTION" title="Career Log" icon={Briefcase} />
          <div className="space-y-24">
            {DATA.experience.map((exp, idx) => (
              <div key={idx} className="group flex flex-col md:flex-row gap-8 md:gap-24 relative">
                <div className="md:w-32 flex-shrink-0">
                  <span className="text-sm font-mono text-slate-600 font-bold tracking-widest group-hover:text-blue-500 transition-colors">{exp.period}</span>
                </div>
                <div className="flex-1 space-y-6">
                   <div>
                     <h3 className="text-3xl font-black text-white italic mb-1 tracking-tight">{exp.company}</h3>
                     <p className="text-blue-500 font-bold text-xs tracking-widest uppercase">{exp.role}</p>
                   </div>
                   <ul className="space-y-4">
                     {exp.bullets.map((b, i) => (
                       <li key={i} className="flex gap-4 text-slate-400 leading-relaxed font-medium">
                         <div className="w-1.5 h-1.5 rounded-full bg-slate-800 mt-2.5 flex-shrink-0 group-hover:bg-blue-500 transition-colors" />
                         {b}
                       </li>
                     ))}
                   </ul>
                </div>
                {idx !== DATA.experience.length - 1 && (
                   <div className="absolute left-[3.5rem] md:left-[1rem] top-12 bottom-[-4rem] w-px bg-gradient-to-b from-white/10 to-transparent hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESEARCH & PUBLICATIONS */}
      <section id="research" className="py-32 px-6 bg-slate-950/40">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="ACADEMIA" title="Scientific Contributions" icon={Microscope} />
          <div className="grid md:grid-cols-2 gap-8">
            {DATA.research.map((paper, idx) => (
              <GlassCard key={idx} className="p-8 md:p-12">
                <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest mb-4 block">{paper.venue}</span>
                <h4 className="text-2xl font-black text-white mb-4 italic tracking-tight">{paper.title}</h4>
                <p className="text-slate-400 mb-8 leading-relaxed italic border-l border-slate-800 pl-6">
                  {paper.abstract}
                </p>
                <a href={paper.link} className="inline-flex items-center gap-2 text-xs font-black text-white tracking-widest hover:text-blue-500 transition-colors">
                  READ PUBLICATION <ExternalLink className="w-3 h-3" />
                </a>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CREDENTIALS & EDUCATION */}
      <section id="credentials" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <SectionHeader label="VERIFIED" title="Certifications" icon={FileBadge} />
            <div className="space-y-4">
              {DATA.creds.map((cred, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-white/5 bg-slate-900/20 flex items-center justify-between group hover:bg-blue-500/5 transition-all">
                  <div>
                    <h5 className="text-white font-bold">{cred.title}</h5>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{cred.issuer} • {cred.date}</p>
                  </div>
                  <Award className="w-5 h-5 text-slate-800 group-hover:text-blue-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader label="INITIATIVES" title="Volunteering" icon={Heart} />
            <div className="space-y-4">
              {DATA.volunteer.map((v, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-white/5 bg-slate-900/20 group hover:border-purple-500/20 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="text-white font-bold tracking-tight">{v.org}</h5>
                    <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest">{v.role}</span>
                  </div>
                  <p className="text-sm text-slate-500 font-medium">{v.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VOICES & TESTIMONIALS */}
      <section id="voices" className="py-32 px-6 bg-slate-950/40 overflow-hidden relative">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -z-10" />
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="FEEDBACK" title="Peer Analysis" icon={MessageSquare} />
          <div className="grid md:grid-cols-2 gap-12">
            {DATA.voices.map((v, idx) => (
              <div key={idx} className="relative">
                <span className="absolute -top-10 -left-6 text-8xl font-black text-white/5 italic">"</span>
                <p className="text-2xl text-slate-300 font-medium italic relative z-10 mb-8 leading-tight">
                  {v.text}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-black text-blue-500 border border-white/5">
                    {v.name[0]}
                  </div>
                  <div>
                    <h6 className="text-white font-black text-sm tracking-widest uppercase">{v.name}</h6>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">{v.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LAB / BLOG PREVIEW */}
      <section id="lab" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <SectionHeader label="EXPERIMENTS" title="Engineering Lab" icon={Code2} />
            <a href="#" className="mb-16 text-[10px] font-black text-slate-500 tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2">
              VIEW ALL ENTRIES <ChevronRight className="w-3 h-3" />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {DATA.lab.map((post, idx) => (
              <a key={idx} href="#" className="group">
                <GlassCard className="p-8 h-full flex flex-col justify-between hover:-translate-y-2">
                  <div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-600 mb-6">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h4 className="text-xl font-bold text-white group-hover:text-blue-500 transition-colors leading-snug">
                      {post.title}
                    </h4>
                  </div>
                  <div className="mt-8 flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-500 group-hover:text-white transition-colors">
                    READ_LOG <Activity className="w-3 h-3" />
                  </div>
                </GlassCard>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEMS FAQ / SPEC SHEET */}
      <section className="py-32 px-6 border-t border-white/5 bg-slate-950/20">
        <div className="max-w-4xl mx-auto">
           <SectionHeader label="PROTOCOLS" title="Engineering FAQ" icon={Command} />
           <div className="space-y-4">
              {[
                { q: "What is your primary technical focus?", a: "Distributed systems architecture with a focus on low-latency ML inference and high-throughput data pipelines." },
                { q: "Available for relocation?", a: "Open to major tech hubs (SF, NYC, London, Tokyo) or high-impact remote-first organizations." },
                { q: "Preferred tech stack?", a: "Rust for systems, Go for distributed backend, PyTorch for research, and React/TypeScript for high-performance frontends." }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-2xl border border-white/5 bg-slate-900/10">
                  <h5 className="text-white font-bold mb-3 flex items-center gap-3">
                    <Zap className="w-4 h-4 text-blue-500" /> {item.q}
                  </h5>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-40 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <GlassCard className="p-16 md:p-32 text-center bg-blue-600/[0.02] border-blue-500/10 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/10 blur-[120px] -z-10" />
            
            <div className="max-w-2xl mx-auto">
              <span className="text-[10px] font-black text-blue-500 tracking-[0.4em] uppercase mb-8 block">SYNCHRONIZE</span>
              <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter italic mb-12 leading-none">
                Let's scale <span className="text-blue-500 underline decoration-white/20 underline-offset-8">impact</span>.
              </h2>
              <p className="text-xl text-slate-500 mb-16 leading-relaxed">
                Currently taking consultations for principal engineering roles, system architecture audits, and high-load ML infrastructure.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6">
                <a href={`mailto:${DATA.profile.email}`} className="px-10 py-5 bg-white text-black font-black text-xs tracking-widest rounded-2xl hover:bg-blue-500 hover:text-white transition-all hover:scale-105">
                  SEND TRANSMISSION
                </a>
                <div className="flex gap-4 items-center px-4">
                  <a href={DATA.profile.github} className="p-4 rounded-xl bg-white/5 border border-white/5 text-white hover:text-blue-500 transition-all"><Github /></a>
                  <a href={DATA.profile.linkedin} className="p-4 rounded-xl bg-white/5 border border-white/5 text-white hover:text-blue-500 transition-all"><Linkedin /></a>
                </div>
              </div>
            </div>
          </GlassCard>
          
          <div className="mt-24 flex flex-col md:flex-row items-center justify-between text-[10px] font-mono font-bold tracking-[0.2em] text-slate-700">
             <span>V.5.0_PROD_DEPLOY</span>
             <div className="flex gap-8 mt-4 md:mt-0 uppercase">
                <span className="text-blue-500/50">LHR.SYS // NODE_1</span>
                <span>ARCHIVE_CORE // {DATA.profile.name}</span>
             </div>
          </div>
        </div>
      </section>

      {/* PROJECT MODAL */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}