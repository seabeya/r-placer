import GoTo from '@global/components/GoTo.tsx';

function Error({ data }: { data: string }) {
  return <p className="mt-5 text-center text-sm font-medium text-red-500 sm:text-base">{`Error: ${data}.`}</p>;
}

const actionButtonStyle =
  'min-w-max border border-gray-600 px-2 py-1 text-sm text-white hover:border-gray-500 sm:text-base';

function Success({ data }: { data: string }) {
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
        <button className={actionButtonStyle}>Copy to Clipboard</button>
        <GoTo.Blank href={data} className={actionButtonStyle}>
          Open
        </GoTo.Blank>
      </div>
    </div>
  );
}

function Result({ isError, data }: { isError: boolean; data: string }) {
  return isError ? <Error data={data} /> : <Success data={data} />;
}

export default Result;
