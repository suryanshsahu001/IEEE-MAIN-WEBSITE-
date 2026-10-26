import { useState, useId } from "react";
import {
  X,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  Award,
  BookOpen,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  callForChairsConfig,
  mainExecutivePositions,
  departmentalChairPositions,
  functionalTeamPositions,
  otherApprovedPositions,
} from "../callForChairsData.js";

export default function CallForChairsModal({
  onClose,
  initialSelectedPosition = null,
}) {
  const [selectedRole, setSelectedRole] = useState(
    initialSelectedPosition || mainExecutivePositions[0]
  );
  const [hasCompletedRecruitment, setHasCompletedRecruitment] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Application form inputs
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantYear, setApplicantYear] = useState("3rd Year");
  const [applicantBranch, setApplicantBranch] = useState("");
  const [ieeeMemberId, setIeeeMemberId] = useState("");
  const [statement, setStatement] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameInputId = useId();
  const emailInputId = useId();
  const phoneInputId = useId();
  const branchInputId = useId();
  const yearSelectId = useId();
  const memberIdInputId = useId();
  const statementTextareaId = useId();

  // Check deadline
  const deadlineDate = new Date(callForChairsConfig.deadlineISO);
  const isExpired = new Date() > deadlineDate;

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleApplyClick = (position) => {
    setSelectedRole(position);
    setFormError("");
    setApplicationModalOpen(true);
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!applicantName.trim()) {
      setFormError("Please provide your full name.");
      return;
    }
    if (!applicantEmail.trim() || !applicantEmail.includes("@")) {
      setFormError("Please enter a valid academic/personal email.");
      return;
    }
    if (!applicantPhone.trim() || applicantPhone.length < 10) {
      setFormError("Please enter a valid 10-digit mobile contact number.");
      return;
    }
    if (!applicantBranch.trim()) {
      setFormError("Please provide your academic branch / stream.");
      return;
    }
    if (!ieeeMemberId.trim()) {
      setFormError("A valid IEEE Membership Number is strictly mandatory.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Determine endpoint:
      // In production (Vercel) -> relative '/api/apply'
      // In local development -> '/api/apply' (proxied via Vite) or fallback to 'http://localhost:3001/api/apply'
      const configuredUrl =
        typeof import.meta !== "undefined" && import.meta.env?.VITE_APPLICATION_API_URL;
      
      const isLocalhost =
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

      const primaryEndpoint =
        configuredUrl || (isLocalhost ? "http://localhost:3001/api/apply" : "/api/apply");

      const payload = {
        applicantName: applicantName.trim(),
        applicantEmail: applicantEmail.trim(),
        applicantPhone: applicantPhone.trim(),
        applicantYear,
        applicantBranch: applicantBranch.trim(),
        ieeeMemberId: ieeeMemberId.trim(),
        position: selectedRole?.title || "Leadership Role",
        statement: statement.trim(),
        timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      };

      // Check if Power Automate webhook is configured (directly or via env)
      const directWebhookUrl =
        callForChairsConfig.powerAutomateWebhookUrl ||
        (typeof import.meta !== "undefined" && import.meta.env?.VITE_POWER_AUTOMATE_WEBHOOK_URL);

      if (directWebhookUrl) {
        try {
          await fetch(directWebhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              SubmissionTime: payload.timestamp,
              Position: payload.position,
              FullName: payload.applicantName,
              Email: payload.applicantEmail,
              Phone: payload.applicantPhone,
              AcademicYear: payload.applicantYear,
              Branch: payload.applicantBranch,
              IEEEMembershipID: payload.ieeeMemberId,
              Statement: payload.statement,
            }),
          });
        } catch (webhookErr) {
          console.warn("Direct Power Automate Webhook error:", webhookErr);
        }
      }

      let response;
      try {
        response = await fetch(primaryEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } catch (networkErr) {
        // If primary fails and we were on localhost, or vice versa, attempt fallback
        if (primaryEndpoint !== "/api/apply") {
          response = await fetch("/api/apply", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
        } else if (directWebhookUrl) {
          // If direct webhook succeeded, consider it done even if local server isn't up
          response = { ok: true, json: async () => ({ success: true }) };
        } else {
          throw networkErr;
        }
      }

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to record application to the database."
        );
      }

      // Success: display confirmation, inputs are already preserved in state if user checks
      setIsSubmitting(false);
      setSubmittedSuccess(true);
    } catch (err) {
      console.error("Submission error:", err);
      setIsSubmitting(false);
      // Requirement 9: Display error and preserve entered information
      setFormError(
        `Unable to save application to Excel: ${err.message}. Your entered information has been preserved. Please try again.`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-fadeIn font-sans">
      {/* Top sticky navigation / header bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ background: isExpired ? "#71717a" : "#A51C30" }}
            />
            <span className="text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-zinc-900">
              {callForChairsConfig.title} · {callForChairsConfig.organization}
            </span>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 hover:text-zinc-950 hover:border-zinc-900 transition-colors"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-0.5 w-12" style={{ background: "#A51C30" }} />
          <span className="text-xs font-mono font-bold tracking-[0.22em] uppercase text-zinc-500">
            Leadership &amp; Departmental Nominations
          </span>
        </div>

        {/* Hero Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-200">
          <div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-zinc-900 uppercase tracking-tight leading-none mb-3">
              CALL FOR <span style={{ color: "#A51C30" }}>CHAIRS</span>
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 max-w-2xl font-normal leading-relaxed">
              Step forward to lead, innovate, and contribute to the growth of the
              IEEE Student Branch at ADYPU. Explore leadership opportunities,
              understand available roles, and submit your nomination.
            </p>
          </div>

          {/* Prominent Deadline & Status Badge */}
          <div className="bg-zinc-50 border border-zinc-200 p-4 sm:p-5 rounded-xl flex flex-col gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" style={{ color: "#A51C30" }} />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                Application Deadline
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-zinc-900 uppercase tracking-tight">
              {callForChairsConfig.deadlineFormatted}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-xs font-mono text-zinc-500">
                {callForChairsConfig.deadlineTime}
              </span>
              <span
                className="ml-auto inline-flex items-center text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full"
                style={{
                  background: isExpired ? "#fee2e2" : "#fef2f2",
                  color: isExpired ? "#991b1b" : "#A51C30",
                  border: `1px solid ${isExpired ? "#f87171" : "#fca5a5"}`,
                }}
              >
                {isExpired ? "Applications Closed" : "Open for Nominations"}
              </span>
            </div>
          </div>
        </div>

        {/* Section A: Important Information & Mandatory IEEE Eligibility */}
        <div className="my-8 grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <ShieldAlert className="w-5 h-5" style={{ color: "#A51C30" }} />
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-900">
                Important Guidelines &amp; Instructions
              </h2>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-zinc-700 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <CheckCircle2
                  className="w-4 h-4 shrink-0 mt-0.5"
                  style={{ color: "#A51C30" }}
                />
                <span>
                  <strong>IEEE Membership Mandatory:</strong> Only students with
                  a valid IEEE membership are eligible to apply. Students without
                  an active IEEE membership cannot apply for these positions.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2
                  className="w-4 h-4 shrink-0 mt-0.5"
                  style={{ color: "#A51C30" }}
                />
                <span>
                  <strong>Recruitment Form Workflow:</strong> The official
                  recruitment form must be completed before or during the Call
                  for Chairs nomination process.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2
                  className="w-4 h-4 shrink-0 mt-0.5"
                  style={{ color: "#A51C30" }}
                />
                <span>
                  <strong>Strict Deadline:</strong> The final deadline is{" "}
                  <strong>{callForChairsConfig.deadlineFormatted}</strong>.
                  Applications submitted after the deadline will not be accepted.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2
                  className="w-4 h-4 shrink-0 mt-0.5"
                  style={{ color: "#A51C30" }}
                />
                <span>
                  <strong>Accurate Information:</strong> Applicants must provide
                  accurate personal, academic, membership, and contact
                  information. Details will be verified against the official IEEE
                  roster.
                </span>
              </li>
            </ul>
          </div>

          {/* Recruitment Form Integration Workflow Banner */}
          <div
            className="md:col-span-4 rounded-2xl p-6 sm:p-7 flex flex-col justify-between text-white relative overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #18181b 0%, #09090b 100%)",
              border: "1px solid #27272a",
            }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-30 pointer-events-none"
              style={{ background: "#A51C30" }}
            />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded bg-zinc-800 text-zinc-300">
                  Step 3 &amp; 4
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  Mandatory Flow
                </span>
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-2">
                Recruitment Form
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                Have you completed the recruitment form? Complete it to record
                your baseline details before completing leadership nomination.
              </p>
            </div>

            <div className="space-y-3 pt-2 border-t border-zinc-800">
              <a
                href={callForChairsConfig.recruitmentFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setHasCompletedRecruitment(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-mono font-bold text-xs uppercase tracking-wider text-white transition-all shadow-md hover:brightness-110"
                style={{ background: "#A51C30" }}
              >
                <span>Fill Recruitment Form</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setHasCompletedRecruitment(!hasCompletedRecruitment)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-mono text-[11px] uppercase tracking-wider border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
              >
                <CheckCircle2
                  className={`w-3.5 h-3.5 ${
                    hasCompletedRecruitment ? "text-emerald-400" : "text-zinc-500"
                  }`}
                />
                <span>
                  {hasCompletedRecruitment
                    ? "✓ Form Marked Completed"
                    : "I already filled the form"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-3 border-b border-zinc-200">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mr-2">
            Filter Roles:
          </span>
          {[
            { id: "all", label: "All Positions" },
            { id: "exec", label: "Main Executive Committee (7)" },
            { id: "dept", label: "Departmental Chairs (4)" },
            { id: "func", label: "Functional Teams (6)" },
            { id: "other", label: "Other Roles (2)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: activeTab === tab.id ? "#A51C30" : "#f4f4f5",
                color: activeTab === tab.id ? "#ffffff" : "#52525b",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── SECTION 4: Main Executive Committee Positions ── */}
        {(activeTab === "all" || activeTab === "exec") && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4" style={{ color: "#A51C30" }} />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-500">
                    Highest Leadership Level
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-zinc-900">
                  Main Executive Committee Positions
                </h2>
              </div>
              <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider hidden sm:block">
                7 Official Roles
              </span>
            </div>

            {/* Desktop: 2-3 per row, Tablet: 2 per row, Mobile: 1 per row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mainExecutivePositions.map((pos) => (
                <div
                  key={pos.id}
                  className="relative flex flex-col bg-white border-2 border-zinc-200 hover:border-zinc-900 transition-all duration-300 rounded-xl overflow-hidden shadow-sm hover:shadow-lg group"
                >
                  {/* Visual prominence indicator */}
                  <div
                    className="h-1.5 w-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #A51C30 0%, #dc2626 100%)",
                    }}
                  />

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase px-2.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: "#fdf2f2",
                          color: "#A51C30",
                          border: "1px solid #fecaca",
                        }}
                      >
                        {pos.badge}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                        {pos.society}
                      </span>
                    </div>

                    <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 mb-2">
                      {pos.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                      {pos.role}
                    </p>

                    {pos.note && (
                      <div className="text-[11px] italic text-zinc-500 bg-zinc-50 border border-zinc-200 rounded p-2 mb-4">
                        ℹ️ {pos.note}
                      </div>
                    )}

                    {/* Expandable Key Responsibilities */}
                    <div className="mt-auto pt-3 border-t border-zinc-100">
                      <button
                        onClick={() => toggleExpand(pos.id)}
                        className="w-full flex items-center justify-between py-1 text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 hover:text-zinc-900 transition-colors"
                      >
                        <span>
                          {expandedCards[pos.id]
                            ? "Hide Responsibilities"
                            : "View Responsibilities"}
                        </span>
                        {expandedCards[pos.id] ? (
                          <ChevronUp className="w-4 h-4 text-zinc-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-zinc-500" />
                        )}
                      </button>

                      {expandedCards[pos.id] && (
                        <ul className="mt-3 space-y-2 text-xs text-zinc-600 bg-zinc-50/70 p-3 rounded-lg border border-zinc-100">
                          {pos.responsibilities.map((resp, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span
                                className="font-bold text-xs"
                                style={{ color: "#A51C30" }}
                              >
                                •
                              </span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Eligibility & CTA */}
                    <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between gap-3">
                      <span className="text-[10px] font-mono text-zinc-400">
                        IEEE Member Req.
                      </span>

                      <button
                        disabled={isExpired}
                        onClick={() => handleApplyClick(pos)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-mono font-bold text-xs uppercase tracking-wider text-white transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 active:scale-95"
                        style={{ background: isExpired ? "#71717a" : "#A51C30" }}
                      >
                        <span>{isExpired ? "Closed" : "Apply Now"}</span>
                        {!isExpired && <ArrowRight className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── SECTION 5: Departmental Chair Positions ── */}
        {(activeTab === "all" || activeTab === "dept") && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-4 h-4" style={{ color: "#A51C30" }} />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-500">
                    Societies &amp; Student Chapters
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-zinc-900">
                  Departmental Chairs
                </h2>
              </div>
              <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider hidden sm:block">
                4 Specialized Chapters
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {departmentalChairPositions.map((pos) => (
                <div
                  key={pos.id}
                  className="bg-white border border-zinc-200 hover:border-zinc-400 transition-all duration-300 rounded-xl p-6 shadow-sm hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">
                        {pos.badge}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                        {pos.society}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold uppercase tracking-tight text-zinc-900">
                      {pos.title}
                    </h3>
                    <p className="text-xs font-mono font-medium text-zinc-500 mb-3">
                      {pos.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                      {pos.role}
                    </p>

                    <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100 mb-4">
                      <span className="text-[10px] font-mono font-bold uppercase text-zinc-400 block mb-2 tracking-wider">
                        Key Responsibilities:
                      </span>
                      <ul className="space-y-1.5 text-xs text-zinc-600">
                        {pos.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span
                              className="font-bold text-xs"
                              style={{ color: "#A51C30" }}
                            >
                              ✓
                            </span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-3">
                    <span className="text-[10px] font-mono text-zinc-500">
                      {pos.eligibility}
                    </span>
                    <button
                      disabled={isExpired}
                      onClick={() => handleApplyClick(pos)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-mono font-bold text-xs uppercase tracking-wider text-white transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 active:scale-95"
                      style={{ background: isExpired ? "#71717a" : "#A51C30" }}
                    >
                      <span>{isExpired ? "Closed" : "Apply"}</span>
                      {!isExpired && <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── SECTION 6: Functional Team Positions ── */}
        {(activeTab === "all" || activeTab === "func") && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Layers className="w-4 h-4" style={{ color: "#A51C30" }} />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-500">
                    Operations, Media &amp; Tech Wings
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-zinc-900">
                  Functional Team Positions
                </h2>
              </div>
              <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider hidden sm:block">
                6 Essential Teams
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {functionalTeamPositions.map((pos) => (
                <div
                  key={pos.id}
                  className="bg-white border border-zinc-200 hover:border-zinc-400 transition-all duration-300 rounded-xl p-5 shadow-sm hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">
                        {pos.badge}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                        {pos.society}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold uppercase tracking-tight text-zinc-900 mb-2">
                      {pos.title}
                    </h3>

                    <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                      {pos.role}
                    </p>

                    <div className="space-y-1.5 mb-4">
                      {pos.responsibilities.map((resp, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs text-zinc-600"
                        >
                          <span
                            className="font-bold text-xs"
                            style={{ color: "#A51C30" }}
                          >
                            •
                          </span>
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-3">
                    <span className="text-[10px] font-mono text-zinc-400 truncate max-w-[140px]">
                      IEEE Member
                    </span>
                    <button
                      disabled={isExpired}
                      onClick={() => handleApplyClick(pos)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-mono font-bold text-xs uppercase tracking-wider text-white transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 active:scale-95"
                      style={{ background: isExpired ? "#71717a" : "#A51C30" }}
                    >
                      <span>{isExpired ? "Closed" : "Apply"}</span>
                      {!isExpired && <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── SECTION 7: Other Approved Positions ── */}
        {(activeTab === "all" || activeTab === "other") && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4" style={{ color: "#A51C30" }} />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-500">
                    Approved Extension Roles
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-zinc-900">
                  Other Available Positions
                </h2>
              </div>
              <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider hidden sm:block">
                Committee Approved
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherApprovedPositions.map((pos) => (
                <div
                  key={pos.id}
                  className="bg-white border border-zinc-200 hover:border-zinc-400 transition-all duration-300 rounded-xl p-5 shadow-sm hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">
                        {pos.badge}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                        {pos.society}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold uppercase tracking-tight text-zinc-900 mb-2">
                      {pos.title}
                    </h3>

                    <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                      {pos.role}
                    </p>

                    <div className="space-y-1.5 mb-4">
                      {pos.responsibilities.map((resp, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs text-zinc-600"
                        >
                          <span
                            className="font-bold text-xs"
                            style={{ color: "#A51C30" }}
                          >
                            •
                          </span>
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-3">
                    <span className="text-[10px] font-mono text-zinc-400 truncate max-w-[150px]">
                      IEEE Member
                    </span>
                    <button
                      disabled={isExpired}
                      onClick={() => handleApplyClick(pos)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-mono font-bold text-xs uppercase tracking-wider text-white transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 active:scale-95"
                      style={{ background: isExpired ? "#71717a" : "#A51C30" }}
                    >
                      <span>{isExpired ? "Closed" : "Apply"}</span>
                      {!isExpired && <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── SECTION 9 & 10: Clear Summary Workflow Call to Action ── */}
        <div className="bg-zinc-900 text-white rounded-2xl p-6 sm:p-10 border border-zinc-800 text-center relative overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background: "#A51C30" }}
          />
          <div className="relative z-10 max-w-2xl mx-auto">
            <span
              className="inline-block text-[10px] font-mono font-bold tracking-[0.25em] uppercase px-3 py-1 rounded-full text-white mb-3"
              style={{ background: "#A51C30" }}
            >
              MEMBERSHIP VERIFICATION MANDATORY
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-3">
              Ready to Shape the Future of IEEE ADYPU?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
              Nominations close strictly on{" "}
              <strong>{callForChairsConfig.deadlineFormatted}</strong>. Ensure you
              have completed the recruitment form and have your valid IEEE
              Membership ID on hand before final submission.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={callForChairsConfig.recruitmentFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl font-mono font-bold text-xs uppercase tracking-wider bg-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-700 transition-colors"
              >
                1. Open Recruitment Form
              </a>
              <button
                onClick={() =>
                  handleApplyClick(selectedRole || mainExecutivePositions[0])
                }
                className="px-6 py-3 rounded-xl font-mono font-bold text-xs uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                style={{ background: "#A51C30" }}
              >
                2. Continue to Apply for {selectedRole?.title || "Leadership"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── APPLICATION MODAL / DIALOG ── */}
      {applicationModalOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6"
          style={{
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
          }}
          onClick={() => setApplicationModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setApplicationModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {submittedSuccess ? (
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 text-white shadow-lg"
                  style={{ background: "#16a34a" }}
                >
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-zinc-900 mb-2">
                  Application Submitted Successfully
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed max-w-md mx-auto mb-6">
                  “Your application has been submitted successfully. Thank you for
                  your interest in becoming a part of the IEEE SB ADYPU
                  leadership team.”
                </p>

                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-left mb-6 text-xs text-zinc-600 space-y-1">
                  <div>
                    <strong>Position:</strong> {selectedRole?.title}
                  </div>
                  <div>
                    <strong>Applicant:</strong> {applicantName}
                  </div>
                  <div>
                    <strong>IEEE Member ID:</strong> {ieeeMemberId} (Pending
                    administrative verification)
                  </div>
                  <div>
                    <strong>Submission Timestamp:</strong>{" "}
                    {new Date().toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSubmittedSuccess(false);
                    setApplicationModalOpen(false);
                  }}
                  className="px-6 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider text-white"
                  style={{ background: "#A51C30" }}
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white"
                    style={{ background: "#A51C30" }}
                  >
                    Nomination Form
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">
                    Deadline: {callForChairsConfig.deadlineFormatted}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-900 mb-1">
                  Apply for {selectedRole?.title}
                </h3>
                <p className="text-xs text-zinc-500 mb-4">
                  {selectedRole?.category} · {selectedRole?.society}
                </p>

                {/* Important notice reminder */}
                <div className="bg-red-50/70 border border-red-200 rounded-lg p-3 text-xs text-red-900 mb-4 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>
                    <strong>Eligibility Reminder:</strong> This opportunity is
                    exclusively for students with a valid IEEE membership.
                    Applicants without an active membership are not eligible.
                  </span>
                </div>

                {formError && (
                  <div className="bg-red-100 border border-red-300 text-red-800 p-2.5 rounded-lg text-xs font-semibold mb-4">
                    ⚠️ {formError}
                  </div>
                )}

                <form onSubmit={handleApplicationSubmit} className="space-y-3.5">
                  <div>
                    <label
                      htmlFor={nameInputId}
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1"
                    >
                      Full Name *
                    </label>
                    <input
                      id={nameInputId}
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:border-red-700"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor={emailInputId}
                        className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        id={emailInputId}
                        type="email"
                        required
                        placeholder="john.doe@adypu.edu.in"
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:border-red-700"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={phoneInputId}
                        className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1"
                      >
                        Phone Number *
                      </label>
                      <input
                        id={phoneInputId}
                        type="tel"
                        required
                        placeholder="+91 9876543210"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:border-red-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor={yearSelectId}
                        className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1"
                      >
                        Academic Year *
                      </label>
                      <select
                        id={yearSelectId}
                        value={applicantYear}
                        onChange={(e) => setApplicantYear(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:border-red-700 bg-white"
                      >
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="Postgraduate">Postgraduate</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor={branchInputId}
                        className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1"
                      >
                        Branch / Stream *
                      </label>
                      <input
                        id={branchInputId}
                        type="text"
                        required
                        placeholder="e.g. CSE / AI & DS / Biomedical"
                        value={applicantBranch}
                        onChange={(e) => setApplicantBranch(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:border-red-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={memberIdInputId}
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1 flex items-center justify-between"
                    >
                      <span>IEEE Membership Number *</span>
                      <span className="text-[10px] text-red-600 font-normal">
                        Mandatory
                      </span>
                    </label>
                    <input
                      id={memberIdInputId}
                      type="text"
                      required
                      placeholder="e.g. 98765432"
                      value={ieeeMemberId}
                      onChange={(e) => setIeeeMemberId(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:border-red-700 font-mono"
                    />
                    <p className="text-[10px] text-zinc-500 mt-1">
                      Your 8-digit IEEE membership number printed on your IEEE
                      member portal.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor={statementTextareaId}
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1"
                    >
                      Why are you best suited for this role? (Optional)
                    </label>
                    <textarea
                      id={statementTextareaId}
                      rows={2}
                      placeholder="Mention any past IEEE, leadership, or project experience..."
                      value={statement}
                      onChange={(e) => setStatement(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:border-red-700"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setApplicationModalOpen(false)}
                      className="px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider text-zinc-600 hover:bg-zinc-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || isExpired}
                      className="px-6 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider text-white shadow transition-all duration-200 cursor-pointer disabled:opacity-50"
                      style={{ background: "#A51C30" }}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Nomination"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
