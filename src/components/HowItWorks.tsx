import React from "react";
import { UploadCloud, Sliders, Cpu, Award, ArrowRight, CheckCircle2 } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      stepNumber: "01",
      title: "Upload Image",
      icon: UploadCloud,
      color: "from-cyan-500 to-blue-600",
      textColor: "text-cyan-400",
      description:
        "User uploads any animal photo via drag-and-drop, device file browser, camera snapshot, or the sample image library in JPG, PNG, or WEBP format.",
      details: ["Supports up to 10MB", "Live client-side validation", "Aspect ratio preservation"],
    },
    {
      stepNumber: "02",
      title: "Preprocessing",
      icon: Sliders,
      color: "from-blue-500 to-indigo-600",
      textColor: "text-blue-400",
      description:
        "The image pipeline converts RGBA/Grayscale to 3-channel RGB, resizes to standard 224 × 224 resolution using Lanczos interpolation, and normalizes pixel tensor values.",
      details: ["Lanczos 224×224 Resampling", "Tensor conversion (1, 224, 224, 3)", "RGB channel zero-centering"],
    },
    {
      stepNumber: "03",
      title: "Deep Learning",
      icon: Cpu,
      color: "from-indigo-500 to-purple-600",
      textColor: "text-indigo-400",
      description:
        "The preprocessed tensor passes through an EfficientNetB0 convolutional backbone. Pretrained ImageNet weights extract multi-scale spatial textures, edges, and semantic traits.",
      details: ["MBConv Depthwise Convolutions", "Global Average Pooling 2D", "Batch Normalization & Dropout (0.3)"],
    },
    {
      stepNumber: "04",
      title: "Prediction",
      icon: Award,
      color: "from-purple-500 to-pink-600",
      textColor: "text-purple-400",
      description:
        "Dense classification layers evaluate logits through a Softmax activation function, producing categorical probability scores, Top-3 ranked matches, and confidence metrics.",
      details: ["Softmax probability distribution", "Top-3 candidate ranking", "Salient visual feature reasoning"],
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/60 px-4 py-1 text-xs font-semibold text-indigo-300 backdrop-blur-md">
            <span>End-to-End Pipeline</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            How AnimalAI Works
          </h2>
          <p className="mt-3 text-base text-slate-300 sm:text-lg">
            From raw camera photograph to high-confidence taxonomic species identification in under 2 seconds.
          </p>
        </div>

        {/* 4 Connected Step Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 relative">
          
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 -translate-y-8 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 -z-10 opacity-30" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.stepNumber}
                id={`how-it-works-step-${step.stepNumber}`}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl transition-all duration-300 hover:border-slate-700 hover:bg-slate-850 hover:scale-102"
              >
                {/* Top Step Pill & Icon */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-700 group-hover:text-slate-500 transition-colors font-mono">
                      {step.stepNumber}
                    </span>
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${step.color} p-0.5 shadow-lg`}
                    >
                      <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950/80">
                        <Icon className={`h-6 w-6 ${step.textColor}`} />
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom bullet points */}
                <div className="mt-6 border-t border-slate-800/80 pt-4 space-y-1.5">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className={`h-3.5 w-3.5 ${step.textColor} shrink-0`} />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
