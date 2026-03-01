import { motion } from 'framer-motion'
import { Mail, Phone, Github, Linkedin, FileDown } from 'lucide-react'
import { useTypewriter } from '../hooks/useTypewriter'

// Hero section with animated intro and typewriter effect
const Hero = () => {
  const titles = [
    "Full-Stack Developer",
    "Mobile App Developer"
  ]
  const typewriterText = useTypewriter(titles, 100, 50, 2000)
  return (
    <section id="home" className="relative min-h-[calc(100vh-80px)] md:min-h-screen flex items-center bg-white overflow-hidden pt-20 md:pt-0">
      {/* Decorative gradient background */}
      <div className="absolute right-0 top-0 w-full md:w-1/2 h-full bg-gradient-to-l from-blue-100/80 via-blue-50/40 to-transparent opacity-50 md:opacity-100" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text content with contact info */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-slate-500 text-xs sm:text-sm tracking-widest uppercase mb-4">
                Hello, my name is
              </p>
              <div className="w-16 h-0.5 bg-slate-400 mb-6 mx-auto md:mx-0" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-slate-900 mb-4"
            >
              Sharon Kadariya
            </motion.h1>

            {/* Typewriter animated subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl text-slate-500 mb-8 h-8"
            >
              {typewriterText}
              <span className="animate-pulse text-primary-500">|</span>
            </motion.h2>

            {/* Contact details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-3 mb-8"
            >
              <div className="flex items-center gap-3 text-slate-600">
                <Mail size={18} className="text-primary-500" />
                <span className="text-sm tracking-wide">sharondotkadariyaa@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Phone size={18} className="text-primary-500" />
                <span className="text-sm tracking-wide">+977 9869785631</span>
              </div>
            </motion.div>

            {/* Resume download button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mb-8"
            >
              <a
                href="src/Pdf/image.png"
                download="Sharon_Kadariya_CV.png"
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors duration-300 text-sm sm:text-base"
              >
                <FileDown size={20} />
                Download Resume
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <a
                href="https://github.com/GitSharon3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-primary-500 transition-colors duration-300"
              >
                <Github size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/sharon-kadariya-9009851b5/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-primary-500 transition-colors duration-300"
              >
                <Linkedin size={22} />
              </a>
            </motion.div>
          </div>

          {/* Profile picture placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Background circle decoration */}
              <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full" />
              
              {/* Profile image placeholder */}
              <div className="relative w-48 h-48 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-slate-800 overflow-hidden flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 sm:w-32 sm:h-32 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-2 sm:mb-4">
                    <span className="text-sm sm:text-lg font-serif text-center px-2">Add CV Photo</span>
                  </div>
                  <p className="text-white/60 text-xs sm:text-sm">Add your photo here</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
