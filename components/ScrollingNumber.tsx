'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ScrollingNumberProps {
  finalValue: number
  duration?: number
  onComplete?: () => void
}

const ScrollingNumber = ({ finalValue, duration = 3000, onComplete }: ScrollingNumberProps) => {
  const [currentValue, setCurrentValue] = useState(0)
  const [isScrolling, setIsScrolling] = useState(true)

  useEffect(() => {
    if (!isScrolling) return

    const startTime = Date.now()
    const startValue = 0
    const endValue = finalValue

    const updateValue = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      if (progress < 0.8) {
        // Fast random scrolling for first 80% of duration
        const randomValue = Math.floor(Math.random() * 100)
        setCurrentValue(randomValue)
      } else {
        // Smooth transition to final value
        const easedProgress = 1 - Math.pow(1 - (progress - 0.8) / 0.2, 3)
        const value = Math.round(startValue + (endValue - startValue) * easedProgress)
        setCurrentValue(value)
      }

      if (progress < 1) {
        requestAnimationFrame(updateValue)
      } else {
        setCurrentValue(endValue)
        setIsScrolling(false)
        onComplete?.()
      }
    }

    updateValue()
  }, [finalValue, duration, onComplete, isScrolling])

  return (
    <motion.div
      className="text-8xl font-bold"
      style={{ color: '#2B7797' }}
      animate={isScrolling ? {
        scale: [1, 1.1, 1],
        rotateY: [0, 5, -5, 0]
      } : {}}
      transition={{
        duration: 0.3,
        repeat: isScrolling ? Infinity : 0,
        ease: "easeInOut"
      }}
    >
      {currentValue}
      <span className="text-4xl">%</span>
    </motion.div>
  )
}

export default ScrollingNumber