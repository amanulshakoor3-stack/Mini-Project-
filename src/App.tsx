import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Classify } from "./pages/Classify";
import { HowItWorks } from "./components/HowItWorks";
import { ModelInfo } from "./components/ModelInfo";
import { About } from "./components/About";
import {
  classifyAnimalImage,
  getRecentPredictions,
  clearRecentPredictions,
} from "./services/api";
import { PredictionResult, RecentPrediction, AnimalSpecies } from "./types";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);
  const [history, setHistory] = useState<RecentPrediction[]>([]);

  useEffect(() => {
    setHistory(getRecentPredictions());
  }, []);

  const showToast = (text: string, type: "error" | "success" = "error") => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleAnalyze = async (imageData: string | File) => {
    setIsLoading(true);
    try {
      const result = await classifyAnimalImage(imageData);
      setPredictionResult(result);
      setHistory(getRecentPredictions());
      showToast(`Successfully classified as ${result.prediction} (${result.confidence.toFixed(1)}%)`, "success");
      
      // Auto-scroll to results smoothly
      setTimeout(() => {
        const resultCard = document.getElementById("prediction-result-card");
        if (resultCard) {
          resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    } catch (err: any) {
      console.error("Classification error:", err);
      showToast(err.message || "Failed to classify image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setPredictionResult(null);
  };

  const handleClassifyAnother = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setPredictionResult(null);
    const uploadEl = document.getElementById("upload-box-card");
    if (uploadEl) {
      uploadEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectAnimal = (animal: AnimalSpecies) => {
    setSelectedImage(animal.sampleImage);
    setSelectedFile(null);
    setPredictionResult(null);
    setActiveTab("classify");
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast(`Loaded ${animal.name} sample. Click "Analyze Image" to classify!`, "success");
  };

  const handleSelectRecent = (recent: RecentPrediction) => {
    if (recent.imageUrl) {
      setSelectedImage(recent.imageUrl);
      setSelectedFile(null);
      setActiveTab("classify");
      window.scrollTo({ top: 0, behavior: "smooth" });
      handleAnalyze(recent.imageUrl);
    }
  };

  const handleClearHistory = () => {
    clearRecentPredictions();
    setHistory([]);
    showToast("Prediction history cleared.", "success");
  };

  const handleStartClassification = () => {
    setActiveTab("classify");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col justify-between">
      
      {/* Background Neural Grid Accent */}
      <div className="fixed inset-0 pointer-events-none -z-20 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onStartClassification={handleStartClassification}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce [animation-duration:0.6s]">
          <div
            className={`flex items-center gap-3 rounded-2xl border px-5 py-3.5 shadow-2xl backdrop-blur-2xl ${
              toastMessage.type === "success"
                ? "border-emerald-500/40 bg-emerald-950/90 text-emerald-200"
                : "border-rose-500/40 bg-rose-950/90 text-rose-200"
            }`}
          >
            {toastMessage.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />
            )}
            <span className="text-sm font-medium">{toastMessage.text}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white transition-colors ml-2"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeTab === "home" && (
          <Home
            onClassifyClick={() => {
              setActiveTab("classify");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onHowItWorksClick={() => {
              setActiveTab("how-it-works");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onSelectAnimal={handleSelectAnimal}
          />
        )}

        {activeTab === "classify" && (
          <Classify
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            predictionResult={predictionResult}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            onClear={handleClear}
            onClassifyAnother={handleClassifyAnother}
            history={history}
            onClearHistory={handleClearHistory}
            onSelectRecent={handleSelectRecent}
          />
        )}

        {activeTab === "how-it-works" && (
          <div className="py-8">
            <HowItWorks />
          </div>
        )}

        {activeTab === "model" && (
          <div className="py-8">
            <ModelInfo />
          </div>
        )}

        {activeTab === "about" && (
          <div className="py-8">
            <About />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
