import React from 'react';
import Text2SVG from 'react-hook-mathjax';

interface ILatex {
  text: string;
}

export const Latex: React.FC<ILatex> = ({ text }) => {
  return <Text2SVG display="inline" latex={text} />;
};
