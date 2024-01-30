'use client';
import React from 'react';
import Spinner from '../Spinner';
const Button = ({ loading = false, className = '', onClick = () => {}, label = '', ...rest }) => {
  return (
    <button
      className={`flex justify-center px-[17px] py-[9px] bg-blue-600 text-white rounded-lg leading-5 ${className}`}
      onClick={onClick}
      {...rest}>
      {loading ? <Spinner className="border-[3px]" /> : <span>{label}</span>}
    </button>
  );
};

export default Button;
