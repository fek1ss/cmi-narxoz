import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const BUSINESS = [
  { icon: "ScanSearch", title: "Аналитика", text: "по конкретным маркетинговым проблемам вашего бизнеса" },
  { icon: "ListChecks", title: "Рекомендации", text: "обоснованные данными, а не интуицией" },
  {
    icon: "Users",
    title: "Университетская команда",
    text: "преподаватели-исследователи, магистранты и докторанты",
  },
];

const UNIVERSITY = [
  "Реальные задачи бизнеса для исследований",
  "Развитие исследовательских компетенций",
  "Отчёты, доклады, статьи и учебные кейсы",
];

const MARQUEE = [
  "Рынки",
  "Поведение потребителей",
  "Брендинг",
  "Цифровой маркетинг",
  "Коммуникации",
  "Устойчивое потребление",
  "Доверие потребителей",
];

const Value = () => (
  <section id="value" className="overflow-hidden pb-20 md:pb-28">
    <div className="border-y border-border py-5" aria-hidden>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-head text-3xl font-medium tracking-[-0.03em] md:text-5xl">
        {[...MARQUEE, ...MARQUEE].map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            {item}
            <i className="h-3 w-3 rounded-full bg-brand" />
          </span>
        ))}
      </div>
    </div>

    <div className="px-5 pt-20 md:px-10 md:pt-28 lg:px-16">
      <SectionHead index="04" label="Ценность для участников" title="Каждая сторона получает свой результат" />

      <div className="mt-12 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="rounded-[14px] bg-card p-7 md:p-10">
          <div className="flex items-center justify-between">
            <p className="text-[13px] uppercase tracking-[0.12em] text-muted-foreground">Для бизнеса и партнёров</p>
            <span className="rounded-full bg-sun px-3 py-1 text-xs font-medium text-sun-foreground">Партнёрам</span>
          </div>
          <ul className="mt-8 grid gap-3 md:grid-cols-3">
            {BUSINESS.map((item) => (
              <li
                key={item.title}
                className="group flex flex-col rounded-[12px] bg-background p-6 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <Icon
                  name={item.icon}
                  size={26}
                  className="text-brand transition-colors group-hover:text-primary-foreground"
                />
                <h3 className="mt-10 font-head text-xl font-medium tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-primary-foreground/70">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="flex flex-col rounded-[14px] bg-tile p-7 text-tile-foreground md:p-10">
          <p className="text-[13px] uppercase tracking-[0.12em] text-tile-foreground/60">Для университета</p>
          <ul className="mt-8 flex flex-1 flex-col">
            {UNIVERSITY.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border-t border-tile-foreground/15 py-4 font-head text-lg font-medium leading-snug last:pb-0"
              >
                <Icon name="Plus" size={18} className="mt-1 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Value;
