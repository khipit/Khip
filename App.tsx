import React, { useState, useEffect } from 'react';
import { 
  Search, BarChart3, Share2, MessageSquare, PenTool, 
  Newspaper, ArrowRight, X, Target, ExternalLink,
  Globe, UserCheck, Instagram, Linkedin, Menu,
  ChevronRight, CheckCircle, Loader2
} from 'lucide-react';

// --- Configuration ---
const FORMSPREE_ID = "xeeoopnd"; 

// --- Legal Content ---
const PRIVACY_POLICY = `PRIVACY POLICY
Last Updated: May 2024

1. INTRODUCTION
KHIP ("we," "our," or "us") respects your privacy and is committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit the website khip.io (our "Website") and our practices for collecting, using, maintaining, protecting, and disclosing that information.

2. INFORMATION WE COLLECT
We collect several types of information from and about users of our Website, including:
• Personal Information: Name, work email address, and brand name provided via our contact form.
• Usage Data: Details of your visits to our Website, including traffic data, location data, logs, and other communication data.

3. HOW WE USE YOUR INFORMATION
We use information that we collect about you or that you provide to us:
• To present our Website and its contents to you.
• To provide you with information or services that you request from us.
• To fulfill any other purpose for which you provide it.
• To notify you about changes to our Website or any products or services we offer.

4. DATA SECURITY
We have implemented measures designed to secure your personal information from unauthorized access, use, alteration, and disclosure. However, the transmission of information via the internet is not completely secure.

5. CONTACT INFORMATION
To ask questions or comment about this privacy policy and our privacy practices, contact us at: team@khip.io`;

