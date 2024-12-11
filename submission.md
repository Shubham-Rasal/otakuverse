---
name: Submission template
about: 'This template covers all the required elements mentioned in the submission
  criteria. '
title: Otakuverse - AI-Powered Manga Translation Platform
labels: ''
assignees: ''

---

# Otakuverse - AI-Powered Manga Translation Platform

## Submitter Information
- **Name:** [Your Name], **Email:** [Your Email]
- **Name:** [Your Name], **Email:** [Your Email]

## Reward Address
[Your wallet address for receiving bounty payments]

## Project Plan
### Project Overview
Otakuverse is an innovative web application that leverages AI to automatically detect and translate text in manga panels. Built on Spheron's decentralized GPU network, it provides fast, reliable, and accurate translations while preserving the original manga art style.

### Key Features
- **Intelligent Text Detection**: Uses advanced AI models to accurately detect text bubbles in manga panels
- **Multiple Translation Options**: Supports various translation methods including Google, HuggingFace, Baidu, and Bing
- **Font Customization**: Multiple manga-style fonts for natural-looking translations
- **Responsive UI**: Modern interface built with Next.js and Tailwind CSS
- **Drag & Drop**: Simple drag-and-drop interface for uploading manga panels

### Technical Architecture

#### Frontend (web-app/)
- **Framework**: Next.js 13+ with App Router
- **UI Library**: Tailwind CSS with Shadcn UI components
- **State Management**: React Hooks
- **Image Processing**: Client-side image handling and preview
- **Environment Variables**: Configurable inference server URL

#### Backend (inference-server/)
- **Framework**: Flask with CORS support
- **AI Models**: 
  - YOLO for bubble detection
  - Manga OCR for text recognition
  - Multiple translation APIs integration
- **Image Processing**: OpenCV and Pillow for image manipulation
- **Font System**: Customizable font rendering system

### Local Development Setup

#### Prerequisites
- Node.js v18+
- Python 3.12+
- CUDA-compatible GPU (recommended)

#### Frontend Setup
1. Navigate to the web app directory:
   ```bash
   cd web-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local`:
   ```
   INFERENCE_SERVER_URL=http://localhost:5000
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

#### Backend Setup
1. Navigate to inference server directory:
   ```bash
   cd inference-server
   ```
2. Create virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the server:
   ```bash
   python app.py
   ```

## Repository
[Provide the link to your project's repository]

## Demo
- **App Link:** [URL to the live demo of your project]
- **Video Demo:** [URL to a video demonstration of your project]

## Setup Instructions
[Provide step-by-step instructions on how to set up and run your project]

## Spheron Infrastructure Usage
The application is deployed on Spheron's infrastructure:
- Frontend: Deployed on Spheron's edge network
- Inference Server: Running on Spheron's GPU network

## Future Enhancements
1. Support for batch processing of multiple pages
2. Enhanced OCR accuracy for various manga styles
3. Integration with more translation services
4. Real-time translation preview
5. Mobile app development

## Team
- Lead Developer: [Your Name]
- Project Mentor: Spheron Team

## Acknowledgments
Special thanks to:
- Spheron Network for providing the GPU infrastructure
- The open-source community for various tools and libraries used in this project

## License
MIT License - See LICENSE file for details

## Checklist
- [ ] Added appropriate bounty label
- [ ] Provided all required information
- [ ] Ensured demo links are working
- [ ] Verified setup instructions are clear and complete

https://universe.roboflow.com/luciano-bastos-nunes/mangas-bubble