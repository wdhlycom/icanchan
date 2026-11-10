import { useLang } from '../i18n/LangContext';
import { useSEO } from '../hooks/useSEO';
import { retreats, getLocalized } from '../data/content';
import Newsletter from '../components/Newsletter';

export default function Escapes() {
  const { lang, t } = useLang();
  const prefix = lang === 'en' ? '' : `/${lang}`;

  const tr = (en: string, es: string, zh: string) => (lang === 'zh' ? zh : lang === 'es' ? es : en);

  useSEO({
    title: tr('Escapes — Global Zen Luxury', 'Retiros — Lujo Zen Global', '禅旅——全球禅意奢隐'),
    description: tr(
      'Curated luxury meditation retreats worldwide. From Kyoto temples to Sahara silence — for deep cognitive decompression.',
      'Retiros de meditación de lujo curados globalmente. Desde templos en Kioto hasta el silencio del Sahara — para la descompresión cognitiva profunda.',
      '甄选全球奢华禅修。从京都寺院到撒哈拉之静——为深层认知减压。',
    ),
    path: `${prefix}/escapes`,
  });

  return (
    <div className="fade-on-mount pt-28 md:pt-36 pb-20">
      <div className="container-content">
        <div className="text-center mb-16">
          <span className="tag text-gold">{tr('Experience', 'Experiencia', '体验')}</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mt-4 mb-4 tracking-tightest">
            {tr('Escapes', 'Retiros', '禅旅')}
          </h1>
          <p className="text-muted text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {tr(
              'Curated luxury meditation retreats for cognitive decompression. Places where silence is not the absence of sound but the presence of vastness.',
              'Retiros de meditación de lujo curados para la descompresión cognitiva. Lugares donde el silencio no es la ausencia de sonido sino la presencia de vastedad.',
              '甄选奢华禅修，为认知减压。在这些地方，静默不是声音的缺席，而是浩瀚的在。',
            )}
          </p>
        </div>

        {/* Featured article header */}
        <div className="max-w-4xl mx-auto mb-20">
          <img src="/assets/escapes-hero.jpg" alt="" className="mb-8 w-full aspect-[16/9] object-cover" />
          <div className="text-center">
            <span className="tag text-gold">{tr('Editorial Guide', 'Guía Editorial', '编辑指南')}</span>
            <h2 className="font-serif text-2xl md:text-4xl text-charcoal mt-3 mb-4 leading-snug">
              {tr(
                '7 Best Luxury Zen Retreats to Reset Your Mind in 2026',
                '7 Mejores Retiros Zen de Lujo para Resetear tu Mente en 2026',
                '2026年最佳七大奢华禅修：重启你的心智',
              )}
            </h2>
            <p className="text-muted text-sm leading-relaxed max-w-lg mx-auto">
              {tr(
                'An editorial selection of retreats that go beyond wellness — designed for real silence, not for the Instagram of silence.',
                'Una selección editorial de retiros que van más allá del bienestar — diseñados para el silencio real, no para el Instagram del silencio.',
                '一份编辑甄选——超越"康养"的禅修，为真正的静默而设，不为静默的Instagram。',
              )}
            </p>
          </div>
        </div>

        {/* Retreat directory */}
        <div className="max-w-5xl mx-auto space-y-24">
          {retreats.map((retreat, i) => (
            <div key={retreat.slug} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                <img
                  src={`/assets/${retreat.slug}.jpg`}
                  alt={getLocalized(retreat.title, lang)}
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                <span className="tag text-gold">
                  {tr(`Retreat ${String(i + 1).padStart(2, '0')}`, `Retiro ${String(i + 1).padStart(2, '0')}`, `禅修 ${String(i + 1).padStart(2, '0')}`)}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-charcoal mt-3 mb-5 leading-snug">
                  {getLocalized(retreat.title, lang)}
                </h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex gap-3 text-sm text-charcoal/80">
                    <span className="text-gold font-medium w-20">{tr('Location', 'Ubicación', '地点')}</span>
                    <span>{getLocalized(retreat.location, lang)}</span>
                  </li>
                  <li className="flex gap-3 text-sm text-charcoal/80">
                    <span className="text-gold font-medium w-20">{tr('Duration', 'Duración', '时长')}</span>
                    <span>{getLocalized(retreat.duration, lang)}</span>
                  </li>
                  <li className="flex gap-3 text-sm text-charcoal/80">
                    <span className="text-gold font-medium w-20">{tr('Vibe', 'Ambiente', '气质')}</span>
                    <span>{getLocalized(retreat.vibe, lang)}</span>
                  </li>
                </ul>
                <p className="text-sm text-muted leading-relaxed mb-8">
                  {getLocalized(retreat.review, lang)}
                </p>
                <a
                  href={retreat.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="btn-gold"
                >
                  {t('cta.checkAvailability')} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Newsletter />
    </div>
  );
}
