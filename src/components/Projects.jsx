import { motion, useInView } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Github } from 'lucide-react'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const carouselRef = useRef(null)
  const firstSlideRef = useRef(null)
  const slideRefs = useRef([])

  const [activeFilter, setActiveFilter] = useState('all')
  const [activeIndex, setActiveIndex] = useState(0)
  const [sidePadding, setSidePadding] = useState(0)

  const filters = useMemo(
    () => [
      { key: 'all', label: 'All Projects' },
      { key: 'web', label: 'Web Apps' },
      { key: 'mobile', label: 'Mobile Apps' }
    ],
    []
  )

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    if (activeFilter === 'web') return projects.filter((p) => p.type === 'web' || p.type === 'fullstack')
    return projects.filter((p) => p.type === activeFilter)
  }, [activeFilter])

  const clampIndex = (i) => Math.max(0, Math.min(i, filteredProjects.length - 1))

  const scrollToIndex = (index, behavior = 'smooth') => {
    const container = carouselRef.current
    const slide = slideRefs.current[index]
    if (!container || !slide) return

    const containerWidth = container.clientWidth
    const slideRect = slide.getBoundingClientRect()
    const slideWidth = slideRect.width
    const left = slide.offsetLeft - (containerWidth - slideWidth) / 2
    container.scrollTo({ left, behavior })
  }

  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, filteredProjects.length)
    setActiveIndex(0)

    requestAnimationFrame(() => {
      scrollToIndex(0, 'auto')
    })
  }, [activeFilter])

  useEffect(() => {
    const container = carouselRef.current
    const firstSlide = firstSlideRef.current
    if (!container || !firstSlide) return

    const computePadding = () => {
      const containerWidth = container.clientWidth
      const slideWidth = firstSlide.getBoundingClientRect().width
      const nextPadding = Math.max(0, Math.round((containerWidth - slideWidth) / 2))
      setSidePadding(nextPadding)
    }

    computePadding()

    const ro = new ResizeObserver(() => computePadding())
    ro.observe(container)
    ro.observe(firstSlide)

    return () => ro.disconnect()
  }, [filteredProjects.length])

  useEffect(() => {
    const container = carouselRef.current
    if (!container) return

    let raf = null

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const center = container.scrollLeft + container.clientWidth / 2
        let bestIndex = 0
        let bestDistance = Number.POSITIVE_INFINITY

        for (let i = 0; i < filteredProjects.length; i += 1) {
          const slide = slideRefs.current[i]
          if (!slide) continue
          const slideCenter = slide.offsetLeft + slide.clientWidth / 2
          const dist = Math.abs(slideCenter - center)
          if (dist < bestDistance) {
            bestDistance = dist
            bestIndex = i
          }
        }

        setActiveIndex(bestIndex)
      })
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      container.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [filteredProjects.length])

  return (
    <section id="projects" className="py-20 md:py-32 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Projects</h2>
          <div className="w-20 sm:w-24 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            A selection of my work across web, mobile, and full-stack projects
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveFilter(f.key)}
              className={
                activeFilter === f.key
                  ? 'px-5 py-2 rounded-full bg-primary-500 text-white text-sm font-medium shadow-lg'
                  : 'px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 text-sm font-medium transition-all'
              }
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Centered Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Side Gradients */}
          <div className="absolute inset-y-0 left-0 w-10 sm:w-14 bg-gradient-to-r from-white dark:from-slate-950 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-10 sm:w-14 bg-gradient-to-l from-white dark:from-slate-950 to-transparent pointer-events-none z-10" />

          {/* Navigation Arrows */}
          <div className="flex items-center justify-between absolute inset-y-0 left-0 right-0 sm:-left-2 sm:-right-2 pointer-events-none z-20 px-2 sm:px-0">
            <button
              type="button"
              onClick={() => scrollToIndex(clampIndex(activeIndex - 1))}
              className="pointer-events-auto h-10 w-10 rounded-full bg-white/95 dark:bg-slate-950/90 border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center text-slate-700 dark:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous project"
              disabled={activeIndex === 0}
            >
              <span className="text-xl leading-none">‹</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(clampIndex(activeIndex + 1))}
              className="pointer-events-auto h-10 w-10 rounded-full bg-white/95 dark:bg-slate-950/90 border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center text-slate-700 dark:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next project"
              disabled={activeIndex === filteredProjects.length - 1}
            >
              <span className="text-xl leading-none">›</span>
            </button>
          </div>

          {/* Carousel Container */}
          <div
            ref={carouselRef}
            className="overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div
              className="flex gap-6 sm:gap-8 py-2 items-start"
              style={{ paddingLeft: sidePadding, paddingRight: sidePadding }}
            >
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  ref={(el) => {
                    slideRefs.current[index] = el
                    if (index === 0) firstSlideRef.current = el
                  }}
                  className="snap-center shrink-0 w-[85vw] sm:w-[380px] md:w-[400px] lg:w-[420px]"
                  style={{ scrollSnapStop: 'always' }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {filteredProjects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to project ${i + 1}`}
                className={
                  i === activeIndex
                    ? 'h-2.5 w-6 rounded-full bg-primary-500 transition-all'
                    : 'h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/30 transition-all'
                }
              />
            ))}
          </div>
        </motion.div>

        {/* View More on GitHub Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/GitSharon3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-full font-medium transition-all hover:shadow-lg"
          >
            <Github size={18} />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
