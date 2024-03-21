import CONSTS from '@/constants';

export function checkInputs(url: string, x: string, y: string): void {
  // Inputs are not empty:
  if (url === '' || x === '' || y === '') {
    throw new Error('Inputs cannot be empty');
  }

  const nX = Number(x);
  const nY = Number(y);

  // X and Y are numbers:
  if (isNaN(nX) || isNaN(nY)) {
    throw new Error('X and Y must be numbers');
  }

  // X and Y are integers:
  if (!Number.isInteger(nX) || !Number.isInteger(nY)) {
    throw new Error('X and Y must be integers');
  }

  // X and Y are within the limit (+1_000_000_000, -1_000_000_000):
  if (nX < -1_000_000_000 || nX > 1_000_000_000 || nY < -1_000_000_000 || nY > 1_000_000_000) {
    throw new Error('X and Y must be within the range of -/+1,000,000,000');
  }
}

export function checkImage(imageUrl: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const pixels = img.width * img.height;

      if (pixels > 500_000) {
        reject(new Error(`Image is too big (${pixels} pixels). Please, use image with less than 500 000 pixels`));
      }

      resolve();
    };

    img.onerror = () => {
      reject(new Error('Image not found'));
    };
  });
}

export function buildWorkspaceUrl(url: string, x: string, y: string): string {
  const link = new URL(CONSTS.workspace_page_url);
  link.searchParams.append('url', url);
  link.searchParams.append('x', x);
  link.searchParams.append('y', y);

  return link.toString();
}

export function getInputsFromUrl(queryString: string) {
  const urlParams = new URLSearchParams(queryString);

  const url = urlParams.get('url') || '';
  const x = urlParams.get('x') || '';
  const y = urlParams.get('y') || '';

  return { url, x, y };
}
