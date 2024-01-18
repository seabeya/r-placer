import IconRPlacer from '@global/icons/IconRPlacer.tsx';

function Header() {
  return (
    <header className="flex items-center justify-center gap-4 sm:gap-5">
      <IconRPlacer className="h-14 w-14 shrink-0 sm:h-16 sm:w-16" />
      <span className="min-w-max text-4xl font-medium text-white sm:text-5xl">R-Placer</span>
    </header>
  );
}

export default Header;
