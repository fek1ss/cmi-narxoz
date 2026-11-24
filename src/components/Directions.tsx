import { useState } from "react";
import { cn } from "@/lib/utils";
import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const DIRECTIONS = [
  {
    title: "Прикладные маркетинговые исследования",
    icon: "ChartNoAxesCombined",
    text: "Исследуем то, с чем бизнес сталкивается на практике.",
    tags: ["Рынки", "Поведение потребителей", "Брендинг", "Цифровой маркетинг", "Коммуникации"],
  },
  {
    title: "Устойчивый и ответственный маркетинг",
    icon: "Leaf",
    text: "Изучаем, как ответственность бренда влияет на выбор и отношение потребителя.",
    tags: ["Доверие потребителей", "Экологические заявления брендов", "Устойчивое потребление"],
  },
  {
    title: "Исследования по запросам партнёров",
    icon: "Handshake",
    text: "Берём конкретную задачу партнёра и проводим её через исследование.",
    tags: ["Диагностика проблем", "Анализ данных", "Обоснованные рекомендации"],
  },
  {
    title: "Развитие исследовательских компетенций",
    icon: "GraduationCap",
    text: "Реальные проекты становятся практикой для академического сообщества.",
    tags: ["Преподаватели", "Магистранты", "Докторанты"],
  },
  {
    title: "Научные и образовательные результаты",
    icon: "BookOpenText",
    text: "Каждый проект оставляет после себя знание, которым можно делиться.",
    tags: ["Аналитические отчёты", "Доклады", "Статьи", "Учебные кейсы"],
  },
];

const Directions = () => {
  const [active, setActive] = useState(0);
  const current = DIRECTIONS[active];

  return (
    <section id="directions" className="bg-tile px-5 py-20 text-tile-foreground md:px-10 md:py-28 lg:px-16">
      <SectionHead
        dark
        index="02"
        label="Направления деятельности"
        title="Пять направлений — одна логика: от практики к знанию"
        aside="Выберите направление, чтобы увидеть, чем в нём занимается центр."
      />

      <div className="mt-12 grid gap-3 lg:grid-cols-[1.15fr_1fr]">
        <Reveal as="ul" className="flex flex-col">
          {DIRECTIONS.map((d, i) => {
            const isActive = i === active;
            return (
              <li key={d.title} className="border-t border-tile-foreground/15 last:border-b">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  aria-expanded={isActive}
                  className="group flex w-full items-center gap-5 py-5 text-left md:py-6"
                >
                  <span
                    className={cn(
                      "font-head text-sm transition-colors",
                      isActive ? "text-brand" : "text-tile-foreground/40",
                    )}
                  >
                    {"0"}
                    {i + 1}
                  </span>
                  <span
                    className={cn(
                      "flex-1 font-head text-xl font-medium tracking-[-0.03em] transition-all duration-300 md:text-[28px]",
                      isActive
                        ? "translate-x-2 text-tile-foreground"
                        : "text-tile-foreground/50 group-hover:text-tile-foreground/80",
                    )}
                  >
                    {d.title}
                  </span>
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                      isActive ? "rotate-0 bg-brand text-brand-foreground" : "-rotate-45 bg-tile-foreground/10",
                    )}
                  >
                    <Icon name="ArrowRight" size={18} />
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-500 lg:hidden",
                    isActive ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="text-tile-foreground/70">{d.text}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {d.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-tile-foreground/20 px-3 py-1.5 text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </Reveal>

        <Reveal delay={120} className="hidden lg:block">
          <div
            key={active}
            className="relative flex h-full min-h-[440px] animate-in fade-in slide-in-from-bottom-2 flex-col overflow-hidden rounded-[14px] bg-background p-10 text-foreground duration-500"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-foreground">
                <Icon name={current.icon} size={26} />
              </span>
              <span className="font-head text-[120px] font-semibold leading-none tracking-[-0.06em] text-card">
                {"0"}
                {active + 1}
              </span>
            </div>
            <h3 className="mt-8 font-head text-3xl font-medium leading-[1.1] tracking-[-0.03em]">{current.title}</h3>
            <p className="mt-4 max-w-[420px] text-muted-foreground">{current.text}</p>
            <div className="mt-auto flex flex-wrap gap-2 pt-8">
              {current.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-card px-4 py-2 text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Directions;
