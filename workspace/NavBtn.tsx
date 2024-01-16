type NavBtnProps = {
  children: React.ReactNode;
  href: string;
  className: string;
};

function NavBtn({ children, href, className }: NavBtnProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`min-w-max border bg-white text-sm duration-75 hover:border-gray-300 hover:bg-gray-100 sm:text-base ${className}`}
    >
      {children}
    </a>
  );
}

export default NavBtn;
