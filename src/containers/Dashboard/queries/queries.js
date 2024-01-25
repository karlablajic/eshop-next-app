import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/api/products';

export const useFetchProducts = (options) => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    ...options,
  });
};
