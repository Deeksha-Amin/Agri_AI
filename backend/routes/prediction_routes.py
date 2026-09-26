from flask import Blueprint, request, jsonify
# from services.prediction_service import predict_leaf_disease
# from services.fusion_service import fuse_predictions
from services.prediction_service import predict_leaf_disease
from services.stem_prediction_service import predict_stem_disease
from services.fusion_service import fuse_predictions
prediction_bp = Blueprint('prediction', __name__)

@prediction_bp.route('/predict/leaf', methods=['POST'])
def predict_leaf():
    if 'image' not in request.files and 'file' not in request.files:
        return jsonify({'error': 'No image file provided in request'}), 400
        
    file = request.files.get('image') or request.files.get('file')
    if file.filename == '':
        return jsonify({'error': 'Empty filename selected'}), 400
        
    try:
        result = predict_leaf_disease(file)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@prediction_bp.route('/predict/fruit', methods=['POST'])
def predict_fruit():
    return jsonify({
        'status': 'integration_pending',
        'message': 'Fruit detection model integration pending. YOLOv8 fruit detection model architecture is prepared for future integration.',
        'affected_part': 'Fruit',
        'model': 'YOLOv8-Ready'
    }), 200

# @prediction_bp.route('/predict/stem', methods=['POST'])
# def predict_stem():
#     return jsonify({
#         'status': 'integration_pending',
#         'message': 'Stem detection model integration pending. YOLOv8 stem detection model architecture is prepared for future integration.',
#         'affected_part': 'Stem',
#         'model': 'YOLOv8-Ready'
#     }), 200

@prediction_bp.route('/predict/stem', methods=['POST'])
def predict_stem():
    if 'image' not in request.files and 'file' not in request.files:
        return jsonify({'error': 'No stem image file provided in request'}), 400

    file = request.files.get('image') or request.files.get('file')

    if file.filename == '':
        return jsonify({'error': 'Empty filename selected'}), 400

    try:
        result = predict_stem_disease(file)
        return jsonify(result), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@prediction_bp.route('/fusion', methods=['POST'])
def perform_fusion():
    data = request.get_json() or {}
    leaf_pred = data.get('leaf')
    fruit_pred = data.get('fruit')
    stem_pred = data.get('stem')
    
    fusion_result = fuse_predictions(leaf_pred, fruit_pred, stem_pred)
    return jsonify(fusion_result), 200
