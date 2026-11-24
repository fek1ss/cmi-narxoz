import { useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import Icon from "./Icon";

export const NAV = [
  { href: "#about", label: "О центре" },
  { href: "#directions", label: "Направления" },
  { href: "#model", label: "Модель" },
  { href: "#team", label: "Команда" },
  { href: "#pilot", label: "Пилот" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  // Якорь, к которому нужно прокрутить после закрытия мобильного меню.
  const pendingHref = useRef<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // На lg+ мобильное меню не используется: если окно расширили при открытом меню — закрываем,
  // чтобы не осталась блокировка прокрутки.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Активный пункт: секция, верх которой последним пересёк линию на 35% высоты экрана.
  // Секции вне меню (hero, «Ценность», «Запрос») снимают выделение.
  useEffect(() => {
    const ids = ["top", "about", "directions", "model", "value", "team", "pilot", "request"];
    const update = () => {
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = `#${id}`;
      }
      setActive(current && NAV.some((n) => n.href === current) ? current : null);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Блокировка прокрутки, пока меню открыто; при закрытии позиция сохраняется,
  // после чего (если пункт меню был выбран) — плавная прокрутка к секции.
  useEffect(() => {
    if (!open) {
      const href = pendingHref.current;
      pendingHref.current = null;
      if (href) {
        const target = document.querySelector(href);
        if (target) {
          requestAnimationFrame(() => {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            history.pushState(null, "", href);
          });
        }
      }
      return;
    }

    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      if (window.scrollY !== scrollY) {
        window.scrollTo({ top: scrollY, behavior: "instant" });
      }
    };
  }, [open]);

  const goTo = (href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    pendingHref.current = href;
    setOpen(false);
  };

  const mobileMenu = (
    <div
      className={cn(
        // Полноэкранный оверлей поверх страницы; на lg+ не отображается вовсе.
        "fixed inset-0 z-50 flex flex-col bg-background transition-opacity duration-300 lg:hidden",
        open ? "visible opacity-100" : "pointer-events-none invisible opacity-0",
      )}
      aria-hidden={!open}
      inert={!open}
    >
      {/* Повтор строки шапки: логотип и кнопка закрытия на тех же местах */}
      <div className="flex h-[58px] shrink-0 items-center justify-between px-5 md:px-10">
        <a
          href="#top"
          onClick={goTo("#top")}
          className="flex items-center gap-2 font-head text-base font-semibold tracking-[-0.02em]"
        >
          <i className="h-2.5 w-2.5 rounded-[2px] bg-brand" aria-hidden />
          Narxoz · Центр исследований
        </a>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary"
          onClick={() => setOpen(false)}
          aria-label="Закрыть меню"
          aria-expanded={open}
        >
          <Icon name="X" size={20} />
        </button>
      </div>

      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-10 pt-6 transition-all duration-300 md:px-10",
          !open && "-translate-y-2",
        )}
      >
        <ul className="flex flex-col">
          {NAV.map((item, i) => (
            <li key={item.href} className="border-b border-border">
              <a
                href={item.href}
                onClick={goTo(item.href)}
                className="flex items-center justify-between py-4 font-head text-3xl font-medium tracking-[-0.03em]"
              >
                {item.label}
                <span className="text-sm text-muted-foreground">
                  {"0"}
                  {i + 1}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#request"
          onClick={goTo("#request")}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-head font-medium text-primary-foreground"
        >
          Оставить запрос центру
          <Icon name="ArrowRight" size={18} />
        </a>
      </div>
    </div>
  );

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-colors duration-300",
          scrolled ? "bg-background/85 backdrop-blur-md" : "bg-background",
        )}
      >
        <nav
          className="relative flex h-[58px] items-center justify-between px-5 md:px-10 lg:px-16"
          aria-label="Основное меню"
        >
          <a
            href="#top"
            className="flex items-center gap-2 font-head text-base font-semibold tracking-[-0.02em]"
          >
            <i className="h-2.5 w-2.5 rounded-[2px] bg-brand" aria-hidden />
            Narxoz · Центр исследований
          </a>

          {/* Десктоп: красная капсула строго по центру шапки (по центру экрана) */}
          <ul className="absolute left-1/2 top-1/2 hidden h-[52px] -translate-x-1/2 -translate-y-1/2 items-center gap-0 whitespace-nowrap rounded-full bg-brand px-1 lg:flex xl:gap-1 xl:px-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={active === item.href ? "true" : undefined}
                  className={cn(
                    "block rounded-full px-2 py-2 text-[13px] font-medium leading-5 text-brand-foreground transition-colors duration-200 hover:bg-brand-foreground/15 focus-visible:bg-brand-foreground/15 focus-visible:outline-none xl:px-4 xl:text-[15px]",
                    active === item.href && "bg-brand-foreground/15",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-[22px] text-[15px] text-muted-foreground lg:flex">
            <a
              href="#request"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-[9px] font-head text-[15px] font-medium text-primary-foreground transition-colors hover:bg-brand"
            >
              Оставить запрос
            </a>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
          >
            <Icon name={open ? "X" : "Menu"} size={20} />
          </button>
        </nav>
      </header>

      {createPortal(mobileMenu, document.body)}
    </>
  );
};

export default Header;
