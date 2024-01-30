import React, { useEffect, useRef, useState, createContext, useContext } from 'react';

const DropdownContext = createContext();

const Dropdown = (props) => {
  const [open, setOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <DropdownContext.Provider
      value={{
        setOpen,
        open,
        setButtonPosition,
        buttonPosition,
      }}>
      <div ref={dropdownRef} className="flex flex-col gap-[4px] relative">
        {React.Children.map(props.children, (child) =>
          React.cloneElement(child, {
            setOpen,
            open,
            setButtonPosition,
            buttonPosition,
          }),
        )}
      </div>
    </DropdownContext.Provider>
  );
};

function Button(props) {
  const buttonRef = useRef(null);
  const { render, setButtonPosition, buttonPosition, ...rest } = props;
  const { open, setOpen } = useContext(DropdownContext);

  useEffect(() => {
    if (buttonRef && buttonRef.current) {
      setButtonPosition(buttonRef.current.getBoundingClientRect());
    }
  }, []);

  return <div ref={buttonRef}>{render(open, setOpen)}</div>;
}

function List({ render }) {
  const { open, setOpen, buttonPosition } = React.useContext(DropdownContext);
  const [position, setPosition] = useState({});

  useEffect(() => {
    if (buttonPosition) {
      const position = window.innerWidth - buttonPosition.right < buttonPosition.left ? 'left' : 'right';
      const horizontalPosition = {
        right: position === 'left' ? 0 : undefined,
        left: position === 'right' ? 0 : undefined,
      };
      setPosition(horizontalPosition);
    }
  }, [buttonPosition]);

  return (
    <>
      {open && (
        <ul
          style={{
            top: buttonPosition.height + 8,
            ...position,
          }}
          className={
            'w-max absolute bg-white  max-h-[216px] z-[500] overflow-scroll shadow-[0px_2px_4px_-1px_rgba(0,0,0,0.3),0px_4px_6px_-1px_rgba(0,0,0,0.1)] rounded rounded-t-0 '
          }>
          {render(open, setOpen)}
        </ul>
      )}
    </>
  );
}

function ListItem({ children, value }) {
  return (
    <li className=" flex items-center border-b  text-gray-900 text-sm hover:bg-gray-50" onMouseDown={() => {}}>
      {children}
    </li>
  );
}

Dropdown.Button = Button;
Dropdown.List = List;
Dropdown.ListItem = ListItem;

export default Dropdown;
