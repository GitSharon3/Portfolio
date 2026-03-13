import { useState, useEffect, useRef } from 'react'
import { Menu, X, Eye, FileDown, Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import cvPdf from '../assets/Pdf/cv.pdf'

// Navigation header with scroll detection and mobile menu
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showResumeModal, setShowResumeModal] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const mobileMenuRef = useRef(null)

  // Initialize theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches
    const shouldUseDark = storedTheme ? storedTheme === 'dark' : Boolean(prefersDark)

    setIsDarkMode(shouldUseDark)
    document.documentElement.classList.toggle('dark', shouldUseDark)
  }, [])

  // Toggle between dark and light mode
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev
      localStorage.setItem('theme', next ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', next)
      return next
    })
  }

  // Track scroll position and update active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact']
      for (const section of sections) {
        const element = document.querySelector(`#${section}`)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle clicks outside mobile menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Navigation links configuration
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  // Smooth scroll to section and close mobile menu
  const handleNavClick = (e, href) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  // Extract section name from href
  const getHrefName = (href) => href.replace('#', '')

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-white/95 backdrop-blur-md shadow-sm dark:bg-slate-950/90 dark:shadow-black/30'
            : 'bg-transparent dark:bg-gradient-to-r dark:from-[#020617]/70 dark:via-[#0b1220]/70 dark:to-[#020617]/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.a
              href="#home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-lg sm:text-xl font-bold text-slate-900 z-50 dark:text-white"
              onClick={(e) => handleNavClick(e, '#home')}
            >
              <span className="text-primary-500">Sharon</span> Kadariya
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => {
                const isActive = activeSection === getHrefName(link.href)
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                      isActive 
                        ? 'text-primary-500' 
                        : 'text-slate-500 hover:text-primary-500 dark:text-slate-200/80 dark:hover:text-white'
                    }`}
                  >
                    {link.name}
                  </motion.a>
                )
              })}

              <motion.a
                href="#resume"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                onClick={(e) => {
                  e.preventDefault()
                  setShowResumeModal(true)
                }}
                className="text-sm font-medium tracking-wide uppercase transition-colors duration-300 text-slate-500 hover:text-primary-500 dark:text-slate-200/80 dark:hover:text-white"
              >
                Resume
              </motion.a>

              {/* Theme toggle */}
              <motion.button
                type="button"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.1 }}
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-300 dark:text-slate-200/80 dark:hover:text-white dark:hover:bg-white/10"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
              </motion.button>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:hidden relative z-50 p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-300 dark:text-slate-200/80 dark:hover:text-white dark:hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 right-0 bottom-0 w-[280px] max-w-[80vw] bg-white z-40 md:hidden shadow-2xl dark:bg-slate-950"
            >
              <div className="flex flex-col h-full pt-20 pb-6">
                <nav className="flex-1 px-6 py-4 space-y-1">
                  {navLinks.map((link, index) => {
                    const isActive = activeSection === getHrefName(link.href)
                    return (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                          isActive 
                            ? 'text-primary-500 bg-primary-50 border-l-4 border-primary-500 dark:bg-white/10' 
                            : 'text-slate-600 hover:text-primary-500 hover:bg-slate-50 border-l-4 border-transparent dark:text-slate-200/80 dark:hover:text-white dark:hover:bg-white/10'
                        }`}
                      >
                        {link.name}
                      </motion.a>
                    )
                  })}

                  <motion.a
                    href="#resume"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    onClick={(e) => {
                      e.preventDefault()
                      setShowResumeModal(true)
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 text-slate-600 hover:text-primary-500 hover:bg-slate-50 border-l-4 border-transparent dark:text-slate-200/80 dark:hover:text-white dark:hover:bg-white/10"
                  >
                    Resume
                  </motion.a>
                  
                  {/* Theme toggle in mobile menu */}
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    onClick={() => {
                      toggleTheme()
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 text-slate-600 hover:text-primary-500 hover:bg-slate-50 border-l-4 border-transparent dark:text-slate-200/80 dark:hover:text-white dark:hover:bg-white/10"
                  >
                    <span>Theme</span>
                    <span className="flex items-center gap-2">
                      {isDarkMode ? (
                        <Moon size={18} className="text-slate-500 dark:text-slate-200/80" />
                      ) : (
                        <Sun size={18} className="text-slate-500 dark:text-slate-200/80" />
                      )}
                    </span>
                  </motion.button>
                </nav>
                
                {/* Contact info at bottom */}
                <div className="px-6 pt-4 border-t border-slate-100 dark:border-white/10">
                  <p className="text-sm text-slate-500 dark:text-slate-200/60">
                    sharonkadariya@gmail.com
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Resume Modal */}
      {showResumeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowResumeModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">Sharon Kadariya - Resume</h3>
              <div className="flex items-center gap-2">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={cvPdf}
                  download="Sharon_Kadariya_CV.pdf"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <FileDown size={16} />
                  Download CV
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowResumeModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-slate-500" />
                </motion.button>
              </div>
            </div>
            
            {/* Resume Preview */}
            <div className="p-4 sm:p-6 bg-slate-50 overflow-hidden max-h-[70vh]">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden max-w-3xl mx-auto h-[60vh]"
              >
                {/* PDF Viewer */}
                <embed
                  src={cvPdf}
                  type="application/pdf"
                  className="w-full h-full"
                  title="Sharon Kadariya - Resume"
                />
              </motion.div>
              
              {/* Fallback message for browsers that don't support PDF embedding */}
              <div className="text-center mt-4 text-sm text-slate-500">
                <p>If the PDF doesn't display, you can download it above.</p>
              </div>
                
              {/* Quick actions below preview */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-slate-100 max-w-3xl mx-auto">
                <motion.a
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={cvPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg hover:border-primary-500 hover:text-primary-600 transition-all duration-300 text-sm font-medium"
                >
                  <Eye size={18} />
                  Open in New Tab
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={cvPdf}
                  download="Sharon_Kadariya_CV.pdf"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-medium"
                >
                  <FileDown size={18} />
                  Download Resume
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default Header
