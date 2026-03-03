import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

const ProjectCard = ({ project }) => {
  if (!project) return null

  const hasLive = Boolean(project.live) && project.live !== '#'
  const hasGithub = Boolean(project.github) && project.github !== '#'

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45 }}
      className="h-full"
    >
      <div className="h-full bg-white dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-black/30 overflow-hidden">
        <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-900">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            draggable={false}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />
          <div className="absolute left-4 bottom-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-950/70 text-slate-900 dark:text-white border border-white/60 dark:border-white/10">
              {project.category || 'Project'}
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6 flex flex-col gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
              {project.title}
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {Array.isArray(project.techStack) && project.techStack.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={`${tech}-${idx}`}
                  className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-1 flex gap-3">
            <a
              href={hasGithub ? project.github : undefined}
              target={hasGithub ? '_blank' : undefined}
              rel={hasGithub ? 'noopener noreferrer' : undefined}
              aria-disabled={!hasGithub}
              className={
                hasGithub
                  ? 'flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-900 dark:text-white rounded-lg transition-colors duration-300 text-sm font-medium'
                  : 'flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100/60 dark:bg-white/5 text-slate-400 dark:text-white/30 rounded-lg text-sm font-medium cursor-not-allowed'
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
                  ? 'flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-300 text-sm font-medium'
                  : 'flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-primary-500/40 text-white/70 rounded-lg text-sm font-medium cursor-not-allowed'
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
  )
}

export default ProjectCard
