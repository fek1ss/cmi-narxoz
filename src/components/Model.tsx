import { cn } from "@/lib/utils";
import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const STEPS = [
  { title: "Запрос", text: "Партнёр приносит маркетинговую задачу.", icon: "MessageSquareText" },
  {
    title: "Исследовательский вопрос",
    text: "Задача превращается в вопрос, на который можно ответить данными.",
    icon: "CircleHelp",
  },
  { title: "Сбор и анализ данных", text: "Команда собирает данные и анализирует их.", icon: "Database" },
  { title: "Рекомендации", text: "Партнёр получает обоснованные рекомендации.", icon: "Lightbulb" },
  { title: "Оценка результата", text: "Проверяем, как сработало решение.", icon: "Target" },
  {
    title: "Научный или образовательный продукт",
    text: "Результат становится статьёй, докладом или учебным кейсом.",
    icon: "BookMarked",
  },
];

const Model = () => (
  <section id="model" className="px-5 py-20 md:px-10 md:py-28 lg:px-16">
    <SectionHead
      index="03"
      label="Модель работы"
      title={
        <>
          {"Шесть шагов от запроса "}
          <span className="text-brand">до знания</span>
        </>
      }
      aside="Полный цикл прикладного исследования: бизнес получает решение, университет — научный результат."
    />

    <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {STEPS.map((step, i) => {
        const isBrand = i === 3;
        return (
          <Reveal
            as="li"
            key={step.title}
            delay={(i % 3) * 90}
            className={cn(
              "group relative flex min-h-[220px] flex-col overflow-hidden rounded-[14px] p-7 transition-all duration-500 hover:-translate-y-1",
              isBrand
                ? "bg-brand text-brand-foreground"
                : i === 5
                  ? "bg-tile text-tile-foreground"
                  : "bg-card hover:bg-input",
            )}
          >
            <div className="flex items-center justify-between">
              <span
                className={cn("font-head text-sm font-semibold", isBrand || i === 5 ? "opacity-70" : "text-brand")}
              >
                {"Шаг "}
                {i + 1}
              </span>
              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-12",
                  isBrand ? "bg-brand-foreground/15" : i === 5 ? "bg-tile-foreground/10" : "bg-background",
                )}
              >
                <Icon name={step.icon} size={20} />
              </span>
            </div>
            <h3 className="mt-auto pt-10 font-head text-2xl font-medium leading-[1.1] tracking-[-0.03em]">
              {step.title}
            </h3>
            <p
              className={cn(
                "mt-3 text-[15px] leading-relaxed",
                isBrand || i === 5 ? "opacity-75" : "text-muted-foreground",
              )}
            >
              {step.text}
            </p>
          </Reveal>
        );
      })}
    </ol>
  </section>
);

export default Model;
