import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  ExternalLink,
  FolderKanban,
  GraduationCap,
  Heart,
  House,
  Languages as LanguagesIcon,
  Mail,
  Sparkles,
  User,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { LiquidDock } from "./components/LiquidDock";

type NavItem = {
  id: string;
  label: string;
  icon: typeof House;
};

type Project = {
  title: string;
  category: string;
  description: string;
  stack: string[];
  image: string;
  links: {
    github?: string;
    live?: string;
  };
};

type TimelineNode = {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  dateRange: string;
  bullets: string[];
  projects?: string;
  icon: typeof BriefcaseBusiness;
};

type SkillCategory = {
  title: string;
  icon: typeof Code2;
  items: string[];
};

type Certification = {
  title: string;
  org: string;
  dateRange: string;
  note?: string;
  bullets?: string[];
};

type EducationEntry = {
  degree: string;
  school: string;
  year: string;
  detail: string;
};

type LanguageEntry = {
  name: string;
  level: string;
};

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: House },
  { id: "about", label: "About", icon: User },
  { id: "road", label: "Timeline", icon: BriefcaseBusiness },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "credentials", label: "Credentials", icon: GraduationCap },
  { id: "contact", label: "Contact Me", icon: Mail },
];

const timelineNodes: TimelineNode[] = [
  {
    id: "grapes",
    type: "Full-time",
    title: "Junior Flutter Developer",
    subtitle: "Grapes IDMR — Thrissur",
    dateRange: "May 2024 — Mar 2025",
    bullets: [
      "Built and maintained cross-platform mobile apps using Flutter across healthcare, employee management, and smart control systems.",
      "Designed responsive UIs using Figma and Justinmind, implemented in Flutter based on MVC and MVVM architectures; migrated apps from GetX to Provider for improved maintainability.",
      "Integrated REST APIs, real-time updates, and Firebase Cloud Messaging (FCM).",
      "Used Git for version control and collaboration.",
    ],
    projects: "CSSD, DiaLog, Grapes Office Log, Smart Device Management, MyHRM QR, NameBoard, BSA",
    icon: BriefcaseBusiness,
  },
  {
    id: "famlaika",
    type: "Part-time",
    title: "Flutter Developer (Part-time)",
    subtitle: "Famlaika — Remote",
    dateRange: "Apr 2025 — Jun 2025",
    bullets: [
      "Improved code maintainability by separating UI from business logic using Provider and clean architectural practices.",
      "Supported development workflows by introducing tools and practices that improved debugging and development efficiency.",
      "Contributed to the development and enhancement of the Family Tree module, ensuring scalable data handling and intuitive UI behavior.",
    ],
    icon: Zap,
  },
  {
    id: "vonnue",
    type: "Internship",
    title: "Full Stack Developer Intern",
    subtitle: "Vonnue — Sultan Bathery",
    dateRange: "Jul 2025 — Mar 2026",
    bullets: [
      "Engaged in a comprehensive 6-month training and internship program centered on developing scalable and efficient web applications.",
      "Gained hands-on experience with React.js, Tailwind CSS, JavaScript, HTML, and Firestore through real-world full stack development projects.",
      "Designed and implemented dynamic, responsive user interfaces with a strong emphasis on clean, intuitive UI/UX.",
    ],
    projects:
      "Recipedia, Daily Logs Calculator, Meal Cast, Dice Game, Amoled Clock, Doordash, AirBnb, Biosynthesis, Myntra (mobile view)",
    icon: GraduationCap,
  },
  {
    id: "benjamin",
    type: "Freelance",
    title: "Freelance Web Developer",
    subtitle: "Benjamin Portfolio Website — Remote",
    dateRange: "May 2026 — Jul 2026",
    bullets: [
      "Designed and developed a personal portfolio website for a freelance client (a designer and video editor), translating a custom Figma UI/UX design into a fully responsive, production site — benjamincs.com.",
      "Built a parallax scrolling homepage along with a separate map-style interactive homepage, with distinct layouts and interactions for desktop and mobile.",
      "Integrated Cloudinary to dynamically fetch and display the client's art/video portfolio, using self-generating scripts to auto-generate and list media items from the Cloudinary library.",
      "Implemented a contact form using EmailJS for direct client inquiries without a backend server.",
      "Deployed the site on Vercel and configured the custom domain via Hostinger.",
    ],
    projects: "GitHub: github.com/Hishamkool/portfolio_benjamin",
    icon: Sparkles,
  },
  {
    id: "leaderit",
    type: "Full-time",
    title: "Associate Software Developer",
    subtitle: "LeaderIT — Trivandrum",
    dateRange: "May 2026 — Present",
    bullets: [
      "Working on Automax, a workflow automation platform for managing business operations, user access, and organizational structure with enterprise-grade security.",
      "Building and maintaining responsive front-end features using React.js, focused on clean, intuitive interfaces for complex operational workflows.",
      "Expanding into cross-platform mobile development with React Native, applying core React concepts to build and test mobile-friendly features alongside the web application.",
    ],
    icon: BriefcaseBusiness,
  },
];

