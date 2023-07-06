import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  colors,
  styled,
} from '@mui/material';
import { DatePicker, PickersDay } from '@mui/x-date-pickers';
import { useAtom } from 'jotai';
import { flightSearchAtom } from '../store/atoms';

const CustomPickersDay = styled(PickersDay)(({ disabled }) => ({
  ...(disabled
    ? {
        height: 'auto',
      }
    : {
        borderRadius: '4px',
        width: 'auto',
        height: 'auto',
      }),
}));

const countries = [
  { code: 'BLR', label: 'Bengaluru' },
  { code: 'AMS', label: 'Amsterdam' },
];

import _CALENDAR_PRICE from '../src/data/latest-price.json';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import getCostFormat from './getCostFormat';

export default function FlightSearchBar({ onSearch }) {
  const [flightSearch, setFlightSearch] = useAtom(flightSearchAtom);

  const handleChangeType = event => {
    setFlightSearch({ type: event.target.value });
  };

  const oneWayCalenderPrice = useMemo(() => {
    const keys = Object.keys(_CALENDAR_PRICE).filter(a => a.includes('_o'));

    const finalList = {};
    keys.forEach(key => {
      finalList[key.split('_')[0]] = _CALENDAR_PRICE[key];
    });

    return finalList;
  }, []);

  const roundTripCalenderPrice = useMemo(() => {
    const keys = Object.keys(_CALENDAR_PRICE).filter(a => a.includes('_r'));

    const finalList = {};
    keys.forEach(key => {
      finalList[key.split('_')[0]] = _CALENDAR_PRICE[key];
    });

    return finalList;
  }, []);

  return (
    <Box sx={{ my: 4, gap: '12px', display: 'flex', flexDirection: 'column' }}>
      <Grid container spacing={2}>
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          size="small">
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={flightSearch.type}
            label="Age"
            onChange={handleChangeType}>
            <MenuItem value={1}>One-way</MenuItem>
            <MenuItem value={2}>Round Trip</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          size="small">
          <Select
            readOnly
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={flightSearch.adults}
            label="Adults"
            onChange={event => setFlightSearch({ adults: event.target.value })}>
            <MenuItem value={1}>1 Adult</MenuItem>
            <MenuItem value={2}>2 Adults</MenuItem>
          </Select>
        </FormControl>
        {/* <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          size="small"
        >
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={1}
            label="Age"
          >
            <MenuItem value={1}>Economy</MenuItem>
            <MenuItem value={2}>Premium Economy</MenuItem>
            <MenuItem value={3}>Business Class</MenuItem>
            <MenuItem value={3}>First Class</MenuItem>
          </Select>
        </FormControl> */}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={countries}
            value={flightSearch.depart}
            renderInput={params => (
              <TextField {...params} label="Where From?" />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={countries}
            value={flightSearch.arrival}
            renderInput={params => <TextField {...params} label="Where To?" />}
          />
        </Grid>
        <Grid item xs={3}>
          <DatePicker
            disablePast
            label="Depart"
            sx={{ width: '100%' }}
            showDaysOutsideCurrentMonth={true}
            value={flightSearch?.departDate}
            onChange={newValue => setFlightSearch({ departDate: newValue })}
            slots={{
              day: ({ day, outsideCurrentMonth, disabled, ...rest }) => {
                const formattedDate = dayjs(day.$d).format('YYYY-MM-DD');
                console.log({ day, rest, formattedDate });
                const price = oneWayCalenderPrice?.[formattedDate];

                return (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}>
                    <PickersDay
                      {...rest}
                      disabled={disabled}
                      outsideCurrentMonth={outsideCurrentMonth}
                      day={day}
                    />
                    {(outsideCurrentMonth || disabled) && !price ? undefined : (
                      <Typography
                        variant="caption"
                        sx={{ fontSize: '11px', color: colors.green[200] }}>
                        {price}
                      </Typography>
                    )}
                  </Box>
                );
              },
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <DatePicker
            disablePast
            label="Return"
            sx={{ width: '100%' }}
            showDaysOutsideCurrentMonth={true}
            value={flightSearch?.returnDate}
            onChange={newValue => setFlightSearch({ returnDate: newValue })}
            slots={{
              day: ({ day, outsideCurrentMonth, disabled, ...rest }) => {
                const formattedDate = dayjs(day.$d).format('YYYY-MM-DD');
                console.log({ day, rest, formattedDate });
                const price = oneWayCalenderPrice?.[formattedDate];

                return (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}>
                    <PickersDay
                      {...rest}
                      disabled={disabled}
                      outsideCurrentMonth={outsideCurrentMonth}
                      day={day}
                    />
                    {(outsideCurrentMonth || disabled) && !price ? undefined : (
                      <Typography
                        variant="caption"
                        sx={{ fontSize: '11px', color: colors.green[200] }}>
                        {price}
                      </Typography>
                    )}
                  </Box>
                );
              },
            }}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}>
          <Typography variant="caption" color={colors.grey[500]}>
            All prices are shown in INR
          </Typography>
          <Button size="large" variant="contained" onClick={onSearch}>
            Search Flights
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
