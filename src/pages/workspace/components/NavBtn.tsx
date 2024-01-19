import GoTo from '@global/components/GoTo.tsx';

type NavBtnProps = {
  children: React.ReactNode;
  href: string;
  className: string;
};

function NavBtn({ children, href, className }: NavBtnProps) {
  return (
    <GoTo.Blank
      href={href}
      className={`min-w-max border bg-white py-1 text-sm text-black duration-75 hover:border-gray-300 hover:bg-gray-100 sm:text-base ${className}`}
    >
      {children}
    </GoTo.Blank>
  );
}

export default NavBtn;
