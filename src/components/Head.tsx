import IconRPlacer from '../assets/IconRPlacer.tsx';

export default function Head() {
  return (
    <header className="flex items-center justify-center gap-3 sm:gap-4 xl:gap-5">
      <IconRPlacer className="h-12 w-12 shrink-0 sm:h-14 sm:w-14 xl:h-16 xl:w-16" />
      <span className="wave min-w-max text-3xl font-medium text-white sm:text-4xl xl:text-5xl">
        R-Placer
      </span>
    </header>
  );
}
