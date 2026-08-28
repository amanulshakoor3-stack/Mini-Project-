import React from "react";
import { Hero } from "../components/Hero";
import { SupportedAnimals } from "../components/SupportedAnimals";
import { HowItWorks } from "../components/HowItWorks";
import { ModelInfo } from "../components/ModelInfo";
import { AnimalSpecies } from "../types";

interface HomeProps {
  onClassifyClick: () => void;
  onHowItWorksClick: () => void;
  onSelectAnimal: (animal: AnimalSpecies) => void;
}

export const Home: React.FC<HomeProps> = ({
  onClassifyClick,
  onHowItWorksClick,
  onSelectAnimal,
}) => {
  return (
    <div className="w-full">
      <Hero
        onClassifyClick={onClassifyClick}
        onHowItWorksClick={onHowItWorksClick}
      />
      <SupportedAnimals onSelectAnimal={onSelectAnimal} />
      <HowItWorks />
      <ModelInfo />
    </div>
  );
};
