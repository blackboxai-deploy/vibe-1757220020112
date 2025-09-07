'use client'

import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  const currentTime = new Date().toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  })

  const studyStreak = 7
  const dailyGoal = 80 // percentage
  const currentProgress = 65

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Progress & Goals */}
        <div className="flex items-center space-x-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-300">Daily Goal Progress</span>
              <Badge variant="outline" className="text-xs">
                {currentProgress}% of {dailyGoal}%
              </Badge>
            </div>
            <Progress value={currentProgress} className="w-48 h-2" />
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-lg font-bold text-white">{studyStreak}</div>
              <div className="text-xs text-gray-400">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">2.5h</div>
              <div className="text-xs text-gray-400">Today</div>
            </div>
          </div>
        </div>

        {/* Right Section - User Info & Actions */}
        <div className="flex items-center space-x-4">
          {/* Current Time */}
          <div className="text-sm text-gray-300">
            {currentTime}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="text-xs">
              🔥 Focus Mode
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                  <span className="ml-2 text-sm font-medium">Athie</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700">
                <DropdownMenuLabel className="text-gray-300">Study Profile</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                  📊 View Statistics
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                  ⚙️ Preferences
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                  📥 Export Data
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                  ❓ Help & Support
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Secondary Progress Bar - Study Metrics */}
      <div className="mt-3 pt-3 border-t border-gray-800">
        <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
          <span>Weekly Study Goals</span>
          <span>15 hours / 20 hours target</span>
        </div>
        <div className="flex space-x-1">
          {[75, 90, 65, 80, 95, 70, 85].map((progress, index) => (
            <div key={index} className="flex-1">
              <Progress 
                value={progress} 
                className="h-1" 
                style={{
                  background: `linear-gradient(to right, 
                    ${progress > 80 ? '#10b981' : progress > 60 ? '#f59e0b' : '#ef4444'} ${progress}%, 
                    #374151 ${progress}%)`
                }}
              />
              <div className="text-center mt-1 text-xs">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}