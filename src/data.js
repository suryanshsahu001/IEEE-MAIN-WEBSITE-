export const siteConfig = {
  name: "Ajeenkya DY Patil University, Pune",
  shortName: "ADYPU",
  subtitle: "IEEE Student Branch",
  code: "STB60205406 | IEEE Maharashtra Section",
  tagline:
    "We make innovation feel obvious for students at Ajeenkya DY Patil University — hackathons, workshops, tech talks and IEEE Day, planned end to end by our student board.",
  address:
    "Ajeenkya DY Patil University, Charholi Budruk, via Lohegaon, Pune, Maharashtra 412105",
  emails: [
    "JAIDEEP.KAMBLE@ADYPU.EDU.IN",
    "SWAPNIL.PATIL@ADYPU.EDU.IN",
    "E25B000362@ADYPU.EDU.IN",
  ],
  joinEmail: "ieee@adypu.edu.in",
  recapVideoUrl: "/videos/intro-video.mp4",
  stats: [
    { label: "Active Members", value: "480+" },
    { label: "Workshops & Events", value: "65+" },
    { label: "National IEEE Awards", value: "12" },
    { label: "Specialty Chapters", value: "5" },
  ],
  socials: {
    linkedin:
      "https://www.linkedin.com/in/adypu-ieee-student-branch-120373238/",
    instagram: "https://www.instagram.com/ieee_adypu/?hl=en",
  },
  hackxUrl: "https://hack-x-02026.vercel.app/",
};

export const navLinks = [
  { name: "HOME", href: "#home" },
  { name: "ABOUT", href: "#about" },
  { name: "CHAPTERS", href: "#chapters" },
  { name: "EVENTS", href: "#events" },
  { name: "GALLERY", href: "#gallery" },
  { name: "TEAM", href: "#team" },
  { name: "CONTACT", href: "#contact" },
];

export const chapters = [
  {
    id: "cs",
    name: "IEEE Computer Society",
    acronym: "IEEE CS",
    icon: "cpu",
    description:
      "Focusing on artificial intelligence, software engineering, cloud computing, and cybersecurity excellence.",
    members: "190+ Members",
  },
  {
    id: "wie",
    name: "Women in Engineering",
    acronym: "IEEE WIE",
    icon: "users",
    description:
      "Empowering female engineers, scientists, and tech leaders through mentorship, workshops, and grants.",
    members: "140+ Members",
  },
  {
    id: "ras",
    name: "Robotics & Automation Society",
    acronym: "IEEE RAS",
    icon: "bot",
    description:
      "Hands-on hardware labs, autonomous drone building, embedded systems, and ROS development.",
    members: "110+ Members",
  },
  {
    id: "sps",
    name: "Signal Processing Society",
    acronym: "IEEE SPS",
    icon: "activity",
    description:
      "Pioneering research in audio processing, computer vision, DSP algorithms, and medical imaging.",
    members: "85+ Members",
  },
];

export const events = [
  {
    id: "evt-201",
    title: "AI in Research & Productivity Workshop",
    category: "Workshop",
    status: "upcoming",
    date: "Sept 6, 2026",
    time: "10:00 AM - 04:00 PM",
    venue: "ADYPU Innovation Auditorium & Lab 4",
    speaker: "IEEE ADYPU Student Branch",
    speakerTitle: "Tech Leads & Faculty",
    description:
      "A hands-on workshop on leveraging artificial intelligence to supercharge research and daily productivity — from literature review and data analysis to automation and presentation.",
    tags: ["AI/ML", "Research", "Productivity"],
    registrationOpen: true,
    capacity: "120 Seats",
  },
  {
    id: "evt-202",
    title: "Tech4Life Hackathon",
    category: "Hackathon",
    status: "upcoming",
    date: "Sept 8 - Sept 9, 2026",
    time: "Starts 09:00 AM",
    venue: "ADYPU Incubation & Innovation Hub",
    speaker: "IEEE ADYPU Student Branch",
    speakerTitle: "Industry Mentors & Tech Leads",
    description:
      "A 36-hour hackathon where student teams build technology-driven solutions for real-life problems across healthcare, education, mobility, and sustainability.",
    tags: ["Hackathon", "AI", "IoT"],
    registrationOpen: true,
    capacity: "300 Teams",
  },
  {
    id: "evt-203",
    title: "IEEE Conference",
    category: "Conference",
    status: "upcoming",
    date: "Sept 10 - Sept 11, 2026",
    time: "10:00 AM - 05:00 PM",
    venue: "ADYPU Convention Center",
    speaker: "IEEE ADYPU",
    speakerTitle: "Guest Speakers & Researchers",
    description:
      "A two-day technical conference featuring research paper presentations, keynote talks, and networking with academic and industry professionals.",
    tags: ["Conference", "Research", "Networking"],
    registrationOpen: true,
    capacity: "250 Attendees",
  },
];

