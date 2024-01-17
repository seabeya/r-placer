import CONSTS from '@global/consts.ts';

export function checkImage(imageUrl: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const pixels = img.width * img.height;

      if (pixels > 500_000) {
        reject(`Image is too big (${pixels} pixels). Please, use image with less than 500 000 pixels`);
      }

      resolve();
    };

    img.onerror = () => {
      reject('Image not found');
    };
  });
}

export function buildWorkspaceUrl(url: string, x: string, y: string): string {
  const link = new URL(CONSTS.workspacePageUrl);
  link.searchParams.append('url', url);
  link.searchParams.append('x', x);
  link.searchParams.append('y', y);

  return link.toString();
}
