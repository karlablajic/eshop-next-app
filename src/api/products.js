import axiosInstance from './axios';

export const fetchProducts = () => {
  return axiosInstance.get('products');
};

export const postProduct = (productData) => {
  return axiosInstance.post('products', productData);
};

export const deleteProduct = (productId, userId) => {
  return axiosInstance.delete(`products/${productId}`, { data: { user_id: userId } });
};

export const patchProduct = (productId) => {
  return axiosInstance.patch('products', productId);
};
