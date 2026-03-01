import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Scroll to top button with progress indicator
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const toggleVisibility = () => {
      // Calculate scroll progress
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(progress)

      // Show button after scrolling 300px
      if (scrollTop > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Calculate circumference and offset for progress ring
  const circumference = 2 * Math.PI * 20
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-0 w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
          aria-label="Back to top"
        >
          {/* Progress Ring SVG */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 44 44"
          >
            {/* Background circle */}
            <circle
              cx="22"
              cy="22"
              r="20"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="3"
            />
            {/* Progress circle */}
            <circle
              cx="22"
              cy="22"
              r="20"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-100"
            />
          </svg>
          
          {/* Arrow Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <ArrowUp 
              size={20} 
              className="text-slate-600 group-hover:text-primary-500 transition-colors duration-300" 
            />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default BackToTop
