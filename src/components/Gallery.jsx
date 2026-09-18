import { useState } from "react";
import { Play, X } from "lucide-react";
import { gallery } from "../data.js";

export default function Gallery({ onOpenVideo }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <>
      <section
        id="gallery"
        className="bg-zinc-50 font-sans border-t border-zinc-200"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-0.5 w-10" style={{ background: "#A51C30" }} />
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-zinc-500">
              Photos & Videos
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 uppercase tracking-tight leading-none mb-10">
            Capturing
            <br />
            <span style={{ color: "#A51C30" }}>Campus Moments</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden bg-zinc-100 border border-zinc-200 flex flex-col cursor-pointer"
                onClick={() => setSelectedEvent(item)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {item.video && (
                    <div className="absolute top-0 left-0">
                      <span className="inline-block bg-white/95 px-3 py-1 text-[11px] font-mono font-bold tracking-widest uppercase">
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
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-zinc-400 mb-2">
                      {item.category} · {item.date}
                    </div>
                    <h3 className="text-base font-bold text-zinc-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Screen Details Modal ("New Page") */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-fadeIn font-sans">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <button
              onClick={() => setSelectedEvent(null)}
              className="mb-8 flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-wider"
            >
              <X className="w-5 h-5" /> Back to Gallery
            </button>
            <div className="aspect-video w-full overflow-hidden bg-zinc-100 mb-8 border border-zinc-200 shadow-sm">
              <img
                src={selectedEvent.url}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
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

            {/* Render extra report data if available */}
            {selectedEvent.report && (
              <div className="mt-12 pt-8 border-t border-zinc-200">
                <h2 className="text-2xl font-bold text-zinc-900 mb-4 uppercase">Workshop Report</h2>
                <div className="space-y-8 text-zinc-700">
                  <section>
                    <h3 className="text-lg font-bold text-zinc-900 mb-2" style={{ color: "#A51C30" }}>Introduction</h3>
                    <p className="leading-relaxed">{selectedEvent.report.introduction}</p>
                  </section>
                  <section>
                    <h3 className="text-lg font-bold text-zinc-900 mb-2" style={{ color: "#A51C30" }}>Objectives</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedEvent.report.objectives.map((obj, i) => (
                        <li key={i} className="leading-relaxed">{obj}</li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <h3 className="text-lg font-bold text-zinc-900 mb-2" style={{ color: "#A51C30" }}>Speakers</h3>
                    <p className="leading-relaxed">{selectedEvent.report.speakers}</p>
                  </section>
                  <section>
                    <h3 className="text-lg font-bold text-zinc-900 mb-2" style={{ color: "#A51C30" }}>Impact & Outcomes</h3>
                    <p className="leading-relaxed">{selectedEvent.report.impact}</p>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-bold text-zinc-900 mb-4" style={{ color: "#A51C30" }}>Event Photos</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {selectedEvent.report.photos.map((photo, i) => (
                        <div key={i} className="aspect-square bg-zinc-200 border border-zinc-300 relative overflow-hidden group">
                          <div className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-zinc-400">
                            PHOTO {i + 1}
                          </div>
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
                  onClick={() =>
                    onOpenVideo(selectedEvent.video, selectedEvent.title)
                  }
                  className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white font-mono font-bold text-sm hover:bg-zinc-800 transition-colors tracking-widest uppercase shadow-md"
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