
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { 
  Clock, 
  TrendingUp,
  Sun,
  Bug,
  Footprints,
  Droplet,
  Wind,
  Camera,
  Shield,
  Eye,
  Shirt,
  Package,
  Menu
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

const ActivitiesPage = () => {
  const { t } = useLanguage();
  
  const content = {
    meta: {
      title: {
        en: 'Activities & Experiences - Baalam Nah Casa del Jaguar',
        es: 'Actividades y Experiencias - Baalam Nah Casa del Jaguar'
      },
      description: {
        en: 'Explore jungle adventures, cultural tours, and nature experiences in the heart of the Mayan jungle.',
        es: 'Explora aventuras en la selva, tours culturales y experiencias en la naturaleza en el corazón de la selva maya.'
      }
    },
    hero: {
      title: {
        en: 'Activities & Experiences',
        es: 'Actividades y Experiencias'
      },
      subtitle: {
        en: 'Immerse yourself in authentic jungle adventures and cultural experiences',
        es: 'Sumérgete en auténticas aventuras de selva y experiencias culturales'
      }
    },
    sidebar: {
      title: {
        en: 'What to Bring',
        es: 'Qué Traer'
      },
      items: [
        { 
          icon: Sun, 
          text: { en: 'Sunscreen (SPF 50+)', es: 'Protector solar (SPF 50+)' } 
        },
        { 
          icon: Bug, 
          text: { en: 'Insect repellent', es: 'Repelente de insectos' } 
        },
        { 
          icon: Footprints, 
          text: { en: 'Hiking boots or sturdy shoes', es: 'Botas de senderismo o zapatos resistentes' } 
        },
        { 
          icon: Droplet, 
          text: { en: 'Reusable water bottle', es: 'Botella de agua reutilizable' } 
        },
        { 
          icon: Shirt, 
          text: { en: 'Breathable, light clothing', es: 'Ropa ligera y transpirable' } 
        },
        { 
          icon: Sun, 
          text: { en: 'Hat or cap', es: 'Sombrero o gorra' } 
        },
        { 
          icon: Camera, 
          text: { en: 'Camera or smartphone', es: 'Cámara o teléfono inteligente' } 
        },
        { 
          icon: Shield, 
          text: { en: 'Waterproof bag', es: 'Bolsa impermeable' } 
        },
        { 
          icon: Eye, 
          text: { en: 'Binoculars (for bird watching)', es: 'Binoculares (para observación de aves)' } 
        },
        { 
          icon: Wind, 
          text: { en: 'Swimsuit', es: 'Traje de baño' } 
        },
        { 
          icon: Package, 
          text: { en: 'Towel', es: 'Toalla' } 
        }
      ]
    },
    difficulty: {
      easy: { en: 'Easy', es: 'Fácil' },
      moderate: { en: 'Moderate', es: 'Moderado' },
      challenging: { en: 'Challenging', es: 'Desafiante' },
      na: { en: 'N/A', es: 'N/A' }
    },
    bookButton: {
      en: 'Learn More / Book',
      es: 'Más Información / Reservar'
    }
  };
  
  const activities = [
    {
      id: 1,
      title: {
        en: 'Kayaking on the Lagoon',
        es: 'Kayak en la Laguna'
      },
      description: {
        en: 'Paddle through serene waters surrounded by lush jungle vegetation. Spot local wildlife including herons, turtles, and tropical fish in their natural habitat.',
        es: 'Rema a través de aguas serenas rodeadas de exuberante vegetación selvática. Observa la vida silvestre local incluyendo garzas, tortugas y peces tropicales en su hábitat natural.'
      },
      image: 'https://images.unsplash.com/photo-1495822892661-2ead864e1c7b',
      duration: { en: '2-3 hours', es: '2-3 horas' },
      difficulty: 'easy'
    },
    {
      id: 2,
      title: {
        en: 'Jungle Hiking Trails',
        es: 'Senderos de Senderismo en la Selva'
      },
      description: {
        en: 'Trek through ancient Mayan paths deep into the jungle. Learn about medicinal plants, spot exotic wildlife, and discover hidden natural wonders with our expert guides.',
        es: 'Camina por antiguos senderos mayas profundamente en la selva. Aprende sobre plantas medicinales, observa vida silvestre exótica y descubre maravillas naturales ocultas con nuestros guías expertos.'
      },
      image: 'https://images.unsplash.com/photo-1678914907096-0919025ec5b9',
      duration: { en: '3-4 hours', es: '3-4 horas' },
      difficulty: 'moderate'
    },
    {
      id: 3,
      title: {
        en: 'Bird Watching',
        es: 'Observación de Aves'
      },
      description: {
        en: 'Experience the incredible diversity of tropical birds in the Mayan jungle. Observe toucans, parrots, hummingbirds, and over 200 species in their natural environment.',
        es: 'Experimenta la increíble diversidad de aves tropicales en la selva maya. Observa tucanes, loros, colibríes y más de 200 especies en su entorno natural.'
      },
      image: 'https://images.unsplash.com/photo-1552728111-9ec0d6056e0e',
      duration: { en: '3-4 hours', es: '3-4 horas' },
      difficulty: 'easy'
    },
    {
      id: 4,
      title: {
        en: 'Traditional Mayan Cultural Tours',
        es: 'Tours Culturales Mayas Tradicionales'
      },
      description: {
        en: 'Immerse yourself in authentic Mayan culture through workshops, traditional cooking classes, and storytelling sessions with local community elders.',
        es: 'Sumérgete en la auténtica cultura maya a través de talleres, clases de cocina tradicional y sesiones de narración con ancianos de la comunidad local.'
      },
      image: 'https://images.unsplash.com/photo-1698786030420-f38e5b98c127',
      duration: { en: '2-3 hours', es: '2-3 horas' },
      difficulty: 'easy'
    },
    {
      id: 5,
      title: {
        en: 'Night Wildlife Walks',
        es: 'Caminatas Nocturnas de Vida Silvestre'
      },
      description: {
        en: 'Discover the jungle after dark. Experience nocturnal wildlife, listen to the symphony of night sounds, and witness bioluminescent organisms in this unique adventure.',
        es: 'Descubre la selva después del anochecer. Experimenta la vida silvestre nocturna, escucha la sinfonía de sonidos nocturnos y observa organismos bioluminiscentes en esta aventura única.'
      },
      image: 'https://images.unsplash.com/photo-1615688116776-e14c2faff88a',
      duration: { en: '2 hours', es: '2 horas' },
      difficulty: 'moderate'
    },
    {
      id: 6,
      title: {
        en: 'Swimming in Cenotes',
        es: 'Natación en Cenotes'
      },
      description: {
        en: 'Swim in crystal-clear sacred cenotes, natural sinkholes filled with fresh water. These mystical pools were considered sacred by the ancient Maya.',
        es: 'Nada en cenotes sagrados de aguas cristalinas, sumideros naturales llenos de agua dulce. Estas piscinas místicas eran consideradas sagradas por los antiguos mayas.'
      },
      image: 'https://images.unsplash.com/photo-1687007659689-2ac7590f8a45',
      duration: { en: '2-3 hours', es: '2-3 horas' },
      difficulty: 'easy'
    },
    {
      id: 7,
      title: {
        en: 'On-site Restaurant with Local Cuisine',
        es: 'Restaurante en el Lugar con Cocina Local'
      },
      description: {
        en: 'Savor authentic Mayan and regional dishes prepared with locally sourced ingredients. Enjoy traditional flavors in a rustic jungle setting.',
        es: 'Saborea auténticos platillos mayas y regionales preparados con ingredientes de origen local. Disfruta sabores tradicionales en un entorno rústico de selva.'
      },
      image: 'https://images.unsplash.com/photo-1450494612745-731d0fd7e172',
      duration: { en: 'Flexible', es: 'Flexible' },
      difficulty: 'na'
    }
  ];
  
  const getDifficultyBadgeClass = (difficulty) => {
    const classes = {
      easy: 'badge-easy',
      moderate: 'badge-moderate',
      challenging: 'badge-challenging',
      na: 'bg-muted text-muted-foreground'
    };
    return classes[difficulty] || 'bg-muted text-muted-foreground';
  };
  
  const getCardStyle = (index) => {
    const styles = [
      'shadow-lg hover:shadow-xl border transition-all duration-300 hover:-translate-y-1',
      'bg-muted/50 hover:bg-muted/70 border-0 transition-all duration-300',
      'border-2 border-primary/20 shadow-md hover:shadow-lg transition-all duration-300',
      'shadow-lg hover:shadow-xl border transition-all duration-300 hover:-translate-y-1',
      'bg-card hover:shadow-lg border transition-all duration-300',
      'border-2 shadow-sm hover:shadow-md transition-all duration-300',
      'shadow-md hover:shadow-lg border border-secondary/20 transition-all duration-300'
    ];
    return styles[index % styles.length];
  };
  
  const SidebarContent = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4" style={{ color: 'hsl(var(--jungle-green))' }}>
        {t(content.sidebar.title)}
      </h3>
      <div className="space-y-3">
        {content.sidebar.items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-start space-x-3">
              <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: 'hsl(var(--jungle-green))' }} />
              <span className="text-sm leading-relaxed" style={{ color: 'hsl(var(--jungle-green))' }}>
                {t(item.text)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
  
  return (
    <>
      <Helmet>
        <title>{t(content.meta.title)}</title>
        <meta name="description" content={t(content.meta.description)} />
      </Helmet>
      
      <main className="min-h-screen">
        <section 
          className="py-20 md:py-24 bg-gradient-to-br from-[hsl(var(--jungle-green))] to-[hsl(var(--terracotta))] text-white"
          style={{
            backgroundImage: 'linear-gradient(135deg, hsl(var(--jungle-green)) 0%, hsl(var(--terracotta)) 100%), url(https://images.unsplash.com/photo-1551255417-600c7fbc034c)',
            backgroundBlendMode: 'multiply',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                {t(content.hero.title)}
              </h1>
              <p className="text-xl md:text-2xl leading-relaxed opacity-90">
                {t(content.hero.subtitle)}
              </p>
            </motion.div>
          </div>
        </section>
        
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {activities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className={`h-full flex flex-col ${getCardStyle(index)}`}>
                        <div className="rounded-t-xl overflow-hidden">
                          <img 
                            src={activity.image} 
                            alt={t(activity.title)}
                            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle className="text-xl font-semibold mb-3">
                            {t(activity.title)}
                          </CardTitle>
                          <CardDescription className="text-base leading-relaxed">
                            {t(activity.description)}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge className="badge-duration flex items-center space-x-1 px-3 py-1">
                              <Clock className="h-3 w-3" />
                              <span className="text-xs font-medium">{t(activity.duration)}</span>
                            </Badge>
                            <Badge className={`${getDifficultyBadgeClass(activity.difficulty)} px-3 py-1`}>
                              <TrendingUp className="h-3 w-3 mr-1" />
                              <span className="text-xs font-medium">
                                {t(content.difficulty[activity.difficulty])}
                              </span>
                            </Badge>
                          </div>
                          
                          <div className="mt-auto">
                            <Button 
                              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
                            >
                              {t(content.bookButton)}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-4 mt-8 lg:mt-0">
                <div className="hidden lg:block sticky top-24">
                  <Card className="shadow-lg" style={{ backgroundColor: 'hsl(var(--cream))' }}>
                    <CardContent className="p-6">
                      <SidebarContent />
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:hidden fixed bottom-6 right-6 z-40">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button 
                        size="lg"
                        className="rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 w-14 h-14 p-0"
                        aria-label={t(content.sidebar.title)}
                      >
                        <Menu className="h-6 w-6" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[320px] sm:w-[380px]" style={{ backgroundColor: 'hsl(var(--cream))' }}>
                      <SheetHeader>
                        <SheetTitle style={{ color: 'hsl(var(--jungle-green))' }}>
                          {t(content.sidebar.title)}
                        </SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <SidebarContent />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ActivitiesPage;
