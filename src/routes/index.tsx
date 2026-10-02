import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mic, Sprout } from "lucide-react";
import farmerCover from "@/assets/farmer-cover.jpg";
import {
  FARMER_TYPES,
  IRRIGATION_TYPES,
  LANGS,
  LANGUAGE_OPTIONS,
  STATES,
  T,
  type Lang,
} from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KrishiMitra AI: Farmer Registration & Voice Assistant" },
      {
        name: "description",
        content:
          "Register your farm details and talk to KrishiMitra AI to find welfare schemes in Telugu, English or Tamil.",
      },
      { property: "og:title", content: "KrishiMitra AI: Farmer Registration & Voice Assistant" },
      {
        property: "og:description",
        content:
          "Register your farm details and talk to KrishiMitra AI to find welfare schemes in Telugu, English or Tamil.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const fieldClass =
  "mt-1 w-full rounded-lg border border-input bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 transition-colors focus:border-primary/60 focus:bg-foreground/10 focus:outline-none";

type Form = {
  name: string;
  age: string;
  state: string;
  district: string;
  preferred_language: Lang;
  land_size: string;
  farmer_type: string;
  crop_type: string;
  irrigation_type: string;
  annual_income: string;
};

const emptyForm: Form = {
  name: "",
  age: "",
  state: "",
  district: "",
  preferred_language: "te",
  land_size: "",
  farmer_type: "",
  crop_type: "",
  irrigation_type: "",
  annual_income: "",
};

function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const [form, setForm] = useState<Form>(emptyForm);
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);
  const t = T[lang];

  const set = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const changeLang = (l: Lang) => {
    setLang(l);
    set("preferred_language", l);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const age = Number(form.age);
    const land = Number(form.land_size);
    const income = Number(form.annual_income);
    const valid =
      form.name.trim() &&
      form.district.trim() &&
      form.crop_type.trim() &&
      form.state &&
      form.farmer_type &&
      form.irrigation_type &&
      age >= 10 &&
      age <= 110 &&
      land > 0 &&
      income >= 0 &&
      form.annual_income !== "";
    if (!valid) {
      setError(true);
      return;
    }
    setError(false);
    setDone(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="flex items-center justify-between gap-4 px-6 py-6 md:px-12">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-full bg-secondary text-secondary-foreground">
            <Sprout className="size-5" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <p className="font-display text-lg font-semibold tracking-tight">KrishiMitra AI</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/50">{t.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs" role="group" aria-label="Language">
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => changeLang(l.code)}
              aria-pressed={lang === l.code}
              className={
                lang === l.code
                  ? "rounded-full bg-foreground/10 px-3 py-1.5 text-foreground ring-1 ring-foreground/20"
                  : "rounded-full px-3 py-1.5 text-foreground/60 transition-colors hover:text-foreground"
              }
            >
              {l.label}
            </button>
          ))}
        </div>
      </header>

      <main className="grid flex-1 items-center gap-10 px-6 pb-12 md:px-12 lg:grid-cols-2">
        <div className="animate-fade-up">
          <p className="mb-3 text-sm font-medium text-primary">{t.tagline}</p>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            <span className="text-gradient-headline">{t.headline1}</span>
            <br />
            <span>{t.headline2}</span>
          </h1>
          <p className="mt-5 max-w-md text-sm text-foreground/70 md:text-base">{t.intro}</p>

          {done ? (
            <div className="mt-8 max-w-xl rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-4">
                <div className="relative grid size-12 shrink-0 place-items-center">
                  <span className="animate-mic-ring absolute inset-0 rounded-full bg-primary/40" />
                  <span className="relative grid size-12 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Mic className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <div>
                  <p className="font-display text-2xl font-semibold">
                    {t.welcomeTitle}, {form.name.trim()}
                  </p>
                  <p className="mt-1 text-sm text-foreground/70">{t.welcomeBody}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDone(false)}
                className="mt-5 text-sm text-primary underline underline-offset-4"
              >
                {t.back}
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-8 grid max-w-xl grid-cols-2 gap-4">
              <label className="col-span-2 block">
                <span className="text-xs text-foreground/60">{t.name}</span>
                <input
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder={t.ph_name}
                  className={fieldClass}
                />
              </label>

              <label className="block">
                <span className="text-xs text-foreground/60">{t.age}</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={10}
                  max={110}
                  value={form.age}
                  onChange={(e) => set("age", e.target.value)}
                  placeholder="42"
                  className={fieldClass}
                />
              </label>

              <label className="block">
                <span className="text-xs text-foreground/60">{t.state}</span>
                <select
                  value={form.state}
                  onChange={(e) => set("state", e.target.value)}
                  className={fieldClass}
                >
                  <option value="" className="bg-popover">
                    {t.select}
                  </option>
                  {STATES.map((s) => (
                    <option key={s} value={s} className="bg-popover">
                      {s}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-xs text-foreground/60">{t.district}</span>
                <input
                  type="text"
                  value={form.district}
                  onChange={(e) => set("district", e.target.value)}
                  placeholder={t.ph_district}
                  className={fieldClass}
                />
              </label>

              <label className="block">
                <span className="text-xs text-foreground/60">{t.preferred_language}</span>
                <select
                  value={form.preferred_language}
                  onChange={(e) => set("preferred_language", e.target.value as Lang)}
                  className={fieldClass}
                >
                  {LANGUAGE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value} className="bg-popover">
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-xs text-foreground/60">{t.land_size}</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="0.1"
                  value={form.land_size}
                  onChange={(e) => set("land_size", e.target.value)}
                  placeholder="3.5"
                  className={fieldClass}
                />
              </label>

              <label className="block">
                <span className="text-xs text-foreground/60">{t.farmer_type}</span>
                <select
                  value={form.farmer_type}
                  onChange={(e) => set("farmer_type", e.target.value)}
                  className={fieldClass}
                >
                  <option value="" className="bg-popover">
                    {t.select}
                  </option>
                  {FARMER_TYPES.map((o) => (
                    <option key={o.value} value={o.value} className="bg-popover">
                      {o.label[lang]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-xs text-foreground/60">{t.crop_type}</span>
                <input
                  type="text"
                  value={form.crop_type}
                  onChange={(e) => set("crop_type", e.target.value)}
                  placeholder={t.ph_crop}
                  className={fieldClass}
                />
              </label>

              <label className="block">
                <span className="text-xs text-foreground/60">{t.irrigation_type}</span>
                <select
                  value={form.irrigation_type}
                  onChange={(e) => set("irrigation_type", e.target.value)}
                  className={fieldClass}
                >
                  <option value="" className="bg-popover">
                    {t.select}
                  </option>
                  {IRRIGATION_TYPES.map((o) => (
                    <option key={o.value} value={o.value} className="bg-popover">
                      {o.label[lang]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="col-span-2 block">
                <span className="text-xs text-foreground/60">{t.annual_income}</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={form.annual_income}
                  onChange={(e) => set("annual_income", e.target.value)}
                  placeholder="250000"
                  className={fieldClass}
                />
              </label>

              {error && (
                <p role="alert" className="col-span-2 text-sm text-destructive">
                  {t.required}
                </p>
              )}

              <button
                type="submit"
                className="col-span-2 mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition hover:brightness-105"
              >
                <Mic className="size-4" aria-hidden="true" />
                {t.submit}
              </button>
            </form>
          )}
        </div>

        <div className="animate-fade-up-2 relative mx-auto w-full max-w-md lg:max-w-none">
          <img
            src={farmerCover}
            alt="Smiling farmer holding rice crop in a paddy field at sunset"
            width={1024}
            height={1280}
            className="aspect-[4/5] w-full rounded-2xl object-cover outline outline-1 -outline-offset-1 outline-foreground/10"
          />
          <div className="animate-fade-up-3 absolute -bottom-5 left-3 max-w-[260px] rounded-xl bg-foreground px-5 py-4 text-background shadow-[var(--shadow-card)] md:-left-6">
            <div className="flex items-center gap-3">
              <div className="relative grid size-9 shrink-0 place-items-center">
                <span className="animate-mic-ring absolute inset-0 rounded-full bg-secondary/40" />
                <span className="relative grid size-9 place-items-center rounded-full bg-secondary text-secondary-foreground">
                  <Mic className="size-4" aria-hidden="true" />
                </span>
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-secondary">
                {t.voiceLabel}
              </p>
            </div>
            <p className="mt-2 text-sm font-medium leading-snug">{t.sample}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
