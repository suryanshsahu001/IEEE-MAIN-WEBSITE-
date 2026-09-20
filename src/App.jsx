import { useState, useCallback, lazy, Suspense } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Notification from "./components/Notification.jsx";

// Lazy-load below-fold components
const Highlights = lazy(() => import("./components/Highlights.jsx"));
const Events = lazy(() => import("./components/Events.jsx"));
const Gallery = lazy(() => import("./components/Gallery.jsx"));
const ExtraMoments = lazy(() => import("./components/ExtraMoments.jsx"));
const Team = lazy(() => import("./components/Team.jsx"));
const Contact = lazy(() => import("./components/Contact.jsx"));
const Footer = lazy(() => import("./components/Footer.jsx"));
const VideoModal = lazy(() => import("./components/VideoModal.jsx"));
const RegistrationPopup = lazy(() => import("./components/RegistrationPopup.jsx"));
const Chapters = lazy(() => import("./components/Chapters.jsx"));

export default function App() {
  const [video, setVideo] = useState(null);
  const [chaptersOpen, setChaptersOpen] = useState(false);

  const openVideo = useCallback((url, title) => setVideo({ url, title }), []);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-tan-500 selection:text-white font-sans relative">
      <Navbar onOpenChapters={() => setChaptersOpen(true)} />
      <Notification />
      <main>
        <Hero onOpenVideo={openVideo} />
        <About />
        <Suspense fallback={<div className="min-h-[50dvh]" />}>
          <Highlights onOpenVideo={openVideo} />
          <Events />
          <Gallery onOpenVideo={openVideo} />
          <ExtraMoments onOpenVideo={openVideo} />
          <Team />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <VideoModal video={video} onClose={() => setVideo(null)} />
        <RegistrationPopup />
        {chaptersOpen && <Chapters onClose={() => setChaptersOpen(false)} />}
      </Suspense>
    </div>
  );
}