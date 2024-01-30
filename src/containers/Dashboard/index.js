'use client';
import React, { useMemo, useState } from 'react';
import DashboardOptions from './DahsboardOptions';
import ProductsTable from './ProductsTable/ProductsTable';
import DashboardSideBar from './DashboardSideBar';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { FaTruck } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import Button from '@/components/Buttons/Button';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
  const options = useMemo(() => {
    return [
      {
        id: 1,
        label: 'Products',
        onClick: () => {},
        icon: <MdProductionQuantityLimits />,
      },
      {
        id: 2,
        label: 'Orders',
        onClick: () => {},
        icon: <FaTruck />,
      },
      {
        id: 3,
        label: 'Clients',
        onClick: () => {},
        icon: <FaRegUser />,
      },
    ];
  }, []);
  const [currentOption, setCurrentOption] = useState(options[0]);

  return (
    <div className="h-full w-full flex flex-col gap-[32px]">
      <div className="flex flex-col md:flex-row justify-center md:justify-end items-center pr-[24px] gap-[16px]">
        <div className="md:hidden">
          <DashboardOptions options={options} onOptionClick={setCurrentOption} />
        </div>
        <div className="max-w-[120px] ">
          <Button label={'Add product'} onClick={() => router.push('/product/create-product')} className="text-sm" />
        </div>
      </div>
      <div className="flex md:h-[calc(100vh-170px)] h-[calc(100vh-236px)] border border-t-0">
        <div className="w-[300px] hidden md:block">
          <DashboardSideBar options={options} onOptionClick={setCurrentOption} currentOption={currentOption} />
        </div>
        <div className="overflow-scroll border border-t-0 w-full">
          <ProductsTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
