
import React, { useState, useEffect } from 'react';
import { 
  Search, BarChart3, Share2, MessageSquare, PenTool, 
  Newspaper, ArrowRight, X, Target, ExternalLink,
  Globe, UserCheck, Instagram, Linkedin, Menu,
  ChevronRight, CheckCircle, Loader2
} from 'lucide-react';

// --- Configuration ---
const FORMSPREE_ID = "xeeoopnd"; 

// --- Types ---
interface ServiceItem {
  id: string;
  title: string;
  description: string;
  fullContent: string[];
  icon: React.ReactNode;
  color: string;
}

interface Testimonial {
  industry: string;
  quote: string;
  author: string;
}

// --- Legal Content ---
const PRIVACY_POLICY = `
Last Updated: May 2024

Khip ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed.

1. Information We Collect
When you use our "Transmit Brief" contact form, we collect the information you provide: Name/Brand Identity, Business Email Address, and the contents of your project brief.

2. How We Use Your Information
We use the information collected primarily to communicate with you regarding potential business partnerships, provide our strategic communication services, and improve our website functionality.

3. Data Storage and Security
We use Formspree as a third-party service provider to process form submissions. Your data is stored securely in accordance with their industry-standard security protocols. We do not sell or rent your personal information to third parties.

4. Your Rights
You may request access to, correction of, or deletion of your personal data at any time by contacting us at team@khip.io.
`;

const TERMS_OF_USE = `
Welcome to Khip. By accessing this website, you agree to comply with and be bound by the following terms.

1. Intellectual Property
All content, design, graphics, and branding on this website (including the KHIP logo and "Keep it Hip" slogan) are the exclusive property of Khip. Unauthorized use or reproduction is strictly prohibited.

2. Disclaimer of Warranties
The information on this website is provided "as is" for general information purposes only. While we strive for accuracy, we make no guarantees regarding the completeness or timeliness of the information.

3. Limitation of Liability
Khip shall not be liable for any direct, indirect, or consequential damages resulting from the use or inability to use this website.

4. External Links
Our website contains links to external social media platforms (Instagram, LinkedIn). We are not responsible for the content or privacy practices of these third-party sites.
`;

// --- Shared Components ---

const LogoSymbol: React.FC<{ size?: string }> = ({ size = "w-10 h-10" }) => (
  <div className={`relative ${size} bg-neon-lime flex items-center justify-center font-black text-black overflow-hidden group-hover:rotate-90 transition-transform duration-500 rounded-lg`}>
    <span className="text-xl">K</span>
    <div className="absolute top-0 right-0 w-3 h-3 bg-black"></div>
  </div>
);

