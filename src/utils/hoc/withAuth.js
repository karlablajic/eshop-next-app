'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { PROTECTED_ROUTES } from '../constants';

const withAuth = (Component) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const { isAdmin, isLoggedIn } = useSelector((state) => state.user);
    const pathname = usePathname();
    const [isAuth, setIsAuth] = useState(false);
    const [protectedRoute, setProtectedRoute] = useState(false);

    useEffect(() => {
      const route = PROTECTED_ROUTES.find((route) => route.path === pathname);
      if (!route) {
        setProtectedRoute(false);
        return;
      }
      setProtectedRoute(true);
      if (!isLoggedIn) {
        router.push('/');
      } else if (isLoggedIn && isAdmin && !route.admin) {
        router.push('/');
      } else if (isLoggedIn && !isAdmin && route.admin) {
        router.push('/');
      } else setIsAuth(true);
    }, [isAdmin, isLoggedIn, pathname]);

    return (!protectedRoute || (protectedRoute && isAuth)) && <Component />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
