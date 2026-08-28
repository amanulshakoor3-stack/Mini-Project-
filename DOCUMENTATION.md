# 🐾 AnimalAI: Animal Species Classification Deep Learning Documentation

Welcome to the comprehensive technical documentation for the **AnimalAI** platform. This document describes the system architecture, mathematical formulations, model training pipeline, preprocessing specifications, backend API routes, and frontend design patterns.

---

## 1. System Architecture

The AnimalAI platform is designed as a decoupled client-server application capable of executing real-time deep learning inference.

```text
                                 [ Client Web App ]
                                 (React / TS / Tailwind)
                                         │
                                         ▼ (HTTP POST /predict with Base64/Multipart)
                                ┌─────────────────┐
                                │   API Gateway / │
                                │   Web Server    │
                                └────────┬────────┘
                                         │
                    ┌────────────────────┴────────────────────┐
                    ▼ (Production Option)                     ▼ (Development Option)
             [ FastAPI Backend ]                        [ Node.js Express Server ]
           (Python, Uvicorn, CORS)                    (TS, Express, Gemini API / Local)
                    │                                         │
                    ▼                                         ▼
         [ TensorFlow / Keras ]                     [ AI Vision API / Fallback ]
        (EfficientNetB0 Model)                       (Softmax Entropy Prediction)
```

1. **Client Layer**: A responsive single-page React app that coordinates file uploads, camera snapshots, sample selection, and caches recent predictions via browser `localStorage`.
2. **Inference / Middleware Layer**: Receives the image input, validates the file headers, converts it to a standard RGB format, and normalizes the shape to the required input dimensions.
3. **Deep Learning Model Layer**: Executes a forward pass through the trained Convolutional Neural Network (CNN) and returns a Softmax probability distribution.

---

## 2. Deep Learning Model & Transfer Learning

The model is built using **Transfer Learning** on the **EfficientNetB0** architecture, pretrained on the ImageNet dataset. Transfer learning is used to leverage high-level visual features (edges, textures, shapes) learned from millions of general images and adapt them to classify specific animal species.

### 2.1 Network Topology

```text
               ┌──────────────────────────────┐
               │    Input Tensor (224,224,3)  │
               └──────────────┬───────────────┘
                              ▼
               ┌──────────────────────────────┐
               │    Data Augmentation Layers  │
               │ (RandomFlip, Zoom, Rotation) │
               └──────────────┬───────────────┘
                              ▼
               ┌──────────────────────────────┐
               │    EfficientNetB0 Backbone   │
               │    (Pretrained on ImageNet)  │
               └──────────────┬───────────────┘
                              ▼
               ┌──────────────────────────────┐
               │  Global Average Pooling 2D   │
               │        (Shape: 1280)         │
               └──────────────┬───────────────┘
                              ▼
               ┌──────────────────────────────┐
               │    Batch Normalization &     │
               │    Dropout (Rate = 0.35)     │
               └──────────────┬───────────────┘
                              ▼
               ┌──────────────────────────────┐
               │  Dense Feature Layer (256)   │
               │      (Activation: ReLU)      │
               └──────────────┬───────────────┘
                              ▼
               ┌──────────────────────────────┐
               │     Dropout (Rate = 0.25)    │
               └──────────────┬───────────────┘
                              ▼
               ┌──────────────────────────────┐
               │  Dense Classification (10)   │
               │    (Activation: Softmax)     │
               └──────────────────────────────┘
```

- **EfficientNetB0**: Selected for its computational efficiency and accuracy balance. It uses compound scaling to scale network depth, width, and resolution.
- **Global Average Pooling 2D**: Reduces the spatial dimensions (7x7) of the final feature maps to a 1D vector (1280 channels) by computing the average activation value of each feature map.
- **Batch Normalization**: Stabilizes learning by normalizing activations, allowing higher learning rates and reducing training epochs.
- **Dropout (0.35 & 0.25)**: Regularization technique that randomly deactivates neurons during training to prevent overfitting.
- **Dense Layer (256, ReLU)**: Learns complex non-linear combinations of the extracted features.
- **Softmax Activation**: Normalizes raw network outputs (logits) into a probability distribution summing to 1.

### 2.2 Mathematical Formulations

#### Image Normalization
Pixel channels are converted from integers in range `[0, 255]` to floats in range `[0, 1]` or centered depending on the architecture needs:

$$X_{norm} = \frac{X - \mu}{\sigma}$$

#### Softmax Activation Function
The Softmax function translates raw model output logits $z$ for class $i$ into a probability $p_i$:

$$p_i = \sigma(z)_i = \frac{e^{z_i}}{\sum_{j=1}^{C} e^{z_j}}$$

where $C$ is the number of target classes (10).

#### Categorical Cross-Entropy Loss
During training, parameters are optimized using the Categorical Cross-Entropy loss function:

