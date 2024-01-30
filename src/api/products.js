import axios from 'axios';
import axiosInstance from './axios';

export const fetchProducts = () => {
  return axiosInstance.get('products');
};
export const fetchProduct = (id) => {
  return axiosInstance.get(`products/${id}`);
};

export const postProduct = (productData) => {
  return axiosInstance.post('products', productData);
};

export const deleteProduct = (productId, userId) => {
  return axiosInstance.delete(`products/${productId}`, { data: { user_id: userId } });
};

export const patchProduct = (productId, productData) => {
  return axiosInstance.patch(`products/${productId}`, productData);
};

export const postImages = async (images) => {
  const requests = images.map((image) => {
    let formData = new FormData();
    formData.append('file', image.file);
    formData.append('upload_preset', 'klqcoz77');
    return axios.post('https://api.cloudinary.com/v1_1/dxopypyfp/image/upload', formData);
  });

  let data = [];
  const responses = await axios.all(requests);
  responses.forEach((resp) => {
    data.push(resp.data);
  });

  return data;
};
