import React from 'react';

const FileInput = ({ onChange = () => {}, label = '', placeholder = '', className = '', error = '', ...rest }) => {
  return (
    <div className="flex flex-col gap-1 grow-0">
      <label
        htmlFor="image_uploads"
        className={`flex justify-center items-center cursor-pointer px-[17px] py-[9px] bg-blue-600 text-white rounded-lg ${className}`}>
        {label}
      </label>

      <input
        placeholder={placeholder}
        className="hidden"
        onChange={onChange}
        type={'file'}
        id="image_uploads"
        {...rest}
      />
      <span className="text-sm text-red-500 font-medium">{error}</span>
    </div>
  );
};

export default FileInput;
