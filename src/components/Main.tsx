import { ChangeEvent, FormEvent, useState } from 'react';

import Input from './sub/Input.tsx';
import Result from './sub/Result.tsx';

export default function Main() {
  const [details, setDetails] = useState({
    url: '',
    x: '',
    y: '',
  });

  const [result, setResult] = useState({
    show: false,
    success: false,
    data: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setDetails((prev) => {
      return { ...prev, [name]: value };
    });

    // Reset result:
    setResult({
      show: false,
      success: false,
      data: '',
    });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setButtonDisabled(true);

    // Checking image url:
    const img = new Image();
    img.src = details.url;

    // Valid image:
    img.onload = () => {
      const link = new URL('https://r-placer.seabeya.com/workspace/');
      link.searchParams.append('url', details.url);
      link.searchParams.append('x', details.x);
      link.searchParams.append('y', details.y);

      setResult({
        show: true,
        success: true,
        data: link.toString(),
      });

      setButtonDisabled(false);
    };

    // Invalid image:
    img.onerror = () => {
      setResult({
        show: true,
        success: false,
        data: 'Please enter a valid image URL.',
      });

      setButtonDisabled(false);
    };
  };

  return (
    <main className="mt-10 flex flex-col items-center sm:mt-12 xl:mt-14">
      <form
        onSubmit={onSubmit}
        className="flex flex-wrap justify-around gap-4 sm:gap-6"
      >
        <Input
          name="url"
          type="text"
          placeholder="Enter an image URL"
          value={details.url}
          onChange={handleChange}
          className="w-full max-w-lg rounded-lg border-2 px-2 py-1 sm:max-w-lg sm:px-3 xl:max-w-none xl:px-4"
        />
        <Input
          name="x"
          type="number"
          placeholder="Starting X"
          value={details.x}
          onChange={handleChange}
          className="w-1/3 border-b-2 px-1 sm:w-1/4 xl:w-1/5"
        />
        <Input
          name="y"
          type="number"
          placeholder="Starting Y"
          value={details.y}
          onChange={handleChange}
          className="w-1/3 border-b-2 px-1 sm:w-1/4 xl:w-1/5"
        />
        <div className="mt-2 w-full text-center sm:mt-3">
          <button
            type="submit"
            disabled={buttonDisabled}
            className="rounded-md bg-[#FF4500] px-7 py-1 text-sm font-medium text-white hover:bg-[#e23c00] sm:text-base xl:text-lg"
          >
            Generate
          </button>
        </div>
      </form>
      {result.show && <Result data={result.data} success={result.success} />}
    </main>
  );
}
