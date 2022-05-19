module.exports = () => {
    const rewrites = () => {
      return [
        {
            source: "/borrowers",
            destination: "http://localhost:5005/api/customers",
        },
        {
          source: "/customer/count",
          destination: "http://localhost:5005/api/customer/count",
        },
        {
            source: "/customer/currentMonthCount",
            destination: "http://localhost:5005/api/customer/currentMonthCount",
        },
        {
            source: "/loans",
            destination: "http://localhost:5005/api/loans",
        },
        {
            source: "/loan/totalIssued",
            destination: "http://localhost:5005/api/loan/totalIssued",
        },
        {
            source: "/loan/monthIssued",
            destination: "http://localhost:5005/api/loan/monthIssued",
        },
        {
            source: "/loan/previousMonthIssued",
            destination: "http://localhost:5005/api/loan/previousMonthIssued",
        },
        {
            source: "/loan/totalInterest",
            destination: "http://localhost:5005/api/loan/totalInterest",
        },
        {
            source: "/loan/late",
            destination: "http://localhost:5005/api/loan/late",
        },
        {
            source: "/loan/payments",
            destination: "http://localhost:5005/api/loan/payments",
        },
      ];
    };
    return {
      rewrites,
    };
  };
