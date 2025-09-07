'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

const navigationItems = [
  {
    label: 'Dashboard',
    href: '/',
    icon: '📊',
    description: 'Overview & Quick Actions'
  },
  {
    label: 'Upload Files',
    href: '/upload',
    icon: '📤',
    description: 'Add Study Materials'
  },
  {
    label: 'Smart Notes',
    href: '/notes',
    icon: '📝',
    description: 'AI-Generated Summaries'
  },
  {
    label: 'Mind Maps',
    href: '/mindmaps',
    icon: '🧠',
    description: 'Interactive Concept Maps'
  },
  {
    label: 'Audio Overviews',
    href: '/audio',
    icon: '🎵',
    description: 'Podcast-Style Summaries'
  },
  {
    label: 'Questions',
    href: '/questions',
    icon: '🎯',
    description: 'Adaptive Practice'
  },
  {
    label: 'Flashcards',
    href: '/flashcards',
    icon: '🔄',
    description: 'Spaced Repetition'
  },
  {
    label: 'Practice Tests',
    href: '/tests',
    icon: '📋',
    description: 'Full Assessments'
  },
  {
    label: 'AI Chat',
    href: '/chat',
    icon: '💬',
    description: 'Ask Questions'
  },
  {
    label: 'Diagrams',
    href: '/diagrams',
    icon: '📊',
    description: 'Visual Learning'
  },
  {
    label: 'Timer',
    href: '/timer',
    icon: '⏱️',
    description: 'Pomodoro Sessions'
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={`bg-gray-900 border-r border-gray-800 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-white">SlateX</h1>
              <p className="text-xs text-gray-400">Created by Athie</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-white"
          >
            {isCollapsed ? '→' : '←'}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-2 px-3">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={`w-full justify-start text-left h-auto p-3 ${
                    isActive 
                      ? 'bg-gray-800 text-white border border-gray-700' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  {!isCollapsed && (
                    <div className="flex-1">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-400">{item.description}</div>
                    </div>
                  )}
                </Button>
              </Link>
            )
          })}
        </nav>

        {!isCollapsed && (
          <>
            <Separator className="my-4 mx-3" />
            
            {/* Stats Section */}
            <div className="px-3 space-y-3">
              <h3 className="text-sm font-medium text-gray-400">Today's Progress</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">Study Time</span>
                  <Badge variant="secondary">2h 30m</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">Questions Answered</span>
                  <Badge variant="secondary">45</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">Topics Mastered</span>
                  <Badge variant="secondary">3</Badge>
                </div>
              </div>
            </div>
          </>
        )}
      </ScrollArea>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-800">
          <div className="text-center">
            <Badge variant="outline" className="text-green-400 border-green-400">
              ✨ Premium - No Limits
            </Badge>
          </div>
        </div>
      )}
    </div>
  )
}