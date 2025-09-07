'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  sources?: string[]
}

const suggestedQuestions = [
  'Explain the pathophysiology of heart failure',
  'What are the key differences between Type 1 and Type 2 diabetes?',
  'Summarize the uploaded cardiology lecture notes',
  'Generate practice questions for respiratory system',
  'What are the side effects of ACE inhibitors?',
  'Create a differential diagnosis for chest pain'
]

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI study assistant. I can help you with questions about your uploaded materials or general medical topics. What would you like to learn about today?',
      timestamp: new Date(),
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [materialOnlyMode, setMaterialOnlyMode] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputValue, materialOnlyMode),
        timestamp: new Date(),
        sources: materialOnlyMode ? ['Cardiology Notes.pdf', 'Pathophysiology Lecture.pptx'] : undefined
      }

      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (question: string, materialOnly: boolean): string => {
    if (materialOnly) {
      return `Based on your uploaded materials, here's what I found about "${question}":\n\nAccording to your cardiology notes, this topic covers several key concepts including pathophysiology mechanisms, diagnostic criteria, and treatment approaches. The materials emphasize the importance of understanding underlying mechanisms before memorizing facts.\n\nWould you like me to generate practice questions on this topic or create a mind map to visualize the relationships?`
    } else {
      return `Great question about "${question}"! Let me provide a comprehensive explanation:\n\nThis is a fundamental concept in medicine that involves multiple systems and pathways. The key points to understand are:\n\n1. Underlying mechanisms and pathophysiology\n2. Clinical presentation and diagnostic criteria\n3. Treatment approaches and management strategies\n4. Important clinical correlations and exam considerations\n\nWould you like me to dive deeper into any specific aspect, or shall I generate some practice questions to test your understanding?`
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="space-y-6 h-[calc(100vh-12rem)]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Chat</h1>
          <p className="text-gray-400">Ask questions about your materials or get general medical help</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={materialOnlyMode}
              onCheckedChange={setMaterialOnlyMode}
              id="material-mode"
            />
            <label htmlFor="material-mode" className="text-sm text-gray-300">
              Material-only mode
            </label>
          </div>
          <Button variant="outline">🔄 New Chat</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Sidebar - Suggestions and History */}
        <div className="space-y-6">
          {/* Mode Info */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm">Chat Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className={`p-3 rounded-lg ${materialOnlyMode ? 'bg-blue-900/30 border border-blue-700' : 'bg-gray-800'}`}>
                  <div className="font-medium text-sm text-white">
                    {materialOnlyMode ? '📚 Material Only' : '🌐 General AI'}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {materialOnlyMode 
                      ? 'Answers based on your uploaded files only'
                      : 'General medical knowledge and your materials'
                    }
                  </div>
                </div>
                
                {materialOnlyMode && (
                  <div className="space-y-2">
                    <div className="text-xs text-gray-400">Active Materials:</div>
                    <div className="space-y-1">
                      <Badge variant="secondary" className="text-xs">Cardiology Notes.pdf</Badge>
                      <Badge variant="secondary" className="text-xs">Pathophysiology.pptx</Badge>
                      <Badge variant="secondary" className="text-xs">Pharmacology Guide.doc</Badge>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Suggested Questions */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm">Suggested Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="justify-start h-auto p-2 text-left text-xs text-gray-300 hover:text-white hover:bg-gray-800 w-full"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                📝 Generate Notes
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                🧠 Create Mind Map
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                🎯 Practice Questions
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                🔊 Audio Summary
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 flex flex-col">
          <Card className="bg-gray-900 border-gray-800 flex-1 flex flex-col">
            {/* Messages */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'bg-gray-800 text-gray-300'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="whitespace-pre-wrap leading-relaxed">
                          {message.content}
                        </div>
                        
                        {message.sources && (
                          <div className="pt-2 border-t border-gray-700">
                            <div className="text-xs text-gray-400 mb-1">Sources:</div>
                            <div className="flex flex-wrap gap-1">
                              {message.sources.map((source, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {source}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="text-xs text-gray-500">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <div className="animate-pulse">🤔</div>
                        <span>AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <Separator className="bg-gray-700" />
            
            {/* Input Area */}
            <div className="p-4">
              <div className="flex space-x-4">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={materialOnlyMode 
                    ? "Ask about your uploaded materials..." 
                    : "Ask any medical question..."
                  }
                  className="flex-1 bg-gray-800 border-gray-700 text-white"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  {isLoading ? '⏳' : '➤'}
                </Button>
              </div>
              
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                <span>Press Enter to send, Shift+Enter for new line</span>
                <span>{inputValue.length}/2000</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}