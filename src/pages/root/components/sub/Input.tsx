import { ChangeEvent } from 'react';

type InputProps = {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

function Input({ name, type, placeholder, value, onChange, className }: InputProps) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`rounded-md border border-gray-700 bg-[#0D1117] p-2 text-center text-sm text-white focus-visible:outline-none focus-visible:outline-gray-600 sm:text-base ${className}`}
      aria-label={placeholder}
      required
    />
  );
}

export default Input;
