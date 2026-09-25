import numpy as np
from PIL import Image

IMG_SIZE = (224, 224)

def preprocess_image(image_file):
    img = Image.open(image_file)
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    img = img.resize(IMG_SIZE)
    img_array = np.array(img, dtype=np.float32)
    img_array = img_array / 255.0  # Exact rescaling used during training
    img_batch = np.expand_dims(img_array, axis=0)
    return img_batch, img
