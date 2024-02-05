'use client';
import React from 'react';
import Cart from '@/containers/Cart';
import withAuth from '@/utils/hoc/withAuth';

const CartPage = () => {
  return <Cart />;
};

export default withAuth(CartPage);
