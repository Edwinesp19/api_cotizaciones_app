const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all Employees
router.get('/customers', (req, res) => {
  mysqlConnection.query('SELECT id AS id_client, NAME AS name , phone, mobile, email, address,reference,promotion FROM customers', (err, rows, fields) => {

    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An Employee
router.get('/customers/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT id AS id_client, NAME AS name , phone, mobile, email, address,reference,promotion FROM customers WHERE customers.id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An Employee
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM employee WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Employee Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT A Client
router.post('/clientsput', (req, res) => {
  const {name_, phone_, mobile_, email_, address_, reference_, promotion_} = req.body;
  console.log(name_, phone_, mobile_, email_, address_, reference_, promotion_);
  const query = `
     CALL sp_customer_create(?, ?, ?, ?, ?, ?, ?);
  `;
  mysqlConnection.query(query, [name_, phone_, mobile_, email_, address_, reference_, promotion_], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Client Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/:id', (req, res) => {
  const { name, salary } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @name = ?;
    SET @salary = ?;
    CALL employeeAddOrEdit(@id, @name, @salary);
  `;
  mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Employee Updated'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
