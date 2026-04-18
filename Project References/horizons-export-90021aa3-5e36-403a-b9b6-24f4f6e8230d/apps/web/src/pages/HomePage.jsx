
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Waves, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

const HomePage = () => {
  const { t } = useLanguage();
  
  const content = {
    meta: {
      title: {
        en: 'Baalam Nah - Casa del Jaguar | Eco-Retreat in the Mayan Jungle',
        es: 'Baalam Nah - Casa del Jaguar | Retiro Ecológico en la Selva Maya'
      },
      description: {
        en: 'Experience authentic eco-tourism in the heart of the Mayan jungle. Sustainable cabins, nature activities, and cultural immersion in Felipe Carrillo Puerto, Quintana Roo.',
        es: 'Experimenta el ecoturismo auténtico en el corazón de la selva maya. Cabañas sostenibles, actividades en la naturaleza e inmersión cultural en Felipe Carrillo Puerto, Quintana Roo.'
      }
    },
    hero: {
      title: 'Baalam Nah - Casa del Jaguar',
      tagline: {
        en: 'Where the Jaguar Roams Free',
        es: 'Donde el Jaguar Vaga Libre'
      },
      cta: {
        en: 'Book Your Stay',
        es: 'Reserva tu Estadía'
      }
    },
    mission: {
      heading: {
        en: 'Our Mission',
        es: 'Nuestra Misión'
      },
      text: {
        en: 'Nestled in the heart of the Mayan jungle, Baalam Nah offers an authentic eco-tourism experience. We are committed to sustainable practices that honor the land and the ancient Mayan culture, providing our guests with a transformative connection to nature.',
        es: 'Ubicado en el corazón de la selva maya, Baalam Nah ofrece una experiencia auténtica de ecoturismo. Estamos comprometidos con prácticas sostenibles que honran la tierra y la antigua cultura maya, brindando a nuestros huéspedes una conexión transformadora con la naturaleza.'
      }
    },
    features: [
      {
        id: 'cabins',
        icon: Leaf,
        title: {
          en: 'Eco Cabins',
          es: 'Cabañas Ecológicas'
        },
        description: {
          en: 'Rustic cabins built with sustainable materials, offering comfort while minimizing environmental impact. Each cabin provides an intimate retreat surrounded by jungle sounds.',
          es: 'Cabañas rústicas construidas con materiales sostenibles, que ofrecen comodidad mientras minimizan el impacto ambiental. Cada cabaña proporciona un refugio íntimo rodeado de sonidos de la selva.'
        },
        image: 'https://images.unsplash.com/photo-1686195005205-82cb998eb64b'
      },
      {
        id: 'activities',
        icon: Waves,
        title: {
          en: 'Nature Activities',
          es: 'Actividades en la Naturaleza'
        },
        description: {
          en: 'Explore the jungle through kayaking, guided hikes, and bird watching. Discover hidden cenotes and observe wildlife in their natural habitat.',
          es: 'Explora la selva a través de kayak, caminatas guiadas y observación de aves. Descubre cenotes ocultos y observa la vida silvestre en su hábitat natural.'
        }
      },
      {
        id: 'culture',
        icon: Users,
        title: {
          en: 'Authentic Mayan Culture',
          es: 'Cultura Maya Auténtica'
        },
        description: {
          en: 'Immerse yourself in Mayan traditions through cultural workshops, traditional cuisine, and storytelling sessions with local community members.',
          es: 'Sumérgete en las tradiciones mayas a través de talleres culturales, cocina tradicional y sesiones de narración con miembros de la comunidad local.'
        }
      }
    ]
  };
  
  return (
    <>
      <Helmet>
        <title>{t(content.meta.title)}</title>
        <meta name="description" content={t(content.meta.description)} />
      </Helmet>
      
      <main>
        <section 
          id="hero" 
          className="relative min-h-screen flex items-center justify-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1642939522738-289ec8fb1bcb)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
          
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                {content.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                {t(content.hero.tagline)}
              </p>
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-primary/20"
              >
                {t(content.hero.cta)}
              </Button>
            </motion.div>
          </div>
        </section>
        
        <section id="mission" className="py-20 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6 leading-snug">
                {t(content.mission.heading)}
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed max-w-prose mx-auto">
                {t(content.mission.text)}
              </p>
            </motion.div>
          </div>
        </section>
        
        <section id="features" className="py-20 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.id}
                    id={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card 
                      className={`h-full transition-all duration-300 ${
                        index === 0 
                          ? 'shadow-lg hover:shadow-xl border' 
                          : index === 1 
                          ? 'bg-muted hover:bg-muted/80 border-0' 
                          : 'border-2 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <CardHeader>
                        {feature.image ? (
                          <div className="mb-4 rounded-xl overflow-hidden">
                            <img 
                              src={feature.image} 
                              alt={t(feature.title)}
                              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        ) : (
                          <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10">
                            <Icon className="h-8 w-8 text-primary" />
                          </div>
                        )}
                        <CardTitle className="text-2xl font-semibold">
                          {t(feature.title)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base leading-relaxed">
                          {t(feature.description)}
                        </CardDescription>
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

export default HomePage;
