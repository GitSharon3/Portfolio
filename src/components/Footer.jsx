import { Github, Linkedin, Heart, MessageCircle } from 'lucide-react'

// Footer with quick links and social connections
const Footer = () => {
  const currentYear = new Date().getFullYear()

  // Quick navigation links
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  // Social media links
  const socialLinks = [
    { icon: Github, href: 'https://github.com/GitSharon3', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/sharon-kadariya-9009851b5/', label: 'LinkedIn' },
    { icon: MessageCircle, href: 'mailto:sharondotkadariyaa@gmail.com?subject=Portfolio%20Inquiry&body=Hi%20Sharon%2C%0A%0A', label: 'Email' },
  ]

  // Smooth scroll to section
  const handleNavClick = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {/* Brand description */}
          <div className="text-center sm:text-left">
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-2xl font-bold gradient-text">
              Sharon Kadariya<span className="text-primary-500"></span>
            </a>
            <p className="text-slate-600 dark:text-slate-300 mt-4 text-sm">
              CSIT Student & Full-Stack Developer passionate about creating innovative web and mobile solutions.
            </p>
          </div>

          {/* Quick links */}
          <div className="text-center sm:text-left">
            <h4 className="text-slate-900 dark:text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div className="text-center sm:text-left sm:col-span-2 md:col-span-1">
            <h4 className="text-slate-900 dark:text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4 justify-center sm:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-100 dark:bg-white/10 hover:bg-primary-500 hover:text-white rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-200 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-slate-100 dark:border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-slate-600 dark:text-slate-300 text-sm flex items-center gap-1">
            © {currentYear} Sharon Kadariya. Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> ,coffee and code.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
