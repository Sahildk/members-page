import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Instagram } from "lucide-react";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Dummy Data for Teams
const TEAMS = [
  {
    name: "Core Team",
    description: "Handles the core operations and decisions.",
    color: "bg-red-500",
    members: [
      {
        name: "Sahil Deore",
        role: "Co-Head",
        img: "/assets/sahil.svg",
        socials: {},
      },
      {
        name: "John Doe",
        role: "Head",
        img: "https://via.placeholder.com/300",
        socials: {},
      },
      {
        name: "Jane Smith",
        role: "Member",
        img: "https://via.placeholder.com/300",
        socials: {},
      },
      {
        name: "Emily White",
        role: "Coordinator",
        img: "https://via.placeholder.com/300",
        socials: {},
      },
      {
        name: "Michael Brown",
        role: "Member",
        img: "https://via.placeholder.com/300",
        socials: {},
      },
      {
        name: "Sophia Johnson",
        role: "Member",
        img: "https://via.placeholder.com/300",
        socials: {},
      },
      {
        name: "David Wilson",
        role: "Member",
        img: "https://via.placeholder.com/300",
        socials: {},
      },
    ],
  },
  {
    name: "Website Team",
    description: "Developers and designers building our platform.",
    color: "bg-blue-500",
    members: [
      {
        name: "Alice Dev",
        role: "Co-Head",
        img: "https://via.placeholder.com/300",
        socials: {},
      },
      {
        name: "Bob Coder",
        role: "Head",
        img: "https://via.placeholder.com/300",
        socials: {},
      },
      {
        name: "Chris Frontend",
        role: "Developer",
        img: "https://via.placeholder.com/300",
        socials: {},
      },
      {
        name: "Diana Backend",
        role: "Developer",
        img: "https://via.placeholder.com/300",
        socials: {},
      },
      {
        name: "Ethan UIUX",
        role: "Designer",
        img: "https://via.placeholder.com/300",
        socials: {},
      },
      {
        name: "Fiona QA",
        role: "Tester",
        img: "https://via.placeholder.com/300",
        socials: {},
      },
      {
        name: "George Ops",
        role: "Member",
        img: "https://via.placeholder.com/300",
        socials: {},
      },
    ],
  },
];

// Member Card Component
const MemberCard = ({ member, teamColor, teamName }) => (
  <div
    className={`relative min-w-[280px] h-[400px] rounded-2xl shadow-xl text-white flex flex-col overflow-hidden ${teamColor} font-['Inter']`}
  >
    {/* Team label on the left */}
    <div className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center">
      <p className="text-lg font-bold rotate-[-90deg] tracking-wider text-white whitespace-nowrap">
        {teamName.toUpperCase()}
      </p>
    </div>

    {/* Image + role overlay */}
    <div className="relative w-full h-2/3 pl-10 pr-4 pt-4">
      <img
        src={member.img}
        alt={member.name}
        className="w-full h-full object-cover rounded-2xl"
      />
      <div className="absolute bottom-2 left-12 bg-black/60 px-3 py-1 rounded-lg">
        <p className="text-sm font-bold uppercase">{member.role}</p>
      </div>
    </div>

    {/* Name + socials */}
    <div className="flex flex-col justify-between flex-1 px-10 py-4">
      <h2 className="text-xl font-semibold tracking-wide leading-snug">
        {member.name}
      </h2>
      <div className="flex gap-4 mt-3">
        <Github className="cursor-pointer" />
        <Linkedin className="cursor-pointer" />
        <Instagram className="cursor-pointer" />
      </div>
    </div>
  </div>
);

// Team Section Component
const TeamSection = ({ team }) => {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollContent = scrollRef.current;

    let scrollWidth = scrollContent.scrollWidth;
    let viewportWidth = window.innerWidth;
    let totalScroll = scrollWidth - viewportWidth;

    const ctx = gsap.context(() => {
      gsap.to(scrollContent, {
        x: -totalScroll,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + (totalScroll + viewportWidth),
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen overflow-hidden relative font-['Inter']"
    >
      <div className="p-10 pb-4 sticky top-0 left-0 bg-black z-10">
        <h1 className="text-5xl font-black text-white tracking-tight uppercase">
          {team.name}
        </h1>
        <p className="text-lg font-light text-gray-300 tracking-wide">
          {team.description}
        </p>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-6 px-10 pt-2 h-full items-center will-change-transform"
      >
        {team.members.map((member, index) => (
          <MemberCard
            key={index}
            member={member}
            teamColor={team.color}
            teamName={team.name}
          />
        ))}
      </div>
    </section>
  );
};

// Main Teams Page
export default function TeamsPage() {
  const statsRef = useRef([]);

  useEffect(() => {
    statsRef.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
          delay: i * 0.1,
        }
      );
    });
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-['Inter']">
      <header className="flex justify-between items-center px-10 py-6 border-b border-gray-700">
        <h1 className="text-2xl font-extrabold tracking-wider uppercase">
          ECell
        </h1>
        <nav className="flex gap-6 text-sm font-medium tracking-wide">
          <a href="#" className="hover:text-gray-400">
            Home
          </a>
          <a href="#" className="hover:text-gray-400">
            About
          </a>
          <a href="#" className="hover:text-gray-400">
            Events
          </a>
          <a href="#" className="hover:text-gray-400">
            Team
          </a>
          <a href="#" className="hover:text-gray-400">
            Newsletter
          </a>
          <button className="bg-purple-600 px-4 py-2 rounded-lg font-semibold tracking-tight">
            Sponsor Us
          </button>
        </nav>
      </header>

      <section className="px-10 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-8xl font-black  tracking-wide leading-tight uppercase">
            ||SMALL BUT|| MIGHTY
          </h2>
          <p className="text-xl font-light text-gray-300 mt-4 tracking-wide">
            A glimpse of our strength and goals
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {[
            { value: "20+", label: "Active Members", color: "bg-purple-700" },
            {
              value: "10+",
              label: "Projects Completed",
              color: "bg-green-600",
            },
            { value: "5", label: "Core Teams", color: "bg-blue-600" },
            { value: "1000+", label: "Community Reach", color: "bg-red-600" },
          ].map((stat, idx) => (
            <div
              key={idx}
              ref={(el) => (statsRef.current[idx] = el)}
              className={`${stat.color} rounded-xl p-6 text-center`}
            >
              <h3 className="text-4xl font-extrabold tracking-tight">
                {stat.value}
              </h3>
              <p className="text-gray-300 font-light tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {TEAMS.map((team, idx) => (
        <TeamSection key={idx} team={team} />
      ))}
    </div>
  );
}
