import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { useLang, Lang } from '../i18n/LangContext';

export default function Header() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const getPrefix = (l: Lang) => (l === 'en' ? '' : `/${l}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const prefix = getPrefix(lang);

  const navLinks = [
    { to: `${prefix}/start-here`, label: t('nav.startHere') },
    { to: `${prefix}/series/buddhism-101`, label: t('nav.series') },
    { to: `${prefix}/escapes`, label: t('nav.escapes') },
    { to: `${prefix}/curated`, label: t('nav.curated') },
    { to: `${prefix}/about`, label: t('nav.about') },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${prefix}/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const switchLang = (l: Lang) => {
    const currentPath = location.pathname;
    // Strip existing language prefix
    const basePath = currentPath.replace(/^\/(es|zh)/, '') || '/';
    navigate(`${getPrefix(l)}${basePath}`);
    setLang(l);
  };

  const langButtons: { code: Lang; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
    { code: 'zh', label: '中文' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-alabaster/95 backdrop-blur-md border-b border-divider'
            : 'bg-transparent'
        }`}
      >
        <div className="container-content flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to={prefix || '/'}
            className="font-serif text-xl md:text-2xl tracking-tightest text-charcoal transition-opacity hover:opacity-70"
          >
            canchan.com
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-xs font-medium uppercase tracking-wider2 text-charcoal/70 transition-colors duration-300 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-4 md:gap-5">
            {/* Language Switcher */}
            <div className="hidden md:flex items-center gap-2 text-xs font-medium tracking-wider2">
              {langButtons.map((btn, i) => (
                <span key={btn.code} className="flex items-center gap-2">
                  <button
                    onClick={() => switchLang(btn.code)}
                    className={`transition-colors duration-300 ${
                      lang === btn.code ? 'text-gold' : 'text-charcoal/40 hover:text-charcoal'
                    }`}
                  >
                    {btn.label}
                  </button>
                  {i < langButtons.length - 1 && <span className="text-charcoal/20">|</span>}
                </span>
              ))}
            </div>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-charcoal/70 transition-colors duration-300 hover:text-gold"
              aria-label={t('nav.search')}
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            {/* Subscribe Button */}
            <Link
              to={`${prefix}/subscribe`}
              className="hidden md:inline-flex btn-outline-gold !px-5 !py-2.5 !text-[10px]"
            >
              {t('nav.subscribe')}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-charcoal/70 transition-colors hover:text-gold"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Expandable search bar */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-alabaster border-b border-divider animate-fade-in">
            <div className="container-content py-5">
              <form onSubmit={handleSearch} className="flex items-center gap-3">
                <Search size={18} strokeWidth={1.5} className="text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('nav.search') + '...'}
                  autoFocus
                  className="flex-1 bg-transparent text-base font-serif text-charcoal placeholder:text-muted/50 outline-none"
                />
                <button type="button" onClick={() => setSearchOpen(false)}>
                  <X size={18} strokeWidth={1.5} className="text-muted hover:text-charcoal" />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-alabaster animate-fade-in pt-16">
          <nav className="container-content flex flex-col gap-1 pt-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-serif text-2xl py-3 text-charcoal border-b border-divider transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to={`${prefix}/subscribe`}
              className="btn-outline-gold mt-6 self-start"
            >
              {t('nav.subscribe')}
            </Link>
            <div className="flex items-center gap-3 mt-8 text-sm font-medium tracking-wider2">
              {langButtons.map((btn, i) => (
                <span key={btn.code} className="flex items-center gap-3">
                  <button
                    onClick={() => switchLang(btn.code)}
                    className={lang === btn.code ? 'text-gold' : 'text-charcoal/40'}
                  >
                    {btn.label}
                  </button>
                  {i < langButtons.length - 1 && <span className="text-charcoal/20">|</span>}
                </span>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
