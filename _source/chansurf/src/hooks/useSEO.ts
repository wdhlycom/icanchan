import { useEffect } from 'react';
import { useLang } from '../i18n/LangContext';

interface SEOProps {
  title: string;
  description?: string;
  path: string;
}

export function useSEO({ title, description, path }: SEOProps) {
  const { lang } = useLang();

  useEffect(() => {
    const fullTitle = `${title} — canchan.com`;
    document.title = fullTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    if (description) metaDesc.setAttribute('content', description);

    // Strip any language prefix to get the base path
    const basePath = path.replace(/^\/(es|zh)/, '') || '/';

    // Canonical points to current language version
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://canchan.com${path}`);

    // Hreflang for all three languages
    const hrefs = [
      { hreflang: 'en', href: `https://canchan.com${basePath}` },
      { hreflang: 'es', href: `https://canchan.com/es${basePath}` },
      { hreflang: 'zh', href: `https://canchan.com/zh${basePath}` },
      { hreflang: 'x-default', href: `https://canchan.com${basePath}` },
    ];

    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    hrefs.forEach(({ hreflang, href }) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      link.setAttribute('href', href);
      document.head.appendChild(link);
    });
  }, [title, description, path, lang]);
}
