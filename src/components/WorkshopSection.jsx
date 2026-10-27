import {
  Calendar,
  Clock,
  Sparkles,
  ExternalLink,
  Cpu,
  Boxes,
  Layers,
  Wrench,
  Users,
  Presentation,
  CheckCircle2,
  ArrowRight,
  Flame,
} from "lucide-react";

export default function WorkshopSection() {
  const formUrl = "https://forms.gle/LfyyuNGA7iBc9aL36";

  const highlights = [
    {
      icon: Cpu,
      title: "Real-World Industrial Applications",
      desc: "Learn principles applied in automated modern manufacturing.",
    },
    {
      icon: Wrench,
      title: "Hands-on Hardware Building",
      desc: "Assemble physical robotic manipulator mechanisms from scratch.",
    },
    {
      icon: Boxes,
      title: "3D Modelling & Simulation",
      desc: "Fusion 360 CAD modeling, kinematics, and digital motion simulation.",
    },
    {
      icon: Layers,
      title: "Digital Twin Integration",
      desc: "Simulate and benchmark virtual model against physical prototype.",
    },
    {
      icon: Users,
      title: "Team-Based Learning",
      desc: "Collaborative peer engineering with dedicated mentorship.",
    },
    {
      icon: Presentation,
      title: "Present & Showcase",
      desc: "Demonstrate working robots, motion paths, and project outcomes.",
    },
  ];

  return (
    <section
      id="workshop"
      className="relative bg-[#0c0d10] text-white py-14 sm:py-20 overflow-hidden border-b border-zinc-800 font-sans"
    >
      {/* Background radial ambient lights */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #f59e0b 0%, #A51C30 60%, transparent 80%)" }}
      />
      <div
        className="absolute bottom-0 left-10 w-96 h-96 rounded-full pointer-events-none opacity-15 blur-[100px]"
        style={{ background: "radial-gradient(circle, #A51C30 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Main Master Card */}
        <div className="relative bg-gradient-to-br from-zinc-900/95 via-zinc-900/80 to-black/95 border-2 border-zinc-800 hover:border-amber-500/40 transition-all duration-300 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Top highlight gradient strip */}
          <div
            className="absolute top-0 left-0 right-0 h-1.5"
            style={{
              background:
                "linear-gradient(90deg, #A51C30 0%, #f59e0b 50%, #A51C30 100%)",
            }}
          />

          {/* Top Badge & Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-[0.2em] uppercase px-3.5 py-1 rounded-full text-amber-300 bg-amber-500/10 border border-amber-500/30 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                HANDS-ON WORKSHOP
              </span>

              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full text-rose-300 bg-rose-500/10 border border-rose-500/25">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                LIMITED SEATS
              </span>

              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider hidden sm:inline-block">
                IEEE SB ADYPU
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400 text-zinc-950 font-black text-[11px] font-mono tracking-wider uppercase shadow-md">
              <Clock className="w-3.5 h-3.5" />
              <span>FIRST-COME FIRST-SERVED REGISTRATION</span>
            </div>
          </div>

          {/* Two-Column Grid: Left Content, Right Poster / Action */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7">
              <div className="text-amber-400 font-mono font-extrabold text-sm sm:text-base uppercase tracking-widest mb-1.5 flex items-center gap-2">
                <span>2-DAY IMMERSIVE TECHNICAL WORKSHOP</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.05] mb-4">
                INDUSTRIAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500">MANIPULATOR</span> DESIGN
              </h2>

              <p className="text-sm sm:text-base font-mono text-zinc-300 font-semibold tracking-wide uppercase mb-4 flex items-center gap-2">
                <span className="text-amber-400">DESIGN IT.</span>
                <span className="text-orange-400">SIMULATE IT.</span>
                <span className="text-rose-400">BUILD IT.</span>
                <span className="text-white">MAKE IT MOVE.</span>
              </p>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 max-w-2xl">
                Experience robotics from concept to creation. Assemble physical industrial robotic arms, master 3D CAD modeling in Fusion 360, configure digital twins, and test precision kinematic motions in a competitive, team-based environment.
              </p>

              {/* 2-Day Timeline Preview Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="bg-zinc-950/70 border border-zinc-800 rounded-2xl p-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 mb-1">
                    DAY 1 · Understand • Design • Simulate
                  </div>
                  <ul className="text-xs text-zinc-300 space-y-1.5 font-medium">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>Intro to Industrial Manipulators &amp; Kinematics</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>Fusion 360 3D CAD Modelling &amp; Movement</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>Digital Twin Activity &amp; Virtual Simulation</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-zinc-950/70 border border-zinc-800 rounded-2xl p-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-rose-400 mb-1">
                    DAY 2 · Build • Test • Showcase
                  </div>
                  <ul className="text-xs text-zinc-300 space-y-1.5 font-medium">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>Hardware Assembly &amp; Servo Calibration</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>Embedded Control, Logic &amp; Integration</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>Physical vs Digital Twin Testing &amp; Showcase</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Ideal for tag */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                <span className="font-mono font-bold uppercase text-zinc-300">Ideal For:</span>
                <span className="px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-300 font-mono text-[11px]">
                  Robotics &amp; Automation
                </span>
                <span className="px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-300 font-mono text-[11px]">
                  Mechatronics
                </span>
                <span className="px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-300 font-mono text-[11px]">
                  CSE / AI &amp; DS / Mechanical
                </span>
              </div>
            </div>

            {/* Right Column: Poster Image Preview + Big Register Button */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-md bg-zinc-950 border-2 border-zinc-800 hover:border-amber-500/50 rounded-2xl p-3 sm:p-4 shadow-2xl transition-all duration-300 group">
                <div className="relative rounded-xl overflow-hidden mb-4 bg-zinc-900 aspect-[3/4] max-h-[420px] flex items-center justify-center">
                  <picture className="w-full h-full">
                    <source type="image/webp" srcSet="./workshop-poster.webp" />
                    <img
                      src="./workshop-poster.jpg"
                      alt="Industrial Manipulator Design Workshop Poster"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded bg-amber-500 text-black shadow">
                      Turn Ideas into Real Systems
                    </span>
                  </div>
                </div>

                {/* Big Direct Registration Button */}
                <a
                  href={formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-mono font-black text-sm uppercase tracking-widest text-zinc-950 shadow-2xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] group cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
                    boxShadow: "0 10px 30px rgba(245, 158, 11, 0.4)",
                  }}
                >
                  <span>REGISTER FOR WORKSHOP</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <p className="text-[11px] font-mono text-center text-zinc-400 mt-2.5">
                  ⚡ Official Registration via Google Forms · Open to all students
                </p>
              </div>
            </div>
          </div>

          {/* Highlights Mini Grid Bottom */}
          <div className="mt-10 pt-8 border-t border-zinc-800/80 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <div
                  key={i}
                  className="bg-zinc-950/50 border border-zinc-800/60 rounded-xl p-3 flex flex-col justify-between"
                >
                  <Icon className="w-5 h-5 text-amber-400 mb-2" />
                  <div className="text-[11px] font-bold text-zinc-200 uppercase leading-snug">
                    {h.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
