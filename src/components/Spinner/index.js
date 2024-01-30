import React from 'react';
import '../../app/globals.css';

const Spinner = ({ className = '' }) => {
  return <div className={`h-[20px] w-[20px] rounded-full border-t-blue-500 border-4	animate-spin ${className}`} />;
};

export default Spinner;
