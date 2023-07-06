import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Skeleton,
  Typography,
  colors,
  styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import getCostFormat from './getCostFormat';

const minToHrs = totalMinutes => {
  var hours = Math.floor(totalMinutes / 60);
  var minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function FlightCard({ data, index }) {
  if (index === 0) {
    console.log({ data });
  }

  const [currentFlight, setCurrentFlight] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid
        container
        p={4}
        border={1}
        borderColor={colors.grey[800]}
        borderRadius={1}
        alignItems={'center'}>
        <Grid item xs={9}>
          {data.trip.map(trip => {
            const len = trip.routes.length;
            const onwardRoute = trip.routes[0];
            const returnRoute = trip.routes[trip.routes.length - 1];

            return (
              <Grid container alignItems={'center'}>
                <Grid item xs={2}>
                  <img
                    src={`https://www.gstatic.com/flights/airline_logos/70px/dark/${data.validatingAirline}.png`}
                    alt={data.validatingAirline}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    {onwardRoute.departureAirportCode}-
                    {onwardRoute.arrivalAirportCode}-
                    {returnRoute.arrivalAirportCode}
                  </Typography>
                  <Typography>
                    {onwardRoute.departureTime
                      ?.split(':')
                      .splice(0, 2)
                      .join(':')}
                    -
                    {returnRoute.arrivalTime?.split(':').splice(0, 2).join(':')}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>
                    {len === 1
                      ? 'Non Stop'
                      : len - 1 + ' Stop' + (len - 1 > 1 ? 's' : '')}
                  </Typography>
                  <Typography>{minToHrs(data.totalDuration)}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>Cabin: {data.freeCabinBaggage}</Typography>
                  <Typography>Check-in: {data.freeCheckInBaggage}</Typography>
                </Grid>
              </Grid>
            );
          })}
        </Grid>

        <Grid item xs={1}>
          <Typography>{getCostFormat(data.cost)}</Typography>
          <Typography variant="caption">{data.flightClass}</Typography>
        </Grid>
        <Grid item xs={2} gap={1} justifyContent={'flex-end'} display={'flex'} direction={'column'}>
          <Button
            variant="contained"
            color="secondary"
            size='small'
            onClick={() => {
              setCurrentFlight(data);
              setOpen(true);
            }}>
            Hold Price
          </Button>
          <Button
            variant="contained"
            // color="warning"
            size='small'
            onClick={() => {
              setCurrentFlight(data);
              setOpen(true);
            }}>
            Book Flight
          </Button>
        </Grid>
      </Grid>

      <BootstrapDialog open={open} onClose={handleClose}>
        <BootstrapDialogTitle onClose={handleClose}>
          Hold Price & Pay Later
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            <Box padding={1} border={1} mb={3} borderColor={colors.grey[600]}>
              <Grid container>
                <Grid item xs={6} borderRight={1} borderColor={colors.grey[600]}>
                  <Box display="flex" sx={{ flexDirection: 'column' }} pl={2}>
                    <Typography gutterBottom variant='subtitle1'>Premium Fees</Typography>
                    {currentFlight ? (
                      <Typography gutterBottom fontWeight={'bold'}>
                        {getCostFormat(currentFlight?.freezePremium)}
                      </Typography>
                    ) : (
                      <Skeleton animation="wave" height={30} width="80%" />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" sx={{ flexDirection: 'column' }} pl={4}>
                    <Typography gutterBottom variant='subtitle1'>Flight Price</Typography>
                    {currentFlight ? (
                      <Typography gutterBottom fontWeight={'bold'}>
                        {getCostFormat(currentFlight?.cost)}
                      </Typography>
                    ) : (
                      <Skeleton animation="wave" height={30} width="80%" />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box display={'flex'} flexDirection={'column'} gap={2}>
              <Alert severity="warning">
                <AlertTitle>Disclaimer</AlertTitle>
                This amount is over and above the flight cost and is non
                refundable.
              </Alert>
              <Typography gutterBottom variant='body1'>
                Refundable only if the flights are cancelled or if the flights
                get sold out Book this flight within{' '}
                {currentFlight?.daysToFreeze} days for this price.
              </Typography>
              <Typography gutterBottom variant='body1'>
                If the price drops, pay the lower price, if the price increases,
                you still pay {getCostFormat(data.cost)}. Pickyourtrail will
                absorb any price rise upto a maximum of ₹6000
              </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button variant="outlined" color="info" onClick={handleClose}>
            Cancel
          </Button> */}
          <Button variant="contained" color="info" onClick={handleClose}>
            Proceed
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
