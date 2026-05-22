import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Events from './components/Events'
import Membership from './components/Membership'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    document.title = 'CCAP — Colegio de Contadores y Auditores de Pichincha'
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-[#0a1628]"
      >
        <Navbar />
        <main>
          <Hero />
          <Services />
          <About />
          <Events />
          <Membership />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  )
}
