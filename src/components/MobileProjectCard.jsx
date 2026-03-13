/**
 * MobileProjectCard.jsx
 * 
 * Component for displaying mobile application projects.
 * Features:
 * - Phone mockup frame with app screenshots
 * - Auto-cycling screenshot preview
 * - Demo Media modal with gallery and video tabs
 * - Technology stack tags
 * - GitHub and Demo Media buttons
 * - Responsive design for all screen sizes
 */

import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Github, X, MonitorPlay, Image as ImageIcon, PlayCircle } from 'lucide-react'

/**
 * Mobile Project Card Component
 * @param {Object} props - Component props
 * @param {Object} props.project - Project data object
 * @param {string} props.project.title - Project name
 * @param {string} props.project.description - Project description
 * @param {string} props.project.image - Project cover image path
 * @param {string} props.project.category - Project category label
 * @param {Array} props.project.techStack - List of technologies used
 * @param {string} props.project.github - GitHub repository URL
 * @param {Object} props.project.media - Media files for the project
 * @param {Array} props.project.media.screenshots - Array of screenshot paths
 * @param {string} props.project.media.video - Video file path
 */
const MobileProjectCard = ({ project, onPreview }) => {
  // Check if GitHub URL is valid
  const hasGithub = Boolean(project.github) && project.github !== '#'

  // Detect mobile viewport (below sm breakpoint of 640px)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Only enable preview on non-mobile (tablet and desktop)
  const previewEnabled = !isMobile && onPreview

  // Extract media files from project data
  const screenshots = useMemo(() => {
    const shots = project?.media?.screenshots
    return Array.isArray(shots) ? shots.filter(Boolean) : []
  }, [project])
  
  const videoSrc = project?.media?.video
  const hasMedia = screenshots.length > 0 || videoSrc

  // State for screenshot cycling and modal
  const [activeShot, setActiveShot] = useState(0)
  const [isMediaOpen, setIsMediaOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('images') // 'images' or 'video'

  /**
   * Auto-cycle through screenshots for phone preview
   * Cycles every 2.5 seconds when modal is closed
   */
  useEffect(() => {
    if (!screenshots.length) return
    if (isMediaOpen) return

    const id = window.setInterval(() => {
      setActiveShot((prev) => (prev + 1) % screenshots.length)
    }, 2500)

    return () => window.clearInterval(id)
  }, [screenshots.length, isMediaOpen])

  /**
   * Handle Escape key to close modal
   * Lock body scroll when modal is open
   */
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMediaOpen(false)
      }
    }

    if (isMediaOpen) {
      window.addEventListener('keydown', onKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isMediaOpen])

  /**
   * Set default tab when opening modal
   * Prefer images if available, otherwise show video
   */
  useEffect(() => {
    if (isMediaOpen) {
      if (screenshots.length > 0) {
        setActiveTab('images')
      } else if (videoSrc) {
        setActiveTab('video')
      }
    }
  }, [isMediaOpen, screenshots.length, videoSrc])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45 }}
      >
        <div className="bg-white dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-black/30 overflow-hidden flex flex-col">
          
          {/* Phone Mockup Preview - shorter container */}
          <div
            className={`relative h-[320px] sm:h-[340px] bg-slate-100 dark:bg-slate-900 overflow-hidden ${previewEnabled ? 'cursor-pointer' : ''}`}
            role={previewEnabled ? 'button' : undefined}
            tabIndex={previewEnabled ? 0 : undefined}
            aria-label={previewEnabled ? `Open preview for ${project.title}` : undefined}
            onClick={() => previewEnabled?.()}
            onTouchEnd={(e) => {
              if (!previewEnabled) return
              e.preventDefault()
              previewEnabled()
            }}
            onKeyDown={(e) => {
              if (!previewEnabled) return
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                previewEnabled()
              }
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-10">
              {/* Phone Frame - very small */}
              <div className="relative h-full max-h-[240px] sm:max-h-[260px] aspect-[9/19] rounded-[0.875rem] sm:rounded-[1rem] bg-slate-900 shadow-2xl p-[2px]">
                {/* Screen */}
                <div className="relative w-full h-full rounded-[0.75rem] sm:rounded-[0.9rem] bg-black overflow-hidden">
                  {/* Top gradient */}
                  <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-b from-black/50 to-transparent z-10" />
                  
                  {/* Screenshot */}
                  <img
                    src={screenshots[activeShot] || project.image}
                    alt={project.title}
                    className="w-full h-full object-contain"
                    draggable={false}
                    loading="lazy"
                  />
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-14 h-[2px] bg-white/30 rounded-full z-10" />
                </div>
              </div>
            </div>
            
            {/* Gradient overlay and category badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent pointer-events-none" />
            <div className="absolute left-3 sm:left-4 bottom-3 sm:bottom-4 pointer-events-auto">
              <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-950/70 text-slate-900 dark:text-white border border-white/60 dark:border-white/10">
                {project.category || 'Mobile App'}
              </span>
            </div>
          </div>

          {/* Project Details - compact */}
          <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
            {/* Title and Description */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                {project.description}
              </p>
            </div>

            {/* Technology Stack Tags */}
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
            <div className="mt-auto flex gap-2">
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
              
              {/* Demo Media Button */}
              <button
                type="button"
                className={
                  hasMedia
                    ? 'flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-300 text-xs font-medium'
                    : 'flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 bg-primary-500/40 text-white/70 rounded-lg text-xs font-medium cursor-not-allowed'
                }
                onClick={() => {
                  if (!hasMedia) return
                  setIsMediaOpen(true)
                }}
                disabled={!hasMedia}
              >
                <MonitorPlay size={14} />
                Demo
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Demo Media Modal */}
      {isMediaOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsMediaOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-5xl bg-white dark:bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200 dark:border-white/10">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300/70">
                  Demo Media
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsMediaOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X size={18} className="text-slate-600 dark:text-slate-200" />
              </button>
            </div>

            {/* Tabs - Only show if both images and video exist */}
            {(screenshots.length > 0 && videoSrc) && (
              <div className="flex border-b border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveTab('images')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors ${
                    activeTab === 'images'
                      ? 'text-primary-500 border-b-2 border-primary-500 bg-primary-50/50 dark:bg-primary-500/10'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                >
                  <ImageIcon size={16} />
                  Images ({screenshots.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('video')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors ${
                    activeTab === 'video'
                      ? 'text-primary-500 border-b-2 border-primary-500 bg-primary-50/50 dark:bg-primary-500/10'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                >
                  <PlayCircle size={16} />
                  Video
                </button>
              </div>
            )}

            {/* Modal Content */}
            <div className="flex-1 overflow-auto">
              {activeTab === 'images' && screenshots.length > 0 ? (
                <div className="flex flex-col h-full">
                  {/* Main Image Display */}
                  <div className="flex-1 flex items-center justify-center bg-slate-950/5 dark:bg-white/5 p-4 min-h-[50vh]">
                    <img
                      src={screenshots[activeShot]}
                      alt={`${project.title} screenshot ${activeShot + 1}`}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                      draggable={false}
                    />
                  </div>

                  {/* Thumbnails Strip */}
                  <div className="border-t border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 p-4">
                    {/* Scrollable Thumbnails */}
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {screenshots.map((src, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveShot(idx)}
                          className={`flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                            idx === activeShot
                              ? 'ring-2 ring-primary-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950'
                              : 'opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={src}
                            alt={`Screenshot ${idx + 1}`}
                            className="w-24 h-36 sm:w-28 sm:h-40 object-cover"
                            draggable={false}
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                    
                    {/* Navigation Controls */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-white/10">
                      <button
                        type="button"
                        onClick={() => setActiveShot((p) => (p - 1 + screenshots.length) % screenshots.length)}
                        className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 text-sm font-medium transition-colors"
                      >
                        Previous
                      </button>
                      <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                        {activeShot + 1} / {screenshots.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveShot((p) => (p + 1) % screenshots.length)}
                        className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 text-sm font-medium transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Video Player */
                <div className="p-4 sm:p-6 flex items-center justify-center bg-black/5 min-h-[50vh]">
                  <video
                    controls
                    src={videoSrc}
                    className="w-full max-w-3xl max-h-[70vh] rounded-lg bg-black"
                    poster={screenshots[0]}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MobileProjectCard
