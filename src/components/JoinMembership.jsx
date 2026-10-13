import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

export default function JoinMembership() {
  return (
    <section id="join" className="relative bg-[#0d0d0d] text-white py-12 sm:py-16 overflow-hidden border-y border-zinc-800">
      {/* Subtle theme glows */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #A51C30 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full pointer-events-none opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #801020 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-black/90 border border-zinc-800 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          {/* Top crimson accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ background: "linear-gradient(90deg, #A51C30 0%, #e53e3e 50%, #A51C30 100%)" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading & Details */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-[0.22em] uppercase px-3 py-1 rounded-full text-white bg-red-950/70 border"
                  style={{ borderColor: "#A51C30" }}
                >
                  <Sparkles className="w-3 h-3 text-red-400" />
                  MEMBERSHIP DRIVE
                </span>
                <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
                  STB60205406
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-none text-white mb-4">
                We're <span style={{ color: "#A51C30" }}>Recruiting!</span>
              </h2>

              <div className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 mb-1">
                Join the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-200">
                  IEEE Student Branch
                </span>
              </div>
              <div className="text-sm sm:text-base font-mono font-semibold tracking-wider text-zinc-400 uppercase">
                ADYPU · Pune
              </div>
            </div>

            {/* Right Column: Eligibility Checklist & CTA Button */}
            <div className="lg:col-span-5 bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-5 sm:p-6">
              <div className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-zinc-300 mb-4 pb-2 border-b border-zinc-800 flex items-center justify-between">
                <span>Who Can Join?</span>
                <span className="text-[10px] font-normal text-zinc-500">All Branches</span>
              </div>

              <div className="space-y-3.5 mb-6">
                {[
                  "2nd, 3rd & 4th Year Students",
                  "Any Branch / Stream",
                  "Open to All Eligible Students",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white shadow-sm"
                      style={{ background: "#A51C30" }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-zinc-200 tracking-wide">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="https://forms.gle/VKpRn85RU4tz7vsc8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-mono font-bold text-xs tracking-widest uppercase text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] group"
                style={{
                  background: "linear-gradient(135deg, #A51C30 0%, #801020 100%)",
                  boxShadow: "0 8px 25px rgba(165, 28, 48, 0.35)",
                }}
              >
                <span>JOIN MEMBERSHIP</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
