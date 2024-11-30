'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Upload, ImageIcon, Wand2, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { Alert, AlertDescription } from "@/components/ui/alert"

const loadingQuotes = [
  "Translating manga magic...",
  "Converting speech bubbles...",
  "Decoding Japanese wisdom...",
  "Preparing your manga experience...",
  "Almost there, just a few more panels..."
]

export default function MangaTranslator() {
  const [isDragging, setIsDragging] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [translatedImage, setTranslatedImage] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleFile = (file: File) => {
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setError(null)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
        setTranslatedImage(null) // Reset translated image when new image is uploaded
      }
      reader.readAsDataURL(file)
    } else {
      setError('Please upload a PNG or JPG file.')
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)
    // Simulate loading with quote changes
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % loadingQuotes.length)
    }, 1000)
    
    // Simulate processing time of 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    clearInterval(interval)
    setIsLoading(false)
    setTranslatedImage(image) // Set the translated image to be the same as the input image
  }

  return (
    <div className="min-h-screen bg-[#1A1B1E] text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-[#00FF90]">Manga Translator</h1>
          <p className="text-gray-400">Transform your manga reading experience with AI-powered translation</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="bg-[#25262B] border-0 p-6 space-y-6">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "border-2 border-dashed rounded-lg p-12 transition-colors",
                isDragging ? "border-[#00FF90] bg-[#2C2D32]" : "border-gray-600",
                "text-center cursor-pointer"
              )}
            >
              <input
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                {image ? (
                  <motion.img 
                    src={image} 
                    alt="Uploaded manga" 
                    className="max-h-[400px] mx-auto"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 mx-auto text-gray-100" />
                    <div>
                      <p className="text-lg font-medium text-gray-100">Drop your manga panel here</p>
                      <p className="text-sm text-gray-400">or click to upload (PNG or JPG only)</p>
                    </div>
                  </div>
                )}
              </label>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-100">Translation Method</label>
                <Select defaultValue="google">
                  <SelectTrigger className="bg-[#2C2D32] border-0 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google Translate</SelectItem>
                    <SelectItem value="deepl">DeepL</SelectItem>
                    <SelectItem value="custom">Custom Model</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-100">Font Style</label>
                <Select defaultValue="manga">
                  <SelectTrigger className="bg-[#2C2D32] border-0 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manga">Manga Style</SelectItem>
                    <SelectItem value="comic">Comic Sans</SelectItem>
                    <SelectItem value="clean">Clean Modern</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4 text-slate-100">
              <Button 
                variant="outline" 
                className="flex-1 bg-[#2C2D32] border-0 hover:bg-[#353940]"
                onClick={() => {
                  setImage(null)
                  setTranslatedImage(null)
                  setError(null)
                }}
              >
                Clear
              </Button>
              <Button 
                className="flex-1 bg-[#00FF90] text-black hover:bg-[#00CC72]"
                onClick={handleSubmit}
                disabled={!image || isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                  </motion.div>
                ) : (
                  "Translate"
                )}
              </Button>
            </div>
          </Card>

          {/* Output Section */}
          <Card className="bg-[#25262B] border-0 p-6  relative overflow-hidden">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute inset-0 flex items-center justify-center text-center p-6"
                >
                  <div className="space-y-4">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ImageIcon className="w-12 h-12 mx-auto text-[#00FF90] animate-spin" />
                    </motion.div>
                    <p className="text-lg text-gray-300">{loadingQuotes[currentQuote]}</p>
                  </div>
                </motion.div>
              ) : translatedImage ? (
                <motion.img 
                  key="translated"
                  src={translatedImage} 
                  alt="Translated manga" 
                  className=" mx-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex items-center justify-center text-gray-400"
                >
                  <p>Translated content will appear here</p>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>

        {/* Example Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Examples</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[1, 2, 3].map((i) => (
              <Card
                onClick={() => setImage(`/examples/0${i}.jpg`)}
                key={i}
                className="bg-[#25262B] border-0 p-2"
              >
                <img
                  src={`/examples/0${i}.jpg`}
                  alt={`Example ${i}`}
                  className="w-full h-auto rounded"
                />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

