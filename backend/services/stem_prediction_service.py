# import os
# from ultralytics import YOLO

# MODEL_PATH = os.path.join(
#     os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
#     "models",
#     "stem_model.pt"
# )

# _stem_model = None


# def get_stem_model():
#     global _stem_model

#     if _stem_model is None:
#         if not os.path.exists(MODEL_PATH):
#             raise FileNotFoundError(
#                 "Stem model not found at " + MODEL_PATH
#             )

#         print("Loading YOLO11s Stem model...")
#         _stem_model = YOLO(MODEL_PATH)
#         print("YOLO11s Stem model loaded successfully.")

#     return _stem_model


# def predict_stem_disease(image_file):
#     model = get_stem_model()

#     result = model.predict(
#         source=image_file,
#         verbose=False
#     )[0]

#     predicted_id = result.probs.top1
#     predicted_class = result.names[predicted_id]

#     probabilities = result.probs.data.cpu().numpy()

#     probability_dict = {
#         result.names[i]: float(probabilities[i])
#         for i in range(len(probabilities))
#     }

#     if "_" in predicted_class:
#         disease_name = predicted_class.split("_", 1)[1]
#     else:
#         disease_name = predicted_class

#     disease_name = disease_name.replace("_", " ")

#     confidence = float(probabilities[predicted_id]) * 100

#     return {
#         "disease": disease_name,
#         "class_name": predicted_class,
#         "class_index": int(predicted_id),
#         "confidence": round(confidence, 2),
#         "probabilities": probability_dict,
#         "affected_part": "Stem",
#         "model": "YOLO11s"
#     }
import os
from io import BytesIO

from PIL import Image
from ultralytics import YOLO


MODEL_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "models",
    "stem_model.pt"
)

_stem_model = None


def get_stem_model():
    global _stem_model

    if _stem_model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(
                "Stem model not found at " + MODEL_PATH
            )

        print("Loading YOLO11s Stem model...")
        _stem_model = YOLO(MODEL_PATH)
        print("YOLO11s Stem model loaded successfully.")

    return _stem_model


def predict_stem_disease(image_file):
    model = get_stem_model()

    # Read uploaded Flask file and convert it to a PIL image.
    image_bytes = image_file.read()

    if not image_bytes:
        raise ValueError("Uploaded stem image is empty.")

    image = Image.open(BytesIO(image_bytes)).convert("RGB")

    # Run YOLO11s classification.
    result = model.predict(
        source=image,
        verbose=False
    )[0]

    predicted_id = int(result.probs.top1)
    probabilities = result.probs.data.cpu().numpy()

    predicted_class = result.names[predicted_id]

    probability_dict = {
        result.names[i]: float(probabilities[i])
        for i in range(len(probabilities))
    }

    # Convert:
    # 02_Stem_Rot -> Stem Rot
    if "_" in predicted_class:
        disease_name = predicted_class.split("_", 1)[1]
    else:
        disease_name = predicted_class

    disease_name = disease_name.replace("_", " ")

    confidence = float(probabilities[predicted_id]) * 100

    return {
        "status": "success",
        "disease": disease_name,
        "class_name": predicted_class,
        "class_index": predicted_id,
        "confidence": round(confidence, 2),
        "probabilities": probability_dict,
        "affected_part": "Stem",
        "model": "YOLO11s"
    }