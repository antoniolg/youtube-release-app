'use client';

import { useState } from 'react';
import { Calendar, CheckCircle2, Loader2, Linkedin, Facebook, Instagram, Twitter, Mail, Copy, Youtube } from 'lucide-react';
import Button from './Button';
import Card from './Card';

interface Platform {
  id: string;
  name: string;
  icon: any;
  status: 'pending' | 'scheduling' | 'completed' | 'error';
}

interface Step4Props {
  selectedThumbnail: number;
  formData: any;
  generatedContent?: any;
  onComplete: () => void;
  onBack: () => void;
}

export default function Step4Schedule({ selectedThumbnail, formData, generatedContent, onComplete, onBack }: Step4Props) {
  const [platforms, setPlatforms] = useState<Platform[]>([
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, status: 'pending' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, status: 'pending' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, status: 'pending' },
    { id: 'twitter', name: 'X (Twitter)', icon: Twitter, status: 'pending' },
    { id: 'newsletter', name: 'Newsletter', icon: Mail, status: 'pending' }
  ]);

  const [isScheduling, setIsScheduling] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (generatedContent?.youtube) {
      await navigator.clipboard.writeText(generatedContent.youtube);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const startScheduling = async () => {
    setIsScheduling(true);

    for (let i = 0; i < platforms.length; i++) {
      setPlatforms(prev => prev.map((platform, idx) =>
        idx === i ? { ...platform, status: 'scheduling' } : platform
      ));

      try {
        const response = await fetch('/api/schedule', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            platform: platforms[i].id,
            formData,
            selectedThumbnail
          })
        });

        if (response.ok) {
          setPlatforms(prev => prev.map((platform, idx) =>
            idx === i ? { ...platform, status: 'completed' } : platform
          ));
        } else {
          setPlatforms(prev => prev.map((platform, idx) =>
            idx === i ? { ...platform, status: 'error' } : platform
          ));
        }

        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        setPlatforms(prev => prev.map((platform, idx) =>
          idx === i ? { ...platform, status: 'error' } : platform
        ));
      }
    }

    setIsScheduling(false);
  };

  const allCompleted = platforms.every(p => p.status === 'completed');

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="text-primary" size={28} />
          <h2 className="text-2xl font-bold">Programar Publicaciones</h2>
        </div>

        <div className="mb-6 bg-background border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 text-sm text-foreground/70 mb-2">
            <Calendar size={16} />
            <span>Fecha de publicación:</span>
          </div>
          <p className="text-xl font-bold text-primary">
            {new Date(formData.publishDate).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })} a las 17:15h
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <div
                key={platform.id}
                className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
              >
                <div className="flex items-center gap-3">
                  {platform.status === 'scheduling' && (
                    <Loader2 className="text-primary animate-spin" size={20} />
                  )}
                  {platform.status === 'completed' && (
                    <CheckCircle2 className="text-green-500" size={20} />
                  )}
                  {platform.status === 'error' && (
                    <div className="w-5 h-5 rounded-full bg-red-500" />
                  )}
                  {platform.status === 'pending' && (
                    <Icon className="text-foreground/50" size={20} />
                  )}
                  <span className="font-medium">{platform.name}</span>
                </div>
                <span className="text-sm text-foreground/60">
                  {platform.status === 'scheduling' && 'Programando...'}
                  {platform.status === 'completed' && '✓ Programado'}
                  {platform.status === 'error' && 'Error'}
                  {platform.status === 'pending' && 'Pendiente'}
                </span>
              </div>
            );
          })}
        </div>

        {!isScheduling && !allCompleted && (
          <Button onClick={startScheduling} size="lg" className="w-full">
            <Calendar className="mr-2" size={20} />
            Programar Todas las Publicaciones
          </Button>
        )}

        {isScheduling && (
          <div className="text-center py-4">
            <Loader2 className="inline-block text-primary animate-spin mb-2" size={32} />
            <p className="text-foreground/70">Programando publicaciones...</p>
          </div>
        )}

        {allCompleted && (
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center">
              <CheckCircle2 className="inline-block text-green-500 mb-3" size={48} />
              <h3 className="text-2xl font-bold text-foreground mb-2">
                ¡Publicación Completada!
              </h3>
              <p className="text-foreground/70">
                Tu vídeo está programado para publicarse en todas las plataformas el{' '}
                {new Date(formData.publishDate).toLocaleDateString('es-ES')} a las 17:15h
              </p>
            </div>
          </div>
        )}
      </Card>

      {allCompleted && generatedContent?.youtube && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Youtube className="text-primary" size={28} />
              <h2 className="text-2xl font-bold">Contenido para YouTube</h2>
            </div>
            <Button onClick={copyToClipboard} variant="outline">
              {copied ? (
                <>
                  <CheckCircle2 className="mr-2" size={18} />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="mr-2" size={18} />
                  Copiar
                </>
              )}
            </Button>
          </div>

          <div className="bg-background border border-border rounded-lg p-4">
            <pre className="text-sm text-foreground/90 whitespace-pre-wrap font-mono overflow-x-auto">
              {generatedContent.youtube}
            </pre>
          </div>

          <div className="mt-4 text-sm text-foreground/60">
            💡 Copia este contenido y pégalo en YouTube al subir tu vídeo
          </div>
        </Card>
      )}

      {allCompleted && (
        <Card>
          <Button onClick={onComplete} size="lg" className="w-full" variant="secondary">
            Finalizar y Crear Nuevo Vídeo
          </Button>
        </Card>
      )}

      {!allCompleted && (
        <div className="flex justify-start">
          <Button onClick={onBack} variant="outline" size="lg">
            ← Volver
          </Button>
        </div>
      )}
    </div>
  );
}