import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, TrendingUp, Users, BookOpen, Shield, Award, Globe } from 'lucide-react'

/* ──────────────────────────────────────────────
   HERO — Impeccable v3
   Fondo: gradiente oscuro puro + SVG geométrico
   Derecha: composición de glass-cards flotantes
   SIN foto de fondo aplastante
────────────────────────────────────────────── */

const TEAM_THUMB = 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=200&h=200&q=80'

const stats = [
  { value: '80+',    label: 'Años de trayectoria',    icon: Shield },
  { value: '5,000+', label: 'Profesionales afiliados', icon: Users },
  { value: '200+',   label: 'Cursos al año',           icon: BookOpen },
  { value: '98%',    label: 'Satisfacción gremial',    icon: TrendingUp },
]

function Counter({ target }) {
  const [val, setVal]     = useState('0')
  const [started, start]  = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { start(true); io.disconnect() } }, { threshold: 0.6 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const num    = parseInt(target.replace(/\D/g, ''))
    const suffix = target.replace(/[0-9]/g, '')
    let cur = 0
    const step = num / 55
    const t = setInterval(() => {
      cur += step
      if (cur >= num) { setVal(target); clearInterval(t) }
      else setVal(Math.floor(cur) + suffix)
    }, 22)
    return () => clearInterval(t)
  }, [started, target])

  return <span ref={ref}>{val || target}</span>
}

/* ── Background SVG decoration ── */
function GeometricBg() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="glow1" cx="80%" cy="20%" r="40%">
          <stop offset="0%" stopColor="#7f1d1d" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow2" cx="10%" cy="80%" r="35%">
          <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#92400e" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#92400e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow blobs */}
      <rect width="100%" height="100%" fill="url(#glow1)" />
      <rect width="100%" height="100%" fill="url(#glow2)" />
      <rect width="100%" height="100%" fill="url(#glow3)" />

      {/* Subtle grid */}
      <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
        <path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="0.5" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Decorative circles — top right */}
      <circle cx="82%" cy="18%" r="180" fill="none" stroke="rgba(127,29,29,0.08)" strokeWidth="1" />
      <circle cx="82%" cy="18%" r="120" fill="none" stroke="rgba(127,29,29,0.06)" strokeWidth="1" />
      <circle cx="82%" cy="18%" r="60"  fill="none" stroke="rgba(127,29,29,0.1)"  strokeWidth="1" />

      {/* Decorative arc — bottom left */}
      <circle cx="5%"  cy="90%" r="140" fill="none" stroke="rgba(30,58,138,0.07)" strokeWidth="1" />
      <circle cx="5%"  cy="90%" r="80"  fill="none" stroke="rgba(30,58,138,0.05)" strokeWidth="1" />

      {/* Thin diagonal lines */}
      <line x1="0" y1="0" x2="100%" y2="100%" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
      <line x1="100%" y1="0" x2="0" y2="100%" stroke="rgba(255,255,255,0.01)"  strokeWidth="1" />

      {/* Scattered dots */}
      {[
        [72,12],[85,35],[91,55],[68,8],[78,45],
        [15,75],[8,88],[22,95],[5,68],[18,82],
      ].map(([cx,cy], i) => (
        <circle key={i} cx={`${cx}%`} cy={`${cy}%`} r="1.2" fill="rgba(255,255,255,0.06)" />
      ))}
    </svg>
  )
}

