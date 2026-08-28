import os
from typing import List

# Server configuration
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", 8000))
DEBUG = os.getenv("DEBUG", "True").lower() == "true"

# Model hyperparameters and paths
MODEL_PATH = os.getenv("MODEL_PATH", "models/animal_classifier.keras")
IMAGE_SIZE = (224, 224)
INPUT_SHAPE = (224, 224, 3)

# 10 Supported Animal Classes
ANIMAL_CLASSES: List[str] = [
    "Dog",
    "Cat",
    "Lion",
    "Tiger",
    "Elephant",
    "Horse",
    "Cow",
    "Deer",
    "Bear",
    "Monkey",
]

# Extended classes supported in future updates
EXTENDED_CLASSES: List[str] = [
    "Wolf",
    "Fox",
    "Giraffe",
    "Zebra",
    "Kangaroo",
    "Panda",
    "Cheetah",
    "Rhinoceros",
]

# Allowed upload extensions and MIME types
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
ALLOWED_MIME_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
}
MAX_FILE_SIZE_MB = 10
