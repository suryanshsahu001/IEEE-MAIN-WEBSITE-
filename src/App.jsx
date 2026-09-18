import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Highlights from "./components/Highlights.jsx";
import Chapters from "./components/Chapters.jsx";
import Events from "./components/Events.jsx";
import Gallery from "./components/Gallery.jsx";
import ExtraMoments from "./components/ExtraMoments.jsx";
import Team from "./components/Team.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import VideoModal from "./components/VideoModal.jsx";
import RegistrationPopup from "./components/RegistrationPopup.jsx";
import Notification from "./components/Notification.jsx";

export default function App() {
  const [video, setVideo] = useState(null);
  const [chaptersOpen, setChaptersOpen] = useState(false);

  const openVideo = (url, title) => setVideo({ url, title });

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-tan-500 selection:text-white font-sans relative">
      <Navbar onOpenChapters={() => setChaptersOpen(true)} />
      <Notification />
      <main>
        <Hero onOpenVideo={openVideo} />
        <About />
        <Highlights onOpenVideo={openVideo} />
        <Events />
        <Gallery onOpenVideo={openVideo} />
        <ExtraMoments onOpenVideo={openVideo} />
        <Team />
        <Contact />
      </main>
      <Footer />
      
      {/* Modals */}
      <VideoModal video={video} onClose={() => setVideo(null)} />
      <RegistrationPopup />
      {chaptersOpen && <Chapters onClose={() => setChaptersOpen(false)} />}
    </div>
  );
}