import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  Clock,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Zap,
} from "lucide-react";
import { callForChairsConfig } from "../callForChairsData.js";

/* ── inline keyframes (injected once) ── */
const STYLE_ID = "cfc-animations";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes cfc-shimmer {
      0%   { transform: translateX(-100%) rotate(12deg); }
      100% { transform: translateX(200%) rotate(12deg); }
    }
    @keyframes cfc-glow-pulse {
      0%, 100% { box-shadow: 0 0 15px rgba(165,28,48,0.15), 0 0 30px rgba(165,28,48,0.08); }
      50%      { box-shadow: 0 0 25px rgba(165,28,48,0.35), 0 0 60px rgba(165,28,48,0.15); }
    }
    @keyframes cfc-gradient-border {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes cfc-float {
      0%, 100% { transform: translateY(0px); }
      50%      { transform: translateY(-6px); }
    }
    @keyframes cfc-badge-pulse {
      0%, 100% { transform: scale(1); }
      50%      { transform: scale(1.05); }
    }
    @keyframes cfc-sparkle {
      0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
      50%      { opacity: 1; transform: scale(1) rotate(180deg); }
    }
    @keyframes cfc-slide-up {
      from { opacity: 0; transform: translateY(40px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes cfc-slide-right {
      from { opacity: 0; transform: translateX(-30px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes cfc-btn-shine {
      0%   { left: -75%; }
      100% { left: 125%; }
    }
    @keyframes cfc-bg-shift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes cfc-orb-move-1 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25%      { transform: translate(60px, -40px) scale(1.15); }
      50%      { transform: translate(-30px, 50px) scale(0.9); }
      75%      { transform: translate(40px, 20px) scale(1.1); }
    }
    @keyframes cfc-orb-move-2 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33%      { transform: translate(-50px, 30px) scale(1.2); }
      66%      { transform: translate(40px, -50px) scale(0.85); }
    }
    @keyframes cfc-orb-move-3 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      30%      { transform: translate(30px, 60px) scale(1.1); }
      60%      { transform: translate(-60px, -20px) scale(0.95); }
    }
    @keyframes cfc-line-pulse {
      0%, 100% { opacity: 0.08; transform: scaleX(0.6); }
      50%      { opacity: 0.2;  transform: scaleX(1); }
    }
  `;
  document.head.appendChild(style);
}

/* ── sparkle particles ── */
function SparkleParticles() {
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    top: `${10 + Math.random() * 80}%`,
    delay: `${Math.random() * 4}s`,
    duration: `${2 + Math.random() * 3}s`,
    size: 4 + Math.random() * 6,
  }));
  return particles.map((p) => (
    <div
      key={p.id}
      className="absolute pointer-events-none"
      style={{
        left: p.left,
        top: p.top,
        width: p.size,
        height: p.size,
        background: "radial-gradient(circle, #A51C30 0%, transparent 70%)",
        borderRadius: "50%",
        animation: `cfc-sparkle ${p.duration} ${p.delay} ease-in-out infinite`,
      }}
    />
  ));
}

export default function CallForChairsCard({ onExplore }) {
  const deadlineDate = new Date(callForChairsConfig.deadlineISO);
  const isExpired = new Date() > deadlineDate;
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  /* Intersection Observer for entrance animation */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="call-for-chairs"
      ref={sectionRef}
      className="relative py-14 sm:py-20 border-b border-zinc-200 font-sans overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f0a0b 0%, #1a0a10 20%, #1c1017 40%, #110d14 60%, #0d0d0d 80%, #12080c 100%)",
      }}
    >
      {/* ── Animated colour orbs ── */}
      <div
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle, #A51C30 0%, transparent 70%)", animation: "cfc-orb-move-1 12s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-[-15%] right-[-5%] w-[450px] h-[450px] rounded-full blur-[100px] pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, #e11d48 0%, transparent 70%)", animation: "cfc-orb-move-2 10s ease-in-out infinite" }}
      />
      <div
        className="absolute top-[30%] right-[20%] w-[350px] h-[350px] rounded-full blur-[90px] pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", animation: "cfc-orb-move-3 14s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-[20%] left-[15%] w-[300px] h-[300px] rounded-full blur-[80px] pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, #db2777 0%, transparent 70%)", animation: "cfc-orb-move-2 11s 2s ease-in-out infinite" }}
      />

      {/* ── Decorative animated lines ── */}
      <div className="absolute top-[25%] left-0 right-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, #A51C3040, transparent)", animation: "cfc-line-pulse 4s ease-in-out infinite" }} />
      <div className="absolute top-[75%] left-0 right-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, #e11d4830, transparent)", animation: "cfc-line-pulse 5s 1s ease-in-out infinite" }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* ── Animated gradient-border wrapper ── */}
        <div
          className="relative rounded-2xl p-[3px]"
          style={{
            background: "linear-gradient(135deg, #A51C30, #e11d48, #f43f5e, #A51C30, #801020, #A51C30)",
            backgroundSize: "300% 300%",
            animation: "cfc-gradient-border 6s ease infinite",
          }}
        >
          {/* Inner card with glow */}
          <div
            className="relative bg-white rounded-[13px] p-6 sm:p-10 overflow-hidden"
            style={{
              animation: isVisible ? "cfc-glow-pulse 3s ease-in-out infinite" : "none",
            }}
          >
            {/* Shimmer sweep effect */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{ overflow: "hidden" }}
            >
              <div
                className="absolute top-0 h-full w-1/3"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(165,28,48,0.07), transparent)",
                  animation: "cfc-shimmer 4s ease-in-out infinite",
                  animationDelay: "1s",
                }}
              />
            </div>

            {/* Background sparkle particles */}
            <SparkleParticles />

            {/* Ambient blurred glow circles */}
            <div
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-20"
              style={{ background: "radial-gradient(circle, #A51C30, transparent 70%)" }}
            />
            <div
              className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-15"
              style={{ background: "radial-gradient(circle, #e11d48, transparent 70%)" }}
            />

            <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              {/* ── Left: Poster with float animation ── */}
              <div
                className="lg:col-span-5"
                style={{
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible ? "cfc-slide-right 0.8s ease-out forwards, cfc-float 5s 1s ease-in-out infinite" : "none",
                }}
              >
                <div className="relative rounded-xl overflow-hidden shadow-xl group/poster cursor-pointer transition-transform duration-500 hover:scale-[1.03]">
                  {/* Poster glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover/poster:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
                    style={{ boxShadow: "inset 0 0 40px rgba(165,28,48,0.2)" }}
                  />
                  <img
                    src="./call-for-chairs-poster.jpg"
                    alt="Call for Chairs – Leadership & Recruitment 2026"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover/poster:scale-110"
                    loading="lazy"
                  />
                  {/* Bottom overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* ── Middle: Content ── */}
              <div
                className="lg:col-span-4"
                style={{
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible ? "cfc-slide-up 0.8s 0.2s ease-out forwards" : "none",
                }}
              >
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full text-white shadow-sm"
                    style={{
                      background: "#A51C30",
                      animation: isVisible ? "cfc-badge-pulse 2s 1s ease-in-out infinite" : "none",
                    }}
                  >
                    <Sparkles className="w-3 h-3 text-red-200" />
                    {callForChairsConfig.badge}
                  </span>

                  <span className="text-[11px] font-mono font-semibold text-zinc-500 uppercase tracking-wider">
                    {callForChairsConfig.organization}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight uppercase leading-none mb-3">
                  CALL FOR <span style={{ color: "#A51C30" }}>CHAIRS</span> – IEEE SB ADYPU
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-5 max-w-3xl">
                  {callForChairsConfig.cardDescription}
                </p>

                {/* Eligibility Notice */}
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-950 font-medium transition-all duration-300 hover:bg-red-100 hover:border-red-300 hover:shadow-md">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-[#A51C30]" />
                  <span>
                    <strong>Eligibility:</strong> Only students with a valid IEEE
                    membership are eligible to apply. Students without an active
                    IEEE membership cannot apply for these positions.
                  </span>
                </div>
              </div>

              {/* ── Right: Meta & CTA ── */}
              <div
                className="lg:col-span-3 flex flex-col justify-between bg-zinc-50 border border-zinc-200 rounded-xl p-5 sm:p-6 space-y-5 transition-all duration-300 hover:shadow-lg hover:border-zinc-300"
                style={{
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible ? "cfc-slide-up 0.8s 0.4s ease-out forwards" : "none",
                }}
              >
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 mb-1">
                    Application Deadline
                  </div>
                  <div className="flex items-center gap-2 text-zinc-900 text-lg sm:text-xl font-extrabold uppercase">
                    <Calendar className="w-4 h-4 text-[#A51C30]" />
                    <span>{callForChairsConfig.deadlineFormatted}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 mt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{callForChairsConfig.deadlineTime}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-200">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 mb-1">
                    Eligibility Criteria
                  </div>
                  <div className="text-xs font-bold text-zinc-800 uppercase tracking-wide">
                    {callForChairsConfig.eligibilityShort}
                  </div>
                </div>

                {/* Flashy CTA Button */}
                <button
                  onClick={onExplore}
                  className="relative w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-mono font-bold text-xs uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] cursor-pointer group overflow-hidden"
                  style={{
                    background: isExpired
                      ? "#71717a"
                      : "linear-gradient(135deg, #A51C30 0%, #801020 100%)",
                    boxShadow: isExpired ? "none" : "0 8px 25px rgba(165, 28, 48, 0.35)",
                  }}
                >
                  {/* Button shine sweep */}
                  {!isExpired && (
                    <span
                      className="absolute top-0 h-full w-1/2 pointer-events-none"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                        animation: "cfc-btn-shine 3s ease-in-out infinite",
                      }}
                    />
                  )}
                  <Zap className="w-3.5 h-3.5" />
                  <span>{isExpired ? "View Positions (Closed)" : "Explore Positions / Apply Now"}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
