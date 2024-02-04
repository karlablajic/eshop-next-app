import { useMutation } from '@tanstack/react-query';
import { postOrder } from '@/api/orders';

export const usePostOrder = (options) => {
  return useMutation({
    mutationFn: async (orderData) => {
      return postOrder(orderData);
    },
    ...options,
  });
};
