import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProduct, fetchProductsByCategory } from '@/api/products';

export const useFetchProductsByCategory = (category, options) => {
  return useQuery({
    queryKey: [`products-category-${category}`],
    queryFn: () => fetchProductsByCategory(category),
    select: (data) => {
      return data.data;
    },
    ...options,
  });
};

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
