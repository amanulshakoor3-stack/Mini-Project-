import React from "react";
import { Layers, Cpu, Database, Binary, Maximize2, Zap, GitBranch, Shield, ArrowDown, Activity, Sparkles } from "lucide-react";

export const ModelInfo: React.FC = () => {
  const modelSpecs = [
    { label: "Model", value: "EfficientNetB0", icon: Cpu, desc: "Compound scaled CNN" },
    { label: "Architecture", value: "Transfer Learning", icon: Layers, desc: "Pretrained feature backbone" },
    { label: "Framework", value: "TensorFlow / Keras", icon: Binary, desc: "Google Deep Learning" },
    { label: "Classes", value: "10+ Core Species", icon: Database, desc: "Mammals, Carnivorans, Ungulates" },
    { label: "Input Size", value: "224 × 224 × 3", icon: Maximize2, desc: "RGB Normalized Tensor" },
    { label: "Output", value: "Softmax Probability", icon: Zap, desc: "Categorical Cross-Entropy" },
  ];

  const architecturePipeline = [
    { title: "Input Image", type: "Raw Upload", shape: "Variable (W × H × 3)", color: "from-cyan-500 to-blue-500" },
    { title: "Preprocessing", type: "Lanczos Resample & Normalize", shape: "(1, 224, 224, 3)", color: "from-blue-500 to-indigo-500" },
    { title: "EfficientNetB0", type: "Pretrained Feature Backbone", shape: "MBConv 1..7 Blocks", color: "from-indigo-500 to-purple-500" },
    { title: "Feature Extraction", type: "High-level visual activation", shape: "(7, 7, 1280)", color: "from-purple-500 to-pink-500" },
    { title: "Global Average Pooling", type: "Spatial feature reduction", shape: "(1, 1280)", color: "from-pink-500 to-rose-500" },
    { title: "Dense Classification Layer", type: "ReLU + BatchNorm + Dropout(0.35)", shape: "(1, 256)", color: "from-rose-500 to-amber-500" },
    { title: "Softmax Activation", type: "Multi-class probability", shape: "(1, 10)", color: "from-amber-500 to-emerald-500" },
    { title: "Animal Species Result", type: "Top-3 Ranked Predictions", shape: "Label + Confidence %", color: "from-emerald-500 to-teal-500" },
  ];

  return (
    <section id="model" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/60 px-4 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md">
            <Cpu className="h-3.5 w-3.5" />
            <span>Deep Learning Architecture</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Model Specifications & Dashboard
          </h2>
          <p className="mt-3 text-base text-slate-300 sm:text-lg">
            Transfer Learning architecture optimized for high-accuracy multi-class animal recognition with low inference latency.
          </p>
        </div>

        {/* Model Metrics Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {modelSpecs.map((spec) => {
            const Icon = spec.icon;
            return (
              <div
                key={spec.label}
                id={`model-spec-${spec.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl transition-all hover:border-cyan-500/50 hover:bg-slate-850"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-3">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                    {spec.label}
                  </p>
                  <p className="mt-1 text-sm font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                    {spec.value}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-500 truncate">
                    {spec.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Architecture Flow Visualization */}
        <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
                <GitBranch className="h-5 w-5 text-cyan-400" />
                Neural Network Computational Graph
              </h3>
              <p className="text-xs text-slate-400">
                Layer-by-layer forward propagation pass through the Transfer Learning model
              </p>
            </div>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              Inference: &lt; 150ms GPU / &lt; 1.2s CPU
            </span>
          </div>

          {/* Pipeline flow */}
          <div className="mt-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-4xl space-y-3">
              {architecturePipeline.map((node, index) => (
                <React.Fragment key={node.title}>
                  <div className="group flex flex-col sm:flex-row items-center justify-between rounded-xl border border-slate-800 bg-slate-950/80 p-4 transition-all hover:border-slate-700 hover:bg-slate-900/90 shadow-md">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 font-mono text-xs font-bold text-slate-300">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {node.title}
                        </h4>
                        <p className="text-xs text-slate-400">{node.type}</p>
                      </div>
                    </div>

                    <div className="mt-2 sm:mt-0 flex items-center gap-2">
                      <span className="rounded bg-slate-800/80 px-2.5 py-1 font-mono text-[11px] text-cyan-300 border border-slate-700">
                        {node.shape}
                      </span>
                    </div>
                  </div>

                  {index < architecturePipeline.length - 1 && (
                    <div className="flex justify-center py-0.5">
                      <ArrowDown className="h-4 w-4 text-cyan-400/60 animate-bounce" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
