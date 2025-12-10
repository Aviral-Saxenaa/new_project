'use client'

import { useState } from 'react'
import Quiz from '@/components/Quiz'
import ResultScreen from '@/components/ResultScreen'

const questions = [
  {
    id: 1,
    question: "What sound does a cat make?",
    options: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "What would you probably find in your fridge?",
    options: ["Shoes", "Ice Cream", "Books"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What color are bananas?",
    options: ["Blue", "Yellow", "Red"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "How many stars are in the sky?",
    options: ["Two", "Infinite", "One Hundred"],
    correctAnswer: 1
  }
]

export default function HomePage() {
  const [showResult, setShowResult] = useState(false)
  const [finalScore, setFinalScore] = useState(0)

  const handleQuizComplete = (score: number) => {
    setFinalScore(score)
    setShowResult(true)
  }

  const handleRestart = () => {
    setShowResult(false)
    setFinalScore(0)
  }

  if (showResult) {
    return <ResultScreen score={finalScore} onRestart={handleRestart} />
  }

  return <Quiz questions={questions} onComplete={handleQuizComplete} />
}