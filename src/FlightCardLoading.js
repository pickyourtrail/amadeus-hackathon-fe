import { Grid, Skeleton, colors } from "@mui/material";

export default function FlightCardLoading() {
  return (
    <Grid
      container
      p={4}
      border={1}
      borderColor={colors.grey[800]}
      borderRadius={1}
      alignItems={"center"}
    >
      <Grid item xs={1}>
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
      </Grid>
      <Grid item xs={4}>
        <Skeleton animation="wave" height={30} width="80%" />
        <Skeleton animation="wave" height={20} width="30%" />
      </Grid>
      <Grid item xs={2}>
        <Skeleton animation="wave" height={30} width="60%" />
        <Skeleton animation="wave" height={20} width="40%" />
      </Grid>
      <Grid item xs={3}>
        <Skeleton animation="wave" height={30} width="60%" />
        <Skeleton animation="wave" height={20} width="40%" />
      </Grid>
      <Grid item xs={2}>
        <Skeleton animation="wave" height={30} width="60%" />
        <Skeleton animation="wave" height={20} width="40%" />
      </Grid>
    </Grid>
  );
}
