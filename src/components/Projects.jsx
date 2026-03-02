import { motion, useInView } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

// Projects showcase section
const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const filters = useMemo(
    () => [
      { key: 'all', label: 'All' },
      { key: 'web', label: 'Web Apps' },
      { key: 'mobile', label: 'Mobile Apps' }
    ],
    []
  )

  const [activeFilter, setActiveFilter] = useState('all')

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    if (activeFilter === 'web') return projects.filter((p) => p.type === 'web' || p.type === 'fullstack')
    return projects.filter((p) => p.type === activeFilter)
  }, [activeFilter])

  const scrollerRef = useRef(null)

  const variantForProject = (p) => (p.type === 'mobile' ? 'mobile' : 'web')

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    requestAnimationFrame(() => {
      scroller.scrollTo({ left: 0, behavior: 'auto' })
    })
  }, [activeFilter])

  return (
    <section id="projects" className="py-20 md:py-32 bg-white dark:bg-slate-950">
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
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-slate-900 dark:text-white">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
            A collection of projects I've worked on, showcasing my skills in web and mobile development, 
            from AI-powered apps to full-stack web applications.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <div
            role="tablist"
            aria-label="Project filters"
            className="relative inline-flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-950/40 backdrop-blur px-2 py-2"
          >
            {filters.map((f) => {
              const isActive = activeFilter === f.key
              return (
                <button
                  key={f.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(f.key)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 ${
                    isActive
                      ? 'text-slate-900 dark:text-white bg-slate-900/5 dark:bg-white/10'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{f.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-10 relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-16 bg-gradient-to-r from-white dark:from-slate-950 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-16 bg-gradient-to-l from-white dark:from-slate-950 to-transparent" />

          <div
            ref={scrollerRef}
            className="no-scrollbar flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 overscroll-x-contain"
            style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
          >
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                data-project-id={project.id}
                className="snap-center shrink-0 w-[85%] sm:w-[70%] md:w-[56%] lg:w-[44%] xl:w-[38%]"
              >
                <ProjectCard
                  project={project}
                  index={index}
                  variant={variantForProject(project)}
                />
              </div>
            ))}
          </div>
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
