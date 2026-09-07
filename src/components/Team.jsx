import { team } from "../data.js";

export default function Team() {
  return (
    <section id="team" className="bg-white font-sans py-20 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center gap-4 mb-3">
          <div className="h-0.5 w-10" style={{ background: "#A51C30" }} />
          <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-zinc-500">
            Executive Leadership
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 uppercase tracking-tight mb-10">
          Meet The Team
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {team.map((member) => (
            <div
              key={member.id}
              className="group overflow-hidden border border-zinc-200 bg-zinc-50"
            >
              <div className="relative overflow-hidden aspect-square bg-zinc-100">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-5">
                <div className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-zinc-400 mb-1">
                  {member.domain}
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-1 uppercase">
                  {member.name}
                </h3>
                <div className="text-sm font-semibold" style={{ color: "#A51C30" }}>
                  {member.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}