import React, { ReactNode } from 'react';
import './style.css';

type Props = {
  children: ReactNode;
};

const NavigationButton = ({ children }: Props) => {
  return (
    <>
      <button className="navigation_btn">
        <p className="my-2 px-2">{children}</p>
        <div className="btn_underline"></div>
      </button>
    </>
  );
};

export default NavigationButton;
