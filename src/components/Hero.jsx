import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown, TrendingUp, Users, BookOpen, Shield } from 'lucide-react'

const HERO_IMG = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1920&q=85'
const CARD_IMG  = 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80'

const stats = [
  { value: '80+',   label: 'Años de trayectoria', icon: Shield },
  { value: '5,000+', label: 'Profesionales afiliados', icon: Users },
  { value: '200+',  label: 'Cursos al año', icon: BookOpen },
  { value: '98%',   label: 'Satisfacción gremial', icon: TrendingUp },
]

function AnimatedCounter({ target }) {
  const [count, setCount] = useState('0')
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect() } }, { threshold: 0.5 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const num = parseInt(target.replace(/\D/g, ''))
    const suffix = target.replace(/[0-9]/g, '')
    let cur = 0; const step = num / 55
    const t = setInterval(() => {
      cur += step
      if (cur >= num) { setCount(target); clearInterval(t) }
      else setCount(Math.floor(cur) + suffix)
    }, 22)
    return () => clearInterval(t)
  }, [started, target])

  return <span ref={ref}>{count || target}</span>
}

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const bgY   = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section id="inicio" ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Background photo + overlays ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 will-change-transform">
        <img
          src={HERO_IMG}
          alt="Profesionales contables"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Gradient overlay — stronger left, lighter right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060e1e]/97 via-[#060e1e]/80 to-[#060e1e]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060e1e] via-transparent to-[#060e1e]/40" />
      </motion.div>

      {/* Subtle grid on top */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* ── Red glow accents ── */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-red-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* ── Main content ── */}
      <motion.div style={{ opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Left — copy */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="flex items-center gap-2.5 mb-7"
            >
              <span className="tag-badge bg-red-950/70 text-red-400 border border-red-800/50">Desde 1943</span>
              <span className="tag-badge bg-amber-950/60 text-amber-400 border border-amber-800/40">Quito · Ecuador</span>
              <div className="flex items-center gap-1.5 ml-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-xs font-semibold">5,000+ afiliados activos</span>
              </div>
            </motion.div>

            {/* Main heading — large & bold */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 leading-[1.02]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="block text-white" style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)', fontWeight: 900 }}>
                Colegio de
              </span>
              <span className="block gradient-text-red" style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)', fontWeight: 900 }}>
                Contadores
              </span>
              <span className="block text-white" style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)', fontWeight: 900 }}>
                y Auditores
              </span>
              <span className="block text-slate-400 font-semibold" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.6rem)' }}>
                de Pichincha
              </span>
            </motion.h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="origin-left mb-6"
            >
              <div className="w-20 h-0.5 bg-gradient-to-r from-red-600 to-amber-600" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.6 }}
              className="text-slate-300 text-lg leading-relaxed mb-10 max-w-xl"
            >
              El <strong className="text-white">gremio contable más representativo</strong> del Ecuador. Más de ocho décadas impulsando la excelencia profesional, la ética y la solidaridad gremial.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.55 }}
              className="flex flex-wrap gap-3 mb-14"
            >
              <motion.a
                href="#afiliacion"
                onClick={(e) => { e.preventDefault(); document.querySelector('#afiliacion')?.scrollIntoView({ behavior: 'smooth' }) }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="btn-primary btn-pulse group"
              >
                <span className="relative z-10">Afiliarme al CCAP</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#servicios"
                onClick={(e) => { e.preventDefault(); document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' }) }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="btn-outline"
              >
                Explorar servicios
              </motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.07]"
            >
              {stats.map((s, i) => {
                const Icon = s.icon
                return (
                  <div key={s.label} className="bg-[#060e1e]/70 backdrop-blur px-4 py-4 text-center hover:bg-[#0d1f44]/60 transition-colors duration-300">
                    <Icon size={16} className="text-red-400 mx-auto mb-1.5" />
                    <div className="text-xl font-black text-white mb-0.5">
                      <AnimatedCounter target={s.value} />
                    </div>
                    <div className="text-[10px] text-slate-500 leading-tight uppercase tracking-wide">{s.label}</div>
                  </div>
                )
              })}
            </motion.div>
          </div>

          {/* Right — photo card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="relative">
              {/* Main photo */}
              <div className="img-frame shadow-2xl" style={{ height: '520px' }}>
                <img
                  src={CARD_IMG}
                  alt="Profesionales CCAP"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060e1e]/70 via-transparent to-transparent" />

                {/* Overlay text */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="glass p-4">
                    <p className="text-white font-bold text-sm mb-0.5">Más de 80 años</p>
                    <p className="text-slate-400 text-xs">Formando líderes contables para Ecuador y el mundo</p>
                  </div>
                </div>
              </div>

              {/* Floating card top-left */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -top-5 -left-6 glass p-3.5 w-44 shadow-2xl"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 bg-amber-500 rounded-md flex items-center justify-center">
                    <Shield size={13} className="text-white" />
                  </div>
                  <span className="text-white text-xs font-bold">Miembro IFAC</span>
                </div>
                <p className="text-slate-500 text-[10px] leading-snug">Federación Internacional de Contadores — reconocido globalmente</p>
              </motion.div>

              {/* Floating card bottom-right */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-5 -right-5 glass-warm p-3.5 w-40 shadow-2xl"
              >
                <p className="text-amber-400 font-black text-2xl leading-none mb-1">98%</p>
                <p className="text-slate-400 text-[10px]">Índice de satisfacción de socios encuesta 2025</p>
              </motion.div>

              {/* Gold accent line */}
              <div className="absolute -left-3 top-16 bottom-16 w-0.5 bg-gradient-to-b from-transparent via-amber-600/60 to-transparent" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        onClick={() => document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-600 hover:text-white transition-colors"
      >
        <span className="text-[10px] tracking-widest uppercase">Descubrir</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  )
}
