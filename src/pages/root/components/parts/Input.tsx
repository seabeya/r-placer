import { forwardRef } from 'react';

type InputProps = {
  name: string;
  type: string;
  placeholder: string;
  className: string;
};

const Input = forwardRef(
  ({ name, type, placeholder, className }: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <input
        ref={ref}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`rounded-md border border-gray-700 bg-transparent p-2 text-center text-sm text-white focus-visible:outline-none focus-visible:outline-gray-600 sm:text-base ${className}`}
        aria-label={placeholder}
        required
      />
    );
  },
);

export default Input;
