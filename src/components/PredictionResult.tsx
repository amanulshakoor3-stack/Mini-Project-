import React, { useEffect } from "react";
import { Sparkles, RefreshCw, Layers, Clock, ShieldCheck, CheckCircle2, Award, Zap, Info, Compass, Utensils } from "lucide-react";
import confetti from "canvas-confetti";
import { PredictionResult as PredictionResultType } from "../types";

interface PredictionResultProps {
  result: PredictionResultType;
  uploadedImage: string | null;
  onClassifyAnother: () => void;
  onClear: () => void;
}

const SPECIES_ICONS: Record<string, string> = {
  Dog: "🐕",
  Cat: "🐈",
  Lion: "🦁",
  Tiger: "🐅",
  Elephant: "🐘",
  Horse: "🐎",
  Cow: "🐄",
  Deer: "🦌",
  Bear: "🐻",
  Monkey: "🐒",
  Wolf: "🐺",
  Fox: "🦊",
  Leopard: "🐆",
  Cheetah: "🐆",
  Zebra: "🦓",
  Giraffe: "🦒",
  Kangaroo: "🦘",
  Panda: "🐼",
};

export const PredictionResult: React.FC<PredictionResultProps> = ({
  result,
  uploadedImage,
  onClassifyAnother,
  onClear,
}) => {
  const icon = SPECIES_ICONS[result.prediction] || "🐾";

  useEffect(() => {
    // Fire confetti for confident detection
    if (result.confidence >= 80) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#22d3ee", "#6366f1", "#a855f7", "#10b981"],
        });
      } catch {
        // Safe ignore
      }
    }
  }, [result]);

  return (
    <div id="prediction-result-view" className="w-full space-y-6 animate-fadeIn">
      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 px-6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Deep Learning Inference Complete
            </h3>
            <p className="text-xs text-slate-400">
              Softmax categorical cross-entropy prediction computed
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {result.latency_ms && (
            <span className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 text-xs font-mono text-cyan-300">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              {result.latency_ms} ms
            </span>
          )}
          <span className="flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/60 px-3 py-1 text-xs font-medium text-indigo-300">
            <Layers className="h-3.5 w-3.5 text-indigo-400" />
            {result.model_name || "EfficientNetB0 Transfer Learning"}
          </span>
        </div>
      </div>

      {/* Main Result Card */}
      <div
        id="prediction-result-card"
        className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-950/95 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10"
      >
        {/* Glow ambient background */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[90px]" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          
          {/* Left / Center Column: Big Highlighted Prediction */}
          <div className="flex flex-col items-center justify-center text-center lg:col-span-6 lg:border-r lg:border-slate-800/80 lg:pr-8">
            
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-950/50 px-4 py-1 text-xs font-bold uppercase tracking-widest text-cyan-300 shadow-inner">
              <Award className="h-3.5 w-3.5 text-amber-400" />
              <span>CLASSIFICATION RESULT</span>
            </div>

            {/* Giant Emoji Icon */}
            <div className="mt-6 flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-tr from-indigo-500/20 via-cyan-500/20 to-purple-500/20 text-6xl shadow-xl ring-1 ring-white/20 transition-transform hover:scale-105">
              {icon}
            </div>

            {/* Predicted Species Title */}
            <h2 className="mt-5 text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
              {result.prediction}
            </h2>

            {result.scientific_name && (
              <p className="mt-1 text-sm font-serif italic text-cyan-300">
                {result.scientific_name}
              </p>
            )}

            {/* Confidence Metric */}
            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-sm font-medium text-slate-400">Confidence:</span>
              <span className="text-3xl font-black tracking-tight text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text">
                {result.confidence.toFixed(2)}%
              </span>
            </div>

            {/* Primary animated progress bar */}
            <div className="mt-4 w-full max-w-md">
              <div className="h-3.5 w-full overflow-hidden rounded-full bg-slate-800/90 p-0.5 ring-1 ring-slate-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 transition-all duration-1000 ease-out shadow-[0_0_12px_#22d3ee]"
                  style={{ width: `${Math.min(100, Math.max(5, result.confidence))}%` }}
                />
              </div>
            </div>

            {/* Uploaded Image Thumbnail Preview with Metadata */}
            {uploadedImage && (
              <div className="mt-6 flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-2.5 pr-4 backdrop-blur-md">
                <img
                  src={uploadedImage}
                  alt="Uploaded Source"
                  className="h-12 w-12 rounded-lg object-cover ring-1 ring-slate-700"
                />
                <div className="text-left text-xs">
                  <p className="font-semibold text-slate-200">Input Image Processed</p>
                  <p className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="h-3 w-3" />
                    {result.timestamp || new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Top 3 Predictions & Biological Taxonomy Card */}
          <div className="space-y-6 lg:col-span-6">
            
            {/* Top 3 Predictions */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-cyan-400" />
                  Top 3 Predictions
                </h4>
                <span className="text-[11px] font-mono text-slate-400">Softmax Score</span>
              </div>

              <div className="mt-4 space-y-3.5">
                {result.top_predictions.slice(0, 3).map((item, index) => {
                  const itemIcon = SPECIES_ICONS[item.class] || "🐾";
                  const isTop = index === 0;
                  return (
                    <div
                      key={item.class}
                      className={`group rounded-xl p-3 transition-all ${
                        isTop
                          ? "border border-cyan-500/40 bg-cyan-950/30"
                          : "border border-slate-800/80 bg-slate-950/40"
                      }`}
                    >
                      <div className="flex items-center justify-between text-sm font-medium">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-800 text-xs font-bold text-slate-300">
                            #{index + 1}
                          </span>
                          <span className="text-base">{itemIcon}</span>
                          <span className={`font-semibold ${isTop ? "text-white" : "text-slate-300"}`}>
                            {item.class}
                          </span>
                        </div>
                        <span className={`font-mono font-bold ${isTop ? "text-cyan-400" : "text-slate-400"}`}>
                          {item.confidence.toFixed(2)}%
                        </span>
                      </div>

                      {/* Bar */}
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            isTop
                              ? "bg-gradient-to-r from-cyan-400 to-indigo-500"
                              : index === 1
                              ? "bg-indigo-500/70"
                              : "bg-slate-600"
                          }`}
                          style={{ width: `${Math.min(100, Math.max(2, item.confidence))}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Biological / Ecological Details */}
            <div className="grid grid-cols-2 gap-3">
              {result.diet && (
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur-md">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Utensils className="h-3.5 w-3.5 text-amber-400" />
                    <span>Diet Classification</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-white truncate">{result.diet}</p>
                </div>
              )}

              {result.habitat && (
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur-md">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Compass className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Primary Habitat</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-white truncate">{result.habitat}</p>
                </div>
              )}
            </div>

            {/* Salient Features Identified */}
            {result.detected_features && result.detected_features.length > 0 && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                  <span>Key Visual Features Identified by Model:</span>
                </div>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-400">
                  {result.detected_features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

        </div>

        {/* Action Buttons Row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-slate-800/80 pt-6">
          <button
            id="classify-another-btn"
            onClick={onClassifyAnother}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-cyan-500/35 hover:scale-102 active:scale-98"
          >
            <Sparkles className="h-4 w-4 text-cyan-200" />
            <span>Classify Another Image</span>
          </button>

          <button
            id="clear-result-btn"
            onClick={onClear}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/90 px-6 py-3.5 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Clear</span>
          </button>
        </div>

      </div>
    </div>
  );
};
