import json
import os
from config import Config

def load_disease_metadata(class_index):
    str_idx = str(class_index)
    
    with open(Config.DISEASES_DATA_PATH, 'r', encoding='utf-8') as f:
        diseases = json.load(f)
        
    with open(Config.TREATMENTS_DATA_PATH, 'r', encoding='utf-8') as f:
        treatments = json.load(f)
        
    disease_info = diseases.get(str_idx, {
        'name': 'Unknown Condition',
        'raw_name': 'Unknown',
        'category': 'Unclassified',
        'affected_part': 'Leaf',
        'symptoms': 'No detailed symptom description available.',
        'cause': 'Unspecified pathogen.',
        'crop_impact': 'Moderate potential impact.'
    })
    
    treatment_info = treatments.get(str_idx, {
        'chemical': {'name': 'Consult local agronomist', 'dosage': 'N/A', 'interval': 'N/A'},
        'organic': {'name': 'General organic compost tea', 'options': ['Neem oil spray']},
        'preventive': ['Practice crop rotation.', 'Ensure field sanitation.'],
        'best_practices': ['Remove symptomatic foliage.', 'Regular field monitoring.']
    })
    
    return {
        'disease': disease_info['name'],
        'raw_name': disease_info['raw_name'],
        'category': disease_info['category'],
        'affected_part': disease_info['affected_part'],
        'symptoms': disease_info['symptoms'],
        'cause': disease_info['cause'],
        'crop_impact': disease_info['crop_impact'],
        'treatments': treatment_info
    }
