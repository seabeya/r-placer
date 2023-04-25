(() => {
  const place = (image, start_x, start_y) => {
    // Canvas top left defaults:
    const X_TOP_LEFT = start_x + 1; // +1 is for visual correction;
    const Y_TOP_LEFT = start_y;

    // Size of one pixel in canvas view:
    const ONE_PIXEL = 15;

    // Leaving space around the canvas to make the text visible in any position:
    const X_OFFSET = 350;
    const Y_OFFSET = 100;

    // Get current mouse x,y positions:
    const getMousePos = (canvas, evt) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((evt.clientX - rect.left - 15) / (rect.right - rect.left)) * canvas.width;
      const y = ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height;
      return { x, y };
    };

    // Draw the grid to make pixel separations visually clear:
    const drawGrid = (x_0, y_0, x_max, y_max, ctx) => {
      for (let x = x_0; x <= x_max; x += ONE_PIXEL) {
        // Vertical:
        ctx.moveTo(x, y_0);
        ctx.lineTo(x, y_max);
        for (let y = y_0; y <= y_max; y += ONE_PIXEL) {
          // Horizontal:
          ctx.moveTo(x_0, y);
          ctx.lineTo(x_max, y);
        }
      }
      // Grid line color:
      ctx.strokeStyle = '#a7a7a7';

      ctx.stroke();
    };

    // Creating Canvas: {
    const canvas_bg = document.getElementById('canvas_bg');
    const bg = canvas_bg.getContext('2d');

    const canvas_fg = document.getElementById('canvas_fg');
    const fg = canvas_fg.getContext('2d');

    const img = new Image();
    img.onload = () => {
      w = img.width * ONE_PIXEL;
      h = img.height * ONE_PIXEL;
      document.title = 'R-Placer ' + img.width * img.height + ' pixels';

      bg.canvas.width = w + X_OFFSET;
      bg.canvas.height = h + 2 * Y_OFFSET;

      fg.canvas.width = bg.canvas.width;
      fg.canvas.height = bg.canvas.height;
      bg.imageSmoothingEnabled = false;
      bg.drawImage(img, 0, 0, img.width, img.height, 0, Y_OFFSET, w, h);
      drawGrid(0, Y_OFFSET, w, h + Y_OFFSET, bg);
    };
    img.onerror = () => {
      location.href = '/'; // <----------- Change
    };
    img.src = image;
    // }

    // Coordinates text:
    const drawText = (text, x, y) => {
      fg.font = '40px Sans-serif';
      // black overlay:
      fg.strokeStyle = 'black';
      fg.lineWidth = 8;
      fg.strokeText(text, x, y);
      // white text:
      fg.fillStyle = 'white';
      fg.fillText(text, x, y);
    };

    canvas_fg.addEventListener('mousemove', (event) => {
      let p = getMousePos(canvas_fg, event);
      let x = Math.floor(p.x / ONE_PIXEL);
      let y = Math.floor((p.y - Y_OFFSET) / ONE_PIXEL);

      fg.clearRect(0, 0, fg.canvas.width, fg.canvas.height);

      if (
        Math.floor(p.x / ONE_PIXEL) + X_TOP_LEFT >= start_x &&
        Math.floor((p.y - Y_OFFSET) / ONE_PIXEL) + Y_TOP_LEFT >= start_y &&
        Math.floor(p.x / ONE_PIXEL) + X_TOP_LEFT < img.width + start_x &&
        Math.floor((p.y - Y_OFFSET) / ONE_PIXEL) + Y_TOP_LEFT < img.height + start_y
      ) {
        drawText('(' + (x + X_TOP_LEFT) + ', ' + (y + Y_TOP_LEFT) + ')', p.x + 50, p.y - 15);
      }

      fg.lineWidth = 2;
      let circle_x = x * ONE_PIXEL + ONE_PIXEL / 2 + 15;
      let circle_y = y * ONE_PIXEL + Y_OFFSET + ONE_PIXEL / 2;

      fg.beginPath();
      fg.strokeStyle = 'white';
      fg.arc(circle_x, circle_y, ONE_PIXEL - 6, 0, 2 * Math.PI, false);
      fg.stroke();

      fg.beginPath();
      fg.strokeStyle = 'black';
      fg.arc(circle_x, circle_y, ONE_PIXEL - 4, 0, 2 * Math.PI, false);
      fg.stroke();
    });

    canvas_fg.addEventListener('click', (event) => {
      let p = getMousePos(canvas_fg, event);
      let x = Math.floor(p.x / ONE_PIXEL) + X_TOP_LEFT;
      let y = Math.floor((p.y - Y_OFFSET) / ONE_PIXEL) + Y_TOP_LEFT;
      if (x >= start_x && y >= start_y && x < img.width + start_x && y < img.height + start_y) {
        let url = 'https://new.reddit.com/r/place/?cx=' + x + '&cy=' + y + '&px=12';
        window.open(url, '_blank').focus();
      }
    });
  };

  // Run:
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const url = urlParams.get('url');
  const x = urlParams.get('x');
  const y = urlParams.get('y');

  if (url && x && y) {
    place(url, +x, +y);
  } else {
    location.href = '/'; // <----------- Change
  }
})();
