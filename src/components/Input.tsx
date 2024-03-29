type InputProps = {
  name: string;
  type: string;
  placeholder: string;
  className: string;
};

export default function Input({ name, type, placeholder, className }: InputProps) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className={`rounded-md border border-gray-700 bg-transparent p-2 text-center text-sm text-white focus-visible:outline-none focus-visible:outline-gray-600 sm:text-base ${className}`}
      aria-label={placeholder}
      required
    />
  );
}
