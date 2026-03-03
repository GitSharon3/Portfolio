/**
 * ProjectCard.jsx
 * Renders the correct project card based on project type.
 */

import WebProjectCard from './WebProjectCard'
import MobileProjectCard from './MobileProjectCard'

const ProjectCard = ({ project }) => {
  // If no project data, render nothing
  if (!project) return null

  // Check if project is mobile
  const isMobile = project.type === 'mobile'

  // Render mobile project card
  if (isMobile) {
    return <MobileProjectCard project={project} />
  }

  // Otherwise render web/fullstack project card
  return <WebProjectCard project={project} />
}

export default ProjectCard