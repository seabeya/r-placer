import CONSTS from '@global/consts.ts';

export const validateImage = (imageUrl: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      resolve();
    };

    img.onerror = () => {
      reject('Invalid image URL');
    };
  });
};

export const buildWorkspaceUrl = (url: string, x: string, y: string): string => {
  const link = new URL(CONSTS.workspacePageUrl);
  link.searchParams.append('url', url);
  link.searchParams.append('x', x);
  link.searchParams.append('y', y);

  return link.toString();
};
