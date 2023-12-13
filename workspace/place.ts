// Get current mouse x,y positions:
const getMousePos = (canvas: HTMLCanvasElement, event: MouseEvent) => {
  const rect = canvas.getBoundingClientRect();
  const x =
    ((event.clientX - rect.left - 15) / (rect.right - rect.left)) *
    canvas.width;
  const y =
    ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height;
  return { x, y };
};

// Draw grid:
const drawGrid = (
  x_0: number,
  y_0: number,
  x_max: number,
  y_max: number,
  bg: CanvasRenderingContext2D,
  ONE_PIXEL: number,
) => {
  for (let x = x_0; x <= x_max; x += ONE_PIXEL) {
    // Vertical:
    bg.moveTo(x, y_0);
    bg.lineTo(x, y_max);
    for (let y = y_0; y <= y_max; y += ONE_PIXEL) {
      // Horizontal:
      bg.moveTo(x_0, y);
      bg.lineTo(x_max, y);
    }
  }
  // Grid line color:
  bg.strokeStyle = '#a7a7a7';

  bg.stroke();
};

// Coordinates text:
const drawText = (
  text: string,
  x: number,
  y: number,
  fg: CanvasRenderingContext2D,
) => {
  fg.font = '40px Sans-serif';
  // black overlay:
  fg.strokeStyle = 'black';
  fg.lineWidth = 8;
  fg.strokeText(text, x, y);
  // white text:
  fg.fillStyle = 'white';
  fg.fillText(text, x, y);
};

const mouseMoveAction = (
  canvas_fg_element: HTMLCanvasElement,
  ONE_PIXEL: number,
  Y_OFFSET: number,
  fg: CanvasRenderingContext2D,
  X_TOP_LEFT: number,
  start_x: number,
  Y_TOP_LEFT: number,
  start_y: number,
  img: HTMLImageElement,
) => {
  canvas_fg_element.addEventListener('mousemove', (event) => {
    const p = getMousePos(canvas_fg_element, event);
    const x = Math.floor(p.x / ONE_PIXEL);
    const y = Math.floor((p.y - Y_OFFSET) / ONE_PIXEL);

    fg.clearRect(0, 0, fg.canvas.width, fg.canvas.height);

    if (
      Math.floor(p.x / ONE_PIXEL) + X_TOP_LEFT >= start_x &&
      Math.floor((p.y - Y_OFFSET) / ONE_PIXEL) + Y_TOP_LEFT >= start_y &&
      Math.floor(p.x / ONE_PIXEL) + X_TOP_LEFT < img.width + start_x &&
      Math.floor((p.y - Y_OFFSET) / ONE_PIXEL) + Y_TOP_LEFT <
        img.height + start_y
    ) {
      drawText(
        '(' + (x + X_TOP_LEFT) + ', ' + (y + Y_TOP_LEFT) + ')',
        p.x + 50,
        p.y - 15,
        fg,
      );
    }

    fg.lineWidth = 2;
    const circle_x = x * ONE_PIXEL + ONE_PIXEL / 2 + 15;
    const circle_y = y * ONE_PIXEL + Y_OFFSET + ONE_PIXEL / 2;

    fg.beginPath();
    fg.strokeStyle = 'white';
    fg.arc(circle_x, circle_y, ONE_PIXEL - 6, 0, 2 * Math.PI, false);
    fg.stroke();

    fg.beginPath();
    fg.strokeStyle = 'black';
    fg.arc(circle_x, circle_y, ONE_PIXEL - 4, 0, 2 * Math.PI, false);
    fg.stroke();
  });
};

const mouseClickAction = (
  canvas_fg_element: HTMLCanvasElement,
  ONE_PIXEL: number,
  Y_OFFSET: number,
  X_TOP_LEFT: number,
  start_x: number,
  Y_TOP_LEFT: number,
  start_y: number,
  img: HTMLImageElement,
) => {
  canvas_fg_element.addEventListener('click', (event) => {
    const p = getMousePos(canvas_fg_element, event);
    const x = Math.floor(p.x / ONE_PIXEL) + X_TOP_LEFT;
    const y = Math.floor((p.y - Y_OFFSET) / ONE_PIXEL) + Y_TOP_LEFT;
    if (
      x >= start_x &&
      y >= start_y &&
      x < img.width + start_x &&
      y < img.height + start_y
    ) {
      const url =
        'https://new.reddit.com/r/place/?cx=' +
        x +
        '&cy=' +
        y +
        '&px=15&screenmode=fullscreen';
      window.open(url, '_blank');
    }
  });
};

export const generateCanvas = (
  canvas_bg_element: HTMLCanvasElement,
  canvas_fg_element: HTMLCanvasElement,
  imgUrl: string,
  start_x: number,
  start_y: number,
) => {
  // Canvas top left defaults:
  const X_TOP_LEFT = start_x + 1; // +1 is for visual correction;
  const Y_TOP_LEFT = start_y;

  // Size of one pixel in canvas view:
  const ONE_PIXEL = 15;

  // Leaving space around the canvas to make the text visible in any position:
  const X_OFFSET = 500;
  const Y_OFFSET = 100;

  // Creating Canvas: {
  const bg = canvas_bg_element.getContext('2d')!;
  const fg = canvas_fg_element.getContext('2d')!;

  const img = new Image();
  img.src = imgUrl;

  img.onload = () => {
    const img_w = img.width * ONE_PIXEL;
    const img_h = img.height * ONE_PIXEL;
    document.title = 'R-Placer ' + img.width * img.height + ' pixels';

    bg.canvas.width = img_w + X_OFFSET;
    bg.canvas.height = img_h + 2 * Y_OFFSET;

    fg.canvas.width = bg.canvas.width;
    fg.canvas.height = bg.canvas.height;
    bg.imageSmoothingEnabled = false;

    bg.drawImage(img, 0, 0, img.width, img.height, 0, Y_OFFSET, img_w, img_h);
    drawGrid(0, Y_OFFSET, img_w, img_h + Y_OFFSET, bg, ONE_PIXEL);

    mouseMoveAction(
      canvas_fg_element,
      ONE_PIXEL,
      Y_OFFSET,
      fg,
      X_TOP_LEFT,
      start_x,
      Y_TOP_LEFT,
      start_y,
      img,
    );

    mouseClickAction(
      canvas_fg_element,
      ONE_PIXEL,
      Y_OFFSET,
      X_TOP_LEFT,
      start_x,
      Y_TOP_LEFT,
      start_y,
      img,
    );
  };

  img.onerror = () => {
    location.href = 'https://r-placer.seabeya.com';
  };
  // }
};
