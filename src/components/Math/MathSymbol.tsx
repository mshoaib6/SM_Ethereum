import React from 'react';

interface IMathSymbol {
  children: React.ReactNode;
}

const style = {
  fontSize: 24,
};

export const MathSymbol: React.FC<IMathSymbol> = ({ children }) => {
  return (
    <span style={style}>
      <b>{children}</b>
    </span>
  );
};
