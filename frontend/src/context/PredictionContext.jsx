import React, { createContext, useContext, useState } from "react";
import { predictLeafImage, predictFruitImage, predictStemImage, performFusion } from "../services/api";

const PredictionContext = createContext();

export const PredictionProvider = ({ children }) => {
  const [images, setImages] = useState({ leaf: null, fruit: null, stem: null });
  const [previews, setPreviews] = useState({ leaf: null, fruit: null, stem: null });
  
  const [predictionResult, setPredictionResult] = useState(() => {
    try {
      const saved = sessionStorage.getItem("agri_ai_prediction");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");
  const [error, setError] = useState(null);

  const savePrediction = (result) => {
    setPredictionResult(result);
    try {
      if (result) {
        sessionStorage.setItem("agri_ai_prediction", JSON.stringify(result));
      } else {
        sessionStorage.removeItem("agri_ai_prediction");
      }
    } catch (e) {}
  };

  const setImage = (type, file) => {
    setImages(prev => ({ ...prev, [type]: file }));
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviews(prev => ({ ...prev, [type]: url }));
    } else {
      setPreviews(prev => ({ ...prev, [type]: null }));
    }
  };

  const removeImage = (type) => {
    setImages(prev => ({ ...prev, [type]: null }));
    setPreviews(prev => ({ ...prev, [type]: null }));
  };

  const resetAll = () => {
    setImages({ leaf: null, fruit: null, stem: null });
    setPreviews({ leaf: null, fruit: null, stem: null });
    savePrediction(null);
    setIsProcessing(false);
    setProcessingStep("");
    setError(null);
  };

  const analyze = async () => {
    if (!images.leaf && !images.fruit && !images.stem) {
      setError("Please upload at least one image (Leaf, Fruit, or Stem) to analyze.");
      return false;
    }

    setIsProcessing(true);
    setError(null);

    try {
      setProcessingStep("Uploading Images...");
      await new Promise(r => setTimeout(r, 400));

      setProcessingStep("Preprocessing...");
      await new Promise(r => setTimeout(r, 400));

      let leafRes = null;
      let fruitRes = null;
      let stemRes = null;

      if (images.leaf) {
        setProcessingStep("Running DenseNet121 Leaf Classifier...");
        leafRes = await predictLeafImage(images.leaf);
        console.log('Leaf API response:', leafRes);
      }

      if (images.fruit) {
        // setProcessingStep("Running YOLOv8 Fruit Model check...");
        setProcessingStep("Running YOLO11s Stem Classifier...");
        fruitRes = await predictFruitImage(images.fruit);
      }
      console.log("STEM IMAGE:", images.stem);

      if (images.stem) {
        setProcessingStep("Running YOLOv8 Stem Model check...");
        stemRes = await predictStemImage(images.stem);
      }

      setProcessingStep("Decision Fusion & Generating Recommendations...");
      const fusionRes = await performFusion({ leaf: leafRes, fruit: fruitRes, stem: stemRes });

      const finalResult = {
        timestamp: new Date().toISOString(),
        leaf: leafRes,
        fruit: fruitRes,
        stem: stemRes,
        fusion: fusionRes,
        final_diagnosis: fusionRes.final_diagnosis || (leafRes ? leafRes.disease : "Disease Analysis"),
        category: leafRes ? leafRes.category : (fusionRes.category || "Fungal Disease"),
        affected_part: fusionRes.affected_part || "Leaf",
        overall_confidence: fusionRes.overall_confidence || (leafRes ? leafRes.confidence : 0.0),
        leaf_confidence: leafRes ? leafRes.confidence : null,
        fruit_confidence: fruitRes && fruitRes.confidence ? fruitRes.confidence : "Pending Integration",
        stem_confidence: stemRes && stemRes.confidence ? stemRes.confidence : "Pending Integration",
        symptoms: leafRes ? leafRes.symptoms : "Symptomatic lesions on plant tissue.",
        cause: leafRes ? leafRes.cause : "Fungal/bacterial pathogen infestation.",
        crop_impact: leafRes ? leafRes.crop_impact : "Potential leaf drop and reduced crop yield.",
        treatments: leafRes ? leafRes.treatments : {},
        previews: { ...previews }
      };

      savePrediction(finalResult);
      setIsProcessing(false);
      return true;
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err.message || "An error occurred during disease analysis. Please ensure the backend is running.");
      setIsProcessing(false);
      return false;
    }
  };

  return (
    <PredictionContext.Provider value={{
      images,
      previews,
      predictionResult,
      isProcessing,
      processingStep,
      error,
      setImage,
      removeImage,
      resetAll,
      analyze
    }}>
      {children}
    </PredictionContext.Provider>
  );
};

export const usePrediction = () => useContext(PredictionContext);

