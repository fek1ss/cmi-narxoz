import { NAV } from "./Header";

const Footer = () => (
  <footer className="bg-tile px-5 pb-8 text-tile-foreground md:px-10 lg:px-16">
    <div className="border-t border-tile-foreground/15 pt-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <a href="#top" className="flex items-center gap-2 font-head text-lg font-semibold tracking-[-0.02em]">
            <i className="h-2.5 w-2.5 rounded-[2px] bg-brand" aria-hidden />
            Narxoz · Центр исследований
          </a>
          <p className="mt-3 max-w-[360px] text-sm text-tile-foreground/60">
            Центр прикладных маркетинговых исследований Школы экономики и менеджмента Narxoz University.
          </p>
        </div>
        <nav aria-label="Навигация в подвале">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-tile-foreground/70">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-brand">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#request" className="transition-colors hover:text-brand">
                Запрос
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <p
        className="mt-16 select-none font-head text-[18vw] font-semibold leading-[0.8] tracking-[-0.06em] text-tile-foreground/[0.06]"
        aria-hidden
      >
        Narxoz
      </p>
      <div className="mt-6 flex flex-col gap-2 text-xs text-tile-foreground/50 md:flex-row md:justify-between">
        <span>ШЭМ Narxoz University</span>
        <span>Пилотный этап 2026–2027</span>
      </div>
    </div>
  </footer>
);

export default Footer;
