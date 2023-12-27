import { useEffect, useRef } from 'react';
import { Place } from './Place.ts';
import IconRPlacer from '../src/assets/IconRPlacer.tsx';

function NavBtn({ label, url }: { label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="-mt-1 min-w-max text-xs underline hover:text-[#FF4500] sm:text-sm xl:text-base"
    >
      {label}
    </a>
  );
}

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
      location.href = 'https://r-placer.seabeya.com';
    }
  }, []);

  return (
    <>
      <div className="fixed top-0 z-10 flex w-full items-center justify-around bg-[rgba(255,255,255,0.9)] p-1 shadow-lg">
        <div className="flex items-center gap-4">
          <IconRPlacer className="h-7 w-7" />
          <NavBtn label="Main Page" url="https://r-placer.seabeya.com" />
          <NavBtn label="GitHub" url="https://github.com/seabeya/r-placer" />
        </div>
        <NavBtn label="seabeya.com" url="https://www.seabeya.com" />
      </div>
      <canvas ref={canvas_back} className="absolute left-0 top-0"></canvas>
      <canvas ref={canvas_front} className="absolute cursor-none"></canvas>
    </>
  );
}

export default Workspace;
