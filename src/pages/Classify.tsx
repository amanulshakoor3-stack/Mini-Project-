import React, { useRef } from "react";
import { UploadBox } from "../components/UploadBox";
import { PredictionResult } from "../components/PredictionResult";
import { ProbabilityChart } from "../components/ProbabilityChart";
import { RecentPredictions } from "../components/RecentPredictions";
import { PredictionResult as PredictionResultType, RecentPrediction } from "../types";
import { Sparkles, HelpCircle, Layers } from "lucide-react";

interface ClassifyProps {
  onAnalyze: (imageData: string | File) => void;
  isLoading: boolean;
  predictionResult: PredictionResultType | null;
  selectedImage: string | null;
  setSelectedImage: (img: string | null) => void;
  selectedFile: File | null;
  setSelectedFile: (f: File | null) => void;
  onClear: () => void;
  onClassifyAnother: () => void;
  history: RecentPrediction[];
  onClearHistory: () => void;
  onSelectRecent: (item: RecentPrediction) => void;
}

export const Classify: React.FC<ClassifyProps> = ({
  onAnalyze,
  isLoading,
  predictionResult,
  selectedImage,
  setSelectedImage,
  selectedFile,
  setSelectedFile,
  onClear,
  onClassifyAnother,
  history,
  onClearHistory,
  onSelectRecent,
}) => {
  const resultRef = useRef<HTMLDivElement>(null);

  return (
    <div id="classify" className="py-10 md:py-16 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Page Title & Intro */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/60 px-4 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Real-time Inference Hub</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Animal Species Classification
        </h1>
        <p className="text-sm text-slate-300 sm:text-base">
          Upload any animal image to process through the Deep Learning EfficientNetB0 neural model.
        </p>
      </div>

      {/* Main Upload Box */}
      <UploadBox
        onAnalyze={onAnalyze}
        isLoading={isLoading}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        onClear={onClear}
      />

      {/* Prediction Result & Probability Visualization */}
      {predictionResult && (
        <div ref={resultRef} className="space-y-8 animate-fadeIn">
          <PredictionResult
            result={predictionResult}
            uploadedImage={selectedImage}
            onClassifyAnother={onClassifyAnother}
            onClear={onClear}
          />

          <ProbabilityChart
            probabilities={predictionResult.all_probabilities || predictionResult.top_predictions}
            topPredictionClass={predictionResult.prediction}
          />
        </div>
      )}

      {/* Recent Classifications History */}
      <RecentPredictions
        history={history}
        onClearHistory={onClearHistory}
        onSelectRecent={onSelectRecent}
      />

    </div>
  );
};
