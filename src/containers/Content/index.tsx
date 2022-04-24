import React from 'react';
import { Typography as MaterialUITypography } from '@material-ui/core';
import {

  Simulation,

} from '@components';
import { blockTypes1, blockTypes2 } from './data';

export const Content: React.FC = () => {
  return (
    <div>
      <MaterialUITypography
        id="introduction"
        component="h4"
        variant="h4"
        align="center"
        gutterBottom
      >
        Ethereum - Selfish Mining
      </MaterialUITypography>

        <Simulation />    

    </div>
  );
};
