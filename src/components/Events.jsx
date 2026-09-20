import { useState, useEffect } from "react";
import { Calendar, Users, ArrowUpRight, X, Play } from "lucide-react";
import { events } from "../data.js";

const statusStyles = {
  upcoming: { label: "UPCOMING", color: "#A51C30" },
  ongoing: { label: "ONGOING", color: "#15803d" },
  completed: { label: "COMPLETED", color: "#71717a" },
};

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('event');
    if (eventId) {
      const event = events.find(e => e.id === eventId);
      if (event) setSelectedEvent(event);
    }
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
    return () => document.body.classList.remove("scroll-lock");
  }, [selectedEvent]);

  return (
    <>
    <section id="events" className="bg-white font-sans py-12 md:py-20 border-t border-zinc-100">
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
                onClick={() => window.open(window.location.pathname + '?event=' + event.id, '_blank')}
                className="group relative flex flex-col border border-zinc-200 bg-white hover:border-zinc-400 transition-all duration-300 overflow-hidden cursor-pointer transform-gpu will-change-transform hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 rounded-xl"
              >
                <div className="h-48 sm:h-56 w-full relative overflow-hidden bg-zinc-100">
                  <img src={event.image || './gallery/ieee-day.jpg'} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 transform-gpu will-change-transform group-hover:scale-105" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span
                      className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md"
                      style={{ backgroundColor: status.color, color: 'white' }}
                    >
                      {status.label}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-white/90">
                      {event.category}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col flex-1 p-6 sm:p-8 bg-white">

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
                    {event.capacity && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 shrink-0" style={{ color: "#A51C30" }} />
                        <span>{event.capacity}</span>
                      </div>
                    )}
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

    {/* Event Full Screen Modal */}
    {selectedEvent && (
      <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-fadeIn font-sans">
        <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 sm:py-12">
          <button
            onClick={() => {
              setSelectedEvent(null);
              window.history.pushState({}, '', window.location.pathname);
            }}
            className="mb-8 flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-wider"
          >
            <X className="w-5 h-5" /> Back to Events
          </button>
          
          <div className="flex items-center gap-4 mb-6">
            <span
              className="text-xs font-mono font-bold tracking-[0.2em] uppercase px-3 py-1 border"
              style={{ color: statusStyles[selectedEvent.status]?.color || '#71717a', borderColor: statusStyles[selectedEvent.status]?.color || '#71717a' }}
            >
              {selectedEvent.category} · {statusStyles[selectedEvent.status]?.label || 'COMPLETED'}
            </span>
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-zinc-500">
              <Calendar className="w-4 h-4 inline-block mr-1 -mt-0.5" />
              {selectedEvent.date}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-zinc-900 uppercase tracking-tight mb-8">
            {selectedEvent.title}
          </h1>

          <div className="grid md:grid-cols-3 gap-12 mb-12 border-b border-zinc-200 pb-12">
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold text-zinc-900 mb-4" style={{ color: "#A51C30" }}>About the Event</h3>
              <p className="text-lg text-zinc-600 leading-relaxed mb-6">
                {selectedEvent.description}
              </p>
              {selectedEvent.registrationOpen && (
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScLbWDK-yv6k8avB69VknoTwUq7y2hUxL5unjteCaASlu4aMw/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 text-white font-mono font-bold text-sm tracking-widest uppercase shadow-md hover:bg-zinc-800 transition-colors"
                >
                  Register Now <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-4 border-b border-zinc-200 pb-2">Event Details</h3>
              <ul className="space-y-4 text-sm text-zinc-600">
                <li>
                  <span className="block text-[10px] font-mono font-bold tracking-widest uppercase text-zinc-400 mb-1">Speaker / Organizer</span>
                  <span className="font-semibold text-zinc-900">{selectedEvent.speaker}</span>
                  <span className="block text-xs mt-0.5">{selectedEvent.speakerTitle}</span>
                </li>
                <li>
                  <span className="block text-[10px] font-mono font-bold tracking-widest uppercase text-zinc-400 mb-1">Venue</span>
                  <span className="font-medium">{selectedEvent.venue}</span>
                </li>
                {selectedEvent.capacity && (
                  <li>
                    <span className="block text-[10px] font-mono font-bold tracking-widest uppercase text-zinc-400 mb-1">Capacity</span>
                    <span className="font-medium">{selectedEvent.capacity}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-zinc-900 uppercase tracking-tight mb-6">Event Gallery & Media</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-zinc-100 border border-zinc-200 flex items-center justify-center relative group overflow-hidden">
                <div className="text-xs font-mono font-bold text-zinc-400">MEDIA {i+1}</div>
                {i === 0 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Play className="w-8 h-8 fill-white text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    )}
    </>
  );
}