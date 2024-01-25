'use client';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import NavDropdown from './NavDropdown';
import { useRouter } from 'next/navigation';
import Button from '@/components/Buttons/Button';

const Header = () => {
  const { isLoggedIn, userData } = useSelector((state) => state.user);
  const router = useRouter();
  return (
    <nav className="flex grow justify-between">
      <Link href={'/'}>Tech shop</Link>
      {isLoggedIn ? (
        <NavDropdown />
      ) : (
        <Button
          label={'Signin'}
          onClick={() => {
            router.push('/auth/signin');
          }}
        />
      )}
    </nav>
  );
};

export default Header;
