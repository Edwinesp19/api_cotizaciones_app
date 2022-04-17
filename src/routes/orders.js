const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all Employees
router.get('/orders', (req, res) => {
  mysqlConnection.query('SELECT orders.id AS id_order, total, orders.created_at AS fecha_order, customers.id AS codcli, customers.name AS nomcli FROM orders JOIN  customers ON  customers.id = orders.customer_id  ORDER BY fecha_order desc', (err, rows, fields) => {

    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An Employee
router.get('/orders/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT orders.id AS id_order, total, orders.created_at AS fecha_order, customers.id AS codcli, customers.name AS nomcli FROM orders JOIN  customers ON  customers.id = orders.customer_id WHERE orders.id = ?', [id], (err, rows, fields) => {
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

// INSERT An Employee
router.post('/', (req, res) => {
  const {id, name, salary} = req.body;
  console.log(id, name, salary);
  const query = `
    SET @id = ?;
    SET @name = ?;
    SET @salary = ?;
    CALL employeeAddOrEdit(@id, @name, @salary);
  `;
  mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Employeed Saved'});
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
