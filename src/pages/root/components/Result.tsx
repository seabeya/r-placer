function Error({ data }: { data: string }) {
  return <p className="mt-5 text-center text-sm font-medium text-red-500 sm:text-base">{`Error: ${data}.`}</p>;
}

function Success({ data }: { data: string }) {
  return <p>{data}</p>;
}

function Result({ isError, data }: { isError: boolean; data: string }) {
  return isError ? <Error data={data} /> : <Success data={data} />;
}

export default Result;
