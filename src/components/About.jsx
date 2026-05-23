import { motion } from 'framer-motion'
import { ChevronRight, Quote } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const ABOUT_IMG   = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80'
const OFFICE_IMG  = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80'
const TEAM_IMG    = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=700&q=80'

const pillars = [
  { title: 'Ética Profesional', color: 'bg-red-600' },
  { title: 'Excelencia Técnica', color: 'bg-blue-600' },
  { title: 'Solidaridad Gremial', color: 'bg-amber-600' },
  { title: 'Proyección Internacional', color: 'bg-emerald-600' },
]

const timeline = [
  { year: '1943', text: 'Fundación del Colegio de Contadores de Pichincha' },
  { year: '1980', text: 'Expansión del programa de capacitación profesional' },
  { year: '2000', text: 'Implementación de estándares NIIF internacionales' },
  { year: '2024', text: 'Más de 5,000 profesionales afiliados en todo el país' },
]

export default function About() {
  const [leftRef,  lVis] = useScrollAnimation(0.15)
  const [rightRef, rVis] = useScrollAnimation(0.1)
  const [quoteRef, qVis] = useScrollAnimation(0.15)

  return (
    <>
      {/* ══════════ ABOUT MAIN ══════════ */}
      <section id="nosotros" className="section-padding relative overflow-hidden">
        {/* bg accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/50 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#08122a]/40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* ── Left: images ── */}
            <motion.div
              ref={leftRef}
              initial={{ opacity: 0, x: -40 }} animate={lVis ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Main image */}
              <div className="img-frame" style={{ height: '440px' }}>
                <img src={ABOUT_IMG} alt="Equipo CCAP" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060e1e]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#060e1e]/20 to-transparent" />
              </div>

              {/* Small overlay image */}
              <motion.div
                animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                className="absolute -bottom-8 -right-6 w-48 h-36 img-frame shadow-2xl border border-white/10"
              >
                <img src={OFFICE_IMG} alt="Sede CCAP" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060e1e]/50 to-transparent" />
                <div className="absolute bottom-2 left-3">
                  <p className="text-white text-xs font-bold">Sede Quito</p>
                  <p className="text-slate-400 text-[10px]">Iñaquito N37-219</p>
                </div>
              </motion.div>

              {/* Gold accent line */}
              <div className="absolute -left-4 top-12 h-32 w-0.5 bg-gradient-to-b from-amber-600/80 to-transparent" />

              {/* Year badge */}
              <div className="absolute top-5 left-5 glass px-4 py-3">
                <p className="text-amber-400 font-black text-2xl leading-none">1943</p>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider">Año de fundación</p>
              </div>
            </motion.div>

            {/* ── Right: copy ── */}
            <motion.div
              ref={rightRef}
              initial={{ opacity: 0, x: 40 }} animate={rVis ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="tag-badge bg-red-950/60 text-red-400 border border-red-800/40 mb-5 inline-block">
                Quiénes Somos
              </span>
              <h2 className="text-white font-black mb-5 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}
              >
                Más de <span className="gradient-text-gold">80 años</span>
                <br />forjando líderes
                <br />contables del Ecuador
              </h2>
              <div className="divider-gold mb-6" />

              <p className="text-slate-400 leading-relaxed mb-3 text-sm">
                Fundado en 1943, el CCAP agrupa a contadores y auditores de Pichincha. Durante más de ocho décadas hemos sido el referente de la profesión contable en Ecuador, con reconocimiento internacional ante la IFAC y la AIC.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8 text-sm">
                Trabajamos para que cada afiliado cuente con herramientas, formación y respaldo necesarios para sobresalir en un entorno empresarial cada vez más exigente y globalizado.
              </p>

              {/* Timeline */}
              <div className="space-y-3 mb-8">
                {timeline.map(({ year, text }, i) => (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, x: 20 }}
                    animate={rVis ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 flex items-center gap-2 pt-0.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${i === timeline.length - 1 ? 'bg-amber-400' : 'bg-red-600'}`} />
                      <span className="text-xs font-bold text-slate-500 w-9">{year}</span>
                    </div>
                    <p className="text-slate-400 text-sm">{text}</p>
                  </motion.div>
                ))}
              </div>

              {/* Pillars row */}
              <div className="flex flex-wrap gap-2 mb-8">
                {pillars.map((p) => (
                  <div key={p.title} className="flex items-center gap-1.5 glass-light px-3 py-1.5 rounded-lg">
                    <div className={`w-1.5 h-1.5 rounded-full ${p.color}`} />
                    <span className="text-slate-300 text-xs font-medium">{p.title}</span>
                  </div>
                ))}
              </div>

              <motion.a
                href="#afiliacion"
                onClick={(e) => { e.preventDefault(); document.querySelector('#afiliacion')?.scrollIntoView({ behavior: 'smooth' }) }}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="btn-primary inline-flex"
              >
                Únete al gremio <ChevronRight size={16} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ QUOTE BANNER ══════════ */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <img src={TEAM_IMG} alt="Equipo contable" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060e1e]/97 via-[#060e1e]/90 to-[#060e1e]/70" />
        </div>
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

        <motion.div
          ref={quoteRef}
          initial={{ opacity: 0, y: 24 }} animate={qVis ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="quote-mark mb-2">"</div>
          <blockquote
            className="text-white font-bold mb-6 leading-snug"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            La contabilidad no es solo números — es el lenguaje que gobierna
            <span className="gradient-text-gold"> la confianza y la transparencia </span>
            en los negocios del Ecuador.
          </blockquote>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Directiva CCAP — Colegio de Contadores y Auditores de Pichincha</p>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { v: '80+', l: 'Años' },
              { v: '5,000+', l: 'Afiliados' },
              { v: '200+', l: 'Cursos/año' },
              { v: '3', l: 'Org. internacionales' },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <p className="font-black text-white mb-0.5" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem' }}>{v}</p>
                <p className="text-slate-500 text-xs uppercase tracking-wider">{l}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  )
}
