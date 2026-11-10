import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';

export default function NotFound() {
  const { lang } = useLang();
  const prefix = lang === 'en' ? '' : `/${lang}`;

  const tr = (en: string, es: string, zh: string) => (lang === 'zh' ? zh : lang === 'es' ? es : en);

  return (
    <div className="fade-on-mount pt-40 pb-20 min-h-[60vh] flex items-center">
      <div className="container-editorial text-center">
        <h1 className="font-serif text-6xl md:text-8xl text-divider mb-6 tracking-tightest">404</h1>
        <p className="font-serif italic text-xl text-muted mb-8">
          {tr(
            'This page does not exist. Perhaps it never did. Perhaps that is fine.',
            'Esta página no existe. Quizás nunca existió. Quizás eso está bien.',
            '此页不存在。也许从未存在。也许这无妨。',
          )}
        </p>
        <Link to={prefix || '/'} className="btn-gold">
          {tr('Return home', 'Volver al inicio', '返回首页')}
        </Link>
      </div>
    </div>
  );
}