/* ── Floating card composition — right panel ── */
function HeroRightPanel() {
  return (
    <div className="relative w-full" style={{ height: '520px' }}>

      {/* ── Main card ── */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute"
        style={{ top: '60px', left: '10%', width: '78%' }}
      >
        <div style={{
          background: 'rgba(13, 25, 55, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: '20px',
          padding: '24px',
        }}>
          {/* Top row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
            {/* Small circular photo */}
            <div style={{
              width: '52px', height: '52px',
              borderRadius: '14px',
              overflow: 'hidden',
              border: '2px solid rgba(127,29,29,0.4)',
              flexShrink: 0,
            }}>
              <img src={TEAM_THUMB} alt="CCAP" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <p style={{ color: '#fff', fontWeight: 800, fontSize: '14px', lineHeight: 1.2 }}>CCAP Ecuador</p>
              <p style={{ color: '#64748b', fontSize: '11px', marginTop: '2px' }}>Institución gremial líder</p>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <span style={{
                background: 'rgba(16,185,129,0.15)',
                border: '1px solid rgba(16,185,129,0.3)',
                color: '#34d399',
                fontSize: '10px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '20px',
                display: 'flex', alignItems: 'center', gap: '5px',
              }}>
                <div style={{ width: '5px', height: '5px', background: '#34d399', borderRadius: '50%' }} />
                ACTIVO
              </span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '18px' }} />

          {/* Stats grid inside card */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { v: '80+', l: 'Años de historia', c: '#f87171' },
              { v: '5,000+', l: 'Afiliados activos', c: '#fbbf24' },
              { v: '200+', l: 'Cursos anuales', c: '#60a5fa' },
              { v: '98%', l: 'Satisfacción', c: '#34d399' },
            ].map(({ v, l, c }) => (
              <div key={l} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '12px 14px',
              }}>
                <p style={{ fontSize: '22px', fontWeight: 900, color: c, lineHeight: 1, fontFamily: "'Playfair Display', serif" }}>{v}</p>
                <p style={{ fontSize: '10px', color: '#475569', marginTop: '4px', lineHeight: 1.3 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── IFAC floating badge — top right ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.85, duration: 0.7 }}
        style={{ position: 'absolute', top: '16px', right: '0%' }}
      >
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          style={{
            background: 'rgba(146,64,14,0.2)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(212,160,23,0.25)',
            borderRadius: '14px',
            padding: '12px 16px',
            minWidth: '140px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
            <div style={{
              width: '28px', height: '28px',
              background: 'linear-gradient(135deg,#d4a017,#92400e)',
              borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Globe size={14} color="white" />
            </div>
            <span style={{ color: '#fbbf24', fontWeight: 800, fontSize: '12px' }}>Miembro IFAC</span>
          </div>
          <p style={{ color: '#78716c', fontSize: '10px', lineHeight: 1.4 }}>Federación Internacional de Contadores</p>
        </motion.div>
      </motion.div>

      {/* ── Members online badge — bottom left ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.7 }}
        style={{ position: 'absolute', bottom: '24px', left: '0%' }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1 }}
          style={{
            background: 'rgba(8,18,40,0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '14px',
            padding: '12px 16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <div style={{ width: '7px', height: '7px', background: '#34d399', borderRadius: '50%', boxShadow: '0 0 6px #34d399' }} />
            <span style={{ color: '#34d399', fontSize: '11px', fontWeight: 700 }}>En línea ahora</span>
          </div>
          <p style={{ color: '#475569', fontSize: '10px' }}>+5,000 profesionales en la red gremial</p>
        </motion.div>
      </motion.div>

      {/* ── Award badge — right mid ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        style={{ position: 'absolute', bottom: '90px', right: '2%' }}
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
          style={{
            background: 'rgba(127,29,29,0.2)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(127,29,29,0.3)',
            borderRadius: '14px',
            padding: '10px 14px',
            textAlign: 'center',
          }}
        >
          <div style={{
            width: '32px', height: '32px',
            background: 'linear-gradient(135deg,#cc2222,#7f1d1d)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 6px',
          }}>
            <Award size={16} color="white" />
          </div>
          <p style={{ color: '#fca5a5', fontWeight: 800, fontSize: '11px', lineHeight: 1.2 }}>Reconocido</p>
          <p style={{ color: '#57534e', fontSize: '10px', marginTop: '2px' }}>AIC · FACPCE</p>
        </motion.div>
      </motion.div>

    </div>
  )
}

export default function Hero() {
  const containerRef = useRef(null)

  return (
    <section
      id="inicio"
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #060e1e 0%, #0b1830 50%, #060e1e 100%)',
      }}
    >
      {/* ── Geometric SVG background ── */}
      <GeometricBg />

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '7rem 2rem 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

          {/* ── LEFT: Copy ── */}
          <div>
            {/* Eyebrow badges */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px', alignItems: 'center' }}
            >
              <span style={{
                background: 'rgba(127,29,29,0.3)', border: '1px solid rgba(127,29,29,0.5)',
                color: '#fca5a5', fontSize: '10px', fontWeight: 700, padding: '4px 10px',
                borderRadius: '9999px', letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>Desde 1943</span>
              <span style={{
                background: 'rgba(146,64,14,0.25)', border: '1px solid rgba(212,160,23,0.3)',
                color: '#fbbf24', fontSize: '10px', fontWeight: 700, padding: '4px 10px',
                borderRadius: '9999px', letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>Quito · Ecuador</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)',
                lineHeight: 1.02,
                marginBottom: '24px',
              }}
            >
              <span style={{ display: 'block', color: '#fff' }}>Colegio de</span>
              <span style={{
                display: 'block',
                background: 'linear-gradient(135deg, #f87171 0%, #b91c1c 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Contadores</span>
              <span style={{ display: 'block', color: '#fff' }}>y Auditores</span>
              <span style={{ display: 'block', color: '#64748b', fontSize: '55%', fontWeight: 700, marginTop: '6px' }}>
                de Pichincha
              </span>
            </motion.h1>

            {/* Gold line divider */}
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ delay: 0.48, duration: 0.6 }}
              style={{ originX: 0, width: '72px', height: '3px', background: 'linear-gradient(90deg,#d4a017,#92400e)', borderRadius: '2px', marginBottom: '24px' }}
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '36px', maxWidth: '440px' }}
            >
              El <strong style={{ color: '#e2e8f0' }}>gremio contable más representativo</strong> del Ecuador. Más de ocho décadas impulsando la excelencia profesional, la ética y la solidaridad gremial.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.68, duration: 0.55 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '48px' }}
            >
              <motion.a
                href="#afiliacion"
                onClick={(e) => { e.preventDefault(); document.querySelector('#afiliacion')?.scrollIntoView({ behavior: 'smooth' }) }}
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                className="btn-primary btn-pulse"
                style={{ fontSize: '0.9rem', padding: '0.85rem 2rem' }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>Afiliarme al CCAP</span>
                <ArrowRight size={16} style={{ position: 'relative', zIndex: 1 }} />
              </motion.a>
              <motion.a
                href="#servicios"
                onClick={(e) => { e.preventDefault(); document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' }) }}
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                className="btn-outline"
                style={{ fontSize: '0.9rem', padding: '0.85rem 1.75rem' }}
              >
                Ver servicios
              </motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.82, duration: 0.7 }}
              style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1px', background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {stats.map(({ value, label, icon: Icon }) => (
                <div key={label} style={{
                  background: 'rgba(6,14,30,0.8)',
                  backdropFilter: 'blur(12px)',
                  padding: '14px 10px',
                  textAlign: 'center',
                }}>
                  <Icon size={14} style={{ color: '#f87171', margin: '0 auto 6px' }} />
                  <div style={{ fontSize: '18px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>
                    <Counter target={value} />
                  </div>
                  <div style={{ fontSize: '9px', color: '#475569', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1.3 }}>
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Floating cards panel ── */}
          <div className="hidden lg:block">
            <HeroRightPanel />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' })}
        style={{
          position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          color: '#334155', background: 'none', border: 'none', cursor: 'pointer',
          transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#94a3b8'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#334155'}
      >
        <span style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Descubrir</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  )
}
