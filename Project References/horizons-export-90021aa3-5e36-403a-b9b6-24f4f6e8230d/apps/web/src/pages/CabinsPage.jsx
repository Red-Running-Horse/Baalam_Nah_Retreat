
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { 
  Users, 
  Wind, 
  Droplet, 
  Leaf, 
  Sun, 
  Home,
  Tent,
  Palmtree,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

const CabinsPage = () => {
  const { t } = useLanguage();
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });
  
  const content = {
    meta: {
      title: {
        en: 'Eco Cabins - Baalam Nah Casa del Jaguar',
        es: 'Cabañas Ecológicas - Baalam Nah Casa del Jaguar'
      },
      description: {
        en: 'Sustainable jungle cabins built with eco-friendly materials. Experience authentic eco-tourism in the heart of the Mayan jungle.',
        es: 'Cabañas de selva sostenibles construidas con materiales ecológicos. Experimenta el ecoturismo auténtico en el corazón de la selva maya.'
      }
    },
    hero: {
      title: {
        en: 'Our Eco Cabins',
        es: 'Nuestras Cabañas Ecológicas'
      },
      subtitle: {
        en: 'Sustainable comfort in the heart of the jungle',
        es: 'Comodidad sostenible en el corazón de la selva'
      }
    },
    calendar: {
      title: {
        en: 'Check Availability',
        es: 'Verificar Disponibilidad'
      },
      description: {
        en: 'Select your desired dates to check cabin availability',
        es: 'Selecciona tus fechas deseadas para verificar disponibilidad'
      },
      selectRange: {
        en: 'Select date range',
        es: 'Seleccionar rango de fechas'
      }
    },
    construction: {
      title: {
        en: 'Built with Nature in Mind',
        es: 'Construidas con la Naturaleza en Mente'
      },
      text: {
        en: 'Our cabins are thoughtfully constructed using locally sourced, sustainable materials that honor the jungle ecosystem. Each structure features natural ventilation, rainwater collection systems, and solar lighting. We work closely with local Mayan communities to ensure traditional building techniques are preserved while minimizing our environmental footprint. Every cabin is designed to provide comfort without compromising the pristine beauty of our surroundings.',
        es: 'Nuestras cabañas están cuidadosamente construidas utilizando materiales sostenibles de origen local que honran el ecosistema de la selva. Cada estructura cuenta con ventilación natural, sistemas de recolección de agua de lluvia e iluminación solar. Trabajamos estrechamente con las comunidades mayas locales para garantizar que se preserven las técnicas de construcción tradicionales mientras minimizamos nuestra huella ambiental. Cada cabaña está diseñada para brindar comodidad sin comprometer la belleza prístina de nuestro entorno.'
      }
    },
    amenities: {
      mosquitoNet: { en: 'Mosquito nets', es: 'Mosquiteros' },
      fan: { en: 'Natural ventilation', es: 'Ventilación natural' },
      bathroom: { en: 'Private bathroom', es: 'Baño privado' },
      ecoShower: { en: 'Eco-shower', es: 'Ducha ecológica' },
      hammock: { en: 'Hammock', es: 'Hamaca' },
      solarLighting: { en: 'Solar lighting', es: 'Iluminación solar' },
      compostingToilet: { en: 'Composting toilet', es: 'Baño de composta' },
      outdoorDeck: { en: 'Outdoor deck', es: 'Terraza exterior' },
      rainwaterShower: { en: 'Rainwater shower', es: 'Ducha de agua de lluvia' },
      jungleView: { en: 'Jungle view', es: 'Vista a la selva' }
    },
    bookButton: {
      en: 'Book This Cabin',
      es: 'Reservar Esta Cabaña'
    },
    perNight: {
      en: 'per night',
      es: 'por noche'
    },
    guests: {
      en: 'guests',
      es: 'huéspedes'
    }
  };
  
  const cabins = [
    {
      id: 1,
      name: { en: 'Ixchel Cabin', es: 'Cabaña Ixchel' },
      description: { 
        en: 'Named after the Mayan goddess of the moon, this cozy cabin offers a peaceful retreat with jungle views.',
        es: 'Nombrada en honor a la diosa maya de la luna, esta acogedora cabaña ofrece un refugio tranquilo con vistas a la selva.'
      },
      image: 'https://images.unsplash.com/photo-1655477760430-559b81747d56',
      capacity: 2,
      price: 89,
      amenities: ['mosquitoNet', 'fan', 'bathroom', 'ecoShower', 'hammock', 'solarLighting'],
      category: 'standard'
    },
    {
      id: 2,
      name: { en: 'Kukulkan Suite', es: 'Suite Kukulkan' },
      description: { 
        en: 'Our premium cabin inspired by the feathered serpent deity, featuring an expansive outdoor deck.',
        es: 'Nuestra cabaña premium inspirada en la deidad de la serpiente emplumada, con una amplia terraza exterior.'
      },
      image: 'https://images.unsplash.com/photo-1686067099049-ae5788bb94db',
      capacity: 4,
      price: 147,
      amenities: ['mosquitoNet', 'fan', 'bathroom', 'ecoShower', 'outdoorDeck', 'solarLighting', 'jungleView'],
      category: 'premium'
    },
    {
      id: 3,
      name: { en: 'Chaac Family Cabin', es: 'Cabaña Familiar Chaac' },
      description: { 
        en: 'Spacious family cabin named after the rain god, with rainwater collection and eco-friendly amenities.',
        es: 'Amplia cabaña familiar nombrada en honor al dios de la lluvia, con recolección de agua de lluvia y comodidades ecológicas.'
      },
      image: 'https://images.unsplash.com/photo-1613409467214-fe6252cf721d',
      capacity: 6,
      price: 183,
      amenities: ['mosquitoNet', 'fan', 'bathroom', 'rainwaterShower', 'outdoorDeck', 'solarLighting', 'hammock'],
      category: 'family'
    },
    {
      id: 4,
      name: { en: 'Yum Kaax Cabin', es: 'Cabaña Yum Kaax' },
      description: { 
        en: 'Embrace the spirit of the jungle god in this rustic cabin surrounded by lush vegetation.',
        es: 'Abraza el espíritu del dios de la selva en esta cabaña rústica rodeada de vegetación exuberante.'
      },
      image: 'https://images.unsplash.com/photo-1596492311772-dfb5b4a5d052',
      capacity: 3,
      price: 76,
      amenities: ['mosquitoNet', 'fan', 'compostingToilet', 'ecoShower', 'hammock', 'jungleView'],
      category: 'standard'
    },
    {
      id: 5,
      name: { en: 'Ah Puch Glamping', es: 'Glamping Ah Puch' },
      description: { 
        en: 'Luxury camping experience with all essential amenities in a stunning jungle setting.',
        es: 'Experiencia de camping de lujo con todas las comodidades esenciales en un impresionante entorno selvático.'
      },
      image: 'https://images.unsplash.com/photo-1703764019506-71e7e44ab37c',
      capacity: 2,
      price: 68,
      amenities: ['mosquitoNet', 'fan', 'compostingToilet', 'outdoorDeck', 'solarLighting'],
      category: 'camping'
    },
    {
      id: 6,
      name: { en: 'Ek Chuah Retreat', es: 'Retiro Ek Chuah' },
      description: { 
        en: 'Premium jungle cabin with modern eco-amenities and breathtaking canopy views.',
        es: 'Cabaña premium de selva con comodidades ecológicas modernas y vistas impresionantes del dosel.'
      },
      image: 'https://images.unsplash.com/photo-1669015538569-eeac1753fa79',
      capacity: 4,
      price: 134,
      amenities: ['mosquitoNet', 'fan', 'bathroom', 'ecoShower', 'outdoorDeck', 'solarLighting', 'jungleView', 'hammock'],
      category: 'premium'
    }
  ];
  
  const getAmenityIcon = (amenity) => {
    const icons = {
      mosquitoNet: Sparkles,
      fan: Wind,
      bathroom: Home,
      ecoShower: Droplet,
      hammock: Palmtree,
      solarLighting: Sun,
      compostingToilet: Leaf,
      outdoorDeck: Home,
      rainwaterShower: Droplet,
      jungleView: Palmtree
    };
    return icons[amenity] || Leaf;
  };
  
  const getCardStyle = (index) => {
    const styles = [
      'shadow-lg hover:shadow-xl border transition-all duration-300',
      'bg-muted hover:bg-muted/80 border-0 transition-all duration-300',
      'border-2 shadow-sm hover:shadow-md transition-all duration-300',
      'shadow-lg hover:shadow-xl border transition-all duration-300',
      'bg-card hover:shadow-lg border transition-all duration-300',
      'border-2 border-primary/20 shadow-md hover:shadow-lg transition-all duration-300'
    ];
    return styles[index % styles.length];
  };
  
  return (
    <>
      <Helmet>
        <title>{t(content.meta.title)}</title>
        <meta name="description" content={t(content.meta.description)} />
      </Helmet>
      
      <main className="min-h-screen">
        <section className="py-16 md:py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                {t(content.hero.title)}
              </h1>
              <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
                {t(content.hero.subtitle)}
              </p>
            </motion.div>
          </div>
        </section>
        
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="max-w-3xl mx-auto shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">
                    {t(content.calendar.title)}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {t(content.calendar.description)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    className="rounded-xl border"
                    disabled={(date) => date < new Date()}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
        
        <section className="py-16 md:py-20 bg-secondary text-secondary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 leading-snug text-center">
                {t(content.construction.title)}
              </h2>
              <p className="text-lg leading-relaxed max-w-prose mx-auto text-center">
                {t(content.construction.text)}
              </p>
            </motion.div>
          </div>
        </section>
        
        <section className="py-20 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cabins.map((cabin, index) => {
                return (
                  <motion.div
                    key={cabin.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className={`h-full flex flex-col ${getCardStyle(index)}`}>
                      <div className="rounded-t-xl overflow-hidden">
                        <img 
                          src={cabin.image} 
                          alt={t(cabin.name)}
                          className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-2xl font-semibold">
                          {t(cabin.name)}
                        </CardTitle>
                        <CardDescription className="text-base leading-relaxed">
                          {t(cabin.description)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <div className="mb-4 flex items-center space-x-2 text-sm font-medium">
                          <Users className="h-4 w-4 text-primary" />
                          <span>{cabin.capacity} {t(content.guests)}</span>
                        </div>
                        
                        <div className="mb-6 grid grid-cols-2 gap-2">
                          {cabin.amenities.map((amenity) => {
                            const Icon = getAmenityIcon(amenity);
                            return (
                              <div 
                                key={amenity}
                                className="flex items-center space-x-2 text-sm"
                              >
                                <Icon className="h-4 w-4 text-primary flex-shrink-0" />
                                <span className="text-foreground/80">
                                  {t(content.amenities[amenity])}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className="mt-auto">
                          <div className="mb-4 flex items-baseline space-x-2">
                            <span className="text-3xl font-bold text-primary">
                              ${cabin.price}
                            </span>
                            <span className="text-sm text-foreground/60">
                              {t(content.perNight)}
                            </span>
                          </div>
                          
                          <Button 
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
                            size="lg"
                          >
                            {t(content.bookButton)}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CabinsPage;
