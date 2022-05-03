const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all Employees
router.get('/ordersdetails', (req, res) => {
  mysqlConnection.query('SELECT order_details.id, order_id, product_id, quantity, order_details.price, description FROM order_details JOIN products ON products.id = product_id', (err, rows, fields) => {

    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An Employee
router.get('/ordersdetails/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT order_details.id, order_id, product_id, quantity, order_details.price, description FROM order_details JOIN products ON products.id = product_id WHERE order_id=?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
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
router.post('/orderdetailsput', (req, res) => {
  const {orderid_, productid_, quantity_, price_ } = req.body;
  console.log(orderid_, productid_, quantity_, price_);
  const query = `
     CALL sp_orderdetail_create(?, ?, ?, ?);
  `;
  mysqlConnection.query(query, [orderid_, productid_, quantity_, price_], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'OrderDetail Saved'});
    } else {
      console.log(err);
    }
  });
});
//  INSERT An Employee
// router.post('/', (req, res) => {
//   const {id, name, salary} = req.body;
//   console.log(id, name, salary);
//   const query = `
//     SET @id = ?;
//     SET @name = ?;
//     SET @salary = ?;
//     CALL employeeAddOrEdit(@id, @name, @salary);
//   `;
//   mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
//     if(!err) {
//       res.json({status: 'Employeed Saved'});
//     } else {
//       console.log(err);
//     }
//   });

// });

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
