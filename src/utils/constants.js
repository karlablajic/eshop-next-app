export const PROTECTED_ROUTES = [
  {
    path: '/cart',
    admin: false,
  },
  {
    path: '/dashboard',
    admin: true,
  },
  {
    path: '/product/create-product',
    admin: true,
  },
  {
    path: '/product/update-product',
    admin: true,
  },
  {
    path: '/user-orders',
    admin: false,
  },
];
