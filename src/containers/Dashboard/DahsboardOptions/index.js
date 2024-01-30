import React, { useMemo } from 'react';
import ButtonsSlider from '@/components/ButtonsSlider';

const DashboardOptions = ({ options = [], onOptionClick = () => {} }) => {
  return (
    <ButtonsSlider>
      <ButtonsSlider.List
        render={(open, setOpen) => {
          return (
            <>
              {options.map((option) => {
                return (
                  <ButtonsSlider.ListItem key={option.id} onClick={() => onOptionClick(option)} value={option}>
                    {option.label}
                  </ButtonsSlider.ListItem>
                );
              })}
            </>
          );
        }}
      />
    </ButtonsSlider>
  );
};

export default DashboardOptions;
