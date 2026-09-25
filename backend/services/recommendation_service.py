def get_recommendations(disease_name, metadata):
    treatments = metadata.get('treatments', {})
    return {
        'disease': disease_name,
        'chemical': treatments.get('chemical', {}),
        'organic': treatments.get('organic', {}),
        'preventive': treatments.get('preventive', []),
        'best_practices': treatments.get('best_practices', []),
        'disclaimer': 'Note: Treatment recommendations are provided for research and academic project purposes. Always verify product labels and local agricultural extensions before field application.'
    }
