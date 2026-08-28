import React from "react";
import { History, Trash2, ArrowUpRight, Clock, Award } from "lucide-react";
import { RecentPrediction } from "../types";

interface RecentPredictionsProps {
  history: RecentPrediction[];
  onClearHistory: () => void;
  onSelectRecent: (item: RecentPrediction) => void;
}

const SPECIES_EMOJIS: Record<string, string> = {
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

export const RecentPredictions: React.FC<RecentPredictionsProps> = ({
  history,
  onClearHistory,
  onSelectRecent,
}) => {
  if (!history || history.length === 0) return null;

  return (
    <div
      id="recent-predictions-panel"
      className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl space-y-4"
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-cyan-400" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Recent Predictions
          </h3>
          <span className="rounded-full bg-slate-800 px-2 py-0.2 text-[10px] font-mono text-slate-400">
            {history.length}
          </span>
        </div>

        <button
          id="clear-history-btn"
          onClick={onClearHistory}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400 transition-colors"
          title="Clear prediction history"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {history.map((item) => {
          const emoji = SPECIES_EMOJIS[item.prediction] || "🐾";
          return (
            <div
              key={item.id}
              onClick={() => onSelectRecent(item)}
              className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/60 p-3 transition-all hover:border-cyan-500/50 hover:bg-slate-900"
            >
              <div className="flex items-center gap-3">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.prediction}
                    className="h-10 w-10 rounded-lg object-cover ring-1 ring-slate-700"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-lg">
                    {emoji}
                  </div>
                )}
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1">
                    <span>{emoji}</span>
                    <span>{item.prediction}</span>
                  </h4>
                  <p className="flex items-center gap-1 text-[10px] text-slate-500">
                    <Clock className="h-2.5 w-2.5" />
                    {item.timestamp}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="font-mono text-xs font-bold text-cyan-400">
                  {item.confidence.toFixed(1)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
