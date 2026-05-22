import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react'
import { FacebookIcon, YoutubeIcon, LinkedinIcon } from './ui/SocialIcons'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import data from '../data/data.json'

const { organization: org } = data

function ContactInfo({ icon: Icon, label, value, href }) {
  return (
    <a
      href={href || '#'}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="flex items-start gap-3 group"
    >
      <div className="w-9 h-9 flex-shrink-0 bg-red-900/30 rounded-lg flex items-center justify-center group-hover:bg-red-800/40 transition-colors duration-200">
        <Icon size={16} className="text-red-400" />
      </div>
      <div>
        <p className="text-xs text-slate-500 mb-0.5">{label}</p>
        <p className="text-white text-sm font-medium group-hover:text-red-300 transition-colors duration-200">{value}</p>
      </div>
    </a>
  )
}

export default function Contact() {
  const [headerRef, headerVisible] = useScrollAnimation(0.2)
  const [formRef, formVisible] = useScrollAnimation(0.1)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!formData.name.trim()) e.name = 'Nombre requerido'
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) e.email = 'Email inválido'
    if (!formData.message.trim()) e.message = 'Mensaje requerido'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setTimeout(() => setSubmitted(true), 300)
  }

  const handleChange = (field) => (e) => {
    setFormData((p) => ({ ...p, [field]: e.target.value }))
    if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }))
  }

  const inputClass = (field) =>
    `w-full bg-white/5 border ${errors[field] ? 'border-red-500/70' : 'border-white/10'} rounded-lg px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-red-600/60 transition-all duration-200`

  return (
    <section id="contacto" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f45]/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />

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
            Contacto
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Estamos aquí
            <br />
            <span className="gradient-text-red">para ayudarte</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Contáctanos para información sobre afiliación, cursos o cualquier consulta profesional.
          </p>
          <div className="divider-red mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={headerVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="card-gradient-border p-7 mb-5">
              <h3 className="text-white font-bold text-lg mb-6">Información de contacto</h3>
              <div className="space-y-5">
                <ContactInfo icon={MapPin} label="Dirección" value={org.address} />
                <ContactInfo icon={Phone} label="Teléfono" value={org.phone} href={`tel:${org.phone}`} />
                <ContactInfo icon={Mail} label="Email" value={org.email} href={`mailto:${org.email}`} />
              </div>

              <div className="border-t border-white/[0.06] mt-6 pt-6">
                <p className="text-xs text-slate-500 mb-3 uppercase tracking-wider">Síguenos en redes</p>
                <div className="flex gap-3">
                  {[
                    { icon: FacebookIcon, href: org.social.facebook, label: 'Facebook' },
                    { icon: YoutubeIcon, href: org.social.youtube, label: 'YouTube' },
                    { icon: LinkedinIcon, href: org.social.linkedin, label: 'LinkedIn' },
                  ].map(({ icon: Icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={label}
                      className="w-10 h-10 glass rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all duration-200"
                    >
                      <Icon size={17} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Horarios */}
            <div className="glass rounded-xl p-5">
              <h4 className="text-white font-bold text-sm mb-3">Horario de atención</h4>
              <div className="space-y-1.5">
                {[
                  { days: 'Lunes – Viernes', hours: '8:00 AM – 5:00 PM' },
                  { days: 'Sábados', hours: '9:00 AM – 1:00 PM' },
                  { days: 'Domingos', hours: 'Cerrado' },
                ].map(({ days, hours }) => (
                  <div key={days} className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">{days}</span>
                    <span className="text-white font-medium">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 30 }}
            animate={formVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="card-gradient-border p-7"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-12 text-center"
              >
                <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">¡Mensaje enviado!</h3>
                <p className="text-slate-400 text-sm max-w-xs">
                  Hemos recibido tu mensaje. Te responderemos en un plazo de 24-48 horas hábiles.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name:'',email:'',phone:'',subject:'',message:'' }) }}
                  className="btn-outline mt-6 text-sm"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="text-white font-bold text-lg mb-6">Envíanos un mensaje</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Tu nombre completo *"
                      value={formData.name}
                      onChange={handleChange('name')}
                      className={inputClass('name')}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Correo electrónico *"
                      value={formData.email}
                      onChange={handleChange('email')}
                      className={inputClass('email')}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <input
                    type="tel"
                    placeholder="Teléfono (opcional)"
                    value={formData.phone}
                    onChange={handleChange('phone')}
                    className={inputClass('phone')}
                  />
                  <select
                    value={formData.subject}
                    onChange={handleChange('subject')}
                    className={`${inputClass('subject')} text-slate-400`}
                  >
                    <option value="" disabled>Selecciona un tema</option>
                    <option value="afiliacion">Afiliación</option>
                    <option value="cursos">Cursos y Capacitación</option>
                    <option value="consulta">Consulta Técnica</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div className="mb-5">
                  <textarea
                    rows={4}
                    placeholder="Tu mensaje *"
                    value={formData.message}
                    onChange={handleChange('message')}
                    className={`${inputClass('message')} resize-none`}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
    </section>
  )
}
