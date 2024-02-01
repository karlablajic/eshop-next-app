'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { useFetchProductById } from '@/queries/products/queries';
import { useFormik, FormikProvider } from 'formik';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { usePostImages, useUpdateProduct } from '@/queries/products/mutations';
import toast from 'react-hot-toast';
import ProductForm from '../ProductForm';
import * as Yup from 'yup';

const initialData = {
  name: '',
  description: '',
  price: '',
  category: '',
  images: null,
};

const UpdateProductForm = () => {
  const { slug } = useParams();
  const router = useRouter();

  const { data: dataProduct, isLoading: isLoadingFetchProduct } = useFetchProductById(slug, {
    enabled: !!slug,
    select: (data) => {
      const { data: productData } = data;
      const { product, similar } = productData;
      const { pictures, _v, ...rest } = product;
      return {
        similar,
        product: {
          ...rest,
          images: pictures,
        },
      };
    },
  });

  const onUpdateProductSuccess = () => {
    router.push('/dashboard');
    toast.success('Product successfully updated!', { position: 'bottom-left' });
  };
  const onUpdateProductError = () => {
    toast.error('Unable to update product!', { position: 'bottom-left' });
  };
  const { mutate: mutateUpdateProduct } = useUpdateProduct({
    onSuccess: onUpdateProductSuccess,
    onError: onUpdateProductError,
  });

  const { mutateAsync: mutatePostImages, isError: isErrorPostImages } = usePostImages({});
  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required.'),
    description: Yup.string().required('Description is required.'),
    price: Yup.string().required('Price is required'),
    category: Yup.string().required('Category is required'),
    images: Yup.array().min(1).required('Product images are required.'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...(dataProduct ? { ...dataProduct?.product } : initialData),
    },
    validationSchema: NewProductSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      //   const images = await mutatePostImages(values.images);
      if (!isErrorPostImages)
        mutateUpdateProduct({
          productId: dataProduct?.product._id,
          productData: {
            ...values,
            //   images,
          },
        });
    },
  });

  return (
    <div className="flex h-full  w-full items-center justify-center scroll-p-3">
      <div className="flex  w-full justify-center items-center md:w-1/2 h-[calc(100vh-70px)]">
        <div className="grow h-full flex justify-center overflow-scroll py-[100px]">
          <FormikProvider value={formik}>
            <ProductForm buttonTitle="Update product" formTitle="Update product" />
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

export default UpdateProductForm;
