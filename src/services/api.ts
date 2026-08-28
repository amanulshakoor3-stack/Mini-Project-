import { PredictionResult, RecentPrediction } from "../types";

const RECENT_KEY = "animalai_recent_predictions_v1";

export async function fileToBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read image as base64 string"));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export async function urlToBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url, { mode: "cors" });
    const blob = await response.blob();
    return await fileToBase64(blob);
  } catch (error) {
    // If CORS blocks direct fetch of external URL, return the URL directly
    return url;
  }
}

export async function classifyAnimalImage(
  imageData: string | File
): Promise<PredictionResult> {
  let base64String = "";
  if (typeof imageData === "string") {
    if (imageData.startsWith("http://") || imageData.startsWith("https://")) {
      base64String = await urlToBase64(imageData);
    } else {
      base64String = imageData;
    }
  } else {
    base64String = await fileToBase64(imageData);
  }

  const customApiUrl = (import.meta as any).env?.VITE_API_URL || "";
  const endpoint = customApiUrl
    ? `${customApiUrl.replace(/\/$/, "")}/predict`
    : "/api/predict";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image: base64String,
    }),
  });

  if (!response.ok) {
    let errorDetail = `Server responded with status ${response.status}`;
    try {
      const errJson = await response.json();
      if (errJson.detail) errorDetail = errJson.detail;
      else if (errJson.error) errorDetail = errJson.error;
    } catch {
      // fallback to status text
    }
    throw new Error(errorDetail);
  }

  const data: PredictionResult = await response.json();
  data.imageUrl = base64String.startsWith("data:") ? base64String : undefined;

  // Save to recent predictions
  saveRecentPrediction({
    id: `pred_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    prediction: data.prediction,
    confidence: data.confidence,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    imageUrl: data.imageUrl || "",
    top3: data.top_predictions,
  });

  return data;
}

export function getRecentPredictions(): RecentPrediction[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveRecentPrediction(item: RecentPrediction): void {
  try {
    const list = getRecentPredictions();
    // Keep max 12 items
    const updated = [item, ...list.filter((x) => x.id !== item.id)].slice(0, 12);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Could not save to localStorage", e);
  }
}

export function clearRecentPredictions(): void {
  try {
    localStorage.removeItem(RECENT_KEY);
  } catch (e) {
    console.warn("Could not clear localStorage", e);
  }
}
