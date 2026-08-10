import React, { useEffect, useState } from 'react';
import { Globe2, Menu, MessageCircle, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { getWhatsAppUrl } from '../lib/contact.js';
import logoDark from '../../../../../../brand/baalam-nah-logo-dark-compact.png';
import logoLight from '../../../../../../brand/baalam-nah-logo-light-compact.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const links = [
    { href: '#laguna', label: { es: 'La laguna', en: 'The lagoon' } },
    { href: '#experiencias', label: { es: 'Experiencias', en: 'Experiences' } },
    { href: '#estancias', label: { es: 'Estancias', en: 'Stays' } },
    { href: '#vision', label: { es: 'La visión', en: 'The vision' } },
  ];

  const closeMenu = () => setMenuOpen(false);
  const solidHeader = scrolled || menuOpen;

  return (
    <header className={`site-header ${solidHeader ? 'is-solid' : ''}`}>
      <a
        className="wordmark"
        href="#inicio"
        aria-label={t({ es: 'Baalam-Nah, inicio', en: 'Baalam-Nah, home' })}
      >
        <img
          className="wordmark-logo"
          src={solidHeader ? logoLight : logoDark}
          alt=""
        />
      </a>

      <nav className="desktop-nav" aria-label={t({ es: 'Navegación principal', en: 'Primary navigation' })}>
        {links.map((link) => (
          <a key={link.href} href={link.href}>{t(link.label)}</a>
        ))}
      </nav>

      <div className="header-actions">
        <button className="language-button" type="button" onClick={toggleLanguage}>
          <Globe2 size={16} aria-hidden="true" />
          <span>{language === 'es' ? 'EN' : 'ES'}</span>
          <span className="sr-only">{t({ es: 'Cambiar a inglés', en: 'Switch to Spanish' })}</span>
        </button>
        <a className="header-whatsapp" href={getWhatsAppUrl(language)} target="_blank" rel="noreferrer">
          <MessageCircle size={17} aria-hidden="true" />
          <span>{t({ es: 'Planear visita', en: 'Plan a visit' })}</span>
        </a>
        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span className="sr-only">{t({ es: 'Abrir menú', en: 'Open menu' })}</span>
        </button>
      </div>

      <div id="mobile-navigation" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}>
        <nav aria-label={t({ es: 'Navegación móvil', en: 'Mobile navigation' })}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>{t(link.label)}</a>
          ))}
          <a href="#visitanos" onClick={closeMenu}>{t({ es: 'Planea tu visita', en: 'Plan your visit' })}</a>
        </nav>
        <p>X-Hazil Sur · Quintana Roo · México</p>
      </div>
    </header>
  );
};

export default Header;
