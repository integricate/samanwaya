
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, CoordinationScene } from './components/QuantumScene';
import { GovernancePillar, RepresentationChart, ContactSection } from './components/Diagrams';
import { ArrowDown, Menu, X, Globe, Users, Target, Rocket, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const SectionHeading = ({ subtitle, title, light = false }: { subtitle: string, title: string, light?: boolean }) => (
  <div className="mb-12">
    <div className={`inline-block mb-3 text-xs font-bold tracking-widest uppercase ${light ? 'text-cream/50' : 'text-text-main/50'}`}>
      {subtitle}
    </div>
    <h2 className={`font-serif text-4xl md:text-5xl leading-tight ${light ? 'text-white' : 'text-primary-green'}`}>
      {title}
    </h2>
    <div className="w-16 h-1 bg-accent-green mt-6"></div>
  </div>
);

const AuthorCard = ({ name, role, delay }: { name: string, role: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-accent-green/50" style={{ animationDelay: delay }}>
      <h3 className="font-serif text-2xl text-primary-green text-center mb-3">{name}</h3>
      <div className="w-12 h-0.5 bg-accent-green mb-4 opacity-60"></div>
      <p className="text-xs text-text-main/70 font-bold uppercase tracking-widest text-center leading-relaxed">{role}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Account for fixed header offset
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-cream text-text-main selection:bg-accent-green selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-primary-green rounded-xl flex items-center justify-center text-white shadow-sm overflow-hidden transform rotate-3">
              <span className="font-serif font-bold text-2xl pb-1 -rotate-3">S</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-serif font-bold text-lg leading-tight tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
                SAMANWAYA <span className="font-normal text-primary-green/60">NEPAL</span>
              </span>
              <span className={`text-[10px] font-bold tracking-tighter uppercase transition-opacity ${scrolled ? 'opacity-70' : 'opacity-0'} hidden md:block`}>
                समन्वय नेपाल
              </span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-text-main/80 uppercase">
            <a href="#about" onClick={scrollToSection('about')} className="hover:text-accent-green transition-colors cursor-pointer">About</a>
            <a href="#pillars" onClick={scrollToSection('pillars')} className="hover:text-accent-green transition-colors cursor-pointer">Our Work</a>
            <a href="#representation" onClick={scrollToSection('representation')} className="hover:text-accent-green transition-colors cursor-pointer">Impact</a>
            <a href="#team" onClick={scrollToSection('team')} className="hover:text-accent-green transition-colors cursor-pointer">Leadership</a>
            
            <div className="h-4 w-[1px] bg-text-main/10 mx-2"></div>
            
            <div className="flex items-center gap-4">
              <a href="https://x.com/samanwaya_np" target="_blank" rel="noopener noreferrer" className="text-text-main hover:text-accent-green transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://www.linkedin.com/company/samanwaya" target="_blank" rel="noopener noreferrer" className="text-text-main hover:text-accent-green transition-colors">
                <Linkedin size={18} />
              </a>
            </div>

            <a 
              href="#contact" 
              onClick={scrollToSection('contact')}
              className="ml-4 px-6 py-2.5 bg-primary-green text-white rounded-full hover:bg-accent-green transition-all shadow-sm cursor-pointer hover:shadow-md active:scale-95"
            >
              Contact Us
            </a>
          </div>

          <button className="md:hidden text-primary-green p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in p-6 text-center">
            <a href="#about" onClick={scrollToSection('about')} className="hover:text-accent-green transition-colors cursor-pointer uppercase font-bold tracking-widest text-sm">About</a>
            <a href="#pillars" onClick={scrollToSection('pillars')} className="hover:text-accent-green transition-colors cursor-pointer uppercase font-bold tracking-widest text-sm">Our Work</a>
            <a href="#representation" onClick={scrollToSection('representation')} className="hover:text-accent-green transition-colors cursor-pointer uppercase font-bold tracking-widest text-sm">Impact</a>
            <a href="#team" onClick={scrollToSection('team')} className="hover:text-accent-green transition-colors cursor-pointer uppercase font-bold tracking-widest text-sm">Leadership</a>
            
            <div className="flex gap-8 my-4">
              <a href="https://x.com/samanwaya_np" target="_blank" rel="noopener noreferrer" className="text-primary-green"><Twitter size={24} /></a>
              <a href="https://www.linkedin.com/company/samanwaya" target="_blank" rel="noopener noreferrer" className="text-primary-green"><Linkedin size={24} /></a>
              <a href="https://www.instagram.com/samanwaya.np/" target="_blank" rel="noopener noreferrer" className="text-primary-green"><Instagram size={24} /></a>
            </div>

            <a 
              href="#contact" 
              onClick={scrollToSection('contact')}
              className="px-8 py-4 bg-primary-green text-white rounded-full shadow-lg cursor-pointer text-sm font-bold uppercase tracking-widest"
            >
              Contact Us
            </a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(253,251,247,0.8)_0%,rgba(253,251,247,0.4)_50%,rgba(253,251,247,0.2)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 border border-primary-green/20 text-primary-green text-[10px] tracking-[0.3em] uppercase font-black rounded-full backdrop-blur-md bg-white/40">
            <Globe size={12} /> Established in Nepal
          </div>
          <h1 className="font-serif text-5xl md:text-8xl lg:text-[10rem] font-medium leading-[0.85] mb-8 text-primary-green drop-shadow-sm">
            Samanwaya <br/><span className="italic font-normal text-accent-green text-3xl md:text-5xl lg:text-6xl block mt-4">Coordinating for a Stronger Democracy.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-text-main/80 font-light leading-relaxed mb-12">
            Strengthening democratic processes and political coordination. Empowering the next generation of civic changemakers.
          </p>
          
          <div className="flex justify-center">
             <a href="#about" onClick={scrollToSection('about')} className="group flex flex-col items-center gap-4 text-xs font-bold tracking-[0.2em] text-text-main/40 hover:text-primary-green transition-all cursor-pointer">
                <span>OUR MISSION</span>
                <span className="p-3 border border-primary-green/10 rounded-full group-hover:border-primary-green/40 group-hover:bg-white transition-all shadow-sm">
                    <ArrowDown size={18} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* About Section */}
        <section id="about" className="py-32 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <SectionHeading subtitle="Who We Are" title="Nurturing Political Leaders" />
              <p className="text-xl text-text-main leading-relaxed mb-8 italic border-l-4 border-accent-green pl-6 py-2">
                Samanwaya Nepal (समन्वय नेपाल) is a profit non-distributing organization dedicated to strengthening democratic processes across Nepal.
              </p>
            </div>
            <div className="lg:col-span-7 text-lg text-text-main/80 leading-relaxed space-y-8">
              <p>
                As a <strong>youth-run and led organization</strong>, we focus on fostering democratic engagement and providing a platform to address governance challenges at both national and local levels. We believe that coordination is the key to a more inclusive and representative democracy.
              </p>
              <p>
                Our work is rooted in the belief that meaningful participation of youth, women, and children is not just an aspiration but a necessity for a vibrant political ecosystem. By developing critical coordination skills, we prepare today's youth for tomorrow's leadership roles.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-cream rounded-xl text-accent-green"><Users size={24}/></div>
                    <div>
                      <h4 className="font-serif text-xl text-primary-green mb-1">Democratic Synergy</h4>
                      <p className="text-sm">Fostering collaboration between citizens and governance structures.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-cream rounded-xl text-accent-green"><Target size={24}/></div>
                    <div>
                      <h4 className="font-serif text-xl text-primary-green mb-1">Political Coordination</h4>
                      <p className="text-sm">Bridging the gap between diverse political stakeholders for collective progress.</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pillars Section */}
        <section id="pillars" className="py-32 bg-cream">
            <div className="container mx-auto px-6 text-center max-w-4xl mb-20">
                <SectionHeading subtitle="Our Core Work" title="The Pillars of Empowerment" />
                <p className="text-lg text-text-main/70">We drive change by focusing on three critical demographics, ensuring their voices resonate in the halls of power.</p>
            </div>
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <GovernancePillar 
                      title="Youth Leadership" 
                      description="Nurturing civic changemakers by providing tools for political coordination and leadership development."
                      icon={<Rocket size={24} />}
                      delay="0s"
                    />
                    <GovernancePillar 
                      title="Women in Governance" 
                      description="Advocating for meaningful representation and equal participation in every level of decision-making."
                      icon={<Users size={24} />}
                      delay="0.1s"
                    />
                    <GovernancePillar 
                      title="Child Representation" 
                      description="Ensuring the safety, rights, and inclusion of children's perspectives in community governance."
                      icon={<Globe size={24} />}
                      delay="0.2s"
                    />
                </div>
            </div>
        </section>

        {/* Impact/Visual Section */}
        <section id="representation" className="py-32 bg-primary-green text-cream overflow-hidden relative">
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(circle_at_20%_30%,#40916C_0%,transparent_50%)]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                     <div className="order-2 lg:order-1">
                        <RepresentationChart />
                     </div>
                     <div className="order-1 lg:order-2">
                        <SectionHeading light subtitle="Governance Advocacy" title="Coordinating Progress" />
                        <p className="text-xl text-cream/70 mb-8 leading-relaxed">
                            Our research and field work highlight the massive potential for improved democratic outcomes when youth are at the center of political coordination.
                        </p>
                        <ul className="space-y-6">
                          <li className="flex items-center gap-4 text-cream/80">
                            <div className="w-2 h-2 rounded-full bg-accent-green"></div>
                            <span>National & Local Level Policy Advocacy</span>
                          </li>
                          <li className="flex items-center gap-4 text-cream/80">
                            <div className="w-2 h-2 rounded-full bg-accent-green"></div>
                            <span>Meaningful Representation Strategies</span>
                          </li>
                          <li className="flex items-center gap-4 text-cream/80">
                            <div className="w-2 h-2 rounded-full bg-accent-green"></div>
                            <span>Capacity Building for Civic Changemakers</span>
                          </li>
                        </ul>
                     </div>
                </div>
            </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-32 bg-white">
             <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <SectionHeading subtitle="Leadership" title="Youth-Led Excellence" />
                        <p className="text-lg text-text-main/70 mb-12 leading-relaxed">
                            Samanwaya is run by young professionals who understand the challenges of the modern political landscape. We don't just talk about change; we coordinate it.
                        </p>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="p-8 bg-cream rounded-2xl">
                                <h4 className="font-serif text-4xl text-primary-green mb-2">100%</h4>
                                <p className="text-xs font-bold uppercase tracking-widest text-text-main/40">Youth Operated</p>
                            </div>
                            <div className="p-8 bg-cream rounded-2xl">
                                <h4 className="font-serif text-4xl text-primary-green mb-2">7+</h4>
                                <p className="text-xs font-bold uppercase tracking-widest text-text-main/40">Provinces Reached</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[600px] border border-stone-200">
                         <div className="absolute inset-0 z-0">
                            <CoordinationScene />
                         </div>
                         <div className="absolute inset-0 bg-gradient-to-t from-primary-green to-transparent opacity-60"></div>
                         <div className="absolute bottom-0 left-0 right-0 p-12 z-10 text-white">
                            <p className="font-serif text-2xl italic mb-4">" Democracy is not just a system of governance, but a culture of coordination."</p>
                            <span className="text-sm font-bold tracking-[0.3em] uppercase opacity-60">— Samanwaya Philosophy</span>
                         </div>
                    </div>
                </div>

                <div className="mt-32 flex flex-wrap justify-center gap-8">
                    <AuthorCard name="Youth Leaders" role="Civic Changemakers" delay="0s" />
                    <AuthorCard name="Women Advocates" role="Policy Strategists" delay="0.1s" />
                    <AuthorCard name="Team Nepal" role="Coordination Experts" delay="0.2s" />
                </div>
             </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 bg-cream relative">
           <ContactSection />
        </section>
      </main>

      <footer className="bg-primary-green text-cream/40 py-24">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-b border-white/5 pb-20 mb-12">
                <div className="lg:col-span-5">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-accent-green font-serif font-bold text-3xl shadow-sm transform rotate-6">S</div>
                        <div className="flex flex-col">
                          <span className="font-serif font-bold text-2xl tracking-wide text-white uppercase">Samanwaya Nepal</span>
                          <span className="text-[10px] font-bold text-accent-green uppercase tracking-[0.4em]">समन्वय नेपाल</span>
                        </div>
                    </div>
                    <p className="text-cream/60 text-lg leading-relaxed mb-8 max-w-sm">
                        Strengthening democratic processes and political coordination for a more inclusive Nepal.
                    </p>
                    <div className="flex items-center gap-5">
                        <a href="https://www.linkedin.com/company/samanwaya" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-accent-green hover:text-white transition-all">
                            <Linkedin size={20} />
                        </a>
                        <a href="https://x.com/samanwaya_np" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-accent-green hover:text-white transition-all">
                            <Twitter size={20} />
                        </a>
                        <a href="https://www.instagram.com/samanwaya.np/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-accent-green hover:text-white transition-all">
                            <Instagram size={20} />
                        </a>
                        <a href="https://www.tiktok.com/@samanwaya.np?lang=en" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-accent-green hover:text-white transition-all">
                            <TikTokIcon size={20} />
                        </a>
                        <a href="https://www.youtube.com/@samanwaya_np" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-accent-green hover:text-white transition-all">
                            <Youtube size={20} />
                        </a>
                    </div>
                </div>
                
                <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
                    <div>
                        <h5 className="font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-accent-green">Organization</h5>
                        <ul className="space-y-4 text-sm font-medium text-cream/70">
                            <li><a href="#about" onClick={scrollToSection('about')} className="hover:text-accent-green transition-colors">Our Mission</a></li>
                            <li><a href="#team" onClick={scrollToSection('team')} className="hover:text-accent-green transition-colors">Team Members</a></li>
                            <li><a href="#impact" onClick={scrollToSection('representation')} className="hover:text-accent-green transition-colors">Annual Reports</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-accent-green">Programs</h5>
                        <ul className="space-y-4 text-sm font-medium text-cream/70">
                            <li><a href="#" className="hover:text-accent-green transition-colors">Youth Dialogue</a></li>
                            <li><a href="#" className="hover:text-accent-green transition-colors">Women in Law</a></li>
                            <li><a href="#" className="hover:text-accent-green transition-colors">Child Rights</a></li>
                        </ul>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <h5 className="font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-accent-green">Legal</h5>
                        <ul className="space-y-4 text-sm font-medium text-cream/70">
                            <li><a href="#" className="hover:text-accent-green transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-accent-green transition-colors">Terms of Use</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em]">
                <p>© 2024 Samanwaya Nepal. All Rights Reserved.</p>
                <p className="flex items-center gap-2">
                   Coordinating for a <span className="text-accent-green">Stronger Democracy</span>
                </p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
