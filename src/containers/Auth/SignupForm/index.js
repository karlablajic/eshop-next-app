'use client';
import React from 'react';
import Input from '@/components/Inputs/Input';
import Button from '@/components/Buttons/Button';
import { useSignup } from '../queries/mutations';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { removeUser, setUser } from '@/store/userSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SignUpForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onSignupSuccess = (data) => {
    dispatch(setUser(data.data));
    router.push('/');
  };

  const onSignupError = () => {
    dispatch(removeUser());
  };

  const {
    error: errorSignup,
    mutate: mutateSignup,
    isError: isErrorSignup,
  } = useSignup({
    onSuccess: onSignupSuccess,
    onError: onSignupError,
  });

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required.'),
    email: Yup.string().required('Email is required.'),
    password: Yup.string().required('Password is required'),
  });
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      mutateSignup(values);
    },
  });

  return (
    <div className="flex h-full grow w-full items-center justify-center ">
      <div className="flex w-full justify-center md:w-1/2">
        <form className="flex grow flex-col gap-4 max-w-[350px]" onSubmit={formik.handleSubmit}>
          <h2 className="text-center">Create an account</h2>
          <Input
            label={'Name'}
            name="name"
            id="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
          />
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
          {isErrorSignup && <span className="text-center ">{errorSignup?.response?.data}</span>}
          <Button label={'Sign up'} type="submit" />
        </form>
      </div>
      <div className="w-1/2 bg-red-100 h-full pt-[70px] relative grow hidden md:block">
        <Image
          src={
            'https://images.unsplash.com/photo-1612690669207-fed642192c40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dGVjaHxlbnwwfDF8MHx3aGl0ZXw%3D&auto=format&fit=crop&w=800&q=60'
          }
          fill={true}
          className="absolute right-0 top-0 w-full h-full object-cover"
          alt="login-img"
        />
      </div>
    </div>
  );
};

export default SignUpForm;
