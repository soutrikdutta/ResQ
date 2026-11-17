import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'resq-theme';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') return stored;

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === 'light' ? '#eef3fb' : '#060a13');
    }
  }, [theme]);

  // Follow the OS while the user hasn't explicitly chosen a theme.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (event: MediaQueryListEvent) => {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setTheme(event.matches ? 'light' : 'dark');
      }
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';

    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage can be unavailable in private mode */
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => unknown;
    };

    if (doc.startViewTransition && !reduceMotion) {
      doc.startViewTransition(() => {
        flushSync(() => setTheme(next));
      });
    } else {
      setTheme(next);
    }
  }, [theme]);

  return { theme, setTheme, toggleTheme };
}

/** Scroll-spy over the main page sections. */
export function useActiveSection(sectionIds: string[], fallback = 'overview', enabled = true) {
  const [active, setActive] = useState(fallback);

  useEffect(() => {
    if (!enabled) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-28% 0px -58% 0px', threshold: [0.05, 0.2, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds.join('|'), enabled]);

  return { active, setActive };
}

/** Reactive media-query hook (SSR-safe). */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/**
 * Reveals every `.reveal` element as it enters the viewport.
 * Uses position checks on scroll (no IntersectionObserver) so content is
 * never left hidden if frame callbacks are throttled, and reveals
 * above-the-fold content immediately.
 * Re-scans whenever `trigger` changes (e.g. mobile screen switches).
 */
export function useScrollReveal(trigger: unknown) {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal:not([data-visible="true"])')
    );

    if (!elements.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      elements.forEach((el) => el.setAttribute('data-visible', 'true'));
      return;
    }

    const reveal = () => {
      const viewport = window.innerHeight;
      let remaining = 0;

      elements.forEach((el) => {
        if (el.dataset.visible === 'true') return;
        const rect = el.getBoundingClientRect();
        // Reveal anything at or above the reveal line, including elements the
        // user scrolled past quickly (so nothing stays hidden above the fold).
        if (rect.top < viewport * 0.94) {
          el.setAttribute('data-visible', 'true');
        } else {
          remaining += 1;
        }
      });

      if (remaining === 0) {
        window.removeEventListener('scroll', reveal);
        window.removeEventListener('resize', reveal);
      }
    };

    reveal();
    window.addEventListener('scroll', reveal, { passive: true });
    window.addEventListener('resize', reveal);

    // Catch late layout shifts (fonts, images, async data).
    const first = window.setTimeout(reveal, 220);
    const second = window.setTimeout(reveal, 900);

    return () => {
      window.removeEventListener('scroll', reveal);
      window.removeEventListener('resize', reveal);
      window.clearTimeout(first);
      window.clearTimeout(second);
    };
  }, [trigger]);
}
