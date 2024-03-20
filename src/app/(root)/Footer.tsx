import CONSTS from '@/constants';

import FooterBtn from '@/components/FooterBtn';

import GoTo from '@/components/shared/GoTo';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-2">
      <div className="flex gap-6">
        <FooterBtn href={`${CONSTS.github_url}#how-to-use`} label="How to use?" />
        <FooterBtn href={CONSTS.github_url} label="GitHub" />
      </div>
      <p className="max-w-sm text-center text-xs text-gray-400 sm:max-w-md sm:text-sm">
        {"If you like the project, you can show your support by giving a GitHub star. It's free and helps me a lot."}
      </p>
      <p className="text-xs text-gray-400 sm:text-sm" suppressHydrationWarning={true}>
        {`© ${new Date().getFullYear()} Sha'an Aliyev / `}
        <GoTo href="https://www.seabeya.com/" className="hover:underline">
          seabeya.com
        </GoTo>
      </p>
    </footer>
  );
}
