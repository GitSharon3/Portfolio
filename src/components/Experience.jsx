import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Calendar, Building2, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import { experiences } from '../data/experience'

// Experience section displaying work history with side scrolling
const Experience = () => {
  const ref = useRef(null)
  const scrollContainerRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const container = scrollContainerRef.current
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
    }
  }

  const scroll = (direction) => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = direction === 'left' ? -container.clientWidth : container.clientWidth
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setTimeout(checkScroll, 300)
    }
  }

  return (
    <section id="experience" className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Work Experience</h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            My professional journey and career highlights
          </p>
        </motion.div>

        {/* Scroll Navigation Arrows */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 transition-all duration-300 ${
              canScrollLeft ? 'opacity-100 hover:bg-slate-50 dark:hover:bg-slate-700' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-slate-700 dark:text-slate-300" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 transition-all duration-300 ${
              canScrollRight ? 'opacity-100 hover:bg-slate-50 dark:hover:bg-slate-700' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-6 h-6 text-slate-700 dark:text-slate-300" />
          </button>

          {/* Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="min-w-full snap-center"
              >
                <div className="bg-white dark:bg-slate-950/60 p-8 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-black/30 hover:shadow-xl transition-all duration-300">
                  {/* Job header with role and company */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{experience.role}</h3>
                      <div className="flex items-center gap-2 text-primary-500 font-medium">
                        <Building2 size={18} />
                        {experience.company}
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-1 text-slate-500 dark:text-slate-300 text-sm">
                      <span className="inline-flex items-center gap-1 bg-primary-50 dark:bg-white/10 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full font-medium">
                        <Calendar size={14} />
                        {experience.period}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={14} />
                        {experience.location}
                      </span>
                    </div>
                  </div>

                  {/* Job description */}
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {experience.description}
                  </p>

                  {/* Key Achievements */}
                  {Array.isArray(experience.keyAchievements) && experience.keyAchievements.length > 0 ? (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                        Key Achievements
                      </h4>
                      <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                        {experience.keyAchievements.map((item, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary-500/70 shrink-0" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {/* Skills */}
                  <div className="border-t border-slate-100 dark:border-white/10 pt-6">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                      Technologies & Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 text-sm font-medium bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-primary-50 dark:hover:bg-white/15 hover:text-primary-600 dark:hover:text-primary-300 transition-colors duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {experiences.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-primary-500/30"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
