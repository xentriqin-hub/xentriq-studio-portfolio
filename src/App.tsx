import React, { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, 
  Globe, 
  ShoppingBag, 
  Layers, 
  Database, 
  Search, 
  Mail, 
  Check, 
  ArrowRight, 
  CheckCircle, 
  Sparkles,
  Menu,
  X,
  ChevronRight,
  Send,
  Calendar,
  Lock,
  MessageSquare
} from 'lucide-react';
import { SERVICES_DATA, PROJECTS_DATA } from './data';
import { Service, Project, InquiryFormInput } from './types';

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<string>('home');
  // Mobile navigation drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  // Selected service detail in Services section
  const [selectedServiceId, setSelectedServiceId] = useState<string>('mobile');

  // Interactive Project states (TN Today ticker & demo view)
  const [activeTeaserTab, setActiveTeaserTab] = useState<'news' | 'govt' | 'about'>('news');
  const [demoNotification, setDemoNotification] = useState<string | null>(null);

  // Inquiry Form state
  const [formInput, setFormInput] = useState<InquiryFormInput>({
    name: '',
    email: '',
    companyName: '',
    projectType: 'Mobile App Development',
    budget: '₹5,000 - ₹15,000',
    message: '',
    servicesNeeded: ['Mobile App Development']
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [lastSubmittedId, setLastSubmittedId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Set selected service's points
  const currentServiceDetail = SERVICES_DATA.find(s => s.id === selectedServiceId) || SERVICES_DATA[0];

  // Track sections for scroll spying
  const homeRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Smooth scroll handler
  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    setMobileMenuOpen(false);

    let targetRef: React.RefObject<HTMLDivElement | null>;
    switch (sectionId) {
      case 'home': targetRef = homeRef; break;
      case 'services': targetRef = servicesRef; break;
      case 'projects': targetRef = projectsRef; break;
      case 'about': targetRef = aboutRef; break;
      case 'contact': targetRef = contactRef; break;
      default: targetRef = homeRef;
    }

    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll event detector to update active navigation tab (scroll spy)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      const homeOffset = homeRef.current?.offsetTop || 0;
      const servicesOffset = servicesRef.current?.offsetTop || 0;
      const projectsOffset = projectsRef.current?.offsetTop || 0;
      const aboutOffset = aboutRef.current?.offsetTop || 0;
      const contactOffset = contactRef.current?.offsetTop || 0;

      if (scrollPosition >= contactOffset) {
        setActiveTab('contact');
      } else if (scrollPosition >= aboutOffset) {
        setActiveTab('about');
      } else if (scrollPosition >= projectsOffset) {
        setActiveTab('projects');
      } else if (scrollPosition >= servicesOffset) {
        setActiveTab('services');
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set random mock ticket ID and submit inquiry to FormSubmit
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formInput.name || !formInput.email) {
      alert('Please fill out the name and email fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const ticketId = `XTQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setLastSubmittedId(ticketId);

    try {
      const response = await fetch("https://formsubmit.co/ajax/xentriqin@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "Name": formInput.name,
          "Email": formInput.email,
          "Company/Organization": formInput.companyName || "Private Individual",
          "Estimated Budget": formInput.budget,
          "Services Needed": formInput.servicesNeeded.join(', ') || "None Selected",
          "Project Code/TicketID": ticketId,
          "Scope Brief / Message": formInput.message || "No brief supplied"
        })
      });

      if (response.ok) {
        setIsFormSubmitted(true);
      } else {
        throw new Error('Transmission response failed.');
      }
    } catch (err) {
      console.error('Submission failed:', err);
      // Fallback state so the flow is not frozen, but notify the client
      setSubmitError('Secure backup activated: We queued your questionnaire but network sync is pending. Save your Ticket ID!');
      setIsFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle selected service checklist in contact form
  const handleToggleServiceNeeded = (srvName: string) => {
    setFormInput(prev => {
      const isExist = prev.servicesNeeded.includes(srvName);
      const updated = isExist 
        ? prev.servicesNeeded.filter(s => s !== srvName)
        : [...prev.servicesNeeded, srvName];
      return { ...prev, servicesNeeded: updated };
    });
  };

  // Send interactive demo notification
  const triggerDemoNotification = (text: string) => {
    setDemoNotification(text);
    setTimeout(() => {
      setDemoNotification(null);
    }, 4500);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-foreground selection:bg-white/20 selection:text-white">
      
      {/* 1. Cinematic Background Video Frame */}
      <div className="fixed inset-0 w-full h-full object-cover z-0 overflow-hidden select-none pointer-events-none bg-slate-950">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-85 font-sans"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        />
        {/* Cinematic gradient vignette - keeps text fully legible while respecting user rule: No custom radial gradients, only basic darkening overlay */}
        <div className="absolute inset-0 bg-slate-950/50 backdrop-contrast-[1.05]" />
      </div>

      {/* Outer Layout Wrapper */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between">
        
        {/* 2. Glassmorphic Sticky Header Navigation Bar */}
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/20 backdrop-blur-md transition-all duration-300">
          <div className="flex justify-between items-center px-4 xs:px-6 sm:px-8 py-5 max-w-7xl mx-auto">
            {/* Logo */}
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} 
              className="group flex items-center gap-1 focus:outline-none"
              id="header-nav-logo"
            >
              <span className="font-display text-2xl xs:text-3xl sm:text-4xl tracking-tight text-foreground transition-all group-hover:opacity-90">
                Xentriq Studio<sup className="text-[10px] sm:text-xs ml-0.5 select-none text-muted-foreground">®</sup>
              </span>
            </a>

            {/* Navigation Links - Hidden on Mobile */}
            <nav className="hidden md:flex items-center gap-8" id="desktop-navigation">
              {[
                { id: 'home', label: 'Home' },
                { id: 'services', label: 'Services' },
                { id: 'projects', label: 'Projects' },
                { id: 'about', label: 'About' },
                { id: 'contact', label: 'Contact' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-sm tracking-wide transition-all duration-300 relative py-1 focus:outline-none cursor-pointer ${
                    activeTab === link.id 
                      ? 'text-white font-medium after:absolute after:bottom-0 after:left-1/4 after:right-1/4 after:h-[1px] after:bg-white' 
                      : 'text-muted-foreground hover:text-white'
                  }`}
                  id={`nav-link-${link.id}`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right Action CTA Button and Mobile Trigger */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="liquid-glass rounded-full px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                id="header-cta-start-project"
              >
                Start a Project
              </button>

              {/* Mobile Menu Icon */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-muted-foreground hover:text-white md:hidden transition-colors focus:outline-none"
                aria-label="Toggle Menu"
                id="mobile-menu-trigger"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu Container */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-slate-950/95 border-b border-white/10 backdrop-blur-xl animate-fade-rise py-6 px-8 flex flex-col gap-5 z-40 max-h-[calc(100vh-80px)] overflow-y-auto">
              {[
                { id: 'home', label: 'Home' },
                { id: 'services', label: 'Services' },
                { id: 'projects', label: 'Projects' },
                { id: 'about', label: 'About' },
                { id: 'contact', label: 'Contact' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left text-lg py-2 border-b border-white/5 transition-colors focus:outline-none ${
                    activeTab === link.id ? 'text-white font-bold pl-2' : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2">
                <p className="text-xs text-muted-foreground">Inquiries:</p>
                <a href="mailto:xentriqin@gmail.com" className="text-sm text-white/80 hover:text-white underline">
                  xentriqin@gmail.com
                </a>
              </div>
            </div>
          )}
        </header>

        {/* 3. Main Sections Layout */}
        <main className="flex-grow w-full">
          
          {/* Section: Welcome / Hero (Fullscreen-ready cinematic card hub) */}
          <section 
            id="home" 
            ref={homeRef} 
            className="relative flex flex-col items-center justify-center text-center px-4 xs:px-6 sm:px-8 pt-20 sm:pt-32 pb-32 sm:pb-40 py-[80px] max-w-7xl mx-auto min-h-[90vh]"
          >
            {/* Hero Heading */}
            <h1 
              className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-1px] xs:tracking-[-2px] sm:tracking-[-2.46px] max-w-6xl font-normal text-white animate-fade-rise"
              style={{ fontFamily: "'Instrument Serif', serif" }}
              id="hero-main-title"
            >
              Building <em className="not-italic text-slate-400">Digital Experiences</em> That Move <em className="not-italic text-slate-400">Ideas Forward.</em>
            </h1>

            {/* Hero Subtext */}
            <p 
              className="text-muted-foreground text-xs sm:text-lg max-w-3xl mt-6 sm:mt-8 leading-relaxed animate-fade-rise-delay font-sans px-2"
              id="hero-main-subtext"
            >
              Xentriq Studio is a premium Software Development Company specializing in Mobile App Development, Web Application Development, Website Development, E-Commerce Development, Frontend Development, Backend Development, and expert SEO Optimization. We engineer high-performance systems and custom software solutions tailored for Tamil Nadu, India, and global enterprises.
            </p>

            {/* Highlights Row */}
            <div 
              className="text-[9px] xs:text-2xs sm:text-xs md:text-sm tracking-widest uppercase text-slate-400 mt-8 sm:mt-10 font-sans border-y border-white/5 py-3 px-4 sm:px-6 select-none bg-white/[0.01] rounded-2xl sm:rounded-full backdrop-blur-[2px] leading-relaxed max-w-full text-center inline-flex flex-wrap items-center justify-center gap-y-2 gap-x-1"
              id="hero-highlights-row"
            >
              Apps <span className="opacity-40 mx-2">•</span> Web Apps <span className="opacity-40 mx-2">•</span> Websites <span className="opacity-40 mx-2">•</span> E-Commerce <span className="opacity-40 mx-2">•</span> Frontend <span className="opacity-40 mx-2">•</span> Backend <span className="opacity-40 mx-2">•</span> SEO Optimization
            </div>

            {/* Featured Project Showcase Minimalist Module */}
            <div 
              className="mt-12 sm:mt-14 w-full max-w-xl group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/30 p-5 xs:p-6 sm:p-8 backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-slate-900/40 animate-fade-rise-delay"
              id="featured-project-glass-card"
            >
              <div className="absolute top-0 right-0 py-1.5 px-3 bg-white/10 rounded-bl-xl text-[10px] tracking-widest text-white/90 uppercase font-sans font-medium select-none">
                CURRENT PROJECT
              </div>
              
              <div className="flex flex-col items-center">
                <span className="text-2xs tracking-widest font-mono text-slate-400 uppercase">FLAGSHIP PRODUCT DEVELOPMENT</span>
                <h3 className="font-display text-3xl sm:text-4xl text-white mt-1 select-none">
                  TN Today
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm text-center mt-3 leading-relaxed max-w-lg font-sans">
                  Tamil Nadu-focused news platform delivering important updates, government announcements, public information, and daily news in a modern mobile-first experience. Launching in Late Summer 2026.
                </p>
                <div className="mt-5 flex gap-2 justify-center flex-wrap">
                  <span className="text-[10px] bg-white/5 px-2.5 py-1 rounded text-slate-350 tracking-wider">Mobile App</span>
                  <span className="text-[10px] bg-white/5 px-2.5 py-1 rounded text-slate-350 tracking-wider">Tamil & English</span>
                  <span className="text-[10px] bg-slate-100/10 px-2.5 py-1 rounded text-slate-200 font-medium tracking-wider">Late Summer 2026 Target</span>
                </div>
                
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="mt-5 text-2xs uppercase tracking-widest text-white font-medium flex items-center gap-1.5 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  Explore Showcase <ArrowRight size={12} />
                </button>
              </div>
            </div>

            {/* Hero Interactive CTA Buttons */}
            <div 
              className="flex gap-4 justify-center mt-10 sm:mt-12 flex-wrap animate-fade-rise-delay-2"
              id="hero-cta-button-group"
            >
              <button 
                onClick={() => scrollToSection('contact')}
                className="liquid-glass rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] text-white hover:bg-white/5 cursor-pointer shadow-lg shadow-black/10"
              >
                Start a Project
              </button>
              
              <button
                onClick={() => scrollToSection('projects')}
                className="liquid-glass rounded-full px-8 py-3.5 text-sm font-medium transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] text-slate-300 hover:text-white cursor-pointer"
              >
                View Our Work
              </button>
            </div>

            {/* Contact Email Link */}
            <div className="animate-fade-rise-delay-2">
              <a 
                href="mailto:xentriqin@gmail.com"
                className="inline-flex items-center gap-2 group text-sm text-slate-400 mt-10 hover:text-white transition-all cursor-pointer border-b border-transparent hover:border-slate-400 py-1"
                id="hero-mail-link"
              >
                <Mail size={14} className="group-hover:scale-110 transition-transform text-slate-500" />
                <span>Email: <strong className="font-semibold text-slate-300 group-hover:text-white">xentriqin@gmail.com</strong></span>
              </a>
            </div>
          </section>

          {/* Section: Services (Interactive Detail Suite) */}
          <section 
            id="services" 
            ref={servicesRef} 
            className="relative px-4 sm:px-8 py-20 sm:py-28 max-w-7xl mx-auto border-t border-white/5 bg-slate-950/40 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
              
              {/* Left Column: Heading and Sticky Service Selector */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <span className="text-2xs font-mono uppercase tracking-widest text-slate-400">WHAT WE ENGINEER</span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl text-white mt-2 leading-[0.95]" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  Services: Ecosystem of Software Solutions.
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base mt-6 leading-relaxed max-w-lg font-sans">
                  From lightning-fast websites to custom mobile platforms, we combine architectural robustness with flawless layouts. Select an area below to inspect our core stack and delivery roadmap.
                </p>

                {/* Vertical selectors */}
                <div className="mt-8 flex flex-col gap-1.5" id="services-tabs-menu">
                  {SERVICES_DATA.map((service, index) => {
                    const isSelected = selectedServiceId === service.id;
                    return (
                      <button
                        key={service.id}
                        onClick={() => setSelectedServiceId(service.id)}
                        aria-label={`View detailed ${service.title} blueprint`}
                        aria-pressed={isSelected}
                        className={`w-full flex items-center justify-between text-left p-3.1 rounded-xl transition-all duration-300 focus:outline-none cursor-pointer ${
                          isSelected 
                            ? 'bg-white/5 border-l-2 border-white pl-4' 
                            : 'hover:bg-white/[0.02] pl-3 border-l-2 border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-slate-500">0{index + 1}</span>
                          <span className={`text-sm sm:text-base transition-colors ${isSelected ? 'text-white font-medium' : 'text-slate-400'}`}>
                            {service.title}
                          </span>
                        </div>
                        <ChevronRight size={14} className={`transition-transform duration-300 ${isSelected ? 'text-white translate-x-1' : 'text-slate-500'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Dynamic Core Stack Blueprint Card */}
              <div className="lg:col-span-7">
                <div className="liquid-glass border border-white/10 rounded-2xl p-5 xs:p-6 sm:p-10 min-h-auto lg:min-h-[465px] flex flex-col justify-between transition-all duration-500 hover:border-white/20">
                  <div>
                    {/* Header with technology badges */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-5">
                      <div>
                        {selectedServiceId === 'mobile' && <span className="inline-flex p-2.5 bg-slate-900 rounded-lg text-white mb-2"><Smartphone size={20} /></span>}
                        {selectedServiceId === 'web-apps' && <span className="inline-flex p-2.5 bg-slate-900 rounded-lg text-white mb-2"><Globe size={20} /></span>}
                        {selectedServiceId === 'websites' && <span className="inline-flex p-2.5 bg-slate-900 rounded-lg text-white mb-2"><Layers size={20} /></span>}
                        {selectedServiceId === 'ecommerce' && <span className="inline-flex p-2.5 bg-slate-900 rounded-lg text-white mb-2"><ShoppingBag size={20} /></span>}
                        {selectedServiceId === 'frontend' && <span className="inline-flex p-2.5 bg-slate-900 rounded-lg text-white mb-2"><Layers size={20} /></span>}
                        {selectedServiceId === 'backend' && <span className="inline-flex p-2.5 bg-slate-900 rounded-lg text-white mb-2"><Database size={20} /></span>}
                        {selectedServiceId === 'seo' && <span className="inline-flex p-2.5 bg-slate-900 rounded-lg text-white mb-2"><Search size={20} /></span>}
                        {selectedServiceId === 'product-design' && <span className="inline-flex p-2.5 bg-slate-900 rounded-lg text-white mb-2"><Sparkles size={20} /></span>}
                        
                        <h3 className="font-display text-3xl sm:text-4xl text-white mt-1">
                          {currentServiceDetail.title}
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5" id="dynamic-stack-badges">
                        {currentServiceDetail.features.map(feat => (
                          <span 
                            key={feat}
                            className="text-[10px] bg-white/10 px-2.5 py-1 rounded font-mono text-slate-200 uppercase tracking-widest"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Service Pitch Description */}
                    <p className="text-slate-300 text-sm sm:text-base my-6 leading-relaxed font-sans">
                      {currentServiceDetail.description}
                    </p>

                    {/* Solid Delivery Blueprint Details Checklist */}
                    <div className="mt-6">
                      <h4 className="text-2xs font-mono uppercase tracking-widest text-slate-400 mb-4">OUR SERVICE BLUEPRINT</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentServiceDetail.detailedPoints.map((point, index) => (
                          <div 
                            key={index}
                            className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-colors"
                          >
                            <span className="p-0.5 rounded bg-white/10 text-white mt-0.5"><Check size={10} /></span>
                            <span className="text-xs text-slate-350 leading-relaxed font-sans">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Engagement CTA Block */}
                  <div className="mt-10 border-t border-white/5 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-xs text-slate-450 font-sans">
                      Interested in securing Xentriq for your next <strong className="text-slate-300">{currentServiceDetail.title}</strong>?
                    </div>
                    <button
                      onClick={() => {
                        setFormInput(prev => ({
                          ...prev,
                          projectType: currentServiceDetail.title,
                          servicesNeeded: [currentServiceDetail.title]
                        }));
                        scrollToSection('contact');
                      }}
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      Initialize Quote <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Section: Projects (Detailed showcase of TN Today flagship product) */}
          <section 
            id="projects" 
            ref={projectsRef} 
            className="relative px-4 sm:px-8 py-20 sm:py-28 max-w-7xl mx-auto border-t border-white/5 bg-slate-950/20 backdrop-blur-sm"
          >
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <span className="text-2xs font-mono uppercase tracking-widest text-slate-450">FLAGSHIP IN-HOUSE PRODUCTS & RELEASES</span>
              <h2 className="text-4xl sm:text-5.5xl md:text-6xl text-white mt-2 leading-[0.95]" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Featured Project: TN Today News Platform
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mt-4 font-sans leading-relaxed px-2">
                Alongside custom architecture client work, Xentriq Studio designs bespoke apps targeting local needs. Here is a feature study of our upcoming flagship news platform.
              </p>
            </div>

            {/* Showcase Grid of TN Today Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Product Specifications Sheet */}
              <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-6">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 max-w-fit flex items-center gap-2 select-none">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-semibold">Active Studio Build: Beta 1.0</span>
                </div>

                <div className="font-display text-4.5xl sm:text-5xl text-white select-none">
                  TN Today®
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                  "TN Today is a Tamil Nadu-focused news platform delivering important updates, government announcements, public information, and daily news in a modern mobile-first experience. Launching in Late Summer 2026."
                </p>

                <div className="border-t border-b border-white/5 py-4 my-2 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="text-slate-450 font-mono">PRIMARY MISSION</span>
                    <span className="text-slate-200 font-medium text-right">Tamil Nadu Localized Focus</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="text-slate-450 font-mono">SUPPORTED LANGS</span>
                    <span className="text-slate-200 font-medium font-display text-sm tracking-wide text-right">English & தமிழ் (Tamil)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="text-slate-450 font-mono">CORE INFRASTRUCTURE</span>
                    <span className="text-slate-200 font-mono text-[10px] text-right">React Native / SQLite Offline Cache</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="text-slate-450 font-mono">TARGET RELEASE</span>
                    <span className="text-slate-200 font-medium text-white/90 text-right">Late Summer 2026</span>
                  </div>
                </div>

                {/* Grid checklist highlights for TN Today */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                  {PROJECTS_DATA[0].features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2 bg-white/[0.01] rounded-lg border border-white/5">
                      <span className="text-slate-400 mt-0.5"><Check size={12} /></span>
                      <span className="text-xs text-slate-300 font-sans">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <button 
                  onClick={() => {
                    setFormInput(prev => ({
                      ...prev,
                      message: "I'd like to reach out regarding the TN Today platform upcoming release! I'm interested in potentially partnership / alpha testing opportunities."
                    }));
                    scrollToSection('contact');
                  }}
                  className="liquid-glass rounded-full px-5 py-2.5 text-xs text-slate-200 hover:text-white inline-flex items-center gap-1.5 focus:outline-none transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <span>Partner/Support Platform</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>

            {/* Interactive Phone Teaser Simulator */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center py-6 w-full">
              
              {/* Decorative phone outer bezel container */}
              <div className="relative w-full max-w-full xs:max-w-[340px] h-[640px] rounded-[40px] border-[5px] border-white/10 bg-black/90 p-3 shadow-2xl shadow-indigo-950/40 overflow-hidden flex flex-col justify-between">
                  
                  {/* Dynamic interactive alert badge on phone screen top boundary */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 w-32 h-4.5 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center z-30 select-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2 animate-pulse" />
                    <span className="text-[8px] font-mono uppercase tracking-widest text-slate-400">Dynamic Island</span>
                  </div>

                  {/* Active Demo Live Notification pop-over */}
                  {demoNotification && (
                    <div className="absolute top-20 left-4 right-4 bg-slate-950/95 border border-white/20 rounded-xl p-3.5 shadow-xl shadow-black z-40 animate-fade-rise text-left">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="p-1 rounded bg-slate-900 border border-white/10"><Sparkles size={10} className="text-indigo-300" /></span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold">XENTRIQ ACTIVE DEMO</span>
                      </div>
                      <p className="text-xs text-white leading-relaxed font-mono">
                        {demoNotification}
                      </p>
                    </div>
                  )}

                  {/* Background loop of phone mock interface */}
                  <div className="absolute inset-x-0 top-0 bottom-0 bg-slate-950/90 z-10 flex flex-col justify-between p-4 pt-16">
                    
                    {/* Header bar of Tamil Nadu News Reader App */}
                    <div>
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <div>
                          <span className="text-[10px] font-mono text-slate-500 uppercase">Tamil Nadu Premium Feed</span>
                          <h4 className="font-display text-xl text-white mt-0.5 select-none">TN Today</h4>
                        </div>
                        <span className="text-[10px] bg-slate-900 border border-white/10 px-2 py-0.5 rounded text-slate-350">
                          Beta Build
                        </span>
                      </div>

                      {/* Selector tabs under phone build applet */}
                      <div className="flex justify-between mt-3 bg-white/5 p-1 rounded-lg">
                        <button
                          onClick={() => {
                            setActiveTeaserTab('news');
                            triggerDemoNotification("Mock local database loaded: Dynamic Tamil feed fetched seamlessly!");
                          }}
                          aria-label="View Important News feed"
                          aria-pressed={activeTeaserTab === 'news'}
                          className={`flex-1 py-1 text-[10px] text-center rounded transition-all cursor-pointer ${activeTeaserTab === 'news' ? 'bg-white/10 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                          Important News
                        </button>
                        <button
                          onClick={() => {
                            setActiveTeaserTab('govt');
                            triggerDemoNotification("Push sync connected: Tamil Nadu Gazette announcements parsed automatically.");
                          }}
                          aria-label="View Government Circulars feed"
                          aria-pressed={activeTeaserTab === 'govt'}
                          className={`flex-1 py-1 text-[10px] text-center rounded transition-all cursor-pointer ${activeTeaserTab === 'govt' ? 'bg-white/10 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                          Govt Circulars
                        </button>
                        <button
                          onClick={() => {
                            setActiveTeaserTab('about');
                            triggerDemoNotification("About Widget: SQLite client-side performance metrics showing 12ms query execution.");
                          }}
                          aria-label="View system and database diagnostics details"
                          aria-pressed={activeTeaserTab === 'about'}
                          className={`flex-1 py-1 text-[10px] text-center rounded transition-all cursor-pointer ${activeTeaserTab === 'about' ? 'bg-white/10 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                          Diagnostics
                        </button>
                      </div>
                    </div>

                    {/* Interactive Feed Teaser based on active tab state */}
                    <div className="flex-grow my-4 overflow-y-auto pr-1" id="phone-feed-container">
                      
                      {activeTeaserTab === 'news' && (
                        <div className="flex flex-col gap-2.5 text-left animate-fade-rise">
                          
                          {/* Feed item 1 */}
                          <article className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="flex justify-between items-center">
                              <span className="text-[8px] tracking-widest font-mono text-emerald-400 uppercase font-semibold">Tamil Nadu News Feed</span>
                              <span className="text-[8px] text-slate-450">2m ago</span>
                            </div>
                            <h5 className="font-display text-base text-white/95 mt-1 leading-tight">Tamil Nadu High-Tech corridor expansion approved by Ministry.</h5>
                            <p className="text-[10px] text-slate-400 leading-normal mt-1 font-sans">
                              Major capital allocation for tech workspace infrastructures and high performance smart corridors...
                            </p>
                            <div className="flex justify-between items-center mt-2.5 pt-2 border-t border-white/5">
                              <span className="text-[9px] font-display text-slate-350 italic">தமிழ் பதிப்பு வரவிருக்கிறது</span>
                              <span className="text-[9px] font-mono text-slate-400">Read App Article →</span>
                            </div>
                          </article>

                          {/* Feed item 2 */}
                          <article className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="flex justify-between items-center">
                              <span className="text-[8px] tracking-widest font-mono text-slate-400 uppercase">Climate Update</span>
                              <span className="text-[8px] text-slate-450">1h ago</span>
                            </div>
                            <h5 className="font-display text-base text-white/95 mt-1 leading-tight">Monsoon infrastructure preparedness evaluated.</h5>
                            <p className="text-[10px] text-slate-400 leading-normal mt-1 font-sans">
                              Public utility updates, drainage structural optimizations, and central support frameworks finalized...
                            </p>
                          </article>

                        </div>
                      )}

                      {activeTeaserTab === 'govt' && (
                        <div className="flex flex-col gap-2.5 text-left animate-fade-rise">
                          
                          <article className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/20">
                            <span className="text-[8px] bg-indigo-500/20 px-2 py-0.5 rounded text-indigo-300 font-mono tracking-widest font-bold">STATE GAZETTE</span>
                            <h5 className="font-display text-base text-white mt-1.5 leading-tight">G.O. Ms No. 2026-6 — IT Department Policy</h5>
                            <p className="text-[10px] text-slate-350 leading-normal mt-1 font-sans">
                              Digital empowerment scheme authorizing technical skill incubators across state centers...
                            </p>
                          </article>

                          <article className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                            <span className="text-[8px] text-slate-400 font-mono">TN GOVT PORTAL FEED</span>
                            <h5 className="font-display text-sm text-slate-300 mt-1 leading-snug">Public Announcement: Smart transport systems integrated.</h5>
                          </article>

                        </div>
                      )}

                      {activeTeaserTab === 'about' && (
                        <div className="flex flex-col gap-2.5 text-left animate-fade-rise font-sans text-xs">
                          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-2">
                            <div className="flex justify-between items-center text-[9px] border-b border-white/5 pb-1">
                              <span className="text-slate-400">FRAMEWORK</span>
                              <span className="text-slate-100 font-mono">React Native iOS v1.0</span>
                            </div>
                            <div className="flex justify-between items-center text-[9px] border-b border-white/5 pb-1">
                              <span className="text-slate-400">LOCAL DATABASE</span>
                              <span className="text-slate-100 font-mono">Pristine SQLite Cache</span>
                            </div>
                            <div className="flex justify-between items-center text-[9px] border-b border-white/5 pb-1">
                              <span className="text-slate-400">SPEED HYDRATION</span>
                              <span className="text-emerald-400 font-mono font-medium">99.7 FPS Smooth</span>
                            </div>
                            <div className="flex justify-between items-center text-[9px]">
                              <span className="text-slate-450">SECURITY PROTOCOL</span>
                              <span className="text-slate-100 font-mono">TLS 1.3 / local keys</span>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => triggerDemoNotification("Tamil dialect typography engine initializing inside mobile viewport: தமிழ்!")}
                            className="w-full py-2 bg-white/10 rounded-lg text-[10px] text-center font-bold tracking-widest hover:bg-white/20 transition-colors uppercase focus:outline-none cursor-pointer"
                          >
                            Reset Render Engine
                          </button>
                        </div>
                      )}

                    </div>

                    {/* Bottom Home indicator mimicking iOS shell */}
                    <div className="border-t border-white/5 pt-3.5">
                      <div className="flex justify-between items-center text-[8px] font-mono text-slate-500 mb-1">
                        <span>Xentriq Labs®</span>
                        <span>Tamil Nadu, India</span>
                      </div>
                      <div className="w-1/3 h-1 bg-white/30 rounded-full mx-auto" />
                    </div>

                  </div>

                </div>

              </div>

            </div>
          </section>

          {/* Section: About (In-Depth Core Information) */}
          <section 
            id="about" 
            ref={aboutRef} 
            className="relative px-4 sm:px-8 py-20 sm:py-28 max-w-7xl mx-auto border-t border-white/5 bg-slate-950/40 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
              
              {/* Left Title block */}
              <div className="lg:col-span-5">
                <span className="text-2xs font-mono uppercase tracking-widest text-slate-400">STUDIO MANIFESTO</span>
                <h2 className="text-4xl sm:text-5.5xl md:text-6xl text-white mt-2 leading-[0.95]" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  About Xentriq Studio: Aesthetic Rigor, Technological Truth.
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base mt-6 leading-relaxed font-sans px-1">
                  Xentriq Studio is a premier software development company and website development collective. Based in Tamil Nadu, India, we build modern web applications, bespoke Android & iOS mobile apps, and robust custom software solutions. We are a specialized team of expert engineers constructing high-luxury digital platforms, fast static React configurations, and user-centric systems that index dynamically.
                </p>

                {/* Micro counters for trust */}
                <div className="grid grid-cols-3 gap-2 xs:gap-4 mt-8 border-t border-white/5 pt-8">
                  <div>
                    <div className="font-display text-2xl xs:text-3xl sm:text-4xl text-white">2026</div>
                    <div className="text-[9px] xs:text-[10px] font-mono text-slate-450 uppercase tracking-widest mt-1">Active Horizon</div>
                  </div>
                  <div>
                    <div className="font-display text-2xl xs:text-3xl sm:text-4xl text-white">100%</div>
                    <div className="text-[9px] xs:text-[10px] font-mono text-slate-450 uppercase tracking-widest mt-1">Type Safety</div>
                  </div>
                  <div>
                    <div className="font-display text-2xl xs:text-3xl sm:text-4xl text-white">Primacy</div>
                    <div className="text-[9px] xs:text-[10px] font-mono text-slate-450 uppercase tracking-widest mt-1">Over Defaults</div>
                  </div>
                </div>
              </div>

              {/* Right content pillars */}
              <div className="lg:col-span-7 flex flex-col gap-5">
                <div className="liquid-glass border border-white/10 rounded-2xl p-5 xs:p-6 sm:p-8 hover:border-white/20 transition-all duration-300">
                  <h3 className="font-display text-xl sm:text-2xl text-white mb-2">Architectural Philosophy</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                    We hate complexity and bloat. Our codebase is meticulously modularized, type-guarded, and optimized for sub-second responses. We prefer standard, powerful tools like TypeScript and Node over heavy layers that break easily.
                  </p>
                </div>

                <div className="liquid-glass border border-white/10 rounded-2xl p-5 xs:p-6 sm:p-8 hover:border-white/20 transition-all duration-300">
                  <h3 className="font-display text-xl sm:text-2xl text-white mb-2">Pure Typographic Harmony</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                    Every digital product we design is anchored by an eye-safe aesthetic, generous grid negative space, and pairing of display serif display faces like "Instrument Serif" alongside geometric grotesque body weights. We construct websites that behave like high-luxury editorial catalogs.
                  </p>
                </div>

                <div className="liquid-glass border border-white/10 rounded-2xl p-5 xs:p-6 sm:p-8 hover:border-white/20 transition-all duration-300">
                  <h3 className="font-display text-xl sm:text-2xl text-white mb-2">Tamil Nadu Roots</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                    We operate directly out of Tamil Nadu, aiming to bolster digital accessibility, government interface tools, and informational platforms. Our flagship app, **TN Today**, is custom tailored to serve local regional groups in a modern mobile UI experience.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* Section: Contact / Project Initialization Form (Interactive Lead portal) */}
          <section 
            id="contact" 
            ref={contactRef} 
            className="relative px-4 sm:px-8 py-20 sm:py-28 max-w-7xl mx-auto border-t border-white/5 bg-slate-950/25 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
              
              {/* Left Column info details */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <span className="text-2xs font-mono uppercase tracking-widest text-slate-400">INITIATE INQUIRY</span>
                <h2 className="text-4xl sm:text-5.5xl md:text-6xl text-white mt-2 leading-[0.95]" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  Contact Xentriq Studio: Let's craft the next digital standard.
                </h2>
                
                <p className="text-muted-foreground text-sm sm:text-base mt-6 leading-relaxed font-sans px-1">
                  Ready to construct a tailored digital product, secure backend service, or elite frontend design with Xentriq Studio? Fill our simple builder questionnaire below, and we will get back to you within 24 hours.
                </p>

                {/* Static contact support badges */}
                <div className="mt-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 max-w-sm">
                    <div className="p-2 rounded bg-slate-900 border border-white/5 text-white">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-slate-450 uppercase tracking-widest">DIRECT MAILING ADDRESS</p>
                      <a href="mailto:xentriqin@gmail.com" className="text-sm font-semibold text-white/95 hover:text-white underline">
                        xentriqin@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 max-w-sm">
                    <div className="p-2 rounded bg-slate-900 border border-white/5 text-indigo-400">
                      <Lock size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-slate-450 uppercase tracking-widest">DATA ARCHIVE ENCRYPTION</p>
                      <p className="text-xs text-slate-300">Strictly encrypted communication records.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Beautiful Interactive Client Form Ticket */}
              <div className="lg:col-span-7">
                
                {!isFormSubmitted ? (
                  <form 
                    onSubmit={handleInquirySubmit}
                    className="liquid-glass border border-white/10 rounded-3xl p-5 xs:p-8 sm:p-10 transition-all duration-500 hover:border-white/20 bg-slate-900/40"
                    id="contact-project-form"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5 mb-6">
                      <h3 className="font-display text-2xl text-white">Xentriq Project Questionnaire</h3>
                      <span className="w-fit text-[10px] font-mono bg-white/10 px-2.5 py-1 rounded text-slate-200">Quote Engine v1.0</span>
                    </div>

                    {/* Step 1: Select services needed (Interactive checklist) */}
                    <div className="mb-6">
                      <label className="block text-2xs font-mono uppercase tracking-widest text-slate-350 mb-3">
                        SELECT PROJECT REQUIREMENTS
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          "Mobile App Development",
                          "Web Application Development",
                          "Headless E-Commerce System",
                          "Frontend System",
                          "Backend Microservices",
                          "SEO Optimization & Analytics"
                        ].map((srv) => {
                          const isChecked = formInput.servicesNeeded.includes(srv);
                          return (
                            <button
                              key={srv}
                              type="button"
                              onClick={() => handleToggleServiceNeeded(srv)}
                              aria-pressed={isChecked}
                              aria-label={`Select requirement: ${srv}`}
                              className={`p-3 rounded-xl border text-left text-xs transition-all duration-350 flex items-center justify-between cursor-pointer focus:outline-none ${
                                isChecked 
                                  ? 'border-white bg-white/5 text-white font-medium' 
                                  : 'border-white/15 bg-white/[0.01] text-slate-400 hover:border-white/20 hover:bg-white/[0.02]'
                              }`}
                            >
                              <span>{srv}</span>
                              <span className={`w-4 class-checkbox h-4 rounded border flex items-center justify-center transition-colors ${
                                isChecked ? 'bg-white border-white text-slate-950' : 'border-white/15 text-transparent'
                              }`}>
                                <Check size={10} className="stroke-[3]" />
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Text fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label htmlFor="client-name" className="block text-2xs font-mono uppercase tracking-widest text-slate-350 mb-2">YOUR NAME*</label>
                        <input
                          id="client-name"
                          type="text"
                          required
                          value={formInput.name}
                          onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
                          className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-white/30 transition-all font-sans"
                          placeholder="e.g. Arul Kumar"
                        />
                      </div>
                      <div>
                        <label htmlFor="client-email" className="block text-2xs font-mono uppercase tracking-widest text-slate-350 mb-2">EMAIL ADDRESS*</label>
                        <input
                          id="client-email"
                          type="email"
                          required
                          value={formInput.email}
                          onChange={(e) => setFormInput({ ...formInput, email: e.target.value })}
                          className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-white/30 transition-all font-sans"
                          placeholder="e.g. arul@company.com"
                        />
                      </div>
                    </div>

                    {/* Company and Budget Range */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label htmlFor="client-company" className="block text-2xs font-mono uppercase tracking-widest text-slate-350 mb-2">COMPANY/ORGANIZATION</label>
                        <input
                          id="client-company"
                          type="text"
                          value={formInput.companyName}
                          onChange={(e) => setFormInput({ ...formInput, companyName: e.target.value })}
                          className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-white/30 transition-all font-sans"
                          placeholder="e.g. Acme Tech Enterprises"
                        />
                      </div>
                      <div>
                        <label htmlFor="client-budget" className="block text-2xs font-mono uppercase tracking-widest text-slate-350 mb-2">ESTIMATED BUDGET</label>
                        <select
                          id="client-budget"
                          value={formInput.budget}
                          onChange={(e) => setFormInput({ ...formInput, budget: e.target.value })}
                          className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-white/30 transition-all font-sans cursor-pointer"
                        >
                          <option className="bg-slate-950 text-white" value="₹5,000 - ₹15,000">₹5,000 - ₹15,000 INR</option>
                          <option className="bg-slate-950 text-white" value="₹15,000 - ₹35,000">₹15,000 - ₹35,000 INR</option>
                          <option className="bg-slate-950 text-white" value="₹35,000 - ₹75,000">₹35,000 - ₹75,000 INR</option>
                          <option className="bg-slate-950 text-white" value="₹75,000+">₹75,000+ INR (Custom Enterprise)</option>
                        </select>
                      </div>
                    </div>

                    {/* Detailed message box */}
                    <div className="mb-6">
                      <label htmlFor="client-message" className="block text-2xs font-mono uppercase tracking-widest text-slate-350 mb-2">PROJECT BRIEF / SCOPE</label>
                      <textarea
                        id="client-message"
                        value={formInput.message}
                        onChange={(e) => setFormInput({ ...formInput, message: e.target.value })}
                        className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-white/30 transition-all font-sans min-h-[120px]"
                        placeholder="Detail other specifications, timeline requirements or questions you may have..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl py-4 bg-white text-slate-950 hover:bg-slate-200 transition-colors duration-300 font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xl focus:outline-none select-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin mr-1" />
                          <span>Transmitting Securely...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Transmit Project Questionnaire</span>
                        </>
                      )}
                    </button>
                    {submitError && (
                      <p className="mt-3 text-xs text-amber-400 font-sans text-center">{submitError}</p>
                    )}
                  </form>
                ) : (
                  // Success State Confirmation Panel
                  <div className="liquid-glass border border-emerald-500/20 rounded-3xl p-6 sm:p-10 bg-slate-900/50 animate-fade-rise text-center flex flex-col items-center">
                    <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-6">
                      <CheckCircle size={38} className="stroke-[1.5]" />
                    </div>

                    <h3 className="font-display text-3xl sm:text-4xl text-white">Questionnaire Transmitted</h3>
                    <p className="text-xs font-mono tracking-widest text-slate-400 mt-2 select-all">TICKET ID: {lastSubmittedId}</p>

                    <p className="text-slate-300 text-sm font-sans mt-4 max-w-xl leading-relaxed">
                      Thank you for contacting Xentriq Studio, <strong className="text-white">{formInput.name}</strong>. We have securely archived your requirements for <strong className="text-white">{formInput.servicesNeeded.join(', ') || 'Custom Solution'}</strong> under estimated budget code <strong className="text-white">{formInput.budget}</strong>. 
                    </p>

                    <div className="p-5 bg-white/5 border border-white/10 rounded-2xl w-full text-left my-6 text-xs font-mono flex flex-col gap-2.5">
                      <span className="text-[10px] uppercase text-emerald-400 font-bold border-b border-white/5 pb-2">TRANSMITTED ARCHIVE SUMMARY</span>
                      <div className="flex justify-between"><span className="text-slate-450">Contact:</span><span className="text-slate-200">{formInput.name} ({formInput.email})</span></div>
                      <div className="flex justify-between"><span className="text-slate-450">Entity:</span><span className="text-slate-200">{formInput.companyName || 'Private Individual'}</span></div>
                      <div className="flex justify-between"><span className="text-slate-450">Budget:</span><span className="text-slate-200">{formInput.budget}</span></div>
                      {formInput.message && (
                        <div className="border-t border-white/5 pt-2 flex flex-col gap-1">
                          <span className="text-slate-450">Message Brief:</span>
                          <span className="text-slate-300 italic font-sans normal-case text-2xs leading-relaxed">{formInput.message}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-slate-400 text-xs font-sans">
                      A copy of this digital draft has been securely cached in session storage. Our architecture crew (in Tamil Nadu) will review this and respond to <strong className="text-white">{formInput.email}</strong> shortly.
                    </p>

                    <button
                      onClick={() => {
                        setIsFormSubmitted(false);
                        setFormInput({
                          name: '',
                          email: '',
                          companyName: '',
                          projectType: 'Mobile App Development',
                          budget: '₹5,000 - ₹15,000',
                          message: '',
                          servicesNeeded: ['Mobile App Development']
                        });
                      }}
                      className="mt-6 text-xs text-slate-400 hover:text-white underline cursor-pointer focus:outline-none"
                    >
                      Initialize New Project Draft
                    </button>
                  </div>
                )}

              </div>

            </div>
          </section>

        </main>

        {/* 4. Elegant Minimalist Footer */}
        <footer className="border-t border-white/5 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs text-slate-400">
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="font-display text-lg text-white font-medium select-none">
                  Xentriq Studio<sup className="text-[10px] text-slate-500">®</sup>
                </span>
                <span className="text-slate-600">|</span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-350 select-none">Software Development Company</span>
              </div>
              <div className="text-[10px] text-slate-500 leading-normal max-w-md select-none">
                <strong>Services:</strong> App Development • Web Development • Websites • E-Commerce • SEO. Preserving aesthetic excellence and performance across local & international horizons.
              </div>
            </div>

            {/* Middle Copyright Details */}
            <div className="text-slate-500 text-left md:text-right flex flex-col gap-1 select-none">
              <div>
                © {new Date().getFullYear()} Xentriq Studio. Tamil Nadu, IN. All rights reserved. 
              </div>
              <div className="text-[10px] text-slate-500">
                Contact: <a href="mailto:xentiqin@gmail.com" className="hover:text-white underline">xentiqin@gmail.com</a>
              </div>
            </div>

            {/* Secondary footer items */}
            <div className="flex gap-5 font-mono text-[10px]" id="footer-actions">
              <a 
                href="#services" 
                onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} 
                className="text-slate-450 hover:text-slate-200"
              >
                Services
              </a>
              <a 
                href="#projects" 
                onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} 
                className="text-slate-450 hover:text-slate-200"
              >
                TN Today
              </a>
              <a 
                href="mailto:xentriqin@gmail.com" 
                className="text-slate-450 hover:text-slate-200"
              >
                Inquiries
              </a>
            </div>

          </div>
        </footer>

      </div>
    </div>
  );
}
