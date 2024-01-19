import IconRightArrow from '@global/icons/IconRightArrow.tsx';

type ButtonProps = {
  children: React.ReactNode;
  isDisabled: boolean;
};

function Button({ children, isDisabled }: ButtonProps) {
  return (
    <button
      disabled={isDisabled}
      className="flex items-center gap-1 rounded-md bg-gray-300 px-8 py-2 text-sm text-black duration-75 hover:gap-2 hover:bg-gray-200 disabled:cursor-wait disabled:bg-gray-400 disabled:hover:gap-1 sm:text-base"
    >
      {children}
      <IconRightArrow className="h-5 w-5" />
    </button>
  );
}

export default Button;
