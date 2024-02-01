'use client';
import React from 'react';

import { useFormik, FormikProvider } from 'formik';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { usePostProduct, usePostImages } from '@/queries/products/mutations';
import toast from 'react-hot-toast';
import ProductForm from '../ProductForm';
import * as Yup from 'yup';

const CreateProductForm = () => {
  const router = useRouter();

  const onPostProductSuccess = () => {
    router.push('/dashboard');
    toast.success('Product successfully created!', { position: 'bottom-left' });
  };
  const onPostProductError = () => {
    toast.error('Unable to create product!', { position: 'bottom-left' });
  };
  const { mutate: mutatePostProduct, isPending: isPendingPostProduct } = usePostProduct({
    onSuccess: onPostProductSuccess,
    onError: onPostProductError,
  });

  const {
    mutateAsync: mutatePostImages,
    isError: isErrorPostImages,
    isPending: isPendingPostImages,
  } = usePostImages({});

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required.'),
    description: Yup.string().required('Description is required.'),
    price: Yup.string().required('Price is required'),
    category: Yup.string().required('Category is required'),
    images: Yup.array().min(1).required('Product images are required.'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      category: '',
      images: null,
    },
    validationSchema: NewProductSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const images = await mutatePostImages(values.images);
      if (!isErrorPostImages)
        mutatePostProduct({
          ...values,
          images,
        });
    },
  });
  return (
    <div className="flex h-full  w-full items-center justify-center scroll-p-3">
      <div className="flex  w-full justify-center items-center md:w-1/2 h-[calc(100vh-70px)]">
        <div className="grow h-full flex justify-center overflow-scroll py-[100px]">
          <FormikProvider value={formik}>
            <ProductForm buttonTitle="Create product" formTitle="Create product" />
          </FormikProvider>
        </div>
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

export default CreateProductForm;
