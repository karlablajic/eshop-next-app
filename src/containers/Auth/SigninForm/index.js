'use client';
import React from 'react';
import Input from '@/components/Inputs/Input';
import Button from '@/components/Buttons/Button';
import Link from 'next/link';
import { useLogin } from '../queries/mutations';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { removeUser, setUser } from '@/store/userSlice';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SignInForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onLoginSuccess = (data) => {
    dispatch(setUser(data.data));
    router.push('/');
  };

  const onLoginError = () => {
    dispatch(removeUser());
  };

  const {
    error: loginError,
    mutate,
    isError: isErrorLogin,
    isPending: isPendingLogin,
  } = useLogin({
    onSuccess: onLoginSuccess,
    onError: onLoginError,
  });

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required.'),
    password: Yup.string().required('Password is required'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <div className="flex h-full w-full items-center justify-center ">
      <div className=" flex justify-center w-1/2">
        <form className="flex grow flex-col gap-4 max-w-[350px] " onSubmit={formik.handleSubmit}>
          <h2 className="text-center">Login to your account</h2>
          <Input
            label={'Email address'}
            name="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
          />
          <Input
            label={'Password'}
            type={'password'}
            name="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
          />
          {isErrorLogin && <span className="text-center text-red-500">{loginError?.response?.data}</span>}
          <Button label={'Log in'} type="submit" loading={isPendingLogin} />
          <span className="text-xs text-gray-500 text-center">
            You don't have account?{' '}
            <span className="text-blue-500 ">
              <Link href={'/auth/signup'}>Signup here.</Link>
            </span>
          </span>
        </form>
      </div>
      <div className="w-1/2 bg-red-100 h-full pt-[70px] relative grow hidden md:block">
        <Image
          src={
            'https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
          }
          fill={true}
          className="absolute right-0 top-0 w-full h-full object-cover"
          alt="login-img"
        />
      </div>
    </div>
  );
};

export default SignInForm;
