import { JWT } from 'next-auth/jwt';
import { User } from 'next-auth';
import type { UserRole } from '@/db/schema/user';

declare module 'next-auth' {
  interface User {
    role?: UserRole;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: UserRole;
  }
}
