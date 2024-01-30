'use client';
import React, { useState, useEffect } from 'react';
import Input from '@/components/Inputs/Input';
import Button from '@/components/Buttons/Button';
import { useFormikContext } from 'formik';
import Image from 'next/image';
import Textarea from '@/components/Inputs/Textarea';
import FileInput from '@/components/Inputs/FileInput';
import uuid from 'react-uuid';
import { FaTrash } from 'react-icons/fa';

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

const ProductForm = ({ buttonTitle = '', formTitle = '' }) => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imagesUrl, setImagesUrl] = useState([]);

  const form = useFormikContext();

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

      form.setFieldValue('images', urls);
    }
  }, [imageFiles]);

  const onImageDelete = (imageId) => {
    const filteredImages = imagesUrl.filter((image) => image.id !== imageId);
    setImagesUrl(filteredImages);
    form.setFieldValue('images', filteredImages);
  };

  return (
    <form className="relative flex w-full flex-col gap-4 max-w-[350px] " onSubmit={form.handleSubmit}>
      <h2 className="text-center">{formTitle}</h2>
      <Input
        label={'Name'}
        name="name"
        id="name"
        onChange={form.handleChange}
        value={form.values.name}
        error={form.errors.name}
      />
      <Textarea
        label={'Description'}
        name="description"
        id="description"
        onChange={form.handleChange}
        value={form.values.description}
        error={form.errors.description}
      />
      <Input
        label={'Price'}
        name="price"
        id="price"
        onChange={form.handleChange}
        value={form.values.price}
        error={form.errors.price}
      />
      <Input
        label={'Category'}
        name="category"
        id="category"
        onChange={form.handleChange}
        value={form.values.category}
        error={form.errors.category}
      />
      <FileInput
        label="Add images"
        name="images"
        className="min-w-[150px] bg-[#3B82F6] self-start text-sm"
        accept="image/png, image/jpeg"
        multiple
        onChange={changeHandler}
        error={form.errors.images}
      />
      <div className="w-full  flex max-w-[350px] ">
        {form.values.images?.length > 0 ? (
          <ul className="flex gap-4  flex-wrap place-content-between">
            {form.values.images.map((image, index) => {
              return (
                <li key={index} className="relative group rounded">
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
      <Button label={buttonTitle} type="submit" className="mt-[30px] mb-[100px]" loading={form.isSubmitting} />
      <div className="relative w-full bg-red-100">
        <div className="absolute bottom-0 h-[100px] w-full"></div>
      </div>
    </form>
  );
};

export default ProductForm;
