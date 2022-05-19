const express = require("express");
const config = require("./db/config");
const {
  getCustomerCount,
  getCustomerCurrentMonthCount,
  getCustomers,
} = require("./controllers/customers");
const {
  getTotalIssued,
  getMonthIssued,
  getPreviousMonthIssued,
  getLatePayments,
  getTotalInterest,
  getLoans,
  getRepayments,
} = require("./controllers/loans");

const PORT = process.env.PORT || 5005;

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/api/customers", (req, res) => getCustomers(res, req));

app.get("/api/customer/count", (req, res) => getCustomerCount(res, req));

app.get("/api/customer/currentMonthCount", (req, res) => getCustomerCurrentMonthCount(res, req));

app.get("/api/loans", (req, res) => getLoans(res, req));

app.get("/api/loan/totalIssued", (req, res) => getTotalIssued(res, req));

app.get("/api/loan/monthIssued", (req, res) => getMonthIssued(res, req));

app.get("/api/loan/previousMonthIssued", (req, res) => getPreviousMonthIssued(res, req));

app.get("/api/loan/totalInterest", (req, res) => getTotalInterest(res, req));

app.get("/api/loan/late", (req, res) => getLatePayments(res, req));

app.get("/api/loan/payments", (req, res) => getRepayments(res, req));
  
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});