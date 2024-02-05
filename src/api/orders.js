import axiosInstance from './axios';

export const postOrder = (orderData) => {
  return axiosInstance.post('orders', orderData);
};

export const fetchOrders = () => {
  return axiosInstance.get('orders');
};

export const markAsShippedOrder = (orderData) => {
  const { id, ownerId } = orderData;
  return axiosInstance.patch(`orders/${id}/mark-shipped`, { ownerId });
};

export const fetchUsersOrders = (userId) => {
  return axiosInstance.get(`users/${userId}/orders`);
};
