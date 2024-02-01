import { useMutation } from '@tanstack/react-query';
import { userLogin, userSignup } from '@/api/auth';

export const useLogin = (options) => {
  return useMutation({
    mutationFn: async (loginData) => {
      return userLogin(loginData);
    },
    ...options,
  });
};
export const useSignup = (options) => {
  return useMutation({
    mutationFn: async (signupData) => {
      return userSignup(signupData);
    },
    ...options,
  });
};
