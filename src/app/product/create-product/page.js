'use client';
import CreateProductForm from '@/containers/Dashboard/Product/CreateProductForm';
import withAuth from '@/utils/hoc/withAuth';

const CreateProduct = () => {
  return <CreateProductForm />;
};

export default withAuth(CreateProduct);
