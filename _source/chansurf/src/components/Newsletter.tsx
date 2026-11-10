import { useState } from 'react';
import { useLang } from '../i18n/LangContext';

export default function Newsletter({ variant = 'default' }: { variant?: 'default' | 'compact' }) {
  const { t } = useLang();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  if (variant === 'compact') {
    return (
      <div className="border-t border-divider pt-8 mt-12">
        <p className="font-serif text-lg text-charcoal/80 mb-4">
          {t('cta.enjoyedChapter')} {t('cta.subscribeCta')}
        </p>
        {submitted ? (
          <p className="text-sm text-gold font-medium">{t('newsletter.thanks')}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletter.placeholder')}
              className="flex-1 bg-transparent border-b border-divider focus:border-gold py-2 text-sm text-charcoal placeholder:text-muted/50 outline-none transition-colors"
            />
            <button type="submit" className="link-underline text-sm font-medium text-gold uppercase tracking-wider2">
              {t('cta.subscribe')} →
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <section className="container-content py-24 md:py-32">
      <div className="text-center max-w-xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
          {t('newsletter.title')}
        </h2>
        <p className="text-muted text-base leading-relaxed mb-10">
          {t('newsletter.subtitle')}
        </p>
        {submitted ? (
          <p className="font-serif text-xl text-gold">{t('newsletter.thanks')}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletter.placeholder')}
              className="flex-1 bg-white border border-divider focus:border-gold px-5 py-3.5 text-sm text-charcoal placeholder:text-muted/50 outline-none transition-colors"
            />
            <button type="submit" className="btn-gold">
              {t('cta.subscribe')}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
