import { useCallback, useEffect, useRef, useState } from "react";
import {
  FARMER_TYPES,
  IRRIGATION_TYPES,
  LANGUAGE_OPTIONS,
  STATES,
  V,
  type Lang,
} from "@/lib/i18n";

export type FieldKey =
  | "name"
  | "age"
  | "state"
  | "district"
  | "preferred_language"
  | "land_size"
  | "farmer_type"
  | "crop_type"
  | "irrigation_type"
  | "annual_income";

export const FIELD_ORDER: FieldKey[] = [
  "name",
  "age",
  "state",
  "district",
  "preferred_language",
  "land_size",
  "farmer_type",
  "crop_type",
  "irrigation_type",
  "annual_income",
];

const SPEECH_LANG: Record<Lang, string> = { en: "en-IN", te: "te-IN", ta: "ta-IN" };

/* ---------- number parsing ---------- */

const NATIVE_DIGITS: Record<string, string> = {};
"౦౧౨౩౪౫౬౭౮౯".split("").forEach((d, i) => (NATIVE_DIGITS[d] = String(i)));
"௦௧௨௩௪௫௬௭௮௯".split("").forEach((d, i) => (NATIVE_DIGITS[d] = String(i)));

const WORDS: Record<string, number> = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
  ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16,
  seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50,
  sixty: 60, seventy: 70, eighty: 80, ninety: 90,
};

const LAKH = /lakh|lac\b|లక్ష|லட்ச/i;
const THOUSAND = /thousand|వేల|వెయ్యి|ఆయిరం|ஆயிரம்/i;

function parseNumber(raw: string, decimal: boolean): number | null {
  let s = raw.toLowerCase().replace(/[౦-౯௦-௯]/g, (d) => NATIVE_DIGITS[d] ?? d);
  s = s.replace(/(\d),(\d)/g, "$1$2");
  const m = s.match(/\d+(\.\d+)?/);
  let n: number | null = null;
  if (m) {
    n = decimal ? parseFloat(m[0]) : parseInt(m[0], 10);
    if (LAKH.test(s)) n *= 100000;
    else if (THOUSAND.test(s)) n *= 1000;
    return n;
  }
  // English number words
  const tokens = s.split(/[^a-z]+/).filter(Boolean);
  let total = 0;
  let current = 0;
  let found = false;
  for (const tk of tokens) {
    if (tk in WORDS) {
    n = decimal ? parseFloat(m[0]) : parseInt(m[0], 10);
      found = true;
    } else if (tk === "hundred") {
      current = (current || 1) * 100;
      found = true;
    } else if (tk === "thousand") {
      total += (current || 1) * 1000;
      current = 0;
      found = true;
    } else if (tk === "lakh" || tk === "lac") {
      total += (current || 1) * 100000;
      current = 0;
      found = true;
    }
  }
  if (!found) return null;
  return total + current;
}

/* ---------- option matching ---------- */

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[.,!?।"“”]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const STATE_ALIASES: Record<string, string[]> = {
  "Andhra Pradesh": ["andhra", "ఆంధ్ర", "ஆந்திர"],
  Telangana: ["telangana", "telengana", "తెలంగాణ", "தெலங்கானா", "தெலுங்கானா"],
  "Tamil Nadu": ["tamil nadu", "tamilnadu", "తమిళనాడు", "తమిళ నాడు", "தமிழ்நாடு", "தமிழகம்"],
  Karnataka: ["karnataka", "కర్ణాటక", "கர்நாடக"],
  Kerala: ["kerala", "కేరళ", "கேரள"],
  Maharashtra: ["maharashtra", "మహారాష్ట్ర", "மகாராஷ்டிர"],
  Odisha: ["odisha", "orissa", "ఒడిశా", "ఒడిషా", "ஒடிசா"],
  Other: ["other", "ఇతర", "மற்ற"],
};

const FARMER_ALIASES: Record<string, string[]> = {
  marginal: ["marginal", "మార్జినల్", "సన్నకారు", "குறு", "மார்ஜினல்"],
  small: ["small", "స్మాల్", "చిన్న", "சிறு", "ஸ்மால்"],
  medium: ["medium", "మీడియం", "మధ్యస్థ", "మధ్య", "நடுத்தர", "மீடியம்"],
  large: ["large", "big", "లార్జ్", "పెద్ద", "பெரிய", "லார்ஜ்"],
  tenant: ["tenant", "sharecrop", "టెనెంట్", "కౌలు", "குத்தகை", "டெனன்ட்"],
};

