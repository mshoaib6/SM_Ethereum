import { Summary } from '@components';

export const blockTypes1: Summary[] = [
  {
    id: 0,
    title: 'Regular block',
    description: 'Block that is part of the public chain',
  },
  {
    id: 1,
    title: 'Stale block',
    description: 'Block validated by a miner but not included in the public chain',
  },
];

export const blockTypes2: Summary[] = [
  {
    id: 0,
    title: 'Uncle Block',
    description: 'Stale block direct child of a regular block',
  },
  {
    id: 1,
    title: 'Nephew block',
    description: 'Regular block that has referenced an uncle block',
  },
];
