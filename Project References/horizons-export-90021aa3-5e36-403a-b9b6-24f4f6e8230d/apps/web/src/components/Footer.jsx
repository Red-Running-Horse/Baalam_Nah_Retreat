
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MessageCircle, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

const logoImage = new URL('../../../../Q04_Logo_Balam Nah.avif', import.meta.url).href;

const Footer = () => {
  const { t } = useLanguage();
  
  const content = {
    branding: {
      name: 'Baalam Nah - Casa del Jaguar',
      tagline: {
        en: 'Sustainable Jungle Escape in the Heart of the Mayan Wilderness',
        es: 'Escape Sostenible en la Jungla en el Corazón de la Selva Maya'
      }
    },
    quickLinks: {
      title: {
        en: 'Quick Links',
        es: 'Enlaces Rápidos'
      },
      links: [
        { label: { en: 'Home', es: 'Inicio' }, href: '/' },
        { label: { en: 'Cabins', es: 'Cabañas' }, href: '/cabins' },
        { label: { en: 'Activities', es: 'Actividades' }, href: '/activities' },
        { label: { en: 'About', es: 'Acerca' }, href: '/about' },
        { label: { en: 'Contact', es: 'Contacto' }, href: '/contact' },
        { label: { en: 'Policies', es: 'Políticas' }, href: '/policies' }
      ]
    },
    social: {
      title: {
        en: 'Follow Us',
        es: 'Síguenos'
      },
      links: [
        {
          name: 'Facebook',
          icon: Facebook,
          url: 'https://facebook.com/EcoBalamNah',
          ariaLabel: { en: 'Visit our Facebook page', es: 'Visita nuestra página de Facebook' }
        },
        {
          name: 'Instagram',
          icon: Instagram,
          url: 'https://instagram.com/baalamnah',
          ariaLabel: { en: 'Visit our Instagram profile', es: 'Visita nuestro perfil de Instagram' }
        },
        {
          name: 'WhatsApp',
          icon: MessageCircle,
          url: 'https://wa.me/52983123456',
          ariaLabel: { en: 'Chat with us on WhatsApp', es: 'Chatea con nosotros en WhatsApp' }
        }
      ]
    },
    location: {
      title: {
        en: 'Find Us',
        es: 'Encuéntranos'
      },
      fallback: {
        en: 'Felipe Carrillo Puerto, Quintana Roo, Mexico',
        es: 'Felipe Carrillo Puerto, Quintana Roo, México'
      }
    },
    copyright: {
      text: {
        en: '© 2026 Baalam Nah - Casa del Jaguar. All rights reserved.',
        es: '© 2026 Baalam Nah - Casa del Jaguar. Todos los derechos reservados.'
      }
    }
  };
  
  return (
    <footer 
      className="w-full py-12 md:py-16"
      style={{ backgroundColor: 'hsl(var(--jungle-green))' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center justify-center mb-4">
            <img
              src={logoImage}
              alt={content.branding.name}
              className="h-16 md:h-20 w-auto object-contain"
            />
          </div>
          <p 
            className="text-center text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'hsl(var(--cream))' }}
          >
            {t(content.branding.tagline)}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          <div>
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: 'hsl(var(--cream))' }}
            >
              {t(content.quickLinks.title)}
            </h3>
            <nav className="flex flex-col space-y-3">
              {content.quickLinks.links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm transition-all duration-200 hover:translate-x-1"
                  style={{ color: 'hsl(var(--cream))' }}
                  onMouseEnter={(e) => e.target.style.color = 'hsl(var(--jaguar-gold))'}
                  onMouseLeave={(e) => e.target.style.color = 'hsl(var(--cream))'}
                >
                  {t(link.label)}
                </Link>
              ))}
            </nav>
          </div>
          
          <div>
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: 'hsl(var(--cream))' }}
            >
              {t(content.social.title)}
            </h3>
            <div className="flex space-x-4">
              {content.social.links.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t(social.ariaLabel)}
                    className="transition-all duration-200 hover:scale-110"
                    style={{ color: 'hsl(var(--cream))' }}
                    onMouseEnter={(e) => {
                      const svg = e.currentTarget.querySelector('svg');
                      if (svg) svg.style.color = 'hsl(var(--jaguar-gold))';
                    }}
                    onMouseLeave={(e) => {
                      const svg = e.currentTarget.querySelector('svg');
                      if (svg) svg.style.color = 'hsl(var(--cream))';
                    }}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
            <div className="mt-6">
              <a
                href="https://wa.me/52983123456"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-sm transition-all duration-200"
                style={{ color: 'hsl(var(--cream))' }}
                onMouseEnter={(e) => e.target.style.color = 'hsl(var(--jaguar-gold))'}
                onMouseLeave={(e) => e.target.style.color = 'hsl(var(--cream))'}
              >
                <MessageCircle className="h-4 w-4" />
                <span>+52 983 123 4567</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: 'hsl(var(--cream))' }}
            >
              {t(content.location.title)}
            </h3>
            <div className="relative rounded-lg overflow-hidden shadow-lg" style={{ aspectRatio: '16/9' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119073.89842896!2d-87.76!3d19.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f5ba3e7e1e1e1e1%3A0x1e1e1e1e1e1e1e1e!2sFelipe%20Carrillo%20Puerto%2C%20Quintana%20Roo%2C%20Mexico!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t(content.location.title)}
              />
            </div>
            <div className="flex items-center space-x-2 mt-3">
              <MapPin className="h-4 w-4 flex-shrink-0" style={{ color: 'hsl(var(--cream))' }} />
              <p className="text-xs" style={{ color: 'hsl(var(--cream))' }}>
                {t(content.location.fallback)}
              </p>
            </div>
          </div>
        </div>
        
        <div 
          className="pt-8 border-t"
          style={{ borderColor: 'hsl(var(--cream) / 0.2)' }}
        >
          <p 
            className="text-center text-sm"
            style={{ color: 'hsl(var(--cream))' }}
          >
            {t(content.copyright.text)}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
