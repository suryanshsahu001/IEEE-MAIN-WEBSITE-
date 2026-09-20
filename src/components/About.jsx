import { siteConfig } from "../data.js";

export default function About() {
  return (
    <section id="about" className="bg-white font-sans py-12 md:py-20 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="h-0.5 w-10" style={{ background: "#A51C30" }} />
              <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-zinc-500">
                About Us
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 uppercase tracking-tight leading-none mb-6">
              The IEEE Student{" "}
              <span style={{ color: "#A51C30" }}>Branch</span> of{" "}
              <span style={{ color: "#A51C30" }}>ADYPU</span>
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-6">
              {siteConfig.name} — {siteConfig.code}. {siteConfig.tagline}
            </p>
            <p className="text-zinc-600 leading-relaxed">
              The IEEE Student Branch at Ajeenkya DY Patil University drives
              innovation, research, technical workshops, and professional
              student leadership for its members and the wider campus
              community.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {siteConfig.stats.map((stat) => (
              <div
                key={stat.label}
                className="p-8 border border-zinc-200 bg-zinc-50 hover:bg-white hover:shadow-sm transition-all duration-300"
              >
                <div className="text-3xl sm:text-5xl font-extrabold text-zinc-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-zinc-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}