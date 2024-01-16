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

export const validateCoordinates = (x: string, y: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const xNumber = Number(x);
    const yNumber = Number(y);

    if (isNaN(xNumber) || isNaN(yNumber)) {
      reject('Invalid coordinates');
    } else {
      resolve();
    }
  });
};

export const buildWorkspaceUrl = (
  url: string,
  x: string,
  y: string,
): string => {
  const link = new URL('https://r-placer.seabeya.com/workspace/');
  link.searchParams.append('url', url);
  link.searchParams.append('x', x);
  link.searchParams.append('y', y);

  return link.toString();
};
