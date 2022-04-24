import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    margin: '50px 0',
  },
});

interface Stats {
  name: string;
  publicChainLength: number;
  apparentHashRate: number;
  revenueRatio: number;
  validBlocks: number;
  totalUncles: number;
  validUncles: number;
  totalRewards: number;
  staticRewards: number;
  uncleRewards: number;
  nephewRewards: number;
}

interface Results {
  data: Stats[];
}

export const TableResults: React.FC<Results> = ({ data }) => {
  const classes = useStyles();
  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Pool</TableCell>
            <TableCell align="center">Chain Length</TableCell>
            <TableCell align="center">Apparent Hash Rate</TableCell>
            <TableCell align="center">Revenue Ratio</TableCell>
            <TableCell align="center">Valid Blocks</TableCell>
            <TableCell align="center">Total Uncles</TableCell>
            <TableCell align="center">Valid Uncles</TableCell>
            <TableCell align="center">Static Rewards</TableCell>
            <TableCell align="center">Uncle Rewards</TableCell>
            <TableCell align="center">Nephew Rewards</TableCell>
            <TableCell align="center">Total Rewards</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(
            ({
              name,
              publicChainLength,
              apparentHashRate,
              revenueRatio,
              validBlocks,
              totalUncles,
              validUncles,
              staticRewards,
              uncleRewards,
              nephewRewards,
              totalRewards,
            }) => (
              <TableRow key={name} hover>
                <TableCell component="th" scope="row" align="center">
                  {name}
                </TableCell>
                <TableCell align="center">{publicChainLength}</TableCell>
                <TableCell align="center">{apparentHashRate}</TableCell>
                <TableCell align="center">{revenueRatio}</TableCell>
                <TableCell align="center">{validBlocks}</TableCell>
                <TableCell align="center">{totalUncles}</TableCell>
                <TableCell align="center">{validUncles}</TableCell>
                <TableCell align="center">{staticRewards} eth</TableCell>
                <TableCell align="center">{uncleRewards} eth</TableCell>
                <TableCell align="center">{nephewRewards} eth</TableCell>
                <TableCell align="center">{totalRewards} eth</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
