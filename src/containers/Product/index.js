'use client';
import React, { use } from 'react';
import { useParams } from 'next/navigation';
import { useFetchProductById } from '@/queries/products/queries';
import Carousel from '@/components/Carousel';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/Buttons/Button';
import ProductsList from '@/components/ProductsList';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useAddProductToCart } from '@/queries/cart/mutations';
import { toast } from 'react-hot-toast';
import LoadingScreen from '@/components/LoadingScreen';
import { useDispatch } from 'react-redux';
import { setUserData } from '@/store/userSlice';

const ProductDetails = () => {
  const { slug } = useParams();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { data: dataProduct, isLoading: isLoadingFetchProduct } = useFetchProductById(slug, {
    enabled: !!slug,
    select: (data) => {
      const { data: productData } = data;
      const { product, similar } = productData;
      const { pictures, _v, ...rest } = product;
      return {
        similar,
        product,
      };
    },
  });

  const onAddToCartSuccess = ({ data }) => {
    dispatch(setUserData(data));
    toast.success('Product successfully added to cart!', { position: 'bottom-left' });
  };
  const onAddToCartError = () => {
    toast.success('Unable to add product to cart!', { position: 'bottom-left' });
  };

  const { mutate: mutateAddToCart, isPending: isPendingAddToCart } = useAddProductToCart({
    onSuccess: onAddToCartSuccess,
    onError: onAddToCartError,
  });

  const AddToCartSchema = Yup.object().shape({
    quantity: Yup.number().required('Email is required.'),
  });
  const formik = useFormik({
    initialValues: {
      quantity: 1,
    },
    validationSchema: AddToCartSchema,
    onSubmit: (values) => {
      mutateAddToCart({
        productId: dataProduct.product._id,
        price: dataProduct.product.price,
      });
    },
  });

  if (isLoadingFetchProduct) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-[1248px] mx-auto px-[24px] pt-[50px] ">
      {!isLoadingFetchProduct && (
        <div className="h-full w-full flex flex-col gap-[40px]">
          <div className="flex flex-col md:flex-row w-full">
            <div className="flex justify-center grow md:w-1/2">
              <Carousel slides={dataProduct.product.pictures} />
            </div>
            <div className="flex flex-col  gap-[32px] w-full  md:w-1/2 justify-center">
              <div className="flex flex-col gap-2 items-center">
                <h2>{dataProduct.product.name}</h2>
                <div className="text-xs font-bold px-[9px] py-[4px] bg-blue-500 w-min rounded-2xl">
                  <span>{dataProduct.product.category}</span>
                </div>
                <span>${dataProduct.product.price}</span>
              </div>

              {!user.isAdmin && user.isLoggedIn && (
                <form className="flex gap-4 w-full justify-center" onSubmit={formik.handleSubmit}>
                  <select
                    onChange={(e) => {
                      formik.setFieldValue('qauntity', e.target.value);
                    }}
                    className="max-w-[150px]">
                    {[...Array(10).keys()].map((number) => (
                      <option value={number} key={number}>
                        {number + 1}
                      </option>
                    ))}
                  </select>
                  <Button label="Add to cart" className="w-full max-w-[200px]" loading={isPendingAddToCart} />
                </form>
              )}
              {user.isAdmin && user.isLoggedIn && (
                <div className="flex gap-4 w-full justify-center">
                  <Link href={`/product/update-product/${dataProduct.product._id}`}>
                    <Button label="Edit product" />
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div>
            <p className="font-bold">
              Description:<span className="pl-[8px] font-normal">{dataProduct.product.description}</span>
            </p>
          </div>
          <div>
            <h2 className="text-center">Similiar products</h2>
            <ProductsList products={dataProduct.similar} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
