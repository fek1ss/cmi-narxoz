import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const ROLES = [
  { role: "Руководитель проекта", icon: "Compass" },
  { role: "Преподаватели-исследователи", icon: "Microscope" },
  { role: "Магистранты", icon: "PenLine" },
  { role: "Докторанты", icon: "FlaskConical" },
  { role: "Представитель партнёра", icon: "Building2", optional: true },
];

const AGREED = ["Задачи", "Методы", "Сроки", "Роли", "Доступ к данным", "Конфиденциальность"];

const Team = () => (
  <section id="team" className="px-5 pb-20 md:px-10 md:pb-28 lg:px-16">
    <SectionHead
      index="05"
      label="Команда проекта"
      title="Под каждое исследование — своя команда"
      aside="Проектная модель: состав подбирается под задачу, а не наоборот."
    />

    <div className="mt-12 grid gap-3 lg:grid-cols-[1fr_1fr]">
      <Reveal className="rounded-[14px] border border-border p-7 md:p-10">
        <p className="text-[13px] uppercase tracking-[0.12em] text-muted-foreground">Кто входит</p>
        <ul className="mt-6 flex flex-col gap-2">
          {ROLES.map((item) => (
            <li
              key={item.role}
              className="group flex items-center gap-4 rounded-full bg-card py-2 pl-2 pr-5 transition-all duration-300 hover:translate-x-1 hover:bg-primary hover:text-primary-foreground"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background text-foreground">
                <Icon name={item.icon} size={19} />
              </span>
              <span className="flex-1 font-head text-lg font-medium tracking-[-0.02em]">{item.role}</span>
              {item.optional && (
                <span className="text-xs text-muted-foreground group-hover:text-primary-foreground/70">
                  при необходимости
                </span>
              )}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal
        delay={120}
        className="relative flex flex-col overflow-hidden rounded-[14px] bg-brand p-7 text-brand-foreground md:p-10"
      >
        <p className="text-[13px] uppercase tracking-[0.12em] opacity-75">Фиксируется заранее</p>
        <p className="mt-6 max-w-[440px] font-head text-2xl font-medium leading-[1.2] tracking-[-0.03em] md:text-[30px]">
          До старта проекта мы договариваемся обо всём, что важно для партнёра.
        </p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-10">
          {AGREED.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 rounded-full border border-brand-foreground/35 px-4 py-2 text-sm font-medium transition-colors hover:bg-brand-foreground hover:text-brand"
            >
              <Icon name="Check" size={15} />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);

export default Team;
