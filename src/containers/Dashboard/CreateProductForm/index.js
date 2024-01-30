'use client';
import React, { useState, useEffect } from 'react';
import Input from '@/components/Inputs/Input';
import Button from '@/components/Buttons/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Textarea from '@/components/Inputs/Textarea';
import FileInput from '@/components/Inputs/FileInput';
import uuid from 'react-uuid';
import { FaTrash } from 'react-icons/fa';
import { usePostProduct, usePostImages } from '../queries/mutations';
import toast from 'react-hot-toast';

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

const CreateProductForm = () => {
  const router = useRouter();
  const onPostProductSuccess = () => {
    router.back();
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

  const [imageFiles, setImageFiles] = useState([]);
  const [imagesUrl, setImagesUrl] = useState([]);
  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required.'),
    description: Yup.string().required('Description is required.'),
    price: Yup.string().required('Price is required'),
    category: Yup.string().required('Category is required'),
    pictures: Yup.array().min(1).required('Product pictures are required.'),
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      category: '',
      pictures: null,
    },
    validationSchema: NewProductSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const images = await mutatePostImages(imagesUrl);
      if (!isErrorPostImages)
        mutatePostProduct({
          ...values,
          images,
        });
    },
  });

  const changeHandler = (e) => {
    const { files } = e.target;
    const validImageFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.match(imageTypeRegex)) {
        validImageFiles.push({
          id: uuid(),
          file: file,
        });
      }
    }

    if (validImageFiles.length) {
      setImageFiles(validImageFiles);
      return;
    }
  };

  useEffect(() => {
    if (imageFiles.length) {
      const urls = imageFiles.map((image) => {
        return {
          ...image,
          url: URL.createObjectURL(image.file),
        };
      });
      setImagesUrl(urls);

      formik.setFieldValue(
        'pictures',
        urls.map((image) => image.file),
      );
    }
  }, [imageFiles]);

  const onImageDelete = (imageId) => {
    const filteredImages = imagesUrl.filter((image) => image.id !== imageId);
    setImagesUrl(filteredImages);
    formik.setFieldValue('pictures', filteredImages);
  };

  return (
    <div className="flex h-full  w-full items-center justify-center scroll-p-3">
      <div className="flex  w-full justify-center items-center md:w-1/2  h-full h-[calc(100vh-70px)]">
        <div className="grow h-full flex justify-center overflow-scroll py-[100px]">
          <form className="relative flex w-full flex-col gap-4 max-w-[350px] " onSubmit={formik.handleSubmit}>
            <h2 className="text-center">Create a product</h2>
            <Input
              label={'Name'}
              name="name"
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.errors.name}
            />
            <Textarea
              label={'Description'}
              name="description"
              id="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              error={formik.errors.description}
            />
            <Input
              label={'Price'}
              name="price"
              id="price"
              onChange={formik.handleChange}
              value={formik.values.price}
              error={formik.errors.price}
            />
            <Input
              label={'Category'}
              name="category"
              id="category"
              onChange={formik.handleChange}
              value={formik.values.category}
              error={formik.errors.category}
            />
            <FileInput
              label="Add pictures"
              name="pictures"
              className="min-w-[150px] bg-[#3B82F6] self-start text-sm"
              accept="image/png, image/jpeg"
              multiple
              onChange={changeHandler}
              error={formik.errors.pictures}
            />
            <div className="w-full  flex max-w-[350px] ">
              {imagesUrl.length > 0 ? (
                <ul className="flex gap-4  flex-wrap place-content-between">
                  {imagesUrl.map((image) => {
                    return (
                      <li key={image.id} className="relative group rounded">
                        <Image
                          src={image.url}
                          alt={'product image ' + image.url}
                          width={140}
                          height={140}
                          unoptimized={true}
                          className=" h-[140px] w-[140px] object-cover relative rounded-lg group-hover:blur-[2px]	animate-blur duration-300	ease-linear"
                        />

                        <div className="flex justify-center items-center gap-2 absolute m-auto left-0 right-0 top-0 bottom-0  opacity-0 group-hover:opacity-100 animate-opacity duration-300	ease-linear">
                          <button
                            className="flex justify-center items-center gap-2 border  rounded-lg px-2 py-1"
                            onClick={() => {
                              onImageDelete(image.id);
                            }}>
                            <FaTrash size={14} color={'white'} />
                            <span className="text-white text-[12px]">Remove</span>
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
            <Button
              label={'Create a product'}
              type="submit"
              className="mt-[30px] mb-[100px]"
              loading={isPendingPostProduct || isPendingPostImages}
            />
            <div className="relative w-full bg-red-100">
              <div className="absolute bottom-0 h-[100px] w-full"></div>
            </div>
          </form>
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
