import { Mail } from "lucide-react";
import { LinkedinIcon, InstagramIcon } from "./icons.jsx";
import { siteConfig } from "../data.js";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-zinc-950 text-white font-sans py-20 border-t border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          <div className="max-w-lg">
            <span
              className="inline-block text-[10px] font-mono font-bold tracking-[0.22em] uppercase px-3 py-1 border-l-2 text-white/60 mb-6"
              style={{ borderColor: "#A51C30" }}
            >
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight mb-4">
              Join IEEE
              <br />
              <span style={{ color: "#A51C30" }}>ADYPU</span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
              Ready to be part of something bigger? Reach out to join
              workshops, hackathons, and become a member of IEEE ADYPU Student
              Branch.
            </p>
          </div>

          <div className="flex flex-col gap-4 shrink-0">
            <a
              href={`mailto:${siteConfig.joinEmail}`}
              className="inline-flex items-center gap-3 px-8 py-4 font-mono text-sm font-bold tracking-widest uppercase text-white border border-white/20 hover:border-white hover:bg-white/5 transition-all"
              style={{ letterSpacing: "0.14em" }}
            >
              <Mail className="w-4 h-4" style={{ color: "#A51C30" }} />
              {siteConfig.joinEmail}
            </a>
            <div className="flex gap-3">
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-bold tracking-widest uppercase text-zinc-300 border border-zinc-700 hover:border-zinc-400 hover:text-white transition-all"
              >
                <LinkedinIcon className="w-4 h-4" style={{ color: "#A51C30" }} />
                LinkedIn
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-bold tracking-widest uppercase text-zinc-300 border border-zinc-700 hover:border-zinc-400 hover:text-white transition-all"
              >
                <InstagramIcon className="w-4 h-4" style={{ color: "#A51C30" }} />
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}