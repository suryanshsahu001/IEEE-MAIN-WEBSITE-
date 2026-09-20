import React, { useRef, useState, useEffect } from 'react';
import { Play, Calendar, Star, ArrowRight } from 'lucide-react';

export default function Highlights({ onOpenVideo }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { rootMargin: '200px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-zinc-900 text-white font-sans py-24 border-t border-zinc-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-zinc-900 z-0" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-8 bg-tan-500/50" style={{ backgroundColor: 'rgba(165, 28, 48, 0.5)' }} />
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-zinc-400" style={{ color: '#A51C30' }}>
              CURRENT EVENT HIGHLIGHTS
            </span>
            <div className="h-px w-8 bg-tan-500/50" style={{ backgroundColor: 'rgba(165, 28, 48, 0.5)' }} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Discover <span style={{ color: '#A51C30' }}>What’s Next</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm">
            Relive the energy, people and moments captured by the IEEE ADYPU team.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Info */}
          <div className="lg:col-span-3 flex flex-col items-start order-2 lg:order-1">
            <div className="bg-zinc-800 border border-zinc-700 text-zinc-300 px-4 py-1.5 rounded-full flex items-center gap-2 mb-8">
              <Star className="w-3.5 h-3.5 fill-current" style={{ color: '#A51C30' }} />
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase mt-0.5">FEATURED</span>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-zinc-400">
                EVENT HIGHLIGHTS
              </span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Tech4Life Hackathon
            </h3>
            
            <div className="flex items-center gap-2 text-zinc-400 mb-6 text-sm font-medium">
              <Calendar className="w-4 h-4" />
              <span>Coming Soon</span>
            </div>
            
            <p className="text-zinc-400 text-sm leading-relaxed mb-8">
              Get ready to innovate! The Tech4Life Hackathon is approaching fast. Join us to build solutions that improve daily life using cutting-edge technology.
            </p>
          </div>

          {/* Middle Column: Large Video */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div 
              className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer border border-white/10 shadow-2xl"
              onClick={() => onOpenVideo && onOpenVideo('./gallery/highlights-main.mp4', 'Tech4Life Hackathon')}
            >
              {isVisible && !isMobile ? (
                <video 
                  src="./gallery/highlights-main.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full border-2 border-white/20 flex items-center justify-center" style={{ backgroundColor: 'rgba(165, 28, 48, 0.4)' }}>
                      <Play className="w-7 h-7 fill-white text-white ml-0.5" />
                    </div>
                    <p className="text-white/60 text-xs font-mono font-bold tracking-widest uppercase">Tap to Watch</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors pointer-events-none" />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 text-white/90 text-xs font-mono font-bold">
                <Play className="w-3 h-3 fill-white" /> 0:45
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-all" style={{ backgroundColor: 'rgba(165, 28, 48, 0.5)' }}>
                  <Play className="w-8 h-8 fill-white text-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 fill-white text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg leading-tight">Tech4Life Hackathon</div>
                  <div className="text-white/70 text-xs font-mono">Coming Soon Teaser</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Video Grid */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 order-3 snap-x">
            {[
              { id: 1, duration: '0:32', videoUrl: './gallery/video-1.mp4' },
              { id: 2, duration: 'New', videoUrl: './videos/PV.mp4' }
            ].map((vid) => (
              <div 
                key={vid.id} 
                className="relative aspect-video lg:aspect-[16/9] w-64 lg:w-full flex-shrink-0 rounded-xl overflow-hidden group cursor-pointer border border-white/10 snap-start"
                onClick={() => {
                  if (vid.videoUrl && onOpenVideo) {
                    onOpenVideo(vid.videoUrl, 'Discover What’s Next - Video ' + vid.id);
                  }
                }}
              >
                {vid.videoUrl && isVisible ? (
                  <video 
                    src={vid.videoUrl} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    preload="none"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center text-zinc-600 font-mono text-xs transition-transform duration-700 group-hover:scale-105">
                    VIDEO {vid.id}
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1.5 text-white/90 text-[10px] font-mono font-bold transition-colors group-hover:bg-[#A51C30]">
                  <Play className="w-3 h-3 fill-white" /> {vid.duration}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
