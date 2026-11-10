import { useLang } from '../i18n/LangContext';
import { useSEO } from '../hooks/useSEO';
import { products, getLocalized } from '../data/content';
import Newsletter from '../components/Newsletter';

export default function Curated() {
  const { lang, t } = useLang();
  const prefix = lang === 'en' ? '' : `/${lang}`;

  const tr = (en: string, es: string, zh: string) => (lang === 'zh' ? zh : lang === 'es' ? es : en);

  useSEO({
    title: tr('Curated — Minimalist Zen Sanctuary', 'Curado — Santuario Zen Minimalista', '甄选——极简禅室'),
    description: tr(
      'Aesthetic design guides and curated objects for building a minimalist zen sanctuary at home. Mats, incense, bowls and more.',
      'Guías de diseño estético y objetos curados para construir un santuario zen minimalista en casa. Mats, inciensos, cuencos y más.',
      '美学设计指南与甄选器物，在家中营造极简禅室。坐垫、香炉、颂钵等。',
    ),
    path: `${prefix}/curated`,
  });

  return (
    <div className="fade-on-mount pt-28 md:pt-36 pb-20">
      <div className="container-content">
        <div className="text-center mb-16">
          <span className="tag text-gold">{tr('Space', 'Espacio', '空间')}</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mt-4 mb-4 tracking-tightest">
            {tr('Curated', 'Curado', '甄选')}
          </h1>
          <p className="text-muted text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {tr(
              'Design guides and curated objects for building a minimalist sanctuary at home. Practice made ambient.',
              'Guías de diseño y objetos curados para construir un santuario minimalista en casa. La práctica hecha ambiente.',
              '设计指南与甄选器物，在家中营造极简静室。修行化为氛围。',
            )}
          </p>
        </div>

        {/* Editorial guide */}
        <div className="max-w-4xl mx-auto mb-24">
          <img src="/assets/curated-hero.jpg" alt="" className="mb-8 w-full aspect-[16/9] object-cover" />
          <div className="text-center">
            <span className="tag text-gold">{tr('Design Guide', 'Guía de Diseño', '设计指南')}</span>
            <h2 className="font-serif text-2xl md:text-4xl text-charcoal mt-3 mb-4 leading-snug">
              {tr(
                'How to Design a Minimalist Zen Sanctuary at Home',
                'Cómo Diseñar un Santuario Zen Minimalista en Casa',
                '如何在家中设计一间极简禅室',
              )}
            </h2>
            <p className="text-muted text-sm leading-relaxed max-w-lg mx-auto">
              {tr(
                'You do not need a temple. You need a corner — clean, quiet, yours. This is the guide to creating it.',
                'No necesitas un templo. Necesitas un rincón — limpio, silencioso, tuyo. Esta es la guía para crearlo.',
                '你不需要寺院。你需要一个角落——干净、安静、属于你。这是创建它的指南。',
              )}
            </p>
          </div>
        </div>

        {/* Product catalog */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-2">
              {tr('Curated Objects', 'Objetos Curados', '甄选器物')}
            </h3>
            <p className="text-muted text-sm">
              {tr(
                'Each piece selected for its function, not its decoration.',
                'Cada pieza seleccionada por su función, no por su decoración.',
                '每件器物因其功能而选，非因其装饰。',
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
            {products.map((product) => (
              <div key={product.slug} className="group">
                <img
                  src={`/assets/${product.slug}.jpg`}
                  alt={getLocalized(product.title, lang)}
                  className="mb-6 w-full aspect-[4/3] object-cover"
                />
                <h3 className="font-serif text-xl text-charcoal mb-3 leading-snug">
                  {getLocalized(product.title, lang)}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-5">
                  {getLocalized(product.description, lang)}
                </p>
                <a
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="link-underline text-sm font-medium text-gold uppercase tracking-wider2"
                >
                  {t('cta.viewDetails')} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Newsletter />
    </div>
  );
}