const IRRIGATION_ALIASES: Record<string, string[]> = {
  borewell: ["bore", "well", "బోరు", "బావి", "బోర్", "ஆழ்துளை", "போர்", "கிணறு"],
  canal: ["canal", "కాలువ", "కాల్వ", "కెనాల్", "கால்வாய்", "கெனால்"],
  drip: ["drip", "sprinkler", "డ్రిప్", "స్ప్రింక్లర్", "சொட்டு", "தெளிப்பு", "டிரிப்"],
  rainfed: ["rain", "వర్ష", "రెయిన్", "மழை", "மானாவாரி", "ரெயின்"],
};

const LANGUAGE_ALIASES: Record<Lang, string[]> = {
  te: ["telugu", "తెలుగు", "தெலுங்கு", "తెలుగ"],
  en: ["english", "ఇంగ్లీష్", "ఇంగ్లీషు", "ఇంగ్లిష్", "ஆங்கிலம்", "இங்கிலீஷ்", "ஆங்கில"],
  ta: ["tamil", "తమిళం", "తమిళ్", "தமிழ்", "தமிழ"],
};

function matchOption(
  text: string,
  options: { value: string; aliases: string[] }[],
): string | null {
  const t = norm(text);
  for (const o of options) {
    if (o.aliases.some((a) => a.length >= 2 && t.includes(norm(a)))) return o.value;
  }
  return null;
}

export type Parsed = { value: string; display: string };

export function parseAnswer(key: FieldKey, alts: string[], lang: Lang): Parsed | null {
  for (const raw of alts) {
    const text = raw.trim();
    if (!text) continue;
    switch (key) {
      case "name":
      case "district":
      case "crop_type": {
        const v = text.replace(/[.।]+$/, "").trim();
        if (v) return { value: v, display: v };
        break;
      }
      case "age": {
        const n = parseNumber(text, false);
        if (n !== null && n >= 10 && n <= 110) return { value: String(n), display: String(n) };
        break;
      }
      case "land_size": {
        const n = parseNumber(text, true);
        if (n !== null && n > 0 && n < 100000) return { value: String(n), display: String(n) };
        break;
      }
      case "annual_income": {
        const n = parseNumber(text, false);
        if (n !== null && n >= 0) return { value: String(n), display: n.toLocaleString("en-IN") };
        break;
      }
      case "state": {
        const opts = STATES.map((s) => ({ value: s, aliases: [s, ...(STATE_ALIASES[s] ?? [])] }));
        const v = matchOption(text, opts);
        if (v) return { value: v, display: v };
        break;
      }
      case "farmer_type": {
        const opts = FARMER_TYPES.map((o) => ({
          value: o.value,
          aliases: [...(FARMER_ALIASES[o.value] ?? []), ...Object.values(o.label)],
        }));
        const v = matchOption(text, opts);
        if (v) {
          const found = FARMER_TYPES.find((o) => o.value === v)!;
          return { value: v, display: found.label[lang] };
        }
        break;
      }
      case "irrigation_type": {
        const opts = IRRIGATION_TYPES.map((o) => ({
          value: o.value,
          aliases: [...(IRRIGATION_ALIASES[o.value] ?? []), ...Object.values(o.label)],
        }));
        const v = matchOption(text, opts);
        if (v) {
          const found = IRRIGATION_TYPES.find((o) => o.value === v)!;
          return { value: v, display: found.label[lang] };
        }
        break;
      }
      case "preferred_language": {
        const opts = (["te", "en", "ta"] as Lang[]).map((l) => ({
          value: l,
          aliases: LANGUAGE_ALIASES[l],
        }));
        const v = matchOption(text, opts);
        if (v) {
          const found = LANGUAGE_OPTIONS.find((o) => o.value === v)!;
          return { value: v, display: found.label };
        }
        break;
      }
    }
  }
  return null;
}

/* ---------- browser speech ---------- */

type Phase = "idle" | "speaking" | "listening" | "heard" | "retry" | "error" | "done";