const LegalModal: React.FC<{ title: string; content: string; isOpen: boolean; onClose: () => void }> = ({ title, content, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="bg-[#111] border border-white/10 w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-3xl flex flex-col shadow-2xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/40">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-neon-lime">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="p-8 overflow-y-auto custom-scrollbar">
          <pre className="whitespace-pre-wrap font-sans text-white/60 leading-relaxed text-sm">
            {content}
          </pre>
        </div>
        <div className="p-6 bg-black/40 border-t border-white/5 text-center">
          <button onClick={onClose} className="px-8 py-3 bg-neon-lime text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:scale-105 transition-transform">
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Services', href: '#services' },
    { label: 'Approach', href: '#approach' },
    { label: 'Track Record', href: '#industries' },
    { label: 'Korea', href: '#korea' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleNavLinkClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-black/95 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1600px] mx-auto px-8 flex justify-between items-center">
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="flex items-center gap-3 group cursor-pointer">
          <LogoSymbol />
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black tracking-tighter uppercase">KHIP.</span>
            <span className="text-[8px] font-bold tracking-[0.3em] opacity-40 uppercase">Keep it Hip</span>
          </div>
        </a>
        
        <div className="hidden lg:flex gap-10 text-[10px] font-bold uppercase tracking-[0.2em]">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={(e) => { e.preventDefault(); handleNavLinkClick(item.href); }} className="text-white/60 hover:text-neon-lime transition-colors cursor-pointer">
              {item.label}
            </a>
          ))}
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white cursor-pointer">
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavLinkClick('#contact'); }} className="hidden lg:block px-6 py-2 border-2 border-neon-lime text-neon-lime text-[10px] font-black uppercase tracking-widest hover:bg-neon-lime hover:text-black transition-all cursor-pointer">
          Request Consultation
        </a>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black z-[150] p-12 flex flex-col justify-center items-start gap-8 animate-in fade-in duration-300">
           <X size={48} className="absolute top-10 right-10 cursor-pointer text-neon-lime" onClick={() => setIsMenuOpen(false)} />
           {navItems.map((item) => (
             <a key={item.label} href={item.href} onClick={(e) => { e.preventDefault(); handleNavLinkClick(item.href); }} className="text-5xl md:text-7xl font-black uppercase hover:text-neon-lime cursor-pointer">
               {item.label}
             </a>
           ))}
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center px-8 bg-black overflow-hidden pt-20">
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-0 pointer-events-none opacity-60">
        <div className="spline-wrapper h-full">
           <iframe src='https://my.spline.design/webdiagram-joh23C1qeItY6Vjvg4drT8cP/' frameBorder='0' width='100%' height='100%'></iframe>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto w-full relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-9xl font-black uppercase leading-[0.85] tracking-tighter mb-10">
            Strategic<br />communications<br />
            <span className="text-white/30 font-medium italic">for global brands.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl leading-snug font-medium">
            Market intelligence. Brand storytelling. Media relations.<br />
            We help brands connect with new audiences—wherever they are.
          </p>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} className="px-10 py-6 bg-neon-lime text-black font-black uppercase text-lg hover:scale-105 transition-all flex items-center gap-3 shadow-[0_20px_50px_rgba(204,255,0,0.3)] cursor-pointer">
            Request a Consultation <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  
  const services: ServiceItem[] = [
    { id: "mi", title: "Market Intelligence & Insights", color: "#ccff00", description: "Competitive analysis, consumer research, and market assessment for strategic decisions.", icon: <Search />, fullContent: ["Market sizing and opportunity analysis", "Competitive landscape mapping", "Consumer behavior research", "Regulatory and compliance overview", "Partner identification"] },
    { id: "si", title: "Social Intelligence & Analytics", color: "#00f0ff", description: "Real-time monitoring of digital conversations. Sentiment tracking and trend forecasting.", icon: <BarChart3 />, fullContent: ["Global platforms (IG, YT, X, LI)", "Regional platforms (Naver, Kakao)", "Real-time sentiment tracking", "Crisis early warning", "Monthly insight reports"] },
    { id: "sm", title: "Social Media Management", color: "#ff0099", description: "Cross-border social presence. Content, community, and performance.", icon: <Share2 />, fullContent: ["Platform strategy", "Content planning and creation", "Multilingual community management", "Paid social advertising", "Influencer partnerships"] },
    { id: "st", title: "Strategic Messaging & Presentations", color: "#ffffff", description: "Pitch decks, executive summaries, and narratives that convert.", icon: <MessageSquare />, fullContent: ["Investor pitch decks", "Executive summaries", "Business proposals", "Stakeholder communications", "Brand messaging frameworks"] },
    { id: "cp", title: "Creative & Content Production", color: "#ccff00", description: "Graphic design, copywriting, and digital content that resonates.", icon: <PenTool />, fullContent: ["Graphic design & Visual identity", "Copywriting & Brand voice", "Digital content & Social assets", "Presentation design", "Video & Motion graphics"] },
    { id: "pr", title: "Public Relations & Brand Communications", color: "#00f0ff", description: "Media relations, brand building, and integrated campaigns.", icon: <Newspaper />, fullContent: ["Media relations & Press outreach", "Press release writing", "Journalist relationships", "Launch campaigns", "Influencer & KOL partnerships"] }
  ];

  return (
    <section id="services" className="py-32 px-8 bg-black text-white">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-20 max-w-3xl">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic mb-8">What <span className="text-neon-lime">We Do</span>.</h2>
          <p className="text-xl md:text-2xl text-white/50 leading-tight">From market insights to media coverage, we provide end-to-end communications support for brands navigating new markets.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-white/10 border border-white/10">
          {services.map((s) => (
            <div key={s.id} onClick={() => setActiveService(s)} className="bg-black p-12 min-h-[400px] flex flex-col justify-between group relative overflow-hidden transition-all duration-500 hover:bg-[var(--hover-bg)] cursor-pointer" style={{'--hover-bg': s.color} as any}>
              <div className="relative z-10 pointer-events-none">
                <div className="mb-10 text-neon-lime group-hover:text-black transition-colors">{React.cloneElement(s.icon as any, { size: 64 })}</div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 group-hover:text-black transition-colors">{s.title}</h3>
                <p className="text-lg font-medium opacity-50 group-hover:opacity-100 group-hover:text-black transition-all">{s.description}</p>
              </div>
              <div className="relative z-10 flex items-center gap-3 text-xs font-black uppercase tracking-[0.4em] group-hover:text-black pointer-events-none">
                 Explore Services <ArrowRight size={18} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeService && (
        <div className="fixed inset-0 z-[200] bg-black p-12 lg:p-24 flex flex-col justify-center animate-in fade-in duration-500 overflow-y-auto">
          <button onClick={() => setActiveService(null)} className="absolute top-10 right-10 text-neon-lime hover:rotate-90 transition-transform cursor-pointer z-[210]"><X size={64} /></button>
          <div className="max-w-4xl mx-auto">
            <div className="text-neon-lime mb-10">{React.cloneElement(activeService.icon as any, { size: 80 })}</div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12 italic">{activeService.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                 <p className="text-2xl text-white/50 leading-relaxed mb-8">{activeService.description}</p>
                 <button onClick={() => {setActiveService(null); document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}} className="px-8 py-4 bg-neon-lime text-black font-black uppercase flex items-center gap-3 cursor-pointer hover:scale-105 transition-all">Request Strategy <ArrowRight size={20}/></button>
               </div>
               <ul className="space-y-6">
                 {activeService.fullContent.map((item, i) => (
                   <li key={i} className="flex items-center gap-4 text-xl font-bold uppercase tracking-tight text-white/80">
                     <div className="w-2 h-2 bg-neon-lime"></div> {item}
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const Approach: React.FC = () => {
  const pillars = [
    { title: "GLOBAL REACH", copy: "100+ brands across 33 countries. We understand cross-border complexity.", icon: <Globe size={40}/> },
    { title: "LOCAL DEPTH", copy: "Deep expertise in key markets. Cultural fluency beyond translation.", icon: <Target size={40}/> },
    { title: "SENIOR PARTNERSHIP", copy: "Direct access to decision-makers. No junior hand-offs. Your success is our reputation.", icon: <UserCheck size={40}/> }
  ];

  return (
    <section id="approach" className="py-24 px-8 bg-white text-black">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-16 items-end">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">
             Boutique <span className="highlighter-lime whitespace-nowrap text-3xl md:text-5xl">by design.</span>
          </h2>
          <div className="space-y-4">
             <p className="text-2xl font-black uppercase">We're intentionally small.</p>
             <p className="text-lg text-black/60 leading-tight">Senior-led engagements. Direct access. No templated strategies.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <div key={i} className="p-8 border-[3px] border-black bg-white hover:bg-black hover:text-white transition-all group flex flex-col justify-between min-h-[280px] rounded-3xl">
               <div className="text-black group-hover:text-neon-lime transition-colors">{p.icon}</div>
               <div>
                  <h4 className="text-lg font-black uppercase mb-2">{p.title}</h4>
                  <p className="text-sm opacity-60 group-hover:opacity-100 leading-snug">{p.copy}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatsSection: React.FC = () => {
  const stats = [
    { value: "20+", label: "Years Experience", color: "#00f0ff" },
    { value: "100+", label: "Brands Served", color: "#ff0099" },
    { value: "33", label: "Countries Connected", color: "#ffffff" },
    { value: "85%", label: "Client Retention", color: "#ccff00" }
  ];
  return (
    <section className="py-10 px-8 bg-black">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {stats.map((s, i) => (
            <div key={i} className="bg-[#111] p-10 border border-white/5 flex flex-col justify-center items-center text-center group hover:bg-[var(--s-color)] transition-all duration-500" style={{'--s-color': s.color} as any}>
               <div className="text-5xl md:text-7xl font-black text-white group-hover:text-black transition-colors mb-2">{s.value}</div>
               <div className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-black/60 transition-colors">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const IndustryTestimonials: React.FC = () => {
  const [active, setActive] = useState(0);
  const data: Testimonial[] = [
    { industry: "PROFESSIONAL SERVICES / USA", quote: "Choosing the right partner from another continent? You have to trust your gut. Mine was right—and I'll definitely be back.", author: "Business Owner, United States" },
    { industry: "ENTERTAINMENT & GAMING", quote: "Went above and beyond to get my article published in top media outlets. This is the partner to go to.", author: "VP, Gaming Company" },
    { industry: "CONSUMER GOODS & BEAUTY", quote: "Exceptional work on brand research! Meticulously checked and created comprehensive lists.", author: "Analyst, Brand Research Project" },
    { industry: "LUXURY & RETAIL", quote: "Translated our brand ethos perfectly for the Asian market. Strategy-led creative at its best.", author: "Director, Global Luxury Brand" }
  ];

  return (
    <section id="industries" className="py-24 px-8 bg-white text-black">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-16">
          <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic">Trusted by <span className="text-neon-lime">global leaders</span>.</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-1">
            {data.map((item, idx) => (
              <div key={idx} onClick={() => setActive(idx)} className={`group flex items-center justify-between p-5 cursor-pointer transition-all border-l-4 ${active === idx ? 'bg-black text-white border-neon-lime' : 'border-transparent hover:bg-black/5'} rounded-r-lg`}>
                <span className="text-lg font-black uppercase tracking-tight">{item.industry}</span>
                <ChevronRight size={20} className={active === idx ? 'text-neon-lime translate-x-1' : 'opacity-20'} />
              </div>
            ))}
          </div>
          <div className="lg:col-span-8">
            <div className="p-10 md:p-16 bg-black text-white rounded-[3rem] relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-neon-lime/10 blur-3xl group-hover:bg-neon-lime/20 transition-all"></div>
               <p className="text-2xl md:text-3xl font-medium italic mb-8 leading-tight">"{data[active].quote}"</p>
               <div className="text-sm font-black uppercase tracking-widest text-neon-lime">— {data[active].author}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const KoreaExpertise: React.FC = () => {
  const services = [
    { title: "MARKET ENTRY STRATEGY", copy: "Market sizing, competitive analysis, and planning." },
    { title: "MARKETING AUDIT & LOCALIZATION", copy: "Evaluate and adapt your marketing for Korea." },
    { title: "BRAND LOCALIZATION", copy: "Messaging and brand voice tailored for local audiences." },
    { title: "CORPORATE INTELLIGENCE", copy: "Korean company research for due diligence." }
  ];
  return (
    <section id="korea" className="py-24 px-8 bg-neon-lime text-black relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl md:text-[6rem] font-black uppercase tracking-tighter leading-[0.85] italic mb-10">Korea: <br /><span className="highlighter-white">Our Home Market</span>.</h2>
            <p className="text-lg font-medium opacity-80 leading-snug mb-10 max-w-xl">Insider knowledge for global brands entering this unique landscape. Cultural powerhouse, Shaping global trends.</p>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} className="px-10 py-5 bg-black text-neon-lime font-black uppercase text-lg hover:scale-105 transition-all flex items-center gap-4 cursor-pointer shadow-xl rounded-xl">Explore Korea Services <ArrowRight size={24} /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((item, idx) => (
              <div key={idx} className="p-8 border-[4px] border-black bg-neon-lime flex flex-col justify-between group hover:bg-white transition-all duration-300 min-h-[180px] rounded-3xl">
                 <div>
                    <h4 className="text-xl font-[900] uppercase tracking-tighter leading-none mb-3">{item.title}</h4>
                    <p className="text-[11px] font-bold opacity-60 leading-tight mb-6">{item.copy}</p>
                 </div>
                 <div className="dash-mark" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection: React.FC = () => {
  const team = [
    { 
      name: "Chloe Lee", 
      role: "Founder & CEO", 
      desc: "20 years of expertise. From policy strategy to high-stakes PR launches. Connecting East and West.", 
      img: "./Profile_JY.png",
      pos: "object-[center_15%]"
    },
    { 
      name: "Chips Lee", 
      role: "Creative Director", 
      desc: "Visual storytelling at the intersection of Art and Commerce. SVA New York alum with a focus on global identity.", 
      img: "./Profile_KM.png",
      pos: "object-center"
    }
  ];

  return (
    <section id="about" className="py-24 px-8 bg-[#0a0a0a]">
       <div className="max-w-[1600px] mx-auto">
          <div className="mb-20 text-center">
             <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-4">The <span className="text-neon-lime">Collective</span>.</h3>
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Boutique by Design / Senior-Led Partnership</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-5xl mx-auto">
             {team.map((m, i) => (
                <div key={i} className="flex flex-col group items-center text-center">
                   <div className="w-28 h-28 bg-white/5 rounded-2xl mb-8 overflow-hidden border-2 border-white/5 grayscale group-hover:grayscale-0 group-hover:border-neon-lime transition-all duration-700 shadow-2xl relative">
                      <img src={m.img} className={`img-crisp ${m.pos} group-hover:scale-110 transition-transform duration-700`} alt={m.name} />
                   </div>
                   <div className="space-y-3">
                     <h4 className="text-2xl font-black uppercase tracking-tighter">{m.name}</h4>
                     <div className="text-neon-lime text-[11px] font-black uppercase tracking-widest mb-4">{m.role}</div>
                     <p className="text-white/40 text-[10px] font-medium leading-relaxed max-w-[200px] mx-auto italic">"{m.desc}"</p>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({ brand: '', email: '', message: '' });
  const [legalDoc, setLegalDoc] = useState<{ title: string; content: string } | null>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.brand.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Please complete all sections of the brief.");
      return;
    }
    if (!validateEmail(formData.email)) {
      alert("Please provide a valid business email address.");
      return;
    }

    setFormState('sending');

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormState('sent');
        setFormData({ brand: '', email: '', message: '' });
      } else {
        setFormState('error');
      }
    } catch (err) {
      console.error("Submission error:", err);
      setFormState('error');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-40 px-8 bg-black text-white">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-6xl md:text-[7rem] font-black uppercase tracking-tighter mb-10 italic">Let's <span className="text-neon-lime">explore</span> what's possible.</h2>
            <div className="space-y-4">
               <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Direct Access</div>
               <a href="mailto:team@khip.io" className="text-3xl md:text-5xl font-black hover:text-neon-lime transition-colors inline-flex items-center gap-6 cursor-pointer">team@khip.io <ExternalLink size={32} /></a>
            </div>
          </div>
          
          <div className="bg-white text-black p-10 lg:p-14 rounded-[3rem] relative overflow-hidden min-h-[500px] flex flex-col shadow-2xl">
             {formState === 'sent' ? (
               <div className="flex-1 flex flex-col justify-center items-center text-center animate-in zoom-in duration-500 py-10">
                  <div className="w-24 h-24 bg-neon-lime rounded-full flex items-center justify-center mb-8 shadow-lg">
                    <CheckCircle size={48} className="text-black" />
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">Transfer Complete.</h3>
                  <p className="text-black/60 font-bold uppercase tracking-widest text-sm max-w-sm">We've received your brief via Formspree. A partner will review and contact you within 24 hours.</p>
                  <button onClick={() => setFormState('idle')} className="mt-12 px-8 py-4 border-2 border-black font-black uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-all rounded-full">New Brief</button>
               </div>
             ) : (
               <>
                 <div className="mb-10">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-2">Transmit Brief.</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Direct Connection / Secure Delivery</p>
                 </div>
                 
                 <form className="space-y-8 flex-1 flex flex-col" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 ml-1">Identity</label>
                      <input 
                        type="text" 
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b-2 border-black/10 focus:border-black py-4 text-xl font-black outline-none placeholder:text-black/10 transition-colors" 
                        placeholder="Brand / Company Name" 
                        required
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 ml-1">Business Contact</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b-2 border-black/10 focus:border-black py-4 text-xl font-black outline-none placeholder:text-black/10 transition-colors" 
                        placeholder="Work Email (name@company.com)" 
                        required
                      />
                    </div>
                    
                    <div className="space-y-1 flex-1">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 ml-1">Context</label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b-2 border-black/10 focus:border-black py-4 text-xl font-black outline-none placeholder:text-black/10 min-h-[120px] transition-colors resize-none" 
                        placeholder="Brief Project Overview & Objectives..."
                        required
                      ></textarea>
                    </div>
                    
                    {formState === 'error' && (
                      <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">Error: Submission failed. Please try again or email us directly.</p>
                    )}

                    <button 
                      type="submit"
                      disabled={formState === 'sending'}
                      className={`w-full py-7 bg-black text-white font-black uppercase text-xl hover:bg-neon-lime hover:text-black transition-all cursor-pointer rounded-2xl mt-4 flex justify-center items-center gap-4 group ${formState === 'sending' ? 'opacity-70 cursor-wait' : ''}`}
                    >
                      {formState === 'sending' ? (
                        <>
                          <Loader2 className="animate-spin" size={24} />
                          Transmitting...
                        </>
                      ) : (
                        <>
                          Execute Transfer 
                          <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                        </>
                      )}
                    </button>
                 </form>
               </>
             )}
          </div>
        </div>

        <footer className="mt-40 pt-16 border-t border-white/5 flex flex-col group/footer">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16">
              <div onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="flex items-center gap-4 group cursor-pointer">
                 <LogoSymbol />
                 <span className="text-2xl font-black tracking-tighter">KHIP.</span>
              </div>
              
              <div className="flex flex-wrap gap-8 md:gap-16">
                 <div className="flex flex-col gap-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Connect</span>
                    <div className="flex gap-8">
                       <a href="https://www.instagram.com/khip.korea/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-neon-lime transition-all"><Instagram size={24} /></a>
                       <a href="https://www.linkedin.com/company/khip-korea" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-neon-lime transition-all"><Linkedin size={24} /></a>
                    </div>
                 </div>
                 <div className="flex flex-col gap-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Documentation</span>
                    <div className="flex gap-6 text-[11px] font-bold uppercase tracking-widest text-white/40">
                       <button onClick={() => setLegalDoc({ title: 'Privacy Policy', content: PRIVACY_POLICY })} className="hover:text-neon-lime transition-colors">Privacy Policy</button>
                       <button onClick={() => setLegalDoc({ title: 'Terms of Use', content: TERMS_OF_USE })} className="hover:text-neon-lime transition-colors">Terms of Use</button>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5">
              <p className="text-[10px] font-black uppercase opacity-40 tracking-[0.2em]">© 2026 Khip. All rights reserved.</p>
              <div className="flex gap-6 text-[9px] font-black uppercase tracking-[0.3em] opacity-20">
                 <span>Boutique Design</span>
                 <span>Strategic Comms</span>
                 <span>Korea Entry</span>
              </div>
           </div>
        </footer>
      </div>

      <LegalModal 
        isOpen={!!legalDoc} 
        onClose={() => setLegalDoc(null)} 
        title={legalDoc?.title || ''} 
        content={legalDoc?.content || ''} 
      />
    </section>
  );
};

const App: React.FC = () => {
  return (
    <div className="bg-black text-white selection:bg-neon-lime selection:text-black scroll-smooth">
      <Navbar />
      <Hero />
      <Services />
      <Approach />
      <StatsSection />
      <IndustryTestimonials />
      <KoreaExpertise />
      <AboutSection />
      <Contact />
    </div>
  );
};

export default App;
