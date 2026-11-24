import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

interface SectionHeadProps {
  index: string;
  label: string;
  title: ReactNode;
  aside?: string;
  className?: string;
  dark?: boolean;
}

const SectionHead = ({ index, label, title, aside, className, dark }: SectionHeadProps) => (
  <Reveal className={cn("grid gap-6 md:grid-cols-[1fr_auto] md:items-end", className)}>
    <div>
      <p
        className={cn(
          "mb-5 flex items-center gap-3 text-[13px] uppercase tracking-[0.12em]",
          dark ? "text-tile-foreground/60" : "text-muted-foreground",
        )}
      >
        <span className="font-head font-semibold text-brand">{index}</span>
        <span className={cn("h-px w-8", dark ? "bg-tile-foreground/30" : "bg-foreground/30")} />
        {label}
      </p>
      <h2 className="max-w-[820px] font-head text-[34px] font-medium leading-[1.05] tracking-[-0.04em] md:text-5xl">
        {title}
      </h2>
    </div>
    {aside && (
      <p
        className={cn(
          "max-w-[300px] text-sm leading-relaxed",
          dark ? "text-tile-foreground/60" : "text-muted-foreground",
        )}
      >
        {aside}
      </p>
    )}
  </Reveal>
);

export default SectionHead;
