
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Sun, Droplets, Users, ChevronDown, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import pb from '@/lib/pocketbaseClient';

const AboutPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const content = {
    meta: {
      title: {
        en: 'About Us - Baalam Nah Casa del Jaguar',
        es: 'Acerca de Nosotros - Baalam Nah Casa del Jaguar'
      },
      description: {
        en: 'Learn about our community cooperative, sustainable eco-tourism mission, and commitment to preserving Mayan heritage.',
        es: 'Conoce nuestra cooperativa comunitaria, misión de ecoturismo sostenible y compromiso con la preservación del patrimonio maya.'
      }
    },
    hero: {
      title: {
        en: 'About Baalam Nah - Casa del Jaguar',
        es: 'Acerca de Baalam Nah - Casa del Jaguar'
      },
      subtitle: {
        en: 'A community-driven eco-retreat honoring nature and Mayan heritage',
        es: 'Un retiro ecológico impulsado por la comunidad que honra la naturaleza y el patrimonio maya'
      },
      scroll: {
        en: 'Scroll to explore',
        es: 'Desplázate para explorar'
      }
    },
    story: {
      title: {
        en: 'Our Story: A Community Cooperative',
        es: 'Nuestra Historia: Una Cooperativa Comunitaria'
      },
      paragraphs: [
        {
          en: 'Baalam Nah - Casa del Jaguar was born from a vision shared by local families who have called this jungle home for generations. In 2018, twelve families from the surrounding communities came together to create something unprecedented: an eco-retreat that would preserve our ancestral lands while providing sustainable livelihoods for our people.',
          es: 'Baalam Nah - Casa del Jaguar nació de una visión compartida por familias locales que han llamado hogar a esta selva durante generaciones. En 2018, doce familias de las comunidades circundantes se unieron para crear algo sin precedentes: un retiro ecológico que preservaría nuestras tierras ancestrales mientras proporcionaba medios de vida sostenibles para nuestra gente.'
        },
        {
          en: 'Our cooperative model ensures that every decision is made collectively, with profits reinvested directly into community development, education, and conservation efforts. We are not just employees—we are owners, guardians, and storytellers of this sacred land.',
          es: 'Nuestro modelo cooperativo asegura que cada decisión se tome colectivamente, con ganancias reinvertidas directamente en desarrollo comunitario, educación y esfuerzos de conservación. No somos solo empleados—somos propietarios, guardianes y narradores de esta tierra sagrada.'
        },
        {
          en: 'Every cabin you stay in, every meal you enjoy, and every trail you walk supports local artisans, farmers, and guides. Our guests become part of a larger movement—one that proves sustainable tourism can protect both culture and nature while empowering indigenous communities.',
          es: 'Cada cabaña en la que te hospedas, cada comida que disfrutas y cada sendero que recorres apoya a artesanos, agricultores y guías locales. Nuestros huéspedes se convierten en parte de un movimiento más grande—uno que demuestra que el turismo sostenible puede proteger tanto la cultura como la naturaleza mientras empodera a las comunidades indígenas.'
        },
        {
          en: 'We invite you to experience the jungle not as tourists, but as honored guests in our home—a home we are committed to protecting for the next seven generations.',
          es: 'Te invitamos a experimentar la selva no como turistas, sino como huéspedes honrados en nuestro hogar—un hogar que estamos comprometidos a proteger para las próximas siete generaciones.'
        }
      ]
    },
    sustainability: {
      title: {
        en: 'Our Commitment to the Planet',
        es: 'Nuestro Compromiso con el Planeta'
      },
      items: [
        {
          icon: Sun,
          title: {
            en: 'Solar Energy',
            es: 'Energía Solar'
          },
          description: {
            en: 'All cabins and facilities are powered by 100% renewable solar energy. Our solar panel array generates enough electricity to meet all operational needs while maintaining zero carbon emissions.',
            es: 'Todas las cabañas e instalaciones funcionan con energía solar 100% renovable. Nuestro conjunto de paneles solares genera suficiente electricidad para satisfacer todas las necesidades operativas manteniendo cero emisiones de carbono.'
          }
        },
        {
          icon: Droplets,
          title: {
            en: 'Rainwater Collection',
            es: 'Recolección de Agua de Lluvia'
          },
          description: {
            en: 'We harvest and filter rainwater for all non-drinking purposes, reducing our impact on local aquifers. Our natural filtration system uses local materials and traditional knowledge passed down through generations.',
            es: 'Recolectamos y filtramos agua de lluvia para todos los usos no potables, reduciendo nuestro impacto en los acuíferos locales. Nuestro sistema de filtración natural utiliza materiales locales y conocimientos tradicionales transmitidos a través de generaciones.'
          }
        },
        {
          icon: Users,
          title: {
            en: 'Local Hiring & Community Support',
            es: 'Contratación Local y Apoyo Comunitario'
          },
          description: {
            en: '100% of our staff are from surrounding communities. We provide fair wages, professional training, and educational scholarships for employees\' children. A portion of all profits funds local schools and healthcare initiatives.',
            es: 'El 100% de nuestro personal proviene de comunidades circundantes. Proporcionamos salarios justos, capacitación profesional y becas educativas para los hijos de los empleados. Una parte de todas las ganancias financia escuelas locales e iniciativas de salud.'
          }
        }
      ]
    },
    team: {
      title: {
        en: 'Meet Our Team',
        es: 'Conoce a Nuestro Equipo'
      },
      members: [
        {
          name: 'Carlos Ek',
          role: {
            en: 'Co-Founder & Community Liaison',
            es: 'Cofundador y Enlace Comunitario'
          },
          description: {
            en: 'Born and raised in the nearby village, Carlos leads our community partnerships and ensures our cooperative values guide every decision.',
            es: 'Nacido y criado en el pueblo cercano, Carlos lidera nuestras asociaciones comunitarias y asegura que nuestros valores cooperativos guíen cada decisión.'
          },
          image: 'https://images.unsplash.com/photo-1518014853363-ec08368624a9'
        },
        {
          name: 'María Canul',
          role: {
            en: 'Co-Founder & Operations Director',
            es: 'Cofundadora y Directora de Operaciones'
          },
          description: {
            en: 'With 15 years in sustainable tourism, María oversees daily operations and guest experiences while maintaining our eco-friendly standards.',
            es: 'Con 15 años en turismo sostenible, María supervisa las operaciones diarias y las experiencias de los huéspedes mientras mantiene nuestros estándares ecológicos.'
          },
          image: 'https://images.unsplash.com/photo-1498661694102-0a3793edbe74'
        },
        {
          name: 'Jorge Poot',
          role: {
            en: 'Lead Jungle Guide',
            es: 'Guía Principal de Selva'
          },
          description: {
            en: 'Jorge has explored these trails since childhood. His deep knowledge of local flora, fauna, and Mayan history brings the jungle to life for our guests.',
            es: 'Jorge ha explorado estos senderos desde la infancia. Su profundo conocimiento de la flora, fauna e historia maya local da vida a la selva para nuestros huéspedes.'
          },
          image: 'https://images.unsplash.com/photo-1681745207022-51332f176844'
        },
        {
          name: 'Ana Tun',
          role: {
            en: 'Wildlife & Bird Watching Guide',
            es: 'Guía de Vida Silvestre y Observación de Aves'
          },
          description: {
            en: 'A certified ornithologist, Ana leads our bird watching tours and contributes to regional conservation research projects.',
            es: 'Ornitóloga certificada, Ana lidera nuestros tours de observación de aves y contribuye a proyectos de investigación de conservación regional.'
          },
          image: 'https://images.unsplash.com/photo-1554983838-4ef22c52734f'
        },
        {
          name: 'Pedro May',
          role: {
            en: 'Cultural Heritage Guide',
            es: 'Guía de Patrimonio Cultural'
          },
          description: {
            en: 'Pedro shares traditional Mayan knowledge, from medicinal plants to ancient stories, connecting guests with the living culture of our ancestors.',
            es: 'Pedro comparte conocimientos mayas tradicionales, desde plantas medicinales hasta historias antiguas, conectando a los huéspedes con la cultura viva de nuestros ancestros.'
          },
          image: 'https://images.unsplash.com/photo-1595426319841-ecd3f9f03bd0'
        },
        {
          name: 'Rosa Caamal',
          role: {
            en: 'Executive Chef',
            es: 'Chef Ejecutiva'
          },
          description: {
            en: 'Rosa creates authentic regional cuisine using traditional recipes and ingredients sourced from local farmers and our own organic garden.',
            es: 'Rosa crea auténtica cocina regional utilizando recetas tradicionales e ingredientes de agricultores locales y nuestro propio huerto orgánico.'
          },
          image: 'https://images.unsplash.com/photo-1694153015230-ece1ad4c18cb'
        },
        {
          name: 'Luis Chuc',
          role: {
            en: 'Sustainability Officer',
            es: 'Oficial de Sostenibilidad'
          },
          description: {
            en: 'Luis monitors our environmental impact, manages our solar systems, and develops new conservation initiatives for the cooperative.',
            es: 'Luis monitorea nuestro impacto ambiental, gestiona nuestros sistemas solares y desarrolla nuevas iniciativas de conservación para la cooperativa.'
          },
          image: 'https://images.unsplash.com/photo-1493882552576-fce827c6161e'
        },
        {
          name: 'Elena Dzul',
          role: {
            en: 'Cultural Liaison & Education Coordinator',
            es: 'Enlace Cultural y Coordinadora de Educación'
          },
          description: {
            en: 'Elena bridges our retreat with local Mayan communities, organizing cultural workshops and educational programs for both guests and local youth.',
            es: 'Elena conecta nuestro retiro con las comunidades mayas locales, organizando talleres culturales y programas educativos tanto para huéspedes como para jóvenes locales.'
          },
          image: 'https://images.unsplash.com/photo-1672083632077-be94fc302f58'
        }
      ]
    },
    heritage: {
      title: {
        en: 'Honoring Mayan Heritage',
        es: 'Honrando el Patrimonio Maya'
      },
      paragraphs: [
        {
          en: 'This land has been home to the Maya for over three millennia. The ancient ruins scattered throughout our region stand as testament to a sophisticated civilization that understood sustainable living long before it became a modern concept. Our ancestors built cities in harmony with the jungle, developed advanced agricultural systems, and created a rich cultural legacy that continues to thrive today.',
          es: 'Esta tierra ha sido hogar de los mayas durante más de tres milenios. Las ruinas antiguas dispersas por nuestra región son testimonio de una civilización sofisticada que entendió la vida sostenible mucho antes de que se convirtiera en un concepto moderno. Nuestros ancestros construyeron ciudades en armonía con la selva, desarrollaron sistemas agrícolas avanzados y crearon un rico legado cultural que continúa prosperando hoy.'
        },
        {
          en: 'At Baalam Nah, we work closely with local Mayan communities to ensure our operations respect and celebrate indigenous traditions. We partner with community elders who share traditional knowledge, artisans who teach ancient crafts, and storytellers who keep our oral histories alive. A portion of our revenue directly supports Mayan language preservation programs and cultural education initiatives.',
          es: 'En Baalam Nah, trabajamos estrechamente con comunidades mayas locales para asegurar que nuestras operaciones respeten y celebren las tradiciones indígenas. Nos asociamos con ancianos comunitarios que comparten conocimientos tradicionales, artesanos que enseñan oficios antiguos y narradores que mantienen vivas nuestras historias orales. Una parte de nuestros ingresos apoya directamente programas de preservación del idioma maya e iniciativas de educación cultural.'
        },
        {
          en: 'We invite our guests to engage authentically with living Mayan culture—not as spectators, but as respectful learners. Through workshops, ceremonies, and conversations, you will discover that Mayan heritage is not a relic of the past, but a vibrant, evolving tradition that continues to shape our community today.',
          es: 'Invitamos a nuestros huéspedes a interactuar auténticamente con la cultura maya viva—no como espectadores, sino como aprendices respetuosos. A través de talleres, ceremonias y conversaciones, descubrirás que el patrimonio maya no es una reliquia del pasado, sino una tradición vibrante y en evolución que continúa dando forma a nuestra comunidad hoy.'
        }
      ]
    },
    quote: {
      text: {
        en: 'We do not inherit the earth from our ancestors; we borrow it from our children. Every tree we protect, every tradition we preserve, and every guest we welcome is an investment in a future where nature and culture thrive together.',
        es: 'No heredamos la tierra de nuestros ancestros; la tomamos prestada de nuestros hijos. Cada árbol que protegemos, cada tradición que preservamos y cada huésped que recibimos es una inversión en un futuro donde la naturaleza y la cultura prosperan juntas.'
      },
      author: {
        en: 'Carlos Ek, Co-Founder',
        es: 'Carlos Ek, Cofundador'
      }
    },
    newsletter: {
      title: {
        en: 'Join Our Mission',
        es: 'Únete a Nuestra Misión'
      },
      description: {
        en: 'Stay updated on conservation efforts, special events, and exclusive offers',
        es: 'Mantente actualizado sobre esfuerzos de conservación, eventos especiales y ofertas exclusivas'
      },
      emailLabel: {
        en: 'Email Address',
        es: 'Correo Electrónico'
      },
      emailPlaceholder: {
        en: 'your@email.com',
        es: 'tu@correo.com'
      },
      nameLabel: {
        en: 'Name (Optional)',
        es: 'Nombre (Opcional)'
      },
      namePlaceholder: {
        en: 'Your name',
        es: 'Tu nombre'
      },
      submit: {
        en: 'Subscribe',
        es: 'Suscribirse'
      },
      submitting: {
        en: 'Subscribing...',
        es: 'Suscribiendo...'
      },
      success: {
        title: {
          en: 'Successfully subscribed',
          es: 'Suscripción exitosa'
        },
        message: {
          en: 'Thank you for joining our mission',
          es: 'Gracias por unirte a nuestra misión'
        }
      },
      error: {
        title: {
          en: 'Subscription failed',
          es: 'Error en la suscripción'
        },
        message: {
          en: 'Please try again',
          es: 'Por favor intenta de nuevo'
        }
      },
      invalidEmail: {
        en: 'Please enter a valid email address',
        es: 'Por favor ingresa un correo electrónico válido'
      }
    }
  };
  
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: t(content.newsletter.invalidEmail),
        variant: 'destructive'
      });
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: t(content.newsletter.invalidEmail),
        variant: 'destructive'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await pb.collection('newsletter_subscribers').create({
        email: email.trim(),
        name: name.trim() || ''
      }, { $autoCancel: false });
      
      toast({
        title: t(content.newsletter.success.title),
        description: t(content.newsletter.success.message)
      });
      
      setEmail('');
      setName('');
      
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: t(content.newsletter.error.title),
        description: t(content.newsletter.error.message),
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>{t(content.meta.title)}</title>
        <meta name="description" content={t(content.meta.description)} />
      </Helmet>
      
      <main className="min-h-screen">
        <section 
          className="relative min-h-screen flex items-center justify-center text-white"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1682074480263-61820a796469)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                {t(content.hero.title)}
              </h1>
              <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto opacity-90">
                {t(content.hero.subtitle)}
              </p>
            </motion.div>
          </div>
          
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-sm opacity-80">{t(content.hero.scroll)}</span>
              <ChevronDown className="h-6 w-6" />
            </div>
          </motion.div>
        </section>
        
        <section className="py-20 md:py-24" style={{ backgroundColor: 'hsl(var(--cream))' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative">
                <div 
                  className="absolute -left-4 top-0 w-1 h-full rounded-full"
                  style={{ backgroundColor: 'hsl(var(--jaguar-gold))' }}
                />
                <h2 
                  className="text-3xl md:text-4xl font-bold mb-8"
                  style={{ color: 'hsl(var(--jungle-green))' }}
                >
                  {t(content.story.title)}
                </h2>
              </div>
              
              <div className="space-y-6" style={{ color: 'hsl(var(--jungle-green))' }}>
                {content.story.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed">
                    {t(paragraph)}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        <section className="py-20 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 
                className="text-3xl md:text-4xl font-bold mb-12 text-center"
                style={{ color: 'hsl(var(--jungle-green))' }}
              >
                {t(content.sustainability.title)}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {content.sustainability.items.map((item, index) => {
                  const Icon = item.icon;
                  const cardStyles = [
                    'shadow-lg border-2 border-primary/20 hover:shadow-xl transition-all duration-300',
                    'bg-muted/50 hover:bg-muted/70 border-0 transition-all duration-300',
                    'shadow-md hover:shadow-lg border transition-all duration-300 hover:-translate-y-1'
                  ];
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className={`h-full ${cardStyles[index]}`}>
                        <CardHeader>
                          <div 
                            className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                            style={{ backgroundColor: 'hsl(var(--jungle-green))' }}
                          >
                            <Icon className="h-7 w-7" style={{ color: 'hsl(var(--cream))' }} />
                          </div>
                          <CardTitle className="text-xl font-semibold" style={{ color: 'hsl(var(--jungle-green))' }}>
                            {t(item.title)}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base leading-relaxed">
                            {t(item.description)}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>
        
        <section className="py-20 md:py-24" style={{ backgroundColor: 'hsl(var(--cream))' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 
                className="text-3xl md:text-4xl font-bold mb-12 text-center"
                style={{ color: 'hsl(var(--jungle-green))' }}
              >
                {t(content.team.title)}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {content.team.members.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group"
                  >
                    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full">
                      <div className="relative overflow-hidden">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <p className="text-white text-sm leading-relaxed">
                            {t(member.description)}
                          </p>
                        </div>
                      </div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-semibold" style={{ color: 'hsl(var(--jungle-green))' }}>
                          {member.name}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {t(member.role)}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        <section 
          className="py-20 md:py-24 relative overflow-hidden"
          style={{ backgroundColor: 'hsl(var(--terracotta))' }}
        >
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, hsl(var(--cream)) 35px, hsl(var(--cream)) 70px)',
            }}
          />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h2 
                className="text-3xl md:text-4xl font-bold mb-8"
                style={{ color: 'hsl(var(--cream))' }}
              >
                {t(content.heritage.title)}
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 items-center mb-8">
                <div className="md:col-span-2 space-y-6" style={{ color: 'hsl(var(--cream))' }}>
                  {content.heritage.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-lg leading-relaxed">
                      {t(paragraph)}
                    </p>
                  ))}
                </div>
                
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1682688669745-82d13e28270e" 
                    alt="Mayan temple"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        <section className="py-20 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <Card 
                className="border-l-4 shadow-lg"
                style={{ borderLeftColor: 'hsl(var(--jaguar-gold))' }}
              >
                <CardContent className="p-8 md:p-12">
                  <blockquote className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-6" style={{ color: 'hsl(var(--jungle-green))' }}>
                    "{t(content.quote.text)}"
                  </blockquote>
                  <p className="text-lg font-medium" style={{ color: 'hsl(var(--terracotta))' }}>
                    — {t(content.quote.author)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
        
        <section 
          className="py-20 md:py-24"
          style={{ backgroundColor: 'hsl(var(--jungle-green))' }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: 'hsl(var(--cream))' }}
              >
                {t(content.newsletter.title)}
              </h2>
              <p className="text-lg mb-8 opacity-90" style={{ color: 'hsl(var(--cream))' }}>
                {t(content.newsletter.description)}
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="space-y-2 text-left">
                  <Label htmlFor="newsletter-email" style={{ color: 'hsl(var(--cream))' }}>
                    {t(content.newsletter.emailLabel)} *
                  </Label>
                  <Input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t(content.newsletter.emailPlaceholder)}
                    required
                    style={{ 
                      backgroundColor: 'hsl(var(--cream))',
                      borderColor: 'hsl(var(--jaguar-gold))',
                      color: 'hsl(var(--jungle-green))'
                    }}
                    className="text-gray-900"
                  />
                </div>
                
                <div className="space-y-2 text-left">
                  <Label htmlFor="newsletter-name" style={{ color: 'hsl(var(--cream))' }}>
                    {t(content.newsletter.nameLabel)}
                  </Label>
                  <Input
                    id="newsletter-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t(content.newsletter.namePlaceholder)}
                    style={{ 
                      backgroundColor: 'hsl(var(--cream))',
                      borderColor: 'hsl(var(--jaguar-gold))',
                      color: 'hsl(var(--jungle-green))'
                    }}
                    className="text-gray-900"
                  />
                </div>
                
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full transition-all duration-200 active:scale-[0.98]"
                  style={{ 
                    backgroundColor: 'hsl(var(--jaguar-gold))',
                    color: 'hsl(var(--jungle-green))'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {t(content.newsletter.submitting)}
                    </>
                  ) : (
                    t(content.newsletter.submit)
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