const projects: Project[] = [
  {
    title: "Benjamin Portfolio",
    category: "Freelance",
    description:
      "A fully responsive freelance portfolio for a designer & video editor — a parallax scrolling homepage and a separate map-style interactive homepage, with a Cloudinary-powered media library built from a custom Figma design.",
    stack: ["React", "Tailwind CSS", "Cloudinary", "EmailJS", "Vercel"],
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=900&q=80",
    links: {
      github: "https://github.com/Hishamkool/portfolio_benjamin",
      live: "https://benjamincs.com",
    },
  },
  {
    title: "Automax",
    category: "React",
    description:
      "Enterprise workflow automation platform for managing business operations, user access, and organizational structure with enterprise-grade security. Expanding into React Native for mobile-friendly features.",
    stack: ["React.js", "React Native", "Enterprise", "Workflow Automation"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    links: {},
  },
  {
    title: "Recipedia",
    category: "React",
    description:
      "A recipe discovery app with search and category browsing, built during the Vonnue full-stack internship.",
    stack: ["React", "Tailwind CSS", "JavaScript"],
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
    links: {},
  },
  {
    title: "Daily Logs Calculator",
    category: "React",
    description:
      "A utility app for tracking and calculating daily work and activity logs, with a clean, form-driven interface.",
    stack: ["React", "Tailwind CSS", "JavaScript"],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    links: {},
  },
  {
    title: "Meal Cast",
    category: "React",
    description:
      "A meal planning and forecasting interface with a clean, card-based UI for browsing and organizing meals.",
    stack: ["React", "Tailwind CSS", "JavaScript"],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    links: {},
  },
  {
    title: "Dice Game",
    category: "React",
    description:
      "An interactive dice game with real-time state updates and score tracking.",
    stack: ["React", "JavaScript"],
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
    links: {},
  },
  {
    title: "Amoled Clock",
    category: "React",
    description:
      "A minimal, dark-themed digital clock UI optimized for AMOLED screens.",
    stack: ["React", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    links: {},
  },
  {
    title: "Doordash (Clone)",
    category: "React",
    description:
      "A food delivery UI clone focused on responsive restaurant listings and cart flows.",
    stack: ["React", "Tailwind CSS", "JavaScript"],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    links: {},
  },
  {
    title: "AirBnb (Clone)",
    category: "React",
    description:
      "A property listing and booking UI clone with search, filters, and a responsive listing grid.",
    stack: ["React", "Tailwind CSS", "JavaScript"],
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
    links: {},
  },
  {
    title: "Biosynthesis",
    category: "React",
    description:
      "An educational interactive UI visualizing the biosynthesis process, built with Firestore-backed content.",
    stack: ["React", "Tailwind CSS", "Firestore"],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    links: {},
  },
  {
    title: "CSSD",
    category: "Flutter",
    description:
      "A Central Sterile Services Department app streamlining hospital sterilization workflow tracking.",
    stack: ["Flutter", "Dart", "Provider", "Firebase"],
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80",
    links: {},
  },
  {
    title: "DiaLog",
    category: "Flutter",
    description:
      "A patient health-log tracking app for recording and monitoring daily diagnostics.",
    stack: ["Flutter", "Dart", "Provider", "Firebase"],
    image:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=900&q=80",
    links: {},
  },
  {
    title: "Grapes Office Log",
    category: "Flutter",
    description:
      "An employee attendance and office activity log management app for internal operations.",
    stack: ["Flutter", "Dart", "Provider", "Firebase"],
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80",
    links: {},
  },
  {
    title: "Smart Device Management",
    category: "Flutter",
    description:
      "An app for controlling and monitoring connected smart devices with real-time status updates.",
    stack: ["Flutter", "Dart", "Provider", "Firebase Cloud Messaging"],
    image:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=900&q=80",
    links: {},
  },
  {
    title: "MyHRM QR",
    category: "Flutter",
    description:
      "A QR-based HR management app for employee check-in/check-out and attendance records.",
    stack: ["Flutter", "Dart", "Provider", "REST API"],
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80",
    links: {},
  },
  {
    title: "NameBoard",
    category: "Flutter",
    description:
      "A digital nameboard and smart signage display management app for kiosk-style screens.",
    stack: ["Flutter", "Dart", "MVC"],
    image:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=900&q=80",
    links: {},
  },
  {
    title: "BSA",
    category: "Flutter",
    description:
      "A streamlined workflow app for internal operations and reporting, built as part of the Grapes IDMR suite.",
    stack: ["Flutter", "Dart", "MVVM"],
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80",
    links: {},
  },
];

const skillCategories: SkillCategory[] = [
  {
    title: "Hard Skills",
    icon: Code2,
    items: [
      "React.js",
      "React Native",
      "Tailwind CSS",
      "JavaScript",
      "HTML",
      "Flutter",
      "Dart",
      "Java",
      "Python",
      "C",
      "C++",
      "Provider (State Management)",
      "MVC",
      "MVVM",
      "Firebase (Auth, Cloud Messaging)",
      "REST API Integration (Dio, Retrofit)",
      "Cloudinary",
      "EmailJS",
      "Git",
      "GitHub",
      "Vercel",
      "Android Studio",
      "VS Code",
      "Figma",
    ],
  },
  {
    title: "Soft Skills",
    icon: Users,
    items: [
      "Attention to Detail",
      "Communication",
      "Results-Driven",
      "Task Prioritization",
      "Continuous Improvement",
    ],
  },
  {
    title: "Interests",
    icon: Heart,
    items: ["Travel", "Photography", "Fitness", "Meditation", "Singing"],
  },
];

const certifications: Certification[] = [
  {
    title: "Android Development Expert (Flutter and Java) Certification",
    org: "Luminar Technolab",
    dateRange: "Aug 2023",
    note: "Certificate: nactetindia.org | Muhammed Hisham, 34152",
  },
  {
    title: "Flutter Development Training",
    org: "Luminar Technolab, Calicut",
    dateRange: "May 2023 – Aug 2023",
    bullets: [
      "Focused on Dart, API integration, plugin usage, and responsive UI development using Flutter.",
      "Built real-world apps: News App, Movie App, Hotel Booking App, Exotic Car App, Instagram Clone",
    ],
  },
];

const education: EducationEntry[] = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    school: "Prist University, Vallam, Thanjavur",
    year: "2023",
    detail: "GPA: 6.95",
  },
  {
    degree: "Higher Secondary Certificate (HSC), Computer Science",
    school: "Cordite Factory Hr. Sec. School, Aruvankadu",
    year: "2017",
    detail: "71.6%",
  },
  {
    degree: "Secondary School Certificate (SSC), CBSE",
    school: "Kendriya Vidyalaya, Aruvankadu",
    year: "2015",
    detail: "CGPA: 9.2",
  },
];

