import Footer from './components/Footer.tsx';
import Head from './components/Head.tsx';
import Main from './components/Main.tsx';

function App() {
  return (
    <div className="flex min-h-[100svh] items-center justify-center">
      <div className="mx-3 my-16 w-full overflow-hidden sm:w-[600px]">
        <Head />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
