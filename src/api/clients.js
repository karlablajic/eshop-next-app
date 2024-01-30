import axiosInstance from './axios';

export const fetchClients = () => {
  return axiosInstance.get('users');
};
