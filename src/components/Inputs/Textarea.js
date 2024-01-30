import React from 'react';

const Textarea = ({ onChange = () => {}, label = '', placeholder = '', className = '', error = '', ...rest }) => {
  return (
    <div className="flex flex-col gap-1 grow-0">
      <div>
        <span className="text-sm text-gray-500 font-medium">{label}</span>
      </div>
      <textarea
        placeholder={placeholder}
        className={`focus:ring-1 focus:ring-blue-500 focus:border-blue-500  ${className}`}
        onChange={onChange}
        {...rest}
      />
      <span className="text-sm text-red-500 font-medium">{error}</span>
    </div>
  );
};

export default Textarea;
