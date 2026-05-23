import { motion } from 'framer-motion'
import { Heart, ExternalLink, ArrowUpRight } from 'lucide-react'
import { FacebookIcon, YoutubeIcon, LinkedinIcon } from './ui/SocialIcons'
import data from '../data/data.json'

const { organization: org } = data
const FOOTER_IMG = 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1600&q=70'

const navLinks = [
  { label: 'Inicio',     href: '#inicio' },
  { label: 'Servicios',  href: '#servicios' },
  { label: 'Nosotros',   href: '#nosotros' },
  { label: 'Eventos',    href: '#eventos' },
  { label: 'Afiliación', href: '#afiliacion' },
  { label: 'Contacto',   href: '#contacto' },
]

export default function Footer() {
  const navClick = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.05]">
      {/* Subtle background image */}
      <div className="absolute inset-0">
        <img src={FOOTER_IMG} alt="" className="w-full h-full object-cover opacity-5" loading="lazy" />
        <div className="absolute inset-0 bg-[#04080f]" style={{ opacity: 0.92 }} />
      </div>
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      {/* Top gold accent line */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-amber-700/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-gradient-to-br from-red-600 to-red-900 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/40">
                <span className="text-white font-black text-sm">CC</span>
              </div>
              <div>
                <span className="text-white font-bold text-base block tracking-wide">CCAP</span>
                <span className="text-slate-600 text-[10px] uppercase tracking-widest">Contadores · Pichincha</span>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-5 max-w-xs">{org.description}</p>

            {/* Social */}
            <div className="flex gap-2.5 mb-6">
              {[
                { icon: FacebookIcon, href: org.social.facebook, label: 'Facebook' },
                { icon: YoutubeIcon,  href: org.social.youtube,  label: 'YouTube' },
                { icon: LinkedinIcon, href: org.social.linkedin, label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl border border-white/[0.07] bg-white/[0.03] flex items-center justify-center text-slate-600 hover:text-white hover:border-white/20 transition-all"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>

            {/* Membership badges */}
            <div>
              <p className="text-[10px] text-slate-700 uppercase tracking-wider mb-2">Miembro internacional de</p>
              <div className="flex gap-2">
                {['IFAC', 'AIC', 'FACPCE'].map((b) => (
                  <span key={b} className="text-xs px-2.5 py-1 rounded border border-amber-800/20 bg-amber-950/20 text-amber-600 font-bold">{b}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Navegación</h5>
            <ul className="space-y-2.5">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <button onClick={() => navClick(href)}
                    className="text-slate-600 hover:text-white text-sm transition-all duration-200 flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Contacto</h5>
            <div className="space-y-3">
              <p className="text-slate-600 text-sm leading-relaxed">{org.address}</p>
              <a href={`tel:${org.phone}`} className="text-slate-600 hover:text-white text-sm block transition-colors">{org.phone}</a>
              <a href={`mailto:${org.email}`} className="text-slate-600 hover:text-white text-sm block transition-colors">{org.email}</a>
            </div>

            <div className="mt-6">
              <motion.a
                href="#afiliacion"
                onClick={(e) => { e.preventDefault(); navClick('#afiliacion') }}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 text-sm font-semibold transition-colors"
              >
                Afiliarme <ArrowUpRight size={14} />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="hr-dim" />

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-700 text-xs">
            © {new Date().getFullYear()} CCAP — Colegio de Contadores y Auditores de Pichincha. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1.5 text-slate-700 text-xs">
            <span>Desarrollado con</span>
            <Heart size={10} className="text-red-700 fill-red-700" />
            <span>por</span>
            <a href="https://socket-studio.com" target="_blank" rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors font-semibold inline-flex items-center gap-0.5"
            >
              Socket Studio <ExternalLink size={9} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
