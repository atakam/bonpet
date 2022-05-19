import React from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography, Tooltip } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MoneyIcon from '@mui/icons-material/Money';
import {
  intToString,
  formatMoney,
} from '../../utils/utils';

export const Budget = (props) => {
  const [sum, setSum] = React.useState(0);
  const [monthIssue, setMonthIssue] = React.useState(0);
  const [previousMonthIssue, setPreviousMonthIssue] = React.useState(0);

  const difference = monthIssue - previousMonthIssue;

  React.useEffect(() => {
    fetch("/loan/totalIssued")
      .then((res) => res.json())
      .then((data) => setSum(data.sum));
  }, []);

  React.useEffect(() => {
    fetch("/loan/monthIssued")
      .then((res) => res.json())
      .then((data) => setMonthIssue(data.sum));
  }, []);

  React.useEffect(() => {
    fetch("/loan/previousMonthIssued")
      .then((res) => res.json())
      .then((data) => setPreviousMonthIssue(data.sum));
  }, []);

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
              TOTAL DISBURSEMENT
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
                backgroundColor: 'warning.main',
                height: 56,
                width: 56
              }}
            >
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {
            difference < 0 ? <ArrowDownwardIcon color="error" /> : <ArrowUpwardIcon color="success" />
          }
          <Typography
            color={difference < 0 ? "error" : ""}
            sx={{
              mr: 1
            }}
            variant="body2"
          >
            {(monthIssue/previousMonthIssue * 100).toFixed(2)}%
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            to last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
