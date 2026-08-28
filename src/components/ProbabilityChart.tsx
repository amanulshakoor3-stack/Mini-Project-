import React, { useState } from "react";
import { BarChart3, TrendingUp, Filter, Sparkles } from "lucide-react";
import { PredictionItem } from "../types";

interface ProbabilityChartProps {
  probabilities: PredictionItem[];
  topPredictionClass: string;
}

const ICONS_MAP: Record<string, string> = {
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
};

export const ProbabilityChart: React.FC<ProbabilityChartProps> = ({
  probabilities,
  topPredictionClass,
}) => {
  const [viewAll, setViewAll] = useState(true);

  if (!probabilities || probabilities.length === 0) return null;

  // Sort descending
  const sorted = [...probabilities].sort((a, b) => b.confidence - a.confidence);
  const displayItems = viewAll ? sorted : sorted.slice(0, 5);

  return (
    <div
      id="probability-chart-card"
      className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
              <BarChart3 className="h-4 w-4" />
            </span>
            Probability Distribution Chart
          </h3>
          <p className="mt-0.5 text-xs text-slate-400">
            Softmax output probabilities across animal classification classes
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-950 p-1">
          <button
            id="chart-top5-toggle"
            onClick={() => setViewAll(false)}
            className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
              !viewAll
                ? "bg-slate-800 text-cyan-400 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Top 5
          </button>
          <button
            id="chart-all-toggle"
            onClick={() => setViewAll(true)}
            className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
              viewAll
                ? "bg-slate-800 text-cyan-400 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All Classes
          </button>
        </div>
      </div>

      {/* Probability Bars Grid */}
      <div className="space-y-4">
        {displayItems.map((item, index) => {
          const isTop = item.class.toLowerCase() === topPredictionClass.toLowerCase() || index === 0;
          const icon = ICONS_MAP[item.class] || "🐾";
          const percentVal = Math.max(0.2, item.confidence);

          return (
            <div key={item.class} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-medium">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{icon}</span>
                  <span className={`font-semibold ${isTop ? "text-cyan-300 font-bold" : "text-slate-300"}`}>
                    {item.class}
                  </span>
                  {isTop && (
                    <span className="rounded bg-cyan-500/20 px-1.5 py-0.2 text-[9px] font-bold text-cyan-300">
                      TOP MATCH
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-500">
                    p = {(item.confidence / 100).toFixed(4)}
                  </span>
                  <span className={`font-mono font-bold ${isTop ? "text-cyan-400 text-sm" : "text-slate-300"}`}>
                    {item.confidence.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-950/80 p-0.5 ring-1 ring-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    isTop
                      ? "bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 shadow-[0_0_10px_#22d3ee]"
                      : index === 1
                      ? "bg-gradient-to-r from-indigo-500 to-indigo-600"
                      : index === 2
                      ? "bg-gradient-to-r from-purple-600 to-slate-600"
                      : "bg-slate-700/60"
                  }`}
                  style={{ width: `${percentVal}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Footer Note */}
      <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/50 p-3 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
          <span>Calculated via Normalized Softmax Activation: <code>σ(z)ᵢ = e^(zᵢ) / Σ e^(zⱼ)</code></span>
        </span>
        <span className="hidden sm:inline-block font-mono text-[11px] text-slate-500">
          Sum = 100.0%
        </span>
      </div>
    </div>
  );
};
