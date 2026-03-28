import React from 'react';
import DogIcon from '../icons/DogIcon';
import HeartIcon from '../icons/HeartIcon';

const Loading = ({ message = '加载中...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <DogIcon className="w-20 h-20 text-cartoon-pink animate-bounce" />
        <div className="absolute -bottom-2 -right-2">
          <HeartIcon className="w-8 h-8 text-cartoon-red animate-pulse" />
        </div>
      </div>
      <p className="text-gray-600 mt-4 text-lg font-bold">{message}</p>
    </div>
  );
};

export default Loading;