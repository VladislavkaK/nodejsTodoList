const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM products';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'react_sql'
});

connection.connect(err => {
    if (err) {
        return err;
    }
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('go to /products 1')
});

// добавление товаров в таблицу products в mysql
app.get('/products/add', (req, res) => {
    const { name, price } = req.query;
    const INSERT_PRODUCT_QUERY = `INSERT INTO products (name, price) VALUES ('${name}', ${price})`;
    
    connection.query(INSERT_PRODUCT_QUERY, (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            return res.send('Продукт успешно добавлен');
        }
    });
});

app.get('/products', (req, res) => {
    connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            });
        }

    });
});

app.listen(4000, () => {
    console.log(`Products server listening on port 4000`)
});