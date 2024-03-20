import { useState } from 'react';

import GoTo from '@/components/shared/GoTo';

const actionButtonStyle =
  'min-w-max border border-gray-600 px-2 py-1 text-sm text-white hover:border-gray-500 disabled:hover:border-gray-600 sm:text-base';

export default function SuccessResult({ data }: { data: string }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [copyBtnText, setCopyBtnText] = useState('Copy to Clipboard');

  const handleCopyClick = async () => {
    setIsDisabled(true);

    try {
      await navigator.clipboard.writeText(data);
      setCopyBtnText('Copied!');

      setTimeout(() => {
        setCopyBtnText('Copy to Clipboard');
        setIsDisabled(false);
      }, 2000);
    } catch (_) {
      setIsDisabled(false);
    }
  };

  return (
    <div className="mt-5 overflow-hidden border-2 border-dashed border-gray-700 p-4">
      <input
        type="url"
        value={data}
        aria-label="Workspace URL"
        readOnly
        className="w-full border-b border-dashed border-gray-500 bg-transparent p-1 text-sm text-gray-300 outline-none sm:text-base"
      />
      <p className="mt-1 text-center text-xs text-white sm:text-sm">Share this link with others to collaborate.</p>
      <div className="mt-3 flex justify-center gap-2">
        <button onClick={handleCopyClick} disabled={isDisabled} className={actionButtonStyle}>
          {copyBtnText}
        </button>
        <GoTo href={data} className={actionButtonStyle}>
          Open
        </GoTo>
      </div>
    </div>
  );
}
