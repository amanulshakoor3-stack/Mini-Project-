export interface PredictionItem {
  class: string;
  confidence: number; // 0 to 100
  probability?: number; // 0 to 1
}

export interface PredictionResult {
  prediction: string;
  confidence: number;
  top_predictions: PredictionItem[];
  all_probabilities: PredictionItem[];
  scientific_name?: string;
  diet?: string;
  habitat?: string;
  detected_features?: string[];
  fun_fact?: string;
  latency_ms?: number;
  timestamp?: string;
  model_name?: string;
  imageUrl?: string;
}

export interface AnimalSpecies {
  id: string;
  name: string;
  scientificName: string;
  icon: string;
  category: "Mammal" | "Carnivoran" | "Primate" | "Ungulate" | "Other";
  diet: string;
  habitat: string;
  description: string;
  keyFeatures: string[];
  sampleImage: string;
}

export interface ModelArchitectureStep {
  name: string;
  layerType: string;
  outputShape: string;
  params: string;
  description: string;
}

export interface RecentPrediction {
  id: string;
  prediction: string;
  confidence: number;
  timestamp: string;
  imageUrl: string;
  top3: PredictionItem[];
}
