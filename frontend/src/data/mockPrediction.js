export const mockPredictionResult = {
  final_diagnosis: "Early Blight",
  category: "Fungal Disease",
  affected_part: "Leaf",
  overall_confidence: 94.2,
  leaf_confidence: 94.2,
  fruit_confidence: "Pending Integration",
  stem_confidence: "Pending Integration",
  symptoms: "Concentric target-like dark spots surrounded by yellow halos starting on lower older leaves.",
  cause: "Alternaria solani fungus, favored by warm temperatures and high humidity/wet foliage.",
  crop_impact: "Causes leaf drop, weakening the plant and reducing total fruit yield and quality.",
  treatments: {
    chemical: {
      name: "Chlorothalonil 75% WP or Mancozeb 75% WP",
      dosage: "2.0 g per liter of water",
      interval: "Apply every 7-14 days starting at first symptom."
    },
    organic: {
      name: "Bio-fungicide containing Trichoderma viride or Copper Octanoate",
      options: ["Trichoderma harzianum 5g/L", "Neem oil 5ml/L", "Potassium bicarbonate spray"]
    },
    preventive: [
      "Mulch soil surface around plant base to prevent fungal spore splashback.",
      "Avoid working in wet foliage to prevent spore distribution.",
      "Select resistant tomato varieties."
    ],
    best_practices: [
      "Prune lower leaves up to 30 cm from ground level.",
      "Clear crop residues immediately after harvest.",
      "Ensure proper nitrogen balance without excess fertilization."
    ]
  }
};
