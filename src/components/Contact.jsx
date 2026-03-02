import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Send, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

// Contact section with form and social links
const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    return newErrors
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setIsSubmitted(false), 3000)
    } else {
      setErrors(newErrors)
    }
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  // Contact information data
  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'sharondotkadariyaa@email.com', href: 'mailto:sharondotkadariyaa@email.com' },
    { icon: Phone, label: 'Phone', value: '+977 9869785631', href: 'tel:+977 9869785631' },
    { icon: MapPin, label: 'Location', value: 'Kathmandu, Nepal', href: '#' },
  ]

  // Social media links
  const socialLinks = [
    { icon: Github, href: 'https://github.com/GitSharon3', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/sharon-kadariya-9009851b5/', label: 'LinkedIn' },
  ]

  return (
    <section id="contact" className="py-20 md:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-medium">Get In Touch</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-slate-900 dark:text-white">Contact Me</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Let's Talk</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-white/50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-white/10 hover:border-primary-500/50 dark:hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{item.label}</p>
                    <p className="font-medium text-slate-900 dark:text-white">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  className="w-12 h-12 bg-white dark:bg-slate-900/60 hover:bg-primary-600 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="bg-white/50 dark:bg-slate-950/40 p-8 rounded-2xl border border-slate-100 dark:border-white/10">
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white dark:bg-slate-950 border rounded-lg text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:border-primary-500 transition-colors duration-300 ${
                    errors.name ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white dark:bg-slate-950 border rounded-lg text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:border-primary-500 transition-colors duration-300 ${
                    errors.email ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white dark:bg-slate-950 border rounded-lg text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:border-primary-500 transition-colors duration-300 resize-none ${
                    errors.message ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Message
              </button>

              {isSubmitted && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-center mt-4"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
