import { MapPin, Mail } from "lucide-react";
import { LinkedinIcon, InstagramIcon } from "./icons.jsx";
import { siteConfig } from "../data.js";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-4">
            <a href="#home" className="flex items-center gap-4 mb-4">
              <img
                src="/logos/ieee-stb-logo.png"
                alt="IEEE STB Logo"
                className="h-10 w-auto object-contain"
              />
              <div>
                <div className="font-bold text-sm text-white">
                  {siteConfig.subtitle}
                </div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                  {siteConfig.code}
                </div>
              </div>
            </a>

            <div className="flex items-center gap-3">
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white hover:border-zinc-400 transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white hover:border-zinc-400 transition-all"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-2 text-xs text-zinc-400 pt-1">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-3">
              Location
            </h4>
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-tan-500 shrink-0 mt-0.5" />
              <span>{siteConfig.address}</span>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
              Contact Emails
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-zinc-300">
              {siteConfig.emails.map((email, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-tan-500 shrink-0" />
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-tan-400 transition-colors uppercase font-mono tracking-tight"
                  >
                    {email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono uppercase tracking-widest text-zinc-500">
          <span>
            © {new Date().getFullYear()} {siteConfig.name} · IEEE Student
            Branch
          </span>
          <span>STB60205406 · IEEE Maharashtra Section</span>
        </div>
      </div>
    </footer>
  );
}