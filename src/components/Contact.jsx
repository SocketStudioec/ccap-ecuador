import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Send, CheckCircle, Clock } from 'lucide-react'
import { FacebookIcon, YoutubeIcon, LinkedinIcon } from './ui/SocialIcons'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import data from '../data/data.json'

const { organization: org } = data
const CONTACT_IMG = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80'

function ContactInfo({ icon: Icon, label, value, href }) {
  return (
    <a href={href || '#'} target={href?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
      className="flex items-start gap-3 group"
    >
      <div className="w-9 h-9 flex-shrink-0 bg-red-900/30 border border-red-800/30 rounded-lg flex items-center justify-center group-hover:bg-red-800/40 transition-colors">
        <Icon size={15} className="text-red-400" />
      </div>
      <div>
        <p className="text-[10px] text-slate-600 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-white text-sm font-medium group-hover:text-red-300 transition-colors">{value}</p>
      </div>
    </a>
  )
}

export default function Contact() {
  const [headerRef, hVis] = useScrollAnimation(0.15)
  const [formRef,   fVis] = useScrollAnimation(0.1)
  const [form, setForm]   = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent]   = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Nombre requerido'
    if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email = 'Email inválido'
    if (!form.message.trim()) e.message = 'Mensaje requerido'
    return e
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setTimeout(() => setSent(true), 300)
  }
  const handleChange = (f) => (e) => {
    setForm((p) => ({ ...p, [f]: e.target.value }))
    if (errors[f]) setErrors((p) => ({ ...p, [f]: '' }))
  }
  const inputCls = (f) =>
    `w-full bg-white/[0.04] border ${errors[f] ? 'border-red-500/60' : 'border-white/[0.08]'} rounded-xl px-4 py-3 text-white text-sm placeholder-slate-700 focus:outline-none focus:border-red-600/50 transition-all`

  return (
    <section id="contacto" className="relative overflow-hidden">
      {/* ── Image header strip ── */}
      <div className="relative h-64 overflow-hidden">
        <img src={CONTACT_IMG} alt="Sede CCAP Quito" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060e1e]/97 via-[#060e1e]/80 to-[#060e1e]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060e1e] to-transparent" />
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              ref={headerRef}
              initial={{ opacity: 0, y: 20 }} animate={hVis ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="tag-badge bg-red-950/70 text-red-400 border border-red-800/40 mb-3 inline-block">Contacto</span>
              <h2 className="text-white font-black leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                Estamos aquí <span className="gradient-text-red">para ayudarte</span>
              </h2>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="section-padding pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">

            {/* Info panel */}
            <motion.div
              initial={{ opacity: 0, x: -28 }} animate={hVis ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="rounded-2xl border border-white/[0.07] bg-[#080e22]/80 p-7 mb-5">
                <h3 className="text-white font-bold text-lg mb-6">Información de contacto</h3>
                <div className="space-y-5 mb-6">
                  <ContactInfo icon={MapPin} label="Dirección" value={org.address} />
                  <ContactInfo icon={Phone}  label="Teléfono"  value={org.phone} href={`tel:${org.phone}`} />
                  <ContactInfo icon={Mail}   label="Email"     value={org.email} href={`mailto:${org.email}`} />
                </div>
                <hr className="hr-dim mb-6" />
                <p className="text-[10px] text-slate-600 uppercase tracking-wider mb-3">Síguenos</p>
                <div className="flex gap-2.5">
                  {[
                    { icon: FacebookIcon, href: org.social.facebook, label: 'Facebook' },
                    { icon: YoutubeIcon,  href: org.social.youtube,  label: 'YouTube' },
                    { icon: LinkedinIcon, href: org.social.linkedin, label: 'LinkedIn' },
                  ].map(({ icon: Icon, href, label }) => (
                    <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
                      aria-label={label}
                      className="w-10 h-10 bg-white/[0.04] border border-white/[0.07] rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 transition-all"
                    >
                      <Icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Horario */}
              <div className="rounded-2xl border border-amber-800/20 bg-[#0c0800]/50 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={16} className="text-amber-400" />
                  <h4 className="text-white font-bold text-sm">Horario de atención</h4>
                </div>
                {[
                  { d: 'Lunes – Viernes', h: '8:00 AM – 5:00 PM', open: true },
                  { d: 'Sábados',         h: '9:00 AM – 1:00 PM', open: true },
                  { d: 'Domingos',        h: 'Cerrado',            open: false },
                ].map(({ d, h, open }) => (
                  <div key={d} className="flex justify-between items-center py-2 border-b border-white/[0.04] last:border-0">
                    <span className="text-slate-400 text-sm">{d}</span>
                    <span className={`text-sm font-medium ${open ? 'text-white' : 'text-slate-600'}`}>{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: 28 }} animate={fVis ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="rounded-2xl border border-white/[0.07] bg-[#080e22]/80 p-7"
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full py-16 text-center"
                >
                  <div className="w-16 h-16 bg-emerald-900/30 border border-emerald-700/30 rounded-2xl flex items-center justify-center mb-5">
                    <CheckCircle size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">¡Mensaje enviado!</h3>
                  <p className="text-slate-400 text-sm max-w-xs mb-6">
                    Te responderemos en un plazo de 24–48 horas hábiles.
                  </p>
                  <button onClick={() => { setSent(false); setForm({ name:'',email:'',phone:'',subject:'',message:'' }) }} className="btn-outline text-sm">
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 className="text-white font-bold text-lg mb-6">Envíanos un mensaje</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <input type="text" placeholder="Tu nombre completo *" value={form.name} onChange={handleChange('name')} className={inputCls('name')} />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <input type="email" placeholder="Correo electrónico *" value={form.email} onChange={handleChange('email')} className={inputCls('email')} />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <input type="tel" placeholder="Teléfono (opcional)" value={form.phone} onChange={handleChange('phone')} className={inputCls('phone')} />
                    <select value={form.subject} onChange={handleChange('subject')} className={`${inputCls('subject')} text-slate-600`}>
                      <option value="" disabled>Selecciona un tema</option>
                      <option value="afiliacion">Afiliación</option>
                      <option value="cursos">Cursos y Capacitación</option>
                      <option value="consulta">Consulta Técnica</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <textarea rows={5} placeholder="Tu mensaje *" value={form.message} onChange={handleChange('message')} className={`${inputCls('message')} resize-none`} />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>
                  <motion.button
                    type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full justify-center"
                  >
                    <span className="relative z-10">Enviar mensaje</span>
                    <Send size={15} className="relative z-10" />
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
