import { ChangeEvent, FormEvent, useState } from 'react';

import Input from '@p/root/components/sub/Input.tsx';
import Button from '@p/root/components/sub/Button.tsx';
import Result from '@p/root/components/sub/Result.tsx';

import { buildWorkspaceUrl, validateImage } from '@p/root/utils/utils.ts';
import { checkInputs } from '@global/utils.ts';

export default function Main() {
  // General Details:
  const [details, setDetails] = useState({
    url: '',
    x: '',
    y: ''
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
    data: ''
  });

  // Form Submission:
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if inputs are valid:
    const checkResult = checkInputs(details.url, details.x, details.y);
    if (checkResult.status === false) {
      setResult({ show: true, success: false, data: checkResult.message });
      return;
    }

    setIsButtonDisabled(true);

    try {
      await validateImage(details.url);

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
      <form onSubmit={handleSubmit} className="flex flex-wrap justify-center gap-6">
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
