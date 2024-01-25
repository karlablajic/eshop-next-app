import React from 'react';

const Input = ({ onChange = () => {}, label = '', placeholder = '', className = '', error = '', ...rest }) => {
  return (
    <div className="flex flex-col gap-1 grow-0">
      <div>
        <span className="text-sm text-gray-500 font-medium">{label}</span>
      </div>
      <input
        placeholder={placeholder}
        className={`outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500  placeholder:text-gray-500 placeholder:leading-5 placeholder:text-sm ${className}`}
        onChange={onChange}
        {...rest}
      />
      <span className="text-sm text-red-500 font-medium">{error}</span>
    </div>
  );
};

export default Input;
