const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all Employees
router.get('/users', (req, res) => {
  mysqlConnection.query('SELECT * FROM users', (err, rows, fields) => {

    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An Employee
router.get('/users/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM users WHERE users.id = ?', [id], (err, rows, fields) => {
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
router.post('/clientspost', (req, res) => {
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

router.put('/clientsput/:id', (req, res) => {

  const {id_, name_, phone_, mobile_, email_, address_, reference_, promotion_} = req.body;
  console.log(id_,name_, phone_, mobile_, email_, address_, reference_, promotion_);
  const { id } = req.params;
  const query = `
     CALL sp_customer_update(?,?, ?, ?, ?, ?, ?, ?);
  `;
  mysqlConnection.query(query, [id_, name_, phone_, mobile_, email_, address_, reference_, promotion_], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Client Updated'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
