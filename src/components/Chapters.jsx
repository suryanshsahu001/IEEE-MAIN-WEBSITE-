import { Cpu, Users, Bot, Activity, X } from "lucide-react";
import { chapters } from "../data.js";

const iconMap = { cpu: Cpu, users: Users, bot: Bot, activity: Activity };

export default function Chapters({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-fadeIn font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <button
          onClick={onClose}
          className="mb-8 flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-wider"
        >
          <X className="w-5 h-5" /> Back
        </button>
        <div className="flex items-center gap-4 mb-3">
          <div className="h-0.5 w-10" style={{ background: "#A51C30" }} />
          <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-zinc-500">
            Technical Societies
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 uppercase tracking-tight mb-10">
          Student Branch Chapters
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {chapters.map((chapter) => {
            const Icon = iconMap[chapter.icon] || Cpu;
            return (
              <div
                key={chapter.id}
                className="group p-6 border border-zinc-200 bg-white hover:border-zinc-900 transition-colors flex flex-col"
              >
                <div
                  className="w-11 h-11 flex items-center justify-center mb-5 border border-zinc-200"
                  style={{ color: "#A51C30" }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-zinc-400 mb-1">
                  {chapter.acronym}
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-2">
                  {chapter.name}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed flex-1 mb-4">
                  {chapter.description}
                </p>
                <div className="text-[11px] font-mono font-bold tracking-widest uppercase text-zinc-400">
                  {chapter.members}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}