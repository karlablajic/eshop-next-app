'use client';
import UpdateProductForm from '@/containers/Dashboard/Product/UpdateProductForm';
import withAuth from '@/utils/hoc/withAuth';

const Page = () => {
  return <UpdateProductForm />;
};

export default withAuth(Page);
