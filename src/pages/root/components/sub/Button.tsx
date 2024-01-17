import IconRightArrow from '../../../../assets/IconRightArrow.tsx';

type ButtonProps = {
  isDisabled: boolean;
  label: string;
};

function Button({ isDisabled, label }: ButtonProps) {
  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="flex items-center gap-1 rounded-md bg-gray-300 px-8 py-2 text-sm text-black duration-75 hover:gap-2 hover:bg-gray-200 disabled:cursor-wait disabled:bg-gray-400 sm:text-base"
    >
      {label}
      <IconRightArrow className="h-5 w-5" />
    </button>
  );
}

export default Button;
