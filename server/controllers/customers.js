const mysql = require('mysql');
const config = require('../db/config');

const getCustomers = function(res, req) {
    let connection = mysql.createConnection(config);
    let sql = `SELECT * FROM borrower LEFT JOIN member ON borrower.OwnerID = member.MemberID`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.json({error: console.error(error.message), sum: 0});
        }
        res.json({customers: Object.values(results)});
    });
    connection.end(); 
};

const getCustomerCount = function(res, req) {
    let connection = mysql.createConnection(config);
    let sql = `SELECT COUNT(*) FROM borrower`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.json({error: console.error(error.message), count: 0});
        }
        res.json({count: Object.values(results[0])[0]});
    });
    connection.end(); 
};

const getCustomerCurrentMonthCount = function(res, req) {
    let connection = mysql.createConnection(config);
    let sql = `SELECT COUNT(*) FROM (SELECT DISTINCT MemberId FROM loans WHERE FORMAT(DisbursementDate, 'yyyy-MM-dd' ) = Month(CURRENT_DATE())) AS subquery`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.json({error: console.error(error.message), monthCount: 0});
        }
        res.json({monthCount: Object.values(results[0])[0]});
    });
    connection.end(); 
};
  
module.exports = {
    getCustomerCount,
    getCustomerCurrentMonthCount,
    getCustomers,
};





