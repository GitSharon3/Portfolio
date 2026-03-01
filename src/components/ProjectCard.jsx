import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

// Individual project card component with hover effects
const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-primary-500/30 transition-all duration-300 card-hover group"
    >
      {/* Project image placeholder with gradient */}
      <div className="h-48 bg-gradient-to-br from-primary-500/10 to-primary-600/10 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-white/30" />
        <div className="relative z-10 text-center p-6">
          <span className="text-xs font-medium text-primary-500 bg-primary-500/10 px-3 py-1 rounded-full">
            {project.category}
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-3">{project.title}</h3>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-100 via-transparent to-transparent" />
      </div>

      {/* Project details */}
      <div className="p-6">
        <p className="text-slate-600 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technology tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
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
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-lg transition-colors duration-300 text-sm font-medium"
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
