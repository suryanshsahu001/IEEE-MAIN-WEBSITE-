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
        }, 5000);
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
      style={{ bottom: '1.25rem', right: '0.75rem', maxWidth: '210px' }}
    >
      <div
        className="bg-zinc-900 border-l-4 shadow-xl flex items-center gap-2 px-3 py-2 rounded-r-lg"
        style={{ borderColor: '#A51C30' }}
      >
        <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-extrabold text-white uppercase tracking-wide leading-tight">
            IEEE Day Coming Soon!
          </p>
          <p className="text-[9px] font-bold leading-tight mt-0.5" style={{ color: '#A51C30' }}>
            Stay Tuned!
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 text-zinc-500 hover:text-white transition-colors ml-1"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
