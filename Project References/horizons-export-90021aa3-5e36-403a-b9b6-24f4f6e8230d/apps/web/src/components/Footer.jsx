import React from 'react';
import { ArrowUpRight, MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { getWhatsAppUrl } from '../lib/contact.js';
import logo from '../../../../../../brand/Balam-Nah Logo.svg';

const Footer = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <a className="footer-wordmark" href="#inicio" aria-label="Balam-Nah">
            <img src={logo} alt="" />
          </a>
          <p>{t({
            es: 'Un día distinto, organizado por el agua.',
            en: 'A different kind of day, shaped by the water.',
          })}</p>
        </div>
        <div className="footer-links">
          <a href={getWhatsAppUrl(language)} target="_blank" rel="noreferrer">
            <MessageCircle size={17} aria-hidden="true" />
            WhatsApp
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=X-Hazil+Sur+Quintana+Roo"
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={17} aria-hidden="true" />
            {t({ es: 'Ver la zona', en: 'View the area' })}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="footer-meta">
        <span>X-Hazil Sur, Quintana Roo, México</span>
        <span>© {new Date().getFullYear()} Balam-Nah</span>
      </div>
    </footer>
  );
};

export default Footer;
