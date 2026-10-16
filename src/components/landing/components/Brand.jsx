import { useState, useEffect } from 'react'
import lightLogo from '../../../assets/logo-light.png'
import darkLogo from '../../../assets/logo-dark.png'

export function Brand({ footer = false, theme }) {
  const [activeTheme, setActiveTheme] = useState(() => {
    if (theme) return theme;
    if (typeof document !== 'undefined') {
      return document.documentElement.dataset.theme || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    if (theme) {
      setActiveTheme(theme);
      return;
    }
    const updateTheme = () => {
      setActiveTheme(document.documentElement.dataset.theme || 'dark');
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, [theme]);

  const currentTheme = theme || activeTheme;
  const logo = currentTheme === 'light' ? lightLogo : darkLogo;

  return (
    <img
      className={`brand-image ${footer ? 'brand-image--footer' : ''}`}
      src={logo}
      alt="Edhrio"

    />
  );
}

