![Otakuverse Logo](assets/logo.svg)

# Otakuverse: AI-Powered Manga Translation Platform 🎯
> *Powered by [Spheron Network](https://spheron.network)*

[![Powered by Spheron](https://img.shields.io/badge/Powered%20By-Spheron-blue)](https://spheron.network)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Otakuverse is a web app that uses AI to detect and translate text in manga panels automatically. It's being build on top of Spheron's decentralized GPU network (currenty training), which makes it fast, reliable, and accurate. Plus, it keeps the original art style intact! 🎉

## 🌟 Features

- **AI-Powered Text Detection**: Automatically detects text bubbles in manga panels using YOLOv8

- **Font Customization**: Multiple manga-style fonts for natural-looking translations
- **Responsive UI**: Beautiful, modern interface built with Next.js and Tailwind CSS


## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Python 3.12+
- Docker (optional)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/otakuverse.git
cd otakuverse
```

2. Install frontend dependencies
```bash
cd web-app
npm install
```

3. Install backend dependencies
```bash
cd ../inference-server
pip install -r requirements.txt
```

4. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

### Running the Application

1. Start the frontend
```bash
cd web-app
npm run dev
```

2. Start the inference server
```bash
cd inference-server
python app.py
```

The application will be available at `http://localhost:3000`

## 🏗️ Architecture

Otakuverse is built with a modern tech stack:

- **Frontend**: Next.js, TailwindCSS, Framer Motion
- **Backend**: Flask, OpenCV, PyTorch
- **AI Models**: YOLOv8 for text detection, Various translation APIs
- **Infrastructure**: Spheron Network for decentralized hosting and storage


The model used to identify speech bubbles is YOLOv8. Using it directly doesn't give you good results as they are trained on a general dataset. So, we have trained our own dataset and fine-tuned the model for manga text detection.

This is done by fine-tuning the model on our own dataset. The dataset is a collection of manga images with speech bubbles annotated with the text inside them. The model is then trained on this dataset to identify the text inside the speech bubbles.

Here are the data:

- **Dataset**: [Manga Speech Bubbles Dataset](https://universe.roboflow.com/luciano-bastos-nunes/mangas-bubble/dataset/16)

```latex
@misc{
                            mangas-bubble_dataset,
                            title = { Mangas bubble Dataset },
                            type = { Open Source Dataset },
                            author = { Luciano Bastos Nunes },
                            howpublished = { \url{ https://universe.roboflow.com/luciano-bastos-nunes/mangas-bubble } },
                            url = { https://universe.roboflow.com/luciano-bastos-nunes/mangas-bubble },
                            journal = { Roboflow Universe },
                            publisher = { Roboflow },
                            year = { 2022 },
                            month = { dec },
                            note = { visited on 2024-12-01 },
                            }
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using [Spheron Network](https://spheron.network)
- YOLOv8 for object detection
- All our amazing contributors

## 🔗 Links

- [Spheron Network](https://spheron.network)
- [Documentation](docs/README.md)
- [Demo](https://otakuverse.demo.spheron.network)

---
*Note: This is a submission for the Spheron Network Bounty Program. The project demonstrates the capabilities of Spheron's decentralized infrastructure for hosting and storing AI-powered applications.*


TODO:
