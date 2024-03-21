import GoTo from '@/components/shared/GoTo';

type NavBtnProps = {
  children: React.ReactNode;
  href: string;
  className: string;
};

export default function NavBtn({ children, href, className }: NavBtnProps) {
  return (
    <GoTo
      href={href}
      className={`min-w-max border bg-white py-1 text-sm text-black duration-75 hover:border-gray-300 hover:bg-gray-100 sm:text-base ${className}`}
    >
      {children}
    </GoTo>
  );
}
