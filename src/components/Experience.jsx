import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calendar, Building2, MapPin } from 'lucide-react'

// Work experience data
const experiences = [
  {
    id: 1,
    role: "Full-Stack Developer",
    company: "Exotrac LLC",
    location: "Remote / USA",
    period: "6 months",
    description: "Worked as a Full-Stack Developer, building and maintaining web applications. Collaborated with the team to develop scalable solutions and implement new features.",
    skills: ["React", ".Net", "JavaScript", "Database Design", "API Development", "PostgreSQL",]
  }
]

// Experience section displaying work history
const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const experience = experiences[0]

  return (
    <section id="experience" className="py-20 md:py-32 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Work Experience</h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            My professional journey and career highlights
          </p>
        </motion.div>

        {/* Experience card with job details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Job header with role and company */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{experience.role}</h3>
                <div className="flex items-center gap-2 text-primary-500 font-medium">
                  <Building2 size={18} />
                  {experience.company}
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end gap-1 text-slate-500 text-sm">
                <span className="inline-flex items-center gap-1 bg-primary-50 text-primary-600 px-3 py-1 rounded-full font-medium">
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
            <p className="text-slate-600 leading-relaxed mb-6">
              {experience.description}
            </p>

            {/* Skills used in this role */}
            <div className="border-t border-slate-100 pt-6">
              <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
                Technologies & Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 text-sm font-medium bg-slate-100 text-slate-700 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
