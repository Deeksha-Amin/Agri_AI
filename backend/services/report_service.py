import io
import datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def generate_pdf_report(report_data):
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor('#1b4332')
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#4a5568')
    )
    
    section_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=colors.HexColor('#2d6a4f'),
        spaceAfter=6
    )
    
    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#2d3748')
    )
    
    bold_body_style = ParagraphStyle(
        'BoldBodyCustom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#1a202c')
    )
    
    elements = []
    
    now_str = datetime.datetime.now().strftime('%Y-%m-%d %H:%M')
    ref_str = 'AGRI-AI-' + datetime.datetime.now().strftime('%S%M')
    
    header_data = [
        [
            Paragraph('<b>Tomato Disease Detection System</b>', title_style),
            Paragraph('<b>Date:</b> ' + now_str + '<br/><b>Ref:</b> ' + ref_str, subtitle_style)
        ]
    ]
    header_table = Table(header_data, colWidths=[360, 180])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ALIGN', (1,0), (1,0), 'RIGHT'),
    ]))
    elements.append(header_table)
    elements.append(Spacer(1, 6))
    elements.append(HRFlowable(width='100%', thickness=1.5, color=colors.HexColor('#2d6a4f'), spaceAfter=10))
    
    diagnosis_name = report_data.get('final_diagnosis', report_data.get('disease', 'Unknown'))
    category = report_data.get('category', 'Fungal Disease')
    affected_part = report_data.get('affected_part', 'Leaf')
    confidence = report_data.get('overall_confidence', report_data.get('confidence', 0.0))
    
    diag_text = '<b>Category:</b> ' + str(category) + '  |  <b>Affected Part:</b> ' + str(affected_part) + '  |  <b>Overall Confidence:</b> ' + str(confidence) + '%'
    
    diag_box_data = [
        [Paragraph('<b>FINAL DIAGNOSIS</b>', ParagraphStyle('H', parent=bold_body_style, textColor=colors.HexColor('#1b4332'), fontSize=9))],
        [Paragraph('<font size=15 color="#1b4332"><b>' + str(diagnosis_name) + '</b></font>', body_style)],
        [Paragraph(diag_text, body_style)]
    ]
    diag_box = Table(diag_box_data, colWidths=[540])
    diag_box.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#e8f5e9')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#a5d6a7')),
        ('PADDING', (0,0), (-1,-1), 8),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
    ]))
    elements.append(diag_box)
    elements.append(Spacer(1, 10))
    
    elements.append(Paragraph('Analysis Modality Confidence Scores', section_style))
    conf_data = [
        [Paragraph('<b>Modality</b>', bold_body_style), Paragraph('<b>Model Architecture</b>', bold_body_style), Paragraph('<b>Confidence</b>', bold_body_style), Paragraph('<b>Status</b>', bold_body_style)]
    ]
    
    leaf_conf = report_data.get('leaf_confidence', confidence if affected_part == 'Leaf' else 'N/A')
    leaf_val = str(leaf_conf) + '%' if isinstance(leaf_conf, (int, float)) else str(leaf_conf)
    conf_data.append([Paragraph('Leaf Image', body_style), Paragraph('DenseNet121', body_style), Paragraph(leaf_val, body_style), Paragraph('Analyzed', body_style)])
    
    fruit_conf = report_data.get('fruit_confidence', 'Pending Integration')
    conf_data.append([Paragraph('Fruit Image', body_style), Paragraph('YOLOv8 (Architecture Ready)', body_style), Paragraph(str(fruit_conf), body_style), Paragraph('Pending', body_style)])
    
    stem_conf = report_data.get('stem_confidence', 'Pending Integration')
    conf_data.append([Paragraph('Stem Image', body_style), Paragraph('YOLOv8 (Architecture Ready)', body_style), Paragraph(str(stem_conf), body_style), Paragraph('Pending', body_style)])
    
    conf_table = Table(conf_data, colWidths=[120, 180, 120, 120])
    conf_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#f1f8e9')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#c8e6c9')),
        ('PADDING', (0,0), (-1,-1), 5),
    ]))
    elements.append(conf_table)
    elements.append(Spacer(1, 10))
    
    symptoms = report_data.get('symptoms', 'N/A')
    cause = report_data.get('cause', 'N/A')
    crop_impact = report_data.get('crop_impact', 'N/A')
    
    elements.append(Paragraph('Disease Description & Impact', section_style))
    desc_data = [
        [Paragraph('<b>Symptoms:</b>', bold_body_style), Paragraph(str(symptoms), body_style)],
        [Paragraph('<b>Pathogen / Cause:</b>', bold_body_style), Paragraph(str(cause), body_style)],
        [Paragraph('<b>Crop Impact:</b>', bold_body_style), Paragraph(str(crop_impact), body_style)]
    ]
    desc_table = Table(desc_data, colWidths=[120, 420])
    desc_table.setStyle(TableStyle([
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    elements.append(desc_table)
    elements.append(Spacer(1, 10))
    
    treatments = report_data.get('treatments', {})
    chem = treatments.get('chemical', {})
    org = treatments.get('organic', {})
    prev = treatments.get('preventive', [])
    best = treatments.get('best_practices', [])
    
    chem_str = '<b>' + str(chem.get('name', 'N/A')) + '</b><br/>Dosage: ' + str(chem.get('dosage', 'N/A')) + '<br/>Interval: ' + str(chem.get('interval', 'N/A'))
    org_options = ', '.join(org.get('options', []))
    org_str = str(org.get('name', 'Neem oil / Bio-fungicide')) + '<br/>Options: ' + org_options
    prev_str = '<br/>'.join(['• ' + str(p) for p in prev])
    best_str = '<br/>'.join(['• ' + str(b) for b in best])
    
    elements.append(Paragraph('Treatment & Actionable Recommendations', section_style))
    
    treat_data = [
        [Paragraph('<b>Category</b>', bold_body_style), Paragraph('<b>Recommendation Details</b>', bold_body_style)],
        [Paragraph('<b>Chemical Treatment</b>', body_style), Paragraph(chem_str, body_style)],
        [Paragraph('<b>Organic Treatment</b>', body_style), Paragraph(org_str, body_style)],
        [Paragraph('<b>Preventive Measures</b>', body_style), Paragraph(prev_str, body_style)],
        [Paragraph('<b>Best Practices</b>', body_style), Paragraph(best_str, body_style)]
    ]
    
    treat_table = Table(treat_data, colWidths=[130, 410])
    treat_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#e8f5e9')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#c8e6c9')),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    elements.append(treat_table)
    elements.append(Spacer(1, 12))
    
    disclaimer = Paragraph('<font size=7 color="#718096"><b>Disclaimer:</b> This report is generated by Agri AI (Multi-Part Tomato Disease Detection System) using deep learning model predictions. Recommendations are for academic, research, and advisory purposes. Consult local agricultural extensions before field chemical application.</font>', body_style)
    elements.append(disclaimer)
    
    doc.build(elements)
    buffer.seek(0)
    return buffer.getvalue()
