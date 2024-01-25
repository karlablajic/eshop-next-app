import axiosInstance from './axios';

export const userLogin = (loginData) => {
  return axiosInstance.post('users/login', loginData);
};
export const userSignup = (signupData) => {
  return axiosInstance.post('users/signup', signupData);
};
