import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ARTEMIS_II_LAUNCH_DATE, ARTEMIS_II_SPLASHDOWN_DATE } from './constants';

const comparisonData = [
  {
    metric: 'Thrust (M kg)',
    Apollo: 3.4,
    Artemis: 3.99,
  },
  {
    metric: 'Volume (cu m)',
    Apollo: 5.9,
    Artemis: 9.3,
  },
  {
    metric: 'Mission Days',
    Apollo: 12,
    Artemis: 30,
  }
];

export default function App() {
  const [velocity, setVelocity] = useState(39400);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeBlueprint, setActiveBlueprint] = useState<'orion' | 'sls'>('orion');
  const [activeSection, setActiveSection] = useState('');

  // Dynamic Mission Status Logic
  const currentDate = new Date();
  const launchDate = new Date(ARTEMIS_II_LAUNCH_DATE);
  const splashdownDate = new Date(ARTEMIS_II_SPLASHDOWN_DATE); // 10 days later

  let missionStatus: 'upcoming' | 'active' | 'completed' = 'upcoming';
  if (currentDate > splashdownDate) {
    missionStatus = 'completed';
  } else if (currentDate >= launchDate) {
    missionStatus = 'active';
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id') || '';
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (missionStatus !== 'active') return;
    const interval = setInterval(() => {
      const baseVel = 39400;
      const fluctuation = Math.floor(Math.random() * 25) - 12;
      setVelocity(baseVel + fluctuation);
    }, 800);
    return () => clearInterval(interval);
  }, [missionStatus]);

  const navLinks = [
    { href: '#about', label: 'The Program' },
    { href: '#trajectory', label: 'Trajectory' },
    { href: '#timeline', label: 'Flight Path' },
    { href: '#crew', label: 'The Crew' },
    { href: '#hardware', label: 'Fleet' },
    { href: '#blueprint', label: 'Blueprint' },
    { href: '#history', label: 'Legacy' },
    { href: '#future', label: 'Ignition' },
  ];

  return (
    <>
      {/* Sticky Nav */}
      <nav className="sticky top-0 w-full bg-[#050508]/85 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 py-4 flex justify-between items-center">
          <a href="#" className="font-display font-extrabold text-2xl text-text-primary no-underline tracking-[0.04em] uppercase">
            ARTEMIS<span className="text-flare">II</span>
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a 
                  key={link.href} 
                  href={link.href} 
                  className={`font-mono text-xs no-underline uppercase tracking-[0.05em] transition-colors ${isActive ? 'text-atmosphere font-bold drop-shadow-[0_0_8px_rgba(26,138,255,0.5)]' : 'text-text-secondary hover:text-atmosphere'}`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-text-primary p-2 -mr-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Simple Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="lg:hidden absolute top-full left-0 w-full bg-[#050508] border-b border-border shadow-2xl flex flex-col"
            >
              {navLinks.map((link) => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-mono text-sm text-text-primary uppercase tracking-[0.05em] py-4 px-6 border-b border-border/50 last:border-0 hover:bg-surface hover:text-atmosphere transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header className="min-h-[90vh] flex flex-col justify-center py-32 lg:py-0 relative overflow-hidden bg-[radial-gradient(ellipse_300px_200px_at_50%_-5%,rgba(200,205,214,0.15)_0%,transparent_70%),radial-gradient(ellipse_100%_40%_at_50%_110%,rgba(26,138,255,0.15)_0%,transparent_60%),radial-gradient(ellipse_200px_100px_at_52%_72%,rgba(255,179,71,0.1)_0%,transparent_60%),var(--color-space)]">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] rounded-full border border-atmosphere opacity-10 pointer-events-none"></div>
        <div className="crosshair top-10 left-10"></div>
        <div className="crosshair top-10 right-10"></div>
        <div className="crosshair bottom-10 left-10"></div>
        <div className="crosshair bottom-10 right-10"></div>

        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 relative z-10 text-center flex flex-col items-center">
          <motion.p 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono font-medium text-[11px] leading-none text-flare tracking-[0.25em] uppercase mb-6"
          >
            // MISSION INITIATION
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display font-black text-[clamp(64px,12vw,160px)] leading-[0.9] text-text-primary uppercase tracking-[0.04em] my-4 drop-shadow-[0_0_40px_rgba(26,138,255,0.2)]"
          >
            ARTEMIS <span>II</span>
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-display font-bold text-[clamp(16px,3vw,24px)] leading-none text-flare tracking-[0.4em] uppercase mb-8"
          >
            MISSION TO THE MOON
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-[clamp(18px,2vw,22px)] text-text-primary max-w-[680px] mb-6"
          >
            Fifty years later, we are going back—not just to visit, but to stay. The dawn of the Artemis Generation begins now.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="relative flex flex-col md:flex-row gap-6 md:gap-10 mt-16 p-6 md:px-10 bg-surface/60 border border-border backdrop-blur-md rounded-sm w-full md:w-auto text-center md:text-left"
          >
            <div className="absolute top-0 left-0 w-full flex justify-center md:justify-start md:pl-6 -translate-y-1/2">
              <div className={`bg-[#050508] border ${missionStatus === 'active' ? 'border-flare/50 text-flare shadow-[0_0_8px_rgba(255,179,71,0.15)]' : 'border-atmosphere/50 text-atmosphere shadow-[0_0_8px_rgba(26,138,255,0.15)]'} font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-1 flex items-center gap-2`}>
                {missionStatus === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-flare animate-pulse"></span>}
                {missionStatus === 'active' ? 'Simulated Telemetry' : missionStatus === 'completed' ? 'Mission Archive Data' : 'Pre-flight Estimates'}
              </div>
            </div>
            <div className="flex flex-col mt-2 md:mt-0">
              <span className="font-mono font-medium text-[32px] leading-none text-text-primary mb-1">406,773</span>
              <span className="font-mono font-medium text-[11px] leading-none text-flare tracking-[0.25em]">KM</span>
              <span className="font-mono font-normal text-[11px] leading-none text-text-muted tracking-[0.25em] mt-1 uppercase">
                {missionStatus === 'completed' ? 'Max Earth Distance' : 'Target Max Distance'}
              </span>
            </div>
            <div className="flex flex-col mt-2 md:mt-0">
              <span className="font-mono font-medium text-[32px] leading-none text-text-primary mb-1">{velocity.toLocaleString()}</span>
              <span className="font-mono font-medium text-[11px] leading-none text-flare tracking-[0.25em]">KM/H</span>
              <span className="font-mono font-normal text-[11px] leading-none text-text-muted tracking-[0.25em] mt-1 uppercase">
                {missionStatus === 'completed' ? 'Max Re-entry Velocity' : 'Re-entry Velocity'}
              </span>
            </div>
            <div className="flex flex-col mt-2 md:mt-0">
              <span className="font-mono font-medium text-[32px] leading-none text-text-primary mb-1">10</span>
              <span className="font-mono font-medium text-[11px] leading-none text-flare tracking-[0.25em]">DAYS</span>
              <span className="font-mono font-normal text-[11px] leading-none text-text-muted tracking-[0.25em] mt-1 uppercase">
                {missionStatus === 'completed' ? 'Total Mission Duration' : 'Mission Duration'}
              </span>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="section-horizon"></div>

      {/* About Section */}
      <section id="about" className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 py-[clamp(80px,12vw,160px)] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <div>
            <p className="font-mono font-medium text-[11px] leading-none text-flare tracking-[0.25em] uppercase mb-6">// THE PROGRAM</p>
            <h2 className="font-display font-black text-[clamp(40px,6vw,88px)] leading-[1.1] text-text-primary uppercase tracking-[0.04em] mb-8">A New Era of<br/>Cooperation</h2>
            <p className="text-[clamp(18px,2vw,22px)] text-text-primary max-w-[680px] mb-6">Establishing American leadership in space and developing a framework for international governance in the lunar environment.</p>
            <p className="max-w-[680px] mb-4">The Artemis program represents a paradigm shift in human spaceflight. Transitioning from the transient exploration models of the twentieth century, Artemis focuses on a permanent, sustainable presence in cislunar space.</p>
            <p className="max-w-[680px] mb-4">Through the <strong>Artemis Accords</strong>, a global alliance is forging the infrastructure necessary for deep space exploration, utilizing commercial partnerships and international expertise.</p>
            <br/>
            <a href="#hardware" className="font-mono font-bold text-[12px] leading-none tracking-[0.25em] uppercase py-4 px-8 cursor-pointer inline-block no-underline rounded-sm transition-all duration-200 text-space bg-atmosphere border border-atmosphere hover:bg-corona hover:border-corona hover:shadow-[0_0_20px_rgba(77,195,255,0.3)]">View the Fleet</a>
          </div>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-surface border border-border p-8 rounded-sm transition-all duration-200 hover:border-atmosphere hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(26,138,255,0.08)] relative overflow-hidden group">
                <h3 className="font-display font-extrabold text-2xl leading-[1.2] text-text-primary uppercase tracking-[0.05em] mb-3">ESA</h3>
                <p className="mb-4">European Space Agency</p>
                <div className="flex flex-col mt-6">
                  <span className="font-mono font-medium text-2xl leading-none text-atmosphere mb-1">ESM</span>
                  <span className="font-mono font-normal text-[11px] leading-none text-text-muted tracking-[0.25em] mt-1 uppercase">European Service Module</span>
                </div>
              </div>
              <div className="bg-surface border border-border p-8 rounded-sm transition-all duration-200 hover:border-atmosphere hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(26,138,255,0.08)] relative overflow-hidden group">
                <h3 className="font-display font-extrabold text-2xl leading-[1.2] text-text-primary uppercase tracking-[0.05em] mb-3">CSA</h3>
                <p className="mb-4">Canadian Space Agency</p>
                <div className="flex flex-col mt-6">
                  <span className="font-mono font-medium text-2xl leading-none text-atmosphere mb-1">Arm3</span>
                  <span className="font-mono font-normal text-[11px] leading-none text-text-muted tracking-[0.25em] mt-1 uppercase">Canadarm3 Robotics</span>
                </div>
              </div>
              <div className="bg-surface border border-border p-8 rounded-sm transition-all duration-200 hover:border-atmosphere hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(26,138,255,0.08)] relative overflow-hidden group sm:col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-1">
                <h3 className="font-display font-extrabold text-2xl leading-[1.2] text-text-primary uppercase tracking-[0.05em] mb-3">JAXA</h3>
                <p className="mb-4">Japan Aerospace Exploration</p>
                <div className="flex flex-col mt-6">
                  <span className="font-mono font-medium text-2xl leading-none text-atmosphere mb-1">Rover</span>
                  <span className="font-mono font-normal text-[11px] leading-none text-text-muted tracking-[0.25em] mt-1 uppercase">Pressurized Mobility</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-horizon"></div>

      {/* Trajectory Section */}
      <section id="trajectory" className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 py-[clamp(80px,12vw,160px)] relative z-10">
        <div className="text-center mb-16">
          <p className="font-mono font-medium text-[11px] leading-none text-flare tracking-[0.25em] uppercase mb-6">// ORBITAL MECHANICS</p>
          <h2 className="font-display font-black text-[clamp(40px,6vw,88px)] leading-[1.1] text-text-primary uppercase tracking-[0.04em] mb-6">Hybrid Free-Return<br/>Trajectory</h2>
          <p className="text-[clamp(18px,2vw,22px)] text-text-primary max-w-[680px] mx-auto">Before heading to the Moon, Artemis II orbits Earth twice. It enters Low Earth Orbit (LEO), raises to a High Earth Orbit (HEO) for a 24-hour systems check, and finally executes the Trans-Lunar Injection (TLI) burn.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[1280px] mx-auto">
          <div className="lg:col-span-2 relative w-full h-[300px] sm:h-[400px] md:h-[500px] bg-surface/30 border border-border rounded-sm overflow-hidden flex items-center justify-center">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-atmosphere) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            
            <svg viewBox="0 0 800 400" className="w-full h-full relative z-10 drop-shadow-[0_0_15px_rgba(26,138,255,0.2)]">
              {/* Earth */}
              <circle cx="150" cy="200" r="40" fill="rgba(26,138,255,0.1)" stroke="var(--color-atmosphere)" strokeWidth="2" />
              <circle cx="150" cy="200" r="48" fill="none" stroke="var(--color-atmosphere)" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.5" />
              <text x="150" y="270" textAnchor="middle" className="font-mono text-[10px] fill-text-primary tracking-widest uppercase">Earth</text>

              {/* Moon */}
              <circle cx="650" cy="200" r="15" fill="rgba(200,205,214,0.1)" stroke="var(--color-text-muted)" strokeWidth="2" />
              <circle cx="650" cy="200" r="25" fill="none" stroke="var(--color-text-muted)" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.5" />
              <text x="650" y="245" textAnchor="middle" className="font-mono text-[10px] fill-text-primary tracking-widest uppercase">Moon</text>

              {/* Faint Trajectory Path */}
              <path 
                d="M 100 200 A 50 50 0 0 0 200 200 A 50 50 0 0 0 100 200 A 125 70 0 0 0 350 200 A 125 70 0 0 0 100 200 C 100 350, 450 300, 635 220 A 25 25 0 1 0 635 180 C 450 100, 100 50, 100 200" 
                fill="none" 
                stroke="var(--color-border)" 
                strokeWidth="2" 
                strokeDasharray="6 6"
              />

              {/* Animated Spacecraft (Comet effect) */}
              <motion.path 
                d="M 100 200 A 50 50 0 0 0 200 200 A 50 50 0 0 0 100 200 A 125 70 0 0 0 350 200 A 125 70 0 0 0 100 200 C 100 350, 450 300, 635 220 A 25 25 0 1 0 635 180 C 450 100, 100 50, 100 200" 
                fill="none" 
                stroke="var(--color-flare)" 
                strokeWidth="4" 
                strokeLinecap="round"
                initial={{ pathLength: 0.05, pathOffset: 0 }}
                animate={{ pathOffset: 1 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                style={{ filter: 'drop-shadow(0 0 8px var(--color-flare))' }}
              />

              {/* Waypoints */}
              <g className="font-mono text-[9px] fill-text-secondary tracking-widest uppercase">
                <circle cx="150" cy="250" r="3" fill="var(--color-atmosphere)" />
                <text x="150" y="265" textAnchor="middle">LEO</text>

                <circle cx="350" cy="200" r="3" fill="var(--color-atmosphere)" />
                <text x="350" y="185" textAnchor="middle">HEO Apogee</text>

                <circle cx="100" cy="200" r="3" fill="var(--color-flare)" />
                <text x="90" y="195" textAnchor="end">TLI Burn</text>

                <circle cx="660" cy="200" r="3" fill="var(--color-flare)" />
                <text x="715" y="203" textAnchor="middle">Lunar Flyby</text>
              </g>
            </svg>
          </div>

          <div className="lg:col-span-1 flex flex-col justify-center gap-5">
            <h3 className="font-display font-extrabold text-xl text-text-primary uppercase tracking-[0.05em] mb-2 border-b border-border pb-4">Mission Telemetry</h3>
            
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-end">
                <span className="font-mono text-xs text-flare tracking-widest uppercase">T+00:00:00</span>
                <span className="font-mono text-[10px] text-text-muted uppercase">Launch & LEO</span>
              </div>
              <div className="bg-surface border border-border p-3 rounded-sm">
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span className="text-text-secondary">Altitude</span>
                  <span className="text-text-primary">185 x 1,930 km</span>
                </div>
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-text-secondary">Velocity</span>
                  <span className="text-text-primary">28,160 km/h</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-end">
                <span className="font-mono text-xs text-flare tracking-widest uppercase">T+01:30:00</span>
                <span className="font-mono text-[10px] text-text-muted uppercase">HEO Apogee</span>
              </div>
              <div className="bg-surface border border-border p-3 rounded-sm">
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span className="text-text-secondary">Max Altitude</span>
                  <span className="text-text-primary">74,000 km</span>
                </div>
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-text-secondary">Orbit Period</span>
                  <span className="text-text-primary">23.5 hours</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-end">
                <span className="font-mono text-xs text-flare tracking-widest uppercase">Day 2</span>
                <span className="font-mono text-[10px] text-text-muted uppercase">TLI Burn</span>
              </div>
              <div className="bg-surface border border-border p-3 rounded-sm">
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span className="text-text-secondary">Escape Velocity</span>
                  <span className="text-text-primary">39,400 km/h</span>
                </div>
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-text-secondary">Target</span>
                  <span className="text-text-primary">The Moon</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-end">
                <span className="font-mono text-xs text-flare tracking-widest uppercase">Day 5</span>
                <span className="font-mono text-[10px] text-text-muted uppercase">Lunar Flyby</span>
              </div>
              <div className="bg-surface border border-border p-3 rounded-sm">
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span className="text-text-secondary">Lunar Distance</span>
                  <span className="text-text-primary">7,400 km</span>
                </div>
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-text-secondary">Max Earth Distance</span>
                  <span className="text-text-primary">406,773 km</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-end">
                <span className="font-mono text-xs text-flare tracking-widest uppercase">Day 10</span>
                <span className="font-mono text-[10px] text-text-muted uppercase">Re-entry</span>
              </div>
              <div className="bg-surface border border-border p-3 rounded-sm">
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span className="text-text-secondary">Velocity</span>
                  <span className="text-text-primary">Mach 32</span>
                </div>
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-text-secondary">Heat Shield</span>
                  <span className="text-text-primary">2,760°C</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-horizon"></div>

      {/* Mission Captures Section */}
      <section id="captures" className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 py-[clamp(80px,12vw,160px)] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <p className="font-mono font-medium text-[11px] leading-none text-flare tracking-[0.25em] uppercase mb-6">// MISSION CAPTURES</p>
            <h2 className="font-display font-black text-[clamp(40px,5vw,72px)] leading-[1.1] text-text-primary uppercase tracking-[0.04em] mb-6">Earth in the<br/>Rear-View</h2>
            <p className="text-lg text-text-secondary mb-8">
              A view of Earth taken by NASA astronaut and Artemis II Commander Reid Wiseman from one of the Orion spacecraft's windows after completing the translunar injection burn on April 2, 2026. The image features two auroras and zodiacal light as the Earth eclipses the Sun.
            </p>
            <div className="flex flex-col gap-4 font-mono text-xs text-text-muted uppercase tracking-wider border-l border-flare/30 pl-4">
              <div><span className="text-text-primary">Date:</span> April 2, 2026</div>
              <div><span className="text-text-primary">Photographer:</span> Reid Wiseman</div>
              <div><span className="text-text-primary">NASA ID:</span> art002e000192</div>
            </div>
          </div>
          <div className="lg:col-span-7 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-atmosphere to-flare opacity-20 blur-xl group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative border border-border bg-surface p-2 rounded-sm">
              <img 
                src="https://images-assets.nasa.gov/image/art002e000192/art002e000192~large.jpg" 
                alt="Earth From the Perspective of Artemis II" 
                className="w-full h-auto object-cover rounded-sm"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 font-mono text-[10px] text-white tracking-widest uppercase">
                Orion Cabin Window
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-horizon"></div>

      {/* Timeline Section */}
      <section id="timeline" className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 py-[clamp(80px,12vw,160px)] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <div>
            <p className="font-mono font-medium text-[11px] leading-none text-flare tracking-[0.25em] uppercase mb-6">// FLIGHT PATH</p>
            <h2 className="font-display font-black text-[clamp(40px,6vw,88px)] leading-[1.1] text-text-primary uppercase tracking-[0.04em] mb-8">The Return to<br/>Deep Space</h2>
            <p className="max-w-[680px] mb-4">A series of increasingly complex missions aimed at establishing the first long-term human presence on the lunar surface, validating the life support and transit tech required for Mars.</p>
          </div>
          
          <div className="relative pl-8 mt-10 lg:mt-0 before:content-[''] before:absolute before:top-0 before:left-0 before:w-px before:h-full before:bg-border">
            <div className="relative mb-12 before:content-[''] before:absolute before:top-2 before:-left-[35px] before:w-[7px] before:h-[7px] before:bg-space before:border before:border-atmosphere before:rounded-full before:transition-all hover:before:bg-atmosphere hover:before:shadow-[0_0_10px_var(--color-atmosphere)] group">
              <div className="font-mono font-medium text-[12px] leading-none text-flare tracking-[0.25em] mb-2">COMPLETED // NOV 2022</div>
              <h3 className="font-display font-extrabold text-2xl leading-[1.2] text-text-primary uppercase mb-2">Artemis I</h3>
              <p className="max-w-[680px] mb-4">The first uncrewed integrated flight test of NASA's Orion spacecraft and Space Launch System. A 25-day mission validating the heat shield at lunar re-entry conditions.</p>
            </div>
            
            <div className={`relative mb-12 before:content-[''] before:absolute before:top-2 before:-left-[35px] before:w-[7px] before:h-[7px] before:rounded-full group ${
              missionStatus === 'active' 
                ? 'before:bg-flare before:border before:border-flare before:shadow-[0_0_10px_var(--color-flare)]' 
                : 'before:bg-space before:border before:border-atmosphere before:transition-all hover:before:bg-atmosphere hover:before:shadow-[0_0_10px_var(--color-atmosphere)]'
            }`}>
              <div className={`font-mono font-medium text-[12px] leading-none ${missionStatus === 'active' ? 'text-flare' : 'text-atmosphere'} tracking-[0.25em] mb-2 flex items-center gap-2`}>
                {missionStatus === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-flare animate-pulse"></span>}
                {missionStatus === 'active' ? 'IN PROGRESS // LAUNCHED APR 1, 2026' : 
                 missionStatus === 'completed' ? 'COMPLETED // APR 2026' : 
                 'UPCOMING // APR 1, 2026'}
              </div>
              <h3 className={`font-display font-extrabold text-2xl leading-[1.2] ${missionStatus === 'active' ? 'text-atmosphere' : 'text-text-primary'} uppercase mb-2`}>Artemis II</h3>
              <p className="max-w-[680px] mb-4">
                {missionStatus === 'active' ? 'Four astronauts are currently venturing around the Moon in a hybrid free-return trajectory. The first crewed mission beyond low-Earth orbit in over 50 years, actively testing vital life support systems and setting a new human distance record of 406,773 km from Earth.' :
                 missionStatus === 'completed' ? 'Four astronauts successfully ventured around the Moon in a hybrid free-return trajectory. The first crewed mission beyond low-Earth orbit in over 50 years, completely validating vital life support systems and setting a new human distance record of 406,773 km from Earth.' :
                 'Four astronauts will venture around the Moon in a hybrid free-return trajectory. The first crewed mission beyond low-Earth orbit in over 50 years, testing vital life support systems and aiming to set a new human distance record of 406,773 km from Earth.'}
              </p>
            </div>
            
            <div className="relative mb-12 before:content-[''] before:absolute before:top-2 before:-left-[35px] before:w-[7px] before:h-[7px] before:bg-space before:border before:border-atmosphere before:rounded-full before:transition-all hover:before:bg-atmosphere hover:before:shadow-[0_0_10px_var(--color-atmosphere)] group">
              <div className="font-mono font-medium text-[12px] leading-none text-flare tracking-[0.25em] mb-2">TARGET // 2027</div>
              <h3 className="font-display font-extrabold text-2xl leading-[1.2] text-text-primary uppercase mb-2">Artemis III</h3>
              <p className="max-w-[680px] mb-4">Humanity's return to the lunar surface. Two astronauts will descend in the SpaceX Starship HLS to the lunar South Pole to collect samples and probe the polar region.</p>
            </div>
            
            <div className="relative mb-12 before:content-[''] before:absolute before:top-2 before:-left-[35px] before:w-[7px] before:h-[7px] before:bg-space before:border before:border-atmosphere before:rounded-full before:transition-all hover:before:bg-atmosphere hover:before:shadow-[0_0_10px_var(--color-atmosphere)] group">
              <div className="font-mono font-medium text-[12px] leading-none text-flare tracking-[0.25em] mb-2">TARGET // 2028</div>
              <h3 className="font-display font-extrabold text-2xl leading-[1.2] text-text-primary uppercase mb-2">Artemis IV</h3>
              <p className="max-w-[680px] mb-4">Launch and integration of the International Habitat module. Crew transfer from Orion to HLS via the Lunar Gateway space station.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-horizon"></div>

      {/* Crew Section */}
      <section id="crew" className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 py-[clamp(80px,12vw,160px)] relative z-10">
        <div className="text-center mb-16">
          <p className="font-mono font-medium text-[11px] leading-none text-flare tracking-[0.25em] uppercase mb-6">// THE VANGUARD</p>
          <h2 className="font-display font-black text-[clamp(40px,6vw,88px)] leading-[1.1] text-text-primary uppercase tracking-[0.04em] mb-6">The Artemis II Crew</h2>
          <p className="text-[clamp(18px,2vw,22px)] text-text-primary max-w-[680px] mx-auto">Four exceptional individuals representing humanity's return to deep space. The first crew to travel beyond low-Earth orbit in over half a century.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Commander */}
          <div className="group relative overflow-hidden border border-border bg-surface/30 rounded-sm transition-all duration-300 hover:border-atmosphere hover:shadow-[0_0_30px_rgba(26,138,255,0.15)]">
            <div className="aspect-[3/4] overflow-hidden relative">
              <div className="absolute inset-0 bg-space/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay"></div>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Jsc2023e0016434_alt.jpg/500px-Jsc2023e0016434_alt.jpg" 
                alt="Reid Wiseman" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
              />
            </div>
            <div className="p-6 border-t border-border bg-surface/80 backdrop-blur-sm relative z-20">
              <div className="font-mono text-[10px] text-flare tracking-[0.2em] mb-2 uppercase">Commander</div>
              <h3 className="font-display font-bold text-xl text-text-primary uppercase tracking-wide mb-1">Reid Wiseman</h3>
              <p className="font-mono text-xs text-text-muted uppercase tracking-wider">NASA</p>
            </div>
          </div>

          {/* Pilot */}
          <div className="group relative overflow-hidden border border-border bg-surface/30 rounded-sm transition-all duration-300 hover:border-atmosphere hover:shadow-[0_0_30px_rgba(26,138,255,0.15)]">
            <div className="aspect-[3/4] overflow-hidden relative">
              <div className="absolute inset-0 bg-space/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay"></div>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Jsc2023e0016433_alt.jpg/500px-Jsc2023e0016433_alt.jpg" 
                alt="Victor Glover" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
              />
            </div>
            <div className="p-6 border-t border-border bg-surface/80 backdrop-blur-sm relative z-20">
              <div className="font-mono text-[10px] text-flare tracking-[0.2em] mb-2 uppercase">Pilot</div>
              <h3 className="font-display font-bold text-xl text-text-primary uppercase tracking-wide mb-1">Victor Glover</h3>
              <p className="font-mono text-xs text-text-muted uppercase tracking-wider">NASA</p>
            </div>
          </div>

          {/* Mission Specialist 1 */}
          <div className="group relative overflow-hidden border border-border bg-surface/30 rounded-sm transition-all duration-300 hover:border-atmosphere hover:shadow-[0_0_30px_rgba(26,138,255,0.15)]">
            <div className="aspect-[3/4] overflow-hidden relative">
              <div className="absolute inset-0 bg-space/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay"></div>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Jsc2023e0016435_alt.jpg/500px-Jsc2023e0016435_alt.jpg" 
                alt="Christina Koch" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
              />
            </div>
            <div className="p-6 border-t border-border bg-surface/80 backdrop-blur-sm relative z-20">
              <div className="font-mono text-[10px] text-flare tracking-[0.2em] mb-2 uppercase">Mission Specialist</div>
              <h3 className="font-display font-bold text-xl text-text-primary uppercase tracking-wide mb-1">Christina Koch</h3>
              <p className="font-mono text-xs text-text-muted uppercase tracking-wider">NASA</p>
            </div>
          </div>

          {/* Mission Specialist 2 */}
          <div className="group relative overflow-hidden border border-border bg-surface/30 rounded-sm transition-all duration-300 hover:border-atmosphere hover:shadow-[0_0_30px_rgba(26,138,255,0.15)]">
            <div className="aspect-[3/4] overflow-hidden relative">
              <div className="absolute inset-0 bg-space/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay"></div>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Jsc2023e0016436_alt2.jpg/500px-Jsc2023e0016436_alt2.jpg" 
                alt="Jeremy Hansen" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
              />
            </div>
            <div className="p-6 border-t border-border bg-surface/80 backdrop-blur-sm relative z-20">
              <div className="font-mono text-[10px] text-flare tracking-[0.2em] mb-2 uppercase">Mission Specialist</div>
              <h3 className="font-display font-bold text-xl text-text-primary uppercase tracking-wide mb-1">Jeremy Hansen</h3>
              <p className="font-mono text-xs text-text-muted uppercase tracking-wider">CSA</p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-horizon"></div>

      {/* Hardware Section */}
      <section id="hardware" className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 py-[clamp(80px,12vw,160px)] relative z-10">
        <p className="font-mono font-medium text-[11px] leading-none text-flare tracking-[0.25em] uppercase mb-6">// THE FLEET OF DISCOVERY</p>
        <h2 className="font-display font-black text-[clamp(40px,6vw,88px)] leading-[1.1] text-text-primary uppercase tracking-[0.04em] mb-8">Engineered for<br/>The Void</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <div className="bg-surface border border-border p-8 rounded-sm transition-all duration-200 hover:border-atmosphere hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(26,138,255,0.08)] relative overflow-hidden group">
            <h3 className="font-display font-extrabold text-2xl leading-[1.2] text-text-primary uppercase tracking-[0.05em] mb-3">SLS Block 1B</h3>
            <p className="mb-4">The Space Launch System. The only rocket capable of sending Orion, astronauts, and cargo directly to the Moon in a single launch.</p>
            <div className="flex flex-col mt-6">
              <span className="font-mono font-medium text-2xl leading-none text-atmosphere mb-1">3.99M</span>
              <span className="font-mono font-medium text-[11px] leading-none text-flare tracking-[0.25em]">KG</span>
              <span className="font-mono font-normal text-[11px] leading-none text-text-muted tracking-[0.25em] mt-1 uppercase">Maximum Thrust</span>
            </div>
            <div className="flex flex-col mt-6">
              <span className="font-mono font-medium text-2xl leading-none text-atmosphere mb-1">111</span>
              <span className="font-mono font-medium text-[11px] leading-none text-flare tracking-[0.25em]">METERS</span>
              <span className="font-mono font-normal text-[11px] leading-none text-text-muted tracking-[0.25em] mt-1 uppercase">Total Height</span>
            </div>
          </div>

          <div className="bg-surface border border-atmosphere p-8 rounded-sm transition-all duration-200 hover:border-atmosphere hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(26,138,255,0.08)] relative overflow-hidden group">
            <h3 className="font-display font-extrabold text-2xl leading-[1.2] text-text-primary uppercase tracking-[0.05em] mb-3">Orion Spacecraft</h3>
            <p className="mb-4">Command module built to sustain crew during deep space travel and provide safe re-entry at extreme velocities.</p>
            <div className="flex flex-col mt-6">
              <span className="font-mono font-medium text-2xl leading-none text-atmosphere mb-1">355k</span>
              <span className="font-mono font-medium text-[11px] leading-none text-flare tracking-[0.25em]">PARTS</span>
              <span className="font-mono font-normal text-[11px] leading-none text-text-muted tracking-[0.25em] mt-1 uppercase">Individual Components</span>
            </div>
            <div className="flex flex-col mt-6">
              <span className="font-mono font-medium text-2xl leading-none text-flare mb-1">2,760°</span>
              <span className="font-mono font-medium text-[11px] leading-none text-flare tracking-[0.25em]">CELSIUS</span>
              <span className="font-mono font-normal text-[11px] leading-none text-text-muted tracking-[0.25em] mt-1 uppercase">Re-entry Heat (640 Gigajoules)</span>
            </div>
          </div>

          <div className="bg-surface border border-border p-8 rounded-sm transition-all duration-200 hover:border-atmosphere hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(26,138,255,0.08)] relative overflow-hidden group">
            <h3 className="font-display font-extrabold text-2xl leading-[1.2] text-text-primary uppercase tracking-[0.05em] mb-3">Starship HLS</h3>
            <p className="mb-4">SpaceX's Human Landing System. An elevator-based, methane-fueled architecture for sustainable surface access.</p>
            <div className="flex flex-col mt-6">
              <span className="font-mono font-medium text-2xl leading-none text-atmosphere mb-1">50</span>
              <span className="font-mono font-medium text-[11px] leading-none text-flare tracking-[0.25em]">METERS</span>
              <span className="font-mono font-normal text-[11px] leading-none text-text-muted tracking-[0.25em] mt-1 uppercase">Lander Height</span>
            </div>
            <div className="flex flex-col mt-6">
              <span className="font-mono font-medium text-2xl leading-none text-atmosphere mb-1">100</span>
              <span className="font-mono font-medium text-[11px] leading-none text-flare tracking-[0.25em]">TONS</span>
              <span className="font-mono font-normal text-[11px] leading-none text-text-muted tracking-[0.25em] mt-1 uppercase">Surface Payload</span>
            </div>
          </div>
        </div>
      </section>

      <div className="section-horizon"></div>

      {/* Blueprint Section */}
      <section id="blueprint" className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 py-[clamp(80px,12vw,160px)] relative z-10">
        <div className="flex flex-wrap gap-4 mb-12">
          <button 
            onClick={() => setActiveBlueprint('orion')}
            className={`font-mono text-xs uppercase tracking-widest py-3 px-6 border transition-colors whitespace-nowrap flex-1 sm:flex-none ${activeBlueprint === 'orion' ? 'border-atmosphere text-atmosphere bg-atmosphere/10' : 'border-border text-text-muted hover:text-text-secondary hover:border-text-secondary'}`}
          >
            Orion Spacecraft
          </button>
          <button 
            onClick={() => setActiveBlueprint('sls')}
            className={`font-mono text-xs uppercase tracking-widest py-3 px-6 border transition-colors whitespace-nowrap flex-1 sm:flex-none ${activeBlueprint === 'sls' ? 'border-atmosphere text-atmosphere bg-atmosphere/10' : 'border-border text-text-muted hover:text-text-secondary hover:border-text-secondary'}`}
          >
            SLS Block 1B
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 relative h-[500px] w-full bg-surface/30 border border-border rounded-sm overflow-hidden flex items-center justify-center">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-atmosphere) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            
            {activeBlueprint === 'orion' ? (
              <svg viewBox="0 0 400 600" className="w-full h-full relative z-10 drop-shadow-[0_0_15px_rgba(26,138,255,0.2)]">
                {/* SVG Blueprint: Orion */}
                <g stroke="var(--color-atmosphere)" fill="none" strokeWidth="1.5">
                  {/* Center Line */}
                  <line x1="200" y1="20" x2="200" y2="580" strokeDasharray="4 4" strokeOpacity="0.3" />
                  
                  {/* Solar Arrays */}
                  <rect x="40" y="320" width="110" height="30" strokeDasharray="2 2" fill="rgba(26,138,255,0.05)" />
                  <rect x="250" y="320" width="110" height="30" strokeDasharray="2 2" fill="rgba(26,138,255,0.05)" />
                  
                  {/* Launch Abort System */}
                  <polygon points="200,60 192,140 208,140" fill="rgba(26,138,255,0.1)" />
                  <rect x="196" y="140" width="8" height="60" />

                  {/* Crew Module */}
                  <polygon points="175,260 225,260 245,310 155,310" fill="rgba(26,138,255,0.15)" strokeWidth="2" />
                  <line x1="155" y1="310" x2="245" y2="310" strokeWidth="3" stroke="var(--color-flare)" /> {/* Heat shield */}
                  
                  {/* Service Module */}
                  <rect x="155" y="315" width="90" height="110" fill="rgba(26,138,255,0.05)" />
                  <line x1="155" y1="340" x2="245" y2="340" strokeOpacity="0.5" />
                  <line x1="155" y1="390" x2="245" y2="390" strokeOpacity="0.5" />
                  
                  {/* Engine */}
                  <polygon points="185,425 215,425 225,465 175,465" fill="rgba(26,138,255,0.1)" />
                  <path d="M 180 465 Q 200 490 220 465" stroke="var(--color-flare)" strokeWidth="2" strokeDasharray="2 2" />
                </g>

                {/* Connection Lines & Labels */}
                <g className="font-mono text-[10px] fill-text-secondary tracking-widest uppercase">
                  <polyline points="204,100 280,80 300,80" stroke="var(--color-border)" fill="none" />
                  <circle cx="204" cy="100" r="2" fill="var(--color-atmosphere)" />
                  <text x="305" y="84" fill="var(--color-text-primary)">Launch Abort</text>

                  <polyline points="235,285 280,260 300,260" stroke="var(--color-border)" fill="none" />
                  <circle cx="235" cy="285" r="2" fill="var(--color-atmosphere)" />
                  <text x="305" y="264" fill="var(--color-text-primary)">Crew Module</text>

                  <polyline points="245,360 280,380 300,380" stroke="var(--color-border)" fill="none" />
                  <circle cx="245" cy="360" r="2" fill="var(--color-atmosphere)" />
                  <text x="305" y="384" fill="var(--color-text-primary)">Service Module</text>

                  <polyline points="95,320 95,240 110,240" stroke="var(--color-border)" fill="none" />
                  <circle cx="95" cy="320" r="2" fill="var(--color-atmosphere)" />
                  <text x="20" y="235" fill="var(--color-text-primary)">Solar Arrays</text>
                  
                  <polyline points="215,445 280,480 300,480" stroke="var(--color-border)" fill="none" />
                  <circle cx="215" cy="445" r="2" fill="var(--color-atmosphere)" />
                  <text x="305" y="484" fill="var(--color-text-primary)">Main Engine</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 400 600" className="w-full h-full relative z-10 drop-shadow-[0_0_15px_rgba(26,138,255,0.2)]">
                {/* SVG Blueprint: SLS */}
                <g stroke="var(--color-atmosphere)" fill="none" strokeWidth="1.5">
                  {/* Center Line */}
                  <line x1="200" y1="20" x2="200" y2="580" strokeDasharray="4 4" strokeOpacity="0.3" />
                  
                  {/* Orion / LAS */}
                  <polygon points="200,40 190,100 210,100" fill="rgba(26,138,255,0.15)" />
                  <line x1="200" y1="20" x2="200" y2="40" strokeWidth="2" />

                  {/* Exploration Upper Stage (EUS) */}
                  <rect x="185" y="100" width="30" height="60" fill="rgba(26,138,255,0.05)" />
                  
                  {/* Core Stage */}
                  <rect x="180" y="160" width="40" height="280" fill="rgba(26,138,255,0.05)" />
                  <line x1="180" y1="220" x2="220" y2="220" strokeOpacity="0.5" />
                  <line x1="180" y1="360" x2="220" y2="360" strokeOpacity="0.5" />

                  {/* SRBs */}
                  <rect x="155" y="180" width="15" height="260" fill="rgba(26,138,255,0.1)" />
                  <polygon points="155,180 162.5,150 170,180" fill="rgba(26,138,255,0.1)" />
                  
                  <rect x="230" y="180" width="15" height="260" fill="rgba(26,138,255,0.1)" />
                  <polygon points="230,180 237.5,150 245,180" fill="rgba(26,138,255,0.1)" />

                  {/* Engines */}
                  {/* Core Engines */}
                  <polygon points="185,440 215,440 220,460 180,460" fill="rgba(26,138,255,0.1)" />
                  <path d="M 185 460 Q 200 480 215 460" stroke="var(--color-flare)" strokeWidth="2" strokeDasharray="2 2" />
                  
                  {/* SRB Nozzles */}
                  <polygon points="155,440 170,440 175,455 150,455" fill="rgba(26,138,255,0.1)" />
                  <path d="M 155 455 Q 162.5 470 170 455" stroke="var(--color-flare)" strokeWidth="1.5" strokeDasharray="2 2" />

                  <polygon points="230,440 245,440 250,455 225,455" fill="rgba(26,138,255,0.1)" />
                  <path d="M 230 455 Q 237.5 470 245 455" stroke="var(--color-flare)" strokeWidth="1.5" strokeDasharray="2 2" />
                </g>

                {/* Connection Lines & Labels */}
                <g className="font-mono text-[10px] fill-text-secondary tracking-widest uppercase">
                  <polyline points="205,70 280,60 300,60" stroke="var(--color-border)" fill="none" />
                  <circle cx="205" cy="70" r="2" fill="var(--color-atmosphere)" />
                  <text x="305" y="64" fill="var(--color-text-primary)">Orion & LAS</text>

                  <polyline points="215,130 280,140 300,140" stroke="var(--color-border)" fill="none" />
                  <circle cx="215" cy="130" r="2" fill="var(--color-atmosphere)" />
                  <text x="305" y="144" fill="var(--color-text-primary)">Upper Stage</text>

                  <polyline points="155,300 100,280 80,280" stroke="var(--color-border)" fill="none" />
                  <circle cx="155" cy="300" r="2" fill="var(--color-atmosphere)" />
                  <text x="10" y="284" fill="var(--color-text-primary)">Twin SRBs</text>

                  <polyline points="220,300 280,320 300,320" stroke="var(--color-border)" fill="none" />
                  <circle cx="220" cy="300" r="2" fill="var(--color-atmosphere)" />
                  <text x="305" y="324" fill="var(--color-text-primary)">Core Stage</text>
                  
                  <polyline points="200,450 280,480 300,480" stroke="var(--color-border)" fill="none" />
                  <circle cx="200" cy="450" r="2" fill="var(--color-atmosphere)" />
                  <text x="305" y="484" fill="var(--color-text-primary)">RS-25 Engines</text>
                </g>
              </svg>
            )}
          </div>

          <div className="order-1 lg:order-2">
            <p className="font-mono font-medium text-[11px] leading-none text-flare tracking-[0.25em] uppercase mb-6">// VEHICLE ARCHITECTURE</p>
            <h2 className="font-display font-black text-[clamp(40px,6vw,88px)] leading-[1.1] text-text-primary uppercase tracking-[0.04em] mb-8">
              {activeBlueprint === 'orion' ? 'Orion\nAnatomy' : 'SLS\nAnatomy'}
            </h2>
            <p className="text-[clamp(18px,2vw,22px)] text-text-primary max-w-[680px] mb-8">
              {activeBlueprint === 'orion' 
                ? 'A breakdown of the spacecraft designed to carry humans farther into space than ever before.'
                : 'The super heavy-lift launch vehicle that provides the foundational capability for human exploration beyond Earth\'s orbit.'}
            </p>
            
            <div className="flex flex-col gap-6">
              {activeBlueprint === 'orion' ? (
                <>
                  <div className="border-l-2 border-atmosphere pl-6 py-1">
                    <h4 className="font-display font-bold text-xl text-text-primary uppercase tracking-wide mb-2">Crew Module</h4>
                    <p className="text-sm text-text-secondary">The pressurized habitat where up to four astronauts will live and work during the mission. Features a state-of-the-art glass cockpit and a 2,760°C-rated ablative heat shield. Measures 5m in diameter and 3.3m in height, providing 9m³ of habitable volume.</p>
                  </div>
                  <div className="border-l-2 border-border pl-6 py-1 transition-colors hover:border-atmosphere">
                    <h4 className="font-display font-bold text-xl text-text-primary uppercase tracking-wide mb-2">European Service Module</h4>
                    <p className="text-sm text-text-secondary">Provided by ESA, this is the powerhouse of the spacecraft. It supplies electricity, propulsion, thermal control, air, and water for the crew. It measures 4m in diameter and 4m in height.</p>
                  </div>
                  <div className="border-l-2 border-border pl-6 py-1 transition-colors hover:border-atmosphere">
                    <h4 className="font-display font-bold text-xl text-text-primary uppercase tracking-wide mb-2">Launch Abort System</h4>
                    <p className="text-sm text-text-secondary">Positioned above the crew module, this 14m tall solid-rocket-powered system can activate in milliseconds to pull the capsule away from a failing launch vehicle.</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="border-l-2 border-atmosphere pl-6 py-1">
                    <h4 className="font-display font-bold text-xl text-text-primary uppercase tracking-wide mb-2">Solid Rocket Boosters</h4>
                    <p className="text-sm text-text-secondary">Two five-segment solid rocket boosters provide more than 75% of the vehicle's thrust during the first two minutes of flight, producing 1.6 million kg of thrust each. Each booster is 54m tall and 3.7m in diameter.</p>
                  </div>
                  <div className="border-l-2 border-border pl-6 py-1 transition-colors hover:border-atmosphere">
                    <h4 className="font-display font-bold text-xl text-text-primary uppercase tracking-wide mb-2">Core Stage</h4>
                    <p className="text-sm text-text-secondary">Towering at 65 meters and 8.4m in diameter, it houses liquid hydrogen and liquid oxygen tanks to feed four RS-25 engines, providing the remaining 25% of thrust at liftoff.</p>
                  </div>
                  <div className="border-l-2 border-border pl-6 py-1 transition-colors hover:border-atmosphere">
                    <h4 className="font-display font-bold text-xl text-text-primary uppercase tracking-wide mb-2">Upper Stage (EUS)</h4>
                    <p className="text-sm text-text-secondary">The Exploration Upper Stage is a powerful in-space stage that performs the trans-lunar injection (TLI) burn to send Orion and its crew to the Moon. It stands 29m tall with an 8.4m diameter.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="section-horizon"></div>

      {/* History Section */}
      <section id="history" className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 py-[clamp(80px,12vw,160px)] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <div>
            <p className="font-mono font-medium text-[11px] leading-none text-flare tracking-[0.25em] uppercase mb-6">// ON THE SHOULDERS OF GIANTS</p>
            <h2 className="font-display font-black text-[clamp(40px,6vw,88px)] leading-[1.1] text-text-primary uppercase tracking-[0.04em] mb-8">Apollo vs.<br/>Artemis</h2>
            <p className="text-[clamp(18px,2vw,22px)] text-text-primary max-w-[680px] mb-6">Comparing the transient exploration models of the 1960s with the sustainable infrastructure of today.</p>
            <p className="max-w-[680px] mb-8">At the outset of Apollo, so little was known about the lunar surface that scientists feared astronauts would sink like quicksand. Today, armed with decades of orbital data, Artemis is executing a methodical, technology-driven return.</p>
            
            <div className="h-[300px] w-full mt-8 bg-surface/50 border border-border p-4 rounded-sm">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparisonData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 40, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1c2a" horizontal={false} />
                  <XAxis type="number" stroke="#4a566e" tick={{ fill: '#4a566e', fontSize: 12, fontFamily: 'IBM Plex Mono' }} />
                  <YAxis dataKey="metric" type="category" stroke="#4a566e" tick={{ fill: '#8a9ab5', fontSize: 12, fontFamily: 'IBM Plex Mono' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f1018', borderColor: '#1a1c2a', color: '#f0f2f8', fontFamily: 'IBM Plex Mono', fontSize: '12px' }}
                    itemStyle={{ color: '#f0f2f8' }}
                  />
                  <Legend wrapperStyle={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="Apollo" fill="#4a566e" radius={[0, 2, 2, 0]} />
                  <Bar dataKey="Artemis" fill="#1a8aff" radius={[0, 2, 2, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="overflow-x-auto lg:mt-12">
            <table className="w-full border-collapse font-mono text-[13px]">
              <thead>
                <tr>
                  <th className="p-4 text-left border-b border-border text-text-muted uppercase tracking-[0.25em] font-medium">Metric</th>
                  <th className="p-4 text-left border-b border-border text-text-muted uppercase tracking-[0.25em] font-medium">Apollo (1969)</th>
                  <th className="p-4 text-left border-b border-border text-text-muted uppercase tracking-[0.25em] font-medium">Artemis (2025+)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 text-left border-b border-border text-text-secondary">Rocket Thrust</td>
                  <td className="p-4 text-left border-b border-border text-text-muted">3.4 million kg</td>
                  <td className="p-4 text-left border-b border-border text-text-primary font-medium">3.99 million kg</td>
                </tr>
                <tr>
                  <td className="p-4 text-left border-b border-border text-text-secondary">Habitable Volume</td>
                  <td className="p-4 text-left border-b border-border text-text-muted">5.9 cubic meters</td>
                  <td className="p-4 text-left border-b border-border text-text-primary font-medium">9.3 cubic meters</td>
                </tr>
                <tr>
                  <td className="p-4 text-left border-b border-border text-text-secondary">Computing Power</td>
                  <td className="p-4 text-left border-b border-border text-text-muted">Base baseline</td>
                  <td className="p-4 text-left border-b border-border text-text-primary font-medium">20,000x faster</td>
                </tr>
                <tr>
                  <td className="p-4 text-left border-b border-border text-text-secondary">Lander Fuel</td>
                  <td className="p-4 text-left border-b border-border text-text-muted">Hypergolic</td>
                  <td className="p-4 text-left border-b border-border text-text-primary font-medium">Liquid Methane / O2</td>
                </tr>
                <tr>
                  <td className="p-4 text-left border-b border-border text-text-secondary">Mission Duration</td>
                  <td className="p-4 text-left border-b border-border text-text-muted">~8-12 Days max</td>
                  <td className="p-4 text-left border-b border-border text-text-primary font-medium">30+ Days capability</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="section-horizon"></div>

      {/* Future Section */}
      <section id="future" className="max-w-[800px] mx-auto px-6 md:px-10 lg:px-20 py-[clamp(80px,12vw,160px)] relative z-10 text-center">
        <p className="font-mono font-medium text-[11px] leading-none text-flare tracking-[0.25em] uppercase mb-6">// IGNITION INITIATIVE</p>
        <h2 className="font-display font-black text-[clamp(40px,6vw,88px)] leading-[1.1] text-text-primary uppercase tracking-[0.04em] mb-8">The Lunar Base<br/>& Beyond</h2>
        <p className="text-[clamp(18px,2vw,22px)] text-text-primary max-w-[680px] mx-auto mb-8">Phase 3 aims to establish the first deep-space outpost.</p>
        <p className="max-w-[680px] mx-auto mb-12">With the deployment of uncrewed Lunar Terrain Vehicles, JAXA pressurized rovers, and autonomous "MoonFall" drones scanning the dark craters of the South Pole, Artemis is laying the literal groundwork for humanity's next giant leap: Mars.</p>
        <a href="#" className="font-mono font-bold text-[12px] leading-none tracking-[0.25em] uppercase py-4 px-8 cursor-pointer inline-block no-underline rounded-sm transition-all duration-200 bg-transparent text-atmosphere border border-atmosphere hover:bg-atmosphere hover:text-space">Access Mission Telemetry</a>
      </section>

      <footer className="border-t border-border py-12 text-center relative z-10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 flex flex-col items-center">
          <div className="flex items-center justify-center gap-8 mb-8">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg" 
              alt="NASA Logo" 
              className="h-16 w-auto opacity-80 hover:opacity-100 transition-opacity"
              referrerPolicy="no-referrer"
            />
            <img 
              src="https://en.wikipedia.org/wiki/Special:FilePath/Artemis_II_patch.png" 
              alt="Artemis II Mission Patch" 
              className="h-20 w-auto opacity-80 hover:opacity-100 transition-opacity"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="font-display font-extrabold text-xl leading-none text-text-muted tracking-[0.04em]">NASA / ARTEMIS</div>
          <p className="font-mono text-[11px] text-text-muted uppercase mt-4">For all mankind. Not an official NASA communication.</p>
        </div>
      </footer>
    </>
  );
}
