import { useState } from 'react';

function Error({ data }: { data: string }) {
  return (
    <p className="mt-5 text-xs font-medium text-red-600 sm:text-sm xl:mt-6 xl:text-base">
      {data}
    </p>
  );
}

function Success({ data }: { data: string }) {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [buttonText, setButtonText] = useState('Copy link');

  const handleCopyClick = async () => {
    try {
      setButtonDisabled(true);

      await navigator.clipboard.writeText(data);
      setButtonText('Copied!');

      setTimeout(() => {
        setButtonText('Copy link');

        setButtonDisabled(false);
      }, 2000);
    } catch (_) {
      setButtonDisabled(false);
    }
  };

  return (
    <div className="mt-5 w-full max-w-lg border border-[#b3ff41] bg-lime-900 p-4 text-white sm:max-w-lg xl:mt-6 xl:max-w-none">
      <div className="flex">
        <input
          type="text"
          value={data}
          className="w-full border border-[#b3ff41] bg-green-950 px-2 py-1 text-xs outline-none sm:text-sm xl:text-base"
          aria-label="Result"
          readOnly
        />
        <button
          onClick={handleCopyClick}
          disabled={buttonDisabled}
          className="min-w-max bg-[#b3ff41] px-4 text-sm font-medium text-lime-950 hover:underline xl:text-base"
        >
          {buttonText}
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
