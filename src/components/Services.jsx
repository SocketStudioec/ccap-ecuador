import { motion } from 'framer-motion'
import { GraduationCap, FileText, Users, BookOpen, Monitor, Award, ArrowUpRight, Sparkles } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import data from '../data/data.json'

const SERVICES_IMG = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80'

const iconMap = { GraduationCap, FileText, Users, BookOpen, Monitor, Award }

const accentColors = [
  { bg: 'from-red-900/40 to-red-950/20', border: 'border-red-800/30', icon: 'bg-red-700/30 text-red-300', num: 'text-red-800/20' },
  { bg: 'from-amber-900/30 to-amber-950/10', border: 'border-amber-800/20', icon: 'bg-amber-700/30 text-amber-300', num: 'text-amber-800/20' },
  { bg: 'from-blue-900/30 to-blue-950/10', border: 'border-blue-800/20', icon: 'bg-blue-700/30 text-blue-300', num: 'text-blue-800/20' },
  { bg: 'from-purple-900/30 to-purple-950/10', border: 'border-purple-800/20', icon: 'bg-purple-700/30 text-purple-300', num: 'text-purple-800/20' },
  { bg: 'from-emerald-900/30 to-emerald-950/10', border: 'border-emerald-800/20', icon: 'bg-emerald-700/30 text-emerald-300', num: 'text-emerald-800/20' },
  { bg: 'from-cyan-900/30 to-cyan-950/10', border: 'border-cyan-800/20', icon: 'bg-cyan-700/30 text-cyan-300', num: 'text-cyan-800/20' },
]

export default function Services() {
  const [headerRef, hVis] = useScrollAnimation(0.15)
  const [gridRef, gVis]   = useScrollAnimation(0.05)

  return (
    <section id="servicios" className="section-padding relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-64 bg-red-950/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header + image row ── */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 28 }} animate={hVis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="tag-badge bg-red-950/60 text-red-400 border border-red-800/40 mb-5 inline-block">
              <Sparkles size={10} className="mr-1" /> Nuestros Servicios
            </span>
            <h2 className="text-white font-black mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Todo lo que necesitas
              <br />
              <span className="gradient-text-red">como profesional</span>
            </h2>
            <div className="divider-red mb-5" />
            <p className="text-slate-400 text-base leading-relaxed max-w-md">
              Desde capacitación especializada hasta representación gremial. El CCAP respalda cada etapa de tu carrera contable.
            </p>
          </motion.div>

          {/* Image panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={hVis ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="hidden lg:block"
          >
            <div className="img-frame h-52 relative">
              <img src={SERVICES_IMG} alt="Capacitación CCAP" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#060e1e]/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060e1e]/60 to-transparent" />
              {/* Floating badge */}
              <div className="absolute top-4 right-4 glass px-3 py-2 text-center">
                <p className="text-white font-black text-xl leading-none">200+</p>
                <p className="text-slate-400 text-[10px] uppercase tracking-wider">cursos anuales</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Bento grid ── */}
        <motion.div
          ref={gridRef}
          initial={{ opacity: 0 }} animate={gVis ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {data.services.map((svc, i) => {
            const Icon = iconMap[svc.icon] || Award
            const ac   = accentColors[i % accentColors.length]
            const isLarge = i < 2

            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 30 }}
                animate={gVis ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={`relative group cursor-default rounded-2xl border bg-gradient-to-br ${ac.bg} ${ac.border} p-6 card-hover overflow-hidden ${isLarge ? 'lg:p-8' : ''}`}
              >
                {/* Large number bg */}
                <span className={`absolute bottom-3 right-3 font-black select-none ${ac.num}`} style={{ fontSize: isLarge ? '7rem' : '5rem', lineHeight: 1 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center rounded-xl mb-4 ${ac.icon} ${isLarge ? 'w-14 h-14' : 'w-11 h-11'}`}>
                  <Icon size={isLarge ? 24 : 19} />
                </div>

                <h3 className={`text-white font-bold mb-2 ${isLarge ? 'text-xl' : 'text-base'}`}>{svc.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{svc.description}</p>

                <ul className="space-y-1.5 mb-5">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-slate-500">
                      <div className="w-1 h-1 rounded-full bg-slate-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: 'rgba(248,113,113,1)' }}>
                  Ver más <ArrowUpRight size={13} />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
