function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100svh] items-center justify-center">
      <div className="mx-3 my-16 overflow-hidden sm:w-[600px]">{children}</div>
    </div>
  );
}

export default Layout;
