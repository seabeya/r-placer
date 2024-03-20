import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-[#0D1117]">
      <div className="mx-2 my-16 w-full overflow-hidden sm:w-[600px]">
        <Header />
        <main className="bg-white">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
