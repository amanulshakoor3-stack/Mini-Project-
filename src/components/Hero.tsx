import React from "react";
import { Sparkles, ArrowRight, Zap, Target, Layers, PlayCircle, ShieldCheck } from "lucide-react";

interface HeroProps {
  onClassifyClick: () => void;
  onHowItWorksClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onClassifyClick,
  onHowItWorksClick,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background ambient lighting effects */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 right-10 -z-10 h-72 w-72 rounded-full bg-cyan-500/15 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-10 left-10 -z-10 h-80 w-80 rounded-full bg-purple-600/15 blur-[110px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Copy & CTAs */}
          <div className="text-center lg:col-span-7 lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/60 px-4 py-1.5 text-xs font-semibold text-indigo-300 shadow-inner backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-spin" />
              <span>Next-Gen Convolutional Neural Network</span>
              <span className="h-1 w-1 rounded-full bg-indigo-400" />
              <span className="text-cyan-300">EfficientNetB0</span>
            </div>

            {/* Main Hero Headline */}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Identify Any Animal with{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Deep Learning AI
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-5 text-lg text-slate-300 sm:text-xl sm:leading-relaxed">
              Upload an animal image and let our Deep Learning model identify its species in seconds. Powered by transfer learning, convolutional feature extraction, and high-precision Softmax probability estimation.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <button
                id="hero-classify-btn"
                onClick={onClassifyClick}
                className="group relative flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 px-7 py-4 text-base font-semibold text-white shadow-xl shadow-indigo-500/25 transition-all duration-200 hover:shadow-cyan-500/35 hover:scale-102 active:scale-98 sm:w-auto"
              >
                <span>Classify Animal</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-how-it-works-btn"
                onClick={onHowItWorksClick}
                className="group flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-6 py-4 text-base font-medium text-slate-200 backdrop-blur-md transition-all hover:border-slate-600 hover:bg-slate-800/80 hover:text-white sm:w-auto"
              >
                <PlayCircle className="h-5 w-5 text-cyan-400 transition-transform group-hover:scale-110" />
                <span>How It Works</span>
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-slate-800/80 pt-6 text-xs text-slate-400 lg:justify-start">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Zero Server Image Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-400" />
                <span>224×224 Normalization</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-cyan-400" />
                <span>10+ Core Species Covered</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Visual & Floating Metric Badges */}
          <div className="relative mx-auto w-full max-w-lg lg:col-span-5 lg:max-w-none">
            
            {/* Center Visual Mockup Card */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-700/80 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-4 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
              
              {/* Top Card Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">inference_pipeline.keras</span>
                </div>
                <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-[10px] font-mono text-indigo-300">
                  READY
                </span>
              </div>

              {/* Main Image with Neural Scanning overlay */}
              <div className="relative mt-3 aspect-4/3 w-full overflow-hidden rounded-xl bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?auto=format&fit=crop&w=800&q=80"
                  alt="African Lion AI Vision Analysis"
                  className="h-full w-full object-cover object-center"
                />

                {/* Laser scan line animation */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-[bounce_3s_infinite]" />

                {/* Bounding Box Visuals */}
                <div className="absolute top-10 left-12 right-12 bottom-12 rounded-lg border-2 border-dashed border-cyan-400/80 bg-cyan-400/10 backdrop-blur-[1px]">
                  <div className="absolute -top-3 left-2 rounded bg-cyan-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-950">
                    🦁 Lion (Panthera leo) • 96.8%
                  </div>
                  {/* Corner markers */}
                  <div className="absolute -top-1 -left-1 h-3 w-3 border-t-2 border-l-2 border-cyan-300" />
                  <div className="absolute -top-1 -right-1 h-3 w-3 border-t-2 border-r-2 border-cyan-300" />
                  <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-cyan-300" />
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-cyan-300" />
                </div>

                {/* Live probability tag */}
                <div className="absolute bottom-3 left-3 right-3 rounded-lg border border-slate-700/80 bg-slate-950/80 p-2.5 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-200">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                      Predicted: <strong className="text-white">Lion</strong>
                    </span>
                    <span className="font-mono font-bold text-cyan-400">96.84%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500" style={{ width: "96.84%" }} />
                  </div>
                </div>
              </div>

              {/* Bottom Quick Species Chips */}
              <div className="mt-3 flex items-center justify-between gap-1 text-[11px] text-slate-400">
                <span className="font-mono">Top: 🦁 Lion (96.8%)</span>
                <span className="font-mono text-slate-500">🐅 Tiger (2.1%)</span>
                <span className="font-mono text-slate-500">🐆 Leopard (0.7%)</span>
              </div>
            </div>

            {/* Floating Card 1: AI Accuracy */}
            <div className="absolute -top-6 -left-6 hidden sm:flex items-center gap-3 rounded-xl border border-indigo-500/30 bg-slate-900/90 p-3.5 shadow-xl backdrop-blur-xl ring-1 ring-white/10 animate-bounce [animation-duration:6s]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">AI Accuracy</p>
                <p className="text-lg font-bold text-white">94%+</p>
              </div>
            </div>

            {/* Floating Card 2: Species */}
            <div className="absolute -bottom-6 -left-4 hidden sm:flex items-center gap-3 rounded-xl border border-cyan-500/30 bg-slate-900/90 p-3.5 shadow-xl backdrop-blur-xl ring-1 ring-white/10 animate-bounce [animation-duration:5s] [animation-delay:1s]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Species</p>
                <p className="text-lg font-bold text-white">10+ Classes</p>
              </div>
            </div>

            {/* Floating Card 3: Speed */}
            <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-3 rounded-xl border border-purple-500/30 bg-slate-900/90 p-3.5 shadow-xl backdrop-blur-xl ring-1 ring-white/10 animate-bounce [animation-duration:5.5s] [animation-delay:0.5s]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Prediction</p>
                <p className="text-lg font-bold text-white">&lt; 2 sec</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
