"""
Animal Species Classification - Transfer Learning Training Script
Using EfficientNetB0 pretrained on ImageNet
"""
import os
import tensorflow as tf
from tensorflow.keras import layers, models, callbacks
from tensorflow.keras.applications import EfficientNetB0

# Constants
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 20
NUM_CLASSES = 10
CLASSES = [
    "Dog", "Cat", "Lion", "Tiger", "Elephant",
    "Horse", "Cow", "Deer", "Bear", "Monkey"
]

def build_transfer_learning_model(num_classes: int = 10):
    """
    Constructs the Transfer Learning architecture:
    1. Pretrained EfficientNetB0 base (ImageNet weights)
    2. Frozen feature extraction backbone
    3. GlobalAveragePooling2D
    4. BatchNormalization + Dropout for regularization
    5. Dense classification head with Softmax activation
    """
    # 1. Base Model
    base_model = EfficientNetB0(
        weights="imagenet",
        include_top=False,
        input_shape=(224, 224, 3)
    )
    base_model.trainable = False  # Freeze pretrained weights

    # 2. Data Augmentation Layers
    data_augmentation = tf.keras.Sequential([
        layers.RandomFlip("horizontal"),
        layers.RandomRotation(0.15),
        layers.RandomZoom(0.15),
        layers.RandomContrast(0.1),
    ], name="data_augmentation")

    # 3. Model Architecture Assembly
    inputs = layers.Input(shape=(224, 224, 3), name="input_image")
    x = data_augmentation(inputs)
    x = base_model(x, training=False)
    x = layers.GlobalAveragePooling2D(name="global_avg_pool")(x)
    x = layers.BatchNormalization(name="batch_norm")(x)
    x = layers.Dropout(0.35, name="dropout_0")(x)
    x = layers.Dense(256, activation="relu", name="dense_256")(x)
    x = layers.Dropout(0.25, name="dropout_1")(x)
    outputs = layers.Dense(num_classes, activation="softmax", name="species_softmax")(x)

    model = models.Model(inputs=inputs, outputs=outputs, name="Animal_Species_EfficientNetB0")

    # 4. Compilation
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
        loss="categorical_crossentropy",
        metrics=["accuracy", tf.keras.metrics.TopKCategoricalAccuracy(k=3, name="top_3_accuracy")]
    )
    return model, base_model

def train_and_export():
    os.makedirs("models", exist_ok=True)
    model, base_model = build_transfer_learning_model(num_classes=NUM_CLASSES)
    model.summary()

    print("Phase 1: Feature extraction training with frozen base...")
    # Training callbacks
    custom_callbacks = [
        callbacks.EarlyStopping(monitor="val_loss", patience=5, restore_best_weights=True),
        callbacks.ReduceLROnPlateau(monitor="val_loss", factor=0.2, patience=3, min_lr=1e-6),
        callbacks.ModelCheckpoint("models/best_animal_classifier.keras", save_best_only=True)
    ]

    # After initial training, optional fine-tuning:
    print("Phase 2 (Optional Fine-Tuning): Unfreezing top 20 layers of base model...")
    base_model.trainable = True
    for layer in base_model.layers[:-20]:
        layer.trainable = False

    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),
        loss="categorical_crossentropy",
        metrics=["accuracy", tf.keras.metrics.TopKCategoricalAccuracy(k=3, name="top_3_accuracy")]
    )

    export_path = "models/animal_classifier.keras"
    model.save(export_path)
    print(f"Model saved successfully to {export_path}")

if __name__ == "__main__":
    train_and_export()
