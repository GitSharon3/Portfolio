/**
 * ProjectCard.jsx
 * Renders the correct project card based on project type.
 */

import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Github, MonitorPlay, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import WebProjectCard from './WebProjectCard'
import MobileProjectCard from './MobileProjectCard'

const ProjectCard = ({ project }) => {
  // If no project data, render nothing
  if (!project) return null

  // Check if project is mobile
  const isMobile = project.type === 'mobile'

  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const hasLive = Boolean(project.live) && project.live !== '#'
  const hasGithub = Boolean(project.github) && project.github !== '#'

  const techStack = useMemo(() => {
    return Array.isArray(project.techStack) ? project.techStack.filter(Boolean) : []
  }, [project.techStack])

  const previewImage = useMemo(() => {
    const shots = project?.media?.screenshots
    if (Array.isArray(shots) && shots.length > 0) return shots[0]
    return project.image
  }, [project])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsPreviewOpen(false)
    }

    if (isPreviewOpen) {
      window.addEventListener('keydown', onKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isPreviewOpen])

  const openPreview = () => setIsPreviewOpen(true)

  // Render mobile project card
  if (isMobile) {
    return (
      <>
        <MobileProjectCard project={project} onPreview={openPreview} />
        <AnimatePresence>
          {isPreviewOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
              onClick={() => setIsPreviewOpen(false)}
              role="dialog"
              aria-modal="true"
            >
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl dark:bg-slate-950"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200 dark:border-white/10">
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white truncate">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300/70 truncate">
                      {project.category || 'Project'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPreviewOpen(false)}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                    aria-label="Close"
                  >
                    <X size={18} className="text-slate-700 dark:text-slate-200" />
                  </button>
                </div>

                <div className="flex flex-col md:flex-row max-h-[calc(92vh-65px)]">
                  <div className="md:w-1/2 p-3 sm:p-6 bg-slate-100 dark:bg-slate-900">
                    <div className="w-full rounded-xl overflow-hidden bg-black/90 border border-white/10">
                      <div className="h-[280px] sm:h-[360px] md:h-[520px]">
                        <img
                          src={previewImage}
                          alt={project.title}
                          className="w-full h-full object-contain"
                          draggable={false}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="md:w-1/2 p-4 sm:p-6 flex flex-col gap-4 overflow-y-auto">
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        {project.title}
                      </h4>
                      <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {techStack.map((tech, idx) => (
                          <span
                            key={`${tech}-${idx}`}
                            className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto flex flex-col sm:flex-row gap-2">
                      <a
                        href={hasGithub ? project.github : undefined}
                        target={hasGithub ? '_blank' : undefined}
                        rel={hasGithub ? 'noopener noreferrer' : undefined}
                        aria-disabled={!hasGithub}
                        className={
                          hasGithub
                            ? 'flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition-colors text-sm font-medium'
                            : 'flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 text-slate-400 dark:bg-white/10 dark:text-white/30 cursor-not-allowed text-sm font-medium'
                        }
                        onClick={(e) => {
                          if (!hasGithub) e.preventDefault()
                        }}
                      >
                        <Github size={16} />
                        GitHub
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setIsPreviewOpen(false)
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500 text-white hover:bg-primary-600 transition-colors text-sm font-medium"
                      >
                        <MonitorPlay size={16} />
                        Demo Media
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  // Otherwise render web/fullstack project card
  return (
    <>
      <WebProjectCard project={project} onPreview={openPreview} />
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
            onClick={() => setIsPreviewOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl dark:bg-slate-950"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200 dark:border-white/10">
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white truncate">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300/70 truncate">
                    {project.category || 'Project'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X size={18} className="text-slate-700 dark:text-slate-200" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row max-h-[calc(92vh-65px)]">
                <div className="md:w-1/2 p-3 sm:p-6 bg-slate-100 dark:bg-slate-900">
                  <div className="w-full rounded-xl overflow-hidden bg-black/90 border border-white/10">
                    <div className="aspect-[16/10] w-full max-h-[62vh]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-contain"
                        draggable={false}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 p-4 sm:p-6 flex flex-col gap-4 overflow-y-auto">
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {project.title}
                    </h4>
                    <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech, idx) => (
                        <span
                          key={`${tech}-${idx}`}
                          className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto flex flex-col sm:flex-row gap-2">
                    <a
                      href={hasGithub ? project.github : undefined}
                      target={hasGithub ? '_blank' : undefined}
                      rel={hasGithub ? 'noopener noreferrer' : undefined}
                      aria-disabled={!hasGithub}
                      className={
                        hasGithub
                          ? 'flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition-colors text-sm font-medium'
                          : 'flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 text-slate-400 dark:bg-white/10 dark:text-white/30 cursor-not-allowed text-sm font-medium'
                      }
                      onClick={(e) => {
                        if (!hasGithub) e.preventDefault()
                      }}
                    >
                      <Github size={16} />
                      GitHub
                    </a>

                    <a
                      href={hasLive ? project.live : undefined}
                      target={hasLive ? '_blank' : undefined}
                      rel={hasLive ? 'noopener noreferrer' : undefined}
                      aria-disabled={!hasLive}
                      className={
                        hasLive
                          ? 'flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500 text-white hover:bg-primary-600 transition-colors text-sm font-medium'
                          : 'flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500/40 text-white/70 cursor-not-allowed text-sm font-medium'
                      }
                      onClick={(e) => {
                        if (!hasLive) e.preventDefault()
                      }}
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ProjectCard