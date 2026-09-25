from flask import Blueprint, request, jsonify, send_file
import io
from services.report_service import generate_pdf_report

report_bp = Blueprint('report', __name__)

@report_bp.route('/report', methods=['POST'])
def download_report():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Report data is required'}), 400
        
    try:
        pdf_bytes = generate_pdf_report(data)
        disease_title = str(data.get('final_diagnosis', data.get('disease', 'Analysis'))).replace(' ', '_')
        filename = f"Tomato_Disease_Report_{disease_title}.pdf"
        
        return send_file(
            io.BytesIO(pdf_bytes),
            mimetype='application/pdf',
            as_attachment=True,
            download_name=filename
        )
    except Exception as e:
        return jsonify({'error': f'Failed to generate PDF report: {str(e)}'}), 500
