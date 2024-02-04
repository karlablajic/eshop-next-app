import React, { useEffect, useState, createContext, useContext } from 'react';
import clsx from 'clsx';

const StepperContext = createContext();

const Stepper = (props) => {
  const [current, setCurrent] = useState(0);
  const [listLength, setListLength] = useState(0);

  return (
    <StepperContext.Provider
      value={{
        current,
        setCurrent,
        listLength,
        setListLength,
      }}>
      <div className="flex flex-col gap-[32px]  h-full w-full items-center">
        <div className="grow max-w-[600px] w-full">
          {listLength > 0 && (
            <div className="flex justify-between relative">
              {[...Array(listLength).keys()].map((number, index) => (
                <>
                  <div
                    className={clsx(
                      'z-30 flex justify-center items-center rounded-full h-[40px] w-[40px] bg-blue-500 text-white ',
                      {
                        ['bg-gray-100 text-white']: current + 1 <= index,
                      },
                    )}>
                    <p key={number}>{number + 1}</p>
                  </div>
                  <div className={clsx('absolute w-full left-0 right-0 top-[19px] h-[2px] bg-gray-200 z-10', {})} />
                  <div
                    className={'absolute  top-[19px] h-[2px] bg-blue-500 z-20 transition-[width]  duration-40'}
                    style={{ width: `${(current / (listLength - 1)) * 100}%` }}
                  />
                </>
              ))}
            </div>
          )}
        </div>
        {React.Children.map(props.children, (child) => React.cloneElement(child))}
      </div>
    </StepperContext.Provider>
  );
};

function List({ children }) {
  const { current, setListLength } = useContext(StepperContext);
  useEffect(() => {
    setListLength(children.length);
  }, [children]);

  return (
    <div className="flex flex-col overflow-hidden h-full w-full">
      <ul
        className={'h-full w-full bg-transparent rounded rounded-t-0 flex transition ease-out duration-40'}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}>
        {children}
        {React.Children.map(children, (child) => React.cloneElement(child))}
      </ul>
    </div>
  );
}

function ListItem({ children }) {
  return (
    <li
      className="flex flex-col iten.between overflow-y-scroll h-full min-w-full   text-gray-900 text-sm "
      onMouseDown={() => {}}>
      {React.Children.map(children, (child) => React.cloneElement(child))}
    </li>
  );
}

function ListItemContent({ children }) {
  return (
    <li
      className="flex flex-col iten.between overflow-y-scroll h-full min-w-full   text-gray-900 text-sm "
      onMouseDown={() => {}}>
      {React.Children.map(children, (child) => React.cloneElement(child))}
    </li>
  );
}

function Navigation({ children, ...rest }) {
  return <div {...rest}>{children}</div>;
}

function NavItemBack({ children, ...rest }) {
  const { current, setCurrent } = useContext(StepperContext);

  const previousSlide = () => {
    if (current === 0) return;
    setCurrent(current - 1);
  };

  return (
    <button {...rest} onClick={previousSlide}>
      {children}
    </button>
  );
}
function NavItemForward({ children, ...rest }) {
  const { current, setCurrent, listLength } = useContext(StepperContext);

  const nextSlide = () => {
    if (current === listLength - 1) return;
    setCurrent(current + 1);
  };
  return (
    <button onClick={nextSlide} {...rest}>
      {children}
    </button>
  );
}

Stepper.List = List;
Stepper.ListItem = ListItem;
Stepper.ListItemContent = ListItemContent;
Stepper.Navigation = Navigation;
Stepper.NavItemBack = NavItemBack;
Stepper.NavItemForward = NavItemForward;

export default Stepper;
