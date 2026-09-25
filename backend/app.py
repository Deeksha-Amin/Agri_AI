import os
from flask import Flask, jsonify
from flask_cors import CORS
from config import Config

from routes.prediction_routes import prediction_bp
from routes.report_routes import report_bp
from routes.contact_routes import contact_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)
    os.makedirs(Config.GENERATED_REPORTS_FOLDER, exist_ok=True)
    
    CORS(app, resources={r'/api/*': {'origins': '*'}})
    
    app.register_blueprint(prediction_bp, url_prefix='/api')
    app.register_blueprint(report_bp, url_prefix='/api')
    app.register_blueprint(contact_bp, url_prefix='/api')
    
    @app.route('/', methods=['GET'])
    def root():
        return jsonify({
            'project': 'Multi-Part Tomato Disease Detection System',
            'status': 'online',
            'version': '1.0.0'
        }), 200

    @app.route('/api/health', methods=['GET'])
    def health():
        model_loaded = os.path.exists(Config.MODEL_PATH)
        return jsonify({
            'status': 'healthy',
            'model_loaded': model_loaded,
            'model_type': 'DenseNet121',
            'supported_modalities': ['Leaf'],
            'future_modalities': ['Fruit', 'Stem']
        }), 200
        
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=Config.PORT, debug=True)
