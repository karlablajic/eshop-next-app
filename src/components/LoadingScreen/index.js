import React from 'react';
import Spinner from '../Spinner';

const LoadingScreen = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default LoadingScreen;
