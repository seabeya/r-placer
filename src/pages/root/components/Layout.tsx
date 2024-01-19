function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100svh] items-center justify-center">
      <div className="mx-2 my-16 overflow-hidden px-1 sm:w-[600px]">{children}</div>
    </div>
  );
}

export default Layout;
