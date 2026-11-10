import { Link } from 'react-router-dom';
import { Article, getLocalized } from '../data/content';
import { useLang } from '../i18n/LangContext';

interface Props {
  article: Article;
  variant?: 'default' | 'hero' | 'minimal';
}

export default function ArticleCard({ article, variant = 'default' }: Props) {
  const { lang, t } = useLang();
  const prefix = lang === 'en' ? '' : `/${lang}`;
  const link = `${prefix}/series/buddhism-101/${article.slug}`;
  const imgSrc = `/assets/${article.slug}.jpg`;

  if (variant === 'hero') {
    return (
      <Link to={link} className="group block">
        <div className="overflow-hidden mb-8 aspect-[16/10] md:aspect-[16/8]">
          <img src={imgSrc} alt={getLocalized(article.title, lang)} className="w-full h-full object-cover" />
        </div>
        <div className="text-center max-w-2xl mx-auto">
          <span className="tag text-gold">{getLocalized(article.category, lang)}</span>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-charcoal mt-4 mb-4 leading-[1.1] tracking-tightest">
            {getLocalized(article.title, lang)}
          </h1>
          <p className="text-muted text-base md:text-lg leading-relaxed mb-6 max-w-xl mx-auto">
            {getLocalized(article.subtitle, lang)}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted/70 tracking-wider2">
            <span>{article.readingTime} {t('reading.min')}</span>
          </div>
          <span className="inline-flex items-center gap-2 mt-8 font-serif text-lg text-charcoal group-hover:text-gold transition-colors duration-300">
            {t('cta.readChapter')}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    );
  }

  if (variant === 'minimal') {
    return (
      <Link to={link} className="group block">
        <div className="overflow-hidden mb-5 aspect-[4/3]">
          <img src={imgSrc} alt={getLocalized(article.title, lang)} className="w-full h-full object-cover" />
        </div>
        <span className="tag text-gold">{getLocalized(article.category, lang)}</span>
        <h3 className="font-serif text-xl text-charcoal mt-2 mb-2 leading-snug group-hover:text-gold transition-colors duration-300">
          {getLocalized(article.title, lang)}
        </h3>
        <span className="text-xs text-muted/70 tracking-wider2">
          {article.readingTime} {t('reading.min')}
        </span>
      </Link>
    );
  }

  return (
    <Link to={link} className="group block">
      <div className="overflow-hidden mb-5 aspect-[4/3]">
        <img src={imgSrc} alt={getLocalized(article.title, lang)} className="w-full h-full object-cover" />
      </div>
      <span className="tag text-gold">{getLocalized(article.category, lang)}</span>
      <h3 className="font-serif text-xl text-charcoal mt-2 mb-2 leading-snug group-hover:text-gold transition-colors duration-300">
        {getLocalized(article.title, lang)}
      </h3>
      <p className="text-sm text-muted leading-relaxed mb-3">
        {getLocalized(article.subtitle, lang)}
      </p>
      <span className="text-xs text-muted/70 tracking-wider2">
        {article.readingTime} {t('reading.min')}
      </span>
    </Link>
  );
}
