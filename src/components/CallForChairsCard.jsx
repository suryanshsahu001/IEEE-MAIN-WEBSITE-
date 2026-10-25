import {
  Calendar,
  Clock,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { callForChairsConfig } from "../callForChairsData.js";

export default function CallForChairsCard({ onExplore }) {
  const deadlineDate = new Date(callForChairsConfig.deadlineISO);
  const isExpired = new Date() > deadlineDate;

  return (
    <section id="call-for-chairs" className="py-10 bg-zinc-100/70 border-b border-zinc-200 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="relative bg-white border-2 border-zinc-200 hover:border-zinc-900 transition-all duration-300 rounded-2xl p-6 sm:p-10 shadow-sm hover:shadow-xl overflow-hidden group">
          {/* Top highlight bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1.5"
            style={{
              background:
                "linear-gradient(90deg, #A51C30 0%, #e11d48 50%, #A51C30 100%)",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-8">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full text-white shadow-sm"
                  style={{ background: "#A51C30" }}
                >
                  <Sparkles className="w-3 h-3 text-red-200" />
                  {callForChairsConfig.badge}
                </span>

                <span className="text-[11px] font-mono font-semibold text-zinc-500 uppercase tracking-wider">
                  {callForChairsConfig.organization}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight uppercase leading-none mb-3">
                CALL FOR <span style={{ color: "#A51C30" }}>CHAIRS</span> – IEEE SB ADYPU
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-5 max-w-3xl">
                {callForChairsConfig.cardDescription}
              </p>

              {/* Eligibility Notice */}
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-950 font-medium">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-[#A51C30]" />
                <span>
                  <strong>Eligibility:</strong> Only students with a valid IEEE
                  membership are eligible to apply. Students without an active
                  IEEE membership cannot apply for these positions.
                </span>
              </div>
            </div>

            {/* Right Meta & Action Column */}
            <div className="lg:col-span-4 flex flex-col justify-between bg-zinc-50 border border-zinc-200 rounded-xl p-5 sm:p-6 space-y-5">
              <div>
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 mb-1">
                  Application Deadline
                </div>
                <div className="flex items-center gap-2 text-zinc-900 text-lg sm:text-xl font-extrabold uppercase">
                  <Calendar className="w-4 h-4 text-[#A51C30]" />
                  <span>{callForChairsConfig.deadlineFormatted}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{callForChairsConfig.deadlineTime}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-200">
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 mb-1">
                  Eligibility Criteria
                </div>
                <div className="text-xs font-bold text-zinc-800 uppercase tracking-wide">
                  {callForChairsConfig.eligibilityShort}
                </div>
              </div>

              <button
                onClick={onExplore}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-mono font-bold text-xs uppercase tracking-widest text-white shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
                style={{
                  background: isExpired
                    ? "#71717a"
                    : "linear-gradient(135deg, #A51C30 0%, #801020 100%)",
                  boxShadow: isExpired ? "none" : "0 8px 25px rgba(165, 28, 48, 0.35)",
                }}
              >
                <span>{isExpired ? "View Positions (Closed)" : "Explore Positions / Apply Now"}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
