import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { ImageUploadCard } from '../components/ImageUploadCard';
import { ProcessingState } from '../components/ProcessingState';
import { Button } from '../components/Button';
import { usePrediction } from '../context/PredictionContext';
import { Play } from 'lucide-react';

export const Detection = () => {
  const { images, previews, setImage, removeImage, analyze, isProcessing, processingStep, error } = usePrediction();
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    const success = await analyze();
    if (success) {
      navigate('/results');
    }
  };

  const hasAnyImage = Boolean(images.leaf || images.fruit || images.stem);

  return (
    <div>
      <PageHeader
        title="Tomato Disease Detection"
        subtitle="Upload tomato plant images for AI-powered disease diagnosis and treatment recommendations."
      />

      {isProcessing && <ProcessingState currentStep={processingStep} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between">
            <span>{error}</span>
          </div>
        )}

        {/* THREE UPLOAD CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* LEAF CARD */}
          <ImageUploadCard
            type="leaf"
            title="LEAF IMAGE"
            description="Upload tomato leaf photo for DenseNet121 classification."
            badgeText="Primary Classifier"
            modelName="DenseNet121 (Active)"
            file={images.leaf}
            previewUrl={previews.leaf}
            onSelect={(f) => setImage('leaf', f)}
            onRemove={() => removeImage('leaf')}
          />

          {/* FRUIT CARD */}
          <ImageUploadCard
            type="fruit"
            title="FRUIT IMAGE"
            description="Upload tomato fruit photo for fruit defect & rot detection."
            badgeText="YOLOv8 Architecture"
            modelName="YOLOv8-Ready"
            file={images.fruit}
            previewUrl={previews.fruit}
            onSelect={(f) => setImage('fruit', f)}
            onRemove={() => removeImage('fruit')}
          />

          {/* STEM CARD */}
          <ImageUploadCard
            type="stem"
            title="STEM IMAGE"
            description="Upload tomato stem photo for vascular wilt detection."
            badgeText="YOLOv8 Architecture"
            modelName="YOLOv8-Ready"
            file={images.stem}
            previewUrl={previews.stem}
            onSelect={(f) => setImage('stem', f)}
            onRemove={() => removeImage('stem')}
          />

        </div>

        {/* ANALYZE ACTION BUTTON */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs text-center space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Ready to Analyze</h3>
            <p className="text-xs text-slate-500">
              {hasAnyImage 
                ? "Click below to execute neural network inference & decision fusion." 
                : "Please upload at least one image (Leaf, Fruit, or Stem) to enable analysis."}
            </p>
          </div>

          <Button
            size="lg"
            variant="primary"
            disabled={!hasAnyImage || isProcessing}
            onClick={handleAnalyze}
            className="w-full sm:w-auto min-w-[240px] space-x-2"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Analyze Disease</span>
          </Button>
        </div>

      </div>
    </div>
  );
};