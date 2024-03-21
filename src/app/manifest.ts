import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'R-Placer',
    short_name: 'R-Placer',
    description: 'Pixel Art Placer/Coordinator for the Reddit Place Event.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0D1117',
    theme_color: '#0D1117',
    icons: [
      {
        src: '/icons/icon-96x96.png',
        type: 'image/png',
        sizes: '96x96',
      },
      {
        src: '/icons/icon-192x192.png',
        type: 'image/png',
        sizes: '192x192',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512x512.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
  };
}
