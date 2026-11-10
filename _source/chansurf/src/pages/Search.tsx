import { useSearchParams, Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import { useSEO } from '../hooks/useSEO';
import { articles, getLocalized } from '../data/content';

export default function Search() {
  const { lang, t } = useLang();
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  const prefix = lang === 'en' ? '' : `/${lang}`;

  const tr = (en: string, es: string, zh: string) => (lang === 'zh' ? zh : lang === 'es' ? es : en);

  useSEO({
    title: tr('Search', 'Buscar', '搜索'),
    description: tr('Search canchan.com', 'Buscar en canchan.com', '搜索 canchan.com'),
    path: `${prefix}/search`,
  });

  const q = query.toLowerCase();
  const results = articles.filter((a) => {
    const title = getLocalized(a.title, lang).toLowerCase();
    const subtitle = getLocalized(a.subtitle, lang).toLowerCase();
    const category = getLocalized(a.category, lang).toLowerCase();
    return title.includes(q) || subtitle.includes(q) || category.includes(q);
  });

  return (
    <div className="fade-on-mount pt-28 md:pt-36 pb-20">
      <div className="container-content">
        <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">
          {tr('Results', 'Resultados', '结果')}
        </h1>
        <p className="text-muted text-sm mb-12">
          {tr(`Searching for: "${query}"`, `Buscando: "${query}"`, `搜索："${query}"`)}
        </p>

        {results.length === 0 ? (
          <p className="text-muted text-base">
            {tr(
              'No results found. Try different terms.',
              'No se encontraron resultados. Intenta con otros términos.',
              '未找到结果。请尝试其他关键词。',
            )}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
            {results.map((article) => (
              <Link
                key={article.slug}
                to={`${prefix}/series/buddhism-101/${article.slug}`}
                className="group block"
              >
                <img
                  src={`/assets/${article.slug}.jpg`}
                  alt={getLocalized(article.title, lang)}
                  className="mb-5 w-full aspect-[4/3] object-cover"
                />
                <span className="tag text-gold">{getLocalized(article.category, lang)}</span>
                <h3 className="font-serif text-xl text-charcoal mt-2 mb-2 leading-snug group-hover:text-gold transition-colors duration-300">
                  {getLocalized(article.title, lang)}
                </h3>
                <span className="text-xs text-muted/70 tracking-wider2">
                  {article.readingTime} {t('reading.min')}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
