import axiosInstance from './axios';

export const postOrder = (orderData) => {
  return axiosInstance.post('orders', orderData);
};
