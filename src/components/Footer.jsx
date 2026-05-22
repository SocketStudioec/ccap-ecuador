import { motion } from 'framer-motion'
import { Heart, ExternalLink } from 'lucide-react'
import { FacebookIcon, YoutubeIcon, LinkedinIcon } from './ui/SocialIcons'
import data from '../data/data.json'

const { organization: org } = data

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'Afiliación', href: '#afiliacion' },
  { label: 'Contacto', href: '#contacto' },
]

const legal = [
  { label: 'Política de Privacidad', href: '#' },
  { label: 'Términos de Uso', href: '#' },
  { label: 'Código de Ética', href: '#' },
]

export default function Footer() {
  const navClick = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#080e1e]">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-sm tracking-tight">CC</span>
              </div>
              <div>
                <span className="text-white font-bold text-base block">CCAP</span>
                <span className="text-slate-500 text-[10px] uppercase tracking-widest">Contadores · Pichincha</span>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-4 max-w-xs">
              {org.description}
            </p>
            <div className="flex gap-2.5">
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
                  className="w-9 h-9 glass rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-all duration-200"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h5 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Navegación</h5>
            <ul className="space-y-2">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => navClick(href)}
                    className="text-slate-500 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-block transform"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Contacto</h5>
            <div className="space-y-2.5">
              <p className="text-slate-500 text-sm">{org.address}</p>
              <a href={`tel:${org.phone}`} className="text-slate-500 hover:text-white text-sm block transition-colors">
                {org.phone}
              </a>
              <a href={`mailto:${org.email}`} className="text-slate-500 hover:text-white text-sm block transition-colors">
                {org.email}
              </a>
            </div>

            <div className="mt-5 pt-5 border-t border-white/[0.05]">
              <p className="text-xs text-slate-600 uppercase tracking-wider mb-2">Miembro de</p>
              <div className="flex gap-2 flex-wrap">
                {['IFAC', 'AIC', 'FACPCE'].map((org) => (
                  <span key={org} className="text-xs bg-white/5 text-slate-400 px-2.5 py-1 rounded border border-white/[0.06]">
                    {org}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} CCAP — Colegio de Contadores y Auditores de Pichincha. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1.5 text-slate-600 text-xs">
            <span>Desarrollado con</span>
            <Heart size={11} className="text-red-600 fill-red-600" />
            <span>por</span>
            <a href="https://socket-studio.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors font-medium inline-flex items-center gap-0.5">
              Socket Studio <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
