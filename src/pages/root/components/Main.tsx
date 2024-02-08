import { useState } from 'react';

import Input from '@root/components/parts/Input.tsx';
import Button from '@root/components/parts/Button.tsx';
import Result from '@root/components/Result.tsx';

import { buildWorkspaceUrl, checkImage, checkInputs } from '@global/utils.ts';
import { throwFalsey } from '@global/helpers.ts';

function Main() {
  const [result, setResult] = useState({
    show: false,
    error: true,
    data: '',
  });

  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Get input values:
    const form = new FormData(event.currentTarget);
    const formData = {
      url: form.get('url') as string,
      x: form.get('x') as string,
      y: form.get('y') as string,
    };

    setIsDisabled(true);

    try {
      // Check if inputs are valid:
      throwFalsey(checkInputs(formData.url, formData.x, formData.y));

      // Check if image is valid:
      await checkImage(formData.url);

      // Build workspace URL:
      const workspaceUrl = buildWorkspaceUrl(formData.url, formData.x, formData.y);

      setResult({ show: true, error: false, data: workspaceUrl });
    } catch (error) {
      setResult({ show: true, error: true, data: error as string });
    }

    setIsDisabled(false);
  };

  return (
    <main className="mt-12 sm:mt-14">
      <form onSubmit={handleSubmit} className="flex flex-wrap justify-center gap-6">
        <Input name="url" type="url" placeholder="Enter an image URL" className="w-full" />
        <Input name="x" type="number" placeholder="Starting X" className="w-1/3" />
        <Input name="y" type="number" placeholder="Starting Y" className="w-1/3" />
        <div className="flex w-full justify-center">
          <Button isDisabled={isDisabled}>Generate</Button>
        </div>
      </form>
      {result.show && <Result isError={result.error} data={result.data} />}
    </main>
  );
}

export default Main;
