import ErrorResult from '@/components/ErrorResult';
import SuccessResult from '@/components/SuccessResult';

type ResultProps = {
  isError: boolean;
  data: string;
};

export default function Result({ isError, data }: ResultProps) {
  return isError ? <ErrorResult errorMessage={data} /> : <SuccessResult data={data} />;
}
