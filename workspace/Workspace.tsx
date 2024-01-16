import { useEffect, useRef } from 'react';

import CONSTS from '../src/consts.ts';

import { Place } from './Place.ts';

import IconRPlacer from '../src/assets/IconRPlacer.tsx';
import IconGithub from '../src/assets/IconGithub.tsx';

import NavBtn from './NavBtn.tsx';

function Workspace() {
  const canvas_back = useRef<HTMLCanvasElement>(null);
  const canvas_front = useRef<HTMLCanvasElement>(null);

  // Getting data:
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const url = urlParams.get('url');
  const x = urlParams.get('x');
  const y = urlParams.get('y');

  useEffect(() => {
    if (url && x && y && !isNaN(+x) && !isNaN(+y)) {
      const place = new Place({
        canvas_bg_element: canvas_back.current!,
        canvas_fg_element: canvas_front.current!,
        imgUrl: url,
        start_x: +x,
        start_y: +y,
      });
      place.generate();
    } else {
      location.href = CONSTS.mainPageUrl;
    }
  }, []);

  return (
    <>
      <div className="fixed top-0 z-10 flex w-full items-center justify-around gap-2 bg-gray-100 bg-opacity-95 py-1">
        <a href={CONSTS.mainPageUrl} className="flex items-center gap-2">
          <IconRPlacer className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
          <span className="min-w-max text-lg font-medium sm:text-xl">
            R-Placer
          </span>
        </a>
        <div className="flex items-center gap-4">
          <NavBtn
            href={CONSTS.mainPageUrl}
            className="rounded-md px-4  py-1 sm:py-2"
          >
            Main Page
          </NavBtn>
          <NavBtn
            href={CONSTS.githubUrl}
            className="flex items-center justify-center gap-2 rounded-full py-1 pl-1 pr-4"
          >
            <IconGithub className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
            Github
          </NavBtn>
        </div>
      </div>
      <canvas ref={canvas_back} className="absolute left-0 top-0"></canvas>
      <canvas ref={canvas_front} className="absolute cursor-none"></canvas>
    </>
  );
}

export default Workspace;
