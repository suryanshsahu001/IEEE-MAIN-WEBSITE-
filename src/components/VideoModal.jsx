import { X } from "lucide-react";

function isVideoUrl(url) {
  return (
    url.endsWith(".mov") ||
    url.endsWith(".mp4") ||
    url.endsWith(".webm") ||
    url.startsWith("/videos")
  );
}

export default function VideoModal({ video, onClose }) {
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
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/70 text-white hover:bg-tan-600 transition-colors"
          aria-label="Close video"
        >
          <X className="w-5 h-5" />
        </button>

        {isVideoUrl(url) ? (
          <video
            controls
            muted
            autoPlay
            playsInline
            loop
            preload="auto"
            className="w-full h-auto max-h-[75vh] object-contain"
          >
            <source
              src={url}
              type={
                url.endsWith(".webm")
                  ? "video/webm"
                  : url.endsWith(".mov")
                  ? "video/mp4"
                  : "video/mp4"
              }
            />
            Your browser does not support video playback.
          </video>
        ) : (
          <div className="relative w-full pt-[56.25%]">
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
      </div>
    </div>
  );
}