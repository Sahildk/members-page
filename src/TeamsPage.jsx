import React, { useRef, useMemo, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// --- Demo Data --------------------------------------------------------------
const TEAMS = [
  {
    id: "core",
    name: "Core Team",
    tagline: "Small but mighty",
    description:
      "We coordinate the club, set direction, and make sure every team can do their best work.",
    theme: {
      bg: "from-purple-700 via-fuchsia-700 to-pink-700",
      tint: "bg-purple-600/20",
      chip: "bg-purple-500",
    },
    members: [
      {
        name: "Aarav Kapoor",
        role: "President",
        color: "bg-purple-500",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Isha Rao",
        role: "Vice President",
        color: "bg-fuchsia-500",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Naveen Singh",
        role: "Treasurer",
        color: "bg-pink-500",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Sanya Mehta",
        role: "Outreach Lead",
        color: "bg-violet-500",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Ritvik Shah",
        role: "Ops Lead",
        color: "bg-rose-500",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
    ],
  },
  {
    id: "website",
    name: "Website Team",
    tagline: "Ship fast, look sharp",
    description:
      "We build delightful experiences, own the design system, and keep the lights on.",
    theme: {
      bg: "from-cyan-700 via-blue-700 to-indigo-700",
      tint: "bg-cyan-600/20",
      chip: "bg-cyan-500",
    },
    members: [
      {
        name: "Sahil Deore",
        role: "Co‑Head",
        color: "bg-cyan-500",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Priya Patel",
        role: "Designer",
        color: "bg-sky-500",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Arjun Verma",
        role: "Frontend",
        color: "bg-indigo-500",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Kriti Nair",
        role: "Backend",
        color: "bg-blue-500",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Vikram Chauhan",
        role: "DevOps",
        color: "bg-teal-500",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Rhea Dsouza",
        role: "QA",
        color: "bg-emerald-500",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
    ],
  },
  {
    id: "social-media",
    name: "Social Media Team",
    tagline: "Connect & engage",
    description:
      "We manage all social media platforms and create engaging content for our community.",
    theme: {
      bg: "from-emerald-700 via-teal-700 to-cyan-700",
      tint: "bg-emerald-600/20",
      chip: "bg-emerald-500",
    },
    members: [
      {
        name: "Zara Khan",
        role: "Head",
        color: "bg-emerald-500",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Rahul Mehta",
        role: "Content Creator",
        color: "bg-teal-500",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Ananya Singh",
        role: "Analytics",
        color: "bg-cyan-500",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
    ],
  },
  {
    id: "gfx",
    name: "GFX Team",
    tagline: "Visual storytellers",
    description:
      "We create stunning graphics, posters, and visual content that captures attention.",
    theme: {
      bg: "from-rose-700 via-pink-700 to-purple-700",
      tint: "bg-rose-600/20",
      chip: "bg-rose-500",
    },
    members: [
      {
        name: "Kavya Patel",
        role: "Lead Designer",
        color: "bg-rose-500",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Aditya Kumar",
        role: "Illustrator",
        color: "bg-pink-500",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Mira Shah",
        role: "Layout Artist",
        color: "bg-purple-500",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
    ],
  },
  {
    id: "vfx",
    name: "VFX Team",
    tagline: "Motion magic",
    description:
      "We bring static designs to life with stunning animations and visual effects.",
    theme: {
      bg: "from-violet-700 via-purple-700 to-indigo-700",
      tint: "bg-violet-600/20",
      chip: "bg-violet-500",
    },
    members: [
      {
        name: "Rohan Desai",
        role: "VFX Lead",
        color: "bg-violet-500",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Neha Gupta",
        role: "Motion Designer",
        color: "bg-purple-500",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Arnav Sharma",
        role: "3D Artist",
        color: "bg-indigo-500",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
    ],
  },
  {
    id: "public-relations",
    name: "Public Relations Team",
    tagline: "Building bridges",
    description:
      "We manage external communications and build relationships with stakeholders.",
    theme: {
      bg: "from-blue-700 via-sky-700 to-cyan-700",
      tint: "bg-blue-600/20",
      chip: "bg-blue-500",
    },
    members: [
      {
        name: "Tanvi Reddy",
        role: "PR Head",
        color: "bg-blue-500",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Vedant Joshi",
        role: "Media Relations",
        color: "bg-sky-500",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Ishita Malhotra",
        role: "Communications",
        color: "bg-cyan-500",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
    ],
  },
  {
    id: "sponsorship",
    name: "Sponsorship Team",
    tagline: "Partnership builders",
    description:
      "We secure funding and build strategic partnerships with sponsors and partners.",
    theme: {
      bg: "from-green-700 via-emerald-700 to-teal-700",
      tint: "bg-green-600/20",
      chip: "bg-green-500",
    },
    members: [
      {
        name: "Aryan Singh",
        role: "Sponsorship Head",
        color: "bg-green-500",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Pooja Verma",
        role: "Partnership Manager",
        color: "bg-emerald-500",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Dhruv Kapoor",
        role: "Business Development",
        color: "bg-teal-500",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
    ],
  },
  {
    id: "technical",
    name: "Technical Team",
    tagline: "Tech innovators",
    description:
      "We handle all technical aspects and provide technical support for events.",
    theme: {
      bg: "from-slate-700 via-gray-700 to-zinc-700",
      tint: "bg-slate-600/20",
      chip: "bg-slate-500",
    },
    members: [
      {
        name: "Siddharth Roy",
        role: "Tech Lead",
        color: "bg-slate-500",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Anjali Iyer",
        role: "Systems Admin",
        color: "bg-gray-500",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Kartik Menon",
        role: "Network Engineer",
        color: "bg-zinc-500",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
    ],
  },
  {
    id: "events",
    name: "Events Team",
    tagline: "People first",
    description:
      "From ideation to execution, we run campus‑level events and keep the energy high.",
    theme: {
      bg: "from-amber-700 via-orange-700 to-red-700",
      tint: "bg-amber-600/20",
      chip: "bg-amber-500",
    },
    members: [
      {
        name: "Kabir Bansal",
        role: "Head",
        color: "bg-amber-500",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Sara Khan",
        role: "Coord",
        color: "bg-orange-500",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Manas Goyal",
        role: "Logistics",
        color: "bg-red-500",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Zara Ali",
        role: "Sponsorships",
        color: "bg-rose-500",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
    ],
  },
  {
    id: "photography",
    name: "Photography Team",
    tagline: "Capturing moments",
    description:
      "We document events and create stunning visual memories for our community.",
    theme: {
      bg: "from-yellow-700 via-amber-700 to-orange-700",
      tint: "bg-yellow-600/20",
      chip: "bg-yellow-500",
    },
    members: [
      {
        name: "Aarav Sharma",
        role: "Photography Head",
        color: "bg-yellow-500",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Priya Singh",
        role: "Event Photographer",
        color: "bg-amber-500",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Rahul Verma",
        role: "Videographer",
        color: "bg-orange-500",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Anjali Patel",
        role: "Photo Editor",
        color: "bg-red-500",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
    ],
  },
  {
    id: "logistics",
    name: "Logistics Team",
    tagline: "Making it happen",
    description:
      "We ensure smooth operations and handle all logistical requirements for events.",
    theme: {
      bg: "from-lime-700 via-green-700 to-emerald-700",
      tint: "bg-lime-600/20",
      chip: "bg-lime-500",
    },
    members: [
      {
        name: "Riya Sharma",
        role: "Logistics Head",
        color: "bg-lime-500",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Aarush Patel",
        role: "Operations Manager",
        color: "bg-green-500",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Kiara Singh",
        role: "Supply Chain",
        color: "bg-emerald-500",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
    ],
  },
  {
    id: "content",
    name: "Content Team",
    tagline: "Words that matter",
    description:
      "We create compelling written content, scripts, and copy for all communications.",
    theme: {
      bg: "from-yellow-700 via-amber-700 to-orange-700",
      tint: "bg-yellow-600/20",
      chip: "bg-yellow-500",
    },
    members: [
      {
        name: "Vivaan Mehta",
        role: "Content Head",
        color: "bg-yellow-500",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Aisha Khan",
        role: "Copywriter",
        color: "bg-amber-500",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Rudra Verma",
        role: "Script Writer",
        color: "bg-orange-500",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
    ],
  },
  {
    id: "discipline",
    name: "Discipline Team",
    tagline: "Maintaining order",
    description:
      "We ensure smooth conduct and maintain discipline during all events and activities.",
    theme: {
      bg: "from-red-700 via-rose-700 to-pink-700",
      tint: "bg-red-600/20",
      chip: "bg-red-500",
    },
    members: [
      {
        name: "Arjun Malhotra",
        role: "Discipline Head",
        color: "bg-red-500",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Nisha Reddy",
        role: "Security Coordinator",
        color: "bg-rose-500",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Vedant Sharma",
        role: "Crowd Control",
        color: "bg-pink-500",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
    ],
  },
  {
    id: "documentation",
    name: "Documentation Team",
    tagline: "Recording history",
    description:
      "We document all events, maintain records, and create comprehensive reports.",
    theme: {
      bg: "from-indigo-700 via-purple-700 to-violet-700",
      tint: "bg-indigo-600/20",
      chip: "bg-indigo-500",
    },
    members: [
      {
        name: "Shivam Kumar",
        role: "Documentation Head",
        color: "bg-indigo-500",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Priyanka Singh",
        role: "Report Writer",
        color: "bg-purple-500",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
      {
        name: "Rohan Gupta",
        role: "Data Analyst",
        color: "bg-violet-500",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        socials: { gh: "#", li: "#", ig: "#" },
      },
    ],
  },
];

// --- Utilities --------------------------------------------------------------
function classNames(...arr) {
  return arr.filter(Boolean).join(" ");
}

function splitName(name) {
  const bits = name.split(" ");
  return { first: bits[0] ?? name, last: bits.slice(1).join(" ") };
}

// --- Components -------------------------------------------------------------
function Socials({ socials }) {
  const iconClasses = "w-4 h-4 sm:w-5 sm:h-5";
  const circleClasses =
    "flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-zinc-600 bg-zinc-800 hover:bg-zinc-700 transition-colors";
  return (
    <div className="mt-2 sm:mt-3 flex items-center gap-2 sm:gap-3">
      {socials.gh && (
        <a
          aria-label="GitHub"
          href={socials.gh}
          className="opacity-80 hover:opacity-100"
        >
          <span className={circleClasses}>
            <Github className={iconClasses} />
          </span>
        </a>
      )}
      {socials.li && (
        <a
          aria-label="LinkedIn"
          href={socials.li}
          className="opacity-80 hover:opacity-100"
        >
          <span className={circleClasses}>
            <Linkedin className={iconClasses} />
          </span>
        </a>
      )}
      {socials.ig && (
        <a
          aria-label="Instagram"
          href={socials.ig}
          className="opacity-80 hover:opacity-100"
        >
          <span className={circleClasses}>
            <Instagram className={iconClasses} />
          </span>
        </a>
      )}
    </div>
  );
}

function MemberCard({ member, teamName }) {
  const { first, last } = useMemo(() => splitName(member.name), [member.name]);
  return (
    <motion.div
      whileHover={{ y: -6, rotate: -0.3 }}
      className="member-card relative shrink-0 w-[240px] sm:w-[280px] md:w-[320px] h-[380px] sm:h-[420px] rounded-3xl border border-zinc-700/60 bg-zinc-900/60 p-3 sm:p-5 overflow-hidden shadow-xl backdrop-blur"
    >
      {/* Vertical team label - hidden on mobile, visible on larger screens */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center h-[280px] sm:h-[320px] justify-center hidden sm:flex">
        <span
          className="text-white font-extrabold text-base sm:text-lg md:text-xl tracking-widest writing-vertical-rl rotate-180 select-none"
          style={{ writingMode: "vertical-rl" }}
        >
          {teamName.toUpperCase()}
        </span>
      </div>
      {/* Card content with responsive padding */}
      <div className="pl-2 sm:pl-8 h-full flex flex-col justify-between">
        {/* Member image */}
        <div className="mt-3 rounded-2xl h-[200px] sm:h-[250px] md:h-[300px] w-full border border-zinc-700/50 overflow-hidden relative">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              // Fallback to colored background if image fails to load
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          {/* Fallback colored background */}
          <div
            className={classNames(
              "hidden w-full h-full flex items-end p-3 sm:p-4",
              member.color || "bg-zinc-800",
              "bg-gradient-to-br"
            )}
          >
            <div className="text-lg sm:text-xl md:text-2xl font-extrabold drop-shadow">
              {member.role?.toUpperCase()}
            </div>
          </div>
          {/* Role overlay on image */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
            <div className="text-lg sm:text-xl md:text-2xl font-extrabold text-white drop-shadow">
              {member.role?.toUpperCase()}
            </div>
          </div>
        </div>
        {/* Name */}
        <div className="mt-3 sm:mt-5">
          <div className="text-xl sm:text-2xl md:text-3xl font-black leading-none">
            {first}
          </div>
          {last && (
            <div className="text-base sm:text-lg md:text-xl font-black leading-none opacity-90">
              {last}
            </div>
          )}
        </div>
        {/* Socials at the bottom */}
        <div className="flex justify-left gap-2 sm:gap-3 mt-3 sm:mt-4 mb-2">
          <Socials socials={member.socials || {}} />
        </div>
      </div>
    </motion.div>
  );
}

function TeamPanel({ team }, ref) {
  // Responsive card width and gap calculations
  const getCardWidth = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 240; // mobile
      if (window.innerWidth < 768) return 280; // sm
      return 320; // md and up
    }
    return 320; // default
  };

  const getGap = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 16; // mobile: gap-4
      return 24; // sm and up: gap-6
    }
    return 24; // default
  };

  const cardWidth = getCardWidth();
  const gap = getGap();
  const minWidth =
    team.members.length * cardWidth + (team.members.length - 1) * gap;

  return (
    <section
      id={team.id}
      className="team-section relative min-h-screen w-full overflow-hidden"
      ref={ref}
    >
      {/* The background gradient */}
      <div
        className={classNames(
          "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br opacity-70",
          team.theme.bg
        )}
        style={{ zIndex: -1 }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-10 md:py-16">
        <div className="mb-6 sm:mb-8 md:mb-10">
          <p className="text-xs sm:text-sm tracking-widest text-zinc-200/80">
            {team.tagline?.toUpperCase()}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">
            {team.name}
          </h2>
          <p className="mt-2 sm:mt-3 max-w-2xl text-sm sm:text-base text-zinc-200/80">
            {team.description}
          </p>
        </div>
        {/* Horizontal track that ScrollTrigger translates */}
        <div
          className="track flex gap-4 sm:gap-6 md:gap-8 will-change-transform"
          style={{ minWidth: `${minWidth}px` }}
        >
          {team.members.map((m, i) => (
            <MemberCard key={i} member={m} teamName={team.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
const TeamPanelWithRef = React.forwardRef(TeamPanel);

export default function TeamsPage() {
  const sectionsRef = useRef([]);

  useGSAP(() => {
    sectionsRef.current.forEach((section) => {
      const track = section.querySelector(".track");
      if (!track) return;

      // Calculate how far to scroll horizontally
      const scrollAmount = track.scrollWidth - section.clientWidth;

      // Ensure minimum scroll distance for all teams (even Core Team with 5 members)
      const minScrollDistance = 200; // Minimum 200px scroll distance
      const finalScrollAmount = Math.max(scrollAmount, minScrollDistance);

      if (finalScrollAmount > 0) {
        // Create smooth horizontal scroll without pinning
        gsap.to(track, {
          x: -finalScrollAmount,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
            pin: false, // No pinning
            anticipatePin: 0,
          },
        });
      }

      // Card extend effect - cards smoothly extend as they scroll in
      const cards = track.querySelectorAll(".member-card");
      cards.forEach((card, index) => {
        // Initial state - cards start compressed
        gsap.set(card, {
          scaleX: 0.8,
          opacity: 0.7,
          transformOrigin: "left center",
        });

        // Animate cards as they enter viewport
        gsap.to(card, {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "left 90%",
            end: "left 60%",
            scrub: false,
            toggleActions: "play none none none",
            horizontal: true,
          },
        });
      });
    });

    // Clean up on refresh
    ScrollTrigger.addEventListener("refreshInit", () => {
      sectionsRef.current.forEach((section) => {
        const track = section.querySelector(".track");
        gsap.set(track, { clearProps: "all" });
      });
    });
    ScrollTrigger.refresh();
  });

  // Calculate total members across all teams
  const totalMembers = TEAMS.reduce(
    (sum, team) => sum + team.members.length,
    0
  );

  return (
    <main className="min-h-screen w-full bg-black text-zinc-100 selection:bg-white/10">
      {/* Top hero / stats grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 sm:pt-16 pb-16 sm:pb-24">
        <header className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            Teams
          </h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-zinc-300 max-w-2xl">
            Scroll down. Each section reveals its members horizontally.
          </p>
        </header>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[totalMembers, TEAMS.length, "Events", "Goals"].map((label, i) => (
            <div
              key={i}
              className="rounded-xl sm:rounded-2xl border border-zinc-700/60 bg-zinc-900/60 p-4 sm:p-6 text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-black">
                {label}
              </div>
              <div className="mt-1 text-xs sm:text-sm tracking-widest text-zinc-400">
                {i === 0 ? "MEMBERS" : i === 1 ? "TEAMS" : label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Horizontal scroll sections */}
      {TEAMS.map((t, i) => (
        <TeamPanelWithRef
          key={t.id}
          team={t}
          ref={(el) => (sectionsRef.current[i] = el)}
        />
      ))}
      {/* Footer spacer */}
      <section className="h-[30vh] sm:h-[50vh] flex items-center justify-center text-zinc-400">
        <p>That’s all. ✨</p>
      </section>
    </main>
  );
}
