import { ArrowRight, Play } from "lucide-react";
import { siteConfig } from "../data.js";

export default function Hero({ onOpenVideo }) {
  return (
    <section
      id="home"
      className="relative overflow-hidden text-white font-sans"
      style={{ minHeight: "100vh" }}
    >
      {/* Background image + overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpeg"
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

      {/* Content */}
      <div
        className="relative z-10 h-full flex flex-col justify-end"
        style={{ minHeight: "100vh" }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-24 pt-40 lg:pt-52 w-full">
          <div className="mb-5">
            <span
              className="inline-block text-[11px] font-mono font-bold tracking-[0.22em] uppercase px-3 py-1 border-l-2 text-white/80"
              style={{ borderColor: "#A51C30", letterSpacing: "0.22em" }}
            >
              IEEE Student Branch · ADYPU
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-none font-sans uppercase mb-6">
            <span className="text-white font-sans">IEEE ADYPU</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-md mb-10">
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
    </section>
  );
}