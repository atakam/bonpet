import React from "react";
import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';

export const LatePayements = (props) => {
  const [sum, setSum] = React.useState({total: 0, interest: 0});
  const [actualSum, setActualSum] = React.useState(0);
  const [actualInterest, setActualInterest] = React.useState(0);

  React.useEffect(() => {
    fetch("/loan/late")
      .then((res) => res.json())
      .then((data) => setSum({total: data.total, interest: data.interest}));
  }, []);

  React.useEffect(() => {
    fetch("/loan/totalIssued")
      .then((res) => res.json())
      .then((data) => setActualSum(data.sum));
  }, []);

  React.useEffect(() => {
    fetch("/loan/totalInterest")
      .then((res) => res.json())
      .then((data) => setActualInterest(data.sum));
  }, []);

  const late = (sum.total + sum.interest);
  const actual =  (actualSum + actualInterest);
  const percent = late > 0 ? (late / actual) * 100 : 0;

  return (
    <Card
      sx={{ height: '100%' }}
      {...props}
    >
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
              LATE PAYMENTS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {percent}%
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'error.main',
                height: 56,
                width: 56
              }}
            >
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <LinearProgress
            value={percent}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
};
