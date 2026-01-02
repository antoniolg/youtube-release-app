'use client';

import { useState } from 'react';
import { CheckCircle2, Image as ImageIcon } from 'lucide-react';
import Button from './Button';
import Card from './Card';

interface Step3Props {
  thumbnails: string[];
  onNext: (selectedIndex: number) => void;
  onBack: () => void;
}

export default function Step3ReviewThumbnails({ thumbnails, onNext, onBack }: Step3Props) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <ImageIcon className="text-primary" size={28} />
          <h2 className="text-2xl font-bold">Selecciona tu Thumbnail</h2>
        </div>

        <p className="text-foreground/70 mb-6">
          Hemos generado 4 opciones de thumbnail. Selecciona la que más te guste para usar en todas las redes sociales.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {thumbnails.map((thumbnail, index) => (
            <div
              key={index}
              onClick={() => setSelected(index)}
              className={`relative cursor-pointer rounded-xl overflow-hidden border-4 transition-all ${
                selected === index
                  ? 'border-primary shadow-lg shadow-primary/30 scale-[1.02]'
                  : 'border-transparent hover:border-border'
              }`}
            >
              <img
                src={thumbnail}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-auto"
              />
              {selected === index && (
                <div className="absolute top-4 right-4 bg-primary text-white rounded-full p-2">
                  <CheckCircle2 size={24} />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <span className="text-white font-bold">Opción {index + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {selected !== null && (
          <div className="mt-6 bg-primary/10 border border-primary/30 rounded-lg p-4 text-center">
            <p className="text-foreground font-medium">
              Has seleccionado la Opción {selected + 1}
            </p>
          </div>
        )}
      </Card>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline" size="lg">
          ← Volver
        </Button>
        <Button
          onClick={() => selected !== null && onNext(selected)}
          disabled={selected === null}
          size="lg"
        >
          Programar Publicaciones →
        </Button>
      </div>
    </div>
  );
}