
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Users, Loader2, Menu } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import pb from '@/lib/pocketbaseClient';

const BookingPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [checkInDate, setCheckInDate] = useState(undefined);
  const [checkOutDate, setCheckOutDate] = useState(undefined);
  const [selectedCabin, setSelectedCabin] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [howHeardAboutUs, setHowHeardAboutUs] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const content = {
    meta: {
      title: {
        en: 'Book Your Stay - Baalam Nah Casa del Jaguar',
        es: 'Reserva tu Estadía - Baalam Nah Casa del Jaguar'
      },
      description: {
        en: 'Book your eco-friendly jungle retreat at Baalam Nah. Reserve your cabin in the heart of the Mayan jungle.',
        es: 'Reserva tu retiro ecológico en la selva en Baalam Nah. Reserva tu cabaña en el corazón de la selva maya.'
      }
    },
    hero: {
      title: {
        en: 'Book Your Jungle Escape',
        es: 'Reserva tu Escape a la Selva'
      },
      subtitle: {
        en: 'Complete the form below to reserve your eco-cabin. We will confirm your reservation within 24 hours.',
        es: 'Completa el formulario a continuación para reservar tu cabaña ecológica. Confirmaremos tu reserva en 24 horas.'
      }
    },
    form: {
      dates: {
        title: { en: 'Select Dates', es: 'Seleccionar Fechas' },
        checkIn: { en: 'Check-in Date', es: 'Fecha de Entrada' },
        checkOut: { en: 'Check-out Date', es: 'Fecha de Salida' },
        selectDate: { en: 'Select date', es: 'Seleccionar fecha' },
        nights: { en: 'nights', es: 'noches' }
      },
      cabin: {
        title: { en: 'Choose Your Cabin', es: 'Elige tu Cabaña' },
        select: { en: 'Select a cabin', es: 'Seleccionar una cabaña' }
      },
      guests: {
        title: { en: 'Number of Guests', es: 'Número de Huéspedes' },
        adults: { en: 'Adults', es: 'Adultos' },
        children: { en: 'Children', es: 'Niños' },
        total: { en: 'Total Guests', es: 'Total de Huéspedes' }
      },
      contact: {
        title: { en: 'Contact Information', es: 'Información de Contacto' },
        fullName: { en: 'Full Name', es: 'Nombre Completo' },
        email: { en: 'Email Address', es: 'Correo Electrónico' },
        phone: { en: 'Phone Number', es: 'Número de Teléfono' },
        specialRequests: { en: 'Special Requests (Optional)', es: 'Solicitudes Especiales (Opcional)' },
        howHeard: { en: 'How did you hear about us?', es: '¿Cómo nos conociste?' }
      },
      howHeardOptions: {
        search: { en: 'Search Engine', es: 'Motor de Búsqueda' },
        social: { en: 'Social Media', es: 'Redes Sociales' },
        friend: { en: 'Friend/Family Recommendation', es: 'Recomendación de Amigo/Familia' },
        blog: { en: 'Travel Blog', es: 'Blog de Viajes' },
        other: { en: 'Other', es: 'Otro' }
      },
      deposit: {
        message: { en: 'A 50% deposit is required to confirm your reservation.', es: 'Se requiere un depósito del 50% para confirmar tu reserva.' }
      },
      submit: { en: 'Submit Reservation Request', es: 'Enviar Solicitud de Reserva' },
      submitting: { en: 'Submitting...', es: 'Enviando...' }
    },
    summary: {
      title: { en: 'Booking Summary', es: 'Resumen de Reserva' },
      checkIn: { en: 'Check-in', es: 'Entrada' },
      checkOut: { en: 'Check-out', es: 'Salida' },
      nights: { en: 'Nights', es: 'Noches' },
      cabin: { en: 'Cabin', es: 'Cabaña' },
      capacity: { en: 'Capacity', es: 'Capacidad' },
      guests: { en: 'guests', es: 'huéspedes' },
      nightlyRate: { en: 'Nightly Rate', es: 'Tarifa por Noche' },
      subtotal: { en: 'Subtotal', es: 'Subtotal' },
      deposit: { en: 'Deposit (50%)', es: 'Depósito (50%)' },
      totalDue: { en: 'Total Due', es: 'Total a Pagar' }
    },
    validation: {
      selectDates: { en: 'Please select check-in and check-out dates', es: 'Por favor selecciona fechas de entrada y salida' },
      selectCabin: { en: 'Please select a cabin', es: 'Por favor selecciona una cabaña' },
      exceedsCapacity: { en: 'Total guests exceeds cabin capacity', es: 'El total de huéspedes excede la capacidad de la cabaña' },
      fillRequired: { en: 'Please fill in all required fields', es: 'Por favor completa todos los campos requeridos' },
      invalidEmail: { en: 'Please enter a valid email address', es: 'Por favor ingresa un correo electrónico válido' }
    },
    success: {
      title: { en: 'Reservation submitted', es: 'Reserva enviada' },
      message: { en: 'We will confirm your reservation within 24 hours.', es: 'Confirmaremos tu reserva en 24 horas.' }
    },
    error: {
      title: { en: 'Submission failed', es: 'Error al enviar' },
      message: { en: 'Please try again.', es: 'Por favor intenta de nuevo.' }
    }
  };
  
  const cabins = [
    { 
      id: 'ixchel', 
      name: { en: 'Ixchel Cabin', es: 'Cabaña Ixchel' }, 
      capacity: 2, 
      rate: 89 
    },
    { 
      id: 'kukulkan', 
      name: { en: 'Kukulkan Suite', es: 'Suite Kukulkan' }, 
      capacity: 4, 
      rate: 147 
    },
    { 
      id: 'chaac', 
      name: { en: 'Chaac Family Cabin', es: 'Cabaña Familiar Chaac' }, 
      capacity: 6, 
      rate: 183 
    },
    { 
      id: 'yum-kaax', 
      name: { en: 'Yum Kaax Cabin', es: 'Cabaña Yum Kaax' }, 
      capacity: 3, 
      rate: 76 
    },
    { 
      id: 'ah-puch', 
      name: { en: 'Ah Puch Glamping', es: 'Glamping Ah Puch' }, 
      capacity: 2, 
      rate: 68 
    },
    { 
      id: 'ek-chuah', 
      name: { en: 'Ek Chuah Retreat', es: 'Retiro Ek Chuah' }, 
      capacity: 4, 
      rate: 134 
    }
  ];
  
  const getCabinData = () => {
    return cabins.find(c => c.id === selectedCabin);
  };
  
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const calculateSubtotal = () => {
    const cabin = getCabinData();
    if (!cabin) return 0;
    const nights = calculateNights();
    return nights * cabin.rate;
  };
  
  const calculateDeposit = () => {
    return calculateSubtotal() * 0.5;
  };
  
  const getTotalGuests = () => {
    return adults + children;
  };
  
  const isFormValid = () => {
    if (!checkInDate || !checkOutDate) return false;
    if (!selectedCabin) return false;
    if (!fullName.trim() || !email.trim() || !phone.trim()) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
    
    const cabin = getCabinData();
    if (cabin && getTotalGuests() > cabin.capacity) return false;
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast({
        title: t(content.validation.fillRequired),
        variant: 'destructive'
      });
      return;
    }
    
    const cabin = getCabinData();
    if (getTotalGuests() > cabin.capacity) {
      toast({
        title: t(content.validation.exceedsCapacity),
        variant: 'destructive'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const subtotal = calculateSubtotal();
      const deposit = calculateDeposit();
      
      const record = await pb.collection('reservations').create({
        checkInDate: format(checkInDate, 'yyyy-MM-dd'),
        checkOutDate: format(checkOutDate, 'yyyy-MM-dd'),
        cabinName: t(cabin.name),
        numberOfAdults: adults,
        numberOfChildren: children,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        specialRequests: specialRequests.trim() || '',
        howHeardAboutUs: howHeardAboutUs || '',
        subtotal: subtotal,
        depositAmount: deposit,
        totalAmount: subtotal
      }, { $autoCancel: false });
      
      toast({
        title: t(content.success.title),
        description: t(content.success.message)
      });
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      console.error('Reservation submission error:', error);
      toast({
        title: t(content.error.title),
        description: t(content.error.message),
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  useEffect(() => {
    if (checkInDate && checkOutDate && checkOutDate <= checkInDate) {
      setCheckOutDate(undefined);
    }
  }, [checkInDate, checkOutDate]);
  
  const SummaryContent = () => {
    const cabin = getCabinData();
    const nights = calculateNights();
    const subtotal = calculateSubtotal();
    const deposit = calculateDeposit();
    
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4" style={{ color: 'hsl(var(--jungle-green))' }}>
          {t(content.summary.title)}
        </h3>
        
        <div className="space-y-3 text-sm" style={{ color: 'hsl(var(--jungle-green))' }}>
          {checkInDate && (
            <div className="flex justify-between">
              <span className="font-medium">{t(content.summary.checkIn)}:</span>
              <span>{format(checkInDate, 'MMM dd, yyyy')}</span>
            </div>
          )}
          
          {checkOutDate && (
            <div className="flex justify-between">
              <span className="font-medium">{t(content.summary.checkOut)}:</span>
              <span>{format(checkOutDate, 'MMM dd, yyyy')}</span>
            </div>
          )}
          
          {nights > 0 && (
            <div className="flex justify-between">
              <span className="font-medium">{t(content.summary.nights)}:</span>
              <span>{nights}</span>
            </div>
          )}
          
          {cabin && (
            <>
              <div className="border-t pt-3" style={{ borderColor: 'hsl(var(--jungle-green) / 0.2)' }}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{t(content.summary.cabin)}:</span>
                  <span>{t(cabin.name)}</span>
                </div>
                <div className="flex justify-between text-xs opacity-80">
                  <span>{t(content.summary.capacity)}:</span>
                  <span>{cabin.capacity} {t(content.summary.guests)}</span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium">{t(content.summary.nightlyRate)}:</span>
                <span>${cabin.rate}</span>
              </div>
            </>
          )}
          
          {subtotal > 0 && (
            <>
              <div className="border-t pt-3" style={{ borderColor: 'hsl(var(--jungle-green) / 0.2)' }}>
                <div className="flex justify-between">
                  <span className="font-medium">{t(content.summary.subtotal)}:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium">{t(content.summary.deposit)}:</span>
                <span>${deposit.toFixed(2)}</span>
              </div>
              
              <div className="border-t pt-3 flex justify-between text-base font-bold" style={{ borderColor: 'hsl(var(--jungle-green) / 0.2)' }}>
                <span>{t(content.summary.totalDue)}:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };
  
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
            backgroundImage: 'linear-gradient(135deg, hsl(var(--jungle-green) / 0.85) 0%, hsl(var(--terracotta) / 0.85) 100%), url(https://images.unsplash.com/photo-1642939522738-289ec8fb1bcb)',
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
              className="text-center max-w-3xl mx-auto"
            >
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                {t(content.hero.title)}
              </h1>
              <p className="text-lg md:text-xl leading-relaxed opacity-90">
                {t(content.hero.subtitle)}
              </p>
            </motion.div>
          </div>
        </section>
        
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold" style={{ color: 'hsl(var(--jungle-green))' }}>
                        {t(content.form.dates.title)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="checkIn" style={{ color: 'hsl(var(--jungle-green))' }}>
                            {t(content.form.dates.checkIn)}
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id="checkIn"
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                                style={{ 
                                  backgroundColor: 'hsl(var(--cream))',
                                  borderColor: 'hsl(var(--jungle-green))',
                                  color: 'hsl(var(--jungle-green))'
                                }}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {checkInDate ? format(checkInDate, 'PPP') : t(content.form.dates.selectDate)}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={checkInDate}
                                onSelect={setCheckInDate}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="checkOut" style={{ color: 'hsl(var(--jungle-green))' }}>
                            {t(content.form.dates.checkOut)}
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id="checkOut"
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                                style={{ 
                                  backgroundColor: 'hsl(var(--cream))',
                                  borderColor: 'hsl(var(--jungle-green))',
                                  color: 'hsl(var(--jungle-green))'
                                }}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {checkOutDate ? format(checkOutDate, 'PPP') : t(content.form.dates.selectDate)}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={checkOutDate}
                                onSelect={setCheckOutDate}
                                disabled={(date) => date < new Date() || (checkInDate && date <= checkInDate)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      
                      {calculateNights() > 0 && (
                        <p className="text-sm font-medium" style={{ color: 'hsl(var(--jungle-green))' }}>
                          {calculateNights()} {t(content.form.dates.nights)}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold" style={{ color: 'hsl(var(--jungle-green))' }}>
                        {t(content.form.cabin.title)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select value={selectedCabin} onValueChange={setSelectedCabin}>
                        <SelectTrigger 
                          className="w-full"
                          style={{ 
                            backgroundColor: 'hsl(var(--cream))',
                            borderColor: 'hsl(var(--jungle-green))',
                            color: 'hsl(var(--jungle-green))'
                          }}
                        >
                          <SelectValue placeholder={t(content.form.cabin.select)} />
                        </SelectTrigger>
                        <SelectContent>
                          {cabins.map((cabin) => (
                            <SelectItem key={cabin.id} value={cabin.id}>
                              {t(cabin.name)} - {cabin.capacity} {t(content.summary.guests)} - ${cabin.rate}/{t(content.form.dates.nights).slice(0, -1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold" style={{ color: 'hsl(var(--jungle-green))' }}>
                        {t(content.form.guests.title)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="adults" style={{ color: 'hsl(var(--jungle-green))' }}>
                            {t(content.form.guests.adults)}
                          </Label>
                          <Input
                            id="adults"
                            type="number"
                            min="1"
                            max={getCabinData()?.capacity || 10}
                            value={adults}
                            onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                            style={{ 
                              backgroundColor: 'hsl(var(--cream))',
                              borderColor: 'hsl(var(--jungle-green))',
                              color: 'hsl(var(--jungle-green))'
                            }}
                            className="text-gray-900"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="children" style={{ color: 'hsl(var(--jungle-green))' }}>
                            {t(content.form.guests.children)}
                          </Label>
                          <Input
                            id="children"
                            type="number"
                            min="0"
                            max={getCabinData()?.capacity || 10}
                            value={children}
                            onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
                            style={{ 
                              backgroundColor: 'hsl(var(--cream))',
                              borderColor: 'hsl(var(--jungle-green))',
                              color: 'hsl(var(--jungle-green))'
                            }}
                            className="text-gray-900"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm font-medium" style={{ color: 'hsl(var(--jungle-green))' }}>
                        <Users className="h-4 w-4" />
                        <span>{t(content.form.guests.total)}: {getTotalGuests()}</span>
                        {getCabinData() && getTotalGuests() > getCabinData().capacity && (
                          <span className="text-destructive ml-2">
                            ({t(content.validation.exceedsCapacity)})
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold" style={{ color: 'hsl(var(--jungle-green))' }}>
                        {t(content.form.contact.title)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" style={{ color: 'hsl(var(--jungle-green))' }}>
                          {t(content.form.contact.fullName)} *
                        </Label>
                        <Input
                          id="fullName"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          style={{ 
                            backgroundColor: 'hsl(var(--cream))',
                            borderColor: 'hsl(var(--jungle-green))',
                            color: 'hsl(var(--jungle-green))'
                          }}
                          className="text-gray-900"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" style={{ color: 'hsl(var(--jungle-green))' }}>
                          {t(content.form.contact.email)} *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          style={{ 
                            backgroundColor: 'hsl(var(--cream))',
                            borderColor: 'hsl(var(--jungle-green))',
                            color: 'hsl(var(--jungle-green))'
                          }}
                          className="text-gray-900"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" style={{ color: 'hsl(var(--jungle-green))' }}>
                          {t(content.form.contact.phone)} *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          style={{ 
                            backgroundColor: 'hsl(var(--cream))',
                            borderColor: 'hsl(var(--jungle-green))',
                            color: 'hsl(var(--jungle-green))'
                          }}
                          className="text-gray-900"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="specialRequests" style={{ color: 'hsl(var(--jungle-green))' }}>
                          {t(content.form.contact.specialRequests)}
                        </Label>
                        <Textarea
                          id="specialRequests"
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          rows={4}
                          style={{ 
                            backgroundColor: 'hsl(var(--cream))',
                            borderColor: 'hsl(var(--jungle-green))',
                            color: 'hsl(var(--jungle-green))'
                          }}
                          className="text-gray-900"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="howHeard" style={{ color: 'hsl(var(--jungle-green))' }}>
                          {t(content.form.contact.howHeard)}
                        </Label>
                        <Select value={howHeardAboutUs} onValueChange={setHowHeardAboutUs}>
                          <SelectTrigger 
                            id="howHeard"
                            className="w-full"
                            style={{ 
                              backgroundColor: 'hsl(var(--cream))',
                              borderColor: 'hsl(var(--jungle-green))',
                              color: 'hsl(var(--jungle-green))'
                            }}
                          >
                            <SelectValue placeholder={t(content.form.contact.howHeard)} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="search">{t(content.form.howHeardOptions.search)}</SelectItem>
                            <SelectItem value="social">{t(content.form.howHeardOptions.social)}</SelectItem>
                            <SelectItem value="friend">{t(content.form.howHeardOptions.friend)}</SelectItem>
                            <SelectItem value="blog">{t(content.form.howHeardOptions.blog)}</SelectItem>
                            <SelectItem value="other">{t(content.form.howHeardOptions.other)}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div 
                    className="p-6 rounded-xl text-center"
                    style={{ 
                      backgroundColor: 'hsl(var(--terracotta))',
                      color: 'hsl(var(--cream))'
                    }}
                  >
                    <p className="text-lg font-semibold">
                      {t(content.form.deposit.message)}
                    </p>
                  </div>
                  
                  <Button
                    type="submit"
                    size="lg"
                    disabled={!isFormValid() || isSubmitting}
                    className="w-full text-lg transition-all duration-200 active:scale-[0.98]"
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
              </div>
              
              <div className="lg:col-span-4 mt-8 lg:mt-0">
                <div className="hidden lg:block sticky top-24">
                  <Card className="shadow-lg" style={{ backgroundColor: 'hsl(var(--cream))' }}>
                    <CardContent className="p-6">
                      <SummaryContent />
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:hidden fixed bottom-6 right-6 z-40">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button 
                        size="lg"
                        className="rounded-full shadow-lg w-14 h-14 p-0"
                        style={{ 
                          backgroundColor: 'hsl(var(--jaguar-gold))',
                          color: 'hsl(var(--jungle-green))'
                        }}
                        aria-label={t(content.summary.title)}
                      >
                        <Menu className="h-6 w-6" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[320px] sm:w-[380px]" style={{ backgroundColor: 'hsl(var(--cream))' }}>
                      <SheetHeader>
                        <SheetTitle style={{ color: 'hsl(var(--jungle-green))' }}>
                          {t(content.summary.title)}
                        </SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <SummaryContent />
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

export default BookingPage;
