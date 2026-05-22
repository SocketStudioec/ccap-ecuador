import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown, Play, Shield, Award, Users } from 'lucide-react'
import data from '../data/data.json'

const stats = data.stats

function StatCard({ value, label, delay }) {
  const [count, setCount] = useState('0')
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const num = parseInt(value.replace(/\D/g, ''))
    const suffix = value.replace(/[\d]/g, '')
    let cur = 0
    const step = num / 60
    const t = setInterval(() => {
      cur += step
      if (cur >= num) { setCount(value); clearInterval(t) }
      else setCount(Math.floor(cur) + suffix)
    }, 25)
    return () => clearInterval(t)
  }, [visible, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-xl px-5 py-4 text-center card-hover cursor-default"
    >
      <div className="text-2xl md:text-3xl font-black gradient-text-red mb-0.5">{count || value}</div>
      <div className="text-xs text-slate-400 font-medium leading-tight">{label}</div>
    </motion.div>
  )
}

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const scrollDown = () => {
    document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg"
    >
      {/* Deep radial background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-[#0d1f45] to-navy-950 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute top-32 right-6 md:right-16 lg:right-24 float-anim hidden md:block"
      >
        <div className="glass rounded-2xl p-4 max-w-[180px] shadow-2xl">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <Award size={16} className="text-white" />
            </div>
            <span className="text-xs font-bold text-white">Reconocido</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">Miembro oficial de la <span className="text-white font-semibold">IFAC</span> — Federación Internacional de Contadores</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-36 left-6 md:left-16 float-anim hidden md:block"
        style={{ animationDelay: '2s' }}
      >
        <div className="glass rounded-2xl p-4 max-w-[170px] shadow-2xl">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-400 font-semibold">En línea ahora</span>
          </div>
          <p className="text-[10px] text-slate-400">+5,000 profesionales activos en la red gremial</p>
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="max-w-3xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="tag-badge bg-red-900/40 text-red-400 border border-red-800/50">
              Desde 1943
            </span>
            <span className="tag-badge bg-white/5 text-slate-400 border border-white/10">
              Quito · Ecuador
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="text-white block">Colegio de</span>
            <span className="gradient-text-red block">Contadores y</span>
            <span className="text-white block">Auditores</span>
            <span className="text-slate-400 text-3xl sm:text-4xl lg:text-5xl font-bold block mt-1">de Pichincha</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl"
          >
            El gremio contable más representativo del Ecuador. Impulsamos tu desarrollo profesional con capacitación de excelencia, ética y solidaridad gremial.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            <motion.a
              href="#afiliacion"
              onClick={(e) => { e.preventDefault(); document.querySelector('#afiliacion')?.scrollIntoView({ behavior: 'smooth' }) }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary btn-pulse group"
            >
              <span className="relative z-10">Afiliarme al CCAP</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#servicios"
              onClick={(e) => { e.preventDefault(); document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' }) }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline group"
            >
              <Play size={15} className="group-hover:scale-110 transition-transform" />
              Ver Servicios
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {stats.map((s, i) => (
              <StatCard key={s.label} value={s.value} label={s.label} delay={0.9 + i * 0.1} />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-white transition-colors group"
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase">Explorar</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  )
}
