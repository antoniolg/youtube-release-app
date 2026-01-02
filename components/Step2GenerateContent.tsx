'use client';

import { useState } from 'react';
import { Loader2, CheckCircle2, FileText, Image as ImageIcon, Youtube, Share2, Mail, Edit3 } from 'lucide-react';
import Button from './Button';
import Card from './Card';

interface GenerationTask {
  id: string;
  name: string;
  status: 'pending' | 'loading' | 'completed';
}

interface GeneratedContent {
  youtube: string;
  redes: string;
  newsletter: string;
  thumbnails: string[];
}

interface Step2Props {
  formData: any;
  onNext: (generatedData: any) => void;
  onBack: () => void;
}

export default function Step2GenerateContent({ formData, onNext, onBack }: Step2Props) {
  const [tasks, setTasks] = useState<GenerationTask[]>([
    { id: 'folder', name: 'Crear carpeta del vídeo', status: 'pending' },
    { id: 'youtube', name: 'Generar YouTube.md', status: 'pending' },
    { id: 'redes', name: 'Generar Redes.md', status: 'pending' },
    { id: 'newsletter', name: 'Generar Newsletter.md', status: 'pending' },
    { id: 'thumbnails', name: 'Generar 4 thumbnails', status: 'pending' }
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [activeTab, setActiveTab] = useState<'youtube' | 'redes' | 'newsletter'>('youtube');

  const [editableContent, setEditableContent] = useState<GeneratedContent>({
    youtube: '',
    redes: '',
    newsletter: '',
    thumbnails: []
  });

  const startGeneration = async () => {
    setIsGenerating(true);

    // Simular generación de contenido
    for (let i = 0; i < tasks.length; i++) {
      setTasks(prev => prev.map((task, idx) =>
        idx === i ? { ...task, status: 'loading' } : task
      ));

      await new Promise(resolve => setTimeout(resolve, 1000));

      setTasks(prev => prev.map((task, idx) =>
        idx === i ? { ...task, status: 'completed' } : task
      ));
    }

    // Contenido de ejemplo generado
    setEditableContent({
      youtube: `# Títulos sugeridos

1. 🚀 DOMINA React en 2025 - La Guía Definitiva
2. 💡 React: De Cero a Experto en 45 Minutos
3. ⚡ Aprende React Rápido - Tutorial Completo 2025

## Descripción

Aprende React desde cero con esta guía completa. Veremos hooks, estado, componentes y las mejores prácticas para 2025.

🔥 Lo que aprenderás:
- Fundamentos de React
- Hooks avanzados
- Gestión de estado
- Mejores prácticas

## Capítulos

00:00 - Introducción
02:30 - ¿Qué es React?
08:45 - Componentes y Props
15:20 - Hooks: useState y useEffect
25:10 - Gestión de estado avanzada
35:40 - Mejores prácticas
42:00 - Conclusión`,

      redes: `🚀 ¿Quieres dominar React en 2025?

He preparado una guía completa donde te enseño todo lo que necesitas saber:

✅ Fundamentos sólidos
✅ Hooks avanzados
✅ Gestión de estado
✅ Mejores prácticas actualizadas

Perfecto tanto si estás empezando como si quieres actualizar tus conocimientos.

🎥 Nuevo vídeo disponible
👇 Link en comentarios`,

      newsletter: `Asunto: 🚀 Nueva Guía Completa de React 2025

Hola!

Esta semana he publicado un nuevo vídeo sobre React que creo que te va a encantar.

Es una guía completa donde cubrimos desde los fundamentos hasta técnicas avanzadas, todo actualizado para 2025.

Lo mejor es que es totalmente práctico - puedes seguirlo paso a paso y aplicarlo directamente en tus proyectos.

Ver vídeo: [LINK]

¡Nos vemos dentro!

Antonio`,
      thumbnails: ['/placeholder-1.png', '/placeholder-2.png', '/placeholder-3.png', '/placeholder-4.png']
    });

    setIsGenerating(false);
    setShowEditor(true);
  };

  const handleContinue = () => {
    onNext({ ...editableContent });
  };

  const allCompleted = tasks.every(task => task.status === 'completed');

  const tabs = [
    { id: 'youtube' as const, label: 'YouTube', icon: Youtube },
    { id: 'redes' as const, label: 'Redes Sociales', icon: Share2 },
    { id: 'newsletter' as const, label: 'Newsletter', icon: Mail }
  ];

  return (
    <div className="space-y-6">
      {!showEditor ? (
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-primary" size={28} />
            <h2 className="text-2xl font-bold">Generación de Materiales</h2>
          </div>

          <div className="space-y-4 mb-6">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
              >
                <div className="flex items-center gap-3">
                  {task.status === 'loading' && (
                    <Loader2 className="text-primary animate-spin" size={20} />
                  )}
                  {task.status === 'completed' && (
                    <CheckCircle2 className="text-green-500" size={20} />
                  )}
                  {task.status === 'pending' && (
                    <div className="w-5 h-5 rounded-full border-2 border-border" />
                  )}
                  <span className="font-medium">{task.name}</span>
                </div>
                <span className="text-sm text-foreground/60">
                  {task.status === 'loading' && 'Generando...'}
                  {task.status === 'completed' && 'Completado'}
                  {task.status === 'pending' && 'Pendiente'}
                </span>
              </div>
            ))}
          </div>

          {!isGenerating && !allCompleted && (
            <Button onClick={startGeneration} size="lg" className="w-full">
              <ImageIcon className="mr-2" size={20} />
              Comenzar Generación
            </Button>
          )}

          {isGenerating && (
            <div className="text-center py-4">
              <Loader2 className="inline-block text-primary animate-spin mb-2" size={32} />
              <p className="text-foreground/70">Generando contenido...</p>
            </div>
          )}
        </Card>
      ) : (
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Edit3 className="text-primary" size={28} />
            <h2 className="text-2xl font-bold">Revisar y Editar Contenido</h2>
          </div>

          <div className="mb-6">
            <div className="flex gap-2 border-b border-border">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 font-medium transition-all ${
                      activeTab === tab.id
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-foreground/60 hover:text-foreground'
                    }`}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-6">
            <textarea
              value={editableContent[activeTab]}
              onChange={(e) => setEditableContent({
                ...editableContent,
                [activeTab]: e.target.value
              })}
              className="w-full bg-background border border-border rounded-lg p-4 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-vertical min-h-[400px] font-mono text-sm"
            />
          </div>

          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-foreground/70">
              💡 <strong>Tip:</strong> Revisa y edita el contenido generado para cada plataforma. Puedes modificar el texto libremente antes de continuar.
            </p>
          </div>
        </Card>
      )}

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline" size="lg" disabled={isGenerating}>
          ← Volver
        </Button>
        {showEditor && (
          <Button onClick={handleContinue} size="lg">
            Continuar a Thumbnails →
          </Button>
        )}
      </div>
    </div>
  );
}