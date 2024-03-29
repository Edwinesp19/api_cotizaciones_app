const express = require('express');
const router = express.Router();


const mysqlConnection  = require('../database.js');

// GET all Employees
let data = ""
router.get('/categoriesproducts', (req, res) => {
  
  mysqlConnection.query('SELECT * FROM categories',async  (err, rows) => {


    let result_product = rows.map(async ({ id, name}) => {

      const data = function(){
        return new Promise(function(resolve, reject){
          mysqlConnection.query(`SELECT categories.id AS id_categoria, products.id AS id_producto, products.name, products.price, products.stock FROM categories JOIN products ON ${id} = products.category_id order BY  categories.id asc`, async(err, rows2, fields)=>{
            const hj = {
              id_categorie: id,
              name_categories: name,
              products: rows2.filter((product)=> product.id_categoria === id ? product : '')
            }
            resolve(hj)
          })
        })
      }
     
    const result = await data()
    
    return result
    })
    const rs = await Promise.all(result_product)
    res.json(rs)
    
  });  
});


router.get('/products', (req, res) => {
  mysqlConnection.query('SELECT categories.id AS id_categoria, categories.name AS categoria, products.id AS id_producto, products.name AS producto, products.price AS precio, products.stock AS stock FROM categories JOIN products ON categories.id = products.category_id order BY  categories.id asc', (err, rows, fields) => {

console.log(rows)
    const result_product = rows.map(({ category_id }) => ( { category_id } ))
    if(!err) {
      res.json(result_product);
    } else {
      console.log(err);
    }
  });  
});

// GET An Employee
router.get('/categoriesproducts/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT categories.id AS id_categoria, products.id AS id_producto, products.name, products.price, products.stock FROM categories JOIN products WHERE categories.id = ?', [id], (err, rows, fields) => {
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
