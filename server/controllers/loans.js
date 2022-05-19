const mysql = require('mysql');
const config = require('../db/config');

const getTotalIssued = function(res, req) {
    let connection = mysql.createConnection(config);
    let sql = `SELECT SUM(PrincipleAmount) FROM loans`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.json({error: console.error(error.message), sum: 0});
        }
        res.json({sum: Object.values(results[0])[0]});
    });
    connection.end(); 
};

const getLoans = function(res, req) {
    let connection = mysql.createConnection(config);
    let sql = `SELECT * FROM loans WHERE LoanStatus='Active'`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.json({error: console.error(error.message), sum: 0});
        }
        res.json({loans: Object.values(results)});
    });
    connection.end(); 
};

const getRepayments = function(res, req) {
    let connection = mysql.createConnection(config);
    let sql = `SELECT * FROM repayment`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.json({error: console.error(error.message), sum: 0});
        }
        res.json({payments: Object.values(results)});
    });
    connection.end(); 
};

const getTotalInterest = function(res, req) {
    let connection = mysql.createConnection(config);
    let sql = `SELECT SUM(LoanInterest) FROM loans`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.json({error: console.error(error.message), sum: 0});
        }
        res.json({sum: Object.values(results[0])[0]});
    });
    connection.end(); 
};

const getMonthIssued = function(res, req) {
    let connection = mysql.createConnection(config);
    let sql = `SELECT SUM(PrincipleAmount) FROM loans WHERE Month(STR_TO_DATE(DisbursementDate,'%m/%d/%Y')) = Month(CURRENT_DATE()) AND Year(STR_TO_DATE(DisbursementDate,'%m/%d/%Y')) = Year(CURRENT_DATE())`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.json({error: console.error(error.message), sum: 0});
        }
        res.json({sum: Object.values(results[0])[0]});
    });
    connection.end(); 
};

const getPreviousMonthIssued = function(res, req) {
    let connection = mysql.createConnection(config);
    let sql = `SELECT SUM(PrincipleAmount) FROM loans WHERE Month(STR_TO_DATE(DisbursementDate,'%m/%d/%Y')) = Month(CURRENT_DATE()) - 1 AND Year(STR_TO_DATE(DisbursementDate,'%m/%d/%Y')) = Year(CURRENT_DATE())`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.json({error: console.error(error.message), sum: 0});
        }
        res.json({sum: Object.values(results[0])[0]});
    });
    connection.end();
};

const getLatePayments = function(res, req) {
    let connection = mysql.createConnection(config);
    let sql = `SELECT SUM(PrincipleAmount) as total, SUM(LoanInterest) as interest FROM loans WHERE STR_TO_DATE(DisbursementDate,'%m/%d/%Y') > CURRENT_DATE() AND LoanStatus = 'Active'`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.json({error: console.error(error.message), sum: 0});
        }
        res.json({total: Object.values(results[0])[0] || 0, interest:  Object.values(results[0])[1] || 0});
    });
    connection.end();
};
  
module.exports = {
    getTotalIssued,
    getMonthIssued,
    getPreviousMonthIssued,
    getLatePayments,
    getTotalInterest,
    getLoans,
    getRepayments,
};





