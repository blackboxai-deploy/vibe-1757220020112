'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function TestsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Practice Tests</h1>
          <p className="text-gray-400">Full-length assessments with detailed analytics</p>
        </div>
        <Button className="bg-gradient-to-r from-red-500 to-pink-600">
          📋 Create New Test
        </Button>
      </div>

      {/* Coming Soon */}
      <div className="flex items-center justify-center min-h-96">
        <Card className="bg-gray-900 border-gray-800 max-w-md text-center">
          <CardContent className="pt-8">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-white mb-2">Practice Tests</h3>
            <p className="text-gray-400 mb-6">
              Coming soon! Full-length practice exams with timed assessments, 
              detailed result analysis, and performance tracking.
            </p>
            <div className="space-y-2">
              <Badge variant="outline" className="text-blue-400 border-blue-500 block">
                ⏰ Timed assessments
              </Badge>
              <Badge variant="outline" className="text-green-400 border-green-500 block">
                📊 Detailed analytics
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-500 block">
                📈 Performance tracking
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}