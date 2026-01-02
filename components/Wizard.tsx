'use client';

import { useState } from 'react';
import StepIndicator from './StepIndicator';
import Step1InputForm from './Step1InputForm';
import Step2GenerateContent from './Step2GenerateContent';
import Step3ReviewThumbnails from './Step3ReviewThumbnails';
import Step4Schedule from './Step4Schedule';

const STEPS = [
  { id: 1, title: 'Información', description: 'Datos del vídeo' },
  { id: 2, title: 'Generar', description: 'Materiales' },
  { id: 3, title: 'Revisar', description: 'Thumbnails' },
  { id: 4, title: 'Programar', description: 'Publicación' }
];

export default function Wizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>(null);
  const [generatedData, setGeneratedData] = useState<any>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState<number | null>(null);

  const handleStep1Next = (data: any) => {
    setFormData(data);
    setCurrentStep(1);
  };

  const handleStep2Next = (data: any) => {
    setGeneratedData(data);
    setCurrentStep(2);
  };

  const handleStep3Next = (thumbnailIndex: number) => {
    setSelectedThumbnail(thumbnailIndex);
    setCurrentStep(3);
  };

  const handleComplete = () => {
    // Reiniciar wizard o navegar a otra página
    setCurrentStep(0);
    setFormData(null);
    setGeneratedData(null);
    setSelectedThumbnail(null);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            YouTube Release Automation
          </h1>
          <p className="text-foreground/70 text-lg">
            Automatiza la publicación de tus vídeos en todas las plataformas
          </p>
        </div>

        <StepIndicator steps={STEPS} currentStep={currentStep} />

        <div className="mt-8">
          {currentStep === 0 && (
            <Step1InputForm onNext={handleStep1Next} />
          )}

          {currentStep === 1 && (
            <Step2GenerateContent
              formData={formData}
              onNext={handleStep2Next}
              onBack={() => setCurrentStep(0)}
            />
          )}

          {currentStep === 2 && generatedData && (
            <Step3ReviewThumbnails
              thumbnails={generatedData.thumbnails || []}
              onNext={handleStep3Next}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && selectedThumbnail !== null && (
            <Step4Schedule
              selectedThumbnail={selectedThumbnail}
              formData={formData}
              generatedContent={generatedData}
              onComplete={handleComplete}
              onBack={() => setCurrentStep(2)}
            />
          )}
        </div>
      </div>
    </div>
  );
}