const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root@123',
    database: 'data',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.post('/api/employees', (req, res) => {
    const employeeData = req.body;

    connection.query('INSERT INTO employees SET ?', employeeData, (error, results) => {
        if (error) {
            console.error('Error inserting data into MySQL:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(201).json({ id: results.insertId });
        }
    });
});

app.get('/api/employees', (req, res) => {
    connection.query('SELECT * FROM employees', (error, results) => {
        if (error) {
            console.error('Error fetching data from MySQL:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
