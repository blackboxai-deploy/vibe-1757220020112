'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function MindMapsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Interactive Mind Maps</h1>
          <p className="text-gray-400">Visual concept maps with clickable nodes and explanations</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-600">
          🧠 Create New Mind Map
        </Button>
      </div>

      {/* Coming Soon */}
      <div className="flex items-center justify-center min-h-96">
        <Card className="bg-gray-900 border-gray-800 max-w-md text-center">
          <CardContent className="pt-8">
            <div className="text-6xl mb-4">🧠</div>
            <h3 className="text-xl font-semibold text-white mb-2">Interactive Mind Maps</h3>
            <p className="text-gray-400 mb-6">
              Coming soon! Create interactive concept maps with clickable nodes, 
              audio explanations, and downloadable PNG exports.
            </p>
            <div className="space-y-2">
              <Badge variant="outline" className="text-blue-400 border-blue-500 block">
                ✨ Clickable expandable nodes
              </Badge>
              <Badge variant="outline" className="text-green-400 border-green-500 block">
                🎵 Audio explanations per node
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-500 block">
                📥 PNG download capability
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}