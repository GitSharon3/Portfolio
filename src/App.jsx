import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import ParticleBackground from './components/ParticleBackground'

// Main App component - Portfolio website root
function App() {
  // Render the main application layout
  return (
    <div className="min-h-screen bg-white">
      {/* Animated particle background */}
      <ParticleBackground />
      {/* Fixed navigation header */}
      <Header />
      <main>
        {/* Hero section with intro */}
        <Hero />
        {/* About me section */}
        <About />
        {/* Work experience */}
        <Experience />
        {/* Skills showcase */}
        <Skills />
        {/* Projects gallery */}
        <Projects />
        {/* Contact information */}
        <Contact />
      </main>
      {/* Footer with links */}
      <Footer />
      {/* Scroll to top button */}
      <BackToTop />
    </div>
  )
}

export default App
