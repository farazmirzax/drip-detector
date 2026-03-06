# 💧 DripDetector

**Rate your fit with AI.** Upload a photo and let deep learning classify your fashion aesthetic.

DripDetector is a full-stack web application that uses a custom-trained ResNet18 model to identify fashion styles from images. It can classify outfits into five distinct aesthetics: Y2K, Old Money, Streetwear, Goth, and Gym Rat.

![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)
![React](https://img.shields.io/badge/React-19.2-61dafb.svg)
![PyTorch](https://img.shields.io/badge/PyTorch-2.0+-red.svg)

## 🎯 Features

- **🧠 Deep Learning Classification** - ResNet18-based CNN trained on curated fashion datasets
- **📸 Drag & Drop Upload** - Intuitive interface for image uploads
- **📊 Confidence Scores** - See detailed probability breakdown for each style
- **⚡ Fast Inference** - Real-time predictions with optimized model
- **🎨 Modern UI** - Clean, responsive design built with React and Tailwind CSS
- **🐳 Docker Ready** - Fully containerized with Docker Compose (one command to run everything)

## 🏗️ Architecture

```
              Docker Compose
┌──────────────────────────────────────┐
│                                      │
│  ┌─────────────────┐                 │
│  │  React Frontend │ (Nginx)         │
│  │   Port: 3000    │                 │
│  └────────┬────────┘                 │
│           │ /predict (proxied)       │
│           ↓                          │
│  ┌─────────────────┐                 │
│  │  FastAPI Backend│ (Python+PyTorch)│
│  │   Port: 8000    │                 │
│  ├─────────────────┤                 │
│  │  ResNet18 Model │                 │
│  │  drip_model.pth │                 │
│  └─────────────────┘                 │
│                                      │
└──────────────────────────────────────┘
```

## 📂 Project Structure

```
drip-detector/
├── docker-compose.yml    # Orchestrates both services
├── backend/              # FastAPI server
│   ├── app/
│   │   ├── main.py      # API endpoints
│   │   ├── inference.py # Model inference logic
│   │   ├── model.py     # ResNet18 architecture
│   │   └── utils.py     # Image preprocessing
│   ├── weights/
│   │   └── drip_model.pth  # Trained model weights
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/            # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── DragDrop.jsx    # File upload component
│   │   │   └── ResultCard.jsx   # Results display
│   │   └── App.jsx
│   ├── Dockerfile
│   ├── nginx.conf       # Nginx config (serves UI + proxies API)
│   ├── package.json
│   └── vite.config.js
└── training/            # Model training scripts
    ├── train.ipynb      # Training notebook
    ├── collect_data.py  # Data collection utilities
    └── dataset/         # Training images
        ├── goth/
        ├── gym_rat/
        ├── old_money/
        ├── streetwear/
        └── y2k/
```

## 🚀 Quick Start

### Prerequisites

- Python 3.9+
- Node.js 18+
- pip and npm

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🐳 Docker Deployment

The easiest way to run the entire app — no Python or Node.js setup needed.

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

### Run with Docker Compose

```bash
# Build and start both frontend + backend
docker compose up --build

# Frontend (UI):  http://localhost:3000
# Backend (API):  http://localhost:8000
```

### Useful Commands

```bash
# Start in background (detached mode)
docker compose up -d

# Stop everything
docker compose down

# Rebuild after code changes
docker compose up --build

# View logs
docker compose logs -f
```

## 📊 Supported Fashion Styles

| Style | Description |
|-------|-------------|
| **Y2K** | Early 2000s aesthetic with low-rise jeans, butterfly motifs, and metallic finishes |
| **Old Money** | Classic, preppy style with polo shirts, khakis, and timeless pieces |
| **Streetwear** | Urban fashion with hoodies, sneakers, and bold graphics |
| **Goth** | Dark aesthetic with black clothing, leather, and alternative style |
| **Gym Rat** | Athletic wear with workout clothes and activewear |

## 🔬 Model Details

- **Architecture**: ResNet18 (transfer learning)
- **Input Size**: 224x224 RGB images
- **Output**: 5 fashion style classes
- **Framework**: PyTorch
- **Training**: Fine-tuned on custom dataset with data augmentation

The model uses a pre-trained ResNet18 backbone with a custom classifier head trained specifically for fashion style recognition.

## 🛠️ API Endpoints

### `GET /`
Health check endpoint
```json
{
  "message": "DripDetector API is running! 💧"
}
```

### `POST /predict`
Upload an image for style classification
- **Input**: Multipart form-data with image file
- **Output**:
```json
{
  "style": "streetwear",
  "confidence": "87.34%",
  "raw_scores": {
    "goth": "2.15%",
    "gym_rat": "3.21%",
    "old_money": "4.12%",
    "streetwear": "87.34%",
    "y2k": "3.18%"
  }
}
```

## 📝 Training Your Own Model

1. Collect and organize images in the `training/dataset/` directory
2. Run the data collection scripts:
   ```bash
   cd training
   python collect_data.py
   python organize_data.py
   ```
3. Open and run `train.ipynb` to train the model
4. Copy the trained weights to `backend/weights/drip_model.pth`

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new fashion style categories
- Improve the model architecture
- Enhance the UI/UX
- Fix bugs or add features

## 📄 License

This project is open source and available under the MIT License.

## 🔮 Future Improvements

- [ ] Add more fashion categories (e.g., cottagecore, minimalist, punk)
- [ ] Implement multi-label classification for mixed styles
- [ ] Add outfit rating scores
- [ ] Support batch image processing
- [ ] Mobile app version
- [ ] Style recommendation engine

## 👨‍💻 Author

Built with ❤️ by Faraz Mirza

---

**Note**: This is a learning project for exploring deep learning in fashion classification. Model accuracy may vary based on image quality and lighting conditions.