import { useMutation } from '@tanstack/react-query';
import { postOrder, markAsShippedOrder } from '@/api/orders';

export const usePostOrder = (options) => {
  return useMutation({
    mutationFn: async (orderData) => {
      return postOrder(orderData);
    },
    ...options,
  });
};

export const useMarkOrderShipped = (options) => {
  return useMutation({
    mutationFn: async (orderData) => {
      return markAsShippedOrder(orderData);
    },
    ...options,
  });
};