const TERMS_OF_USE = `TERMS OF USE
Last Updated: May 2024

1. ACCEPTANCE OF THE TERMS OF USE
These terms of use are entered into by and between You and KHIP ("Company," "we," or "us"). The following terms and conditions govern your access to and use of khip.io, including any content, functionality, and services offered on or through the website.

2. INTELLECTUAL PROPERTY RIGHTS
The Website and its entire contents, features, and functionality are owned by the Company, its licensors, or other providers and are protected by international copyright, trademark, and other intellectual property laws.

3. PROHIBITED USES
You may use the Website only for lawful purposes. You agree not to use the Website in any way that violates any applicable law or regulation.

4. RELIANCE ON INFORMATION POSTED
The information presented on or through the Website is made available solely for general information purposes. We do not warrant and we do not warrant the accuracy or completeness of this information.

5. LIMITATION ON LIABILITY
In no event will the Company be liable for damages of any kind arising out of or in connection with your use, or inability to use, the Website.

6. GOVERNING LAW AND JURISDICTION
All matters relating to the Website and these Terms of Use shall be governed by and construed in accordance with the internal laws of the Republic of Korea.`;

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
          <pre className="whitespace-pre-wrap font-sans text-white/60 leading-relaxed text-sm p-4">{content}</pre>
        </div>
        <div className="p-6 bg-black/40 border-t border-white/5 text-center">
          <button onClick={onClose} className="px-8 py-3 bg-neon-lime text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:scale-105 transition-transform">Close Document</button>
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

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-black/95 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1600px] mx-auto px-8 flex justify-between items-center">
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'})}} className="flex items-center gap-3 group">
          <LogoSymbol />
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black tracking-tighter uppercase">KHIP.</span>
            <span className="text-[8px] font-bold tracking-[0.3em] opacity-40 uppercase">Keep it Hip</span>
          </div>
        </a>
        <div className="hidden lg:flex gap-10 text-[10px] font-bold uppercase tracking-[0.2em]">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }} className="text-white/60 hover:text-neon-lime transition-colors">{item.label}</a>
          ))}
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white"><Menu size={32} /></button>
        <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }} className="hidden lg:block px-6 py-2 border-2 border-neon-lime text-neon-lime text-[10px] font-black uppercase tracking-widest hover:bg-neon-lime hover:text-black transition-all">Request Consultation</a>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black z-[150] p-12 flex flex-col justify-center items-start gap-8 animate-in fade-in">
           <X size={48} className="absolute top-10 right-10 text-neon-lime cursor-pointer" onClick={() => setIsMenuOpen(false)} />
           {navItems.map((item) => (
             <a key={item.label} href={item.href} onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }} className="text-5xl font-black uppercase hover:text-neon-lime">{item.label}</a>
           ))}
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC = () => (
  <section className="relative min-h-screen flex items-center px-8 bg-black overflow-hidden pt-20">
    <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full z-0 pointer-events-none">
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/5 to-transparent"></div>
      <div className="spline-wrapper h-full opacity-90">
         <iframe src='https://my.spline.design/webdiagram-joh23C1qeItY6Vjvg4drT8cP/' frameBorder='0' width='100%' height='100%'></iframe>
      </div>
    </div>
    <div className="max-w-[1600px] mx-auto w-full relative z-20">
      <div className="max-w-2xl">
        <h1 className="text-6xl md:text-9xl font-black uppercase leading-[0.85] tracking-tighter mb-10">Strategic<br />Intelligence.<br /><span className="text-white/30 font-medium italic">Creative Execution.</span></h1>
        <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-lg leading-snug font-medium">Analytical foundation and intelligence-driven strategy required for high-stakes GTM and global expansion. Boutique by design.</p>
        <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} className="px-10 py-6 bg-neon-lime text-black font-black uppercase text-lg hover:scale-105 transition-all flex items-center gap-3 shadow-[0_20px_50px_rgba(204,255,0,0.3)]">Request Strategy <ArrowRight size={24} /></button>
      </div>
    </div>
  </section>
);

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const services: ServiceItem[] = [
    { 
      id: "mi", 
      title: "MARKET INTELLIGENCE & INSIGHTS", 
      color: "#ccff00", 
      description: "Competitive analysis, consumer research, and market assessment for strategic decisions.", 
      icon: <Search />, 
      fullContent: ["MARKET SIZING AND OPPORTUNITY ANALYSIS", "COMPETITIVE LANDSCAPE MAPPING", "CONSUMER BEHAVIOR RESEARCH", "REGULATORY AND COMPLIANCE OVERVIEW", "PARTNER IDENTIFICATION"] 
    },
    { 
      id: "si", 
      title: "SOCIAL INTELLIGENCE & ANALYTICS", 
      color: "#00f0ff", 
      description: "Real-time monitoring of digital conversations. Sentiment tracking and trend forecasting.", 
      icon: <BarChart3 />, 
      fullContent: ["GLOBAL PLATFORMS (IG, YT, X, LI)", "REGIONAL PLATFORMS (NAVER, KAKAO)", "REAL-TIME SENTIMENT TRACKING", "CRISIS EARLY WARNING", "MONTHLY INSIGHT REPORTS"] 
    },
    { 
      id: "sm", 
      title: "SOCIAL MEDIA MANAGEMENT", 
      color: "#ff0099", 
      description: "Cross-border social presence. Content, community, and performance.", 
      icon: <Share2 />, 
      fullContent: ["PLATFORM STRATEGY", "CONTENT PLANNING AND CREATION", "MULTILINGUAL COMMUNITY MANAGEMENT", "PAID SOCIAL ADVERTISING", "INFLUENCER PARTNERSHIPS"] 
    },
    { 
      id: "st", 
      title: "STRATEGIC MESSAGING & PRESENTATIONS", 
      color: "#ffffff", 
      description: "Pitch decks, executive summaries, and narratives that convert.", 
      icon: <MessageSquare />, 
      fullContent: ["INVESTOR PITCH DECKS", "EXECUTIVE SUMMARIES", "BUSINESS PROPOSALS", "STAKEHOLDER COMMUNICATIONS", "BRAND MESSAGING FRAMEWORKS"] 
    },
    { 
      id: "cp", 
      title: "CREATIVE & CONTENT PRODUCTION", 
      color: "#ccff00", 
      description: "Graphic design, copywriting, and digital content that resonates.", 
      icon: <PenTool />, 
      fullContent: ["GRAPHIC DESIGN & VISUAL IDENTITY", "COPYWRITING & BRAND VOICE", "DIGITAL CONTENT & SOCIAL ASSETS", "PRESENTATION DESIGN", "VIDEO & MOTION GRAPHICS", "INTEGRATED CAMPAIGN CREATIVE & BRAND ACTIVATION"] 
    },
    { 
      id: "pr", 
      title: "PUBLIC RELATIONS & BRAND COMMUNICATIONS", 
      color: "#00f0ff", 
      description: "Media relations, brand building, and integrated campaigns.", 
      icon: <Newspaper />, 
      fullContent: ["MEDIA RELATIONS & PRESS OUTREACH", "PRESS RELEASE WRITING", "JOURNALIST RELATIONSHIPS", "LAUNCH CAMPAIGNS", "INFLUENCER & KOL PARTNERSHIPS"] 
    }
  ];

  const handleRequestStrategy = () => {
    setActiveService(null);
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <section id="services" className="py-32 px-8 bg-black">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic mb-20">What <span className="text-neon-lime">We Do</span>.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-white/10 border border-white/10">
          {services.map((s) => (
            <div key={s.id} onClick={() => setActiveService(s)} className="bg-black p-12 min-h-[400px] flex flex-col justify-between group relative overflow-hidden transition-all hover:bg-[var(--hover-bg)] cursor-pointer" style={{'--hover-bg': s.color} as any}>
              <div className="relative z-10">
                <div className="mb-10 text-neon-lime group-hover:text-black transition-colors">{React.cloneElement(s.icon as any, { size: 64 })}</div>
                <h3 className="text-3xl font-black uppercase leading-tight mb-6 group-hover:text-black transition-colors">{s.title}</h3>
                <p className="text-lg opacity-50 group-hover:opacity-100 group-hover:text-black">{s.description}</p>
              </div>
              <div className="relative z-10 flex items-center gap-3 text-xs font-black uppercase group-hover:text-black">Explore <ArrowRight size={18} /></div>
            </div>
          ))}
        </div>
      </div>

      {activeService && (
        <div className="fixed inset-0 z-[200] bg-white flex items-center justify-center animate-in fade-in duration-300 overflow-y-auto">
          {/* Close Button - More pronounced on White background */}
          <button 
            onClick={() => setActiveService(null)} 
            className="absolute top-10 right-10 text-black/20 hover:text-black hover:rotate-90 transition-all z-[210]"
          >
            <X size={48} />
          </button>
          
          {/* Container - Symmetrical Layout */}
          <div className="max-w-6xl w-full px-12 md:px-20 mx-auto text-black">
            {/* Header Block - Centered Content */}
            <div className="mb-10">
              <div className="mb-6 text-black">
                {React.cloneElement(activeService.icon as any, { size: 72 })}
              </div>
              <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.95]">
                {activeService.title}
              </h2>
            </div>

            {/* Split Content - Balanced Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
              {/* Left Column - Brief & Call to Action */}
              <div className="space-y-10">
                <p className="text-lg md:text-xl text-black/60 leading-relaxed font-medium">
                  {activeService.description}
                </p>
                <button 
                  onClick={handleRequestStrategy}
                  className="px-10 py-5 bg-black text-white font-black uppercase text-sm hover:bg-neon-lime hover:text-black transition-all flex items-center gap-3 shadow-2xl"
                >
                  REQUEST STRATEGY <ArrowRight size={20} />
                </button>
              </div>

              {/* Right Column - Capability List (Centered weight) */}
              <div className="w-full">
                <ul className="space-y-6">
                  {activeService.fullContent.map((item, i) => (
                    <li key={i} className="flex items-start gap-5 group">
                      <div className="w-4 h-4 bg-neon-lime mt-1.5 shrink-0" /> 
                      <span className="text-lg md:text-2xl font-black uppercase text-black/90 tracking-tight leading-tight group-hover:text-black transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const Approach: React.FC = () => (
  <section id="approach" className="py-24 px-8 bg-white text-black">
    <div className="max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-16 items-end">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">Boutique <span className="highlighter-lime whitespace-nowrap text-3xl md:text-5xl">by design.</span></h2>
        <div className="space-y-4">
           <p className="text-2xl font-black uppercase">We provide the foundation.</p>
           <p className="text-lg text-black/60 leading-tight">Analytical insights meeting creative execution for ambitious brands.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "INTELLIGENCE-DRIVEN", copy: "Decisions backed by data. We find the signal in the noise.", icon: <Target size={40}/> },
          { title: "CROSS-BORDER DEPTH", copy: "Fluent in global tech and local market nuances.", icon: <Globe size={40}/> },
          { title: "DIRECT ACCESS", copy: "Senior partners engaged at every level.", icon: <UserCheck size={40}/> }
        ].map((p, i) => (
          <div key={i} className="p-8 border-[3px] border-black rounded-3xl min-h-[250px] flex flex-col justify-between hover:bg-black hover:text-white transition-all group">
             <div className="group-hover:text-neon-lime transition-colors">{p.icon}</div>
             <div>
                <h4 className="text-lg font-black uppercase mb-2">{p.title}</h4>
                <p className="text-sm opacity-60 group-hover:opacity-100">{p.copy}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const StatsSection: React.FC = () => (
  <section className="py-10 px-8 bg-black">
    <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-1">
      {[
        { v: "20+", l: "Years Experience", c: "#00f0ff" },
        { v: "100+", l: "Brands Served", c: "#ff0099" },
        { v: "33", l: "Countries Connected", c: "#ffffff" },
        { v: "85%", l: "Client Retention", c: "#ccff00" }
      ].map((s, i) => (
        <div key={i} className="bg-[#111] p-10 border border-white/5 flex flex-col items-center text-center group hover:bg-[var(--sc)] transition-all" style={{'--sc': s.c} as any}>
           <div className="text-5xl md:text-7xl font-black group-hover:text-black transition-colors">{s.v}</div>
           <div className="text-[9px] font-black uppercase tracking-widest text-white/40 group-hover:text-black/60">{s.l}</div>
        </div>
      ))}
    </div>
  </section>
);

const Testimonials: React.FC = () => {
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
        <h3 className="text-5xl md:text-8xl font-black uppercase italic mb-16">Trusted by <span className="text-neon-lime">Global Leaders</span>.</h3>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-2">
            {data.map((item, i) => (
              <div key={i} onClick={() => setActive(i)} className={`p-6 cursor-pointer border-l-4 transition-all flex justify-between items-center ${active === i ? 'bg-black text-white border-neon-lime' : 'border-transparent hover:bg-black/5'}`}>
                <span className="font-black uppercase tracking-tighter">{item.industry}</span>
                <ChevronRight size={16} className={active === i ? 'text-neon-lime' : 'opacity-20'} />
              </div>
            ))}
          </div>
          <div className="lg:col-span-8 p-12 md:p-20 bg-black text-white rounded-[3rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-neon-lime/5 blur-3xl group-hover:bg-neon-lime/10 transition-all"></div>
            <p className="text-2xl md:text-4xl italic mb-12 leading-tight">"{data[active].quote}"</p>
            <div className="text-neon-lime font-black uppercase tracking-[0.2em]">— {data[active].author}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const KoreaExpertise: React.FC = () => (
  <section id="korea" className="py-24 px-8 bg-neon-lime text-black">
    <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div>
        <h2 className="text-5xl md:text-[6rem] font-black uppercase leading-[0.85] italic mb-10">Korea: <span className="highlighter-white whitespace-nowrap">Home Market.</span></h2>
        <p className="text-lg font-medium opacity-80 mb-10 max-w-xl">Boutique consultancy providing the analytical foundation for successfully entering and scaling in the Korean market.</p>
        <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} className="px-10 py-5 bg-black text-neon-lime font-black uppercase flex items-center gap-4 rounded-xl hover:scale-105 transition-transform">Explore Korea Strategy <ArrowRight /></button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {["B2B SaaS GTM Strategy", "Digital Platform Strategy", "Cultural Intelligence", "Digital Tech Audit"].map((t, i) => (
          <div key={i} className="p-8 border-4 border-black rounded-3xl min-h-[150px] flex flex-col justify-between hover:bg-white transition-all group">
            <h4 className="text-xl font-black uppercase leading-none">{t}</h4>
            <div className="dash-mark group-hover:w-full transition-all duration-500" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const About: React.FC = () => {
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
       <div className="max-w-[1600px] mx-auto text-center">
          <h3 className="text-5xl md:text-7xl font-black uppercase italic mb-20">The <span className="text-neon-lime">Collective</span>.</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-4xl mx-auto">
             {team.map((m, i) => (
               <div key={i} className="flex flex-col items-center group">
                  <div className="w-40 h-40 rounded-3xl mb-8 overflow-hidden grayscale group-hover:grayscale-0 transition-all border-2 border-white/5 group-hover:border-neon-lime shadow-2xl">
                     <img src={m.img} className={`w-full h-full object-cover ${m.pos} group-hover:scale-110 transition-transform duration-700`} alt={m.name} />
                  </div>
                  <h4 className="text-3xl font-black uppercase tracking-tighter mb-2">{m.name}</h4>
                  <div className="text-neon-lime text-[11px] font-black uppercase tracking-[0.3em] mb-6">{m.role}</div>
                  <p className="text-white/40 text-[11px] font-medium leading-relaxed max-w-[240px] mx-auto italic">"{m.desc}"</p>
               </div>
             ))}
          </div>
       </div>
    </section>
  );
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ brand: '', email: '', message: '' });
  const [formState, setFormState] = useState<'idle'|'sending'|'sent'>('idle');
  const [legalDoc, setLegalDoc] = useState<{title:string, content:string}|null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    try {
      await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setFormState('sent');
    } catch (err) {
      setFormState('idle');
      alert('Failed to send inquiry. Please try again.');
    }
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="py-40 px-8 bg-black">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <div>
          <h2 className="text-6xl md:text-[7.5rem] font-black uppercase italic mb-10 tracking-tighter leading-none">Analyze <br /><span className="text-neon-lime">Potential</span>.</h2>
          <div className="space-y-4">
             <p className="text-white/40 text-sm font-black uppercase tracking-widest">Connect with us</p>
             <a href="mailto:team@khip.io" className="text-3xl md:text-5xl font-black hover:text-neon-lime transition-colors block">team@khip.io</a>
          </div>
        </div>
        <div className="bg-white text-black p-10 lg:p-16 rounded-[3.5rem] shadow-[0_50px_100px_rgba(204,255,0,0.1)]">
          {formState === 'sent' ? (
            <div className="text-center py-20">
              <CheckCircle size={80} className="mx-auto text-neon-lime mb-8" />
              <h3 className="text-4xl font-black uppercase">Brief Received.</h3>
              <p className="mt-4 font-bold opacity-60">Strategic analysis in progress. Expect a response within 24h.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Brand Identity</label>
                 <input type="text" placeholder="Your Brand Name" className="w-full border-b-2 border-black/10 py-4 text-xl font-black outline-none focus:border-neon-lime transition-colors" onChange={e=>setFormData({...formData, brand: e.target.value})} required />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Communication Channel</label>
                 <input type="email" placeholder="Work Email Address" className="w-full border-b-2 border-black/10 py-4 text-xl font-black outline-none focus:border-neon-lime transition-colors" onChange={e=>setFormData({...formData, email: e.target.value})} required />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Intelligence Brief</label>
                 <textarea placeholder="Tell us about your global ambitions" className="w-full border-b-2 border-black/10 py-4 text-xl font-black outline-none h-32 resize-none focus:border-neon-lime transition-colors" onChange={e=>setFormData({...formData, message: e.target.value})} required />
              </div>
              <button type="submit" className="w-full py-8 bg-black text-white font-black uppercase text-2xl hover:bg-neon-lime hover:text-black transition-all rounded-[2rem] flex items-center justify-center gap-4 group">
                {formState === 'sending' ? 'Processing...' : (
                  <>Execute Transfer <ArrowRight className="group-hover:translate-x-2 transition-transform" /></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
      
      <footer className="mt-40 pt-24 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
           <div className="flex flex-col gap-6">
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'})}} className="flex items-center gap-3 group">
                <LogoSymbol size="w-12 h-12" />
                <div className="flex flex-col leading-none">
                  <span className="text-3xl font-black tracking-tighter uppercase">KHIP.</span>
                  <span className="text-[8px] font-bold tracking-[0.4em] opacity-40 uppercase">Keep it Hip</span>
                </div>
              </a>
              <p className="text-[11px] font-medium text-white/40 max-w-[200px] leading-relaxed italic">"Strategic Intelligence required for high-stakes GTM and global expansion."</p>
           </div>
           
           <div className="grid grid-cols-2 gap-10">
              <div className="space-y-4">
                 <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-neon-lime">Focus</h5>
                 <ul className="space-y-2 text-[11px] font-bold uppercase opacity-60">
                    <li className="hover:text-neon-lime cursor-pointer transition-colors" onClick={() => scrollTo('services')}>Services</li>
                    <li className="hover:text-neon-lime cursor-pointer transition-colors" onClick={() => scrollTo('approach')}>Approach</li>
                    <li className="hover:text-neon-lime cursor-pointer transition-colors" onClick={() => scrollTo('industries')}>Track Record</li>
                 </ul>
              </div>
              <div className="space-y-4">
                 <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-neon-lime">Region</h5>
                 <ul className="space-y-2 text-[11px] font-bold uppercase opacity-60">
                    <li className="hover:text-neon-lime cursor-pointer transition-colors" onClick={() => scrollTo('services')}>Global GTM</li>
                    <li className="hover:text-neon-lime cursor-pointer transition-colors" onClick={() => scrollTo('korea')}>Korea Market</li>
                 </ul>
              </div>
           </div>

           <div className="flex flex-col md:items-end gap-6">
              <div className="flex gap-4">
                 <a href="https://www.linkedin.com/company/khip-korea" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-neon-lime hover:text-black transition-all">
                   <Linkedin size={18} />
                 </a>
                 <a href="https://www.instagram.com/khip.korea/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-neon-lime hover:text-black transition-all">
                   <Instagram size={18} />
                 </a>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">© 2026 KHIP. All rights reserved.</p>
           </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-white/5 opacity-40">
           <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest">
              <button onClick={() => setLegalDoc({title:'Privacy Policy', content: PRIVACY_POLICY})} className="hover:text-neon-lime transition-colors">Privacy Policy</button>
              <button onClick={() => setLegalDoc({title:'Terms of Use', content: TERMS_OF_USE})} className="hover:text-neon-lime transition-colors">Terms of Use</button>
           </div>
           <p className="text-[9px] font-black uppercase tracking-[0.5em]">Intelligence-Driven Creative Collective.</p>
        </div>
      </footer>

      <LegalModal isOpen={!!legalDoc} onClose={()=>setLegalDoc(null)} title={legalDoc?.title||''} content={legalDoc?.content||''} />
    </section>
  );
};

const App: React.FC = () => (
  <div className="bg-black text-white selection:bg-neon-lime selection:text-black scroll-smooth">
    <Navbar />
    <Hero />
    <Services />
    <Approach />
    <StatsSection />
    <Testimonials />
    <KoreaExpertise />
    <About />
    <Contact />
  </div>
);

export default App;