export const gallery = [
  {
    id: "gal-1",
    title: "Diksharambh 2026",
    category: "Events",
    url: "/gallery/diksha.jpg",
    video: "/gallery/diksha.mp4",
    date: "2026",
    description:
      "Diksharambh 2026 — the grand induction and orientation of new IEEE members at ADYPU.",
  },
  {
    id: "gal-2",
    title: "Next Gen 2026",
    category: "Events",
    url: "/gallery/next-gen.jpg",
    video: "/gallery/next-gen.mp4",
    date: "2026",
    description:
      "Next Gen 2026 — showcasing the innovative projects and talents of the next generation of engineers.",
  },
  {
    id: "gal-3",
    title: "IEEE Day 2025",
    category: "Celebrations",
    url: "/gallery/ieee-day.jpg",
    date: "2025",
    description:
      "IEEE Day 2025 celebrations — celebrating a decade of advancing technology for humanity.",
  },
  {
    id: "gal-4",
    title: "AIDS Day 2025",
    category: "Outreach",
    url: "/gallery/aids.jpg",
    date: "2025",
    description:
      "World AIDS Day 2025 awareness drive organised by IEEE ADYPU volunteers.",
  },
  {
    id: "gal-5",
    title: "ICICIS Conference 2025",
    category: "Conference",
    url: "/gallery/conference.jpg",
    date: "2025",
    description:
      "International Conference on Intelligent Computing and Information Systems 2025 hosted at ADYPU.",
  },
  {
    id: "gal-6",
    title: "AI for Health 2025",
    category: "Projects",
    url: "/gallery/ai4health.jpg",
    date: "2025",
    description:
      "AI for Health 2025 — exploring AI-driven solutions for healthcare challenges.",
  },
];

export const extraMoments = [
  {
    id: "em-1",
    title: "Bloopers & Fun Moments",
    category: "Video",
    url: "/gallery/moments-1.mp4",
    video: "/gallery/moments-1.mp4",
    date: "2026",
    description: "Behind-the-scenes bloopers and fun moments from our events.",
  },
  {
    id: "em-2",
    title: "Award Distribution",
    category: "Achievement",
    url: "/gallery/moments-2.jpg",
    date: "2026",
    description: "Recognising and felicitating our outstanding members.",
  },
  {
    id: "em-3",
    title: "Celebration Moments",
    category: "Achievement",
    url: "/gallery/moments-3.jpg",
    date: "2026",
    description: "Memorable celebration moments from our team.",
  },
  {
    id: "em-4",
    title: "Behind the Scenes",
    category: "Moment",
    url: "/gallery/moments-4.jpg",
    date: "2026",
    description: "Candid shots capturing the team in action.",
  },
];

export const team = [
  {
    id: "cm-1",
    name: "SWAPNIL PATIL",
    role: "PRESIDENT",
    designation: "President - IEEE ADYPU Student Branch",
    domain: "Executive Leadership",
    photo: "/members/swapnil_final.png",
    bio: "Leading overall vision, strategic initiatives, industrial collaborations, and branch governance.",
    socials: {
      email: "mailto:SWAPNIL.PATIL@ADYPU.EDU.IN",
      linkedin:
        "https://www.linkedin.com/in/adypu-ieee-student-branch-120373238/",
    },
  },
  {
    id: "cm-2",
    name: "Aditya Bolbhat",
    role: "Vice President",
    designation: "Vice President - IEEE ADYPU Student Branch",
    domain: "Executive Leadership",
    photo: "/members/aditya.jpeg",
    bio: "Co-leading strategic planning, technical workshops, and chapter operations across ADYPU.",
    socials: {
      email: "mailto:ieee@adypu.edu.in",
      linkedin:
        "https://www.linkedin.com/in/adypu-ieee-student-branch-120373238/",
    },
  },
  {
    id: "cm-3",
    name: "JAIDEEP KAMBLE",
    role: "SECRETARY",
    designation: "Secretary - IEEE ADYPU Student Branch",
    domain: "Executive Leadership",
    photo: "/members/jaideep_final.png",
    bio: "Overseeing branch documentation, official communications, events schedule, and IEEE reporting.",
    socials: {
      email: "mailto:JAIDEEP.KAMBLE@ADYPU.EDU.IN",
      linkedin:
        "https://www.linkedin.com/in/adypu-ieee-student-branch-120373238/",
    },
  },
  {
    id: "cm-4",
    name: "URVESH RANE",
    role: "TREASURER",
    designation: "Treasurer - IEEE ADYPU Student Branch",
    domain: "Finance & Operations",
    photo: "/members/urvesh.jpeg",
    bio: "Managing branch finances, event budgets, IEEE grants, and financial auditing.",
    socials: {
      email: "mailto:ieee@adypu.edu.in",
      linkedin:
        "https://www.linkedin.com/in/adypu-ieee-student-branch-120373238/",
    },
  },
  {
    id: "cm-5",
    name: "Sumit Gurjar",
    role: "General Manager",
    designation: "General Manager - IEEE ADYPU Student Branch",
    domain: "Operations & Logistics",
    photo: "/members/sumit.jpeg",
    bio: "Managing student operations, logistics, venue management, and event execution.",
    socials: {
      email: "mailto:ieee@adypu.edu.in",
      linkedin:
        "https://www.linkedin.com/in/adypu-ieee-student-branch-120373238/",
    },
  },
  {
    id: "cm-6",
    name: "Prathamesh Sakhare",
    role: "YP President",
    designation: "YP President - Young Professionals ADYPU",
    domain: "Young Professionals",
    photo: "/members/pm.jpeg",
    bio: "Leading the Young Professionals affinity group, alumni networks, and industry transition mentorship.",
    socials: {
      email: "mailto:ieee@adypu.edu.in",
      linkedin:
        "https://www.linkedin.com/in/adypu-ieee-student-branch-120373238/",
    },
  },
  {
    id: "cm-7",
    name: "Aryan Vaidya",
    role: "YP Vice President",
    designation: "YP Vice President - Young Professionals ADYPU",
    domain: "Young Professionals",
    photo: "/members/aryan.png",
    bio: "Co-leading Young Professionals events, networking meets, and career acceleration webinars.",
    socials: {
      email: "mailto:ieee@adypu.edu.in",
      linkedin:
        "https://www.linkedin.com/in/adypu-ieee-student-branch-120373238/",
    },
  },
];