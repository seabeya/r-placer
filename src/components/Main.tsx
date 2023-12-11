import Input from './sub/Input.tsx';
import Result from './sub/Result.tsx';

export default function Main() {
  return (
    <main className="mt-10 flex flex-wrap justify-around gap-4 sm:mt-12 sm:gap-6 xl:mt-14">
      <Input
        type="text"
        placeholder="Enter an image URL"
        className="w-full max-w-lg rounded-lg border-2 px-2 py-1 sm:max-w-lg sm:px-3 xl:max-w-none xl:px-4"
      />
      <Input
        type="number"
        placeholder="Starting X"
        className="w-1/3 border-b-2 px-1 sm:w-1/4 xl:w-1/5"
      />
      <Input
        type="number"
        placeholder="Starting Y"
        className="w-1/3 border-b-2 px-1 sm:w-1/4 xl:w-1/5"
      />
      <div className="mt-2 w-full text-center sm:mt-3">
        <button className="rounded-md bg-[#FF4500] px-7 py-1 text-sm font-medium text-white hover:bg-[#e23c00] sm:text-base xl:text-lg">
          Generate
        </button>
      </div>
      <Result data="Test" success />
    </main>
  );
}
