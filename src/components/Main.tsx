import { ChangeEvent, FormEvent, useState } from 'react';

import Input from './sub/Input.tsx';
import Button from './sub/Button.tsx';
import Result from './sub/Result.tsx';

import {
  buildWorkspaceUrl,
  validateCoordinates,
  validateImage,
} from '../utils/utils.ts';

export default function Main() {
  // General Details:
  const [details, setDetails] = useState({
    url: '',
    x: '',
    y: '',
  });

  // Inputs:
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // Generate Button:
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Result:
  const [result, setResult] = useState<{
    show: boolean;
    success: boolean;
    data: string;
  }>({
    show: false,
    success: false,
    data: '',
  });

  // Form Submission:
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsButtonDisabled(true);

    try {
      await validateImage(details.url);
      await validateCoordinates(details.x, details.y);

      const workspaceUrl = buildWorkspaceUrl(details.url, details.x, details.y);
      setResult({ show: true, success: true, data: workspaceUrl });

      setIsButtonDisabled(false);
    } catch (error) {
      setResult({ show: true, success: false, data: error as string });

      setIsButtonDisabled(false);
    }
  };

  return (
    <main className="mt-12 p-1 sm:mt-14">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap justify-center gap-6"
      >
        <Input
          name="url"
          type="url"
          placeholder="Enter an image URL"
          value={details.url}
          onChange={handleChange}
          className="w-full"
        />
        <Input
          name="x"
          type="number"
          placeholder="Starting X"
          value={details.x}
          onChange={handleChange}
          className="w-1/3"
        />
        <Input
          name="y"
          type="number"
          placeholder="Starting Y"
          value={details.y}
          onChange={handleChange}
          className="w-1/3"
        />
        <div className="mt-2 flex w-full justify-center">
          <Button isDisabled={isButtonDisabled} label="Generate" />
        </div>
      </form>
      {result.show && <Result success={result.success} data={result.data} />}
    </main>
  );
}
