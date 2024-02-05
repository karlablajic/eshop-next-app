import { useQuery } from '@tanstack/react-query';
import { fetchOrders, fetchUsersOrders } from '@/api/orders';
import { useSelector } from 'react-redux';

export const useFetchOrders = (options) => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    ...options,
  });
};

export const useFetchUsersOrders = (options) => {
  const { userData } = useSelector((state) => state.user);
  return useQuery({
    queryKey: ['orders-user'],
    queryFn: async () => fetchUsersOrders(userData._id),
    enabled: !!userData?._id,
    ...options,
  });
};
