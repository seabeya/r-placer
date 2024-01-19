import Input from '@root/components/parts/Input.tsx';
import Button from '@root/components/parts/Button.tsx';
import Result from '@root/components/Result.tsx';

function Main() {
  return (
    <main className="mt-12 sm:mt-14">
      <form className="flex flex-wrap justify-center gap-6">
        <Input
          name="url"
          type="url"
          placeholder="Enter an image URL"
          value=""
          onChange={() => {
            console.log('changed URL');
          }}
          className="w-full"
        />
        <Input
          name="number"
          type="x"
          placeholder="Starting X"
          value=""
          onChange={() => {
            console.log('changed X');
          }}
          className="w-1/3"
        />
        <Input
          name="number"
          type="x"
          placeholder="Starting Y"
          value=""
          onChange={() => {
            console.log('changed Y');
          }}
          className="w-1/3"
        />
        <div className="flex w-full justify-center">
          <Button isDisabled={false}>Generate</Button>
        </div>
      </form>
      {true && <Result isError={true} data="Result Data" />}
    </main>
  );
}

export default Main;
