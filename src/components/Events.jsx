import { Calendar, Clock, MapPin, Users, ArrowUpRight } from "lucide-react";
import { events } from "../data.js";

const statusStyles = {
  upcoming: { label: "UPCOMING", color: "#A51C30" },
  ongoing: { label: "ONGOING", color: "#15803d" },
  completed: { label: "COMPLETED", color: "#71717a" },
};

export default function Events() {
  return (
    <section id="events" className="bg-white font-sans py-20 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center gap-4 mb-3">
          <div className="h-0.5 w-10" style={{ background: "#A51C30" }} />
          <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-zinc-500">
            Events & Programs
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 uppercase tracking-tight mb-10">
          Featured Events
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {events.map((event) => {
            const status = statusStyles[event.status] || statusStyles.completed;
            return (
              <div
                key={event.id}
                className="group relative flex flex-col border border-zinc-200 bg-zinc-50 hover:border-zinc-900 transition-colors overflow-hidden"
              >
                <span
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: "#A51C30" }}
                />
                <div className="flex flex-col flex-1 p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase px-3 py-1 border"
                      style={{ color: status.color, borderColor: status.color }}
                    >
                      {event.category} · {status.label}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 uppercase tracking-tight mb-3">
                    {event.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-sm text-zinc-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 shrink-0" style={{ color: "#A51C30" }} />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 shrink-0" style={{ color: "#A51C30" }} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 shrink-0" style={{ color: "#A51C30" }} />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 shrink-0" style={{ color: "#A51C30" }} />
                      <span>{event.capacity}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 mt-auto">
                    <div>
                      <div className="text-sm font-bold text-zinc-900">
                        {event.speaker}
                      </div>
                      <div className="text-[11px] font-mono tracking-wider uppercase text-zinc-400">
                        {event.speakerTitle}
                      </div>
                    </div>
                    {event.registrationOpen && (
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLScLbWDK-yv6k8avB69VknoTwUq7y2hUxL5unjteCaASlu4aMw/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono font-bold tracking-widest uppercase whitespace-nowrap hover:underline"
                        style={{ color: "#A51C30" }}
                      >
                        Register <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}