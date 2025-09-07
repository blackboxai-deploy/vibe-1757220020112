'use client'

import { FileUploadZone } from '@/components/FileUploadZone'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const supportedFormats = [
  { type: 'PDF Documents', icon: '📄', description: 'Research papers, textbooks, lecture notes' },
  { type: 'Word Documents', icon: '📝', description: 'Study guides, assignments, essays' },
  { type: 'PowerPoint', icon: '📊', description: 'Lecture slides, presentations' },
  { type: 'YouTube Videos', icon: '🎥', description: 'Educational videos and tutorials' },
  { type: 'Web Pages', icon: '🌐', description: 'Articles, blogs, online resources' },
  { type: 'Images', icon: '🖼️', description: 'Diagrams, charts, handwritten notes' },
  { type: 'Audio Files', icon: '🎵', description: 'Lectures, podcasts, recorded sessions' },
  { type: 'Text Files', icon: '📃', description: 'Plain text notes and documents' }
]

export default function UploadPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Upload Study Materials</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Upload unlimited files to instantly generate notes, mind maps, audio summaries, 
          practice questions, and flashcards. No restrictions, completely free.
        </p>
        <Badge variant="outline" className="text-green-400 border-green-400 px-4 py-1">
          ✨ No File Size Limits • No Upload Limits • No Generation Limits
        </Badge>
      </div>

      {/* Upload Zone */}
      <div className="max-w-4xl mx-auto">
        <FileUploadZone />
      </div>

      {/* Supported Formats */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          Supported File Types & Sources
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportedFormats.map((format) => (
            <Card key={format.type} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
              <CardHeader className="text-center pb-2">
                <div className="text-4xl mb-2">{format.icon}</div>
                <CardTitle className="text-white text-lg">{format.type}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-400 text-sm">
                  {format.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* What Happens Next */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-800">
          <CardHeader>
            <CardTitle className="text-white text-center text-2xl">
              🚀 What Happens After Upload?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-2xl mx-auto">
                  📝
                </div>
                <h3 className="text-lg font-semibold text-white">Smart Notes</h3>
                <p className="text-sm text-gray-400">
                  AI extracts key concepts, mechanisms, and high-yield information
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-2xl mx-auto">
                  🧠
                </div>
                <h3 className="text-lg font-semibold text-white">Mind Maps</h3>
                <p className="text-sm text-gray-400">
                  Interactive concept maps with clickable nodes and explanations
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-2xl mx-auto">
                  🎵
                </div>
                <h3 className="text-lg font-semibold text-white">Audio Summaries</h3>
                <p className="text-sm text-gray-400">
                  Podcast-style audio for learning on-the-go
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-2xl mx-auto">
                  🎯
                </div>
                <h3 className="text-lg font-semibold text-white">Practice Questions</h3>
                <p className="text-sm text-gray-400">
                  Adaptive questions that adjust to your learning progress
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center text-2xl mx-auto">
                  🔄
                </div>
                <h3 className="text-lg font-semibold text-white">Flashcards</h3>
                <p className="text-sm text-gray-400">
                  Spaced repetition system for efficient memorization
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-2xl mx-auto">
                  📊
                </div>
                <h3 className="text-lg font-semibold text-white">Visual Diagrams</h3>
                <p className="text-sm text-gray-400">
                  Flowcharts, pathology trees, and step-by-step visuals
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-8 py-3">
                🌟 Start Uploading Your First File
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tips */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-center">💡 Pro Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-2">Best File Types</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• High-quality PDFs work best for text extraction</li>
                  <li>• YouTube links with good audio quality</li>
                  <li>• Clear, well-formatted PowerPoint slides</li>
                  <li>• Structured Word documents with headings</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Optimization Tips</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Upload related materials together</li>
                  <li>• Use descriptive file names</li>
                  <li>• Include context in your uploads</li>
                  <li>• Upload multiple formats of the same content</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}