import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const STAGES = [
  "Инвентаризация научных заделов",
  "Поиск общих интересов и данных",
  "Выбор партнёров",
  "Один приоритетный пилотный проект",
];

const Pilot = () => (
  <section id="pilot" className="bg-card px-5 py-20 md:px-10 md:py-28 lg:px-16">
    <SectionHead
      index="06"
      label="План пилотного этапа"
      title={
        <>
          {"Старт — "}
          <span className="text-brand">октябрь–ноябрь 2026</span>
        </>
      }
      aside="Сейчас центр ищет партнёров для первого пилотного проекта. Это хорошее время, чтобы предложить свою задачу."
    />

    <div className="relative mt-14">
      <div className="absolute left-0 right-0 top-[22px] hidden h-px bg-foreground/15 lg:block" aria-hidden />
      <ol className="grid gap-3 lg:grid-cols-4 lg:gap-6">
        {STAGES.map((item, i) => (
          <Reveal as="li" key={item} delay={i * 100} className="group relative flex gap-5 lg:block">
            <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background font-head text-sm font-semibold transition-colors duration-300 group-hover:bg-brand group-hover:text-brand-foreground">
              {i + 1}
            </span>
            <p className="pt-2 font-head text-xl font-medium leading-[1.2] tracking-[-0.02em] lg:mt-6 lg:pt-0 lg:text-2xl">
              {item}
            </p>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

export default Pilot;
