const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all Employees
router.get('/orders', (req, res) => {
  mysqlConnection.query('SELECT orders.id AS id_order, total, items, orders.created_at AS fecha_order, customers.id AS codcli, customers.name AS nomcli FROM orders JOIN  customers ON  customers.id = orders.customer_id  ORDER BY fecha_order desc', (err, rows, fields) => {

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
  mysqlConnection.query('SELECT orders.id AS id_order, total, items, orders.created_at AS fecha_order, customers.id AS codcli, customers.name AS nomcli FROM orders JOIN  customers ON  customers.id = orders.customer_id WHERE orders.id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});
// GET An Employee
router.get('/ordersnextid', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT MAX(orders.id)+1 AS id FROM orders',(err, rows, fields) => {
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

// INSERT An Order
router.post('/orderpost', (req, res) => {
  const {total_, items_, discount_, customerid_, userid_} = req.body;
  console.log(total_, items_, discount_, customerid_, userid_);
  const query = `
     CALL sp_order_create(?, ?, ?, ?, ?);
  `;
  mysqlConnection.query(query, [total_, items_, discount_, customerid_, userid_], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Order Saved'});
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
