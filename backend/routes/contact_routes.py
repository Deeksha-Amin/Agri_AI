from flask import Blueprint, request, jsonify
import datetime
from config import Config

contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/contact', methods=['POST'])
def submit_contact():
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    subject = data.get('subject', '').strip()
    message = data.get('message', '').strip()
    
    if not name or not email or not message:
        return jsonify({'error': 'Name, email, and message fields are required'}), 400
        
    contact_entry = {
        'name': name,
        'email': email,
        'subject': subject,
        'message': message,
        'created_at': datetime.datetime.now().isoformat()
    }
    
    try:
        from pymongo import MongoClient
        client = MongoClient(Config.MONGO_URI, serverSelectionTimeoutMS=2000)
        db = client.get_default_database('agri_ai')
        db.contact_messages.insert_one(contact_entry)
    except Exception as e:
        print(f'MongoDB connection skipped or unavailable: {e}')
        
    return jsonify({
        'status': 'success',
        'message': 'Message sent successfully. Thank you for contacting Agri AI.'
    }), 200
