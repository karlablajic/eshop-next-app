import { useMutation } from '@tanstack/react-query';
import { postProduct, deleteProduct, postImages, patchProduct } from '@/api/products';
import { useSelector } from 'react-redux';

export const usePostImages = (options) => {
  return useMutation({
    mutationFn: async (images) => {
      return postImages(images);
    },
    ...options,
  });
};

export const usePostProduct = (options) => {
  return useMutation({
    mutationFn: async (productData) => {
      return postProduct(productData);
    },
    ...options,
  });
};
export const useDeleteProduct = (options) => {
  const user = useSelector((state) => state.user);
  return useMutation({
    mutationFn: async (productId) => {
      return deleteProduct(productId, user.userData._id);
    },
    ...options,
  });
};

export const useUpdateProduct = (options) => {
  return useMutation({
    mutationFn: async ({ productId, productData }) => {
      return patchProduct(productId, productData);
    },
    ...options,
  });
};
