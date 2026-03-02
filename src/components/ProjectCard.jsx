import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

// Individual project card component with hover effects
const ProjectCard = ({ project, index, active = false, variant = 'web' }) => {
  const accentClass =
    variant === 'mobile'
      ? 'from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20'
      : variant === 'fullstack'
        ? 'from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20'
        : 'from-primary-500/10 to-primary-600/10 dark:from-primary-500/20 dark:to-primary-600/20'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className={`bg-white dark:bg-slate-950/60 rounded-2xl overflow-hidden border transition-all duration-300 group ${
        active
          ? 'border-primary-500/40 dark:border-white/20 shadow-2xl shadow-primary-500/10 dark:shadow-black/35'
          : 'border-slate-200 dark:border-white/10 hover:border-primary-500/30 dark:hover:border-white/20'
      }`}
    >
      <div className={`h-52 sm:h-56 bg-gradient-to-br ${accentClass} flex items-center justify-center relative overflow-hidden`}>
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        ) : null}
        <div className="absolute inset-0 bg-white/30 dark:bg-black/10" />
        <div className="relative z-10 text-center p-6">
          <span className="text-xs font-medium text-primary-500 bg-primary-500/10 px-3 py-1 rounded-full">
            {project.category}
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-3">{project.title}</h3>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent dark:from-black/45" />
      </div>

      {/* Project details */}
      <div className="p-6">
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technology tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-900 dark:text-white rounded-lg transition-colors duration-300 text-sm font-medium"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-300 text-sm font-medium"
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
