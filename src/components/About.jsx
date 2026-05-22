import { motion } from 'framer-motion'
import { Shield, Target, Heart, Globe, ChevronRight } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const pillars = [
  {
    icon: Shield,
    title: 'Ética Profesional',
    desc: 'Promovemos los más altos estándares de conducta ética y deontológica en el ejercicio contable.',
    color: 'from-red-600 to-red-800',
    glow: 'rgba(204,34,34,0.2)',
  },
  {
    icon: Target,
    title: 'Excelencia Técnica',
    desc: 'Formación continua alineada con normas internacionales NIIF y mejores prácticas globales.',
    color: 'from-blue-600 to-blue-800',
    glow: 'rgba(37,99,235,0.2)',
  },
  {
    icon: Heart,
    title: 'Solidaridad Gremial',
    desc: 'Una comunidad unida que se apoya mutuamente para crecer juntos y enfrentar los retos del sector.',
    color: 'from-purple-600 to-purple-800',
    glow: 'rgba(147,51,234,0.2)',
  },
  {
    icon: Globe,
    title: 'Proyección Internacional',
    desc: 'Miembros activos de la IFAC y la AIC, conectando a los profesionales ecuatorianos con el mundo.',
    color: 'from-emerald-600 to-emerald-800',
    glow: 'rgba(5,150,105,0.2)',
  },
]

export default function About() {
  const [leftRef, leftVisible] = useScrollAnimation(0.2)
  const [rightRef, rightVisible] = useScrollAnimation(0.15)

  return (
    <section id="nosotros" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f2044]/60 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -40 }}
            animate={leftVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="tag-badge bg-red-900/30 text-red-400 border border-red-800/40 mb-5 inline-block">
              Quiénes Somos
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Más de{' '}
              <span className="gradient-text-red">80 años</span>
              <br />
              forjando líderes
              <br />
              contables
            </h2>

            <div className="divider-red mb-6" />

            <p className="text-slate-400 text-base leading-relaxed mb-4">
              Fundado en 1943, el CCAP es la institución gremial que agrupa a los contadores y auditores de la provincia de Pichincha. Durante más de ocho décadas hemos sido el referente de la profesión contable en Ecuador.
            </p>
            <p className="text-slate-400 text-base leading-relaxed mb-8">
              Trabajamos incansablemente para que nuestros afiliados cuenten con las herramientas, la formación y el respaldo necesarios para sobresalir en un entorno empresarial cada vez más exigente y globalizado.
            </p>

            {/* Timeline markers */}
            <div className="space-y-3 mb-8">
              {[
                { year: '1943', event: 'Fundación del Colegio de Contadores de Pichincha' },
                { year: '1980s', event: 'Expansión del programa de capacitación profesional' },
                { year: '2000s', event: 'Implementación de estándares NIIF internacionales' },
                { year: 'Hoy', event: 'Más de 5,000 profesionales afiliados en todo el país' },
              ].map(({ year, event }) => (
                <div key={year} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                  </div>
                  <div className="flex gap-3 items-baseline">
                    <span className="text-red-400 font-bold text-sm whitespace-nowrap">{year}</span>
                    <span className="text-slate-400 text-sm">{event}</span>
                  </div>
                </div>
              ))}
            </div>

            <motion.a
              href="#afiliacion"
              onClick={(e) => { e.preventDefault(); document.querySelector('#afiliacion')?.scrollIntoView({ behavior: 'smooth' }) }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary inline-flex"
            >
              Únete al gremio <ChevronRight size={16} />
            </motion.a>
          </motion.div>

          {/* Right — pillars */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 40 }}
            animate={rightVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {pillars.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={rightVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  className="card-gradient-border card-hover p-5 group cursor-default"
                  style={{ '--glow': p.glow }}
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-1.5">{p.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{p.desc}</p>
                </motion.div>
              )
            })}

            {/* Membership highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={rightVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="sm:col-span-2 glass rounded-xl p-5 border-l-4 border-red-600"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Miembro Oficial</p>
                  <p className="text-white font-bold">IFAC · AIC · FACPCE</p>
                  <p className="text-slate-400 text-xs mt-1">Federación Internacional de Contadores y organismos regionales</p>
                </div>
                <div className="text-3xl font-black text-red-500/20 select-none">★★★</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
