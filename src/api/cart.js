import axiosInstance from './axios';

export const addProductToCart = (productData) => {
  return axiosInstance.post('products/add-to-cart', productData);
};

export const increaseProductAmount = (productData) => {
  return axiosInstance.post('products/increase-cart', productData);
};

export const decreaseProductAmount = (productData) => {
  return axiosInstance.post('products/decrease-cart', productData);
};

export const deleteProductFromCart = (productData) => {
  return axiosInstance.post('products/remove-from-cart', productData);
};
