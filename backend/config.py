import os

class Config:
    PORT = int(os.getenv('PORT', 5000))
    FLASK_ENV = os.getenv('FLASK_ENV', 'development')
    SECRET_KEY = os.getenv('SECRET_KEY', 'agri_ai_secret_key_2026')
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/agri_ai')
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
    GENERATED_REPORTS_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'generated_reports')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB limit
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
    MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'models', 'tomato_disease_model.keras')
    CLASS_NAMES_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'models', 'class_names.json')
    DISEASES_DATA_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'diseases.json')
    TREATMENTS_DATA_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'treatments.json')
