import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Lang = 'en' | 'es' | 'zh';

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

const translations: Record<Lang, Record<string, string>> = {
  en: {
    'nav.startHere': 'Start Here',
    'nav.series': 'Series',
    'nav.escapes': 'Escapes',
    'nav.curated': 'Curated',
    'nav.about': 'About',
    'nav.subscribe': 'Subscribe',
    'nav.search': 'Search',
    'cta.readChapter': 'Read Chapter',
    'cta.checkAvailability': 'Check Availability & Rates',
    'cta.viewDetails': 'View details',
    'cta.subscribe': 'Subscribe',
    'cta.subscribeCta': 'Receive the next transition directly in your inbox.',
    'cta.enjoyedChapter': 'Enjoyed this chapter?',
    'footer.rights': 'All rights reserved.',
    'footer.tagline': 'We surf the source, not the wave.',
    'newsletter.placeholder': 'Your email address',
    'newsletter.title': 'Join the quiet circle.',
    'newsletter.subtitle': 'Occasional letters on Chan philosophy, cognitive practice, and curated stillness.',
    'reading.min': 'min read',
    'newsletter.thanks': 'Thank you. Welcome to the quiet circle.',
    'hero.subtitle': 'A premium gateway to Chinese Chan philosophy — where intellectual curiosity meets the art of stillness.',
  },
  es: {
    'nav.startHere': 'Empezar',
    'nav.series': 'Series',
    'nav.escapes': 'Retiros',
    'nav.curated': 'Curado',
    'nav.about': 'Acerca',
    'nav.subscribe': 'Suscribirse',
    'nav.search': 'Buscar',
    'cta.readChapter': 'Leer Capítulo',
    'cta.checkAvailability': 'Ver Disponibilidad y Tarifas',
    'cta.viewDetails': 'Ver detalles',
    'cta.subscribe': 'Suscribirse',
    'cta.subscribeCta': 'Recibe la próxima transición directamente en tu buzón.',
    'cta.enjoyedChapter': '¿Disfrutaste este capítulo?',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.tagline': 'Surfeamos la fuente, no la ola.',
    'newsletter.placeholder': 'Tu correo electrónico',
    'newsletter.title': 'Únete al círculo silencioso.',
    'newsletter.subtitle': 'Cartas ocasionales sobre filosofía Chan, práctica cognitiva y quietud curada.',
    'reading.min': 'min de lectura',
    'newsletter.thanks': 'Gracias. Bienvenido al círculo silencioso.',
    'hero.subtitle': 'Un portal premium a la filosofía Chan china — donde la curiosidad intelectual se encuentra con el arte de la quietud.',
  },
  zh: {
    'nav.startHere': '入门',
    'nav.series': '系列',
    'nav.escapes': '禅旅',
    'nav.curated': '甄选',
    'nav.about': '关于',
    'nav.subscribe': '订阅',
    'nav.search': '搜索',
    'cta.readChapter': '阅读本章',
    'cta.checkAvailability': '查看空房与价格',
    'cta.viewDetails': '查看详情',
    'cta.subscribe': '订阅',
    'cta.subscribeCta': '下一篇内容，将直接送达你的邮箱。',
    'cta.enjoyedChapter': '喜欢这一章？',
    'footer.rights': '保留所有权利。',
    'footer.tagline': '我们冲浪于源头，而非浪尖。',
    'newsletter.placeholder': '你的电子邮箱',
    'newsletter.title': '加入静默之圈。',
    'newsletter.subtitle': '偶尔寄出的信，关于禅的哲学、认知修行与甄选的静默。',
    'reading.min': '分钟阅读',
    'newsletter.thanks': '谢谢你。欢迎加入静默之圈。',
    'hero.subtitle': '一座通往中国禅哲学的高级门户——理性好奇与静默之术的交汇之地。',
  },
};

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  const setLang = (l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string) => translations[lang][key] ?? key;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
