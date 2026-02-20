"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/* ─────────────────────────── COLOUR PALETTE (CSS VARS) ─────────────────────────── */
// These constants now reference the CSS variables defined in globals.css
const C = {
  pageBg:    "var(--background)",
  cardBg:    "var(--card)",
  lavender:  "var(--lavender)",
  plum:      "var(--plum)",
  orchid:    "var(--orchid)",
  violet:    "var(--violet)",
  textDark:  "var(--text-dark)",
  textMid:   "var(--text-mid)",
  textLight: "var(--text-light)",
  border:    "var(--card-border)",
  heroBg:    "var(--hero-bg)",
  sectionAlt:"var(--section-alt)",
};

/* ─────────────────────────────── DATA ─────────────────────────────── */
const NAV_LINKS = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education",  href: "#education" },
  { label: "Contact",    href: "#contact" },
];

const STRATEGIC_SKILLS = [
  { title: "Requirements Engineering", desc: "Specialising in eliciting, documenting, and validating functional and non-functional requirements to ensure alignment between business needs and IT solutions." },
  { title: "Process Modelling & Optimisation", desc: "Identifying bottlenecks and inefficiencies in existing workflows and designing 'to-be' processes that drive operational excellence." },
  { title: "Stakeholder Collaboration", desc: "Acts as a bridge between technical teams and business units, translating complex data into actionable strategies." },
  { title: "UAT & Quality Assurance", desc: "Leading user acceptance testing phases, designing test cases, and ensuring final deliverables meet strict business criteria." },
  { title: "Project Management", desc: "Familiar with both Agile and Waterfall methodologies, facilitating smooth project coordination and timely delivery." },
];

const TECHNICAL_CORE = [
  { title: "Data Analytics & SQL (Learning)", desc: "Currently developing proficiency in querying databases to extract insights and exploring Python for data manipulation and predictive analysis." },
  { title: "Oracle Cloud Infrastructure", desc: "Certified Associate building deep knowledge of OCI, ERP systems, and AI foundations within the cloud ecosystem." },
  { title: "BI & Reporting Dashboards (Beginner)", desc: "Learning to develop interactive visualizations in Power BI and Oracle to monitor KPIs and SLA adherence." },
  { title: "Full-Stack Aware (Learning)", desc: "Acquiring a working knowledge of React, Node.js, and HTML5 to foster seamless communication with development teams." },
];

const EXPERIENCE = [
  {
    role: "Service Delivery Analyst Intern",
    company: "RedMPS.com",
    period: "Sep 2025 – Present",
    points: [
      "Monitored SLA adherence and service quality across Oracle Cloud environments",
      "Designed interactive dashboards for reporting and executive decision-making",
      "Conducted UAT — prepared test cases, logged defects, and validated system functionality",
      "Presented performance insights and UAT outcomes to clients and stakeholders",
      "Collaborated with business users, developers, and service teams",
    ],
  },
  {
    role: "Business Analyst Intern",
    company: "Impactful Specialist Solutions",
    period: "May 2025 – Aug 2025",
    points: [
      "Assisted in project planning and coordination across multiple initiatives",
      "Conducted requirements-gathering sessions and documented findings",
      "Analyzed project data to support informed decision-making",
      "Contributed to solution design and process improvement efforts",
    ],
  },
  {
    role: "Lead Generation Agent",
    company: "IPS",
    period: "Mar 2025 – May 2025",
    points: [
      "Completed call centre training focused on customer engagement",
      "Identified and engaged potential customers through outbound calls",
      "Generated qualified leads to support the sales pipeline",
    ],
  },
  {
    role: "Work Integrated Learning (IT Dept.)",
    company: "Rosebank College",
    period: "Aug 2024 – Nov 2024",
    points: [
      "Analyzed existing business processes to identify inefficiencies",
      "Gathered and documented functional and non-functional requirements",
      "Recommended new system implementations to improve operational workflows",
    ],
  },
];

const EDUCATION = [
  {
    institution: "IIE Rosebank College",
    qualification: "Bachelor of Information Technology in Business Systems",
    year: "2024",
    icon: "🎓",
  },
  {
    institution: "President High School",
    qualification: "National Senior Certificate",
    year: "2021",
    icon: "🏫",
  },
];

