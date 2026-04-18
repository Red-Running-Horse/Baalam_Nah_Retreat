
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Mail, Phone, Clock, MessageCircle, Facebook, Loader2, Navigation, MapPin as MapIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import pb from '@/lib/pocketbaseClient';

const ContactPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const content = {
    meta: {
      title: {
        en: 'Contact Us - Baalam Nah Casa del Jaguar',
        es: 'Contáctanos - Baalam Nah Casa del Jaguar'
      },
      description: {
        en: 'Get in touch with Baalam Nah eco-retreat. Contact us to plan your jungle escape in the heart of the Mayan jungle.',
        es: 'Ponte en contacto con el retiro ecológico Baalam Nah. Contáctanos para planificar tu escape a la selva en el corazón de la jungla maya.'
      }
    },
    hero: {
      title: {
        en: 'Get in Touch',
        es: 'Ponte en Contacto'
      },
      subtitle: {
        en: "We'd love to hear from you. Contact us to plan your jungle escape.",
        es: 'Nos encantaría saber de ti. Contáctanos para planificar tu escape a la jungla.'
      }
    },
    form: {
      title: {
        en: 'Send us a Message',
        es: 'Envíanos un Mensaje'
      },
      fullName: {
        label: { en: 'Full Name', es: 'Nombre Completo' },
        placeholder: { en: 'Your Name', es: 'Tu Nombre' }
      },
      email: {
        label: { en: 'Email Address', es: 'Correo Electrónico' },
        placeholder: { en: 'your@email.com', es: 'tu@correo.com' }
      },
      subject: {
        label: { en: 'Subject', es: 'Asunto' },
        placeholder: { en: 'Message Subject', es: 'Asunto del Mensaje' }
      },
      message: {
        label: { en: 'Message', es: 'Mensaje' },
        placeholder: { en: 'Your message here...', es: 'Tu mensaje aquí...' }
      },
      submit: { en: 'Send Message', es: 'Enviar Mensaje' },
      submitting: { en: 'Sending...', es: 'Enviando...' },
      success: {
        title: { en: 'Message sent', es: 'Mensaje enviado' },
        message: { en: "Thank you! We'll get back to you soon.", es: 'Gracias! Nos pondremos en contacto pronto.' }
      },
      error: {
        title: { en: 'Failed to send', es: 'Error al enviar' },
        message: { en: 'Please try again.', es: 'Por favor intenta de nuevo.' }
      },
      validation: {
        required: { en: 'Please fill in all required fields', es: 'Por favor completa todos los campos requeridos' },
        invalidEmail: { en: 'Please enter a valid email address', es: 'Por favor ingresa un correo electrónico válido' }
      }
    },
    info: {
      title: {
        en: 'Contact Information',
        es: 'Información de Contacto'
      },
      address: {
        title: { en: 'Address', es: 'Dirección' },
        value: 'Baalam Nah - Casa del Jaguar, Felipe Carrillo Puerto, Quintana Roo, Mexico'
      },
      email: {
        title: { en: 'Email', es: 'Correo Electrónico' },
        value: 'info@baalamnah.com'
      },
      phone: {
        title: { en: 'Phone', es: 'Teléfono' },
        value: '+52 983 123 4567'
      },
      hours: {
        title: { en: 'Business Hours', es: 'Horario de Atención' },
        weekdays: { en: 'Monday - Friday: 8:00 AM - 6:00 PM', es: 'Lunes - Viernes: 8:00 AM - 6:00 PM' },
        weekends: { en: 'Saturday - Sunday: 9:00 AM - 5:00 PM', es: 'Sábado - Domingo: 9:00 AM - 5:00 PM' },
        emergency: { en: 'Available for emergencies 24/7', es: 'Disponible para emergencias 24/7' }
      },
      whatsapp: {
        text: { en: 'Chat on WhatsApp', es: 'Chat en WhatsApp' }
      },
      facebook: {
        text: { en: 'Follow us on Facebook', es: 'Síguenos en Facebook' }
      }
    },
    map: {
      title: {
        en: 'Find Us',
        es: 'Encuéntranos'
      },
      fallback: {
        en: "If the map doesn't load, please contact us directly.",
        es: 'Si el mapa no carga, contáctanos directamente.'
      },
      openMap: {
        en: 'Click to open full map',
        es: 'Haz clic para abrir el mapa completo'
      }
    },
    directions: {
      title: {
        en: 'How to Get Here',
        es: 'Cómo Llegar'
      },
      fromCancun: {
        title: { en: 'From Cancun', es: 'Desde Cancún' },
        distance: { en: 'Approximately 250 km (155 miles)', es: 'Aproximadamente 250 km (155 millas)' },
        time: { en: 'About 3.5 - 4 hours', es: 'Aproximadamente 3.5 - 4 horas' },
        directions: {
          en: 'Take Highway 307 south from Cancun toward Tulum. Continue south past Tulum toward Felipe Carrillo Puerto. Follow signs to the town center. Our retreat is located in the heart of the Mayan jungle, about 15 minutes from town.',
          es: 'Toma la Carretera 307 sur desde Cancún hacia Tulum. Continúa hacia el sur pasando Tulum hacia Felipe Carrillo Puerto. Sigue las señales hacia el centro del pueblo. Nuestro retiro está ubicado en el corazón de la jungla maya, a unos 15 minutos del pueblo.'
        },
        tips: {
          en: 'Rent a car or arrange a private transfer. Road is well-maintained.',
          es: 'Renta un auto o arregla un traslado privado. La carretera está en buen estado.'
        }
      },
      fromPlayaDelCarmen: {
        title: { en: 'From Playa del Carmen', es: 'Desde Playa del Carmen' },
        distance: { en: 'Approximately 180 km (112 miles)', es: 'Aproximadamente 180 km (112 millas)' },
        time: { en: 'About 2.5 - 3 hours', es: 'Aproximadamente 2.5 - 3 horas' },
        directions: {
          en: 'Take Highway 307 south from Playa del Carmen. Continue toward Tulum and then south to Felipe Carrillo Puerto. Follow local signs to the retreat.',
          es: 'Toma la Carretera 307 sur desde Playa del Carmen. Continúa hacia Tulum y luego hacia el sur a Felipe Carrillo Puerto. Sigue las señales locales hacia el retiro.'
        },
        tips: {
          en: 'Highway 307 is the main route. Consider hiring a driver for comfort.',
          es: 'La Carretera 307 es la ruta principal. Considera contratar un conductor para mayor comodidad.'
        }
      }
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!fullName.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      toast({
        title: t(content.form.validation.required),
        variant: 'destructive'
      });
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: t(content.form.validation.invalidEmail),
        variant: 'destructive'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await pb.collection('contact_messages').create({
        fullName: fullName.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim()
      }, { $autoCancel: false });
      
      toast({
        title: t(content.form.success.title),
        description: t(content.form.success.message)
      });
      
      setFullName('');
      setEmail('');
      setSubject('');
      setMessage('');
      
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({
        title: t(content.form.error.title),
        description: t(content.form.error.message),
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
          className="py-20 md:py-24 text-white"
          style={{
            backgroundImage: 'linear-gradient(rgba(45, 80, 22, 0.85), rgba(45, 80, 22, 0.85)), url(https://images.unsplash.com/photo-1642939522738-289ec8fb1bcb)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: 'hsl(var(--jungle-green))'
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{ letterSpacing: '-0.02em', color: 'hsl(var(--cream))' }}
              >
                {t(content.hero.title)}
              </h1>
              <p className="text-xl md:text-2xl leading-relaxed" style={{ color: 'hsl(var(--cream))' }}>
                {t(content.hero.subtitle)}
              </p>
            </motion.div>
          </div>
        </section>
        
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="shadow-lg" style={{ backgroundColor: 'hsl(var(--cream))' }}>
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold" style={{ color: 'hsl(var(--jungle-green))' }}>
                      {t(content.form.title)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" style={{ color: 'hsl(var(--jungle-green))' }}>
                          {t(content.form.fullName.label)} *
                        </Label>
                        <Input
                          id="fullName"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder={t(content.form.fullName.placeholder)}
                          required
                          style={{ 
                            backgroundColor: 'white',
                            borderColor: 'hsl(var(--jungle-green))',
                            color: 'hsl(var(--jungle-green))'
                          }}
                          className="text-gray-900"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" style={{ color: 'hsl(var(--jungle-green))' }}>
                          {t(content.form.email.label)} *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t(content.form.email.placeholder)}
                          required
                          style={{ 
                            backgroundColor: 'white',
                            borderColor: 'hsl(var(--jungle-green))',
                            color: 'hsl(var(--jungle-green))'
                          }}
                          className="text-gray-900"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject" style={{ color: 'hsl(var(--jungle-green))' }}>
                          {t(content.form.subject.label)} *
                        </Label>
                        <Input
                          id="subject"
                          type="text"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder={t(content.form.subject.placeholder)}
                          required
                          style={{ 
                            backgroundColor: 'white',
                            borderColor: 'hsl(var(--jungle-green))',
                            color: 'hsl(var(--jungle-green))'
                          }}
                          className="text-gray-900"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message" style={{ color: 'hsl(var(--jungle-green))' }}>
                          {t(content.form.message.label)} *
                        </Label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder={t(content.form.message.placeholder)}
                          rows={6}
                          required
                          style={{ 
                            backgroundColor: 'white',
                            borderColor: 'hsl(var(--jungle-green))',
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
                            {t(content.form.submitting)}
                          </>
                        ) : (
                          t(content.form.submit)
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h2 
                  className="text-3xl font-bold mb-6"
                  style={{ color: 'hsl(var(--jungle-green))' }}
                >
                  {t(content.info.title)}
                </h2>
                
                <Card className="shadow-md" style={{ backgroundColor: 'hsl(var(--cream))' }}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'hsl(var(--jungle-green))' }}
                      >
                        <MapPin className="h-6 w-6" style={{ color: 'hsl(var(--cream))' }} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2" style={{ color: 'hsl(var(--jungle-green))' }}>
                          {t(content.info.address.title)}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--jungle-green))' }}>
                          {content.info.address.value}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-md" style={{ backgroundColor: 'hsl(var(--cream))' }}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'hsl(var(--jungle-green))' }}
                      >
                        <Mail className="h-6 w-6" style={{ color: 'hsl(var(--cream))' }} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2" style={{ color: 'hsl(var(--jungle-green))' }}>
                          {t(content.info.email.title)}
                        </h3>
                        <a 
                          href={`mailto:${content.info.email.value}`}
                          className="text-sm hover:underline transition-all duration-200"
                          style={{ color: 'hsl(var(--terracotta))' }}
                        >
                          {content.info.email.value}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-md" style={{ backgroundColor: 'hsl(var(--cream))' }}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'hsl(var(--jungle-green))' }}
                      >
                        <Phone className="h-6 w-6" style={{ color: 'hsl(var(--cream))' }} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2" style={{ color: 'hsl(var(--jungle-green))' }}>
                          {t(content.info.phone.title)}
                        </h3>
                        <a 
                          href={`tel:${content.info.phone.value.replace(/\s/g, '')}`}
                          className="text-sm hover:underline transition-all duration-200"
                          style={{ color: 'hsl(var(--terracotta))' }}
                        >
                          {content.info.phone.value}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-md" style={{ backgroundColor: 'hsl(var(--cream))' }}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'hsl(var(--jungle-green))' }}
                      >
                        <Clock className="h-6 w-6" style={{ color: 'hsl(var(--cream))' }} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2" style={{ color: 'hsl(var(--jungle-green))' }}>
                          {t(content.info.hours.title)}
                        </h3>
                        <div className="space-y-1 text-sm" style={{ color: 'hsl(var(--jungle-green))' }}>
                          <p>{t(content.info.hours.weekdays)}</p>
                          <p>{t(content.info.hours.weekends)}</p>
                          <p className="text-xs opacity-80 mt-2">{t(content.info.hours.emergency)}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="flex-1 transition-all duration-200 active:scale-[0.98]"
                    style={{ backgroundColor: '#25D366', color: 'white' }}
                  >
                    <a 
                      href="https://wa.me/52983123456" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      {t(content.info.whatsapp.text)}
                    </a>
                  </Button>
                  
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="flex-1 transition-all duration-200 active:scale-[0.98]"
                    style={{ 
                      borderColor: 'hsl(var(--jungle-green))',
                      color: 'hsl(var(--jungle-green))'
                    }}
                  >
                    <a 
                      href="https://facebook.com/EcoBalamNah" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <Facebook className="mr-2 h-5 w-5" />
                      {t(content.info.facebook.text)}
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-20" style={{ backgroundColor: 'hsl(var(--cream))' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 
                className="text-3xl md:text-4xl font-bold mb-8 text-center"
                style={{ color: 'hsl(var(--jungle-green))' }}
              >
                {t(content.map.title)}
              </h2>
              
              <div className="max-w-5xl mx-auto">
                <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: '16/9' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119073.89842896!2d-87.76!3d19.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f5ba3e7e1e1e1e1%3A0x1e1e1e1e1e1e1e1e!2sFelipe%20Carrillo%20Puerto%2C%20Quintana%20Roo%2C%20Mexico!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Baalam Nah Location"
                  />
                </div>
                <p className="text-center text-sm mt-4 opacity-80" style={{ color: 'hsl(var(--jungle-green))' }}>
                  {t(content.map.openMap)}
                </p>
                <p className="text-center text-xs mt-2 opacity-60" style={{ color: 'hsl(var(--jungle-green))' }}>
                  {t(content.map.fallback)}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
        
        <section className="py-16 md:py-20 bg-background">
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
                {t(content.directions.title)}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <Card className="shadow-lg" style={{ backgroundColor: 'hsl(var(--cream))' }}>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold flex items-center" style={{ color: 'hsl(var(--jungle-green))' }}>
                      <Navigation className="mr-2 h-5 w-5" />
                      {t(content.directions.fromCancun.title)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4" style={{ color: 'hsl(var(--jungle-green))' }}>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapIcon className="h-4 w-4 flex-shrink-0" style={{ color: 'hsl(var(--terracotta))' }} />
                      <span>{t(content.directions.fromCancun.distance)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 flex-shrink-0" style={{ color: 'hsl(var(--terracotta))' }} />
                      <span>{t(content.directions.fromCancun.time)}</span>
                    </div>
                    
                    <div className="pt-2 border-t" style={{ borderColor: 'hsl(var(--jungle-green) / 0.2)' }}>
                      <p className="text-sm leading-relaxed mb-3">
                        {t(content.directions.fromCancun.directions)}
                      </p>
                      <p className="text-xs opacity-80 italic">
                        💡 {t(content.directions.fromCancun.tips)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-lg" style={{ backgroundColor: 'hsl(var(--cream))' }}>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold flex items-center" style={{ color: 'hsl(var(--jungle-green))' }}>
                      <Navigation className="mr-2 h-5 w-5" />
                      {t(content.directions.fromPlayaDelCarmen.title)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4" style={{ color: 'hsl(var(--jungle-green))' }}>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapIcon className="h-4 w-4 flex-shrink-0" style={{ color: 'hsl(var(--terracotta))' }} />
                      <span>{t(content.directions.fromPlayaDelCarmen.distance)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 flex-shrink-0" style={{ color: 'hsl(var(--terracotta))' }} />
                      <span>{t(content.directions.fromPlayaDelCarmen.time)}</span>
                    </div>
                    
                    <div className="pt-2 border-t" style={{ borderColor: 'hsl(var(--jungle-green) / 0.2)' }}>
                      <p className="text-sm leading-relaxed mb-3">
                        {t(content.directions.fromPlayaDelCarmen.directions)}
                      </p>
                      <p className="text-xs opacity-80 italic">
                        💡 {t(content.directions.fromPlayaDelCarmen.tips)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactPage;
