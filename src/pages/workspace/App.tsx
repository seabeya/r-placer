import { useEffect, useRef } from 'react';

import Header from '@workspace/components/Header.tsx';
import { Place } from '@workspace/Place.ts';

import { checkInputs, getInputsFromUrl } from '@global/utils.ts';
import CONSTS from '@global/consts.ts';

function App() {
  const canvasBack = useRef<HTMLCanvasElement>(null);
  const canvasFront = useRef<HTMLCanvasElement>(null);

  // Get data from URL:
  const queryString = window.location.search;
  const { url, x, y } = getInputsFromUrl(queryString);

  useEffect(() => {
    if (checkInputs(url, x, y).status) {
      const place = new Place({
        canvas_bg_element: canvasBack.current!,
        canvas_fg_element: canvasFront.current!,
        imgUrl: url,
        start_x: x,
        start_y: y,
      });
      place.generate();
    } else {
      location.href = CONSTS.main_page_url;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header imageUrl={url} />
      <canvas ref={canvasBack} className="absolute left-0 top-0"></canvas>
      <canvas ref={canvasFront} className="absolute cursor-none"></canvas>
    </>
  );
}

export default App;
