import io
from PIL import Image
import numpy as np
from app.config import IMAGE_SIZE

def validate_image(image_bytes: bytes) -> Image.Image:
    """
    Validates that the input bytes represent a valid readable image.
    Converts RGBA, Grayscale, or CMYK images to standard 3-channel RGB.
    """
    if not image_bytes or len(image_bytes) == 0:
        raise ValueError("Image file is empty or corrupted.")
    
    try:
        image = Image.open(io.BytesIO(image_bytes))
        image.verify()  # Verify integrity
        
        # Re-open after verify() because verify() alters file pointer
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert all formats to standard RGB
        if image.mode != "RGB":
            image = image.convert("RGB")
            
        return image
    except Exception as e:
        raise ValueError(f"Invalid image format or corrupted data: {str(e)}")

def preprocess_image(image: Image.Image) -> np.ndarray:
    """
    Prepares a PIL Image for EfficientNetB0 inference:
    1. Resizes with high-quality Lanczos resampling to (224, 224)
    2. Converts to float32 NumPy array
    3. Normalizes tensor (EfficientNetB0 handles [0, 255] or [-1, 1] scaling)
    4. Adds batch dimension -> (1, 224, 224, 3)
    """
    # Resize to target input dimensions
    resized_img = image.resize(IMAGE_SIZE, Image.Resampling.LANCZOS)
    
    # Convert PIL image to NumPy array with shape (224, 224, 3)
    img_array = np.array(resized_img, dtype=np.float32)
    
    # Expand dims to create batch shape: (1, 224, 224, 3)
    batch_array = np.expand_dims(img_array, axis=0)
    
    return batch_array
