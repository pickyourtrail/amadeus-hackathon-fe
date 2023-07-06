import dayjs from 'dayjs';
import { atom } from 'jotai';
// import { atomWithReset } from "jotai/utils";

export const flightSearchAtom = atom({
  type: 1,
  adults: 2,
  depart: 'BLR',
  arrival: 'AMS',
  departDate: dayjs(new Date()).add(7, 'day'),
  // returnDate: dayjs(new Date()).add(14, 'day'),
});
flightSearchAtom.debugLabel = 'flightSearch';
