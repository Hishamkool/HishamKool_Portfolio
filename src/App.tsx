import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  GraduationCap,
  House,
  Mail,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { InView } from "react-intersection-observer";
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
    figma?: string;
  };
};

type SkillGroup = {
  title: string;
  items: { name: string; level: number; icon: typeof Code2 }[];
};

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: House },
  { id: "road", label: "Road", icon: BriefcaseBusiness },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "contact", label: "Contact", icon: Mail },
];

const timelineNodes = [
  {
    id: "current",
    type: "company",
    title: "Senior Product Engineer",
    subtitle: "Northstar Labs",
    dateRange: "2023 — Present",
    description:
      "Leading UI systems and product experiences for fintech teams shipping polished internal tools.",
    icon: "briefcase",
  },
  {
    id: "internship",
    type: "internship",
    title: "Frontend Intern",
    subtitle: "Pixel Harbor",
    dateRange: "2022",
    description:
      "Built workflow dashboards and improved conversion UX for a growing SaaS platform.",
    icon: "rocket",
  },
  {
    id: "degree",
    type: "education",
    title: "BSc. Computer Science",
    subtitle: "University of Toronto",
    dateRange: "2018 — 2022",
    description:
      "Focused on human-centered design, systems thinking, and modern frontend architecture.",
    icon: "graduation",
  },
  {
    id: "award",
    type: "achievement",
    title: "Hackathon Winner",
    subtitle: "Toronto Build Challenge",
    dateRange: "2021",
    description:
      "Designed a cross-platform MVP recognized for accessibility, speed, and product clarity.",
    icon: "trophy",
  },
];

const projects: Project[] = [
  {
    title: "Atlas Commerce",
    category: "React",
    description:
      "A conversion-focused commerce experience with a headless CMS and personalized storefront flows.",
    stack: ["React", "TypeScript", "Tailwind", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    links: { github: "#", live: "#", figma: "#" },
  },
  {
    title: "Pulse Mobile",
    category: "Mobile",
    description:
      "A wellness dashboard for tracking habits, routines, and daily insights with offline-ready UX.",
    stack: ["Flutter", "Firebase", "Design System"],
    image:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=900&q=80",
    links: { github: "#", live: "#" },
  },
  {
    title: "Northwind Studio",
    category: "Flutter",
    description:
      "A visual portfolio platform for agencies shipping branded interactive case studies.",
    stack: ["Flutter", "GraphQL", "Motion"],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    links: { live: "#", figma: "#" },
  },
];

const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    items: [
      { name: "TypeScript", level: 96, icon: Code2 },
      { name: "JavaScript", level: 90, icon: Code2 },
      { name: "Dart", level: 80, icon: Code2 },
    ],
  },
  {
    title: "Frameworks",
    items: [
      { name: "React", level: 95, icon: Code2 },
      { name: "Next.js", level: 88, icon: Code2 },
      { name: "Flutter", level: 82, icon: Code2 },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Figma", level: 86, icon: Code2 },
      { name: "GitHub", level: 92, icon: Code2 },
      { name: "Motion", level: 84, icon: Code2 },
    ],
  },
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

  const filters = useMemo(
    () => ["All", "React", "Flutter", "Mobile", "Design"],
    [],
  );

  const filteredProjects = useMemo(() => {
    if (projectFilter === "All") return projects;
    return projects.filter(
      (project) =>
        project.category === projectFilter ||
        (projectFilter === "Design" && project.stack.includes("Design System")),
    );
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
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { threshold: [0.4, 0.6, 0.8] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
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
                Available for product design & development
              </div>

              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
                  Hisham Kool
                </p>
                <h1 className="max-w-xl text-5xl font-semibold tracking-[-0.08em] text-[var(--color-text-primary)] md:text-7xl">
                  Building calm,
                  <span className="block text-[var(--color-accent-blue)]">
                    high-converting
                  </span>
                  digital products.
                </h1>
              </div>

              <p className="max-w-lg text-lg leading-8 text-[var(--color-text-secondary)]">
                I design and build beautiful, human-centered experiences for
                startups and product teams that care about clarity, motion, and
                measurable growth.
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
                  Contact
                </button>
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
                        Currently shipping
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">
                        Design systems + product UX
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2 text-sm text-[var(--color-text-secondary)]">
                      <div className="rounded-2xl border border-[var(--color-border-glass)] bg-[var(--color-surface)]/60 p-3">
                        <p className="text-[var(--color-text-muted)]">Years</p>
                        <p className="mt-1 text-xl font-semibold text-[var(--color-text-primary)]">
                          6+
                        </p>
                      </div>
                      <div className="rounded-2xl border border-[var(--color-border-glass)] bg-[var(--color-surface)]/60 p-3">
                        <p className="text-[var(--color-text-muted)]">
                          Launches
                        </p>
                        <p className="mt-1 text-xl font-semibold text-[var(--color-text-primary)]">
                          34
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          </motion.div>
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
                  {node.icon === "briefcase" && (
                    <BriefcaseBusiness className="h-4 w-4" />
                  )}
                  {node.icon === "rocket" && <Zap className="h-4 w-4" />}
                  {node.icon === "graduation" && (
                    <GraduationCap className="h-4 w-4" />
                  )}
                  {node.icon === "trophy" && <Trophy className="h-4 w-4" />}
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
                  <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">
                    {node.description}
                  </p>
                </GlassPanel>
              </motion.article>
            ))}
          </div>
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
                      <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            aria-label="GitHub"
                            className="hover:text-[var(--color-text-primary)]"
                          >
                            GH
                          </a>
                        )}
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            aria-label="Live"
                            className="hover:text-[var(--color-text-primary)]"
                          >
                            Live
                          </a>
                        )}
                        {project.links.figma && (
                          <a
                            href={project.links.figma}
                            aria-label="Figma"
                            className="hover:text-[var(--color-text-primary)]"
                          >
                            Figma
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
            {skillGroups.map((group) => (
              <div key={group.title} className="space-y-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                  {group.title}
                </p>
                <div className="space-y-3">
                  {group.items.map((skill) => (
                    <InView
                      key={skill.name}
                      threshold={0.5}
                      triggerOnce
                      className="block"
                    >
                      {({ inView, ref }) => (
                        <div
                          ref={ref}
                          className="rounded-[20px] border border-[var(--color-border-glass)] bg-[var(--color-surface)]/70 p-4 shadow-[0_8px_18px_0_var(--shadow-card)]"
                        >
                          <div className="mb-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-bg-soft)] text-[var(--color-accent-blue)]">
                                <skill.icon className="h-4 w-4" />
                              </div>
                              <span className="font-medium text-[var(--color-text-primary)]">
                                {skill.name}
                              </span>
                            </div>
                            <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-[var(--color-bg-soft)]">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: inView ? `${skill.level}%` : "0%",
                              }}
                              transition={{ duration: 0.8, ease: easing }}
                              className="h-full rounded-full bg-[linear-gradient(90deg,_rgba(67,112,255,0.94),_rgba(109,142,255,0.8))]"
                            />
                          </div>
                        </div>
                      )}
                    </InView>
                  ))}
                </div>
              </div>
            ))}
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
            </div>
            <a
              href="mailto:hello@hishamkool.dev"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-blue)] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(47,111,237,0.35)]"
            >
              hello@hishamkool.dev
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
        />
      </div>
    </div>
  );
}

export default App;