const CERTIFICATIONS = [
  {
    title: "Oracle Fusion Cloud ERP Process Essentials Certified",
    subtitle: "Rel 1", icon: "🏅",
    badgeUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=67C4DEEF7C9B740D0C083D2C130AD0FE77C197B66DE7899D1CE49823A5E91B28",
  },
  {
    title: "OCI 2025 Foundations Associate",
    subtitle: "Oracle Cloud Infrastructure", icon: "☁️",
    badgeUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=5FDF5504BDDDCC014C6E43EEA9669BA166551951500CC9B77863D16CDE63BA60",
  },
  {
    title: "OCI 2025 Architect Associate",
    subtitle: "Oracle Cloud Infrastructure", icon: "🏗️",
    badgeUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=E85032B1237B19BAC88D6D257214D7792A2268B5164FE3BA816F901E301F0200",
  },
  {
    title: "OCI 2025 AI Foundations Associate",
    subtitle: "Oracle Cloud Infrastructure", icon: "🤖",
    badgeUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=063022996F0A2ADDC48C2D27CBED2927F1EE9B0CF83E9EF50D82004C81E0E127",
  },
  { title: "Golden Key Honorary Society", subtitle: "2024", icon: "🔑", badgeUrl: null },
  { title: "Computer Literacy",           subtitle: "2022", icon: "💻", badgeUrl: null },
];

/* ─────────────────────────────── THEME TOGGLE ─────────────────────────────── */
function ThemeToggle({ darkMode, toggleDarkMode }: { darkMode: boolean, toggleDarkMode: () => void }) {
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full transition-colors hover:bg-lavender group"
      style={{ color: C.textDark }}
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <span className="text-xl group-hover:scale-110 transition-transform inline-block">
        {darkMode ? "☀️" : "🌙"}
      </span>
    </button>
  );
}

/* ─────────────────────────────── NAV ─────────────────────────────── */
function Navbar({ darkMode, toggleDarkMode }: { darkMode: boolean, toggleDarkMode: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ backgroundColor: "var(--nav-bg)", borderBottom: `1px solid ${C.border}`, boxShadow: "var(--nav-shadow)" }}
      className="sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div style={{ border: `2px solid ${C.orchid}` }}
            className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 photo-glow">
            <Image src="/thando.png" alt="Thando" width={36} height={36} className="w-full h-full object-cover" />
          </div>
          <span style={{ color: C.textDark }} className="font-bold text-base tracking-tight">
            Thando Mathebula
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} style={{ color: C.textMid }} className="nav-link">
              {l.label}
            </a>
          ))}
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <button onClick={() => setOpen(!open)} className="p-2" style={{ color: C.textDark }}>
            <span className="text-xl">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <div style={{ backgroundColor: "var(--nav-bg)", borderTop: `1px solid ${C.border}` }}
          className="md:hidden px-6 pb-4 flex flex-col gap-4">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ color: C.textMid }} className="nav-link">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────────── HERO ─────────────────────────────── */
