import GoTo from '@global/components/GoTo.tsx';
import CONSTS from '@global/consts.ts';

function Button({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <GoTo.Blank href={href} className="text-sm text-white hover:underline sm:text-base">
      {children}
    </GoTo.Blank>
  );
}

function Footer() {
  return (
    <footer className="mt-5 flex flex-col items-center gap-2">
      <div className="flex gap-6">
        <Button href={`${CONSTS.github_url}#how-to-use`}>How to use?</Button>
        <Button href={CONSTS.github_url}>GitHub</Button>
      </div>
      <p className="max-w-sm text-center text-xs text-gray-400 sm:max-w-md sm:text-sm">
        If you like the project, you can show your support by giving a GitHub star. It's free and helps me a lot.
      </p>
      <p className="text-xs text-gray-400 sm:text-sm" suppressHydrationWarning={true}>
        {`© ${new Date().getFullYear()} Sha'an Aliyev / `}
        <GoTo.Blank href="https://www.seabeya.com/" className="hover:underline">
          seabeya.com
        </GoTo.Blank>
      </p>
    </footer>
  );
}

export default Footer;
