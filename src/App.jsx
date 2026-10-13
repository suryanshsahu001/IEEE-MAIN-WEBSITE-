import { useState, useCallback, lazy, Suspense } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import JoinMembership from "./components/JoinMembership.jsx";
import About from "./components/About.jsx";
import Highlights from "./components/Highlights.jsx";
import Events from "./components/Events.jsx";
import Gallery from "./components/Gallery.jsx";
import ExtraMoments from "./components/ExtraMoments.jsx";
import Team from "./components/Team.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

// Lazy-load interactive modals only when opened
const VideoModal = lazy(() => import("./components/VideoModal.jsx"));
const Chapters = lazy(() => import("./components/Chapters.jsx"));

export default function App() {
  const [video, setVideo] = useState(null);
  const [chaptersOpen, setChaptersOpen] = useState(false);

  const openVideo = useCallback((url, title) => setVideo({ url, title }), []);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-tan-500 selection:text-white font-sans relative">
      <Navbar onOpenChapters={() => setChaptersOpen(true)} />
      <main>
        <Hero onOpenVideo={openVideo} />
        <JoinMembership />
        <About />
        <Highlights onOpenVideo={openVideo} />
        <Events />
        <Gallery onOpenVideo={openVideo} />
        <ExtraMoments onOpenVideo={openVideo} />
        <Team />
        <Contact />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <VideoModal video={video} onClose={() => setVideo(null)} />
        {chaptersOpen && <Chapters onClose={() => setChaptersOpen(false)} />}
      </Suspense>
    </div>
  );
}