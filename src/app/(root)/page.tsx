'use client';

import { useState } from 'react';

import Input from '@/components/Input';
import MainBtn from '@/components/MainBtn';
import Result from '@/components/Result';

import { buildWorkspaceUrl, checkImage, checkInputs } from '@/lib/utils';

export default function Page() {
  const [result, setResult] = useState({
    show: false,
    error: true,
    data: '',
  });

  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const url = formData.get('url') as string;
    const x = formData.get('x') as string;
    const y = formData.get('y') as string;

    setIsDisabled(true);

    try {
      checkInputs(url, x, y);
      await checkImage(url);

      const workspaceUrl = buildWorkspaceUrl(url, x, y);

      setResult({ show: true, error: false, data: workspaceUrl });
    } catch (error: any) {
      setResult({ show: true, error: true, data: error.message });
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-wrap justify-center gap-6">
        <Input name="url" type="url" placeholder="Enter an image URL" className="w-full" />
        <Input name="x" type="number" placeholder="Starting X" className="w-1/3" />
        <Input name="y" type="number" placeholder="Starting Y" className="w-1/3" />
        <div className="flex w-full justify-center">
          <MainBtn isDisabled={isDisabled}>Generate</MainBtn>
        </div>
      </form>
      {result.show && <Result isError={result.error} data={result.data} />}
    </>
  );
}
