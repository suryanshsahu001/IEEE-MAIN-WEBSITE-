import { useState, useCallback } from "react";
import { Play, X } from "lucide-react";
import { gallery } from "../data.js";

export default function Gallery({ onOpenVideo }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openEvent = useCallback((item) => setSelectedEvent(item), []);
  const closeEvent = useCallback(() => setSelectedEvent(null), []);

  return (
    <>
      <section
        id="gallery"
        className="bg-zinc-50 font-sans border-t border-zinc-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 py-12 md:py-20">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-0.5 w-10" style={{ background: "#A51C30" }} />
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-zinc-500">
              Photos &amp; Videos
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 uppercase tracking-tight leading-none mb-10">
            Capturing
            <br />
            <span style={{ color: "#A51C30" }}>Campus Moments</span>
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden bg-zinc-100 border border-zinc-200 flex flex-col cursor-pointer rounded-lg hover:shadow-lg transition-shadow duration-300"
                onClick={() => openEvent(item)}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {item.video && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-block bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono font-bold tracking-widest uppercase rounded-sm shadow-sm">
                        Video
                      </span>
                    </div>
                  )}
                  {item.video && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenVideo(item.video, item.title);
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                      aria-label={`Play ${item.title}`}
                    >
                      <span className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-xl hover:scale-110 transition-transform border border-zinc-200">
                        <Play className="w-5 h-5 ml-0.5 fill-zinc-900 text-zinc-900" />
                      </span>
                    </button>
                  )}
                  {/* Hover overlay for non-video items */}
                  {!item.video && (
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </div>

                <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <div className="text-[8px] sm:text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-zinc-400 mb-1.5">
                      {item.category} · {item.date}
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-zinc-900 mb-1.5 leading-snug">
                      {item.title}
                    </h3>
                    <p className="hidden sm:block text-xs text-zinc-500 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  {(item.report || item.video) && (
                    <div className="mt-3 pt-3 border-t border-zinc-100">
                      <span
                        className="text-[10px] font-mono font-bold tracking-widest uppercase"
                        style={{ color: "#A51C30" }}
                      >
                        {item.report ? "View Report →" : "Watch Video →"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Screen Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-fadeIn font-sans">
          <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 sm:py-12">
            <button
              onClick={closeEvent}
              className="mb-8 flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-wider"
            >
              <X className="w-5 h-5" /> Back to Gallery
            </button>
            <div className="aspect-video w-full overflow-hidden bg-zinc-100 mb-8 border border-zinc-200 shadow-sm rounded-lg">
              <img
                src={selectedEvent.url}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span
                className="text-xs font-mono font-bold tracking-[0.2em] uppercase"
                style={{ color: "#A51C30" }}
              >
                {selectedEvent.category}
              </span>
              <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-zinc-300">
                ·
              </span>
              <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-zinc-500">
                {selectedEvent.date}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 mb-6 tracking-tight">
              {selectedEvent.title}
            </h1>
            <p className="text-lg text-zinc-600 leading-relaxed mb-6">
              {selectedEvent.description}
            </p>

            {selectedEvent.report && (
              <div className="mt-12 pt-8 border-t border-zinc-200">
                <h2 className="text-2xl font-bold text-zinc-900 mb-4 uppercase">Workshop Report</h2>
                <div className="space-y-8 text-zinc-700">
                  <section>
                    <h3 className="text-lg font-bold mb-2" style={{ color: "#A51C30" }}>Introduction</h3>
                    <p className="leading-relaxed">{selectedEvent.report.introduction}</p>
                  </section>
                  <section>
                    <h3 className="text-lg font-bold mb-2" style={{ color: "#A51C30" }}>Objectives</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedEvent.report.objectives.map((obj, i) => (
                        <li key={i} className="leading-relaxed">{obj}</li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <h3 className="text-lg font-bold mb-2" style={{ color: "#A51C30" }}>Speakers</h3>
                    <p className="leading-relaxed">{selectedEvent.report.speakers}</p>
                  </section>
                  <section>
                    <h3 className="text-lg font-bold mb-2" style={{ color: "#A51C30" }}>Impact &amp; Outcomes</h3>
                    <p className="leading-relaxed">{selectedEvent.report.impact}</p>
                  </section>
                  <section>
                    <h3 className="text-lg font-bold mb-4" style={{ color: "#A51C30" }}>Event Photos</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {selectedEvent.report.photos.map((photo, i) => (
                        <div key={i} className="aspect-square bg-zinc-200 border border-zinc-300 relative overflow-hidden group rounded-md">
                          <img
                            src={photo}
                            alt={`${selectedEvent.title} Photo ${i + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            )}

            {selectedEvent.video && (
              <div className="mt-10">
                <button
                  onClick={() => onOpenVideo(selectedEvent.video, selectedEvent.title)}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white font-mono font-bold text-sm hover:bg-zinc-800 transition-colors tracking-widest uppercase shadow-md rounded-md"
                >
                  <Play className="w-4 h-4 fill-white" /> Watch Video
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}