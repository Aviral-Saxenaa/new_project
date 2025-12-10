'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollingNumber from './ScrollingNumber'

interface ResultScreenProps {
  score: number
  onRestart: () => void
}

const ResultScreen = ({ score, onRestart }: ResultScreenProps) => {
  const [showButton, setShowButton] = useState(false)

  const handleScrollComplete = () => {
    setTimeout(() => setShowButton(true), 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Encouragement Text */}
        <motion.p
          className="text-lg mb-8"
          style={{ color: '#2B7797' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Keep Learning!
        </motion.p>

        {/* Score Display */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 
            className="text-4xl font-bold italic mb-8"
            style={{ 
              fontFamily: "'Playfair Display', serif", 
              color: '#2B7797' 
            }}
          >
            Your Final score is
          </h1>
          
          {/* Lottery-style Scrolling Number */}
          <div className="mb-6">
            <ScrollingNumber 
              finalValue={Math.round(score)} 
              duration={3000}
              onComplete={handleScrollComplete}
            />
          </div>
        </motion.div>

        {/* Restart Button */}
        {showButton && (
          <motion.button
            className="px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            style={{ 
              backgroundColor: '#CDEDF9',
              color: '#2B7797'
            }}
            onClick={onRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Start Again
          </motion.button>
        )}

        {/* Bottom Section with Device Mockup */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div 
            className="rounded-t-3xl mx-auto w-80 h-20 relative"
            style={{ 
              background: 'linear-gradient(to right, #4B5563, #1F2937)'
            }}
          >
            {/* Blue progress bar */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-2 rounded-b-sm"
              style={{ backgroundColor: '#72c6e2' }}
            ></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ResultScreen