import React from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';

export const TotalCustomers = (props) => {

  const [count, setCount] = React.useState(0);
  const [monthCount, setMonthCount] = React.useState(0);

  React.useEffect(() => {
    fetch("/customer/count")
      .then((res) => res.json())
      .then((data) => setCount(data.count));
  }, []);

  React.useEffect(() => {
    fetch("/customer/currentMonthCount")
      .then((res) => res.json())
      .then((data) => setMonthCount(data.monthCount));
  }, []);

  return (
    <Card {...props}>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
            >
              TOTAL CUSTOMERS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {count && count}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'success.main',
                height: 56,
                width: 56
              }}
            >
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            pt: 2
          }}
        >
          <ArrowUpwardIcon color="success" />
          <Typography
            variant="body2"
            sx={{
              mr: 1
            }}
          >
            {(monthCount/count * 100).toFixed(2)}%
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            borrowed this month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
