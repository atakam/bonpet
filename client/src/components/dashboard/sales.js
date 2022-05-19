import React from "react";
import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme, Select, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export const Sales = (props) => {
  const theme = useTheme();

  const [loans, setLoans] = React.useState([]);
  const [payments, setPayments] = React.useState([]);
  const [days, setDays] = React.useState(7);

  React.useEffect(() => {
    fetch("/loans/")
      .then((res) => res.json())
      .then((data) => setLoans(data.loans));
  }, []);

  React.useEffect(() => {
    fetch("/loan/payments/")
      .then((res) => res.json())
      .then((data) => setPayments(data.payments));
  }, []);

  loans.forEach((loan) => {
    const loanPayments = payments.filter(obj => obj.LoanId === loan.LoanId);
    loan.payments = loanPayments;

    if (loan.PaymentMode === 'Daily') {
      loan.nextPay = new Date();
    }
    else if (loan.PaymentMode === 'Weekly') {
      const loanDate = new Date(loan.DisbursementDate);
      loanDate.setDate(loanDate.getDate() + 7);
      while (loanDate < new Date()) {
        loanDate.setDate(loanDate.getDate() + 7);
      }
      
      loan.nextPay = loanDate;
    }
    else if (loan.PaymentMode === 'Monthly') {
      const loanDate = new Date(loan.DisbursementDate);
      loanDate.setMonth(loanDate.getMonth() + 1);
      while (loanDate < new Date()) {
        loanDate.setMonth(loanDate.getMonth() + 1);
      }
      
      loan.nextPay = loanDate;
    }
    const nextPayStr = loan.nextPay.toString().split(' ')[1] + ' ' + loan.nextPay.toString().split(' ')[2];
      loan.nextPayStr = nextPayStr;
  });

  const results = loans
    .sort((a, b) => a.nextPay - b.nextPay)
    .reduce(function (r, a) {
        r[a.nextPayStr] = r[a.nextPayStr] || [];
        r[a.nextPayStr].push(a);
        return r;
    }, Object.create(null));

  console.log({results});

  const paymentsDue = Object.keys(results).map((key) => {
    return results[key].map((l) => {
      return l.MonthlyInstallement;
    }).reduce((a, b) => Number(a) + Number(b), 0);
  }).slice(0, days);

  console.log({paymentsDue});

  const data = {
    datasets: [
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: paymentsDue,
        label: 'Payments Due',
        maxBarThickness: 10
      },
      {
        backgroundColor: '#EEEEEE',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: paymentsDue,
        label: 'Payments Due 2',
        maxBarThickness: 10
      }
    ],
    labels: Object.keys(results).slice(0, days),
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const handleSelectChange = (event) => {
    setDays(event.target.value);
  };

  const selectButton = (
    <Select
      value={days}
      label={`Next ${days} days`}
      onChange={handleSelectChange}
    >
      <MenuItem value={7}>Next 7 days</MenuItem>
      <MenuItem value={14}>Next 14 days</MenuItem>
      <MenuItem value={30}>Next 30 days</MenuItem>
    </Select>
  );

  return (
    <Card {...props}>
      <CardHeader
        action={selectButton}
        title="Latest Sales"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};
