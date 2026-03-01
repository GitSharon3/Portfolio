import { useState, useEffect } from 'react'

// Custom hook for typewriter text animation effect
export const useTypewriter = (texts, speed = 100, deleteSpeed = 50, pauseTime = 2000) => {
  const [displayText, setDisplayText] = useState('')
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const currentText = texts[currentTextIndex]

    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false)
        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        setIndex(0)
      } else {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length - 1))
        }, deleteSpeed)
        return () => clearTimeout(timeout)
      }
    } else {
      if (displayText === currentText) {
        const timeout = setTimeout(() => {
          setIsDeleting(true)
        }, pauseTime)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, index + 1))
          setIndex((prev) => prev + 1)
        }, speed)
        return () => clearTimeout(timeout)
      }
    }
  }, [displayText, index, isDeleting, currentTextIndex, texts, speed, deleteSpeed, pauseTime])

  return displayText
}

export default useTypewriter
