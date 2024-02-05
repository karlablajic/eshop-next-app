'use client';
import React from 'react';
import OrdersTable from '@/containers/UserOrders';
import withAuth from '@/utils/hoc/withAuth';
const UserOrders = () => {
  return (
    <div>
      <OrdersTable />
    </div>
  );
};

export default withAuth(UserOrders);
