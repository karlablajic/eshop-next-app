import React, { useState, createContext, useContext } from 'react';
import clsx from 'clsx';

const ButtonsSliderContext = createContext();

const ButtonsSlider = (props) => {
  const [selected, setSelected] = useState(1);
  return (
    <ButtonsSliderContext.Provider
      value={{
        selected,
        setSelected,
      }}>
      <div className="flex justify-center">
        {React.Children.map(props.children, (child) =>
          React.cloneElement(child, {
            selected,
            setSelected,
          }),
        )}
      </div>
    </ButtonsSliderContext.Provider>
  );
};

function List({ render }) {
  const { selected, setSelected } = useContext(ButtonsSliderContext);
  return (
    <ul className={'flex border divide-x bg-white rounded-lg overflow-hidden'}>{render(selected, setSelected)}</ul>
  );
}

function ListItem({ children, value, onClick }) {
  const { selected, setSelected } = useContext(ButtonsSliderContext);
  const selectedListClassname = clsx(
    'h-[50px] flex items-center border-b px-[40px] text-gray-900 text-sm cursor-pointer',
    {
      ['bg-blue-500 text-white']: value.id === selected,
      ['hover:bg-gray-50']: value.id !== selected,
    },
  );

  return (
    <li
      className={selectedListClassname}
      onMouseDown={() => {
        setSelected(value.id);
        onClick();
      }}>
      {children}
    </li>
  );
}

ButtonsSlider.List = List;
ButtonsSlider.ListItem = ListItem;

export default ButtonsSlider;
