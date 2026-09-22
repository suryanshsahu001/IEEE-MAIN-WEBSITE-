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
  recapVideoUrl: "./videos/intro-video.mp4",
  stats: [
    { label: "Active Members", value: "50+" },
    { label: "Workshops & Events", value: "10+" },
    { label: "National IEEE Awards", value: "20+" },
    { label: "Conferences", value: "3" },
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
    id: "evt-202",
    title: "Tech4Life Hackathon",
    category: "Hackathon",
    status: "upcoming",
    date: "22nd – 23rd September 2026",
    time: "",
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
    id: "evt-204",
    title: "IEEE Day 2026",
    category: "Celebration",
    status: "upcoming",
    date: "Date To Be Announced",
    time: "",
    venue: "Ajeenkya DY Patil University, Pune",
    speaker: "IEEE ADYPU Student Branch",
    speakerTitle: "IEEE Members & Faculty",
    description:
      "Celebrate IEEE Day 2026 — a global celebration of the day IEEE members first united to advance technology for humanity. Join us for talks, networking, and recognition of outstanding members.",
    tags: ["IEEE Day", "Networking", "Celebration"],
    registrationOpen: false,
  },
];

export const gallery = [
  {
    id: "gal-1",
    title: "Diksharambh 2026",
    category: "Events",
    url: "./gallery/diksha.jpg",
    video: "./gallery/diksha.mp4",
    date: "2026",
    description:
      "Diksharambh 2026 — the grand induction and orientation of new IEEE members at ADYPU.",
  },
  {
    id: "gal-2",
    title: "NEXT GEN CONNECT 2026",
    category: "Events",
    url: "./gallery/next-gen.jpg",
    video: "./gallery/next-gen.mp4",
    date: "2026",
    description:
      "NEXT GEN CONNECT 2026 — showcasing the innovative projects and talents of the next generation of engineers.",
    report: {
      introduction: "Next Gen Connect 2026 was organized by IEEE Student Branch ADYPU to provide students with clarity on academic vision and opportunities. The event included keynote addresses, panel discussions, and a guided campus and lab tour.",
      objectives: [
        "To support the professional and academic orientation of prospective engineering students",
        "To provide networking opportunities with IEEE members, faculty, and industry experts",
        "To encourage early engagement with the IEEE Student Branch ecosystem",
        "To bridge the gap between school-level learning and higher-education expectations"
      ],
      speakers: "Dr. Rakesh Kumar Jain (Vice Chancellor, ADYPU), Dr. Sunny Thomas (Dean), Dr. Ranjit Kumar, and Dr. Deepa Joshi, along with special guest panel.",
      impact: "The program successfully created a platform where academic knowledge, industry exposure, and student networking came together in a single engaging day, with an interactive valedictory quiz and lab tour.",
      photos: [
        "./gallery/next-gen/image1.jpg",
        "./gallery/next-gen/image2.jpg",
        "./gallery/next-gen/image3.jpg",
        "./gallery/next-gen/image4.jpg",
        "./gallery/next-gen/image5.jpg",
        "./gallery/next-gen/image6.jpg",
        "./gallery/next-gen/image7.jpg",
        "./gallery/next-gen/image8.jpg"
      ]
    }
  },
  {
    id: "gal-3",
    title: "IEEE Day 2025",
    category: "Celebrations",
    url: "./gallery/ieee-day.jpg",
    date: "2025",
    description:
      "IEEE Day 2025 celebrations — celebrating a decade of advancing technology for humanity.",
  },
  {
    id: "gal-4",
    title: "AIDS Day 2025",
    category: "Outreach",
    url: "./gallery/aids.jpg",
    date: "2025",
    description:
      "World AIDS Day 2025 awareness drive organised by IEEE ADYPU volunteers.",
  },
  {
    id: "gal-5",
    title: "ICICIS Conference 2025",
    category: "Conference",
    url: "./gallery/conference.jpg",
    date: "2025",
    description:
      "International Conference on Intelligent Computing and Information Systems 2025 hosted at ADYPU.",
    report: {
      introduction: "The School of Engineering, Ajeenkya DY Patil University (ADYPU), Pune successfully organized a Pre-Workshop on “AI Tools & Techniques for Research” on 9th and 10th September 2025 as part of the ICICIS 2025 Conference. The workshop aimed to introduce participants to the growing role of Artificial Intelligence in academic research and to provide hands-on exposure to modern AI-powered tools.",
      objectives: [
        "To introduce participants to AI-powered tools used in academic research",
        "To provide hands-on exposure to modern AI technologies",
        "To explore AI-based approaches for data analysis and predictive modelling",
        "To promote innovation and interdisciplinary research practices among participants"
      ],
      speakers: "Dr. Preeti Muley conducted highly engaging and practical sessions focused on the application of Artificial Intelligence tools in research activities.",
      impact: "The workshop witnessed active participation from more than 200 participants, including students, scholars, and faculty. It successfully achieved its objective of introducing participants to AI-driven research tools and techniques.",
      photos: [
        "./gallery/icicis/image1.png",
        "./gallery/icicis/image2.png",
        "./gallery/icicis/image3.png",
        "./gallery/icicis/image4.jpeg",
        "./gallery/icicis/image5.png",
        "./gallery/icicis/image6.jpeg",
        "./gallery/icicis/image7.png",
        "./gallery/icicis/image8.png",
        "./gallery/icicis/image9.jpeg"
      ]
    }
  },
  {
    id: "gal-6",
    title: "AI for Health 2025",
    category: "Projects",
    url: "./gallery/ai4health.jpg",
    date: "2025",
    description:
      "AI for Health 2025 — exploring AI-driven solutions for healthcare challenges.",
    report: {
      introduction: "A Two-Day Practical Workshop on “AI for Health: Machine Learning & Generative AI in Medical Research” was successfully organized on 9th and 10th February 2026 at Ajeenkya DY Patil University (ADYPU), Pune. The workshop served as a platform to explore the transformative impact of Artificial Intelligence, Machine Learning, and Generative AI in the healthcare and medical research domain.",
      objectives: [
        "To provide participants with practical exposure to Artificial Intelligence in healthcare",
        "To introduce students and researchers to Machine Learning techniques in medical diagnostics",
        "To explore the role of Generative AI in drug discovery and medical research",
        "To promote interdisciplinary learning between technology and healthcare"
      ],
      speakers: "Dr. Venkateswarlu Gonuguntla (Symbiosis International University), Dr. Deepak Mane (Vishwakarma University), and Mr. Mohammad Qazi.",
      impact: "The workshop successfully enhanced technical understanding of AI in healthcare, provided hands-on experience in Machine Learning and Generative AI tools, and encouraged research and innovation among participants.",
      photos: [
        "./gallery/ai-health/image1.png",
        "./gallery/ai-health/image2.jpeg",
        "./gallery/ai-health/image3.jpeg",
        "./gallery/ai-health/image4.jpeg",
        "./gallery/ai-health/image5.jpeg",
        "./gallery/ai-health/image6.jpeg",
        "./gallery/ai-health/image7.jpeg",
        "./gallery/ai-health/image8.jpeg"
      ]
    }
  },
  {
    id: "gal-7",
    title: "ICICIS 2026",
    category: "Events",
    url: "./gallery/icics-cover.jpg",
    video: "./gallery/icics-2026.mp4",
    date: "2026",
    description: "Capturing Campus Moments at ICICIS 2026.",
  },
];

