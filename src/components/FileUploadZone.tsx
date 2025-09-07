'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

interface UploadedFile {
  id: string
  name: string
  size: string
  type: string
  progress: number
  status: 'uploading' | 'completed' | 'error'
}

export function FileUploadZone() {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

   const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files) as File[]
    handleFiles(files)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files) as File[]
      handleFiles(files)
    }
  }, [])

  const handleFiles = (files: File[]) => {
    files.forEach((file) => {
      const fileId = Math.random().toString(36).substring(7)
      const fileSize = (file.size / 1024 / 1024).toFixed(2) + ' MB'
      
      const uploadedFile: UploadedFile = {
        id: fileId,
        name: file.name,
        size: fileSize,
        type: getFileType(file.name),
        progress: 0,
        status: 'uploading'
      }
      
      setUploadedFiles(prev => [...prev, uploadedFile])
      
      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30
        
        setUploadedFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, progress: Math.min(progress, 100) }
            : f
        ))
        
        if (progress >= 100) {
          clearInterval(interval)
          setUploadedFiles(prev => prev.map(f => 
            f.id === fileId 
              ? { ...f, progress: 100, status: 'completed' }
              : f
          ))
        }
      }, 200)
    })
    
    setTimeout(() => setIsUploading(false), 2000)
  }

  const getFileType = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'pdf': return 'PDF'
      case 'doc':
      case 'docx': return 'Word'
      case 'ppt':
      case 'pptx': return 'PowerPoint'
      case 'txt': return 'Text'
      case 'jpg':
      case 'jpeg':
      case 'png': return 'Image'
      default: return 'File'
    }
  }

  const getFileIcon = (type: string): string => {
    switch (type) {
      case 'PDF': return '📄'
      case 'Word': return '📝'
      case 'PowerPoint': return '📊'
      case 'Text': return '📃'
      case 'Image': return '🖼️'
      default: return '📁'
    }
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          isDragOver 
            ? 'border-blue-500 bg-blue-500/10' 
            : 'border-gray-600 hover:border-gray-500'
        }`}
      >
        <div className="space-y-4">
          <div className="text-6xl">📤</div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">
              Drop your files here or click to upload
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Support for PDF, Word, PowerPoint, YouTube links, web pages, and more. 
              No file size or upload limits!
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {['PDF', 'Word', 'PowerPoint', 'YouTube', 'Web Pages', 'Images'].map((type) => (
              <Badge key={type} variant="secondary" className="text-xs">
                {type}
              </Badge>
            ))}
          </div>

          <div className="space-y-3">
            <input
              type="file"
              multiple
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
            />
            <label htmlFor="file-upload">
              <Button className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Choose Files
              </Button>
            </label>
            
            <div className="flex justify-center space-x-4 text-sm">
              <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                📎 Paste YouTube Link
              </Button>
              <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300">
                🌐 Add Web Page
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">
            Uploaded Files ({uploadedFiles.length})
          </h4>
          
          <div className="space-y-3">
            {uploadedFiles.map((file) => (
              <Card key={file.id} className="bg-gray-800 border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="text-2xl">{getFileIcon(file.type)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {file.name}
                      </p>
                      <div className="flex items-center space-x-3 text-xs text-gray-400">
                        <span>{file.size}</span>
                        <Badge variant="outline" className="text-xs">
                          {file.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {file.status === 'uploading' && (
                      <div className="w-32">
                        <Progress value={file.progress} className="h-2" />
                      </div>
                    )}
                    
                    {file.status === 'completed' && (
                      <Badge className="bg-green-500 text-white">
                        ✓ Ready
                      </Badge>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {uploadedFiles.some(f => f.status === 'completed') && (
            <div className="flex justify-center">
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                🚀 Generate All Content
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}