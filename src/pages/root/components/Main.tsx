import { useState } from 'react';
import Input from '@root/components/parts/Input.tsx';
import Button from '@root/components/parts/Button.tsx';
import Result from '@root/components/Result.tsx';
import { buildWorkspaceUrl, checkImage, checkInputs } from '@global/utils.ts';
import { throwFalsey } from '@global/helpers.ts';

function Main() {
  // States:
  const [inputData, setInputData] = useState({
    url: '',
    x: '',
    y: '',
  });

  const [result, setResult] = useState({
    show: false,
    error: true,
    data: '',
  });

  const [isDisabled, setIsDisabled] = useState(false);

  // Handlers:
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsDisabled(true);

    try {
      // Check if inputs are valid:
      throwFalsey(checkInputs(inputData.url, inputData.x, inputData.y));

      // Check if image is valid:
      await checkImage(inputData.url);

      // Build workspace URL:
      const workspaceUrl = buildWorkspaceUrl(inputData.url, inputData.x, inputData.y);

      setResult({ show: true, error: false, data: workspaceUrl });
    } catch (error) {
      setResult({ show: true, error: true, data: error as string });
    }

    setIsDisabled(false);
  };

  return (
    <main className="mt-12 sm:mt-14">
      <form onSubmit={handleSubmit} className="flex flex-wrap justify-center gap-6">
        <Input
          name="url"
          type="url"
          placeholder="Enter an image URL"
          value={inputData.url}
          onChange={handleChange}
          className="w-full"
        />
        <Input
          name="x"
          type="number"
          placeholder="Starting X"
          value={inputData.x}
          onChange={handleChange}
          className="w-1/3"
        />
        <Input
          name="y"
          type="number"
          placeholder="Starting Y"
          value={inputData.y}
          onChange={handleChange}
          className="w-1/3"
        />
        <div className="flex w-full justify-center">
          <Button isDisabled={isDisabled}>Generate</Button>
        </div>
      </form>
      {result.show && <Result isError={result.error} data={result.data} />}
    </main>
  );
}

export default Main;
