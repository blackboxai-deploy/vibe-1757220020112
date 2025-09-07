'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { FileUploadZone } from '@/components/FileUploadZone'

const features = [
  {
    title: 'Smart Notes',
    description: 'AI-generated clinical notes with key takeaways, mechanisms, and exam tips',
    icon: '📝',
    href: '/notes',
    stats: '12 topics covered',
    progress: 85,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Mind Maps',
    description: 'Interactive concept maps with clickable nodes and audio explanations',
    icon: '🧠',
    href: '/mindmaps',
    stats: '8 maps created',
    progress: 70,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Audio Overviews',
    description: 'Podcast-style summaries for on-the-go learning',
    icon: '🎵',
    href: '/audio',
    stats: '3.5 hours generated',
    progress: 60,
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Questions',
    description: 'Adaptive practice questions tailored to your learning progress',
    icon: '🎯',
    href: '/questions',
    stats: '145 questions answered',
    progress: 92,
    color: 'from-orange-500 to-red-500'
  },
  {
    title: 'Flashcards',
    description: 'Spaced repetition system for efficient memorization',
    icon: '🔄',
    href: '/flashcards',
    stats: '89 cards mastered',
    progress: 78,
    color: 'from-teal-500 to-blue-500'
  },
  {
    title: 'AI Chat',
    description: 'Chat with AI about your materials or general medical questions',
    icon: '💬',
    href: '/chat',
    stats: '23 conversations',
    progress: 55,
    color: 'from-indigo-500 to-purple-500'
  },
  {
    title: 'Practice Tests',
    description: 'Full-length practice exams with detailed analytics',
    icon: '📋',
    href: '/tests',
    stats: '4 tests completed',
    progress: 45,
    color: 'from-rose-500 to-pink-500'
  },
  {
    title: 'Diagrams',
    description: 'AI-generated flowcharts and visual learning aids',
    icon: '📊',
    href: '/diagrams',
    stats: '15 diagrams created',
    progress: 65,
    color: 'from-amber-500 to-orange-500'
  }
]

const recentActivity = [
  { action: 'Completed Cardiology flashcard set', time: '2 hours ago', type: 'flashcards' },
  { action: 'Generated mind map for Respiratory System', time: '4 hours ago', type: 'mindmap' },
  { action: 'Answered 25 pharmacology questions', time: '6 hours ago', type: 'questions' },
  { action: 'Created audio summary for Neurology notes', time: '1 day ago', type: 'audio' },
  { action: 'Uploaded lecture slides: Pathophysiology', time: '2 days ago', type: 'upload' }
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome to SlateX
          </h1>
          <p className="text-xl text-gray-400">Created by Athie</p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Your ultimate AI-powered study companion. Upload materials, generate notes, create mind maps, 
            practice with adaptive questions, and master your subjects with no limits.
          </p>
        </div>
        
        <Badge variant="outline" className="text-green-400 border-green-400 px-4 py-1">
          ✨ Premium Access - Unlimited Everything
        </Badge>
      </div>

      {/* Quick Upload Section */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span>📤</span> Quick Upload
          </CardTitle>
          <CardDescription className="text-gray-400">
            Upload files to instantly generate notes, mind maps, audio summaries, and practice questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FileUploadZone />
        </CardContent>
      </Card>

      {/* Feature Grid */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Study Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href}>
              <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-200 hover:scale-105 cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl`}>
                      {feature.icon}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.stats}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-lg group-hover:text-gray-200">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-gray-300">{feature.progress}%</span>
                    </div>
                    <Progress value={feature.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="bg-gray-900 border-gray-800 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-gray-400">
              Your latest study sessions and achievements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-300">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.type}
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Study Time</span>
                <span className="font-semibold text-white">47.5 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Questions Answered</span>
                <span className="font-semibold text-white">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Topics Mastered</span>
                <span className="font-semibold text-white">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Files Uploaded</span>
                <span className="font-semibold text-white">89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Accuracy Rate</span>
                <span className="font-semibold text-green-400">84%</span>
              </div>
            </div>
            
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              🎯 Start Studying
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}