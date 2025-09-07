'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

const sampleFlashcards = [
  {
    id: '1',
    front: 'What is the mechanism of action of ACE inhibitors?',
    back: 'ACE inhibitors block the conversion of Angiotensin I to Angiotensin II, reducing vasoconstriction and aldosterone release. This decreases preload and afterload.',
    subject: 'Cardiology',
    mastery: 85,
    lastReviewed: new Date(Date.now() - 24 * 60 * 60 * 1000),
    nextReview: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: '2', 
    front: 'List the classic signs of heart failure',
    back: 'SOB, bilateral ankle swelling, orthopnea, PND, fatigue, S3 gallop, elevated JVP, pulmonary rales',
    subject: 'Cardiology',
    mastery: 60,
    lastReviewed: new Date(Date.now() - 48 * 60 * 60 * 1000),
    nextReview: new Date()
  }
]

export default function FlashcardsPage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [studyMode, setStudyMode] = useState<'review' | 'new' | 'mastery'>('review')

  const currentCard = sampleFlashcards[currentCardIndex]

  const handleNextCard = () => {
    if (currentCardIndex < sampleFlashcards.length - 1) {
      setCurrentCardIndex(prev => prev + 1)
    } else {
      setCurrentCardIndex(0)
    }
    setShowAnswer(false)
  }

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1)
    } else {
      setCurrentCardIndex(sampleFlashcards.length - 1)
    }
    setShowAnswer(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Flashcards</h1>
          <p className="text-gray-400">Spaced repetition system for efficient memorization</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <Button
              variant={studyMode === 'review' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStudyMode('review')}
            >
              📚 Review
            </Button>
            <Button
              variant={studyMode === 'new' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStudyMode('new')}
            >
              ✨ New Cards
            </Button>
            <Button
              variant={studyMode === 'mastery' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStudyMode('mastery')}
            >
              🎯 Mastery
            </Button>
          </div>
        </div>
      </div>

      {/* Progress */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Study Progress</span>
            <span className="text-sm text-gray-300">
              {currentCardIndex + 1} of {sampleFlashcards.length}
            </span>
          </div>
          <Progress value={(currentCardIndex + 1) / sampleFlashcards.length * 100} className="h-2" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Flashcard */}
        <div className="lg:col-span-3">
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              <Card 
                className={`bg-gray-900 border-gray-800 min-h-96 cursor-pointer transition-all duration-300 ${
                  showAnswer ? 'transform rotate-y-180' : 'hover:scale-105'
                }`}
                onClick={() => setShowAnswer(!showAnswer)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{currentCard.subject}</Badge>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-blue-400 border-blue-500">
                        Mastery: {currentCard.mastery}%
                      </Badge>
                      <Progress value={currentCard.mastery} className="w-16 h-2" />
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col justify-center items-center text-center space-y-6 min-h-64">
                  {!showAnswer ? (
                    <>
                      <div className="text-4xl">🤔</div>
                      <div>
                        <h3 className="text-sm text-gray-400 mb-3">QUESTION</h3>
                        <p className="text-xl text-white leading-relaxed">
                          {currentCard.front}
                        </p>
                      </div>
                      <p className="text-gray-500 text-sm">Click to reveal answer</p>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl">💡</div>
                      <div>
                        <h3 className="text-sm text-gray-400 mb-3">ANSWER</h3>
                        <p className="text-lg text-white leading-relaxed">
                          {currentCard.back}
                        </p>
                      </div>
                      <p className="text-gray-500 text-sm">Click to show question</p>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Navigation & Actions */}
              <div className="flex justify-between items-center mt-6">
                <Button variant="outline" onClick={handlePreviousCard}>
                  ← Previous
                </Button>

                {showAnswer && (
                  <div className="flex space-x-2">
                    <Button variant="outline" className="text-red-400 border-red-500">
                      😞 Hard
                    </Button>
                    <Button variant="outline" className="text-yellow-400 border-yellow-500">
                      🤔 Medium
                    </Button>
                    <Button variant="outline" className="text-green-400 border-green-500">
                      😊 Easy
                    </Button>
                  </div>
                )}

                <Button onClick={handleNextCard}>
                  Next →
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Study Stats */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-sm">Study Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">89</div>
                <div className="text-xs text-gray-400">Cards Mastered</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Due Today</span>
                  <span className="text-white">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">New Cards</span>
                  <span className="text-green-400">5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Learning</span>
                  <span className="text-yellow-400">18</span>
                </div>
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
                📝 Create New Cards
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                📊 View Statistics
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                🎯 Focus on Weak Areas
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                📤 Export Cards
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}