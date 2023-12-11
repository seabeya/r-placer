function Error({ data }: { data: string }) {
  return (
    <p className="text-xs font-medium text-red-600 sm:text-sm xl:text-base">
      {data}
    </p>
  );
}

function Success({ data }: { data: string }) {
  return (
    <div className="w-full max-w-lg border border-[#b3ff41] bg-lime-900 p-4 text-white sm:max-w-lg xl:max-w-none">
      <div className="flex">
        <input
          type="text"
          value={data}
          className="w-full border border-[#b3ff41] bg-green-950 px-2 py-1 text-xs outline-none sm:text-sm xl:text-base"
          aria-label="Result"
          readOnly
        />
        <button className="min-w-max bg-[#b3ff41] px-4 text-sm font-medium text-lime-950 hover:underline xl:text-base">
          Copy link
        </button>
      </div>
      <p className="mt-1 text-center text-xs sm:text-sm">
        Share this link with others to collaborate.
      </p>
    </div>
  );
}

export default function Result({
  data,
  success,
}: {
  data: string;
  success?: boolean;
}) {
  return success ? <Success data={data} /> : <Error data={data} />;
}
