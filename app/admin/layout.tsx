const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr] grid-rows-[70px_1fr]">
        <h1>Sidebar</h1>
        <h1>Navbar</h1>
      <main className="p-6 overflow-y-auto overflow-x-hidden">{children}</main>
    </div>
  );
};

export default AdminLayout;
