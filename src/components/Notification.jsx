import React, { useState, useEffect } from 'react';
import { Zap, X } from 'lucide-react';

export default function Notification() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let showTimer;
    let hideTimer;

    const cycle = () => {
      showTimer = setTimeout(() => {
        setIsVisible(true);
        hideTimer = setTimeout(() => {
          setIsVisible(false);
          cycle();
        }, 5000); // 5 seconds instead of 3 to ensure readability of longer text
      }, 30000); // 30 seconds
    };

    cycle();

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-3 sm:top-24 sm:right-6 z-[100] w-64 sm:w-80 bg-zinc-900 border-l-4 shadow-2xl p-3 sm:p-5 flex items-start gap-3 sm:gap-4 animate-fadeIn" style={{ borderColor: '#A51C30' }}>
      <div className="flex-shrink-0 mt-0.5">
        <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
      </div>
      <div className="flex-1">
        <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-wide uppercase mb-1">
          IEEE Day Is Coming Soon!
        </h4>
        <p className="text-[10px] sm:text-xs text-zinc-300 leading-relaxed mb-1 sm:mb-2">
          Get ready for an exciting celebration of technology, innovation &amp; community.
        </p>
        <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase" style={{ color: '#A51C30' }}>
          Stay Tuned!
        </span>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="flex-shrink-0 text-zinc-500 hover:text-white transition-colors"
      >
        <X className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
    </div>
  );
}
