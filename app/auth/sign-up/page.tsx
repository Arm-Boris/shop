import Link from 'next/link';
import { X } from 'lucide-react';
import { SignupForm } from '@/features/auth/components/SignUpForm';

const SignupPage = async () => {
  return (
    <div className="w-[400px] p-4 bg-white rounded-md relative shadow-md">
      <div className="relative mb-6">
        <h3 className="text-center text-xl text-slate-700">Регистрация</h3>
        <Link href="/" className="absolute top-0 end-0 link-icon">
          <X className="text-slate-600" />
        </Link>
      </div>
      <SignupForm />
      <Link className="w-full mt-3 block text-sm text-center text-muted-foreground hover:underline" href={'/auth/sign-in'}>
        Есть аккаунт? Войти
      </Link>
    </div>
  );
};

export default SignupPage;
