import { ArrowRight, Play } from "lucide-react";
import { siteConfig } from "../data.js";

export default function Hero({ onOpenVideo }) {
  return (
    <section id="home" className="relative text-white font-sans">

      {/* ── MOBILE LAYOUT (hidden on md+) ── */}
      <div className="md:hidden flex flex-col">
        {/* Image panel — constrained height so full landscape image shows beautifully */}
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "56vw", minHeight: "210px", maxHeight: "300px" }}
        >
          <img
            src="./hero-bg.jpeg"
            alt="Ajeenkya DY Patil University Campus"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          {/* bottom fade into dark content panel */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: "65%",
              background:
                "linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.55) 55%, transparent 100%)",
            }}
          />
          {/* top fade for navbar overlap */}
          <div
            className="absolute top-0 left-0 right-0"
            style={{
              height: "35%",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Content panel below image */}
        <div className="bg-[#0a0a0a] px-6 pb-14 pt-7">
          <div className="mb-4">
            <span
              className="inline-block text-[10px] font-mono font-bold tracking-[0.22em] uppercase px-3 py-1 border-l-2 text-white/70"
              style={{ borderColor: "#A51C30", letterSpacing: "0.22em" }}
            >
              IEEE Student Branch · ADYPU
            </span>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tighter leading-none font-sans uppercase mb-5 text-white">
            IEEE ADYPU
          </h1>

          <p className="text-sm text-zinc-400 font-normal leading-relaxed mb-8 max-w-sm">
            {siteConfig.tagline}
          </p>

          <div className="flex flex-col gap-3">
            <a
              href="#events"
              className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-tan-600 hover:bg-tan-700 text-white text-xs font-mono font-bold tracking-wider transition-all shadow-md"
            >
              <span>EXPLORE EVENTS</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() =>
                onOpenVideo(siteConfig.recapVideoUrl, "IEEE ADYPU Official Intro Video")
              }
              className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-zinc-800/80 border border-white/15 text-zinc-200 text-xs font-mono font-semibold tracking-wider hover:bg-zinc-700/90 hover:text-white transition-all"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-zinc-900">
                <Play className="w-3 h-3 ml-0.5 fill-current" />
              </span>
              <span>WATCH INTRO</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT (hidden below md) — completely unchanged ── */}
      <div
        className="hidden md:block relative overflow-hidden"
        style={{ minHeight: "100vh" }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="./hero-bg.jpeg"
            alt="Ajeenkya DY Patil University Campus"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(8,8,8,0.72) 0%, rgba(8,8,8,0.55) 40%, rgba(8,8,8,0.18) 75%, rgba(8,8,8,0.05) 100%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: "38%",
              background:
                "linear-gradient(to top, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.6) 40%, transparent 100%)",
            }}
          />
        </div>

        <div
          className="relative z-10 h-full flex flex-col justify-end"
          style={{ minHeight: "100vh" }}
        >
          <div className="max-w-7xl mx-auto px-10 lg:px-16 pb-24 pt-40 lg:pt-52 w-full">
            <div className="mb-5">
              <span
                className="inline-block text-[11px] font-mono font-bold tracking-[0.22em] uppercase px-3 py-1 border-l-2 text-white/80"
                style={{ borderColor: "#A51C30", letterSpacing: "0.22em" }}
              >
                IEEE Student Branch · ADYPU
              </span>
            </div>

            <h1 className="text-7xl lg:text-8xl font-extrabold tracking-tighter leading-none font-sans uppercase mb-6">
              <span className="text-white font-sans">IEEE ADYPU</span>
            </h1>

            <p className="text-base text-zinc-300 font-normal leading-relaxed max-w-md mb-10">
              {siteConfig.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#events"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-tan-600 hover:bg-tan-700 text-white text-xs font-mono font-bold tracking-wider transition-all shadow-md"
              >
                <span>EXPLORE EVENTS</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() =>
                  onOpenVideo(siteConfig.recapVideoUrl, "IEEE ADYPU Official Intro Video")
                }
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-zinc-900/70 border border-white/20 text-zinc-200 text-xs font-mono font-semibold tracking-wider hover:bg-zinc-800/90 hover:text-white transition-all"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-zinc-900">
                  <Play className="w-3 h-3 ml-0.5 fill-current" />
                </span>
                <span>WATCH INTRO</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}