import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ExternalLink,
  Cpu,
  Layers,
  Wrench,
  CheckCircle2,
  Phone,
  ArrowRight,
  Flame,
} from "lucide-react";

export default function WorkshopSection() {
  const formUrl = "https://forms.gle/LfyyuNGA7iBc9aL36";

  const eventPillars = [
    {
      icon: Cpu,
      title: "CAD Design",
      desc: "Fusion 360 3D Modeling & Mechanisms",
    },
    {
      icon: Layers,
      title: "Simulation",
      desc: "Kinematics & Digital Twin Integration",
    },
    {
      icon: Wrench,
      title: "Hardware Assembly",
      desc: "Physical Assembly, Calibration & Testing",
    },
  ];

  return (
    <section
      id="workshop"
      className="relative bg-[#0d0d0d] text-white py-8 sm:py-14 lg:py-18 overflow-hidden border-b border-zinc-800 font-sans"
    >
      {/* Background ambient lighting - Signature IEEE Crimson & Burgundy glow */}
      <div
        className="absolute top-0 right-1/4 w-[450px] h-[450px] rounded-full pointer-events-none opacity-20 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #A51C30 0%, #700f1e 60%, transparent 80%)",
        }}
      />
      <div
        className="absolute bottom-0 left-10 w-80 h-80 rounded-full pointer-events-none opacity-15 blur-[100px]"
        style={{ background: "radial-gradient(circle, #801020 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 relative z-10">
        {/* Main Master Card */}
        <div className="relative bg-gradient-to-br from-zinc-900/95 via-zinc-900/85 to-black/95 border-2 border-zinc-800 hover:border-[#A51C30]/50 transition-all duration-300 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Top highlight gradient strip in IEEE Crimson Theme */}
          <div
            className="absolute top-0 left-0 right-0 h-1 sm:h-1.5"
            style={{
              background:
                "linear-gradient(90deg, #A51C30 0%, #e11d48 50%, #A51C30 100%)",
            }}
          />

          {/* Top Organization Badges & Headers */}
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 border-b border-zinc-800/80">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
              <span
                className="inline-flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] font-mono font-bold tracking-[0.18em] uppercase px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-white shadow-sm"
                style={{ background: "#A51C30" }}
              >
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-200" />
                HANDS-ON WORKSHOP
              </span>

              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[11px] font-mono font-bold tracking-wider uppercase px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-rose-300 bg-rose-500/10 border border-rose-500/25">
                <Flame className="w-3 h-3 text-rose-400" />
                LIMITED SEATS
              </span>

              <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase tracking-wider hidden md:inline-block">
                ADYPU School of Engineering · IEEE Maharashtra Section
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-zinc-800/90 text-zinc-200 border border-zinc-700 font-mono font-bold text-[9px] sm:text-[11px] tracking-wider uppercase shadow-md">
              <Sparkles className="w-3 h-3 text-[#e11d48]" />
              <span>IEEE YP &amp; IEEE FOUNDATION</span>
            </div>
          </div>

          {/* Two-Column Grid: Content (Left) & Poster/CTA (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7">
              {/* Catchphrase */}
              <div
                className="font-mono font-black text-xs sm:text-base uppercase tracking-widest mb-1"
                style={{ color: "#A51C30" }}
              >
                DESIGN IT. SIMULATE IT. BUILD IT.
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-[1.1] mb-2 sm:mb-3">
                2-DAY HANDS-ON WORKSHOP ON{" "}
                <span style={{ color: "#A51C30" }}>
                  INDUSTRIAL MANIPULATOR
                </span>{" "}
                DESIGN
              </h2>

              {/* Sub-tagline */}
              <p className="text-xs sm:text-sm font-mono text-zinc-300 font-semibold tracking-wide uppercase mb-3 sm:mb-4 flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-200 border border-zinc-700/60">CAD Design</span>
                <span className="text-zinc-500">/</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-200 border border-zinc-700/60">Simulation</span>
                <span className="text-zinc-500">/</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-200 border border-zinc-700/60">Hardware Assembly</span>
              </p>

              {/* Key Event Details Box (Date, Time, Venue) */}
              <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-xl p-3 sm:p-4 mb-4 space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2.5 text-zinc-200">
                  <Calendar className="w-4 h-4 text-[#A51C30] shrink-0" />
                  <span>
                    <strong className="text-white font-mono uppercase tracking-wider text-[11px] sm:text-xs text-red-300 mr-1.5">
                      Date:
                    </strong>
                    3rd and 4th November
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-zinc-200">
                  <Clock className="w-4 h-4 text-[#e11d48] shrink-0" />
                  <span>
                    <strong className="text-white font-mono uppercase tracking-wider text-[11px] sm:text-xs text-rose-300 mr-1.5">
                      Time:
                    </strong>
                    10:00 AM onwards
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-zinc-200">
                  <MapPin className="w-4 h-4 text-[#A51C30] shrink-0" />
                  <span>
                    <strong className="text-white font-mono uppercase tracking-wider text-[11px] sm:text-xs text-red-300 mr-1.5">
                      Venue:
                    </strong>
                    Computer Lab-201, ULC1, ADYPU
                  </span>
                </div>
              </div>

              {/* Pillars Preview Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                {eventPillars.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <div
                      key={i}
                      className="bg-zinc-950/60 border border-zinc-800/70 rounded-xl p-2.5 sm:p-3 flex sm:flex-col items-center sm:items-start gap-2.5 sm:gap-1.5 hover:border-zinc-700 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-[#A51C30] shrink-0" />
                      <div>
                        <div className="text-[11px] sm:text-xs font-bold text-white uppercase">
                          {p.title}
                        </div>
                        <div className="text-[10px] text-zinc-400 leading-tight">
                          {p.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Student Coordinators */}
              <div className="p-2.5 sm:p-3 bg-zinc-950/60 border border-zinc-800/80 rounded-xl flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400 font-mono">
                <span className="font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#A51C30]" />
                  Student Coordinators:
                </span>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-zinc-300">
                  <a href="tel:+918329852743" className="hover:text-red-400 transition-colors">
                    Prathamesh Sakhare: <span className="text-white font-semibold">+91 8329852743</span>
                  </a>
                  <span className="text-zinc-600 hidden sm:inline">|</span>
                  <a href="tel:+919665202509" className="hover:text-red-400 transition-colors">
                    Aryan Vaidya: <span className="text-white font-semibold">+91 9665202509</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Poster Preview + Direct Registration Button (Crimson Theme) */}
            <div className="lg:col-span-5 flex flex-col items-center w-full">
              <div className="w-full max-w-sm lg:max-w-md bg-zinc-950/90 border border-zinc-800 hover:border-[#A51C30]/60 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-xl transition-all duration-300 group">
                <div className="relative rounded-lg sm:rounded-xl overflow-hidden mb-2.5 sm:mb-3 bg-zinc-900 aspect-[3/4] max-h-[220px] sm:max-h-[340px] lg:max-h-[420px] flex items-center justify-center">
                  <picture className="w-full h-full">
                    <source type="image/webp" srcSet="./workshop-poster.webp" />
                    <img
                      src="./workshop-poster.jpg"
                      alt="Industrial Manipulator Design Workshop Poster"
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 right-2 text-left">
                    <span
                      className="text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded text-white shadow"
                      style={{ background: "#A51C30" }}
                    >
                      Official Workshop Poster
                    </span>
                  </div>
                </div>

                {/* Direct Registration Button styled in IEEE Crimson gradient */}
                <a
                  href={formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl font-mono font-bold text-xs sm:text-sm uppercase tracking-wider text-white shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #A51C30 0%, #801020 100%)",
                    boxShadow: "0 8px 25px rgba(165, 28, 48, 0.4)",
                  }}
                >
                  <span>REGISTER FOR WORKSHOP</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <p className="text-[9px] sm:text-[11px] font-mono text-center text-zinc-400 mt-1.5 sm:mt-2">
                  ⚡ Official Registration via Google Forms · Open to all students
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
