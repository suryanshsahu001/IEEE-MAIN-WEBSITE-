import React, { useState, useEffect } from 'react';
import { Zap, X } from 'lucide-react';

export default function Notification() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let showTimer;
    let hideTimer;

    const cycle = () => {
      // Wait 30 seconds, then show
      showTimer = setTimeout(() => {
        setIsVisible(true);
        // Stay visible for 3 seconds, then hide and repeat
        hideTimer = setTimeout(() => {
          setIsVisible(false);
          cycle();
        }, 3000);
      }, 30000);
    };

    cycle();

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed z-[100] animate-fadeIn"
      style={{ top: '5rem', right: '0.75rem', width: '260px' }}
    >
      <div
        className="bg-zinc-900 border-l-4 shadow-2xl px-4 py-3 rounded-r-xl flex items-start gap-3"
        style={{ borderColor: '#A51C30' }}
      >
        <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-extrabold text-white uppercase tracking-wide leading-tight mb-1">
            ⚡ IEEE Day Is Coming Soon!
          </p>
          <p className="text-[10px] text-zinc-400 leading-snug mb-1">
            Exciting celebration of technology &amp; community.
          </p>
          <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#A51C30' }}>
            Stay Tuned!
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
