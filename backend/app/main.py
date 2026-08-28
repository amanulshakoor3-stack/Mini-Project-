import base64
import time
from typing import Optional
from fastapi import FastAPI, File, UploadFile, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from app.config import ANIMAL_CLASSES, ALLOWED_EXTENSIONS, ALLOWED_MIME_TYPES, MAX_FILE_SIZE_MB
from app.preprocessing import validate_image, preprocess_image
from app.model import classifier

app = FastAPI(
    title="Animal Species Classification API",
    description="Deep Learning API for classifying animal species using EfficientNetB0 Transfer Learning.",
    version="1.0.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Base64PredictionRequest(BaseModel):
    image: str = Field(..., description="Base64 data URL or raw base64 string")

@app.get("/", tags=["Health"])
async def root():
    return {
        "status": "online",
        "service": "Animal Species Classification Deep Learning API",
        "version": "1.0.0",
        "supported_species_count": len(ANIMAL_CLASSES)
    }

@app.get("/species", tags=["Metadata"])
async def get_supported_species():
    return {
        "species": ANIMAL_CLASSES,
        "count": len(ANIMAL_CLASSES)
    }

@app.get("/model-info", tags=["Metadata"])
async def get_model_info():
    return {
        "model": "EfficientNetB0",
        "architecture": "Transfer Learning (CNN)",
        "framework": "TensorFlow / Keras",
        "classes_count": len(ANIMAL_CLASSES),
        "input_size": "224 × 224 × 3",
        "output": "Softmax Classification",
        "weights": "Pretrained on ImageNet + Animal Species Classification Head",
        "status": "Ready" if classifier.is_loaded else "Initialized"
    }

@app.post("/predict", tags=["Inference"])
async def predict_animal(
    file: Optional[UploadFile] = File(None),
    request: Optional[Request] = None
):
    """
    Accepts either multipart/form-data upload or JSON payload containing base64 image.
    Validates, preprocesses, and outputs Softmax probability distribution and Top-3 predictions.
    """
    start_time = time.time()
    image_bytes = None

    # Handle multipart file upload
    if file is not None:
        if not file.filename:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No filename provided. Please upload an image file."
            )
        
        file_ext = "." + file.filename.split(".")[-1].lower() if "." in file.filename else ""
        if file_ext not in ALLOWED_EXTENSIONS and file.content_type not in ALLOWED_MIME_TYPES:
            raise HTTPException(
                status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                detail=f"Unsupported format '{file_ext}'. Supported formats: JPG, JPEG, PNG, WEBP."
            )
        
        image_bytes = await file.read()
        if len(image_bytes) > MAX_FILE_SIZE_MB * 1024 * 1024:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"Image exceeds maximum size limit of {MAX_FILE_SIZE_MB}MB."
            )

    # Handle JSON base64 body if file was not sent in form-data
    elif request is not None:
        try:
            body = await request.json()
            if "image" in body and isinstance(body["image"], str):
                b64_str = body["image"]
                if "," in b64_str:
                    b64_str = b64_str.split(",", 1)[1]
                image_bytes = base64.b64decode(b64_str)
        except Exception:
            pass

    if not image_bytes or len(image_bytes) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Empty upload. Please provide an image file (multipart/form-data) or a base64 encoded string."
        )

    # Validate and preprocess image
    try:
        pil_image = validate_image(image_bytes)
        preprocessed_tensor = preprocess_image(pil_image)
    except ValueError as val_err:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(val_err)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Preprocessing error: {str(e)}"
        )

    # Run prediction through Deep Learning Model
    try:
        prediction_result = classifier.predict(preprocessed_tensor)
        inference_latency_ms = round((time.time() - start_time) * 1000, 2)
        
        return {
            "prediction": prediction_result["prediction"],
            "confidence": prediction_result["confidence"],
            "top_predictions": prediction_result["top_predictions"],
            "all_probabilities": prediction_result["all_probabilities"],
            "latency_ms": inference_latency_ms,
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime()),
            "model_name": prediction_result["model_name"]
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Model inference failed: {str(e)}"
        )
