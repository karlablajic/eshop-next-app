'use client';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFetchProducts } from '@/queries/products/queries';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '@/components/Inputs/Input';
import CartTable from './CartTable';
import CartList from './CartList';
import Stepper from '@/components/Stepper';
import clsx from 'clsx';
import { usePostOrder } from '@/queries/orders/mutations';
import Spinner from '@/components/Spinner';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUserData } from '@/store/userSlice';
const Cart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: dataProducts, isLoading: isLoadingProducts } = useFetchProducts();
  const user = useSelector((state) => state.user);

  const OrderSchema = Yup.object().shape({
    name: Yup.string().required('Name is required.'),
    email: Yup.string().required('Description is required.'),
    address: Yup.string().required('Price is required'),
    country: Yup.string().required('Category is required'),
  });

  const CarfInfoSchema = Yup.object().shape({
    card_number: Yup.string()
      .required('Credit card number is required')
      .matches(/^[0-9]+$/, 'Only digits allowed')
      .min(16, 'Must be exactly 16 digits')
      .max(16, 'Must be exactly 16 digits'),
    expiration_date: Yup.string()
      .required('Card expiration date is required')
      .matches(/^[0-9]+$/, 'Only digits allowed')
      .min(4, 'Must be exactly 4 digits')
      .max(4, 'Must be exactly 4 digits'),
    cvv: Yup.string()
      .required('Cvv is required')
      .matches(/^[0-9]+$/, 'Only digits allowed')
      .min(3, 'Must be exactly 3 digits')
      .max(3, 'Must be exactly 3 digits'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      address: '',
      country: '',
      card_number: '',
      expiration_date: '',
      cvv: '',
    },
    validationSchema: OrderSchema,
    validateOnChange: true,
    validateOnMount: true,
  });

  const onPostOrderSuccess = (userData) => {
    dispatch(setUserData(userData.data));
    router.push('/');
    toast.success('Order successfully placed!', { position: 'bottom-left' });
  };
  const onPostOrderError = () => {
    toast.error('Order not sent!', { position: 'bottom-left' });
  };
  const {
    data: dataPostOrder,
    mutate: mutatePostOrder,
    isPending: isPendingPostOrder,
  } = usePostOrder({
    onSuccess: onPostOrderSuccess,
    onError: onPostOrderError,
  });

  const formikCard = useFormik({
    initialValues: {
      card_number: '',
      expiration_date: '',
      cvv: '',
    },
    validationSchema: CarfInfoSchema,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      const { country, address } = formik.values;
      const orderData = {
        userId: user.userData._id,
        cart: user.userData.cart,
        country,
        address,
      };

      mutatePostOrder(orderData);
    },
  });

  if (!user?.userData?.cart?.count) {
    return (
      <div className="flex items-center flex-col text-center w-full gap-[32px]">
        <h2>Shopping cart</h2>
        <div className=" w-full max-w-[500px] py-[24px]  bg-blue-100 border rounded-lg text-blue-500 ">
          Shopping cart is empty. Add products to your cart
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[48px] h-full">
      <h2 className="text-center">Shopping cart</h2>
      <Stepper>
        <Stepper.List>
          <Stepper.ListItem>
            <Stepper.ListItemContent>
              <div className="w-full h-full">
                {!!user?.userData?.cart?.count && (
                  <div className="w-full h-full">
                    <div className="hidden sm:block">
                      <CartTable />
                    </div>
                    <div className=" sm:hidden">
                      <CartList />
                    </div>
                  </div>
                )}
              </div>
            </Stepper.ListItemContent>
            <Stepper.Navigation className="flex flex-col  sm:flex-row  justify-between gap-4 sm:justify-end">
              <Stepper.NavItemForward className="py-[8px] px-[24px] text-sm text-white  bg-blue-500 rounded">
                Checkout
              </Stepper.NavItemForward>
            </Stepper.Navigation>
          </Stepper.ListItem>

          <Stepper.ListItem>
            <Stepper.ListItemContent>
              <div className="flex flex-col items-center w-full h-full gap-8">
                <h2 className="text-center">Shopping cart</h2>
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-full max-w-[350px]">
                  <Input
                    label={'Name'}
                    name="name"
                    id="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={!!(formik.errors.name && formik.touched.name) && formik.errors.name}
                    onBlur={formik.handleBlur}
                  />
                  <Input
                    label={'Email address'}
                    name="email"
                    id="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={!!(formik.errors.email && formik.touched.email) && formik.errors.email}
                    onBlur={formik.handleBlur}
                  />
                  <Input
                    label={'Address'}
                    name="address"
                    id="address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    error={!!(formik.errors.address && formik.touched.address) && formik.errors.address}
                    onBlur={formik.handleBlur}
                  />
                  <Input
                    label={'Country'}
                    name="country"
                    id="country"
                    onChange={formik.handleChange}
                    value={formik.values.country}
                    error={!!(formik.errors.country && formik.touched.country) && formik.errors.country}
                    onBlur={formik.handleBlur}
                  />
                </form>
              </div>
            </Stepper.ListItemContent>
            <Stepper.Navigation className="flex flex-col  sm:flex-row  justify-between gap-4 sm:justify-end">
              <Stepper.NavItemBack className="py-[8px] px-[24px] text-sm text-white  bg-blue-500 rounded">
                Back to Cart
              </Stepper.NavItemBack>
              <Stepper.NavItemForward
                className={clsx('py-[8px] px-[24px] text-sm text-white  bg-blue-500 rounded', {
                  ['bg-gray-200']: !formik.isValid,
                })}
                disabled={!formik.isValid}>
                Payment
              </Stepper.NavItemForward>
            </Stepper.Navigation>
          </Stepper.ListItem>
          <Stepper.ListItem>
            <Stepper.ListItemContent>
              <div className="flex flex-col items-center w-full h-full gap-8">
                <h2 className="text-center">Shopping cart</h2>
                <form onSubmit={formikCard.handleSubmit} className="flex flex-col gap-4 w-full max-w-[350px]">
                  <Input
                    label={'Card number'}
                    name="card_number"
                    id="card_number"
                    onChange={(e) => {
                      const result = e.target.value.replace(/\D/g, '');
                      formikCard.setFieldValue('card_number', result);
                    }}
                    value={formikCard.values.card_number}
                    error={
                      !!(formikCard.errors.card_number && formikCard.touched.card_number) &&
                      formikCard.errors.card_number
                    }
                    onBlur={formikCard.handleBlur}
                    maxLength={16}
                  />
                  <Input
                    label={'Expiration date'}
                    name="expiration_date"
                    id="expiration_date"
                    onChange={(e) => {
                      const result = e.target.value.replace(/\D/g, '');
                      formikCard.setFieldValue('expiration_date', result);
                    }}
                    value={formikCard.values.expiration_date}
                    error={
                      !!(formikCard.errors.expiration_date && formikCard.touched.expiration_date) &&
                      formikCard.errors.expiration_date
                    }
                    onBlur={formikCard.handleBlur}
                    maxLength={4}
                  />
                  <Input
                    label={'CVV'}
                    name="cvv"
                    id="cvv"
                    onChange={(e) => {
                      const result = e.target.value.replace(/\D/g, '');
                      formikCard.setFieldValue('cvv', result);
                    }}
                    value={formikCard.values.cvv}
                    error={!!(formikCard.errors.cvv && formikCard.touched.cvv) && formikCard.errors.cvv}
                    onBlur={formikCard.handleBlur}
                    maxLength={3}
                  />
                </form>
              </div>
            </Stepper.ListItemContent>
            <Stepper.Navigation className="flex flex-col  sm:flex-row  justify-between gap-4 sm:justify-end">
              <Stepper.NavItemBack className="py-[8px] px-[24px] text-sm text-white  bg-blue-500 rounded">
                Back to Info
              </Stepper.NavItemBack>
              <Stepper.NavItemForward
                className={clsx('py-[8px] px-[24px] text-sm text-white  bg-blue-500 rounded', {
                  ['bg-gray-200']: !formikCard.isValid,
                })}
                disabled={!formikCard.isValid}
                onClick={formikCard.handleSubmit}>
                <div className="flex justify-center items-center">
                  {!isPendingPostOrder ? 'Finish order' : <Spinner />}
                </div>
              </Stepper.NavItemForward>
            </Stepper.Navigation>
          </Stepper.ListItem>
        </Stepper.List>
      </Stepper>
    </div>
  );
};

export default Cart;
