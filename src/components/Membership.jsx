import { motion } from 'framer-motion'
import { CheckCircle, Star, Zap, Gift, ArrowRight, Users } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const MEMBER_IMG = 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=900&q=80'

const plans = [
  {
    name: 'Nuevo Afiliado',
    badge: 'Primer ingreso',
    price: 'Consultar tarifa',
    highlight: false,
    description: 'Perfecta para profesionales que se incorporan por primera vez al gremio.',
    features: ['Carnet profesional CCAP', 'Acceso a biblioteca digital', 'Boletín mensual', 'Descuento 20% en cursos', 'Red gremial de contactos', 'Representación profesional'],
    cta: 'Inscribirme',
    icon: Star,
    accentClass: 'border-white/[0.08]',
    iconBg: 'bg-slate-700/40 text-slate-300',
  },
  {
    name: 'Renovación Anual',
    badge: 'Más popular',
    price: 'Consultar tarifa',
    highlight: true,
    description: 'Mantén todos tus beneficios y accede a capacitación gratuita incluida.',
    features: ['Todo lo de Nuevo Afiliado', '1 curso gratuito incluido', 'Campus Virtual acceso completo', 'Precios preferenciales en diplomados', 'Certificados de participación', 'Soporte prioritario', 'Acceso a eventos exclusivos'],
    cta: 'Renovar ahora',
    icon: Zap,
    accentClass: 'border-red-700/50',
    iconBg: 'bg-red-700/40 text-red-300',
  },
  {
    name: 'Corporativo',
    badge: 'Para empresas',
    price: 'Consultar tarifa',
    highlight: false,
    description: 'Solución integral para equipos contables y firmas de auditoría.',
    features: ['Hasta 10 afiliados', 'Capacitación in-company', 'Asesoría técnica NIIF', 'Certificaciones colectivas', 'Representación empresarial', 'Dashboard de seguimiento'],
    cta: 'Solicitar info',
    icon: Gift,
    accentClass: 'border-amber-700/30',
    iconBg: 'bg-amber-700/30 text-amber-300',
  },
]

export default function Membership() {
  const [ref, vis] = useScrollAnimation(0.1)

  return (
    <section id="afiliacion" className="section-padding relative overflow-hidden">
      {/* bg glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08122a]/60 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-red-950/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }} animate={vis ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="tag-badge bg-red-950/60 text-red-400 border border-red-800/40 mb-5 inline-block">
            <Users size={10} className="mr-1" /> Afiliación CCAP
          </span>
          <h2 className="text-white font-black mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Sé parte del gremio
            <br /><span className="gradient-text-red">más importante</span> del Ecuador
          </h2>
          <div className="divider-red mx-auto mb-5" />
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Únete a más de 5,000 contadores y auditores que confían en el CCAP para su desarrollo profesional.
          </p>
        </motion.div>

        {/* ── Plans grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {plans.map((plan, i) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 36 }}
                animate={vis ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.13, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`relative rounded-2xl border flex flex-col overflow-hidden ${plan.accentClass} ${
                  plan.highlight ? 'bg-gradient-to-b from-red-950/50 to-[#08102a]/90 scale-[1.03] shadow-2xl shadow-red-950/40' : 'bg-[#080e22]/80'
                }`}
              >
                {/* Popular ribbon */}
                {plan.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700 via-red-500 to-red-700" />
                )}

                <div className="p-7 flex-1 flex flex-col">
                  {/* Icon + badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${plan.iconBg}`}>
                      <Icon size={20} />
                    </div>
                    <span className={`tag-badge text-[10px] border ${
                      plan.highlight ? 'bg-red-900/50 text-red-300 border-red-700/40' : 'bg-white/5 text-slate-500 border-white/10'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>

                  <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                  <p className="text-slate-500 text-xs mb-3 leading-relaxed">{plan.description}</p>

                  <div className="mb-5">
                    <span className={`text-2xl font-black ${plan.highlight ? 'text-red-400' : 'text-white'}`}>{plan.price}</span>
                  </div>

                  <hr className="hr-dim mb-5" />

                  <ul className="space-y-2.5 flex-1 mb-7">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle size={14} className={`mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-red-400' : 'text-emerald-500/70'}`} />
                        <span className="text-slate-400">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.a
                    href="#contacto"
                    onClick={(e) => { e.preventDefault(); document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }) }}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className={`w-full justify-center text-sm inline-flex items-center gap-2 ${plan.highlight ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {plan.cta} <ArrowRight size={14} />
                  </motion.a>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── Image + process strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={vis ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0">
            <img src={MEMBER_IMG} alt="Afiliación CCAP" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#060e1e]/98 via-[#060e1e]/90 to-[#060e1e]/60" />
          </div>
          <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle size={20} className="text-emerald-400" />
                <h4 className="text-white font-bold text-lg">Proceso de afiliación sencillo</h4>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-md">
                Presenta tu título profesional, cédula de identidad y completa el formulario en línea. Nuestro equipo te guiará en cada paso del proceso de incorporación al gremio.
              </p>
              <div className="flex gap-4 flex-wrap">
                {['Título profesional', 'Cédula de identidad', 'Formulario digital'].map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full border border-red-700/50 flex items-center justify-center text-red-400 text-xs font-bold">{i + 1}</div>
                    <span className="text-slate-400 text-xs">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <motion.a
              href="#contacto"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }) }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="btn-primary whitespace-nowrap flex-shrink-0"
            >
              Iniciar proceso <ArrowRight size={16} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