/* eslint-disable @typescript-eslint/no-explicit-any */
function getRecognition(): any {
  if (typeof window === "undefined") return null;
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export function useVoiceFiller(
  lang: Lang,
  apply: (key: FieldKey, value: string) => void,
) {
  const [supported, setSupported] = useState(true);
  const [activeKey, setActiveKey] = useState<FieldKey | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [message, setMessage] = useState("");
  const runRef = useRef(0);
  const recRef = useRef<any>(null);
  const langRef = useRef(lang);
  const applyRef = useRef(apply);
  langRef.current = lang;
  applyRef.current = apply;

  useEffect(() => {
    setSupported(!!getRecognition());
  }, []);

  const hardStop = useCallback(() => {
    runRef.current += 1;
    try {
      recRef.current?.abort();
    } catch {
      /* ignore */
    }
    recRef.current = null;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const stop = useCallback(() => {
    hardStop();
    setActiveKey(null);
    setPhase("idle");
    setMessage("");
  }, [hardStop]);

  useEffect(() => () => hardStop(), [hardStop]);

  const speak = (text: string, l: Lang) =>
    new Promise<void>((resolve) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return resolve();
      const synth = window.speechSynthesis;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = SPEECH_LANG[l];
      const voice = synth.getVoices().find((v) => v.lang.toLowerCase().startsWith(l));
      if (voice) u.voice = voice;
      u.rate = 0.9;
      const timer = window.setTimeout(resolve, 20000);
      const done = () => {
        window.clearTimeout(timer);
        resolve();
      };
      u.onend = done;
      u.onerror = done;
      synth.speak(u);
    });

  const listen = (l: Lang) =>
    new Promise<{ alts: string[]; error?: string }>((resolve) => {
      const SR = getRecognition();
      if (!SR) return resolve({ alts: [], error: "unsupported" });
      const rec = new SR();
      recRef.current = rec;
      rec.lang = SPEECH_LANG[l];
      rec.interimResults = false;
      rec.maxAlternatives = 3;
      rec.continuous = false;
      let finished = false;
      const finish = (r: { alts: string[]; error?: string }) => {
        if (finished) return;
        finished = true;
        resolve(r);
      };
      rec.onresult = (e: any) => {
        const alts: string[] = [];
        const res = e.results[0];
        for (let i = 0; i < res.length; i++) alts.push(res[i].transcript);
        finish({ alts });
      };
      rec.onerror = (e: any) => finish({ alts: [], error: e.error || "error" });
      rec.onend = () => finish({ alts: [], error: "no-speech" });
      try {
        rec.start();
      } catch {
        finish({ alts: [], error: "error" });
      }
    });

  /** Ask one field. Resolves true when a value was captured. */
  const runField = async (
    key: FieldKey,
    run: number,
    attempts: number,
  ): Promise<"ok" | "skip" | "fatal"> => {
    for (let i = 0; i < attempts; i++) {
      const l = langRef.current;
      const v = V[l];
      if (runRef.current !== run) return "fatal";
      setActiveKey(key);
      setPhase("speaking");
      setMessage(v.ask[key]);
      await speak(v.ask[key], l);
      if (runRef.current !== run) return "fatal";

      setPhase("listening");
      setMessage(v.listening);
      const { alts, error } = await listen(l);
      if (runRef.current !== run) return "fatal";

      if (error === "not-allowed" || error === "service-not-allowed") {
        setPhase("error");
        setMessage(v.micDenied);
        return "fatal";
      }
      if (error === "unsupported") {
        setPhase("error");
        setMessage(v.unsupported);
        return "fatal";
      }
      const parsed = alts.length ? parseAnswer(key, alts, l) : null;
      if (parsed) {
        applyRef.current(key, parsed.value);
        setPhase("heard");
        setMessage(`${v.heard}: ${parsed.display}`);
        await speak(`${v.heard}: ${parsed.display}`, l);
        return runRef.current === run ? "ok" : "fatal";
      }
      setPhase("retry");
      setMessage(v.retry);
      await speak(v.retry, l);
    }
    return "skip";
  };

  const askOne = async (key: FieldKey) => {
    hardStop();
    const run = runRef.current;
    if (!getRecognition()) {
      setActiveKey(key);
      setPhase("error");
      setMessage(V[langRef.current].unsupported);
      return;
    }
    const res = await runField(key, run, 2);
    if (runRef.current !== run) return;
    setActiveKey(null);
    if (res !== "fatal") {
      setPhase("idle");
      setMessage("");
    }
  };

  const guideAll = async () => {
    hardStop();
    const run = runRef.current;
    if (!getRecognition()) {
      setPhase("error");
      setMessage(V[langRef.current].unsupported);
      return;
    }
    for (const key of FIELD_ORDER) {
      const res = await runField(key, run, 2);
      if (runRef.current !== run) return;
      if (res === "fatal") {
        setActiveKey(null);
        return;
      }
    }
    const l = langRef.current;
    setActiveKey(null);
    setPhase("done");
    setMessage(V[l].allDone);
    await speak(V[l].allDone, l);
  };

  return { supported, activeKey, phase, message, askOne, guideAll, stop };
}
