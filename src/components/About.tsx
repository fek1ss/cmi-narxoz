import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const CHAIN = ["Маркетинговая проблема", "Исследование", "Практическое решение", "Научный результат"];

const About = () => (
  <section id="about" className="px-5 py-20 md:px-10 md:py-28 lg:px-16">
    <SectionHead
      index="01"
      label="О центре"
      title={
        <>
          {"Проектная платформа при Школе экономики и менеджмента"}
          {" "}
          <span className="text-muted-foreground">Narxoz University</span>
        </>
      }
      aside="Пилотный этап — 2026–2027 учебный год."
    />

    <div className="mt-12 grid gap-3 md:grid-cols-6">
      <Reveal className="group relative overflow-hidden rounded-[14px] bg-tile p-7 text-tile-foreground md:col-span-4 md:p-10">
        <p className="text-[13px] uppercase tracking-[0.12em] text-tile-foreground/60">Цель</p>
        <p className="mt-6 max-w-[620px] font-head text-2xl font-medium leading-[1.2] tracking-[-0.03em] md:text-[32px]">
          Развивать прикладные маркетинговые исследования, объединяя научный потенциал университета, инициативы
          обучающихся и запросы бизнеса и общества.
        </p>
        <span className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full border border-tile-foreground/15 transition-transform duration-700 group-hover:scale-125" />
        <span className="absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-brand transition-transform duration-700 group-hover:scale-110" />
      </Reveal>

      <Reveal delay={100} className="flex flex-col justify-between rounded-[14px] bg-card p-7 md:col-span-2 md:p-8">
        <p className="text-[13px] uppercase tracking-[0.12em] text-muted-foreground">Миссия</p>
        <p className="mt-6 font-head text-xl font-medium leading-[1.3] tracking-[-0.02em]">
          Создавать знания и решения, у которых есть научная ценность, практическая применимость и образовательный
          эффект.
        </p>
      </Reveal>

      <Reveal delay={60} className="rounded-[14px] border border-border p-7 md:col-span-6 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-center">
          <div>
            <p className="text-[13px] uppercase tracking-[0.12em] text-muted-foreground">Позиционирование</p>
            <p className="mt-4 leading-relaxed">
              Центр не дублирует действующие подразделения. Он работает по полному циклу прикладного исследования и
              связывает четыре звена в одно.
            </p>
          </div>
          <ol className="flex flex-wrap items-center gap-2">
            {CHAIN.map((item, i) => (
              <li key={item} className="flex items-center gap-2">
                <span
                  className={
                    i === CHAIN.length - 1
                      ? "rounded-full bg-brand px-5 py-3 font-head text-[15px] font-medium text-brand-foreground md:text-lg"
                      : "rounded-full bg-card px-5 py-3 font-head text-[15px] font-medium transition-colors hover:bg-primary hover:text-primary-foreground md:text-lg"
                  }
                >
                  {item}
                </span>
                {i < CHAIN.length - 1 && <Icon name="ArrowRight" size={18} className="text-muted-foreground" />}
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </div>
  </section>
);

export default About;
