import { useState } from 'react';

function Error({ data }: { data: string }) {
  return (
    <p className="mt-5 text-center text-sm font-medium text-red-500 sm:text-base">
      {`Error: ${data}`}
    </p>
  );
}

function Success({ data }: { data: string }) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [buttonText, setButtonText] = useState('Copy to Clipboard');

  const handleCopyClick = async () => {
    setIsButtonDisabled(true);

    try {
      await navigator.clipboard.writeText(data);
      setButtonText('Copied!');

      setTimeout(() => {
        setButtonText('Copy to Clipboard');

        setIsButtonDisabled(false);
      }, 2000);
    } catch (_) {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="mt-5 overflow-hidden border-2 border-dashed border-gray-700 p-4 text-sm text-white sm:text-base">
      <input
        type="url"
        value={data}
        aria-label="Workspace URL"
        readOnly
        className="w-full border-b border-dashed border-gray-500 bg-transparent p-1 text-gray-300 outline-none"
      />
      <p className="mt-2 text-center text-xs sm:text-sm">
        Share this link with others to collaborate.
      </p>
      <div className="mt-3 flex items-center justify-center gap-2">
        <button
          onClick={handleCopyClick}
          disabled={isButtonDisabled}
          className="min-w-max border border-gray-600 px-2 py-1 hover:border-gray-500"
        >
          {buttonText}
        </button>
        <a
          href={data}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-max border border-gray-600 px-2 py-1 hover:border-gray-500"
        >
          Open
        </a>
      </div>
    </div>
  );
}

function Result({ success, data }: { success: boolean; data: string }) {
  return success ? <Success data={data} /> : <Error data={data} />;
}

export default Result;
