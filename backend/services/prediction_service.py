import os
import json
import numpy as np
import keras
from keras.layers import Dense
from config import Config
from utils.image_preprocessing import preprocess_image
from utils.disease_mapper import load_disease_metadata

# Patch Dense layer initialization to handle quantization_config if present in saved config
_old_dense_init = Dense.__init__
def _patched_dense_init(self, *args, quantization_config=None, **kwargs):
    _old_dense_init(self, *args, **kwargs)
Dense.__init__ = _patched_dense_init

_model = None

def get_model():
    global _model
    if _model is None:
        if not os.path.exists(Config.MODEL_PATH):
            raise FileNotFoundError("Model file not found at " + Config.MODEL_PATH)
        print("Loading DenseNet121 model from " + Config.MODEL_PATH + "...")
        _model = keras.models.load_model(Config.MODEL_PATH, compile=False)
        print("DenseNet121 model loaded successfully.")
    return _model

def predict_leaf_disease(image_file):
    model = get_model()
    img_batch, original_img = preprocess_image(image_file)
    
    # Pass verbose=0 to prevent Windows cp1252 console UnicodeEncodeError during progress bar rendering
    predictions = model.predict(img_batch, verbose=0)[0]
    predicted_idx = int(np.argmax(predictions))
    confidence = float(predictions[predicted_idx]) * 100.0
    
    metadata = load_disease_metadata(predicted_idx)
    
    with open(Config.CLASS_NAMES_PATH, "r", encoding="utf-8") as f:
        class_mapping_data = json.load(f)
        
    if "class_indices" in class_mapping_data:
        idx_to_class = {v: k for k, v in class_mapping_data["class_indices"].items()}
    else:
        idx_to_class = {int(k): v for k, v in class_mapping_data.items()}
        
    top3_indices = np.argsort(predictions)[-3:][::-1]
    top3 = []
    for idx in top3_indices:
        raw_c = idx_to_class.get(int(idx), "Unknown")
        meta = load_disease_metadata(int(idx))
        top3.append({
            "class_index": int(idx),
            "disease": meta["disease"],
            "raw_name": raw_c,
            "confidence": round(float(predictions[idx]) * 100.0, 2)
        })
        
    return {
        "disease": metadata["disease"],
        "class_index": predicted_idx,
        "confidence": round(confidence, 2),
        "category": metadata["category"],
        "affected_part": "Leaf",
        "model": "DenseNet121",
        "symptoms": metadata["symptoms"],
        "cause": metadata["cause"],
        "crop_impact": metadata["crop_impact"],
        "treatments": metadata["treatments"],
        "top3": top3
    }

