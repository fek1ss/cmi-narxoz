import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import Icon from "./Icon";
import Reveal from "./Reveal";

// Почта, на которую приходят заявки (через FormSubmit). Меняется здесь.
const RECIPIENT_EMAIL = "aigul.nurpeisova@narxoz.kz";
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`;

type FormState = { name: string; org: string; email: string; task: string };
type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = { name: "", org: "", email: "", task: "" };

const validate = (v: FormState): Errors => {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Укажите имя";
  if (v.org.trim().length < 2) e.org = "Укажите организацию";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Проверьте e-mail";
  if (v.task.trim().length < 10) e.task = "Опишите задачу хотя бы в паре предложений";
  return e;
};

const Field = ({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-[13px] uppercase tracking-[0.12em] text-tile-foreground/60">
      {label}
    </label>
    {children}
    {error && <p className="text-sm text-sun">{error}</p>}
  </div>
);

const inputClass = (error?: string) =>
  cn(
    "w-full rounded-[12px] border bg-tile-foreground/5 px-4 py-3.5 text-tile-foreground outline-none transition-colors placeholder:text-tile-foreground/35 focus:border-brand focus:bg-tile-foreground/10",
    error ? "border-sun" : "border-tile-foreground/15",
  );

const Request = () => {
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  // Поле-ловушка для ботов: люди его не видят и не заполняют.
  const [honey, setHoney] = useState("");

  const onChange =
    (key: keyof FormState) => (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: ev.target.value }));
      if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (sending) return;
    const e = validate(values);
    setErrors(e);
    if (Object.keys(e).length) return;

    setSending(true);
    setSendError(false);
    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          "Имя": values.name.trim(),
          "Организация": values.org.trim(),
          "Email": values.email.trim(),
          "Описание задачи": values.task.trim(),
          _replyto: values.email.trim(),
          _subject: "Новая заявка с сайта Центра маркетинговых исследований",
          _template: "table",
          _captcha: "false",
          _honey: honey,
        }),
      });
      const data = await res.json().catch(() => null);
      // FormSubmit возвращает { success: "true" | "false", message }
      if (!res.ok || String(data?.success) !== "true") throw new Error(data?.message ?? res.statusText);
      setValues(EMPTY);
      setHoney("");
      setSent(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="request" className="bg-tile px-5 py-20 text-tile-foreground md:px-10 md:py-28 lg:px-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="mb-5 flex items-center gap-3 text-[13px] uppercase tracking-[0.12em] text-tile-foreground/60">
            <span className="font-head font-semibold text-brand">07</span>
            <span className="h-px w-8 bg-tile-foreground/30" />
            Запрос центру
          </p>
          <h2 className="font-head text-[40px] font-medium leading-[1.02] tracking-[-0.045em] md:text-[64px]">
            {"Есть маркетинговая задача? "}
            <span className="text-brand">{"Превратим её в исследование."}</span>
          </h2>
          <p className="mt-6 max-w-[440px] text-lg leading-relaxed text-tile-foreground/70">
            Опишите проблему своими словами. Мы вернёмся с предложением, как её можно исследовать.
          </p>
          <ul className="mt-10 flex flex-col gap-3 text-[15px] text-tile-foreground/70">
            {[
              "Задачи, сроки и роли фиксируются заранее",
              "Доступ к данным и конфиденциальность — по договорённости",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <Icon name="ShieldCheck" size={18} className="text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          {sent ? (
            <div className="flex h-full min-h-[420px] flex-col items-start justify-center rounded-[14px] bg-background p-8 text-foreground md:p-12">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-foreground">
                <Icon name="Check" size={26} />
              </span>
              <h3 className="mt-8 font-head text-3xl font-medium tracking-[-0.03em]" role="status">
                Спасибо!
              </h3>
              <p className="mt-3 max-w-[380px] text-muted-foreground">
                Заявка отправлена, мы свяжемся с вами.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-card px-5 py-3 font-head font-medium transition-colors hover:bg-input"
              >
                Отправить ещё один запрос
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              className="grid gap-5 rounded-[14px] border border-tile-foreground/15 p-6 md:p-10"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field id="name" label="Имя" error={errors.name}>
                  <input
                    id="name"
                    autoComplete="name"
                    value={values.name}
                    onChange={onChange("name")}
                    className={inputClass(errors.name)}
                    placeholder="Как к вам обращаться"
                  />
                </Field>
                <Field id="org" label="Организация" error={errors.org}>
                  <input
                    id="org"
                    autoComplete="organization"
                    value={values.org}
                    onChange={onChange("org")}
                    className={inputClass(errors.org)}
                    placeholder="Компания или проект"
                  />
                </Field>
              </div>
              <Field id="email" label="E-mail" error={errors.email}>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={onChange("email")}
                  className={inputClass(errors.email)}
                  placeholder="name@company.com"
                />
              </Field>
              <Field id="task" label="Описание задачи" error={errors.task}>
                <textarea
                  id="task"
                  rows={5}
                  value={values.task}
                  onChange={onChange("task")}
                  className={cn(inputClass(errors.task), "resize-none")}
                  placeholder="Что происходит, что хотите понять, какие данные есть"
                />
              </Field>
              {/* Honeypot: скрыт от людей, боты его заполняют — FormSubmit такие заявки отбрасывает */}
              <input
                type="text"
                name="_honey"
                value={honey}
                onChange={(ev) => setHoney(ev.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              {sendError && (
                <p
                  role="alert"
                  className="flex items-start gap-3 rounded-[12px] border border-sun/40 bg-sun/10 px-4 py-3.5 text-sm leading-relaxed text-sun"
                >
                  <Icon name="CircleAlert" size={18} className="mt-0.5 shrink-0" />
                  <span>
                    {"Не удалось отправить заявку. Попробуйте ещё раз или напишите на "}
                    <a href={`mailto:${RECIPIENT_EMAIL}`} className="underline underline-offset-2">
                      {RECIPIENT_EMAIL}
                    </a>
                  </span>
                </p>
              )}
              <button
                type="submit"
                disabled={sending}
                aria-busy={sending}
                className="group mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-brand px-7 py-4 font-head text-lg font-medium text-brand-foreground transition-all hover:bg-tile-foreground hover:text-tile disabled:cursor-wait disabled:opacity-70 disabled:hover:bg-brand disabled:hover:text-brand-foreground"
              >
                {sending ? "Отправляем…" : "Отправить запрос"}
                <Icon
                  name={sending ? "LoaderCircle" : "ArrowUpRight"}
                  size={20}
                  className={cn(
                    sending
                      ? "animate-spin"
                      : "transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                  )}
                />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
};

export default Request;
