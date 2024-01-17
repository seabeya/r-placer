import CONSTS from '../../../global/consts.ts';

interface IPlaceInput {
  canvas_bg_element: HTMLCanvasElement;
  canvas_fg_element: HTMLCanvasElement;
  imgUrl: string;
  start_x: number;
  start_y: number;
}

export class Place {
  private canvas_bg_element;
  private canvas_fg_element;
  private imgUrl;
  private start_x;
  private start_y;

  private X_TOP_LEFT: number;
  private Y_TOP_LEFT: number;

  private ONE_PIXEL: number;

  private X_OFFSET: number;
  private Y_OFFSET: number;

  private bg: CanvasRenderingContext2D;
  private fg: CanvasRenderingContext2D;

  constructor({ canvas_bg_element, canvas_fg_element, imgUrl, start_x, start_y }: IPlaceInput) {
    this.canvas_bg_element = canvas_bg_element;
    this.canvas_fg_element = canvas_fg_element;
    this.imgUrl = imgUrl;
    this.start_x = start_x;
    this.start_y = start_y;

    // Canvas top left defaults:
    this.X_TOP_LEFT = this.start_x + 1; // +1 is for visual correction;
    this.Y_TOP_LEFT = this.start_y;

    // Size of one pixel in canvas view:
    this.ONE_PIXEL = 15;

    // Leaving space around the canvas to make the text visible in any position:
    this.X_OFFSET = 500;
    this.Y_OFFSET = 100;

    this.bg = this.canvas_bg_element.getContext('2d')!;
    this.fg = this.canvas_fg_element.getContext('2d')!;
  }

  private getMousePosition = (event: MouseEvent) => {
    const rect = this.canvas_fg_element.getBoundingClientRect();
    const x = ((event.clientX - rect.left - 15) / (rect.right - rect.left)) * this.canvas_fg_element.width;
    const y = ((event.clientY - rect.top) / (rect.bottom - rect.top)) * this.canvas_fg_element.height;
    return { x, y };
  };

  private drawGrid = (img_w: number, img_h: number) => {
    for (let x = 0; x <= img_w; x += this.ONE_PIXEL) {
      // Vertical:
      this.bg.moveTo(x, this.Y_OFFSET);
      this.bg.lineTo(x, img_h + this.Y_OFFSET);
      for (let y = this.Y_OFFSET; y <= img_h + this.Y_OFFSET; y += this.ONE_PIXEL) {
        // Horizontal:
        this.bg.moveTo(0, y);
        this.bg.lineTo(img_w, y);
      }
    }
    // Grid line color:
    this.bg.strokeStyle = '#a7a7a7';

    this.bg.stroke();
  };

  private drawText = (text: string, x: number, y: number) => {
    this.fg.font = '40px Sans-serif';
    // black overlay:
    this.fg.strokeStyle = 'black';
    this.fg.lineWidth = 8;
    this.fg.strokeText(text, x, y);
    // white text:
    this.fg.fillStyle = 'white';
    this.fg.fillText(text, x, y);
  };

  private mouseMoveAction = (img: HTMLImageElement) => {
    this.canvas_fg_element.addEventListener('mousemove', (event) => {
      const p = this.getMousePosition(event);
      const x = Math.floor(p.x / this.ONE_PIXEL);
      const y = Math.floor((p.y - this.Y_OFFSET) / this.ONE_PIXEL);

      this.fg.clearRect(0, 0, this.fg.canvas.width, this.fg.canvas.height);

      if (
        Math.floor(p.x / this.ONE_PIXEL) + this.X_TOP_LEFT >= this.start_x &&
        Math.floor((p.y - this.Y_OFFSET) / this.ONE_PIXEL) + this.Y_TOP_LEFT >= this.start_y &&
        Math.floor(p.x / this.ONE_PIXEL) + this.X_TOP_LEFT < img.width + this.start_x &&
        Math.floor((p.y - this.Y_OFFSET) / this.ONE_PIXEL) + this.Y_TOP_LEFT < img.height + this.start_y
      ) {
        this.drawText('(' + (x + this.X_TOP_LEFT) + ', ' + (y + this.Y_TOP_LEFT) + ')', p.x + 50, p.y - 15);
      }

      this.fg.lineWidth = 2;
      const circle_x = x * this.ONE_PIXEL + this.ONE_PIXEL / 2 + 15;
      const circle_y = y * this.ONE_PIXEL + this.Y_OFFSET + this.ONE_PIXEL / 2;

      this.fg.beginPath();
      this.fg.strokeStyle = 'white';
      this.fg.arc(circle_x, circle_y, this.ONE_PIXEL - 6, 0, 2 * Math.PI, false);
      this.fg.stroke();

      this.fg.beginPath();
      this.fg.strokeStyle = 'black';
      this.fg.arc(circle_x, circle_y, this.ONE_PIXEL - 4, 0, 2 * Math.PI, false);
      this.fg.stroke();
    });
  };

  private mouseClickAction = (img: HTMLImageElement) => {
    this.canvas_fg_element.addEventListener('click', (event) => {
      const p = this.getMousePosition(event);
      const x = Math.floor(p.x / this.ONE_PIXEL) + this.X_TOP_LEFT;
      const y = Math.floor((p.y - this.Y_OFFSET) / this.ONE_PIXEL) + this.Y_TOP_LEFT;
      if (x >= this.start_x && y >= this.start_y && x < img.width + this.start_x && y < img.height + this.start_y) {
        const url = 'https://new.reddit.com/r/place/?cx=' + x + '&cy=' + y + '&px=15&screenmode=fullscreen';
        window.open(url, '_blank');
      }
    });
  };

  public generate = () => {
    const img = new Image();
    img.src = this.imgUrl;

    img.onload = () => {
      const img_w = img.width * this.ONE_PIXEL;
      const img_h = img.height * this.ONE_PIXEL;
      document.title = 'R-Placer ' + img.width * img.height + ' pixels';

      this.bg.canvas.width = img_w + this.X_OFFSET;
      this.bg.canvas.height = img_h + 2 * this.Y_OFFSET;
      this.fg.canvas.width = this.bg.canvas.width;
      this.fg.canvas.height = this.bg.canvas.height;
      this.bg.imageSmoothingEnabled = false;

      this.bg.drawImage(img, 0, 0, img.width, img.height, 0, this.Y_OFFSET, img_w, img_h);
      this.drawGrid(img_w, img_h);

      this.mouseMoveAction(img);
      this.mouseClickAction(img);
    };

    img.onerror = () => {
      location.href = CONSTS.mainPageUrl;
    };
  };
}
