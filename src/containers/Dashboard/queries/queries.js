import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProduct } from '@/api/products';
import { fetchClients } from '@/api/clients';
export const useFetchProducts = (options) => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    ...options,
  });
};

export const useFetchProductById = (productId, options) => {
  return useQuery({
    queryKey: [`product/${productId}`],
    queryFn: () => fetchProduct(productId),
    ...options,
  });
};

export const useFetchUsers = (options) => {
  return useQuery({
    queryKey: [`clients`],
    queryFn: () => fetchClients(),
    ...options,
  });
};
