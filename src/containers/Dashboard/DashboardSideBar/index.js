import React from 'react';
import clsx from 'clsx';

const DashboardSideBar = ({ options = [], currentOption, onOptionClick }) => {
  return (
    <ul className="w-[250px]">
      {options.map((option) => {
        return (
          <li
            key={option.id}
            className={clsx(
              'h-[60px] flex items-center border-b first:border-t text-sm pl-[32px] font-medium hover:bg-gray-50',
              {
                ['text-gray-500']: option.id !== currentOption.id,
                ['text-blue-500']: option.id === currentOption.id,
              },
            )}>
            <button
              className="flex w-full h-full items-center gap-4"
              onClick={() => {
                onOptionClick(option);
              }}>
              {option.icon}
              {option.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default DashboardSideBar;
