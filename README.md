# 🐾 Animal Species Classification Using Deep Learning

A modern, full-stack AI web application that identifies animal species from uploaded images using Deep Learning Transfer Learning (EfficientNetB0) and convolutional feature extraction.

---

## 📌 Project Overview

**Animal Species Classification** is designed to provide rapid, high-accuracy taxonomic identification of animal species with real-time confidence scores and probability distributions.

### Supported Animal Classes (10+):
- 🐕 **Dog** (*Canis lupus familiaris*)
- 🐈 **Cat** (*Felis catus*)
- 🦁 **Lion** (*Panthera leo*)
- 🐅 **Tiger** (*Panthera tigris*)
- 🐘 **Elephant** (*Loxodonta africana / Elephas maximus*)
- 🐎 **Horse** (*Equus caballus*)
- 🐄 **Cow** (*Bos taurus*)
- 🦌 **Deer** (*Cervidae*)
- 🐻 **Bear** (*Ursidae*)
- 🐒 **Monkey** (*Simiiformes*)

---

## 🚀 Key Features

- **Multi-Modal Image Input**:
  - Drag-and-drop file upload
  - System file browser (JPG, JPEG, PNG, WEBP)
  - Live webcam photo snapshot capture
  - 1-Click quick sample library with 10 representative animals
- **Deep Learning Pipeline**:
  - Automated image validation, resizing, and Lanczos normalization to `224 × 224 × 3`
  - Pretrained **EfficientNetB0** convolutional neural network backbone
  - Global Average Pooling 2D + Batch Normalization + Dropout (0.35)
  - Softmax categorical cross-entropy probability distribution
- **Interactive UI & Visualizations**:
  - High-visibility Prediction Result card with primary species & confidence rating
  - Top 3 candidate predictions with animated horizontal progress bars
  - Full Softmax Probability Distribution Chart
  - Salient visual features breakdown & biological taxonomy data (scientific name, diet, habitat)
  - Local session history for tracking recent predictions

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS (Dark "Sleek Interface" Theme)
- **Icons**: Lucide React
- **Animations**: Motion & Canvas Confetti
- **Build Tool**: Vite

### Backend & Deep Learning
- **Framework**: FastAPI (Python) & Express.js (Node.js full-stack runtime)
- **Deep Learning Framework**: TensorFlow / Keras 2.x
- **Model Architecture**: EfficientNetB0 Transfer Learning
- **Image Processing**: Pillow (PIL) / OpenCV / NumPy

---

## 📁 Project Structure

```text
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application & REST endpoints
│   │   ├── model.py             # EfficientNetB0 loader & inference engine
│   │   ├── preprocessing.py     # Image validation & 224x224 tensor normalization
│   │   └── config.py            # Hyperparameters & supported class mappings
│   ├── models/
│   │   └── train_and_export.py  # Transfer learning training & export script
│   └── requirements.txt         # Python dependencies
│
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Responsive navigation bar
│   │   ├── Hero.tsx             # Interactive hero section with live preview
│   │   ├── UploadBox.tsx        # Drag-and-drop, camera & sample photo upload
│   │   ├── PredictionResult.tsx # Prediction card, top-3 candidates & metrics
│   │   ├── ProbabilityChart.tsx # Interactive Softmax probability bar chart
│   │   ├── HowItWorks.tsx       # 4-stage pipeline visualization
│   │   ├── ModelInfo.tsx        # Model specs & computational graph
│   │   ├── SupportedAnimals.tsx # 10-species taxonomic grid
│   │   ├── RecentPredictions.tsx# Local history of recent inferences
│   │   ├── About.tsx            # Academic & research overview
│   │   └── Footer.tsx           # Footer with CLI commands & metadata
│   ├── data/
│   │   ├── animals.ts           # Taxonomic metadata & descriptions
│   │   └── sampleImages.ts      # Sample library datasets
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Classify.tsx
│   │   ├── Model.tsx
│   │   └── About.tsx
│   ├── services/
│   │   └── api.ts               # Client API service & localStorage persistence
│   ├── types.ts                 # TypeScript type interfaces
│   ├── App.tsx                  # Root application component
│   └── main.tsx                 # React entry point
│
├── server.ts                    # Full-stack server with Vite middleware integration
├── package.json                 # Node.js project manifest & scripts
├── requirements.txt             # Root Python requirements
└── README.md                    # Project documentation
```

---

## 💻 Installation & Local Setup

### 1. Prerequisites
- **Node.js** (v18.x or later) and `npm`
- **Python** (v3.10 or later) and `pip`

---

### 2. Running the Frontend & Full-Stack Server (Node.js)

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev
```

The application will be accessible at `http://localhost:3000`.

---

### 3. Running the Python FastAPI Backend (Optional / Standalone)

```bash
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python requirements
pip install -r requirements.txt

# Launch FastAPI with Uvicorn
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

FastAPI Swagger Documentation will be available at:
`http://localhost:8000/docs`

---

## 📡 API Reference

### `POST /predict` (or `/api/predict`)

Classifies an uploaded animal image and returns top predictions.

#### Request (JSON Payload)
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ..."
}
```
*Or upload as `multipart/form-data` with key `file`.*

#### Success Response (`200 OK`)
```json
{
  "prediction": "Lion",
  "confidence": 94.72,
  "top_predictions": [
    { "class": "Lion", "confidence": 94.72 },
    { "class": "Tiger", "confidence": 3.21 },
    { "class": "Leopard", "confidence": 1.14 }
  ],
  "all_probabilities": [
    { "class": "Lion", "confidence": 94.72 },
    { "class": "Tiger", "confidence": 3.21 },
    { "class": "Bear", "confidence": 0.82 }
  ],
  "scientific_name": "Panthera leo",
  "diet": "Carnivore (Apex Predator)",
  "habitat": "Savannah, Grasslands & Shrublands",
  "latency_ms": 142.5,
  "model_name": "EfficientNetB0 Transfer Learning"
}
```

---

## 🧠 Model Architecture & Training

```text
Input Image (224 × 224 × 3)
       ↓
Preprocessing & Normalization (Lanczos)
       ↓
EfficientNetB0 Backbone (Pretrained on ImageNet)
       ↓
Convolutional Feature Extraction (7 × 7 × 1280)
       ↓
Global Average Pooling 2D (1280)
       ↓
Batch Normalization & Dropout (p = 0.35)
       ↓
Dense Layer (256 units, ReLU)
       ↓
Dense Output Layer (10 units, Softmax)
       ↓
Animal Species Predictions & Probability Distribution
```

---

## 📄 License

This project is licensed under the Apache 2.0 License.
