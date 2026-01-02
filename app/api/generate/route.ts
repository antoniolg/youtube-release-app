import { NextRequest, NextResponse } from 'next/server';
import {
  createVideoFolder,
  generateYouTubeMd,
  generateRedesMd,
  generateNewsletterMd,
  generateThumbnails
} from '@/lib/generator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { transcription, publishDate, youtubeLink, twitterVideoPath, task } = body;

    let result: any = {};

    switch (task) {
      case 'folder':
        const folderPath = await createVideoFolder(publishDate, 'Video');
        result = { folderPath };
        break;

      case 'youtube':
        const youtubePath = await generateYouTubeMd(transcription, youtubeLink, body.folderPath || '');
        result = { youtubePath };
        break;

      case 'redes':
        const redesPath = await generateRedesMd(transcription, body.folderPath || '');
        result = { redesPath };
        break;

      case 'newsletter':
        const newsletterPath = await generateNewsletterMd(transcription, body.folderPath || '');
        result = { newsletterPath };
        break;

      case 'thumbnails':
        const thumbnails = await generateThumbnails(transcription, body.folderPath || '');
        result = { thumbnails };
        break;

      default:
        return NextResponse.json({ error: 'Invalid task' }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in generate API:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}