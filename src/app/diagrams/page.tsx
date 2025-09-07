'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function DiagramsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Visual Diagrams</h1>
          <p className="text-gray-400">AI-generated flowcharts and visual learning aids</p>
        </div>
        <Button className="bg-gradient-to-r from-amber-500 to-orange-600">
          📊 Generate Diagram
        </Button>
      </div>

      {/* Coming Soon */}
      <div className="flex items-center justify-center min-h-96">
        <Card className="bg-gray-900 border-gray-800 max-w-md text-center">
          <CardContent className="pt-8">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-white mb-2">Visual Diagrams</h3>
            <p className="text-gray-400 mb-6">
              Coming soon! AI-generated flowcharts, pathology trees, anatomy sketches, 
              and step-by-step visual guides from your materials.
            </p>
            <div className="space-y-2">
              <Badge variant="outline" className="text-blue-400 border-blue-500 block">
                🌊 Flowcharts & pathways
              </Badge>
              <Badge variant="outline" className="text-green-400 border-green-500 block">
                🔬 Pathology trees
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-500 block">
                📐 Anatomy sketches
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}