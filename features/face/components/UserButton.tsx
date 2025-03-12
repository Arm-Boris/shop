'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';
import { User } from 'lucide-react';
import { ButtonDropMenu } from './ButtonDropMenu';
import { Session } from 'next-auth';
import { Separator } from '@/components/ui/separator';

export const UserButton = ({ session }: { session: Session | null }) => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsVisible(true)}
        className="h-8 w-8 grid place-content-center rounded-full border border-face-border text-face-border
         hover:border-slate-500 hover:text-slate-500 transition-colors cursor-pointer relative"
      >
        <User size={22} />
      </button>
      {buttonRef.current && (
        <ButtonDropMenu isVisible={isVisible} removeMenu={() => setIsVisible(false)} buttonRef={buttonRef.current}>
          <ul className="text-xl">
            {session ? (
              <>
                <li className="p-1.5">
                {session.user?.name}
                </li>
               <Separator />
                <li className="drop-menu-li">
                 <button onClick={() => signOut()}>Выход</button>
                </li>
              </>
            ) : (
              <>
                <li className="drop-menu-li">
                  <button onClick={() => signIn()}>Вход</button>
                </li>
                <li className="drop-menu-li">
                  <Link href="/auth/sign-up">Регистрация</Link>
                </li>
              </>
            )}
          </ul>
        </ButtonDropMenu>
      )}
    </>
  );
};
