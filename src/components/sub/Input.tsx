import { ChangeEvent } from 'react';

export default function Input({
  name,
  type,
  placeholder,
  value,
  onChange,
  className,
}: {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border-[#FF4500] bg-[#0D1117] text-sm text-white outline-none sm:text-base xl:text-lg ${className}`}
      aria-label={placeholder}
      required
    />
  );
}
