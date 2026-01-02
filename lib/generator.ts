import fs from 'fs';
import path from 'path';

const BASE_PATH = '/Users/antonio/Documents/Obsidian/150 - 🏆 ACTIVOS/DevExpert/Videos';
const ANTONIO_PHOTOS_PATH = '/Users/antonio/Documents/Obsidian/Attachments/Antonio-Fotos';
const LOGO_PATH = '/Users/antonio/Documents/Obsidian/Attachments/logo-devexpert.png';

export async function createVideoFolder(publishDate: string, title: string) {
  const folderName = `${publishDate} - ${title}`;
  const folderPath = path.join(BASE_PATH, folderName);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  return folderPath;
}

export async function generateYouTubeMd(
  transcription: string,
  youtubeLink: string,
  folderPath: string
) {
  // Aquí iría la lógica para generar títulos, descripción y capítulos usando IA
  // Por ahora, retornamos un template básico

  const content = `# YouTube Video

## Títulos sugeridos
1. [Título 1 generado por IA]
2. [Título 2 generado por IA]
3. [Título 3 generado por IA]

## Descripción
[Descripción optimizada generada por IA basada en la transcripción]

## Capítulos
00:00 - Introducción
[Capítulos generados automáticamente]

## Link
${youtubeLink}
`;

  const filePath = path.join(folderPath, 'YouTube.md');
  fs.writeFileSync(filePath, content, { encoding: 'utf-8' });

  return filePath;
}

export async function generateRedesMd(transcription: string, folderPath: string) {
  const content = `# Redes Sociales

## LinkedIn
[Texto optimizado para LinkedIn]

## Facebook
[Texto optimizado para Facebook]

## Instagram
[Texto optimizado para Instagram]
`;

  const filePath = path.join(folderPath, 'Redes.md');
  fs.writeFileSync(filePath, content, { encoding: 'utf-8' });

  return filePath;
}

export async function generateNewsletterMd(transcription: string, folderPath: string) {
  const content = `# Newsletter

## Asunto
[Asunto llamativo generado por IA]

## Cuerpo
[Contenido de la newsletter generado por IA]
`;

  const filePath = path.join(folderPath, 'Newsletter.md');
  fs.writeFileSync(filePath, content, { encoding: 'utf-8' });

  return filePath;
}

export function getRandomAntonioPhotos(count: number = 3): string[] {
  const photos = fs.readdirSync(ANTONIO_PHOTOS_PATH)
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
    .map(file => path.join(ANTONIO_PHOTOS_PATH, file));

  // Shuffle y tomar 'count' fotos aleatorias
  const shuffled = photos.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export async function generateThumbnails(
  transcription: string,
  folderPath: string
): Promise<string[]> {
  // Esta función debería usar el MCP de Gemini Image para generar las thumbnails
  // Por ahora retornamos rutas de placeholder

  const thumbnails: string[] = [];

  for (let i = 1; i <= 4; i++) {
    const thumbnailPath = path.join(folderPath, `thumbnail-${i}.png`);
    thumbnails.push(thumbnailPath);
  }

  return thumbnails;
}

export function getThumbnailMasterPrompt(
  textLines: { line1: string; line2: string; line3: string }
): string {
  return `Crea una thumbnail de YouTube profesional con la siguiente composición de alto CTR:

1. **COMPOSICIÓN:** El sujeto (desarrollador) está posicionado en el **tercio derecho** de la imagen, mirando hacia la izquierda. El sujeto siempre lleva ropa informal (camiseta básica).

2. **TEXTO:** A la **izquierda**, un bloque de texto GIGANTESCO apilado verticalmente, ocupando aproximadamente el 70% del ancho. El texto debe tener la siguiente estructura y estilo:
   * **Fuente:** Sans-serif, ultra-gruesa, condensada y en mayúsculas (similar a 'Bebas Neue' o 'Impact').
   * **Línea 1 (Blanco):** ${textLines.line1}
   * **Línea 2 (Blanco):** ${textLines.line2}
   * **Línea 3 (Amarillo #ffd966):** ${textLines.line3}
   * **Estilo de Texto:** Todas las letras deben tener un **contorno negro nítido y grueso** para máxima legibilidad sobre cualquier fondo, pero **SIN un bloque de fondo sólido**.

3. **AMBIENTE:** Fondo oscuro y tecnológico.

4. **SUJETO:** El rostro y la apariencia del sujeto deben recrearse **fielmente** usando las 3 fotos de referencia proporcionadas. Su expresión debe coincidir con la emoción del texto.`;
}