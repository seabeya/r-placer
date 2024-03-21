import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-[#0D1117]">
      <div className="mx-2 my-16 w-full overflow-hidden px-1 sm:w-[600px]">
        <Header />
        <main className="mb-5 mt-12 sm:mt-14">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
