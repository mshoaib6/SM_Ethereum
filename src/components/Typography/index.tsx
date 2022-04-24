import React from 'react';
import clsx from 'clsx';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { Typography as MaterialUITypography } from '@material-ui/core';

interface ITypography {
  id?: string;
  className?: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify' | undefined;
  title?: boolean;
  textTitle?: boolean;
  children: React.ReactNode;
}

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Kohinoor', 'serif'].join(','),
    fontSize: 15,
  },
});

const useStyles = makeStyles(theme => ({
  typography: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  text: {
    fontFamily: ['Kohinoor', 'serif'].join(','),
    fontSize: '1.3em',
  },
  'text-center': {
    textAlign: 'center',
  },
  'text-title': {
    fontWeight: 'bold',
  },
}));

// This component is kinda messed up
export const Typography: React.FC<ITypography> = ({
  id,
  className,
  align,
  title,
  textTitle,
  children,
}) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      {title ? (
        <MaterialUITypography
          id={id}
          className={clsx({ className, [classes.typography]: true })}
          component="h5"
          variant="h5"
          align={align}
          gutterBottom
        >
          {children}
        </MaterialUITypography>
      ) : (
        <div
          id={id}
          className={clsx({
            className,
            [classes.typography]: true,
            [classes.text]: true,
            [classes['text-center']]: align === 'center',
            [classes['text-title']]: textTitle,
          })}
        >
          {children}
        </div>
      )}
    </ThemeProvider>
  );
};

Typography.defaultProps = {
  align: 'left',
  title: false,
  textTitle: false,
};
