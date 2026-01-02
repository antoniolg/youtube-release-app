'use client';

import { useState } from 'react';
import { Calendar, Youtube, Twitter, FileText } from 'lucide-react';
import Button from './Button';
import Card from './Card';

interface FormData {
  transcription: string;
  publishDate: string;
  youtubeLink: string;
  twitterVideoPath: string;
}

interface Step1Props {
  onNext: (data: FormData) => void;
}

export default function Step1InputForm({ onNext }: Step1Props) {
  const [formData, setFormData] = useState<FormData>({
    transcription: '',
    publishDate: '',
    youtubeLink: '',
    twitterVideoPath: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const isValid = formData.transcription && formData.publishDate && formData.youtubeLink && formData.twitterVideoPath;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <FileText className="text-primary" size={28} />
          <h2 className="text-2xl font-bold">Información del Vídeo</h2>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">
              Transcripción del vídeo
            </label>
            <textarea
              value={formData.transcription}
              onChange={(e) => setFormData({ ...formData, transcription: e.target.value })}
              className="w-full bg-background border border-border rounded-lg p-4 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-vertical min-h-[200px]"
              placeholder="Pega aquí la transcripción completa del vídeo..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Calendar size={18} className="text-primary" />
                Fecha de publicación
              </label>
              <input
                type="date"
                value={formData.publishDate}
                onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Youtube size={18} className="text-primary" />
                Link del vídeo de YouTube
              </label>
              <input
                type="url"
                value={formData.youtubeLink}
                onChange={(e) => setFormData({ ...formData, youtubeLink: e.target.value })}
                className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="https://youtube.com/watch?v=..."
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Twitter size={18} className="text-primary" />
              Ruta del vídeo para X (Twitter)
            </label>
            <input
              type="text"
              value={formData.twitterVideoPath}
              onChange={(e) => setFormData({ ...formData, twitterVideoPath: e.target.value })}
              className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="/ruta/al/video.mp4"
              required
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={!isValid}>
          Generar Materiales →
        </Button>
      </div>
    </form>
  );
}