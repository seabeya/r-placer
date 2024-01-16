import CONSTS from '../consts.ts';

export default function Footer() {
  return (
    <footer className="mt-5">
      <div className="text-center text-sm text-white sm:text-base">
        <a
          href={`${CONSTS.githubUrl}#how-to-use`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          How to use?
        </a>
        <a
          href={CONSTS.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-6 hover:underline"
        >
          GitHub
        </a>
      </div>
      <p className="m-auto mt-1 max-w-sm text-center text-xs text-gray-400 sm:max-w-md sm:text-sm">
        If you like the project, you can show your support by giving a GitHub
        star. It's free and helps me a lot.
      </p>
      <p
        className="mt-2 w-full text-center text-xs text-gray-400"
        suppressHydrationWarning={true}
      >
        {`© ${new Date().getFullYear()} Sha'an Aliyev / `}
        <a
          href="https://www.seabeya.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          seabeya.com
        </a>
      </p>
    </footer>
  );
}
