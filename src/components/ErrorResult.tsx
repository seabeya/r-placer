export default function ErrorResult({ errorMessage }: { errorMessage: string }) {
  return <p className="mt-5 text-center text-sm font-medium text-red-500 sm:text-base">{`Error: ${errorMessage}.`}</p>;
}
