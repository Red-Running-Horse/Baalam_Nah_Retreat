import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

const PoliciesPage = () => {
  const { t } = useLanguage();

  const content = {
    meta: {
      title: {
        en: 'Policies - Baalam Nah Casa del Jaguar',
        es: 'Politicas - Baalam Nah Casa del Jaguar'
      },
      description: {
        en: 'Read our reservation, cancellation, and guest policies for your stay at Baalam Nah.',
        es: 'Consulta nuestras politicas de reserva, cancelacion y estancia para tu visita en Baalam Nah.'
      }
    },
    hero: {
      title: {
        en: 'Guest Policies',
        es: 'Politicas para Huespedes'
      },
      subtitle: {
        en: 'Clear guidelines to ensure a smooth and respectful stay for everyone.',
        es: 'Lineamientos claros para asegurar una estancia comoda y respetuosa para todos.'
      }
    },
    sections: [
      {
        title: {
          en: 'Reservations and Deposits',
          es: 'Reservas y Depositos'
        },
        body: {
          en: 'A 50% deposit is required to confirm your reservation. The remaining balance is due at check-in unless otherwise agreed in writing.',
          es: 'Se requiere un deposito del 50% para confirmar tu reserva. El saldo restante se paga al momento del check-in, salvo acuerdo por escrito.'
        }
      },
      {
        title: {
          en: 'Cancellation Policy',
          es: 'Politica de Cancelacion'
        },
        body: {
          en: 'Cancellations made at least 7 days before check-in are eligible for a partial refund of the deposit. Cancellations within 7 days of arrival are non-refundable.',
          es: 'Las cancelaciones realizadas al menos 7 dias antes del check-in pueden recibir un reembolso parcial del deposito. Las cancelaciones dentro de los 7 dias previos a la llegada no son reembolsables.'
        }
      },
      {
        title: {
          en: 'Check-in and Check-out',
          es: 'Check-in y Check-out'
        },
        body: {
          en: 'Check-in starts at 3:00 PM and check-out is at 11:00 AM. Early check-in or late check-out may be available upon request.',
          es: 'El check-in inicia a las 3:00 PM y el check-out es a las 11:00 AM. El check-in temprano o check-out tardio puede estar disponible bajo solicitud.'
        }
      },
      {
        title: {
          en: 'Respect for Nature and Community',
          es: 'Respeto por la Naturaleza y la Comunidad'
        },
        body: {
          en: 'We are a community-based eco-retreat. Guests are expected to respect wildlife, avoid excessive noise, and follow all guidance from staff regarding protected areas and sustainability practices.',
          es: 'Somos un retiro ecoturistico comunitario. Se espera que los huespedes respeten la vida silvestre, eviten ruido excesivo y sigan las indicaciones del personal sobre areas protegidas y practicas sostenibles.'
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

      <main className="min-h-screen py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center" style={{ letterSpacing: '-0.02em' }}>
              {t(content.hero.title)}
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 text-center mb-10">
              {t(content.hero.subtitle)}
            </p>

            <div className="space-y-6">
              {content.sections.map((section) => (
                <Card key={section.title.en} className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl">{t(section.title)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base leading-relaxed text-foreground/85">{t(section.body)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default PoliciesPage;
