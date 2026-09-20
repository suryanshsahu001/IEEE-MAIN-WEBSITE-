import { X, Loader } from "lucide-react";
import { useState } from "react";

function isVideoUrl(url) {
  if (!url) return false;
  return (
    url.endsWith(".mov") ||
    url.endsWith(".mp4") ||
    url.endsWith(".webm") ||
    url.includes("/videos/") ||
    url.includes("videos/")
  );
}

export default function VideoModal({ video, onClose }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!video) return null;

  const url = video.url;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/70 text-white hover:bg-red-700 transition-colors"
          aria-label="Close video"
        >
          <X className="w-5 h-5" />
        </button>

        {isVideoUrl(url) ? (
          /* Wrap in a 16:9 aspect container so modal never collapses */
          <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
            {/* Loading spinner */}
            {loading && !error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 z-10">
                <Loader className="w-10 h-10 text-zinc-400 animate-spin mb-3" />
                <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">Loading video…</p>
              </div>
            )}
            {/* Error state */}
            {error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 z-10 px-6 text-center">
                <p className="text-zinc-300 font-bold text-lg mb-2">Unable to play video</p>
                <p className="text-zinc-500 text-sm">The video file could not be loaded. Please check the file exists on the server.</p>
              </div>
            )}
            <video
              src={url}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-contain bg-black transform-gpu will-change-transform"
              onLoadedData={() => setLoading(false)}
              onError={(e) => { 
                console.error("Video load error:", e);
                setLoading(false); 
                setError(true); 
              }}
            >
              Your browser does not support video playback.
            </video>
          </div>
        ) : (
          <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
            <iframe
              src={
                url.includes("youtube.com/embed")
                  ? `${url}${url.includes("?") ? "&" : "?"}autoplay=1`
                  : url
              }
              title={video.title}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Video title bar */}
        {video.title && (
          <div className="px-5 py-3 border-t border-zinc-800 bg-zinc-950">
            <p className="text-white text-sm font-bold tracking-wide truncate">{video.title}</p>
          </div>
        )}
      </div>
    </div>
  );
}