const languages: LanguageEntry[] = [
  { name: "English", level: "Full Professional Proficiency" },
  { name: "Hindi", level: "Full Professional Proficiency" },
  { name: "Tamil", level: "Native / Bilingual Proficiency" },
  { name: "Malayalam", level: "Native Proficiency" },
];

const easing = [0.22, 1, 0.36, 1] as const;

function GlassPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`glass-panel border border-[var(--color-border-glass)] bg-[var(--color-surface-glass)] shadow-[0_8px_32px_0_var(--shadow-glass)] ${className}`}
    >
      {children}
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [projectFilter, setProjectFilter] = useState("All");
  const showDockHoverLabels = true;

  const filters = useMemo(() => ["All", "React", "Flutter", "Freelance"], []);

  const filteredProjects = useMemo(() => {
    if (projectFilter === "All") return projects;
    return projects.filter((project) => project.category === projectFilter);
  }, [projectFilter]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const preferredDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const nextTheme =
      savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : preferredDark
          ? "dark"
          : "light";
    setTheme(nextTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);
    const SCROLL_OFFSET = 160;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + SCROLL_OFFSET;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollPosition) {
          current = id;
        }
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        current = sectionIds[sectionIds.length - 1];
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const scrollToSection = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="page-gradient relative min-h-screen overflow-x-hidden text-(--color-text-primary)">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute right-[-8%] top-[-10%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,_rgba(92,124,255,0.92)_0%,_rgba(92,124,255,0.42)_18%,_rgba(92,124,255,0.1)_38%,_rgba(92,124,255,0)_65%)] blur-[120px] opacity-95" />
        <div className="absolute bottom-[-10%] left-[-8%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(140,164,255,0.3)_0%,_rgba(120,145,255,0.18)_22%,_rgba(120,145,255,0)_60%)] blur-[110px] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12),_transparent_60%)]" />
        <div className="noise-overlay opacity-35" />
      </div>

      <header className="mx-auto w-full max-w-6xl px-4 pb-24 pt-6 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-glass)] bg-[var(--color-surface)] text-sm font-semibold text-[var(--color-text-primary)] shadow-[0_4px_16px_0_var(--shadow-card)]">
              HK
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                Portfolio
              </p>
            </div>
          </div>
        </motion.div>
      </header>

      <main className="mx-auto w-full max-w-6xl space-y-20 px-4 pb-32 md:px-6">
        <section id="home" className="scroll-mt-28 py-10 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easing }}
            className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
          >
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-glass)] bg-[var(--color-surface-glass)] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-text-secondary)] backdrop-blur-xl">
                <Zap className="h-3.5 w-3.5" />
                Available for React.js & Flutter opportunities
              </div>

              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
                  Muhammed Hisham
                </p>
                <h1 className="max-w-xl text-5xl font-semibold tracking-[-0.08em] text-[var(--color-text-primary)] md:text-7xl">
                  React.js Developer
                  <span className="block text-[var(--color-accent-blue)]">
                    & Flutter Developer
                  </span>
                </h1>
              </div>

              <p className="max-w-lg text-lg leading-8 text-[var(--color-text-secondary)]">
                Building clean, responsive interfaces for web and mobile.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollToSection("projects")}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-blue)] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(47,111,237,0.35)] transition-transform hover:-translate-y-0.5"
                >
                  View Work
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-glass)] bg-[var(--color-surface-glass)] px-5 py-3 text-sm font-medium text-[var(--color-text-primary)] backdrop-blur-xl"
                >
                  Contact Me
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="https://linkedin.com/in/hisham-ka"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-glass)] bg-[var(--color-surface-glass)] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-secondary)] backdrop-blur-xl transition-colors hover:text-[var(--color-text-primary)]"
                >
                  LinkedIn
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  href="https://github.com/Hishamkool"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-glass)] bg-[var(--color-surface-glass)] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-secondary)] backdrop-blur-xl transition-colors hover:text-[var(--color-text-primary)]"
                >
                  GitHub
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: easing, delay: 0.12 }}
              className="relative"
            >
              <GlassPanel className="relative overflow-hidden p-5 md:p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(67,112,255,0.18),_transparent_50%)]" />
                <div className="relative space-y-5">
                  <div className="flex items-center justify-between text-[var(--color-text-secondary)]">
                    <span className="text-xs uppercase tracking-[0.24em]">
                      Focus
                    </span>
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.8)]" />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-[var(--color-text-muted)]">
                        Currently building
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">
                        Automax — enterprise workflow automation
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2 text-sm text-[var(--color-text-secondary)]">
                      <div className="rounded-2xl border border-[var(--color-border-glass)] bg-[var(--color-surface)]/60 p-3">
                        <p className="text-[var(--color-text-muted)]">Years</p>
                        <p className="mt-1 text-xl font-semibold text-[var(--color-text-primary)]">
                          2+
                        </p>
                      </div>
                      <div className="rounded-2xl border border-[var(--color-border-glass)] bg-[var(--color-surface)]/60 p-3">
                        <p className="text-[var(--color-text-muted)]">
                          Apps Shipped
                        </p>
                        <p className="mt-1 text-xl font-semibold text-[var(--color-text-primary)]">
                          6+
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          </motion.div>
        </section>

        <section id="about" className="scroll-mt-28 py-12 md:py-14">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
              About
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--color-text-primary)] md:text-5xl">
              Professional Summary
            </h2>
          </div>

          <GlassPanel className="p-6 md:p-8">
            <p className="max-w-3xl text-lg leading-8 text-[var(--color-text-secondary)]">
              Frontend Developer with 2+ years of experience building
              responsive web and mobile applications, currently focused on
              React.js and expanding into React Native. Delivered 6+
              cross-platform mobile apps using Flutter across healthcare,
              workforce, and smart system domains, improving UI responsiveness
              by up to 60% through adaptive layouts for mobile, tablet, and
              kiosk screens. Skilled in building clean, maintainable
              interfaces using React.js and Tailwind CSS, with a strong
              foundation in state management (Provider), REST API
              integration, and real-time features via Firebase. Currently
              contributing to Automax, an enterprise workflow automation
              platform, while continuing to grow expertise across the React
              ecosystem.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Years Experience", value: "2+" },
                { label: "Apps Shipped", value: "6+" },
                { label: "UI Responsiveness Gain", value: "60%" },
                { label: "Companies & Clients", value: "5" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[var(--color-border-glass)] bg-[var(--color-surface)]/60 p-3"
                >
                  <p className="text-xl font-semibold text-[var(--color-text-primary)]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </section>

        <section id="road" className="scroll-mt-28 py-12 md:py-14">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                Experience
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--color-text-primary)] md:text-5xl">
                The road so far
              </h2>
            </div>
          </div>

          <div className="relative ml-2 space-y-8 before:absolute before:left-[18px] before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-[linear-gradient(to_bottom,rgba(146,160,255,0.85),rgba(146,160,255,0.05))] md:ml-4">
            {timelineNodes.map((node, index) => (
              <motion.article
                key={node.id}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: easing, delay: index * 0.1 }}
                className="relative pl-12"
              >
                <div className="absolute left-0 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border-glass)] bg-[var(--color-surface)] text-[var(--color-accent-blue)] shadow-[0_6px_20px_0_var(--shadow-card)]">
                  <node.icon className="h-4 w-4" />
                </div>
                <GlassPanel className="p-5 md:p-6">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                        {node.type}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]">
                        {node.title}
                      </h3>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        {node.subtitle}
                      </p>
                    </div>
                    <span className="rounded-full border border-[var(--color-border-glass)] bg-[var(--color-surface)]/70 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                      {node.dateRange}
                    </span>
                  </div>
                  <ul className="mt-4 max-w-2xl list-disc space-y-1.5 pl-4 text-[var(--color-text-secondary)]">
                    {node.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  {node.projects && (
                    <p className="mt-4 text-sm text-[var(--color-text-muted)]">
                      <span className="uppercase tracking-[0.14em]">
                        Projects:
                      </span>{" "}
                      {node.projects}
                    </p>
                  )}
                </GlassPanel>
              </motion.article>
            ))}
          </div>

          <p className="mt-8 pl-12 text-sm text-[var(--color-text-muted)]">
            Early Experience: Cabin4 — Aug 2019 – Feb 2020 (college-level
            internship)
          </p>
        </section>

        <section id="projects" className="scroll-mt-28 py-12 md:py-14">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                Selected work
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--color-text-primary)] md:text-5xl">
                Projects
              </h2>
            </div>
          </div>

          <GlassPanel className="mb-6 flex flex-wrap gap-2 p-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setProjectFilter(filter)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  projectFilter === filter
                    ? "text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-secondary)]"
                }`}
              >
                {projectFilter === filter && (
                  <motion.span
                    layoutId="project-filter-pill"
                    className="absolute inset-0 rounded-full border border-[var(--color-border-glass)] bg-[var(--color-surface)]/80 shadow-[0_8px_20px_0_var(--shadow-card)]"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            ))}
          </GlassPanel>

          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
              {filteredProjects.map((project) => (
                <motion.article
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: easing }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group overflow-hidden rounded-[24px] border border-[var(--color-border-glass)] bg-[var(--color-surface)]/70 shadow-[0_12px_30px_0_var(--shadow-card)]"
                >
                  <div className="overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-4 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full border border-[var(--color-border-glass)] bg-[var(--color-surface-glass)] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-3 text-[var(--color-text-muted)]">
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                            className="hover:text-[var(--color-text-primary)]"
                          >
                            Code
                          </a>
                        )}
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Live"
                            className="hover:text-[var(--color-text-primary)]"
                          >
                            Live
                          </a>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-[var(--color-bg-soft)] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

        <section id="skills" className="scroll-mt-28 py-12 md:py-14">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
              Toolbox
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--color-text-primary)] md:text-5xl">
              Skills
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: easing, delay: index * 0.08 }}
              >
                <GlassPanel className="h-full p-5 md:p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-bg-soft)] text-[var(--color-accent-blue)]">
                      <category.icon className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                      {category.title}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[var(--color-border-glass)] bg-[var(--color-surface)]/70 px-3 py-1.5 text-xs text-[var(--color-text-secondary)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="credentials" className="scroll-mt-28 py-12 md:py-14">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
              Background
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--color-text-primary)] md:text-5xl">
              Credentials
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <GlassPanel className="p-5 md:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-bg-soft)] text-[var(--color-accent-blue)]">
                  <Award className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                  Certifications & Training
                </p>
              </div>
              <div className="space-y-5">
                {certifications.map((cert) => (
                  <div key={cert.title}>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                      {cert.dateRange}
                    </p>
                    <h3 className="mt-1 font-semibold text-[var(--color-text-primary)]">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {cert.org}
                    </p>
                    {cert.bullets && (
                      <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-[var(--color-text-secondary)]">
                        {cert.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                    {cert.note && (
                      <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                        {cert.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel className="p-5 md:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-bg-soft)] text-[var(--color-accent-blue)]">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                  Education
                </p>
              </div>
              <div className="space-y-5">
                {education.map((entry) => (
                  <div key={entry.degree}>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                      {entry.year}
                    </p>
                    <h3 className="mt-1 font-semibold text-[var(--color-text-primary)]">
                      {entry.degree}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {entry.school}
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                      {entry.detail}
                    </p>
                  </div>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel className="p-5 md:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-bg-soft)] text-[var(--color-accent-blue)]">
                  <LanguagesIcon className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                  Languages
                </p>
              </div>
              <div className="space-y-3">
                {languages.map((language) => (
                  <div
                    key={language.name}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--color-border-glass)] bg-[var(--color-surface)]/60 px-3 py-2.5"
                  >
                    <span className="font-medium text-[var(--color-text-primary)]">
                      {language.name}
                    </span>
                    <span className="text-right text-xs text-[var(--color-text-secondary)]">
                      {language.level}
                    </span>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </div>
        </section>

        <section id="contact" className="scroll-mt-28 pb-12 pt-12 md:pb-18">
          <GlassPanel className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                Contact
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--color-text-primary)] md:text-5xl">
                Let’s build the next release.
              </h2>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href="https://linkedin.com/in/hisham-ka"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-glass)] bg-[var(--color-surface-glass)] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-secondary)] backdrop-blur-xl transition-colors hover:text-[var(--color-text-primary)]"
                >
                  LinkedIn
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  href="https://github.com/Hishamkool"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-glass)] bg-[var(--color-surface-glass)] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-secondary)] backdrop-blur-xl transition-colors hover:text-[var(--color-text-primary)]"
                >
                  GitHub
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
            <a
              href="mailto:hishamkool@yahoo.com"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-blue)] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(47,111,237,0.35)]"
            >
              hishamkool@yahoo.com
              <ArrowRight className="h-4 w-4" />
            </a>
          </GlassPanel>
        </section>
      </main>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-6">
        <LiquidDock
          navItems={navItems}
          activeSection={activeSection}
          onNavigate={scrollToSection}
          theme={theme}
          onToggleTheme={() =>
            setTheme((current) => (current === "light" ? "dark" : "light"))
          }
          showHoverLabels={showDockHoverLabels}
        />
      </div>
    </div>
  );
}

export default App;
