import CONSTS from '@/constants';

import NavBtn from '@/components/NavBtn';

import IconRPlacer from '@/components/shared/icons/IconRPlacer';
import IconGithub from '@/components/shared/icons/IconGithub';

import GoTo from '@/components/shared/GoTo';

export default function Header({ imageUrl }: { imageUrl: string }) {
  return (
    <header className="fixed top-0 z-10 flex w-full justify-around gap-1 bg-gray-100">
      <GoTo href={CONSTS.main_page_url} className="group flex items-center gap-2 p-2 hover:bg-gray-200">
        <IconRPlacer className="h-7 w-7 shrink-0 duration-75 group-hover:rotate-45 sm:h-8 sm:w-8" />
        <h1 className="min-w-max text-lg font-medium text-black sm:text-xl">R-Placer</h1>
      </GoTo>
      <div className="flex items-center gap-2">
        <NavBtn href={imageUrl} className="rounded-md px-2">
          Raw Image
        </NavBtn>
        <NavBtn href={CONSTS.main_page_url} className="rounded-md px-2">
          Home
        </NavBtn>
        <NavBtn href={CONSTS.github_url} className="rounded-full px-1">
          <IconGithub className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
        </NavBtn>
      </div>
    </header>
  );
}
