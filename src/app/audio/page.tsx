'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function AudioPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Audio Overviews</h1>
          <p className="text-gray-400">Podcast-style summaries for on-the-go learning</p>
        </div>
        <Button className="bg-gradient-to-r from-green-500 to-emerald-600">
          🎵 Generate Audio Summary
        </Button>
      </div>

      {/* Coming Soon */}
      <div className="flex items-center justify-center min-h-96">
        <Card className="bg-gray-900 border-gray-800 max-w-md text-center">
          <CardContent className="pt-8">
            <div className="text-6xl mb-4">🎵</div>
            <h3 className="text-xl font-semibold text-white mb-2">Audio Overviews</h3>
            <p className="text-gray-400 mb-6">
              Coming soon! Auto-generated podcast-style audio summaries from your 
              uploaded materials, perfect for learning while commuting or exercising.
            </p>
            <div className="space-y-2">
              <Badge variant="outline" className="text-blue-400 border-blue-500 block">
                🎙️ Podcast-style narration
              </Badge>
              <Badge variant="outline" className="text-green-400 border-green-500 block">
                📥 Download for offline listening
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-500 block">
                ⚡ Multiple playback speeds
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}