export const extraMoments = [
  {
    id: "em-5",
    title: "IEEE EU-REKA 2026",
    category: "Achievement",
    url: "./gallery/eu-reka-2026.jpg",
    date: "2026",
    description: "A moment of immense pride for Ajeenkya DY Patil University.",
  },
  {
    id: "em-1",
    title: "Bloopers & Fun Moments",
    category: "Video",
    url: "./gallery/moments-1.mp4",
    video: "./gallery/moments-1.mp4",
    date: "2026",
    description: "Behind-the-scenes bloopers and fun moments from our events.",
  },
  {
    id: "em-2",
    title: "Award Distribution",
    category: "Achievement",
    url: "./gallery/moments-2.jpg",
    date: "2026",
    description: "Recognising and felicitating our outstanding members.",
  },
  {
    id: "em-3",
    title: "Celebration Moments",
    category: "Achievement",
    url: "./gallery/moments-3.jpg",
    date: "2026",
    description: "Memorable celebration moments from our team.",
  },
  {
    id: "em-4",
    title: "Behind the Scenes",
    category: "Moment",
    url: "./gallery/moments-4.jpg",
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
    photo: "./members/swapnil_final.png",
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
    photo: "./members/aditya.jpeg",
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
    photo: "./members/jaideep_final.png",
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
    photo: "./members/urvesh.jpeg",
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
    photo: "./members/sumit.jpeg",
    bio: "Managing student operations, logistics, venue management, and event execution.",
    socials: {
      email: "mailto:ieee@adypu.edu.in",
      linkedin:
        "https://www.linkedin.com/in/adypu-ieee-student-branch-120373238/",
    },
  },
];