$$\mathcal{L} = -\sum_{i=1}^{C} y_i \log(p_i)$$

where $y_i$ is the ground-truth binary label (one-hot encoded) and $p_i$ is the predicted probability.

---

## 3. Data Preprocessing Pipeline

To ensure consistent model inputs, images undergo a standard preprocessing sequence:

1. **Validation**:
   - Verify that the payload is not empty and represents a valid MIME type (`image/jpeg`, `image/png`, `image/webp`).
   - Check file size against the limit of 10MB.
2. **Channel Alignment**:
   - RGBA, alpha-transparency layers, Grayscale, and CMYK formats are systematically converted to standard 3-channel RGB.
3. **Spatial Interpolation**:
   - The image is resized to `224 × 224` pixels using **Lanczos resampling**, which preserves edge sharpness and minimizes aliasing.
4. **Dimension Expansion**:
   - Adds a batch dimension to create a 4D tensor with shape `(1, 224, 224, 3)`, matching the model's expected input shape.

---

## 4. API Endpoints Reference

### 1. Health Status check
- **Endpoint**: `GET /` (FastAPI) or `GET /api/health` (Express)
- **Response**:
  ```json
  {
    "status": "online",
    "service": "Animal Species Classification Deep Learning API",
    "version": "1.0.0",
    "supported_species_count": 10
  }
  ```

### 2. Supported Species Metadata
- **Endpoint**: `GET /species` (FastAPI) or `GET /api/species` (Express)
- **Response**:
  ```json
  {
    "species": ["Dog", "Cat", "Lion", "Tiger", "Elephant", "Horse", "Cow", "Deer", "Bear", "Monkey"],
    "count": 10
  }
  ```

### 3. Model Information
- **Endpoint**: `GET /model-info` (FastAPI) or `GET /api/model-info` (Express)
- **Response**:
  ```json
  {
    "model": "EfficientNetB0",
    "architecture": "Transfer Learning (CNN)",
    "framework": "TensorFlow / Keras",
    "classes_count": 10,
    "input_size": "224 × 224 × 3",
    "output": "Softmax Classification",
    "status": "Ready"
  }
  ```

### 4. Classify Image
- **Endpoint**: `POST /predict` (or `/api/predict`)
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2w..."
  }
  ```
- **Success Response (`200 OK`)**:
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
      { "class": "Lion", "confidence": 94.72, "probability": 0.9472 },
      { "class": "Tiger", "confidence": 3.21, "probability": 0.0321 },
      { "class": "Bear", "confidence": 0.82, "probability": 0.0082 }
      // ... (Includes other classes)
    ],
    "detected_features": [
      "Distinctive radial mane and tawny coat pattern",
      "Heavy jaw musculature and cranial width metrics",
      "Tail tip tuft features matching Panthera leo morphology"
    ],
    "scientific_name": "Panthera leo",
    "diet": "Carnivore (Apex Predator)",
    "habitat": "Savannah, Grasslands & Shrublands",
    "latency_ms": 138.42,
    "timestamp": "2026-08-27 16:58:30 UTC",
    "model_name": "EfficientNetB0 Transfer Learning"
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Empty payload, malformed Base64, or missing image key.
  - `415 Unsupported Media Type`: File format other than JPEG, PNG, or WEBP.
  - `422 Unprocessable Entity`: Corrupt image bytes or validation failure.
  - `500 Internal Server Error`: TensorFlow model file missing or inference exception.

---

## 5. UI/UX Design Specifications

The user interface uses the **Sleek Interface** design theme, characterized by:

- **Color Scheme**: Deep dark gray/black backgrounds (`#050505`, `bg-slate-950`) combined with white typography, slate/zinc borders, and glowing purple, indigo, and cyan accents (`from-indigo-500 to-purple-500`).
- **Layout Grid**: Responsive dashboard structure designed for desktop, tablet, and mobile browsers:
  - Header Navbar with dynamic state tracking and mobile drawer toggle.
  - Two-column dashboard containing the classification input panel and classification results panel side-by-side on desktop, or stacked vertically on mobile.
- **Glassmorphism**: Component borders are defined with semi-transparent styles (`border-white/10` or `border-slate-800`), backdrop filters (`backdrop-blur-xl`), and dark drop shadows to create a layered, modern SaaS look.
- **Interactive State Caching**: Stores the last 12 predictions locally in browser storage using `localStorage` to allow users to review past classification results.

---

## 6. Execution and Verification Guide

### 6.1 Requirements
- Python >= 3.10
- Node.js >= 18.x

### 6.2 Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Verify that the backend is running by loading the API documentation in a browser at `http://localhost:8000/docs`.

### 6.3 Frontend Setup
```bash
npm install
npm run dev
```

Open a browser and navigate to `http://localhost:3000` to interact with the application.
