import os
from io import BytesIO

from PIL import Image
from ultralytics import YOLO


MODEL_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "models",
    "fruit_model.pt"
)

_fruit_model = None


def get_fruit_model():
    global _fruit_model

    if _fruit_model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(
                "Fruit model not found at " + MODEL_PATH
            )

        print("Loading YOLOv8 Fruit model...")
        _fruit_model = YOLO(MODEL_PATH)
        print("YOLOv8 Fruit model loaded successfully.")

    return _fruit_model


def predict_fruit_disease(image_file):
    model = get_fruit_model()

    image_bytes = image_file.read()

    if not image_bytes:
        raise ValueError("Uploaded fruit image is empty.")

    image = Image.open(
        BytesIO(image_bytes)
    ).convert("RGB")

    results = model.predict(
        source=image,
        verbose=False
    )

    result = results[0]

    if result.boxes is None or len(result.boxes) == 0:
        return {
            "status": "success",
            "disease": "No disease detected",
            "confidence": 0.0,
            "detections": [],
            "affected_part": "Fruit",
            "model": "YOLOv8"
        }

    detections = []

    for box in result.boxes:
        class_id = int(box.cls[0])
        confidence = float(box.conf[0])

        class_name = result.names[class_id]

        detections.append({
            "disease": class_name,
            "class_index": class_id,
            "confidence": round(confidence * 100, 2)
        })

    # Highest-confidence detection
    best_detection = max(
        detections,
        key=lambda x: x["confidence"]
    )

    return {
        "status": "success",
        "disease": best_detection["disease"],
        "confidence": best_detection["confidence"],
        "detections": detections,
        "affected_part": "Fruit",
        "model": "YOLOv8"
    }