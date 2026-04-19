
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

const logoImage = new URL('../../../../Q04_Logo_Balam Nah.avif', import.meta.url).href;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  
  const navLinks = [
    { 
      label: { en: 'Home', es: 'Inicio' }, 
      href: '/'
    },
    { 
      label: { en: 'Cabins', es: 'Cabañas' }, 
      href: '/cabins'
    },
    { 
      label: { en: 'Activities', es: 'Actividades' }, 
      href: '/activities'
    },
    { 
      label: { en: 'About', es: 'Acerca' }, 
      href: '/about'
    },
    { 
      label: { en: 'Contact', es: 'Contacto' }, 
      href: '/contact'
    }
  ];
  
  const isActive = (href) => {
    return location.pathname === href;
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link 
            to="/"
            className="flex items-center space-x-2 transition-opacity duration-200 hover:opacity-80"
          >
            <img
              src={logoImage}
              alt="Baalam Nah"
              className="h-12 w-auto object-contain"
            />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-all duration-200 hover:text-foreground hover:scale-105 ${
                  isActive(link.href) 
                    ? 'text-foreground font-semibold' 
                    : 'text-foreground/80'
                }`}
              >
                {t(link.label)}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden md:flex items-center space-x-2 transition-all duration-200"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">
                {language === 'en' ? 'ES' : 'EN'}
              </span>
            </Button>
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <div className="flex flex-col space-y-6 mt-8">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <img
                      src={logoImage}
                      alt="Baalam Nah"
                      className="h-10 w-auto object-contain"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleLanguage}
                      className="flex items-center space-x-2"
                    >
                      <Globe className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {language === 'en' ? 'ES' : 'EN'}
                      </span>
                    </Button>
                  </div>
                  
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-base font-medium transition-all duration-200 hover:text-foreground hover:translate-x-1 ${
                          isActive(link.href)
                            ? 'text-foreground font-semibold'
                            : 'text-foreground/80'
                        }`}
                      >
                        {t(link.label)}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
