import React, { useState } from "react";
import { Terminal, Copy, Check, ExternalLink, ShieldCheck, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 pt-16 pb-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          
          {/* Brand Info */}
          <div className="space-y-4 lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950 text-xl font-bold">
                  🐾
                </div>
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Animal<span className="text-cyan-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Animal Species Classification Using Deep Learning. Developed for research, environmental observation, and educational demonstration.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Private & Client-Side Resilient Processing</span>
            </div>
          </div>

          {/* Quick CLI Commands */}
          <div className="space-y-4 lg:col-span-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Terminal className="h-4 w-4 text-cyan-400" />
              Local Execution Commands
            </h4>

            {/* Backend Command */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1">
                <span>FastAPI Backend</span>
                <button
                  onClick={() => copyToClipboard("cd backend && pip install -r requirements.txt && uvicorn app.main:app --reload", "backend")}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300"
                >
                  {copiedCmd === "backend" ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedCmd === "backend" ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <code className="block font-mono text-xs text-slate-200 overflow-x-auto whitespace-nowrap">
                cd backend && uvicorn app.main:app --reload
              </code>
            </div>

            {/* Frontend Command */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1">
                <span>React Frontend</span>
                <button
                  onClick={() => copyToClipboard("npm install && npm run dev", "frontend")}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300"
                >
                  {copiedCmd === "frontend" ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedCmd === "frontend" ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <code className="block font-mono text-xs text-slate-200 overflow-x-auto whitespace-nowrap">
                npm install && npm run dev
              </code>
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Technology Stack
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center justify-between border-b border-slate-850 pb-1">
                <span>Model Architecture</span>
                <span className="font-mono text-cyan-300 font-semibold">EfficientNetB0</span>
              </li>
              <li className="flex items-center justify-between border-b border-slate-850 pb-1">
                <span>Deep Learning</span>
                <span className="font-mono text-cyan-300 font-semibold">TensorFlow / Keras</span>
              </li>
              <li className="flex items-center justify-between border-b border-slate-850 pb-1">
                <span>API Framework</span>
                <span className="font-mono text-cyan-300 font-semibold">FastAPI & Express</span>
              </li>
              <li className="flex items-center justify-between border-b border-slate-850 pb-1">
                <span>Frontend UI</span>
                <span className="font-mono text-cyan-300 font-semibold">React 19 + Tailwind</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-slate-800/80 pt-6 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} AnimalAI. Animal Species Classification Using Deep Learning.</p>
          <div className="mt-2 sm:mt-0 flex items-center gap-4">
            <span>Transfer Learning Mini-Project</span>
            <span>•</span>
            <span>10 Animal Classes</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
