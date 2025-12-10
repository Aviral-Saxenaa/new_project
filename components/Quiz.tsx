'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

interface QuizProps {
  questions: Question[]
  onComplete: (score: number) => void
}

const Quiz = ({ questions, onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [showMascot, setShowMascot] = useState(true)

  useEffect(() => {
    // Show mascot for first question
    if (currentQuestion === 0) {
      setShowMascot(true)
      const timer = setTimeout(() => setShowMascot(false), 3000)
      return () => clearTimeout(timer)
    } else {
      setShowMascot(false)
    }
  }, [currentQuestion])

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...userAnswers]
      newAnswers[currentQuestion] = selectedAnswer
      setUserAnswers(newAnswers)

      if (currentQuestion === questions.length - 1) {
        // Quiz complete - calculate score
        const score = newAnswers.reduce((acc, answer, index) => {
          return acc + (answer === questions[index].correctAnswer ? 1 : 0)
        }, 0)
        onComplete((score / questions.length) * 100)
      } else {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(userAnswers[currentQuestion + 1] ?? null)
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(userAnswers[currentQuestion - 1] ?? null)
    }
  }

  const isLastQuestion = currentQuestion === questions.length - 1
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#72c6e2] via-[#A9DEEE] to-[#CDEDF9] flex items-center justify-center p-4">
      {/* Mascot */}
      <AnimatePresence>
        {showMascot && (
          <motion.div
            className="fixed bottom-8 left-8 z-20"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl p-4 shadow-xl">
              <div className="relative">
                <motion.div
                  className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-2 relative"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {/* Animated Cat Paw */}
                  <div className="relative w-10 h-10">
                    {/* Main paw pad */}
                    <motion.div 
                      className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-5 h-4 bg-pink-400 rounded-full"
                      animate={{ 
                        scaleY: [1, 0.8, 1],
                        scaleX: [1, 1.1, 1]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    {/* Toe pads - animated opening and closing */}
                    <motion.div 
                      className="absolute top-1 left-1 w-2 h-2 bg-pink-400 rounded-full"
                      animate={{ 
                        x: [0, -2, 0],
                        y: [0, -1, 0],
                        scale: [1, 0.8, 1]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div 
                      className="absolute top-1 right-1 w-2 h-2 bg-pink-400 rounded-full"
                      animate={{ 
                        x: [0, 2, 0],
                        y: [0, -1, 0],
                        scale: [1, 0.8, 1]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div 
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-400 rounded-full"
                      animate={{ 
                        y: [0, -2, 0],
                        scale: [1, 0.8, 1]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div 
                      className="absolute top-1 left-1/2 transform -translate-x-1/2 translate-x-1 w-2 h-2 bg-pink-400 rounded-full"
                      animate={{ 
                        x: [0, 2, 0],
                        y: [0, -1, 0],
                        scale: [1, 0.8, 1]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                    />
                    <motion.div 
                      className="absolute top-1 left-1/2 transform -translate-x-1/2 -translate-x-1 w-2 h-2 bg-pink-400 rounded-full"
                      animate={{ 
                        x: [0, -2, 0],
                        y: [0, -1, 0],
                        scale: [1, 0.8, 1]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                    />
                  </div>
                </motion.div>
                <motion.div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap"
                  style={{ backgroundColor: '#2B7797' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Best of Luck!
                  <div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent"
                    style={{ borderTopColor: '#2B7797' }}
                  ></div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Quiz Card */}
      <motion.div
        className="w-full max-w-2xl bg-gradient-to-b from-[#F4FDFF] to-white rounded-3xl shadow-2xl overflow-hidden border-2 border-[#A9DEEE]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center">
          <motion.h1
            className="text-4xl font-bold italic mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2B7797' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Test Your Knowledge
          </motion.h1>
          <motion.p
            className="text-gray-600 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Answer all questions to see your results
          </motion.p>
        </div>

        {/* Progress Bar */}
        <div className="px-8 pb-6">
          <div className="flex space-x-2">
            {Array.from({ length: questions.length }).map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 flex-1 rounded-full ${
                  index <= currentQuestion ? '' : 'bg-gray-200'
                }`}
                style={{
                  backgroundColor: index <= currentQuestion ? '#2B7797' : '#e5e7eb'
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              />
            ))}
          </div>
        </div>

        {/* Question Section */}
        <div className="px-8 pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {/* Question */}
              <div 
                className="rounded-xl p-4 mb-6"
                style={{ 
                  background: `linear-gradient(135deg, #CDEDF9 0%, ${
                    currentQuestion === 0 ? '#CDEDF9' :
                    currentQuestion === 1 ? '#B8E5F4' :
                    currentQuestion === 2 ? '#A3DCEF' :
                    '#8FD4EA'
                  } 100%)`
                }}
              >
                <h2 className="text-lg font-medium text-center" style={{ color: '#2B7797' }}>
                  {currentQuestion + 1}. {questions[currentQuestion].question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ${
                      selectedAnswer === index
                        ? 'border-[#2B7797] text-[#2B7797]'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                    style={{
                      backgroundColor: selectedAnswer === index ? '#F1FCFF' : '#F1FCFF'
                    }}
                    onClick={() => handleAnswerSelect(index)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <motion.button
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                currentQuestion === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'hover:bg-blue-50'
              }`}
              style={{
                color: currentQuestion === 0 ? '#9ca3af' : '#2B7797'
              }}
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              whileHover={currentQuestion > 0 ? { scale: 1.05 } : {}}
              whileTap={currentQuestion > 0 ? { scale: 0.95 } : {}}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {isLastQuestion ? (
              <motion.button
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedAnswer !== null
                    ? 'hover:opacity-80'
                    : 'cursor-not-allowed'
                }`}
                style={{
                  backgroundColor: selectedAnswer !== null ? '#CDEDF9' : '#e5e7eb',
                  color: selectedAnswer !== null ? '#2B7797' : '#9ca3af'
                }}
                onClick={handleNext}
                disabled={selectedAnswer === null}
                whileHover={selectedAnswer !== null ? { scale: 1.05 } : {}}
                whileTap={selectedAnswer !== null ? { scale: 0.95 } : {}}
              >
                Submit
              </motion.button>
            ) : (
              <motion.button
                className="flex items-center space-x-2 hover:bg-blue-50 px-6 py-3 rounded-lg transition-all duration-200"
                style={{ color: '#2B7797' }}
                onClick={handleNext}
                disabled={selectedAnswer === null}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Quiz