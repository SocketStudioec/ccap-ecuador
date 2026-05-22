import { motion } from 'framer-motion'
import { Calendar, MapPin, ArrowRight, Clock, Tag } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import data from '../data/data.json'

const typeColors = {
  summit: { bg: 'bg-yellow-900/30 border-yellow-700/40', text: 'text-yellow-400', label: 'Summit' },
  course: { bg: 'bg-blue-900/30 border-blue-700/40', text: 'text-blue-400', label: 'Curso' },
  forum: { bg: 'bg-purple-900/30 border-purple-700/40', text: 'text-purple-400', label: 'Foro' },
}

function EventCard({ event, index }) {
  const [ref, visible] = useScrollAnimation(0.1)
  const tc = typeColors[event.type] || typeColors.course

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="card-gradient-border card-hover group p-6 cursor-default"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-red-900/30 rounded-xl flex items-center justify-center">
            <Calendar size={18} className="text-red-400" />
          </div>
          <div>
            <p className="text-red-400 font-bold text-sm">{event.date}</p>
          </div>
        </div>
        <span className={`tag-badge ${tc.bg} ${tc.text} border text-[10px]`}>{tc.label}</span>
      </div>

      <h3 className="text-white font-bold text-lg leading-tight mb-2 group-hover:text-red-300 transition-colors duration-200">
        {event.title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4">{event.description}</p>

      <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-4">
        <MapPin size={12} className="text-slate-600" />
        {event.venue}
      </div>

      <div className="flex items-center gap-1.5 text-xs text-red-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Ver detalles <ArrowRight size={12} />
      </div>
    </motion.div>
  )
}

export default function Events() {
  const [headerRef, headerVisible] = useScrollAnimation(0.2)

  return (
    <section id="eventos" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="tag-badge bg-red-900/30 text-red-400 border border-red-800/40 mb-4 inline-block">
            Agenda 2026
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Próximos{' '}
            <span className="gradient-text-red">eventos</span>
            <br />
            y capacitaciones
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Mantente actualizado con los eventos más importantes del gremio contable ecuatoriano.
          </p>
          <div className="divider-red mx-auto mt-6" />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {data.events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>

        {/* Newsletter box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="glass rounded-2xl p-8 text-center"
        >
          <div className="max-w-xl mx-auto">
            <Clock size={28} className="text-red-400 mx-auto mb-3" />
            <h3 className="text-white font-bold text-xl mb-2">¿No quieres perderte ningún evento?</h3>
            <p className="text-slate-400 text-sm mb-6">Suscríbete y recibe notificaciones de próximos cursos, seminarios y eventos del CCAP directamente en tu email.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-red-600/60 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary whitespace-nowrap px-6 py-3 text-sm"
              >
                Suscribirme
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
