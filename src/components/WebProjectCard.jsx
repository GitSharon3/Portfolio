/**
 * WebProjectCard.jsx
 * Displays a web project with image, details, tech stack, and links.
 */

import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

const WebProjectCard = ({ project, onPreview }) => {
  const hasLive = Boolean(project.live) && project.live !== '#'
  const hasGithub = Boolean(project.github) && project.github !== '#'

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45 }}
    >
      <div className="bg-white dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-black/30 overflow-hidden flex flex-col">
        
        {/* Project Preview - compact height to match mobile cards */}
        <div
          className="relative h-[320px] sm:h-[340px] bg-slate-100 dark:bg-slate-900 overflow-hidden cursor-pointer"
          role={onPreview ? 'button' : undefined}
          tabIndex={onPreview ? 0 : undefined}
          aria-label={onPreview ? `Open preview for ${project.title}` : undefined}
          onClick={() => onPreview?.()}
          onKeyDown={(e) => {
            if (!onPreview) return
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onPreview()
            }
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-10">
            <div className="relative h-full max-h-[240px] sm:max-h-[260px] w-full rounded-[0.875rem] sm:rounded-[1rem] bg-slate-900 shadow-2xl p-[2px]">
              <div className="relative w-full h-full rounded-[0.75rem] sm:rounded-[0.9rem] bg-black overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />

          {/* Category badge */}
          <div className="absolute left-3 sm:left-4 bottom-3 sm:bottom-4">
            <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-950/70 text-slate-900 dark:text-white border border-white/60 dark:border-white/10">
              {project.category || 'Web App'}
            </span>
          </div>
        </div>

        {/* Project Content - compact matching mobile card */}
        <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
          
          {/* Title & Description */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>

          {/* Tech Stack - limited tags like mobile */}
          {Array.isArray(project.techStack) && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 4).map((tech, idx) => (
                <span 
                  key={`${tech}-${idx}`} 
                  className="px-2 py-0.5 text-[10px] sm:text-xs font-medium bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 rounded-full"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2 py-0.5 text-[10px] sm:text-xs font-medium bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 rounded-full">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-auto flex gap-2 pt-2">
            
            {/* GitHub Button */}
            <a
              href={hasGithub ? project.github : undefined}
              target={hasGithub ? '_blank' : undefined}
              rel={hasGithub ? 'noopener noreferrer' : undefined}
              aria-disabled={!hasGithub}
              className={
                hasGithub
                  ? 'flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-900 dark:text-white rounded-lg transition-colors duration-300 text-xs font-medium'
                  : 'flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 bg-slate-100/60 dark:bg-white/5 text-slate-400 dark:text-white/30 rounded-lg text-xs font-medium cursor-not-allowed'
              }
              onClick={(e) => {
                if (!hasGithub) e.preventDefault()
              }}
            >
              <Github size={14} />
              GitHub
            </a>
            
            {/* Live Demo Button */}
            <a
              href={hasLive ? project.live : undefined}
              target={hasLive ? '_blank' : undefined}
              rel={hasLive ? 'noopener noreferrer' : undefined}
              aria-disabled={!hasLive}
              className={
                hasLive
                  ? 'flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-300 text-xs font-medium'
                  : 'flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 bg-primary-500/40 text-white/70 rounded-lg text-xs font-medium cursor-not-allowed'
              }
              onClick={(e) => {
                if (!hasLive) e.preventDefault()
              }}
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default WebProjectCard
