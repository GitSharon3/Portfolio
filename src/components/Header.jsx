import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Navigation header with scroll detection and mobile menu
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const mobileMenuRef = useRef(null)

  // Track scroll position and update active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact']
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
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
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
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.a
              href="#home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-lg sm:text-xl font-bold text-slate-900 z-50"
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
                        : 'text-slate-500 hover:text-primary-500'
                    }`}
                  >
                    {link.name}
                  </motion.a>
                )
              })}
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:hidden relative z-50 p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-300"
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
              className="fixed top-0 right-0 bottom-0 w-[280px] max-w-[80vw] bg-white z-40 md:hidden shadow-2xl"
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
                            ? 'text-primary-500 bg-primary-50 border-l-4 border-primary-500' 
                            : 'text-slate-600 hover:text-primary-500 hover:bg-slate-50 border-l-4 border-transparent'
                        }`}
                      >
                        {link.name}
                      </motion.a>
                    )
                  })}
                </nav>
                
                {/* Contact info at bottom */}
                <div className="px-6 pt-4 border-t border-slate-100">
                  <p className="text-sm text-slate-500">
                    sharonkadariya@gmail.com
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
