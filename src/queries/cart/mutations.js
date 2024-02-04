import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { addProductToCart, increaseProductAmount, decreaseProductAmount, deleteProductFromCart } from '@/api/cart';

export const useAddProductToCart = (options) => {
  const user = useSelector((state) => state.user);
  return useMutation({
    mutationFn: async (productData) => {
      return addProductToCart({ userId: user.userData._id, ...productData });
    },
    ...options,
  });
};

export const useIncreaseProductQuantity = (options) => {
  const user = useSelector((state) => state.user);
  return useMutation({
    mutationFn: async (productData) => {
      return increaseProductAmount({ userId: user.userData._id, ...productData });
    },
    ...options,
  });
};

export const useDecreaseProductQuantity = (options) => {
  const user = useSelector((state) => state.user);
  return useMutation({
    mutationFn: async (productData) => {
      return decreaseProductAmount({ userId: user.userData._id, ...productData });
    },
    ...options,
  });
};

export const useDeleteProductFromCart = (options) => {
  const user = useSelector((state) => state.user);
  return useMutation({
    mutationFn: async (productData) => {
      return deleteProductFromCart({ userId: user.userData._id, ...productData });
    },
    ...options,
  });
};
