def fuse_predictions(leaf_pred=None, fruit_pred=None, stem_pred=None):
    modalities = []
    confidences = []
    
    if leaf_pred and leaf_pred.get('disease'):
        modalities.append('Leaf')
        confidences.append(leaf_pred.get('confidence', 0.0))
        
    if fruit_pred and fruit_pred.get('disease') and fruit_pred.get('status') != 'integration_pending':
        modalities.append('Fruit')
        confidences.append(fruit_pred.get('confidence', 0.0))
        
    if stem_pred and stem_pred.get('disease') and stem_pred.get('status') != 'integration_pending':
        modalities.append('Stem')
        confidences.append(stem_pred.get('confidence', 0.0))
        
    if not modalities:
        return {
            'final_diagnosis': 'No Modality Analyzed',
            'overall_confidence': 0.0,
            'summary': 'No valid modality prediction provided.',
            'contributing_modalities': []
        }
        
    if len(modalities) == 1:
        single_mod = modalities[0]
        pred_source = leaf_pred if single_mod == 'Leaf' else (fruit_pred if single_mod == 'Fruit' else stem_pred)
        return {
            'final_diagnosis': pred_source.get('disease', 'Unknown'),
            'category': pred_source.get('category', 'Unclassified'),
            'affected_part': pred_source.get('affected_part', single_mod),
            'overall_confidence': pred_source.get('confidence', 0.0),
            'summary': f'Final diagnosis based on {single_mod.lower()} analysis.',
            'contributing_modalities': modalities
        }
    else:
        avg_conf = sum(confidences) / len(confidences)
        return {
            'final_diagnosis': leaf_pred.get('disease', 'Combined Diagnosis'),
            'category': leaf_pred.get('category', 'Multi-Part Analysis'),
            'affected_part': ' + '.join(modalities),
            'overall_confidence': round(avg_conf, 2),
            'summary': 'Final diagnosis generated from combined modality predictions.',
            'contributing_modalities': modalities
        }
