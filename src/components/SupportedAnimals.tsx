import React from "react";
import { Sparkles, ArrowUpRight, Compass, Utensils, Layers } from "lucide-react";
import { SUPPORTED_ANIMALS } from "../data/animals";
import { AnimalSpecies } from "../types";

interface SupportedAnimalsProps {
  onSelectAnimal: (animal: AnimalSpecies) => void;
}

export const SupportedAnimals: React.FC<SupportedAnimalsProps> = ({ onSelectAnimal }) => {
  return (
    <section id="species" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/60 px-4 py-1 text-xs font-semibold text-purple-300 backdrop-blur-md">
            <Layers className="h-3.5 w-3.5" />
            <span>Dataset Taxonomic Coverage</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Supported Animal Species
          </h2>
          <p className="mt-3 text-base text-slate-300 sm:text-lg">
            Our model is specifically trained on high-variance wildlife and domestic datasets across 10 core taxonomic classes.
          </p>
        </div>

        {/* 10 Animals Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {SUPPORTED_ANIMALS.map((animal) => (
            <div
              key={animal.id}
              id={`animal-card-${animal.id}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-xl transition-all duration-300 hover:border-cyan-400/80 hover:bg-slate-850 hover:-translate-y-1.5"
            >
              {/* Image Preview */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-950">
                <img
                  src={animal.sampleImage}
                  alt={animal.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                
                {/* Animal Emoji Badge */}
                <div className="absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950/80 text-xl backdrop-blur-md ring-1 ring-white/20">
                  {animal.icon}
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 right-3 rounded-md bg-slate-900/90 border border-slate-700 px-2 py-0.5 text-[10px] font-semibold text-cyan-300 backdrop-blur-md">
                  {animal.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                    <span>{animal.icon}</span>
                    <span>{animal.name}</span>
                  </h3>
                  <p className="text-xs font-serif italic text-slate-400 truncate">
                    {animal.scientificName}
                  </p>
                  <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {animal.description}
                  </p>
                </div>

                {/* Test this animal CTA */}
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <button
                    id={`test-animal-btn-${animal.id}`}
                    onClick={() => onSelectAnimal(animal)}
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-200 hover:border-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all"
                  >
                    <span>Test Classifier</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
