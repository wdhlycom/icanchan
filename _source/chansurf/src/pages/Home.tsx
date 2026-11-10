import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import { useSEO } from '../hooks/useSEO';
import { articles } from '../data/content';
import ArticleCard from '../components/ArticleCard';
import Newsletter from '../components/Newsletter';

export default function Home() {
  const { lang } = useLang();
  const prefix = lang === 'en' ? '' : `/${lang}`;
  const isZh = lang === 'zh';

  useSEO({
    title: isZh
      ? '禅——为现代心智而设的中国哲学'
      : lang === 'es'
        ? 'Chan — Filosofía China para la Mente Moderna'
        : 'Chan — Chinese Philosophy for the Modern Mind',
    description: isZh
      ? '一座通往中国禅哲学的高级门户。探索禅的根源、重构心智的认知工具，以及甄选的禅修与静默之所。'
      : lang === 'es'
        ? 'Un portal premium a la filosofía Chan china. Explora la raíz del Zen, herramientas cognitivas para el reencuadre mental, y retiros y espacios curados para la quietud.'
        : 'A premium gateway to Chinese Chan philosophy. Explore the root of Zen, cognitive tools for mental re-framing, and curated retreats and spaces for stillness.',
    path: prefix || '/',
  });

  const heroArticle = articles[0];
  const essentialReading = articles.slice(0, 6);

  return (
    <div className="fade-on-mount">
      {/* Hero */}
      <section className="container-content pt-28 md:pt-36 pb-20 md:pb-28">
        <ArticleCard article={heroArticle} variant="hero" />
      </section>

      {/* Mission Statement */}
      <section className="border-y border-divider py-20 md:py-28">
        <div className="container-content">
          <p className="font-serif italic text-2xl md:text-4xl lg:text-5xl text-charcoal/80 text-center max-w-3xl mx-auto leading-[1.3] tracking-tightest">
            {isZh
              ? '你能禅吗？我们冲浪于源头，而非浪尖。'
              : lang === 'es'
                ? '¿Puedes Chan? Surfeamos la fuente, no la ola.'
                : 'Can you Chan? We surf the source, not the wave.'}
          </p>
        </div>
      </section>

      {/* Monetization Teasers */}
      <section className="container-content py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-divider">
          {/* Curated */}
          <Link to={`${prefix}/curated`} className="group bg-alabaster p-10 md:p-14 transition-colors duration-500 hover:bg-white">
            <img src="/assets/curated.jpg" alt="" className="mb-8 w-full aspect-[16/10] object-cover" />
            <span className="tag text-gold">
              {isZh ? '空间' : lang === 'es' ? 'Espacio' : 'Space'}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-charcoal mt-3 mb-4 group-hover:text-gold transition-colors duration-300">
              {isZh
                ? '净室：设计你的禅修之隅'
                : lang === 'es'
                  ? 'Santuario: Diseñando tu rincón de meditación'
                  : 'Sanctuary: Designing your meditation corner'}
            </h2>
            <p className="text-muted text-sm leading-relaxed mb-6">
              {isZh
                ? '美学指南与甄选器物，在家中营造一方静默。'
                : lang === 'es'
                  ? 'Guías estéticas y objetos curados para construir un espacio de quietud en casa.'
                  : 'Aesthetic guides and curated objects for building a space of stillness at home.'}
            </p>
            <span className="link-underline text-sm font-medium text-gold uppercase tracking-wider2">
              {isZh ? '探索 →' : lang === 'es' ? 'Explorar →' : 'Explore →'}
            </span>
          </Link>

          {/* Escapes */}
          <Link to={`${prefix}/escapes`} className="group bg-alabaster p-10 md:p-14 transition-colors duration-500 hover:bg-white">
            <img src="/assets/escapes.jpg" alt="" className="mb-8 w-full aspect-[16/10] object-cover" />
            <span className="tag text-gold">
              {isZh ? '体验' : lang === 'es' ? 'Experiencia' : 'Experience'}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-charcoal mt-3 mb-4 group-hover:text-gold transition-colors duration-300">
              {isZh
                ? '禅旅：在天地间寻找内在的静默'
                : lang === 'es'
                  ? 'Retiros: Encuentra tu silencio interior en el mundo'
                  : 'Retreats: Find your inner silence globally'}
            </h2>
            <p className="text-muted text-sm leading-relaxed mb-6">
              {isZh
                ? '甄选全球奢华禅修中心，为深层认知减压。'
                : lang === 'es'
                  ? 'Retiros de meditación de lujo curados para la descompresión cognitiva profunda.'
                  : 'Curated luxury meditation retreats for deep cognitive decompression.'}
            </p>
            <span className="link-underline text-sm font-medium text-gold uppercase tracking-wider2">
              {isZh ? '发现 →' : lang === 'es' ? 'Descubrir →' : 'Discover →'}
            </span>
          </Link>
        </div>
      </section>

      {/* Essential Reading */}
      <section className="container-content pb-20 md:pb-28">
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-3">
            {isZh ? '必读精选' : lang === 'es' ? 'Lectura Esencial' : 'Essential Reading'}
          </h2>
          <p className="text-muted text-sm">
            {isZh
              ? '六章，从根源开始的旅程。'
              : lang === 'es'
                ? 'Seis capítulos para comenzar el viaje desde la raíz.'
                : 'Six chapters to begin the journey from the root.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {essentialReading.map((article) => (
            <ArticleCard key={article.slug} article={article} variant="minimal" />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
