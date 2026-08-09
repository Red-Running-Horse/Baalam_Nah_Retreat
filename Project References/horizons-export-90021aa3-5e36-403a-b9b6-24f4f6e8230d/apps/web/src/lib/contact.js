export const WHATSAPP_DISPLAY = '+52 1 983 114 2517';

const messages = {
  es: 'Hola Baalam-Nah, quisiera planear una visita.',
  en: 'Hello Baalam-Nah, I would like to plan a visit.',
};

export const getWhatsAppUrl = (language) => {
  const message = messages[language] || messages.es;
  return `https://wa.me/5219831142517?text=${encodeURIComponent(message)}`;
};
