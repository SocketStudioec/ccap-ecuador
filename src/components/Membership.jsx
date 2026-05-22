import { motion } from 'framer-motion'
import { CheckCircle, Star, Zap, ArrowRight, Gift } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const plans = [
  {
    name: 'Nuevo Afiliado',
    badge: 'Primer ingreso',
    price: 'Consultar',
    period: 'inscripción única',
    highlight: false,
    description: 'Para profesionales que se incorporan por primera vez al gremio.',
    features: [
      'Carnet profesional CCAP',
      'Acceso a biblioteca digital',
      'Boletín informativo mensual',
      'Descuento del 20% en cursos',
      'Red de contactos gremiales',
      'Representación gremial',
    ],
    cta: 'Inscribirme',
    icon: Star,
  },
  {
    name: 'Renovación Anual',
    badge: 'Más popular',
    price: 'Consultar',
    period: 'renovación anual',
    highlight: true,
    description: 'Mantén todos tus beneficios activos y accede a capacitación gratuita.',
    features: [
      'Todo lo del Nuevo Afiliado',
      '1 curso gratuito incluido',
      'Precio preferencial en diplomados',
      'Acceso al Campus Virtual',
      'Certificados de participación',
      'Soporte prioritario',
      'Acceso a eventos exclusivos',
    ],
    cta: 'Renovar ahora',
    icon: Zap,
  },
  {
    name: 'Corporativo',
    badge: 'Para empresas',
    price: 'Consultar',
    period: 'plan empresarial',
    highlight: false,
    description: 'Solución integral para equipos contables y firmas de auditoría.',
    features: [
      'Hasta 10 afiliados',
      'Capacitación in-company',
      'Asesoría técnica personalizada',
      'Certificaciones colectivas',
      'Representación empresarial',
      'Dashboard de seguimiento',
    ],
    cta: 'Solicitar información',
    icon: Gift,
  },
]

export default function Membership() {
  const [headerRef, headerVisible] = useScrollAnimation(0.2)

  return (
    <section id="afiliacion" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f45]/40 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />

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
            Afiliación CCAP
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Sé parte del gremio
            <br />
            <span className="gradient-text-red">más importante</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Únete a más de 5,000 contadores y auditores que confían en el CCAP para su desarrollo profesional.
          </p>
          <div className="divider-red mx-auto mt-6" />
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {plans.map((plan, i) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={headerVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.14, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`relative rounded-2xl p-6 flex flex-col ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-red-900/40 to-red-950/30 border border-red-700/50 glow-red scale-105'
                    : 'card-gradient-border'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-red-600 to-red-800 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      ★ Más Popular
                    </span>
                  </div>
                )}

                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${plan.highlight ? 'bg-red-600' : 'bg-white/5'}`}>
                      <Icon size={18} className={plan.highlight ? 'text-white' : 'text-slate-400'} />
                    </div>
                    <span className={`tag-badge text-[10px] ${plan.highlight ? 'bg-red-800/50 text-red-300 border border-red-700/50' : 'bg-white/5 text-slate-500 border border-white/10'}`}>
                      {plan.badge}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-3">{plan.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl font-black ${plan.highlight ? 'text-red-400' : 'text-white'}`}>{plan.price}</span>
                    <span className="text-slate-500 text-xs">/ {plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-2 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle size={14} className={`mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-red-400' : 'text-green-500'}`} />
                      <span className="text-slate-400">{f}</span>
                    </li>
                  ))}
                </ul>

                <motion.a
                  href="#contacto"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }) }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full justify-center text-sm ${plan.highlight ? 'btn-primary btn-pulse' : 'btn-outline'}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  {plan.cta} <ArrowRight size={14} />
                </motion.a>
              </motion.div>
            )
          })}
        </div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 text-center md:text-left"
        >
          <div className="w-12 h-12 flex-shrink-0 bg-green-900/30 rounded-full flex items-center justify-center">
            <CheckCircle size={24} className="text-green-400" />
          </div>
          <div>
            <h4 className="text-white font-bold mb-1">Proceso de afiliación sencillo</h4>
            <p className="text-slate-400 text-sm">Presenta tu título profesional, cédula de identidad y completa el formulario. Nuestro equipo te guiará en todo el proceso de incorporación al gremio.</p>
          </div>
          <motion.a
            href="#contacto"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }) }}
            whileHover={{ scale: 1.03 }}
            className="btn-primary whitespace-nowrap text-sm flex-shrink-0"
          >
            Iniciar proceso
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
