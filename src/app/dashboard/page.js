'use client';
import React from 'react';
import DashboardContainer from '@/containers/Dashboard';
import withAuth from '@/utils/hoc/withAuth';

const Dashboard = () => {
  return <DashboardContainer />;
};

export default withAuth(Dashboard);
