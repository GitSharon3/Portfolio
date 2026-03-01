import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

// Projects showcase section
const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-medium">My Work</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            A collection of projects I've worked on, showcasing my skills in web and mobile development, 
            from AI-powered apps to full-stack web applications.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/GitSharon3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors duration-300"
          >
            View More on GitHub →
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
