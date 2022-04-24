import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Slider, Typography } from '@material-ui/core';

interface ISlide {
  legend: string;
  value: number;
  handleChangeValue: (event: React.ChangeEvent<{}>, value: number | number[]) => void;
  min: number;
  max: number;
  step: number;
  percentage?: boolean;
}

const useStyles = makeStyles({
  'slide-container': {
    display: 'flex',
    flexDirection: 'column',
    margin: '30px 0',
  },
});

const calculatePercentage = (value: number) => {
  const percentage = (100 * value).toPrecision(2);
  return `${percentage}%`;
};

export const Slide: React.FC<ISlide> = ({
  legend,
  value,
  handleChangeValue,
  min,
  max,
  step,
  percentage,
}) => {
  const classes = useStyles();

  return (
    <div className={classes['slide-container']}>
      <Typography>
        {legend} - {percentage ? calculatePercentage(value) : value}
      </Typography>
      <Slider value={value} min={min} max={max} step={step} onChange={handleChangeValue} />
    </div>
  );
};

Slide.defaultProps = {
  percentage: false,
};
