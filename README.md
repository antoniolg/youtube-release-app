> [!WARNING]
> **Archivado · Archived.** Este repositorio ya no se mantiene y puede no compilar con versiones actuales. This repository is no longer maintained and may not build with current versions.
> Lo que enseño ahora · What I teach now: [devexpert.io](https://devexpert.io)

# YouTube Release Automation

Una aplicación web moderna y visualmente atractiva para automatizar completamente el proceso de publicación de vídeos de YouTube en múltiples plataformas.

## 🚀 Características

- **Wizard intuitivo de 4 pasos** para guiar el proceso completo
- **Generación automática** de contenido optimizado para cada plataforma
- **Generación de thumbnails con IA** usando Gemini (4 opciones para elegir)
- **Programación automática** en múltiples redes sociales (LinkedIn, Facebook, Instagram, X/Twitter)
- **Newsletter automatizada** con Listmonk
- **Interfaz minimalista y llamativa** con animaciones fluidas

## 📋 Proceso de Publicación

1. **Paso 1: Información del Vídeo**
   - Transcripción del vídeo
   - Fecha de publicación
   - Link de YouTube
   - Ruta del vídeo para X (Twitter)

2. **Paso 2: Generación de Materiales**
   - Creación de carpeta organizada
   - Generación de YouTube.md (títulos, descripción, capítulos)
   - Generación de Redes.md (contenido para redes sociales)
   - Generación de Newsletter.md
   - Creación de 4 thumbnails con IA

3. **Paso 3: Selección de Thumbnail**
   - Vista previa de las 4 opciones generadas
   - Selección de la thumbnail favorita

4. **Paso 4: Programación**
   - Programación automática en todas las plataformas
   - Fecha: La especificada a las 17:15h (hora de España)

## 🛠️ Tecnologías

- **Next.js 15** con App Router
- **React 19** con TypeScript
- **Tailwind CSS v4** para estilos
- **Framer Motion** para animaciones
- **Lucide React** para iconos
- **MCPs**: Postiz, Listmonk, Gemini Image

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
youtube-release-app/
├── app/
│   ├── api/
│   │   ├── generate/    # API para generar contenido
│   │   └── schedule/    # API para programar publicaciones
│   ├── globals.css      # Estilos globales y tema
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── StepIndicator.tsx
│   ├── Step1InputForm.tsx
│   ├── Step2GenerateContent.tsx
│   ├── Step3ReviewThumbnails.tsx
│   ├── Step4Schedule.tsx
│   └── Wizard.tsx
└── lib/
    └── generator.ts     # Utilidades de generación

```

## 🎨 Paleta de Colores

- **Background**: `#0f0f23` (Azul oscuro profundo)
- **Primary**: `#6366f1` (Índigo vibrante)
- **Secondary**: `#8b5cf6` (Púrpura)
- **Accent**: `#ffd966` (Amarillo)
- **Card Background**: `#1a1a2e`

## 🔧 Configuración

Para que la aplicación funcione correctamente, asegúrate de tener configurados los MCPs:

- **Postiz MCP**: Para programación en redes sociales
- **Listmonk MCP**: Para newsletter
- **Gemini Image MCP**: Para generación de thumbnails

## 📝 Próximos Pasos

- [ ] Implementar integración real con MCPs
- [ ] Añadir generación de contenido con IA
- [ ] Implementar análisis de transcripción para capítulos automáticos
- [ ] Añadir preview de contenido generado
- [ ] Implementar sistema de plantillas personalizables
