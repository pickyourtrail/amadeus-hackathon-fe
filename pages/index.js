import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Image from 'next/image';

import FlightSearchImage from '../public/flight-search.jpg';
import FlightSearchBar from '../src/FlightSearchBar';
import FlightCardLoading from '../src/FlightCardLoading';
import FlightCard from '../src/FlightCard';

import FlightsData from '../src/data/final.json';

export default function Index() {
  const [showLoading, setShowLoading] = React.useState(false);
  const [showPriceIndicator, setShowPriceIndicator] = React.useState(false);
  const [showFlights, setShowFlights] = React.useState(false);

  const onClickSearch = () => {
    setShowLoading(true);

    setTimeout(() => {
      setShowFlights(true);
    }, 1500);

    setTimeout(() => {
      setShowPriceIndicator(true);
    }, 5000);
  };

  return (
    <Container maxWidth="lg">
      <Box height={400} position={'relative'}>
        <Image
          src={FlightSearchImage}
          fill
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </Box>
      <FlightSearchBar
        onSearch={onClickSearch}
        showFlights={showFlights}
        showPriceIndicator={showPriceIndicator}
        flightsData={FlightsData?.flightCostings}
      />
      {!showLoading ? null : (
        <Box display={'flex'} gap={4} flexDirection={'column'} mb={12}>
          {showFlights ? (
            FlightsData.flightCostings.map((flight, index) => {
              return <FlightCard data={{ ...flight }} index={index} />;
            })
          ) : (
            <React.Fragment>
              <FlightCardLoading />
              <FlightCardLoading />
              <FlightCardLoading />
              <FlightCardLoading />
              <FlightCardLoading />
            </React.Fragment>
          )}
        </Box>
      )}
    </Container>
  );
}
