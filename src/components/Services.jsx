import { useRef } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, FileText, Users, BookOpen, Monitor, Award, CheckCircle, ArrowRight } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import data from '../data/data.json'

const iconMap = { GraduationCap, FileText, Users, BookOpen, Monitor, Award }

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function ServiceCard({ service }) {
  const Icon = iconMap[service.icon] || Award
  return (
    <motion.div
      variants={cardVariants}
      className="card-gradient-border card-hover group p-6 cursor-default"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-red-700/30 to-red-900/20 border border-red-800/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon size={22} className="text-red-400" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg leading-tight mb-1">{service.title}</h3>
        </div>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed mb-4">{service.description}</p>

      <ul className="space-y-1.5">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-slate-500">
            <CheckCircle size={12} className="text-red-500 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center gap-1.5 text-xs text-red-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Más información <ArrowRight size={12} />
      </div>
    </motion.div>
  )
}

export default function Services() {
  const [headerRef, headerVisible] = useScrollAnimation(0.2)
  const [gridRef, gridVisible] = useScrollAnimation(0.05)

  return (
    <section id="servicios" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1f45]/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="tag-badge bg-red-900/30 text-red-400 border border-red-800/40 mb-4 inline-block">
            Nuestros Servicios
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Todo lo que necesitas
            <br />
            <span className="gradient-text-red">como profesional</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Desde capacitación especializada hasta representación gremial. El CCAP está a tu lado en cada etapa de tu carrera.
          </p>
          <div className="divider-red mx-auto mt-6" />
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={gridVisible ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {data.services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={gridVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="#contacto"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn-outline inline-flex"
          >
            Ver oferta completa <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
