import { motion } from 'framer-motion'
import { Calendar, MapPin, ArrowRight, Clock, ExternalLink } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import data from '../data/data.json'

const EVENT_BG   = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80'
const SUMMIT_IMG = 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=700&q=80'
const COURSE_IMG = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80'
const FORUM_IMG  = 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=700&q=80'

const eventImages = { summit: SUMMIT_IMG, course: COURSE_IMG, forum: FORUM_IMG }

const typeStyle = {
  summit: { tag: 'bg-amber-900/60 text-amber-300 border-amber-700/40', dot: 'bg-amber-400', label: 'Summit' },
  course: { tag: 'bg-blue-900/50 text-blue-300 border-blue-700/40', dot: 'bg-blue-400', label: 'Curso' },
  forum:  { tag: 'bg-purple-900/50 text-purple-300 border-purple-700/40', dot: 'bg-purple-400', label: 'Foro' },
}

function EventCard({ event, index }) {
  const [ref, vis] = useScrollAnimation(0.1)
  const ts = typeStyle[event.type] || typeStyle.course
  const img = eventImages[event.type] || SUMMIT_IMG

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-default rounded-2xl overflow-hidden border border-white/[0.07] bg-[#080e22] card-hover"
    >
      {/* Image header */}
      <div className="relative h-44 overflow-hidden">
        <img src={img} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080e22]/90 via-[#080e22]/40 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`tag-badge border ${ts.tag}`}>{ts.label}</span>
        </div>
        <div className="absolute bottom-3 left-4">
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${ts.dot}`} />
            <span className="text-white text-xs font-bold">{event.date}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-bold text-base leading-snug mb-2 group-hover:text-red-300 transition-colors duration-200">
          {event.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-3">{event.description}</p>
        <div className="flex items-center gap-1.5 text-slate-600 text-xs mb-4">
          <MapPin size={11} />
          <span>{event.venue}</span>
        </div>
        <div className="flex items-center gap-1 text-red-400 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Ver detalles <ArrowRight size={11} />
        </div>
      </div>
    </motion.div>
  )
}

export default function Events() {
  const [headerRef, hVis] = useScrollAnimation(0.2)
  const [newsRef,   nVis] = useScrollAnimation(0.1)

  return (
    <section id="eventos" className="relative overflow-hidden">
      {/* ── Full-width hero strip ── */}
      <div className="relative h-72 overflow-hidden">
        <img src={EVENT_BG} alt="Eventos CCAP" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060e1e]/95 via-[#060e1e]/75 to-[#060e1e]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060e1e] to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              ref={headerRef}
              initial={{ opacity: 0, y: 24 }} animate={hVis ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="tag-badge bg-red-950/70 text-red-400 border border-red-800/40 mb-4 inline-block">Agenda 2026</span>
              <h2 className="text-white font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
                Próximos <span className="gradient-text-red">eventos</span>
                <br />y capacitaciones
              </h2>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Cards section ── */}
      <div className="section-padding pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {data.events.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>

          {/* ── Newsletter strip ── */}
          <motion.div
            ref={newsRef}
            initial={{ opacity: 0, y: 20 }} animate={nVis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/60 to-[#0a1234]/80" />
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="flex-1">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  <Clock size={18} className="text-red-400" />
                  <span className="text-red-400 font-semibold text-sm uppercase tracking-wide">Nunca te pierdas un evento</span>
                </div>
                <h3 className="text-white font-bold text-xl mb-1">Suscríbete a la agenda CCAP</h3>
                <p className="text-slate-400 text-sm">Recibe notificaciones de cursos, diplomados y eventos gremiales directamente en tu email.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:min-w-[360px]">
                <input
                  type="email" placeholder="tu@email.com"
                  className="flex-1 bg-white/[0.07] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-red-600/50 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="btn-primary whitespace-nowrap text-sm"
                >
                  Suscribirme
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
