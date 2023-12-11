export default function Input({
  type,
  placeholder,
  className,
}: {
  type: string;
  placeholder: string;
  className?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`border-[#FF4500] bg-[#0D1117] text-sm text-white outline-none sm:text-base xl:text-lg ${className}`}
      aria-label={placeholder}
    />
  );
}
