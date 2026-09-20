import { useState } from "react";
import { X } from "lucide-react";
import { team, mentors, communityMembers } from "../data.js";

export default function Team() {
  const [mentorsOpen, setMentorsOpen] = useState(false);
  const [ourCommunityOpen, setOurCommunityOpen] = useState(false);

  return (
    <>
      {/* ── Our Mentors Section ── */}
      <section className="bg-zinc-50 font-sans py-14 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="h-0.5 w-10" style={{ background: "#A51C30" }} />
                <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-zinc-500">
                  Faculty Advisors
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 uppercase tracking-tight">
                Our Mentors
              </h2>
            </div>

            {/* Dropdown toggle button */}
            <button
              onClick={() => setMentorsOpen((prev) => !prev)}
              aria-expanded={mentorsOpen}
              className="flex items-center gap-2 px-5 py-3 border-2 font-mono font-bold text-xs tracking-[0.15em] uppercase transition-all duration-200 self-start sm:self-auto"
              style={{
                borderColor: "#A51C30",
                color: mentorsOpen ? "#fff" : "#A51C30",
                background: mentorsOpen ? "#A51C30" : "transparent",
              }}
            >
              {mentorsOpen ? "Hide" : "View"} Mentors
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: mentorsOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>

          {/* Collapsible mentor cards */}
          <div
            style={{
              maxHeight: mentorsOpen ? "1200px" : "0px",
              overflow: "hidden",
              transition: "max-height 0.6s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-10 max-w-2xl">
              {mentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="group overflow-hidden border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                <div className="relative overflow-hidden bg-zinc-100" style={{ aspectRatio: "3/4" }}>
                    <img
                      src={mentor.photo}
                      alt={mentor.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      style={{ display: "block", width: "100%", height: "100%" }}
                    />
                  </div>
                  <div className="p-3 sm:p-5 border-t-2" style={{ borderColor: "#A51C30" }}>
                    <div
                      className="text-[9px] sm:text-[11px] font-mono font-bold tracking-[0.15em] uppercase mb-1"
                      style={{ color: "#A51C30" }}
                    >
                      Faculty Mentor
                    </div>
                    <h3 className="text-xs sm:text-base font-extrabold text-zinc-900 uppercase tracking-wide leading-tight">
                      {mentor.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Executive Leadership Section ── */}
      <section id="team" className="bg-white font-sans py-20 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-0.5 w-10" style={{ background: "#A51C30" }} />
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-zinc-500">
              Executive Leadership
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 uppercase tracking-tight mb-10">
            Meet The Team
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {team.map((member) => (
              <div
                key={member.id}
                className="group overflow-hidden border border-zinc-200 bg-zinc-50"
              >
                <div className="relative overflow-hidden aspect-[4/5] bg-white">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="p-5">
                  <div className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-zinc-400 mb-1">
                    {member.domain}
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-1 uppercase">
                    {member.name}
                  </h3>
                  <div className="text-sm font-semibold" style={{ color: "#A51C30" }}>
                    {member.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Our Community Button */}
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setOurCommunityOpen(true)}
              className="px-8 py-4 border-2 font-mono font-bold text-sm tracking-[0.15em] uppercase transition-all duration-200 hover:bg-zinc-900 hover:text-white hover:border-zinc-900"
              style={{
                borderColor: "#A51C30",
                color: "#A51C30",
              }}
            >
              Our Community
            </button>
          </div>
        </div>
      </section>

      {/* Our Community Full Screen Modal */}
      {ourCommunityOpen && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-fadeIn font-sans">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <button
              onClick={() => setOurCommunityOpen(false)}
              className="mb-8 flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-wider"
            >
              <X className="w-5 h-5" /> Back to Team
            </button>
            <div className="flex items-center gap-4 mb-3">
              <div className="h-0.5 w-10" style={{ background: "#A51C30" }} />
              <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-zinc-500">
                Community Members
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 mb-10 tracking-tight uppercase">
              Our Community
            </h1>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {communityMembers.map((member, i) => (
                <div key={i} className="group overflow-hidden border border-zinc-200 bg-zinc-50 flex flex-col rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-zinc-100 flex items-center justify-center relative overflow-hidden">
                    <img 
                      src={member.photo} 
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-4 text-center border-t border-zinc-200 bg-white">
                    <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wide">{member.name}</h3>
                    <div className="text-[9px] font-mono font-bold tracking-widest uppercase text-red-700 mt-1">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}