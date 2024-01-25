'use client';
import React from 'react';

const Button = ({ className = '', onClick = () => {}, label = '', ...rest }) => {
  return (
    <button className={`px-[17px] py-[9px] bg-blue-600 text-white rounded-lg ${className}`} onClick={onClick} {...rest}>
      {label}
    </button>
  );
};

export default Button;
