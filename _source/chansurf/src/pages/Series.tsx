import { useLang } from '../i18n/LangContext';
import { useSEO } from '../hooks/useSEO';
import { articles, getLocalized } from '../data/content';
import { Link } from 'react-router-dom';

export default function Series() {
  const { lang, t } = useLang();
  const prefix = lang === 'en' ? '' : `/${lang}`;

  const tr = (en: string, es: string, zh: string) => (lang === 'zh' ? zh : lang === 'es' ? es : en);

  useSEO({
    title: tr('Buddhism 101 — Chan Series', 'Buddhism 101 — Serie Chan', '佛学入门——禅系列'),
    description: tr(
      'A structured, chapter-by-chapter guide to Chan philosophy. From foundations to daily practice, without preaching.',
      'Una guía estructurada, capítulo por capítulo, a la filosofía Chan. Desde los fundamentos hasta la práctica cotidiana, sin predicación.',
      '一部结构化、逐章展开的禅哲学指南。从基础到日常修行，不布道。',
    ),
    path: `${prefix}/series/buddhism-101`,
  });

  return (
    <div className="fade-on-mount pt-28 md:pt-36 pb-20">
      <div className="container-content">
        <div className="text-center mb-16">
          <span className="tag text-gold">{tr('Series', 'Serie', '系列')}</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mt-4 mb-4 tracking-tightest">
            Buddhism 101
          </h1>
          <p className="text-muted text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {tr(
              'A logical, chapter-by-chapter guide to Chan philosophy. Read in order or skip around. There is no wrong way.',
              'Una guía lógica y capítulo por capítulo a la filosofía Chan. Lee en orden o salta. No hay un camino equivocado.',
              '一部合乎逻辑、逐章展开的禅哲学指南。按序读或跳读皆可。没有错误的读法。',
            )}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {articles.map((article, idx) => (
            <Link
              key={article.slug}
              to={`${prefix}/series/buddhism-101/${article.slug}`}
              className="group flex flex-col md:flex-row gap-6 md:gap-10 py-8 border-b border-divider last:border-0 transition-colors duration-300"
            >
              <div className="flex-shrink-0 md:w-24 text-center md:text-left">
                <span className="font-serif text-4xl md:text-5xl text-divider group-hover:text-gold transition-colors duration-500">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex-shrink-0 md:w-64">
                <img
                  src={`/assets/${article.slug}.jpg`}
                  alt={getLocalized(article.title, lang)}
                  className="w-full aspect-[16/10] md:aspect-[4/3] object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <span className="tag text-gold">{getLocalized(article.category, lang)}</span>
                <h2 className="font-serif text-xl md:text-2xl text-charcoal mt-2 mb-2 leading-snug group-hover:text-gold transition-colors duration-300">
                  {getLocalized(article.title, lang)}
                </h2>
                <p className="text-sm text-muted leading-relaxed mb-3 line-clamp-2">
                  {getLocalized(article.subtitle, lang)}
                </p>
                <span className="text-xs text-muted/70 tracking-wider2">
                  {article.readingTime} {t('reading.min')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
