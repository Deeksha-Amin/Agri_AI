import React from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { DiseaseResultCard } from "../components/DiseaseResultCard";
import { ConfidenceBar } from "../components/ConfidenceBar";
import { FusionResult } from "../components/FusionResult";
import { TreatmentCard } from "../components/TreatmentCard";
import { ReportCard } from "../components/ReportCard";
import { usePrediction } from "../context/PredictionContext";
import { ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";

export const Results = () => {
  const { predictionResult, resetAll } = usePrediction();
  const navigate = useNavigate();

  const data = predictionResult || null;

  if (!data) {
    return (
      <div>
        <PageHeader
          title="Analysis Results"
          subtitle="Comprehensive disease diagnosis, confidence metrics, and treatment guidance."
        />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">No Analysis Available</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            No active prediction results found. Please upload a tomato plant image on the Detection page to view disease analysis.
          </p>
          <button
            onClick={() => navigate("/detection")}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-sm"
          >
            <span>Start New Detection</span>
          </button>
        </div>
      </div>
    );
  }

  const dateStr = new Date(data.timestamp || Date.now()).toLocaleDateString() + " at " + new Date(data.timestamp || Date.now()).toLocaleTimeString();

  return (
    <div className="space-y-10 pb-16">
      <PageHeader
        title="Analysis Results"
        subtitle={"Diagnosed on " + dateStr}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Control */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/detection")}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Upload</span>
          </button>

          <button
            onClick={() => {
              resetAll();
              navigate("/detection");
            }}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>New Analysis</span>
          </button>
        </div>

        {/* 1. FINAL DIAGNOSIS CARD */}
        <DiseaseResultCard
          diagnosis={data.final_diagnosis || data.disease}
          affectedPart={data.affected_part}
          category={data.category}
        />

        {/* 2. CONFIDENCE BARS & FUSION RESULT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Modality Confidence Scores</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ConfidenceBar
                label="Leaf"
                confidence={data.leaf_confidence}
                status={data.leaf_confidence ? "Analyzed" : "Not Uploaded"}
                model="DenseNet121"
              />
              <ConfidenceBar
                label="Fruit"
                confidence={data.fruit_confidence}
                status={data.fruit_confidence === "Pending Integration" ? "Integration Pending" : "Not Uploaded"}
                model="YOLOv8"
              />
              <ConfidenceBar
                label="Stem"
                confidence={data.stem_confidence}
                status={data.stem_confidence === "Pending Integration" ? "Integration Pending" : "Not Uploaded"}
                model="YOLOv8"
              />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-base mb-4">Decision Fusion</h3>
            <FusionResult
              summary={data.fusion?.summary}
              confidence={data.overall_confidence}
              modalities={data.fusion?.contributing_modalities || ["Leaf"]}
            />
          </div>
        </div>

        {/* 3. DISEASE DESCRIPTION */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
          <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">Disease Description & Impact</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="space-y-1">
              <span className="font-bold text-slate-800 text-sm block mb-1 text-emerald-800">Symptoms</span>
              <p className="leading-relaxed">{data.symptoms || "Symptomatic leaf lesions."}</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-800 text-sm block mb-1 text-emerald-800">Cause / Pathogen</span>
              <p className="leading-relaxed">{data.cause || "Pathogen organism."}</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-800 text-sm block mb-1 text-emerald-800">Crop Impact</span>
              <p className="leading-relaxed">{data.crop_impact || "Reduced crop yield."}</p>
            </div>
          </div>
        </div>

        {/* 4. TREATMENT RECOMMENDATIONS */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Actionable Treatment Recommendations</h3>
          <TreatmentCard treatments={data.treatments} />
        </div>

        {/* 5. GENERATE PDF REPORT CARD */}
        <ReportCard resultData={data} />

      </div>
    </div>
  );
};

