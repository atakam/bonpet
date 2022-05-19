import React from "react";
import { Avatar, Card, CardContent, Grid, Typography, Tooltip } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {
  intToString,
  formatMoney,
} from '../../utils/utils';

export const TotalProfit = (props) => {
  const [sum, setSum] = React.useState(0);

  React.useEffect(() => {
    fetch("/loan/totalInterest")
      .then((res) => res.json())
      .then((data) => setSum(data.sum));
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
              TOTAL INTEREST
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              <Tooltip title={formatMoney(sum)}>
                <span>{intToString(sum)}</span>
              </Tooltip>
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                height: 56,
                width: 56
              }}
            >
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
