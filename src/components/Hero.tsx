import Icon from "./Icon";

const HERO_IMAGE = "/hero.jpg";

const Hero = () => (
  <section
    id="top"
    className="grid grid-cols-1 lg:min-h-[calc(100vh-58px)] lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:[grid-template-areas:'text_photo''cta_photo']"
  >
    <div className="px-5 pt-12 md:px-10 md:pt-16 lg:pl-16 lg:pr-10 lg:pt-20 lg:[grid-area:text]">
      <h1 className="animate-hero-in font-head text-[40px] font-medium leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-[60px]">
        {"Маркетинговая задача —"}
        {" "}
        <span className="text-brand">{"в исследование."}</span>
      </h1>
      <p
        className="mt-7 max-w-[430px] animate-hero-in text-base leading-[1.45] md:text-lg"
        style={{ animationDelay: "120ms" }}
      >
        Центр прикладных маркетинговых исследований ШЭМ Narxoz: от запроса бизнеса до данных и рекомендаций.
      </p>
    </div>

    <div
      className="flex animate-hero-in flex-col items-start gap-3 px-5 pt-8 md:px-10 lg:pl-16 lg:pr-10 lg:[grid-area:cta]"
      style={{ animationDelay: "220ms" }}
    >
      <a
        href="#request"
        className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-[18px] py-2.5 font-head font-medium text-primary-foreground transition-colors hover:bg-brand"
      >
        Оставить запрос центру
        <Icon name="ArrowRight" size={18} className="transition-transform group-hover:translate-x-1" />
      </a>
      <a
        href="#directions"
        className="inline-flex items-center gap-2.5 rounded-full bg-card px-[18px] py-2.5 font-head font-medium transition-colors hover:bg-input"
      >
        <i className="h-2 w-2 rounded-full bg-brand" aria-hidden />
        Направления работы
      </a>
      <p className="mt-5 text-[13px] text-muted-foreground">Пилотный этап: 2026–2027 учебный год</p>
    </div>

    <figure
      className="relative m-4 mt-8 aspect-[4/3] animate-hero-in overflow-hidden rounded-[14px] bg-tile lg:m-4 lg:ml-0 lg:aspect-auto lg:[grid-area:photo]"
      style={{ animationDelay: "160ms" }}
    >
      <img
        src={HERO_IMAGE}
        alt="Исследовательская команда за анализом данных"
        className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.03]"
        fetchPriority="high"
      />
      <figcaption className="absolute inset-x-4 top-4 flex items-start justify-between gap-3 font-head text-[15px] font-medium text-tile-foreground">
        <span className="rounded-md bg-tile/60 px-2.5 py-1 backdrop-blur-sm">Полный цикл</span>
        <b className="rounded-md bg-tile/60 px-2.5 py-1 text-[13px] font-normal backdrop-blur-sm">
          Запрос → рекомендации
        </b>
      </figcaption>
    </figure>
  </section>
);

export default Hero;
