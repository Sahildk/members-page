import React, { useRef, useMemo, useEffect } from "react";
import { Github, Linkedin, Instagram } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// Register GSAP plugins
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
        role: "Co-Head",
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
      "From ideation to execution, we run campus-level events and keep the energy high.",
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
    <div className="flex items-center gap-2 sm:gap-3">
      {socials.gh && (
        <motion.a
          aria-label="GitHub"
          href={socials.gh}
          className="opacity-80 hover:opacity-100"
          whileHover={{
            scale: 1.1,
            y: -2,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className={circleClasses}
            whileHover={{
              backgroundColor: "rgb(51 65 85)",
              borderColor: "rgb(71 85 105)",
            }}
            transition={{ duration: 0.2 }}
          >
            <Github className={iconClasses} />
          </motion.span>
        </motion.a>
      )}
      {socials.li && (
        <motion.a
          aria-label="LinkedIn"
          href={socials.li}
          className="opacity-80 hover:opacity-100"
          whileHover={{
            scale: 1.1,
            y: -2,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className={circleClasses}
            whileHover={{
              backgroundColor: "rgb(51 65 85)",
              borderColor: "rgb(71 85 105)",
            }}
            transition={{ duration: 0.2 }}
          >
            <Linkedin className={iconClasses} />
          </motion.span>
        </motion.a>
      )}
      {socials.ig && (
        <motion.a
          aria-label="Instagram"
          href={socials.ig}
          className="opacity-80 hover:opacity-100"
          whileHover={{
            scale: 1.1,
            y: -2,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className={circleClasses}
            whileHover={{
              backgroundColor: "rgb(51 65 85)",
              borderColor: "rgb(71 85 105)",
            }}
            transition={{ duration: 0.2 }}
          >
            <Instagram className={iconClasses} />
          </motion.span>
        </motion.a>
      )}
    </div>
  );
}

function MemberCard({ member, teamName }) {
  const { first, last } = useMemo(() => splitName(member.name), [member.name]);

  // Responsive animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "backOut",
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -8,
      rotate: -1,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      whileTap="tap"
      viewport={{ once: true, margin: "-100px" }}
      className="member-card relative shrink-0 w-[280px] sm:w-[320px] md:w-[360px] h-[420px] sm:h-[460px] rounded-3xl border-2 border-zinc-700/80 bg-zinc-800/90 p-4 sm:p-6 overflow-hidden shadow-xl backdrop-blur hover:shadow-2xl transition-all duration-300"
    >
      {/* Name at top */}
      <div className="text-left mb-4">
        <div className="text-xl sm:text-2xl md:text-3xl font-black leading-tight">
          {first.toUpperCase()}
        </div>
        {last && (
          <div className="text-lg sm:text-xl md:text-2xl font-black leading-tight opacity-90">
            {last.toUpperCase()}
          </div>
        )}
      </div>

      {/* Vertical team label on left side */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center h-[300px] sm:h-[340px] justify-center">
        <span
          className="text-white font-extrabold text-sm sm:text-base md:text-lg tracking-[0.2em] select-none opacity-90"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          {teamName.toUpperCase()}
        </span>
      </div>

      {/* Member image container */}
      <motion.div
        className="ml-8 sm:ml-10 rounded-2xl h-[220px] sm:h-[260px] md:h-[280px] border-2 border-zinc-600/60 overflow-hidden relative group bg-zinc-700"
        whileHover={{
          borderColor: "rgba(255,255,255,0.3)",
          transition: { duration: 0.3 },
        }}
      >
        <motion.img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{
            scale: 1.15,
            transition: { duration: 0.4, ease: "easeOut" },
          }}
          onError={(e) => {
            // Fallback to colored background if image fails to load
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        {/* Fallback colored background */}
        <div
          className={classNames(
            "hidden w-full h-full flex items-center justify-center",
            member.color || "bg-zinc-700"
          )}
        >
          <div className="text-lg sm:text-xl md:text-2xl font-extrabold text-white drop-shadow text-center">
            {member.role?.toUpperCase()}
          </div>
        </div>

        {/* Role overlay at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 sm:p-4">
          <div className="text-base sm:text-lg md:text-xl font-extrabold text-white drop-shadow text-center">
            {member.role?.toUpperCase()}
          </div>
        </div>
      </motion.div>

      {/* Social links at bottom */}
      <div className="ml-8 sm:ml-10 mt-4 flex justify-center">
        <Socials socials={member.socials || {}} />
      </div>
    </motion.div>
  );
}

function TeamPanel({ team }, ref) {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.section
      id={team.id}
      className="team-section relative min-h-screen w-full overflow-hidden bg-stable"
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={{
        background: `linear-gradient(to bottom right, ${
          team.id === "core"
            ? "rgb(126 34 206), rgb(192 38 211), rgb(219 39 119)"
            : team.id === "website"
            ? "rgb(14 116 144), rgb(29 78 216), rgb(67 56 202)"
            : team.id === "social-media"
            ? "rgb(4 120 87), rgb(15 118 110), rgb(14 116 144)"
            : team.id === "gfx"
            ? "rgb(190 18 60), rgb(219 39 119), rgb(126 34 206)"
            : team.id === "vfx"
            ? "rgb(109 40 217), rgb(126 34 206), rgb(67 56 202)"
            : team.id === "public-relations"
            ? "rgb(29 78 216), rgb(2 132 199), rgb(14 116 144)"
            : team.id === "sponsorship"
            ? "rgb(21 128 61), rgb(4 120 87), rgb(15 118 110)"
            : team.id === "technical"
            ? "rgb(51 65 85), rgb(55 65 81), rgb(63 63 70)"
            : team.id === "events"
            ? "rgb(180 83 9), rgb(234 88 12), rgb(220 38 38)"
            : team.id === "photography"
            ? "rgb(161 98 7), rgb(180 83 9), rgb(234 88 12)"
            : team.id === "logistics"
            ? "rgb(77 124 15), rgb(21 128 61), rgb(4 120 87)"
            : team.id === "content"
            ? "rgb(161 98 7), rgb(180 83 9), rgb(234 88 12)"
            : team.id === "discipline"
            ? "rgb(220 38 38), rgb(190 18 60), rgb(219 39 119)"
            : team.id === "documentation"
            ? "rgb(67 56 202), rgb(126 34 206), rgb(109 40 217)"
            : "rgb(55 65 81), rgb(75 85 99), rgb(107 114 128)"
        })`,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        willChange: "auto",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Additional overlay for better contrast */}
      <div
        className="pointer-events-none absolute inset-0 bg-black/30"
        style={{ zIndex: 1 }}
      />

      {/* Floating background overlay for animation */}
      <motion.div
        className="bg-overlay pointer-events-none absolute inset-0 opacity-20"
        style={{
          zIndex: 1,
          background: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
        }}
        animate={{
          y: [-10, 10, -10],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-10 md:py-16 relative"
        style={{ zIndex: 2 }}
      >
        <div className="mb-6 sm:mb-8 md:mb-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs sm:text-sm tracking-widest text-white/90 font-semibold"
          >
            {team.tagline?.toUpperCase()}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white drop-shadow-lg"
          >
            {team.name}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-2 sm:mt-3 max-w-2xl text-sm sm:text-base text-white/90 drop-shadow"
          >
            {team.description}
          </motion.p>
        </div>
        {/* Horizontal track that GSAP will animate */}
        <div className="pin-wrapper">
          <motion.div
            className="track flex gap-4 sm:gap-6 md:gap-8 will-change-transform"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {team.members.map((m, i) => (
              <MemberCard key={i} member={m} teamName={team.name} />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
const TeamPanelWithRef = React.forwardRef(TeamPanel);

export default function TP() {
  const sectionsRef = useRef([]);
  const scrollProgressRef = useRef(null);

  // Scroll progress for the progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Prevent header glitching by using a stable animation state
  const [headerLoaded, setHeaderLoaded] = React.useState(false);

  React.useEffect(() => {
    setHeaderLoaded(true);
  }, []);

  // GSAP Animations for horizontal scroll effects
  useEffect(() => {
    const scrollTriggers = []; // Store ScrollTrigger instances for cleanup

    // Team section horizontal scroll animations
    sectionsRef.current.forEach((section, index) => {
      if (!section) return;

      const track = section.querySelector(".track");
      if (!track) return;

      // Optimized scroll distance calculation
      const getScrollDistance = () => {
        const containerWidth = section.clientWidth;
        const isMobile = containerWidth < 768;

        // Cache card elements to avoid repeated DOM queries
        const cards = track.querySelectorAll(".member-card");
        if (!cards.length) return 0;

        // Get actual card dimensions
        const cardWidth = cards[0].offsetWidth;
        const gapWidth = isMobile ? 16 : 32;

        // Calculate total track width
        const totalTrackWidth =
          cards.length * cardWidth + (cards.length - 1) * gapWidth;

        // Calculate scroll distance to show all cards
        const scrollDistance = Math.max(0, totalTrackWidth - containerWidth);

        // Add buffer for smooth transition
        const buffer = isMobile ? 300 : 500;

        return scrollDistance + buffer;
      };

      const scrollDistance = getScrollDistance();

      if (scrollDistance > 0) {
        // Single ScrollTrigger for both mobile and desktop with larger buffer
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance + 1500}`, // Large buffer to prevent next team from appearing
          scrub: 1,
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
          onEnter: () => {
            gsap.set(section, { visibility: "visible" });
          },
          onUpdate: (self) => {
            const progress = self.progress;

            // Apply horizontal scroll with easing
            const easedProgress = gsap.utils.clamp(0, 1, progress);
            const horizontalProgress = gsap.utils.wrap(0, 1, easedProgress);

            // Apply horizontal scroll
            gsap.set(track, {
              x: -scrollDistance * horizontalProgress,
            });

            // Subtle parallax effect (only if cards exist)
            const cards = track.querySelectorAll(".member-card");
            if (cards.length > 0) {
              cards.forEach((card, i) => {
                const cardOffset = i * 0.02 * horizontalProgress; // Reduced intensity
                gsap.set(card, {
                  y: cardOffset * 5,
                  rotation: cardOffset * 0.3,
                });
              });
            }
          },
          onLeave: () => {
            gsap.set(section, { clearProps: "transform,visibility" });
          },
          onRefresh: () => {
            gsap.set(section, { clearProps: "transform" });
          },
        });

        scrollTriggers.push(trigger);
      }

      // Optimized background animation
      const bgOverlay = section.querySelector(".bg-overlay");
      if (bgOverlay) {
        gsap.to(bgOverlay, {
          y: -15,
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    });

    // Parallax effect for the main container
    const parallaxTrigger = gsap.to(".parallax-bg", {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: ".teams-container",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Refresh ScrollTrigger on resize with debouncing
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      // Kill all ScrollTrigger instances
      scrollTriggers.forEach((trigger) => trigger.kill());
      ScrollTrigger.killAll();

      // Remove event listeners
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };

    // Initial refresh
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.killAll();
    };
  }, []);

  // Calculate total members across all teams
  const totalMembers = TEAMS.reduce(
    (sum, team) => sum + team.members.length,
    0
  );

  return (
    <main className="min-h-screen w-full bg-black text-zinc-100 selection:bg-white/10 relative overflow-hidden">
      {/* Parallax background */}
      <div className="parallax-bg absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-800" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 origin-left z-50"
        style={{ scaleX }}
      />
      {/* Top hero / stats grid */}
      <motion.section
        className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 sm:pt-16 pb-16 sm:pb-24 relative z-10"
        initial={{ opacity: 0 }}
        animate={headerLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <header className="mb-8 sm:mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={
              headerLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 1, ease: "easeOut" }}
            className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
          >
            Teams
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={
              headerLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="hero-subtitle mt-2 sm:pt-3 text-sm sm:text-base text-zinc-300 max-w-2xl"
          >
            Scroll down. Each section reveals its members with smooth
            animations.
          </motion.p>
        </header>
        {/* Hero Section with "Small BUT MIGHTY" */}
        <motion.div
          className="hero-section mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={headerLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Title */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span className="text-purple-400">||SMALL BUT||</span>
                <br />
                <span className="text-pink-400">MIGHTY</span>
              </h2>
              <p className="mt-4 text-lg sm:text-xl text-zinc-300 max-w-lg">
                We may be small in numbers, but our impact is enormous. Each
                team member brings unique skills and passion to create something
                extraordinary.
              </p>
            </div>

            {/* Right side - Stats Grid */}
            <div className="stats-grid">
              {/* Top row - Two larger, squarish rectangles */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                {[
                  {
                    value: totalMembers,
                    label: "MEMBERS",
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    value: TEAMS.length,
                    label: "TEAMS",
                    color: "from-blue-500 to-cyan-500",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={
                      headerLoaded
                        ? { opacity: 1, scale: 1, y: 0 }
                        : { opacity: 0, scale: 0.8, y: 30 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: 0.5 + i * 0.1,
                      ease: "backOut",
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`rounded-2xl border border-zinc-700/60 bg-zinc-900/60 p-6 sm:p-8 text-center hover:bg-zinc-800/60 transition-all duration-300 cursor-pointer relative overflow-hidden aspect-square`}
                  >
                    {/* Background gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 transition-opacity duration-300 group-hover:opacity-20`}
                    />

                    <div className="relative z-10">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-black">
                        {stat.value}
                      </div>
                      <div className="mt-2 text-sm sm:text-base tracking-widest text-zinc-400 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom row - Two smaller, wider rectangles */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {[
                  {
                    value: "50+",
                    label: "EVENTS",
                    color: "from-emerald-500 to-teal-500",
                  },
                  {
                    value: "∞",
                    label: "IMPACT",
                    color: "from-orange-500 to-red-500",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={i + 2}
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={
                      headerLoaded
                        ? { opacity: 1, scale: 1, y: 0 }
                        : { opacity: 0, scale: 0.8, y: 30 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: 0.7 + i * 0.1,
                      ease: "backOut",
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`rounded-2xl border border-zinc-700/60 bg-zinc-900/60 p-4 sm:p-6 text-center hover:bg-zinc-800/60 transition-all duration-300 cursor-pointer relative overflow-hidden aspect-[3/2]`}
                  >
                    {/* Background gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 transition-opacity duration-300 group-hover:opacity-20`}
                    />

                    <div className="relative z-10">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-black">
                        {stat.value}
                      </div>
                      <div className="mt-1 sm:mt-2 text-xs sm:text-sm tracking-widest text-zinc-400 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Team sections with GSAP animations - no gaps */}
      <div className="teams-container" style={{ margin: 0, padding: 0 }}>
        {TEAMS.map((t, i) => (
          <TeamPanelWithRef
            key={t.id}
            team={t}
            ref={(el) => (sectionsRef.current[i] = el)}
          />
        ))}
      </div>

      {/* Footer spacer */}
      <section className="h-[30vh] sm:h-[50vh] flex items-center justify-center text-zinc-400">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xl font-light"
        >
          That's everyone! ✨
        </motion.p>
      </section>
    </main>
  );
}
