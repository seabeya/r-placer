'use client';

import { useEffect, useRef, useState } from 'react';

import CONSTS from '@/constants';

import Header from './Header';

import { checkInputs, getInputsFromUrl } from '@/lib/utils';
import { Place } from '@/lib/Place';

export default function Page() {
  const [imageUrl, setImageUrl] = useState('');

  const canvasBack = useRef<HTMLCanvasElement>(null);
  const canvasFront = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const queryString = window.location.search;
    const { url, x, y } = getInputsFromUrl(queryString);

    setImageUrl(url);

    try {
      checkInputs(url, x, y);

      const place = new Place({
        canvas_bg_element: canvasBack.current!,
        canvas_fg_element: canvasFront.current!,
        imgUrl: url,
        start_x: x,
        start_y: y,
      });

      place.generate();
    } catch (_) {
      location.href = CONSTS.main_page_url;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header imageUrl={imageUrl} />
      <main>
        <canvas ref={canvasBack} className="absolute left-0 top-0"></canvas>
        <canvas ref={canvasFront} className="absolute cursor-none"></canvas>
      </main>
    </>
  );
}
