import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award, Briefcase, GraduationCap, Code } from 'lucide-react'
import profilePhoto from '../assets/dp_image/sharon.png'

// About section with bio and achievements - enhanced with smooth animations
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

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <section id="about" className="py-16 sm:py-20 md:py-32 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-primary-400 font-medium text-sm sm:text-base tracking-wider uppercase"
          >
            Get To Know Me
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 sm:mt-3 text-slate-900 dark:text-white"
          >
            About Me
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-20 h-1 bg-primary-500 mx-auto mt-3 sm:mt-4 rounded-full origin-left"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Profile image with decorative background */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative order-1"
          >
            <motion.div 
              initial={{ opacity: 0, y: 26, rotate: 6 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ rotate: 0.9, scale: 1.02 }}
              className="relative w-full max-w-[260px] sm:max-w-sm md:max-w-md mx-auto"
              style={{ perspective: 1000 }}
            >
              <div className="absolute inset-0 translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3 rounded-[2.25rem] bg-slate-900/10 dark:bg-black/35" />
              <div className="absolute inset-0 -translate-x-2 -translate-y-2 sm:-translate-x-3 sm:-translate-y-3 -rotate-2 rounded-[2.25rem] bg-primary-500/10 dark:bg-white/5" />

              <div className="relative rounded-[2.25rem] bg-white/80 dark:bg-slate-950/70 backdrop-blur border border-white/70 dark:border-white/10 shadow-xl shadow-primary-500/10 dark:shadow-black/30 p-3 sm:p-4">
                <div className="relative aspect-[4/5] rounded-[1.75rem] overflow-hidden">
                  <img
                    src={profilePhoto}
                    alt="Sharon Kadariya"
                    className="w-full h-full object-cover object-[50%_12%] scale-[1.10]"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent dark:from-black/55" />
                </div>

                <div className="mt-3 sm:mt-4 flex items-center justify-between">
                  <div className="h-2 w-20 sm:w-24 rounded-full bg-slate-200/70 dark:bg-white/10" />
                  <div className="h-2 w-10 sm:w-12 rounded-full bg-primary-500/20" />
                </div>
              </div>
            </motion.div>
            {/* Decorative blur effects */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -left-4 w-20 h-20 sm:w-24 sm:h-24 bg-primary-500/30 rounded-full blur-2xl"
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-4 -right-4 w-24 h-24 sm:w-32 sm:h-32 bg-primary-600/30 rounded-full blur-2xl"
            />
          </motion.div>

          {/* Bio and achievements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="order-2"
          >
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center md:text-left leading-tight"
            >
              I'm Sharon Kadariya, a{" "}
              <motion.span 
                className="gradient-text inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                CSIT Student
              </motion.span>{" "}
              passionate about technology
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-slate-600 dark:text-slate-300 mb-4 sm:mb-5 leading-relaxed text-sm sm:text-base text-center md:text-left"
            >
              Currently pursuing my Bachelor's degree in Computer Science and Information Technology (CSIT). 
              I'm deeply passionate about full-stack development, artificial intelligence, and mobile app development.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base text-center md:text-left"
            >
              My journey includes valuable internship experience at EXOTRAC LLC where I developed a Yard Management System 
              using React JS and .NET. I enjoy creating innovative solutions that solve real-world problems.
            </motion.p>

            {/* Achievement cards grid with staggered animation */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-2 gap-3 sm:gap-4"
            >
              {achievements.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white dark:bg-slate-950/60 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-white/10 hover:border-primary-400 dark:hover:border-white/20 cursor-pointer shadow-sm dark:shadow-black/20 hover:shadow-lg transition-colors duration-300"
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary-500 mb-2 sm:mb-3 group-hover:text-primary-600 transition-colors duration-300" />
                  </motion.div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm md:text-base mb-1 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-300/80 leading-snug group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors duration-300">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
