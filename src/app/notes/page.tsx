'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

const sampleNotes = [
  {
    id: '1',
    title: 'Cardiovascular Pathophysiology',
    subject: 'Cardiology',
    dateCreated: '2024-01-15',
    progress: 85,
    keyTakeaways: [
      'Heart failure mechanisms involve preload, afterload, and contractility',
      'ACE inhibitors reduce both preload and afterload',
      'Beta-blockers improve long-term survival in systolic heart failure'
    ],
    examTraps: [
      'Diastolic heart failure has preserved ejection fraction',
      'Right heart failure causes peripheral edema, not pulmonary edema'
    ],
    clinicalApplications: [
      'BNP levels correlate with heart failure severity',
      'Echo shows wall motion abnormalities in ischemic cardiomyopathy'
    ]
  },
  {
    id: '2',
    title: 'Respiratory System Mechanics',
    subject: 'Pulmonology',
    dateCreated: '2024-01-14',
    progress: 92,
    keyTakeaways: [
      'Boyles law governs ventilation mechanics',
      'Surface tension reduction by surfactant prevents alveolar collapse',
      'Dead space includes anatomical and physiological components'
    ],
    examTraps: [
      'Type II pneumocytes produce surfactant, not type I',
      'Hypoxic vasoconstriction is unique to pulmonary circulation'
    ],
    clinicalApplications: [
      'COPD shows obstructive pattern on PFTs',
      'ARDS characterized by bilateral infiltrates and low compliance'
    ]
  }
]

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedNote, setSelectedNote] = useState(sampleNotes[0])
  const [activeTab, setActiveTab] = useState('overview')

  const filteredNotes = sampleNotes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Smart Notes</h1>
          <p className="text-gray-400">AI-generated clinical notes with high-yield content</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
          📝 Generate New Notes
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <Input
            placeholder="Search notes by title or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-900 border-gray-700 text-white"
          />
        </div>
        <Button variant="outline">Filter by Subject</Button>
        <Button variant="outline">Sort by Date</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Notes List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-semibold text-white">Your Notes ({filteredNotes.length})</h3>
          {filteredNotes.map((note) => (
            <Card
              key={note.id}
              className={`cursor-pointer transition-all duration-200 ${
                selectedNote.id === note.id
                  ? 'bg-gray-800 border-blue-500'
                  : 'bg-gray-900 border-gray-800 hover:border-gray-700'
              }`}
              onClick={() => setSelectedNote(note)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="text-xs">
                    {note.subject}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {new Date(note.dateCreated).toLocaleDateString()}
                  </span>
                </div>
                <CardTitle className="text-sm text-white leading-tight">
                  {note.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Mastery</span>
                    <span className="text-gray-300">{note.progress}%</span>
                  </div>
                  <Progress value={note.progress} className="h-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Note Content */}
        <div className="lg:col-span-3">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white text-xl">{selectedNote.title}</CardTitle>
                  <CardDescription className="text-gray-400 mt-1">
                    {selectedNote.subject} • Created {new Date(selectedNote.dateCreated).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">📥 Export PDF</Button>
                  <Button variant="outline" size="sm">📋 Copy</Button>
                  <Button variant="outline" size="sm">🔊 Audio Summary</Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-6 bg-gray-800">
                  <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                  <TabsTrigger value="takeaways" className="text-xs">Key Points</TabsTrigger>
                  <TabsTrigger value="mechanisms" className="text-xs">Mechanisms</TabsTrigger>
                  <TabsTrigger value="clinical" className="text-xs">Clinical</TabsTrigger>
                  <TabsTrigger value="exams" className="text-xs">Exam Tips</TabsTrigger>
                  <TabsTrigger value="questions" className="text-xs">Practice</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-6">
                  <div className="prose prose-invert max-w-none">
                    <h3 className="text-lg font-semibold text-white mb-4">📊 Content Overview</h3>
                    <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-blue-400">{selectedNote.keyTakeaways.length}</div>
                          <div className="text-sm text-gray-400">Key Takeaways</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-400">{selectedNote.examTraps.length}</div>
                          <div className="text-sm text-gray-400">Exam Traps</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-400">{selectedNote.clinicalApplications.length}</div>
                          <div className="text-sm text-gray-400">Clinical Apps</div>
                        </div>
                      </div>
                      <Separator className="bg-gray-700" />
                      <div className="text-sm text-gray-300">
                        Estimated study time: 25-30 minutes • Difficulty: Intermediate
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="takeaways" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">🎯 Key Takeaways</h3>
                    <div className="space-y-3">
                      {selectedNote.keyTakeaways.map((takeaway, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-gray-800 rounded-lg">
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                            {index + 1}
                          </div>
                          <p className="text-gray-300 leading-relaxed">{takeaway}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="mechanisms" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">⚙️ Pathophysiology & Mechanisms</h3>
                    <div className="bg-gray-800 rounded-lg p-6">
                      <div className="text-center py-8 text-gray-400">
                        <div className="text-4xl mb-4">🔬</div>
                        <p>Detailed mechanism explanations will be generated here based on your uploaded materials.</p>
                        <Button className="mt-4" variant="outline">
                          Generate Mechanisms
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="clinical" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">🏥 Clinical Applications</h3>
                    <div className="space-y-3">
                      {selectedNote.clinicalApplications.map((app, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-gray-800 rounded-lg">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm">
                            ✓
                          </div>
                          <p className="text-gray-300 leading-relaxed">{app}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="exams" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">⚠️ High-Yield Exam Traps</h3>
                    <div className="space-y-3">
                      {selectedNote.examTraps.map((trap, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-orange-900/20 border border-orange-800 rounded-lg">
                          <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm">
                            !
                          </div>
                          <p className="text-orange-200 leading-relaxed">{trap}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="questions" className="mt-6">
                  <div className="text-center py-8 bg-gray-800 rounded-lg">
                    <div className="text-4xl mb-4">🎯</div>
                    <h3 className="text-lg font-semibold text-white mb-2">Practice Questions</h3>
                    <p className="text-gray-400 mb-4">Test your knowledge with AI-generated questions</p>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-600">
                      Start Practice Session
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}