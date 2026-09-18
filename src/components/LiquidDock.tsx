import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Moon, SunMedium } from "lucide-react";
import {
  forwardRef,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import type { LucideIcon } from "lucide-react";

export type DockNavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

type LiquidDockProps = {
  navItems: DockNavItem[];
  activeSection: string;
  onNavigate: (id: string) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

// Magnification tuning: how many "icon slots" the cursor's influence spans,
// how much an icon scales up at the cursor's exact center, and how far it lifts.
const MAGNIFY_RADIUS = 1.35;
const MAGNIFY_SCALE = 0.55;
const MAGNIFY_LIFT = 11;
const NO_HOVER = -10;

function useMagnify(
  mouseFraction: MotionValue<number>,
  centerFraction: number,
  slotCount: number,
) {
  const rawScale = useTransform(mouseFraction, (value) => {
    const distance = Math.abs(value - centerFraction) * slotCount;
    if (distance > MAGNIFY_RADIUS) return 1;
    const falloff = Math.exp(-((distance / (MAGNIFY_RADIUS * 0.55)) ** 2));
    return 1 + MAGNIFY_SCALE * falloff;
  });
  const rawY = useTransform(mouseFraction, (value) => {
    const distance = Math.abs(value - centerFraction) * slotCount;
    if (distance > MAGNIFY_RADIUS) return 0;
    const falloff = Math.exp(-((distance / (MAGNIFY_RADIUS * 0.55)) ** 2));
    return -MAGNIFY_LIFT * falloff;
  });

  return {
    scale: useSpring(rawScale, { stiffness: 320, damping: 20, mass: 0.4 }),
    y: useSpring(rawY, { stiffness: 320, damping: 20, mass: 0.4 }),
  };
}

const DockIcon = forwardRef<
  HTMLButtonElement,
  {
    icon: LucideIcon;
    label: string;
    centerFraction: number;
    slotCount: number;
    mouseFraction: MotionValue<number>;
    isActive?: boolean;
    onClick: () => void;
  }
>(function DockIcon(
  { icon: Icon, label, centerFraction, slotCount, mouseFraction, isActive, onClick },
  ref,
) {
  const { scale, y } = useMagnify(mouseFraction, centerFraction, slotCount);

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={label}
      style={{ scale, y }}
      className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full text-[var(--color-text-primary)] md:h-14 md:w-14 lg:h-20 lg:w-20"
    >
      {isActive && (
        <motion.span
          layoutId="dock-indicator"
          className="absolute inset-0 rounded-full border border-[var(--color-border-glass)] bg-[var(--color-surface)]/80"
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
        />
      )}
      <Icon className="relative z-10 h-4 w-4 md:h-5 md:w-5 lg:h-7 lg:w-7" />
    </motion.button>
  );
});

export function LiquidDock({
  navItems,
  activeSection,
  onNavigate,
  theme,
  onToggleTheme,
}: LiquidDockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mouseFraction = useMotionValue(NO_HOVER);
  const dropX = useMotionValue(0.5);
  const dropTrail = useSpring(dropX, {
    stiffness: 130,
    damping: 15,
    mass: 0.7,
  });
  const [hovering, setHovering] = useState(false);

  const slotCount = navItems.length + 1;

  // Icon centers are measured from the real DOM layout rather than assumed
  // to be evenly spread across the container, since padding/gaps mean the
  // two don't match — that mismatch made the magnify effect peak off-center.
  const [centers, setCenters] = useState<number[]>(
    Array.from({ length: slotCount }, (_, index) => (index + 0.5) / slotCount),
  );

  useLayoutEffect(() => {
    const measure = () => {
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect || containerRect.width === 0) return;
      const next = itemRefs.current.map((el, index) => {
        if (!el) return (index + 0.5) / slotCount;
        const rect = el.getBoundingClientRect();
        return (
          (rect.left + rect.width / 2 - containerRect.left) /
          containerRect.width
        );
      });
      setCenters(next);
    };

    measure();

    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [slotCount]);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const fraction = (event.clientX - rect.left) / rect.width;
    mouseFraction.set(fraction);
    dropX.set(fraction);
    setHovering(true);
  };

  const handleLeave = () => {
    mouseFraction.set(NO_HOVER);
    setHovering(false);
  };

  const { scrollY } = useScroll();
  const sheenPosition = useTransform(
    scrollY,
    (value) => `${((value * 0.12) % 260) - 60}% 50%`,
  );
  const dropLeft = useTransform(dropX, (v) => `${v * 100}%`);
  const dropTrailLeft = useTransform(dropTrail, (v) => `${v * 100}%`);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="liquid-glass pointer-events-auto relative flex items-center gap-1.5 rounded-[28px] border border-[var(--color-border-glass)] bg-[var(--color-surface-glass)] p-2 shadow-[0_10px_40px_0_var(--shadow-glass)] md:gap-2 lg:gap-3 lg:rounded-[36px] lg:p-3"
    >
      <svg
        width="0"
        height="0"
        className="absolute"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter id="dock-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        <motion.div
          aria-hidden="true"
          style={{ backgroundPosition: sheenPosition }}
          className="liquid-sheen absolute inset-[-40%] z-[1]"
        />

        {hovering && (
          <div
            aria-hidden="true"
            style={{ filter: "url(#dock-goo)" }}
            className="absolute inset-0 z-0"
          >
            <motion.span className="drop-blob" style={{ left: dropLeft }} />
            <motion.span
              className="drop-blob drop-blob--trail"
              style={{ left: dropTrailLeft }}
            />
          </div>
        )}
      </div>

      {navItems.map((item, index) => (
        <DockIcon
          key={item.id}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          icon={item.icon}
          label={item.label}
          centerFraction={centers[index] ?? (index + 0.5) / slotCount}
          slotCount={slotCount}
          mouseFraction={mouseFraction}
          isActive={item.id === activeSection}
          onClick={() => onNavigate(item.id)}
        />
      ))}

      <DockIcon
        ref={(el) => {
          itemRefs.current[navItems.length] = el;
        }}
        icon={theme === "light" ? Moon : SunMedium}
        label="Toggle color mode"
        centerFraction={
          centers[navItems.length] ?? (navItems.length + 0.5) / slotCount
        }
        slotCount={slotCount}
        mouseFraction={mouseFraction}
        onClick={onToggleTheme}
      />
    </div>
  );
}
