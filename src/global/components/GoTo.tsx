interface GoToProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
}

function GoTo({ children, href, ...rest }: GoToProps) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

function GoToBlank({ children, href, ...rest }: GoToProps) {
  return (
    <GoTo href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </GoTo>
  );
}

GoTo.Blank = GoToBlank;

export default GoTo;
