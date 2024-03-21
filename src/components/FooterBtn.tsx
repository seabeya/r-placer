import GoTo from '@/components/shared/GoTo';

type FooterBtnProps = {
  href: string;
  label: string;
};

export default function FooterBtn({ href, label }: FooterBtnProps) {
  return (
    <GoTo href={href} className="text-sm text-white hover:underline sm:text-base">
      {label}
    </GoTo>
  );
}
