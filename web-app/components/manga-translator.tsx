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
import Image from 'next/image'

const loadingQuotes = [
  "Translating manga magic...",
  "Converting speech bubbles...",
  "Decoding Japanese wisdom...",
  "Preparing your manga experience...",
  "Almost there, just a few more panels...",
  "Polishing up the translation...",
  "A pinch of Japanese magic...",
  "Almost done, just give us a sec...",
  "Manga magic in the making...",
  "Your manga experience is just around the corner...",

]

export default function MangaTranslator() {
  const [isDragging, setIsDragging] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [translatedImage, setTranslatedImage] = useState<string | null>(null)
  const [translationMethod, setTranslationMethod] = useState('google')
  const [font, setFont] = useState('animeace_i')

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
    if (!image) {
      setError('Please upload an image first.')
      return
    }

    setIsLoading(true)
    setError(null)

    // Start the loading quotes interval
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % loadingQuotes.length)
    }, 2000)

    try {
      // Convert base64 to blob
      const base64Response = await fetch(image);
      const blob = await base64Response.blob();

      // Create form data
      const formData = new FormData();
      formData.append('image', blob, 'manga.png');
      formData.append('translation_method', translationMethod);
      formData.append('font', font);

      // Make API call
      const response = await fetch('http://provider.gpu.gpufarm.xyz:30180/api/translate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to translate manga');
      }

      // Get the translated image
      const translatedBlob = await response.blob();
      const translatedUrl = URL.createObjectURL(translatedBlob);
      setTranslatedImage(translatedUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to translate manga');
    } finally {
      clearInterval(interval);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#1A1B1E] text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-[#00FF90]"> Otakuverse AI - Manga Translator</h1>
          <p className="text-gray-400">Transform your manga reading experience with AI-powered translation</p>
        </div>

        <div className="flex items-center justify-center space-x-4 py-2">
          <div className="text-center flex items-center gap-2">
            <p className="text-sm text-gray-400">Powered by</p>
            <a href="https://spheron.network" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <Image src="/spheron.svg" alt="Spheron" width={120} height={120} className="p-2 rounded-sm bg-white text-white" />
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
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
              <div className="flex gap-4">
                <Select
                  value={translationMethod}
                  onValueChange={setTranslationMethod}
                >
                  <SelectTrigger className="w-[180px] bg-[#2C2D32] border-0">
                    <SelectValue placeholder="Translation Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google Translate</SelectItem>
                    <SelectItem value="hf">Hugging Face</SelectItem>
                    <SelectItem value="baidu">Baidu</SelectItem>
                    <SelectItem value="bing">Bing</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={font}
                  onValueChange={setFont}
                >
                  <SelectTrigger className="w-[180px] bg-[#2C2D32] border-0">
                    <SelectValue placeholder="Select Font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="animeace_i">Anime Ace</SelectItem>
                    <SelectItem value="mangati">Manga TI</SelectItem>
                    <SelectItem value="ariali">Arial Italic</SelectItem>
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
                onClick={() => setImage(`/examples/0${i}.png`)}
                key={i}
                className="bg-[#25262B] border-0 p-2"
              >
                <img
                  src={`/examples/0${i}.png`}
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
