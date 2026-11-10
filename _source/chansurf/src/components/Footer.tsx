import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';

export default function Footer() {
  const { lang, t } = useLang();
  const prefix = lang === 'en' ? '' : `/${lang}`;

  const links = [
    { to: `${prefix}/start-here`, label: t('nav.startHere') },
    { to: `${prefix}/series/buddhism-101`, label: t('nav.series') },
    { to: `${prefix}/escapes`, label: t('nav.escapes') },
    { to: `${prefix}/curated`, label: t('nav.curated') },
    { to: `${prefix}/about`, label: t('nav.about') },
    { to: `${prefix}/subscribe`, label: t('nav.subscribe') },
  ];

  return (
    <footer className="border-t border-divider bg-alabaster mt-24">
      <div className="container-content py-16">
        <div className="flex flex-col items-center text-center gap-8">
          <Link
            to={prefix || '/'}
            className="font-serif text-2xl tracking-tightest text-charcoal"
          >
            canchan.com
          </Link>
          <p className="font-serif italic text-lg text-muted max-w-md">
            {t('footer.tagline')}
          </p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-xs font-medium uppercase tracking-wider2 text-charcoal/60 transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="w-12 h-px bg-gold/40" />
          <p className="text-xs text-muted/60 tracking-wider2">
            © {new Date().getFullYear()} canchan.com — {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
