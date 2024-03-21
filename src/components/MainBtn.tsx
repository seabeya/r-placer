type MainBtnProps = {
  children: React.ReactNode;
  isDisabled: boolean;
};

export default function MainBtn({ children, isDisabled }: MainBtnProps) {
  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="flex items-center gap-1 rounded-md bg-gray-300 px-8 py-2 text-sm text-black duration-75 hover:gap-2 hover:bg-gray-200 disabled:cursor-wait disabled:bg-gray-400 disabled:hover:gap-1 sm:text-base"
    >
      {children}
      <span>-&gt;</span>
    </button>
  );
}
