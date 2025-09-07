'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface StudySession {
  id: string
  subject: string
  duration: number
  startTime: Date
  completed: boolean
}

const presetTimers = [
  { name: 'Focus Sprint', duration: 25 * 60, description: 'Standard Pomodoro session' },
  { name: 'Deep Work', duration: 50 * 60, description: 'Extended focus period' },
  { name: 'Quick Review', duration: 15 * 60, description: 'Brief study session' },
  { name: 'Break Time', duration: 5 * 60, description: 'Short break' },
  { name: 'Long Break', duration: 15 * 60, description: 'Extended break' },
]

export default function TimerPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState(presetTimers[0])
  const [currentSubject, setCurrentSubject] = useState('')
  const [sessions, setSessions] = useState<StudySession[]>([
    {
      id: '1',
      subject: 'Cardiology',
      duration: 25 * 60,
      startTime: new Date(Date.now() - 30 * 60 * 1000),
      completed: true
    },
    {
      id: '2', 
      subject: 'Pharmacology',
      duration: 50 * 60,
      startTime: new Date(Date.now() - 60 * 60 * 1000),
      completed: true
    }
  ])
  const [customMinutes, setCustomMinutes] = useState(25)
  
   const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

   useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsActive(false)
            if (currentSubject) {
              const newSession: StudySession = {
                id: Date.now().toString(),
                subject: currentSubject,
                duration: selectedPreset.duration,
                startTime: new Date(),
                completed: true
              }
              setSessions(prev => [newSession, ...prev])
            }
            playNotificationSound()
            return 0
          }
          return time - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, timeLeft, currentSubject, selectedPreset.duration])

  const playNotificationSound = () => {
    // In a real app, you'd play an actual sound file
    console.log('🔔 Session completed!')
  }

 

  const startTimer = () => {
    if (!isActive && currentSubject.trim()) {
      setIsActive(true)
    }
  }

  const pauseTimer = () => {
    setIsActive(false)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(selectedPreset.duration)
  }

  const selectPreset = (preset: typeof presetTimers[0]) => {
    setSelectedPreset(preset)
    setTimeLeft(preset.duration)
    setIsActive(false)
  }

  const setCustomTimer = () => {
    const customPreset = {
      name: 'Custom',
      duration: customMinutes * 60,
      description: `${customMinutes} minute session`
    }
    selectPreset(customPreset)
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = (): number => {
    return ((selectedPreset.duration - timeLeft) / selectedPreset.duration) * 100
  }

  const getTodayStats = () => {
    const today = new Date()
    const todaySessions = sessions.filter(session => 
      session.startTime.toDateString() === today.toDateString() && session.completed
    )
    
    const totalMinutes = todaySessions.reduce((acc, session) => acc + session.duration / 60, 0)
    const sessionCount = todaySessions.length
    
    return { totalMinutes: Math.round(totalMinutes), sessionCount }
  }

  const stats = getTodayStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Study Timer</h1>
          <p className="text-gray-400">Boost productivity with focused study sessions</p>
        </div>
        
        <div className="flex space-x-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-400">{stats.totalMinutes}m</div>
            <div className="text-xs text-gray-400">Today</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">{stats.sessionCount}</div>
            <div className="text-xs text-gray-400">Sessions</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timer */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Badge variant="secondary">{selectedPreset.name}</Badge>
                <Badge variant="outline" className="text-green-400 border-green-400">
                  {selectedPreset.description}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Timer Display */}
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="text-8xl font-mono font-bold text-white mb-4">
                    {formatTime(timeLeft)}
                  </div>
                  <Progress 
                    value={getProgressPercentage()} 
                    className="h-3 mb-6" 
                  />
                  
                  {isActive && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="animate-pulse text-green-400">⚡ Focus Mode</div>
                    </div>
                  )}
                </div>

                {/* Subject Input */}
                <div className="max-w-md mx-auto">
                  <Label htmlFor="subject" className="text-gray-300">Study Subject</Label>
                  <Input
                    id="subject"
                    value={currentSubject}
                    onChange={(e) => setCurrentSubject(e.target.value)}
                    placeholder="What are you studying?"
                    className="bg-gray-800 border-gray-700 text-white text-center text-lg mt-2"
                    disabled={isActive}
                  />
                </div>

                {/* Control Buttons */}
                <div className="flex justify-center space-x-4">
                  {!isActive ? (
                    <Button
                      onClick={startTimer}
                      disabled={!currentSubject.trim() || timeLeft === 0}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-8 py-3 text-lg"
                    >
                      ▶️ Start
                    </Button>
                  ) : (
                    <Button
                      onClick={pauseTimer}
                      variant="outline"
                      className="px-8 py-3 text-lg"
                    >
                      ⏸️ Pause
                    </Button>
                  )}
                  
                  <Button
                    onClick={resetTimer}
                    variant="outline"
                    className="px-8 py-3 text-lg"
                  >
                    🔄 Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Presets & Custom Timer */}
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <Tabs defaultValue="presets">
                <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                  <TabsTrigger value="presets">Preset Timers</TabsTrigger>
                  <TabsTrigger value="custom">Custom Timer</TabsTrigger>
                </TabsList>
                
                <TabsContent value="presets" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {presetTimers.map((preset) => (
                      <Button
                        key={preset.name}
                        variant={selectedPreset.name === preset.name ? "default" : "outline"}
                        className="h-auto p-4 flex flex-col items-center space-y-1"
                        onClick={() => selectPreset(preset)}
                        disabled={isActive}
                      >
                        <div className="font-semibold">{preset.name}</div>
                        <div className="text-xs opacity-75">{Math.floor(preset.duration / 60)}min</div>
                        <div className="text-xs text-center">{preset.description}</div>
                      </Button>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="custom" className="mt-4">
                  <div className="flex items-end space-x-4 max-w-md">
                    <div className="flex-1">
                      <Label htmlFor="custom-minutes">Minutes</Label>
                      <Input
                        id="custom-minutes"
                        type="number"
                        min="1"
                        max="120"
                        value={customMinutes}
                        onChange={(e) => setCustomMinutes(parseInt(e.target.value) || 1)}
                        className="bg-gray-800 border-gray-700 text-white"
                        disabled={isActive}
                      />
                    </div>
                    <Button
                      onClick={setCustomTimer}
                      disabled={isActive}
                      className="bg-gradient-to-r from-purple-500 to-pink-600"
                    >
                      Set Timer
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Session History */}
        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Session History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {sessions.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <div className="text-4xl mb-2">⏰</div>
                    <p>No sessions yet</p>
                    <p className="text-sm">Start your first study session!</p>
                  </div>
                ) : (
                  sessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-white text-sm">
                          {session.subject}
                        </div>
                        <div className="text-xs text-gray-400">
                          {Math.floor(session.duration / 60)} min • {session.startTime.toLocaleTimeString()}
                        </div>
                      </div>
                      <Badge
                        variant={session.completed ? "default" : "secondary"}
                        className={session.completed ? "bg-green-500" : ""}
                      >
                        {session.completed ? "✓" : "○"}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Study Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">This Week</span>
                  <span className="font-semibold text-white">12.5 hrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Average Session</span>
                  <span className="font-semibold text-white">28 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Streak</span>
                  <span className="font-semibold text-green-400">7 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Focus Score</span>
                  <span className="font-semibold text-blue-400">92%</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                📊 View Detailed Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}