export const mentors = [
  {
    id: "mentor-1",
    name: "DR. RANJIT KUMAR",
    photo: "./members/ranjit_sir.jpeg",
  },
  {
    id: "mentor-2",
    name: "DR. VISHAL SHIRSATH",
    photo: "./members/vishal_shirsath.jpeg",
  },
];

export const communityMembers = [
  { name: "PRATHMESH SAKHARE", role: "YP PRESIDENT", photo: "./members/community/PRATHMESH SAKHARE.png" },
  { name: "ARYAN VAIDYA", role: "YP VICE PRESIDENT", photo: "./members/community/ARYAN VAIDYA.png" },
  { name: "YASHRAJ SHARMA", role: "CSE CHAIR", photo: "./members/community/YASHRAJ SHARMA.png" },
  { name: "SHRUTI POTAWAR", role: "WOMEN'S CHAIR", photo: "./members/community/SHRUTI POTAWAR.png" },
  { name: "PRATIKSHA WARULE", role: "EMBS CHAIR", photo: "./members/community/PRATIKSHA WARULE.png" },
  { name: "ASHISH KUMAR", role: "ROBOTICS CHAIR", photo: "./members/community/ASHISH KUMAR.png" },
  { name: "VINAY VERMA", role: "AIDS CHAIR", photo: "./members/community/VINAY VERMA.png" },
  { name: "SURYANSH SAHU", role: "WEB MASTER LEAD", photo: "./members/community/SURYANSH SAHU.png" },
  { name: "RAKSHIT AGARWAL", role: "MANAGEMENT LEAD", photo: "./members/community/RAKSHIT AGARWAL.png" },
  { name: "VEDANT WAGHUNDE", role: "MEDIA LEAD", photo: "./members/community/VEDANT WAGHUNDE.png" },
  { name: "SUMIT SHAH", role: "DESIGN LEAD", photo: "./members/community/SUMIT SHAH.png" },
  { name: "PRAJAKTA PASHTE", role: "MEMBERSHIP'S LEAD", photo: "./members/community/PRAJAKTA PASHTE.png" },
  { name: "ISHITA THULKAR", role: "WOMEN'S VICE CHAIR", photo: "./members/community/ISHITA THULKAR.png" },
  { name: "AYUSH THAKUR", role: "CSE VICE CHAIR", photo: "./members/community/AYUSH THAKUR.png" },
  { name: "MAHI KESHARWANI", role: "AIDS VICE CHAIR", photo: "./members/community/MAHI KESHARWANI.png" },
  { name: "MEGHNA AYACH", role: "EVENT COORDINATOR", photo: "./members/community/MEGHNA AYACH.png" },
  { name: "SHAKTI SHARMA", role: "EVENT COORDINATOR", photo: "./members/community/SHAKTI SHARMA.png" },
  { name: "ATHARVA VADGULE", role: "WEBMASTER CO LEAD", photo: "./members/community/athra.jpeg" },
  { name: "SHREYA MULE", role: "IEEE MEMBER", photo: "./members/community/SHREYA MULE.png" },
  { name: "MAYANK SAINI", role: "IEEE MEMBER", photo: "./members/community/MAYANK SAINI.png" },
  { name: "VIRAJ GAWADE", role: "IEEE MEMBER", photo: "./members/community/VIRAJ GAWADE.png" },
  { name: "VIBHA PAWAR", role: "IEEE MEMBER", photo: "./members/community/VIBHA PAWAR.png" },
  { name: "JAYATI SINHA", role: "IEEE MEMBER", photo: "./members/community/JAYATI SINHA.png" },
];