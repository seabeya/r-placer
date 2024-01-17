import { useEffect, useRef } from 'react';

import CONSTS from '@global/consts.ts';

import IconRPlacer from '@assets/IconRPlacer.tsx';
import IconGithub from '@assets/IconGithub.tsx';

import NavBtn from '@p/workspace/components/NavBtn.tsx';

import { getInputsFromURL } from '@p/workspace/utils/utils.ts';
import { checkInputs } from '@global/utils.ts';

import { Place } from '@p/workspace/utils/Place.ts';

function Workspace() {
  const canvas_back = useRef<HTMLCanvasElement>(null);
  const canvas_front = useRef<HTMLCanvasElement>(null);

  // Get data:
  const queryString = window.location.search;
  const { url, x, y } = getInputsFromURL(queryString);

  useEffect(() => {
    // Check inputs:
    if (checkInputs(url, x, y).status) {
      const place = new Place({
        canvas_bg_element: canvas_back.current!,
        canvas_fg_element: canvas_front.current!,
        imgUrl: url,
        start_x: +x,
        start_y: +y
      });
      place.generate();
    } else {
      location.href = CONSTS.mainPageUrl;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="fixed top-0 z-10 flex w-full items-center justify-around gap-2 bg-gray-100 bg-opacity-95 py-2">
        <a href={CONSTS.mainPageUrl} className="flex items-center gap-2">
          <IconRPlacer className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
          <span className="min-w-max text-lg font-medium sm:text-xl">R-Placer</span>
        </a>
        <div className="flex items-center gap-2">
          <NavBtn href={decodeURIComponent(url)} className="rounded-md px-2">
            Raw Image
          </NavBtn>
          <NavBtn href={CONSTS.mainPageUrl} className="rounded-md px-2">
            Home
          </NavBtn>
          <NavBtn href={CONSTS.githubUrl} className="rounded-full px-1">
            <IconGithub className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
          </NavBtn>
        </div>
      </div>
      <canvas ref={canvas_back} className="absolute left-0 top-0"></canvas>
      <canvas ref={canvas_front} className="absolute cursor-none"></canvas>
    </>
  );
}

export default Workspace;
