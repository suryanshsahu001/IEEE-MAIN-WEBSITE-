import { useState } from "react";
import { Play, X, ZoomIn } from "lucide-react";
import { extraMoments } from "../data.js";

export default function ExtraMoments({ onOpenVideo }) {
  const [selected, setSelected] = useState(null);

  const close = () => setSelected(null);

  return (
    <section
      id="extra-moments"
      className="bg-white font-sans py-20 border-t border-zinc-100"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center gap-4 mb-3">
          <div className="h-0.5 w-10" style={{ background: "#A51C30" }} />
          <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-zinc-500">
            Bloopers & Achievements
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 uppercase tracking-tight leading-none mb-10">
          Some Extra
          <br />
          <span style={{ color: "#A51C30" }}>Moments</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {extraMoments.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden bg-zinc-100 border border-zinc-200 flex flex-col"
            >
              <div className="relative overflow-hidden">
                {item.video ? (
                  <button
                    onClick={() => onOpenVideo(item.video, item.title)}
                    className="block w-full cursor-pointer"
                    aria-label={`Play ${item.title}`}
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </button>
                ) : (
                  <button
                    onClick={() => setSelected(item)}
                    className="block w-full cursor-pointer"
                    aria-label={`View ${item.title}`}
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </button>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                {item.video ? (
                  <div className="absolute top-0 left-0">
                    <span className="inline-block bg-white/95 px-3 py-1 text-[11px] font-mono font-bold tracking-widest uppercase">
                      Video
                    </span>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-xl border border-zinc-200">
                      <ZoomIn className="w-5 h-5 text-zinc-900" />
                    </span>
                  </div>
                )}
                {item.video && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-xl border border-zinc-200">
                      <Play className="w-5 h-5 ml-0.5 fill-zinc-900 text-zinc-900" />
                    </span>
                  </div>
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
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photo lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md animate-fadeIn"
          onClick={close}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/70 text-white hover:bg-tan-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selected.url}
              alt={selected.title}
              className="w-full max-h-[85vh] object-contain bg-zinc-900"
            />
            <div className="pt-3 pb-1 text-center">
              <div className="text-base font-bold text-white">
                {selected.title}
              </div>
              <div className="text-[11px] font-mono tracking-widest uppercase text-zinc-400 mt-1">
                {selected.category} · {selected.date}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}