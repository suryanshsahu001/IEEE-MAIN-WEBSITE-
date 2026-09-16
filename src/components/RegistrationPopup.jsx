import { useEffect, useState } from "react";
import { X, ArrowRight, Clock, MapPin, Users, IndianRupee } from "lucide-react";

const REGISTRATION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScLbWDK-yv6k8avB69VknoTwUq7y2hUxL5unjteCaASlu4aMw/viewform";

export default function RegistrationPopup() {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => setAnimating(true));
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setAnimating(false);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4"
      style={{
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(6px)",
        opacity: animating ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
      onClick={close}
    >
      <div
        className="relative bg-white w-full max-w-2xl overflow-y-auto"
        style={{
          borderRadius: "6px",
          boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
          maxHeight: "84vh",
          transform: animating ? "scale(1) translateY(0)" : "scale(0.95) translateY(20px)",
          transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease",
          opacity: animating ? 1 : 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={close}
          aria-label="Close popup"
          className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 transition-colors text-zinc-600 hover:text-zinc-900"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left content */}
          <div className="flex-1 p-4 sm:p-7 md:p-9">
            <div className="flex items-center gap-2 mb-3 sm:mb-5 flex-wrap">
              <img
                src="/logos/adypu-logo.png"
                alt="ADYPU"
                className="h-7 sm:h-10 object-contain"
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <div className="h-6 w-px bg-zinc-200" />
              <img
                src="/logos/ieee-stb-logo.png"
                alt="IEEE"
                className="h-6 sm:h-8 object-contain"
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <img
                src="/logos/ieee-maharashtra-logo.png"
                alt="IEEE Maharashtra Section"
                className="h-5 sm:h-7 object-contain"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>

            {/* Tag line */}
            <p
              className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-2"
              style={{ color: "#A51C30" }}
            >
              INNOVATE &nbsp;|&nbsp; DESIGN &nbsp;|&nbsp; IMPACT
            </p>

            {/* Title */}
            <h2
              className="text-xl sm:text-4xl font-extrabold tracking-tighter leading-none uppercase mb-0.5"
              style={{ color: "#1a2444" }}
            >
              MEDHA 2026
            </h2>
            <h2
              className="text-xl sm:text-4xl font-extrabold tracking-tighter leading-none uppercase mb-2"
              style={{ color: "#0a4da8" }}
            >
              TECH4LIFE 2026
            </h2>
            <p className="text-[10px] sm:text-sm font-bold text-zinc-500 uppercase tracking-widest mb-3 sm:mb-5">
              36 Hours Medical Device Hackathon
            </p>

            {/* Date & Deadline row */}
            <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-5">
              <div className="flex items-center gap-1.5 text-zinc-700 text-xs sm:text-sm font-semibold">
                <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: "#A51C30" }} />
                <span>22<sup>nd</sup> – 23<sup>rd</sup> Sep 2026</span>
              </div>
              <span
                className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full text-white"
                style={{ background: "#A51C30" }}
              >
                <Clock className="w-2.5 h-2.5 shrink-0" />
                Deadline: 20<sup>th</sup>&nbsp;Sep
              </span>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-4 sm:mb-6 border-t border-zinc-100 pt-3 sm:pt-5">
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  <MapPin className="w-3 h-3 shrink-0" style={{ color: "#0a4da8" }} />
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Phase 1:</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-zinc-800 pl-4 leading-snug">Ajeenkya DY Patil University</p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  <MapPin className="w-3 h-3 shrink-0" style={{ color: "#0a4da8" }} />
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Phase 2:</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-zinc-800 pl-4 leading-snug">IIT Bombay</p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  <Users className="w-3 h-3 shrink-0" style={{ color: "#0a4da8" }} />
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Eligibility:</span>
                </div>
                <p className="text-xs text-zinc-700 pl-4 leading-snug">Medical, Engg, Design (All)</p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  <IndianRupee className="w-3 h-3 shrink-0" style={{ color: "#0a4da8" }} />
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#0a4da8" }}>Reg. Fee:</span>
                </div>
                <p className="text-xs text-zinc-700 pl-4 leading-snug">
                  <span className="font-bold">₹499</span> Solo
                  <br />
                  <span className="text-[9px] text-zinc-400">Teams at venue</span>
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 font-mono font-bold text-xs sm:text-sm tracking-widest uppercase text-white transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #0a4da8 0%, #1a6fd4 100%)",
                  borderRadius: "50px",
                }}
              >
                REGISTER NOW
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <button
                onClick={close}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 font-mono font-bold text-xs sm:text-sm tracking-widest uppercase text-zinc-600 hover:text-zinc-900 border border-zinc-300 hover:border-zinc-500 transition-all"
                style={{ borderRadius: "50px" }}
              >
                Close
              </button>
            </div>
          </div>

          {/* Right accent panel */}
          <div
            className="hidden sm:flex flex-col items-center justify-between w-44 md:w-52 p-6 shrink-0"
            style={{
              background: "linear-gradient(160deg, #e8f0fc 0%, #c3d5f5 100%)",
            }}
          >
            <div className="flex flex-col items-center justify-center flex-1 gap-3 text-center">
              <div className="text-6xl select-none">🩺</div>
              <div className="text-4xl select-none">💡</div>
              <div className="text-5xl select-none">⚕️</div>
            </div>
            <p
              className="text-[9px] font-mono font-bold tracking-[0.22em] uppercase text-center mt-4"
              style={{ color: "#0a4da8" }}
            >
              FROM IDEAS TO
              <br />
              REAL-WORLD IMPACT
            </p>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div
          className="h-1 w-full"
          style={{ background: "linear-gradient(to right, #A51C30, #0a4da8)" }}
        />
      </div>
    </div>
  );
}
