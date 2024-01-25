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

const SignInForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

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
  } = useLogin({
    onSuccess: onLoginSuccess,
    onError: onLoginError,
  });

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required.'),
    password: Yup.string().required('Password is required'),
  });
  const formik = useFormik({
    validateOnMount: true,
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
    <div className="flex h-full grow w-full items-center justify-center ">
      <form className="flex grow flex-col gap-4 max-w-[350px]" onSubmit={formik.handleSubmit}>
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
        <Button label={'Log in'} type="submit" />
        <span className="text-xs text-gray-500 text-center">
          You don't have account?{' '}
          <span className="text-blue-500 ">
            <Link href={'/auth/signup'}>Signup here.</Link>
          </span>
        </span>
      </form>
    </div>
  );
};

export default SignInForm;
