import { useParams, Link, Navigate } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import { useSEO } from '../hooks/useSEO';
import { articles, getLocalized } from '../data/content';
import Newsletter from '../components/Newsletter';

function renderBody(body: string[]) {
  return body.map((block, i) => {
    if (block.startsWith('## ')) {
      return <h2 key={i}>{block.replace(/^## /, '')}</h2>;
    }
    if (block.startsWith('### ')) {
      return <h3 key={i}>{block.replace(/^### /, '')}</h3>;
    }
    if (block.startsWith('> ')) {
      return <blockquote key={i}>{block.replace(/^> /, '')}</blockquote>;
    }
    const parts = block.split(/(\*[^*]+\*)/g);
    return (
      <p key={i}>
        {parts.map((part, j) =>
          part.startsWith('*') && part.endsWith('*') ? (
            <em key={j} className="italic">{part.slice(1, -1)}</em>
          ) : (
            part
          )
        )}
      </p>
    );
  });
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useLang();
  const prefix = lang === 'en' ? '' : `/${lang}`;

  const tr = (en: string, es: string, zh: string) => (lang === 'zh' ? zh : lang === 'es' ? es : en);

  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to={`${prefix}/series/buddhism-101`} replace />;
  }

  const idx = articles.findIndex((a) => a.slug === slug);
  const prev = idx > 0 ? articles[idx - 1] : null;
  const next = idx < articles.length - 1 ? articles[idx + 1] : null;

  useSEO({
    title: getLocalized(article.title, lang),
    description: getLocalized(article.subtitle, lang).slice(0, 160),
    path: `${prefix}/series/buddhism-101/${article.slug}`,
  });

  return (
    <div className="fade-on-mount pt-28 md:pt-36 pb-20">
      {/* Header */}
      <header className="container-editorial text-center mb-10">
        <span className="tag text-gold">
          {getLocalized(article.category, lang)} — {tr('Chapter', 'Capítulo', '第')} {article.chapter}
        </span>
        <h1 className="font-serif text-3xl md:text-5xl text-charcoal mt-4 mb-4 leading-[1.1] tracking-tightest">
          {getLocalized(article.title, lang)}
        </h1>
        <p className="text-muted text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-4">
          {getLocalized(article.subtitle, lang)}
        </p>
        <span className="text-xs text-muted/70 tracking-wider2">
          {article.readingTime} {t('reading.min')}
        </span>
      </header>

      {/* Visual */}
      <div className="container-content mb-12">
        <img
          src={`/assets/${article.slug}.jpg`}
          alt={getLocalized(article.title, lang)}
          className="max-w-4xl mx-auto w-full aspect-[16/9] object-cover"
        />
      </div>

      {/* Body */}
      <article className="container-editorial">
        <div className="article-body">{renderBody(article.body[lang])}</div>

        {/* Pagination */}
        <nav className="flex flex-col sm:flex-row justify-between gap-6 mt-16 pt-10 border-t border-divider">
          {prev ? (
            <Link
              to={`${prefix}/series/buddhism-101/${prev.slug}`}
              className="group flex-1"
            >
              <span className="tag text-muted/60">
                ← {tr('Chapter', 'Capítulo', '第')} {prev.chapter}
              </span>
              <p className="font-serif text-lg text-charcoal mt-1 group-hover:text-gold transition-colors duration-300">
                {getLocalized(prev.title, lang)}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              to={`${prefix}/series/buddhism-101/${next.slug}`}
              className="group flex-1 text-right"
            >
              <span className="tag text-muted/60">
                {tr('Chapter', 'Capítulo', '第')} {next.chapter} →
              </span>
              <p className="font-serif text-lg text-charcoal mt-1 group-hover:text-gold transition-colors duration-300">
                {getLocalized(next.title, lang)}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>

        {/* Newsletter CTA */}
        <Newsletter variant="compact" />
      </article>
    </div>
  );
}