function Hero() {
  return (
    <section style={{ background: C.heroBg }} className="py-20 px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-shrink-0 flex flex-col items-center gap-4 fade-up fade-up-1">
          <div style={{ border: `4px solid ${C.orchid}` }}
            className="w-48 h-48 rounded-full overflow-hidden photo-glow">
            <Image src="/thando.png" alt="Thando Mathebula" width={192} height={192} className="w-full h-full object-cover" priority />
          </div>
        </div>

        <div className="flex-1 text-left">
          <p style={{ color: C.orchid }} className="text-sm font-semibold uppercase tracking-widest mb-3 fade-up fade-up-1">
            Business Analysis · Data Analytics
          </p>
          <h1 style={{ color: C.textDark }} className="text-4xl md:text-5xl font-bold leading-tight mb-3 fade-up fade-up-2">
            Thando Amukelani<br />Mathebula
          </h1>
          <p style={{ color: C.textMid }} className="text-lg font-medium mb-5 fade-up fade-up-2">
            Information Technology in Business Systems Graduate
          </p>
          <p style={{ color: C.textLight }} className="text-base leading-relaxed mb-8 max-w-xl fade-up fade-up-3">
            Business Analysis professional in the making, dedicated to helping organisations align strategy, systems, and data.
            I specialise in identifying gaps, optimising processes, and delivering solutions that create real business value.
          </p>
          <div className="flex flex-wrap gap-4 fade-up fade-up-4">
            <a href="#contact" className="btn-primary">Get in touch</a>
            <a href="https://www.linkedin.com/in/thando-mathebula-995b82323" target="_blank" rel="noopener noreferrer" className="btn-outline">
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── ABOUT ─────────────────────────────── */
function About() {
  return (
    <section id="about" className="py-20 px-6" style={{ backgroundColor: C.sectionAlt }}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 style={{ color: C.textDark }} className="text-3xl font-bold mb-4">About Me</h2>
        <hr className="section-divider mb-8" />
        <div className="purple-card p-8 text-left transition-colors duration-300">
          <p style={{ color: C.textMid }} className="text-base leading-relaxed mb-4">
            As a <strong>Bachelor of Information Technology in Business Systems</strong> graduate, I have developed a strong
            analytical mindset tailored for the modern enterprise. My focus lies at the intersection of process engineering
            and data insight, where I transform raw requirements into strategic digital assets.
          </p>
          <p style={{ color: C.textMid }} className="text-base leading-relaxed">
            I believe that every business challenge is an opportunity for a better system. Whether it&apos;s identifying
            process gaps or leveraging cloud-based AI to drive efficiency, I am committed to delivering excellence.
            Recognised by the <strong>Golden Key Honorary Society</strong>, I bring academic rigour and a results-driven
            approach to every project.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── SKILLS ─────────────────────────────── */
function Skills() {
  return (
    <section id="skills" className="py-20 px-6" style={{ backgroundColor: C.pageBg }}>
      <div className="max-w-5xl mx-auto">
        <h2 style={{ color: C.textDark }} className="text-3xl font-bold text-center mb-4">Skills &amp; Expertise</h2>
        <hr className="section-divider mb-12" />

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 style={{ color: C.textDark }} className="text-lg font-bold mb-6 flex items-center gap-2">
              <span>📈</span> Strategic Analysis
            </h3>
            <div className="flex flex-col gap-4">
              {STRATEGIC_SKILLS.map(s => (
                <div key={s.title} className="purple-card p-5 group hover:translate-x-2 transition-transform duration-300">
                  <h4 style={{ color: C.orchid }} className="font-bold text-sm mb-1">{s.title}</h4>
                  <p style={{ color: C.textMid }} className="text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ color: C.textDark }} className="text-lg font-bold mb-6 flex items-center gap-2">
              <span>💻</span> Technical Engineering
            </h3>
            <div className="flex flex-col gap-4">
              {TECHNICAL_CORE.map(s => (
                <div key={s.title} className="purple-card p-5 group hover:translate-x-2 transition-transform duration-300">
                  <h4 style={{ color: C.orchid }} className="font-bold text-sm mb-1">{s.title}</h4>
                  <p style={{ color: C.textMid }} className="text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── EXPERIENCE ─────────────────────────────── */
function Experience() {
  return (
    <section id="experience" className="py-20 px-6" style={{ backgroundColor: C.sectionAlt }}>
      <div className="max-w-4xl mx-auto">
        <h2 style={{ color: C.textDark }} className="text-3xl font-bold text-center mb-4">Professional Experience</h2>
        <hr className="section-divider mb-12" />

        <div className="flex flex-col gap-6">
          {EXPERIENCE.map((job, i) => (
            <div key={i} className="accent-card p-7">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                <div>
                  <h3 style={{ color: C.textDark }} className="font-bold text-base">{job.role}</h3>
                  <span style={{ color: C.orchid }} className="text-sm font-semibold">{job.company}</span>
                </div>
                <span style={{ color: C.violet, backgroundColor: C.lavender }}
                  className="badge-hover text-xs font-semibold px-3 py-1 rounded-full self-start sm:self-auto whitespace-nowrap">
                  {job.period}
                </span>
              </div>
              <ul className="space-y-2 mt-3">
                {job.points.map((pt, j) => (
                  <li key={j} className="skill-item">
                    <span style={{ color: C.orchid }} className="mt-1 text-xs flex-shrink-0">▸</span>
                    <span style={{ color: C.textMid }} className="text-sm leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── EDUCATION ─────────────────────────────── */
function Education() {
  return (
    <section id="education" className="py-20 px-6" style={{ backgroundColor: C.pageBg }}>
      <div className="max-w-4xl mx-auto">
        <h2 style={{ color: C.textDark }} className="text-3xl font-bold text-center mb-4">
          Education &amp; Credentials
        </h2>
        <hr className="section-divider mb-12" />

        <h3 style={{ color: C.textLight }} className="text-xs font-semibold uppercase tracking-widest mb-5">
          🎓 Formal Education
        </h3>
        <div className="grid sm:grid-cols-2 gap-5 mb-12">
          {EDUCATION.map((edu, i) => (
            <div key={i} className="purple-card p-6 flex gap-4">
              <span className="text-3xl">{edu.icon}</span>
              <div>
                <p style={{ color: C.textDark }} className="font-bold text-sm leading-snug">{edu.qualification}</p>
                <p style={{ color: C.orchid }} className="text-sm font-medium mt-1">{edu.institution}</p>
                <p style={{ color: C.textLight }} className="text-xs mt-1">{edu.year}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 style={{ color: C.textLight }} className="text-xs font-semibold uppercase tracking-widest mb-5">
          🏅 Professional Badges
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATIONS.map((cert, i) => (
            cert.badgeUrl ? (
              <a key={i} href={cert.badgeUrl} target="_blank" rel="noopener noreferrer"
                className="accent-card p-5 flex gap-4 items-start cursor-pointer transition-all duration-300">
                <span className="text-2xl">{cert.icon}</span>
                <div>
                  <p style={{ color: C.textDark }} className="font-semibold text-sm leading-snug">{cert.title} ↗</p>
                  <p style={{ color: C.textLight }} className="text-xs mt-1">{cert.subtitle}</p>
                </div>
              </a>
            ) : (
              <div key={i} className="accent-card p-5 flex gap-4 items-start">
                <span className="text-2xl">{cert.icon}</span>
                <div>
                  <p style={{ color: C.textDark }} className="font-semibold text-sm leading-snug">{cert.title}</p>
                  <p style={{ color: C.textLight }} className="text-xs mt-1">{cert.subtitle}</p>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── CONTACT ─────────────────────────────── */
function Contact() {
  return (
    <section id="contact" className="py-20 px-6" style={{ backgroundColor: C.sectionAlt }}>
      <div className="max-w-xl mx-auto text-center">
        <h2 style={{ color: C.textDark }} className="text-3xl font-bold mb-4">Get in Touch</h2>
        <hr className="section-divider mb-8" />
        <p style={{ color: C.textMid }} className="text-base mb-10 leading-relaxed">
          I am currently available for Business Analyst and Data Analyst roles.
          Let&apos;s discuss how I can help your organisation align strategy with data.
        </p>

        <div className="purple-card p-8 text-left flex flex-col gap-2 mb-8">
          <a href="mailto:amumathebula22@gmail.com" className="contact-row">
            <span className="text-2xl">📧</span>
            <div>
              <p style={{ color: C.textLight }} className="text-xs font-semibold uppercase tracking-wider">Email</p>
              <p style={{ color: C.textDark }} className="text-sm font-medium">amumathebula22@gmail.com</p>
            </div>
          </a>
          <a href="tel:+27813781923" className="contact-row">
            <span className="text-2xl">📱</span>
            <div>
              <p style={{ color: C.textLight }} className="text-xs font-semibold uppercase tracking-wider">Phone</p>
              <p style={{ color: C.textDark }} className="text-sm font-medium">081 378 1923</p>
            </div>
          </a>
          <a href="https://www.linkedin.com/in/thando-mathebula-995b82323" target="_blank" rel="noopener noreferrer" className="contact-row">
            <span className="text-2xl">💼</span>
            <div>
              <p style={{ color: C.textLight }} className="text-xs font-semibold uppercase tracking-wider">LinkedIn</p>
              <p style={{ color: C.orchid }} className="text-sm font-medium">linkedin.com/in/thando-mathebula-995b82323 ↗</p>
            </div>
          </a>
        </div>
        <a href="mailto:amumathebula22@gmail.com" className="btn-primary">Send me an email</a>
      </div>
    </section>
  );
}

/* ─────────────────────────────── FOOTER ─────────────────────────────── */
function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--nav-bg)", borderTop: `1px solid ${C.border}` }} className="py-8 px-6 text-center">
      <p style={{ color: C.textLight }} className="text-sm">
        © 2026 Thando Amukelani Mathebula · Powered by Data & Systems.
      </p>
    </footer>
  );
}

/* ─────────────────────────────── PAGE ─────────────────────────────── */
export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  // Synchronize 'dark' class on <html> for global CSS variable switching
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <main className="bg-background text-foreground transition-colors duration-300 min-h-screen">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
