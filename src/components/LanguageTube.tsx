import { motion } from "framer-motion";

type LanguageTubeProps = {
  percent: number;
};

export function LanguageTube({ percent }: LanguageTubeProps) {
  return (
    <div className="relative h-16 w-3 shrink-0 overflow-hidden rounded-full border border-[var(--color-border-glass)] bg-[var(--color-bg-soft)]">
      <motion.div
        initial={{ height: "0%" }}
        whileInView={{ height: `${percent}%` }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 w-full rounded-full bg-[linear-gradient(180deg,_rgba(109,142,255,0.95),_rgba(47,111,237,0.9))]"
      />
    </div>
  );
}
