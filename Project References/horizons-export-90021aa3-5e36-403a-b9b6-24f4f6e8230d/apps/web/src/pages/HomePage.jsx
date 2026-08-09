import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  MapPin,
  MessageCircle,
  TentTree,
  UsersRound,
  Waves,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { getWhatsAppUrl, WHATSAPP_DISPLAY } from '../lib/contact.js';

import lagoonAerial from '../../../../../../top_view_all_laggons_medium.jpg';
import dockAerial from '../../../../../../topview_dock.jpg';
import swimmingPhoto from '../../../../../../swimming_sunny_medium.jpg';
import kayakPhoto from '../../../../../../kayak_family_medium.jpg';
import poolPhoto from '../../../../../../pool_medium.jpg';
import cabinPhoto from '../../../../../../cabin_1_small.jpg';
import domePhoto from '../../../../../../dome_medium.jpg';
import tentsPhoto from '../../../../../../tents_medium.jpg';
import volunteerPhoto from '../../../../../../volunteer_team.jpg';
import boatPhoto from '../../../../../../boat_beach_medium.jpg';

const HomePage = () => {
  const { language, t } = useLanguage();
  const whatsappUrl = getWhatsAppUrl(language);

  const experiences = [
    {
      name: { es: 'Nadar en la laguna', en: 'Swim in the lagoon' },
      detail: { es: 'Agua abierta y tiempo sin prisa', en: 'Open water and unhurried time' },
      image: swimmingPhoto,
      position: '50% 54%',
    },
    {
      name: { es: 'Recorrer en kayak', en: 'Explore by kayak' },
      detail: { es: 'La orilla desde otra perspectiva', en: 'The shoreline from another perspective' },
      image: kayakPhoto,
      position: '50% 50%',
    },
    {
      name: { es: 'Disfrutar la piscina', en: 'Enjoy the pool' },
      detail: { es: 'Un espacio para toda la familia', en: 'A place for the whole family' },
      image: poolPhoto,
      position: '50% 50%',
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t({
          es: 'Baalam-Nah | Laguna, naturaleza y comunidad en X-Hazil Sur',
          en: 'Baalam-Nah | Lagoon, nature and community in X-Hazil Sur',
        })}</title>
        <meta
          name="description"
          content={t({
            es: 'Planea un día en la laguna de Baalam-Nah: natación, kayak, piscina, cabañas, domos, campamento y encuentros en X-Hazil Sur, Quintana Roo.',
            en: 'Plan a day at the Baalam-Nah lagoon: swimming, kayaking, pool, cabins, domes, camping and gatherings in X-Hazil Sur, Quintana Roo.',
          })}
        />
      </Helmet>

      {/* THESIS: Baalam-Nah is read as a living lagoon ledger, not a generic eco-resort.
          OWN-WORLD: Deep water blue, field-map cyan, sun yellow, route lines, folio tabs, and documentary photography.
          STORY: See the water, understand the day, discover ways to stay, then place the retreat inside X-Hazil Sur's larger land story.
          FIRST VIEWPORT: An aerial lagoon fills the frame; a giant wordmark and traced route sit over water, with a practical visit ledger and WhatsApp action at right.
          FORM: Living Lagoon Ledger, third grounded direction, monumental-berth staging, seed 93cad46b. */}
      <main>
        <section id="inicio" className="hero-ledger" aria-labelledby="hero-title">
          <img
            className="hero-image"
            src={lagoonAerial}
            alt={t({
              es: 'Vista aérea de las lagunas y la selva alrededor de Baalam-Nah',
              en: 'Aerial view of the lagoons and forest surrounding Baalam-Nah',
            })}
          />
          <div className="hero-wash" />
          <svg className="hero-route" viewBox="0 0 1200 720" aria-hidden="true">
            <motion.path
              d="M-40,565 C175,480 220,625 410,505 S690,260 790,355 S930,570 1260,305"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            />
            <circle cx="410" cy="505" r="9" />
            <circle cx="790" cy="355" r="9" />
          </svg>

          <div className="hero-title-wrap">
            <motion.h1
              id="hero-title"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Baalam-Nah
            </motion.h1>
            <p>{t({
              es: 'La laguna marca el rumbo.',
              en: 'Let the lagoon set the course.',
            })}</p>
          </div>

          <motion.aside
            className="visit-ledger"
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          >
            <div className="ledger-heading">
              <span>{t({ es: 'Bitácora de visita', en: 'Visit ledger' })}</span>
              <span>19.39° N</span>
            </div>
            <p className="ledger-lede">{t({
              es: 'Un refugio de agua, selva y tiempo compartido en X-Hazil Sur.',
              en: 'A refuge of water, forest and shared time in X-Hazil Sur.',
            })}</p>
            <dl>
              <div>
                <dt><Waves size={17} />{t({ es: 'En el agua', en: 'On the water' })}</dt>
                <dd>{t({ es: 'Nado · kayak · piscina', en: 'Swimming · kayak · pool' })}</dd>
              </div>
              <div>
                <dt><TentTree size={17} />{t({ es: 'Para quedarse', en: 'To stay' })}</dt>
                <dd>{t({ es: 'Cabañas · domos · campamento', en: 'Cabins · domes · camping' })}</dd>
              </div>
              <div>
                <dt><UsersRound size={17} />{t({ es: 'Para reunirse', en: 'To gather' })}</dt>
                <dd>{t({ es: 'Familias · grupos · encuentros', en: 'Families · groups · gatherings' })}</dd>
              </div>
            </dl>
            <a className="primary-action" href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle size={19} aria-hidden="true" />
              {t({ es: 'Planear por WhatsApp', en: 'Plan by WhatsApp' })}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </motion.aside>

          <a className="hero-scroll" href="#laguna">
            <ArrowDown size={18} aria-hidden="true" />
            {t({ es: 'Seguir el agua', en: 'Follow the water' })}
          </a>
        </section>

        <section id="laguna" className="lagoon-intro">
          <div className="folio-index" aria-hidden="true">
            <span>AGUA</span>
            <span>TIERRA</span>
            <span>COMUNIDAD</span>
          </div>
          <div className="intro-copy">
            <h2>{t({
              es: 'Aquí, el agua organiza el día.',
              en: 'Here, the water shapes the day.',
            })}</h2>
            <p>{t({
              es: 'Llegar, elegir una orilla y dejar que el ritmo cambie. Baalam-Nah es un lugar para nadar, remar, conversar, comer juntos y quedarse un poco más.',
              en: 'Arrive, choose a shoreline and let the pace change. Baalam-Nah is a place to swim, paddle, talk, eat together and stay a little longer.',
            })}</p>
          </div>
          <figure className="dock-figure">
            <img
              src={dockAerial}
              alt={t({
                es: 'Vista aérea del muelle que entra en la laguna',
                en: 'Aerial view of the dock reaching into the lagoon',
              })}
            />
            <figcaption>
              <span>{t({ es: 'Punto de entrada', en: 'Point of entry' })}</span>
              <span>{t({ es: 'Muelle · Laguna', en: 'Dock · Lagoon' })}</span>
            </figcaption>
          </figure>
        </section>

        <section id="experiencias" className="experience-section" aria-labelledby="experience-title">
          <div className="section-heading">
            <h2 id="experience-title">{t({
              es: 'Tres maneras de entrar al agua.',
              en: 'Three ways into the water.',
            })}</h2>
            <p>{t({
              es: 'No hay un itinerario obligatorio. Hay distintas maneras de estar aquí.',
              en: 'There is no required itinerary. There are different ways to be here.',
            })}</p>
          </div>

          <div className="experience-track">
            {experiences.map((experience) => (
              <article className="experience-panel" key={experience.name.es}>
                <img
                  src={experience.image}
                  alt={t(experience.name)}
                  style={{ objectPosition: experience.position }}
                />
                <div>
                  <h3>{t(experience.name)}</h3>
                  <p>{t(experience.detail)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="estancias" className="stays-section" aria-labelledby="stays-title">
          <div className="stays-copy">
            <h2 id="stays-title">{t({
              es: 'Cuando un día no es suficiente.',
              en: 'When one day is not enough.',
            })}</h2>
            <p>{t({
              es: 'La experiencia puede continuar bajo techo o bajo el cielo. Consulta disponibilidad para cabañas, domos y espacios de campamento.',
              en: 'The experience can continue under a roof or under the sky. Ask about availability for cabins, domes and camping spaces.',
            })}</p>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              {t({ es: 'Consultar una estancia', en: 'Ask about a stay' })}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <figure className="stay-image stay-image-cabin">
            <img
              src={cabinPhoto}
              alt={t({ es: 'Cabaña rodeada de vegetación', en: 'Cabin surrounded by vegetation' })}
            />
            <figcaption>{t({ es: 'Cabañas', en: 'Cabins' })}</figcaption>
          </figure>
          <figure className="stay-image stay-image-dome">
            <img src={domePhoto} alt={t({ es: 'Domo entre la vegetación', en: 'Dome among the vegetation' })} />
            <figcaption>{t({ es: 'Domos', en: 'Domes' })}</figcaption>
          </figure>
          <figure className="stay-image stay-image-tents">
            <img src={tentsPhoto} alt={t({ es: 'Tiendas de campaña en el terreno', en: 'Tents set up on the property' })} />
            <figcaption>{t({ es: 'Campamento', en: 'Camping' })}</figcaption>
          </figure>
        </section>

        <section id="vision" className="vision-section" aria-labelledby="vision-title">
          <div className="vision-map">
            <img
              src={lagoonAerial}
              alt={t({
                es: 'Sistema de lagunas rodeado por la selva',
                en: 'Lagoon system surrounded by forest',
              })}
            />
            <svg viewBox="0 0 800 520" aria-hidden="true">
              <path d="M70,390 C180,275 280,350 365,228 S555,128 730,190" />
              <circle cx="70" cy="390" r="10" />
              <circle cx="365" cy="228" r="10" />
              <circle cx="730" cy="190" r="10" />
            </svg>
            <span className="map-label map-label-one">{t({ es: 'Visita', en: 'Visit' })}</span>
            <span className="map-label map-label-two">{t({ es: 'Encuentro', en: 'Gather' })}</span>
            <span className="map-label map-label-three">{t({ es: 'Futuro', en: 'Future' })}</span>
          </div>
          <div className="vision-copy">
            <h2 id="vision-title">{t({
              es: 'Una propiedad con horizonte largo.',
              en: 'A property with a long horizon.',
            })}</h2>
            <p>{t({
              es: 'Baalam-Nah forma parte de una visión más amplia: turismo local, encuentros, colaboración y nuevas maneras de fortalecer la economía comunitaria sin perder de vista el territorio.',
              en: 'Baalam-Nah is part of a broader vision: local tourism, gatherings, collaboration and new ways to strengthen the community economy without losing sight of the land.',
            })}</p>
            <div className="history-note">
              <span>1936</span>
              <p>{t({
                es: 'El Ejido X-Hazil fue fundado por pueblos mayas vinculados a la historia de la Guerra de Castas.',
                en: 'Ejido X-Hazil was founded by Maya communities connected to the history of the Caste War.',
              })}</p>
            </div>
            <div className="history-note">
              <span>1,434 ha</span>
              <p>{t({
                es: 'El ejido estableció una reserva forestal comunitaria conectada con la Reserva de la Biosfera de Sian Ka’an.',
                en: 'The ejido established a community forest reserve connected to the Sian Ka’an Biosphere Reserve.',
              })}</p>
            </div>
            <p className="source-note">{t({
              es: 'Contexto histórico basado en la documentación del Ejido X-Hazil Sur y Anexos.',
              en: 'Historical context based on documentation from Ejido X-Hazil Sur y Anexos.',
            })}</p>
          </div>
        </section>

        <section className="gather-section" aria-labelledby="gather-title">
          <img
            src={volunteerPhoto}
            alt={t({
              es: 'Grupo de voluntarios reunido en Baalam-Nah',
              en: 'Volunteer group gathered at Baalam-Nah',
            })}
          />
          <div className="gather-overlay">
            <h2 id="gather-title">{t({
              es: 'El lugar también se construye al reunirnos.',
              en: 'The place also grows when we gather.',
            })}</h2>
            <p>{t({
              es: 'Familias, grupos y colaboraciones encuentran aquí espacio para compartir una comida, una conversación o un proyecto.',
              en: 'Families, groups and collaborators find room here to share a meal, a conversation or a project.',
            })}</p>
          </div>
        </section>

        <section id="visitanos" className="visit-section" aria-labelledby="visit-title">
          <div className="visit-photo">
            <img
              src={boatPhoto}
              alt={t({
                es: 'Lancha junto a la orilla de la laguna',
                en: 'Boat resting along the lagoon shore',
              })}
            />
          </div>
          <div className="visit-copy">
            <h2 id="visit-title">{t({
              es: 'Tu visita empieza con un mensaje.',
              en: 'Your visit begins with a message.',
            })}</h2>
            <p>{t({
              es: 'Cuéntanos cuántas personas vienen y qué quieren vivir. Confirmaremos disponibilidad, horario, acceso y lo necesario para su día.',
              en: 'Tell us how many people are coming and what you would like to experience. We will confirm availability, timing, access and what you need for the day.',
            })}</p>
            <div className="visit-details">
              <div>
                <CalendarDays aria-hidden="true" />
                <span>{t({ es: 'Visitas con coordinación previa', en: 'Visits arranged in advance' })}</span>
              </div>
              <div>
                <MapPin aria-hidden="true" />
                <span>X-Hazil Sur, Quintana Roo</span>
              </div>
            </div>
            <a className="visit-action" href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" />
              <span>
                <small>{t({ es: 'Escribir por WhatsApp', en: 'Message on WhatsApp' })}</small>
                {WHATSAPP_DISPLAY}
              </span>
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
