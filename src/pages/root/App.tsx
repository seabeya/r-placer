import Footer from '@p/root/components/Footer.tsx';
import Head from '@p/root/components/Head.tsx';
import Main from '@p/root/components/Main.tsx';

function App() {
  return (
    <div className="flex min-h-[100svh] items-center justify-center">
      <div className="mx-3 my-16 overflow-hidden sm:w-[600px]">
        <Head />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
