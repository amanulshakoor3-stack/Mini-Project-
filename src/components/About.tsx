import React from "react";
import { Info, Shield, BookOpen, Cpu, Database, Target, CheckCircle2, AlertTriangle } from "lucide-react";

export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/60 px-4 py-1 text-xs font-semibold text-indigo-300 backdrop-blur-md">
            <Info className="h-3.5 w-3.5" />
            <span>Research & Academic Overview</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            About AnimalAI
          </h2>
          <p className="mt-3 text-base text-slate-300 sm:text-lg">
            A state-of-the-art Deep Learning animal recognition platform combining Transfer Learning with high-efficiency convolutional networks.
          </p>
        </div>

        {/* 4 Thematic Blocks */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Purpose Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 mb-4">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">System Purpose</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              AnimalAI was built to assist wildlife researchers, conservationists, students, and biology enthusiasts in rapidly identifying animal species from field photographs and camera traps using deep convolutional neural representations.
            </p>
          </div>

          {/* Technology & Frameworks */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 mb-4">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Deep Learning Stack</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Developed with TensorFlow, Keras, and Python FastAPI backend, integrated with modern React 19, TypeScript, and Tailwind CSS on the client side for seamless real-time inference delivery.
            </p>
          </div>

          {/* Transfer Learning Model */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 mb-4">
              <Database className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Model Architecture</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Utilizes an <strong>EfficientNetB0</strong> backbone pretrained on 1.4 million ImageNet samples. Custom top classification layers apply Global Average Pooling, Batch Normalization, Dropout (0.35), and Softmax activation.
            </p>
          </div>

          {/* Dataset & Training */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 mb-4">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Dataset Diversity</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Trained and validated on thousands of verified animal images featuring diverse lighting conditions, angles, juvenile specimens, partial occlusions, and background clutter to maximize generalizability.
            </p>
          </div>

          {/* Performance & Accuracy */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 mb-4">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Realistic Evaluation</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              The model achieves <strong>~94.6% Top-1 Accuracy</strong> and <strong>~98.2% Top-3 Accuracy</strong> on benchmark validation partitions. Confidence scores strictly reflect calculated softmax categorical probabilities.
            </p>
          </div>

          {/* Limitations & Bounds */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 mb-4">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Scope & Bounds</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Predictions are optimized for the 10 target classes (Dog, Cat, Lion, Tiger, Elephant, Horse, Cow, Deer, Bear, Monkey). For animals outside this domain, the model outputs nearest morphological counterparts with lower confidence.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
