import React, { useState, useRef, useCallback } from "react";
import { UploadCloud, Image as ImageIcon, Sparkles, X, Camera, RefreshCw, AlertCircle, Eye, Check } from "lucide-react";
import { SAMPLE_IMAGES, SampleImageItem } from "../data/sampleImages";

interface UploadBoxProps {
  onAnalyze: (imageData: string | File) => void;
  isLoading: boolean;
  selectedImage: string | null;
  setSelectedImage: (img: string | null) => void;
  selectedFile: File | null;
  setSelectedFile: (f: File | null) => void;
  onClear: () => void;
}

export const UploadBox: React.FC<UploadBoxProps> = ({
  onAnalyze,
  isLoading,
  selectedImage,
  setSelectedImage,
  selectedFile,
  setSelectedFile,
  onClear,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const supportedFormats = ["JPG", "JPEG", "PNG", "WEBP"];

  const handleFile = useCallback((file: File) => {
    setErrorMsg(null);
    const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validExtensions.includes(file.type)) {
      setErrorMsg("Unsupported file format. Please upload JPG, JPEG, PNG, or WEBP.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("File is too large. Maximum supported size is 10MB.");
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setSelectedImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }, [setSelectedFile, setSelectedImage]);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleSampleSelect = (sample: SampleImageItem) => {
    setErrorMsg(null);
    setSelectedFile(null);
    setSelectedImage(sample.url);
  };

  // Camera capture
  const startCamera = async () => {
    try {
      setErrorMsg(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err: any) {
      setErrorMsg("Unable to access camera. Please check permissions or upload an image file.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        setSelectedImage(dataUrl);
        setSelectedFile(null);
      }
      stopCamera();
    }
  };

  const handleAnalyzeClick = () => {
    if (selectedFile) {
      onAnalyze(selectedFile);
    } else if (selectedImage) {
      onAnalyze(selectedImage);
    } else {
      setErrorMsg("Please upload or select an animal image first.");
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Main Upload Box Card */}
      <div
        id="upload-box-card"
        className={`relative overflow-hidden rounded-2xl border transition-all duration-300 backdrop-blur-xl ${
          isDragging
            ? "border-cyan-400 bg-cyan-950/20 shadow-2xl shadow-cyan-500/20"
            : "border-slate-800 bg-slate-900/70 hover:border-slate-700 shadow-xl"
        }`}
      >
        <div className="p-6 sm:p-8">
          
          {/* Card Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-white sm:text-2xl flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
                  <UploadCloud className="h-5 w-5" />
                </span>
                Upload Animal Image
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Drag and drop your animal photo or choose from the sample library.
              </p>
            </div>

            {/* Supported format tags */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-400 mr-1">Formats:</span>
              {supportedFormats.map((fmt) => (
                <span
                  key={fmt}
                  className="rounded-md border border-slate-700 bg-slate-800/80 px-2 py-0.5 text-[11px] font-mono font-medium text-cyan-300"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-950/40 p-4 text-sm text-rose-300 backdrop-blur-md">
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
              <button
                onClick={() => setErrorMsg(null)}
                className="ml-auto text-rose-400 hover:text-rose-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Camera View Mode */}
          {isCameraActive ? (
            <div className="mt-6 space-y-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black border border-slate-700">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 border-2 border-dashed border-cyan-400/60 m-8 rounded-lg pointer-events-none" />
              </div>
              <div className="flex items-center justify-center gap-4">
                <button
                  id="capture-photo-btn"
                  onClick={capturePhoto}
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 shadow-lg hover:bg-cyan-400 active:scale-95"
                >
                  <Camera className="h-5 w-5" />
                  <span>Capture Photo</span>
                </button>
                <button
                  id="cancel-camera-btn"
                  onClick={stopCamera}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 font-medium text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : selectedImage ? (
            /* Selected Image Preview Mode */
            <div className="mt-6 space-y-6">
              <div className="relative aspect-16/10 max-h-[380px] w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950/80">
                <img
                  src={selectedImage}
                  alt="Selected Animal Preview"
                  className="h-full w-full object-contain"
                />

                {/* Scan HUD Overlay if analyzing */}
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-sm">
                    <div className="relative flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin" />
                      <Sparkles className="absolute h-6 w-6 text-cyan-400 animate-pulse" />
                    </div>
                    <p className="mt-4 text-base font-bold text-white tracking-wide">
                      Analyzing Image with EfficientNetB0...
                    </p>
                    <p className="mt-1 text-xs text-cyan-300 font-mono">
                      Extracting convolutional features & calculating Softmax
                    </p>
                  </div>
                )}

                {/* Clear / Remove Button */}
                {!isLoading && (
                  <button
                    id="remove-image-btn"
                    onClick={onClear}
                    title="Remove image"
                    className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/90 text-slate-300 shadow-lg border border-slate-700 hover:bg-rose-600 hover:text-white hover:border-rose-500 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}

                {/* Ready indicator */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md bg-slate-900/90 border border-slate-700/80 px-2.5 py-1 text-xs text-slate-300 backdrop-blur-md">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Image Loaded • Ready to Classify</span>
                </div>
              </div>

              {/* Action Controls for Selected Image */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  id="clear-btn"
                  onClick={onClear}
                  disabled={isLoading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-3 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-50 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Clear & Choose Another</span>
                </button>

                <button
                  id="analyze-image-btn"
                  onClick={handleAnalyzeClick}
                  disabled={isLoading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-indigo-500/25 transition-all hover:shadow-cyan-500/30 hover:scale-102 active:scale-98 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="h-5 w-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                      <span>Analyzing Image...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 text-cyan-200" />
                      <span>Analyze Image</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Drag & Drop Upload Zone */
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className="mt-6 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700/90 bg-slate-950/40 p-8 sm:p-12 text-center cursor-pointer transition-all hover:border-cyan-500/60 hover:bg-slate-900/60 group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={onFileChange}
                className="hidden"
                id="animal-file-input"
              />

              {/* Animated Upload Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500/20 via-cyan-500/20 to-purple-500/20 p-3 ring-1 ring-white/10 group-hover:scale-110 group-hover:ring-cyan-400/40 transition-transform">
                <UploadCloud className="h-8 w-8 text-cyan-400 animate-pulse" />
              </div>

              <h3 className="mt-4 text-base font-semibold text-white sm:text-lg">
                Drag and drop your animal image here
              </h3>
              <p className="mt-1 text-sm text-slate-400 max-w-sm">
                or click to browse from your computer / mobile device
              </p>

              {/* Additional Options (Browse & Camera) */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white"
                >
                  <ImageIcon className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Browse Files</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    startCamera();
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white"
                >
                  <Camera className="h-3.5 w-3.5 text-purple-400" />
                  <span>Take Photo</span>
                </button>
              </div>

              <div className="mt-6 text-[11px] text-slate-500">
                Supports JPG, JPEG, PNG, WEBP up to 10MB. 224×224 tensor preprocessing applied.
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Sample Images Quick Shelf */}
      <div id="sample-images-shelf" className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <h4 className="text-sm font-bold text-white">
              Try Sample Animal Images
            </h4>
          </div>
          <span className="text-xs text-slate-400">
            Click any animal to test instant classification
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2.5">
          {SAMPLE_IMAGES.map((sample) => (
            <button
              key={sample.id}
              id={`sample-btn-${sample.species.toLowerCase()}`}
              onClick={() => handleSampleSelect(sample)}
              disabled={isLoading}
              className="group relative flex flex-col items-center overflow-hidden rounded-xl border border-slate-800 bg-slate-950/80 p-1.5 text-center transition-all hover:border-cyan-400/80 hover:bg-slate-900 hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-slate-800">
                <img
                  src={sample.thumbnail}
                  alt={sample.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-115"
                  loading="lazy"
                />
              </div>
              <div className="mt-1 flex items-center gap-1">
                <span className="text-xs">{sample.icon}</span>
                <span className="text-[11px] font-semibold text-slate-300 group-hover:text-white truncate">
                  {sample.species}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
