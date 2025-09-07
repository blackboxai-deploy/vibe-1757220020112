'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  subject: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  source?: string
}

const sampleQuestions: Question[] = [
  {
    id: '1',
    question: 'A 65-year-old patient with a history of myocardial infarction presents with shortness of breath and bilateral ankle swelling. Echo shows EF of 35%. What is the most appropriate initial medication?',
    options: [
      'Digoxin',
      'ACE inhibitor',
      'Calcium channel blocker',
      'Beta-blocker'
    ],
    correctAnswer: 1,
    explanation: 'ACE inhibitors are first-line therapy for heart failure with reduced ejection fraction. They improve survival and reduce hospitalizations by reducing preload and afterload.',
    subject: 'Cardiology',
    difficulty: 'Medium',
    source: 'Uploaded: Cardiology Notes.pdf'
  },
  {
    id: '2',
    question: 'Which of the following is the primary mechanism of action for surfactant in the lungs?',
    options: [
      'Increases lung compliance',
      'Reduces surface tension',
      'Prevents infection',
      'Facilitates gas exchange'
    ],
    correctAnswer: 1,
    explanation: 'Surfactant reduces surface tension in alveoli, preventing collapse during expiration and reducing the work of breathing.',
    subject: 'Pulmonology',
    difficulty: 'Easy',
    source: 'Uploaded: Respiratory Physiology.pptx'
  }
]

export default function QuestionsPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')

  const [userAnswers, setUserAnswers] = useState<{[key: string]: number}>({})
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    total: 0
  })

  const currentQuestion = sampleQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / sampleQuestions.length) * 100
  
  const handleAnswerSubmit = () => {
    const selectedIndex = parseInt(selectedAnswer)
    const isCorrect = selectedIndex === currentQuestion.correctAnswer
    
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedIndex
    }))
    
    setSessionStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }))
    
   }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer('')
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
      setSelectedAnswer(userAnswers[sampleQuestions[currentQuestionIndex - 1].id]?.toString() || '')
    }
  }

  const isAnswered = userAnswers.hasOwnProperty(currentQuestion.id)
  const userAnswer = userAnswers[currentQuestion.id]
  const isCorrect = userAnswer === currentQuestion.correctAnswer

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Practice Questions</h1>
          <p className="text-gray-400">Adaptive questions tailored to your learning progress</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-lg font-bold text-white">{sessionStats.correct}/{sessionStats.total}</div>
            <div className="text-xs text-gray-400">Correct</div>
          </div>
          <Button variant="outline">📊 View Analytics</Button>
        </div>
      </div>

      {/* Progress */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Question Progress</span>
            <span className="text-sm text-gray-300">
              {currentQuestionIndex + 1} of {sampleQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question */}
        <div className="lg:col-span-3">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{currentQuestion.subject}</Badge>
                  <Badge 
                    variant="outline"
                    className={
                      currentQuestion.difficulty === 'Easy' 
                        ? 'border-green-500 text-green-400' 
                        : currentQuestion.difficulty === 'Medium'
                        ? 'border-yellow-500 text-yellow-400'
                        : 'border-red-500 text-red-400'
                    }
                  >
                    {currentQuestion.difficulty}
                  </Badge>
                </div>
                {currentQuestion.source && (
                  <Badge variant="outline" className="text-blue-400 border-blue-500">
                    📄 {currentQuestion.source.split(': ')[1]}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-white text-lg leading-relaxed mt-4">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Answer Options */}
              <RadioGroup 
                value={selectedAnswer} 
                onValueChange={setSelectedAnswer}
                disabled={isAnswered}
              >
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center space-x-3 p-4 rounded-lg border transition-all ${
                        isAnswered 
                          ? index === currentQuestion.correctAnswer
                            ? 'border-green-500 bg-green-900/20'
                            : userAnswer === index && index !== currentQuestion.correctAnswer
                            ? 'border-red-500 bg-red-900/20'
                            : 'border-gray-700 bg-gray-800/50'
                          : selectedAnswer === index.toString()
                          ? 'border-blue-500 bg-blue-900/20'
                          : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                      }`}
                    >
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label 
                        htmlFor={`option-${index}`} 
                        className="flex-1 cursor-pointer text-gray-300"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-sm font-semibold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span>{option}</span>
                        </div>
                      </Label>
                      {isAnswered && index === currentQuestion.correctAnswer && (
                        <span className="text-green-400">✓</span>
                      )}
                      {isAnswered && userAnswer === index && index !== currentQuestion.correctAnswer && (
                        <span className="text-red-400">✗</span>
                      )}
                    </div>
                  ))}
                </div>
              </RadioGroup>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  ← Previous
                </Button>

                <div className="space-x-2">
                  {!isAnswered && (
                    <Button
                      onClick={handleAnswerSubmit}
                      disabled={!selectedAnswer}
                      className="bg-gradient-to-r from-blue-500 to-purple-600"
                    >
                      Submit Answer
                    </Button>
                  )}
                  
                  {isAnswered && currentQuestionIndex < sampleQuestions.length - 1 && (
                    <Button
                      onClick={handleNextQuestion}
                      className="bg-gradient-to-r from-green-500 to-emerald-600"
                    >
                      Next Question →
                    </Button>
                  )}

                  {isAnswered && currentQuestionIndex === sampleQuestions.length - 1 && (
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-600">
                      🎉 Complete Session
                    </Button>
                  )}
                </div>
              </div>

              {/* Explanation */}
              {isAnswered && (
                <Card className={`${isCorrect ? 'border-green-700 bg-green-900/10' : 'border-red-700 bg-red-900/10'}`}>
                  <CardContent className="pt-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {isCorrect ? '✓' : '✗'}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold mb-2">
                          <span className={isCorrect ? 'text-green-300' : 'text-red-300'}>
                            {isCorrect ? 'Correct!' : 'Incorrect'}
                          </span>
                          {!isCorrect && (
                            <span className="text-gray-300 ml-2">
                              Correct answer: {String.fromCharCode(65 + currentQuestion.correctAnswer)}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Session Stats */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-sm">Session Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {sessionStats.total > 0 ? Math.round((sessionStats.correct / sessionStats.total) * 100) : 0}%
                </div>
                <div className="text-sm text-gray-400">Accuracy</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Answered</span>
                  <span className="text-white">{sessionStats.total}/{sampleQuestions.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Correct</span>
                  <span className="text-green-400">{sessionStats.correct}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Incorrect</span>
                  <span className="text-red-400">{sessionStats.total - sessionStats.correct}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Question Navigation */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-sm">Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {sampleQuestions.map((_, index) => (
                  <Button
                    key={index}
                    variant={index === currentQuestionIndex ? "default" : "outline"}
                    size="sm"
                    className={`w-10 h-10 p-0 ${
                      userAnswers.hasOwnProperty(sampleQuestions[index].id)
                        ? userAnswers[sampleQuestions[index].id] === sampleQuestions[index].correctAnswer
                          ? 'border-green-500 text-green-400'
                          : 'border-red-500 text-red-400'
                        : ''
                    }`}
                    onClick={() => setCurrentQuestionIndex(index)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                🎯 Generate More Questions
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                📝 Review Incorrect
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                📊 Subject Breakdown
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                🔄 Restart Session
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}