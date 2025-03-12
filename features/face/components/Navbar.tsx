import { auth } from '@/services/auth';
import { NavbarNav } from './NavbarNav';
import { UserButton } from './UserButton';

export const Navbar = async () => {
  const session = await auth()
  return (
    <header className="h-15 shadow-md">
      <div className="container flex justify-between items-center">
        <h2>Logo</h2>
        <div className="flex items-center gap-x-4">
          <NavbarNav />
          <UserButton session={session} />
        </div>
      </div>
    </header>
  );
};
