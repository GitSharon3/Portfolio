import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award, Briefcase, GraduationCap, Code } from 'lucide-react'

// About section with bio and achievements
const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Key achievements data
  const achievements = [
    { icon: Briefcase, title: "Internship", desc: "EXOTRAC LLC - Yard Management System" },
    { icon: GraduationCap, title: "Education", desc: "CSIT Bachelor's Student" },
    { icon: Code, title: "Projects", desc: "BiruwaSmart AI - Plant Identification App" },
    { icon: Award, title: "Expertise", desc: "Flutter, Django, TensorFlow, React" },
  ]

  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-medium">Get To Know Me</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">About Me</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Profile image with decorative background */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-2 md:order-1"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary-500/20 to-primary-600/20 p-2">
              <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                <div className="text-center px-4">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mb-4">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">SK</span>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm">Add your profile picture here</p>
                </div>
              </div>
            </div>
            {/* Decorative blur effects */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-500/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary-600/20 rounded-full blur-2xl" />
          </motion.div>

          {/* Bio and achievements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-1 md:order-2"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
              I'm Sharon Kadariya, a <span className="gradient-text">CSIT Student</span> passionate about technology
            </h3>
            <p className="text-slate-600 mb-4 md:mb-6 leading-relaxed text-sm sm:text-base text-center md:text-left">
              Currently pursuing my Bachelor's degree in Computer Science and Information Technology (CSIT). 
              I'm deeply passionate about full-stack development, artificial intelligence, and mobile app development.
            </p>
            <p className="text-slate-600 mb-6 md:mb-8 leading-relaxed text-sm sm:text-base text-center md:text-left">
              My journey includes valuable internship experience at EXOTRAC LLC where I developed a Yard Management System 
              using React JS and .NET. I enjoy creating innovative solutions that solve real-world problems.
            </p>

            {/* Achievement cards grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {achievements.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="bg-white/50 p-3 sm:p-4 rounded-xl border border-slate-100 hover:border-primary-500/50 transition-colors duration-300"
                >
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-500 mb-2" />
                  <h4 className="font-semibold text-slate-900 text-sm sm:text-base">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
