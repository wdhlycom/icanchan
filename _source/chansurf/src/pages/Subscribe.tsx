import { useLang } from '../i18n/LangContext';
import { useSEO } from '../hooks/useSEO';

export default function Subscribe() {
  const { lang } = useLang();
  const prefix = lang === 'en' ? '' : `/${lang}`;

  const tr = (en: string, es: string, zh: string) => (lang === 'zh' ? zh : lang === 'es' ? es : en);

  useSEO({
    title: tr('Subscribe', 'Suscribirse', '订阅'),
    description: tr(
      'Subscribe to the canchan.com newsletter. Occasional letters on Chan philosophy, cognitive practice, and curated stillness. No noise, no spam.',
      'Suscríbete al newsletter de canchan.com. Cartas ocasionales sobre filosofía Chan, práctica cognitiva y quietud curada. Sin ruido, sin spam.',
      '订阅canchan.com的通讯。偶尔寄出的信，关于禅的哲学、认知修行与甄选的静默。无噪音，无垃圾邮件。',
    ),
    path: `${prefix}/subscribe`,
  });

  return (
    <div className="fade-on-mount pt-28 md:pt-36 pb-20">
      <div className="container-editorial text-center">
        <span className="tag text-gold">Newsletter</span>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-charcoal mt-4 mb-6 leading-[1.05] tracking-tightest">
          {tr('Join the quiet circle.', 'Únete al círculo silencioso.', '加入静默之圈。')}
        </h1>
        <p className="text-lg text-muted leading-relaxed mb-12 max-w-lg mx-auto">
          {tr(
            'Occasional letters on Chan philosophy, cognitive practice, and curated stillness. No noise, no spam, no promises of enlightenment in 30 days.',
            'Cartas ocasionales sobre filosofía Chan, práctica cognitiva y quietud curada. Sin ruido, sin spam, sin promesas de iluminación en 30 días.',
            '偶尔寄出的信，关于禅的哲学、认知修行与甄选的静默。无噪音，无垃圾邮件，无"三十天开悟"的承诺。',
          )}
        </p>

        <div className="max-w-md mx-auto">
          <a
            href="https://canchan.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold w-full sm:w-auto"
          >
            {tr('Subscribe on Substack →', 'Suscribirse en Substack →', '在Substack订阅 →')}
          </a>
        </div>

        <div className="mt-20 pt-10 border-t border-divider">
          <p className="font-serif italic text-xl text-muted max-w-md mx-auto leading-relaxed">
            {tr(
              'The mind needs less, not more. Our newsletter reflects that.',
              'La mente necesita menos, no más. Nuestro newsletter refleja eso.',
              '心需要的更少，不是更多。我们的通讯正是如此。',
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
