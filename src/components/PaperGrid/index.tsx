import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    height: 80,
  },
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  title: {
    height: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  description: {
    height: '60%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export interface Summary {
  id: number;
  title: string;
  description: string;
}

interface IPaperGrid {
  data: Summary[];
}

export const PaperGrid: React.FC<IPaperGrid> = ({ data }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.container} container spacing={2}>
      {data.map(({ id, title, description }) => (
        <Grid key={id} item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Paper className={classes.paper}>
            <Typography align="center" className={classes.title}>
              {title}
            </Typography>
            <Typography align="center" className={classes.description}>
              {description}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
