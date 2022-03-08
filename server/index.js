const express = require('express')
const app = express();
const mysql = require('mysql2')
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "54qmfmh8",
    database: "debtSystem",
});

app.post('/create', (req, res) => {
    const payer = req.body.payer;
    const payee = req.body.payee;
    const event = req.body.event;
    const date = req.body.date;
    const amount = req.body.amount;

    db.query('INSERT INTO entries (payer, payee, event, date, amount) VALUES (?,?,?,?,?)', 
    [payer, payee, event, date, amount], 
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send("Values Inserted")
        }
    })
})

app.get('/entries', (req, res) => {
    db.query("SELECT * FROM entries", (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.delete('/delete/:id', (req,res) => {
    const id = req.params.id
    db.query("DELETE FROM entries WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result);
        }
    })
})

app.listen(3001, ()=> {
    console.log("Your server is running on 3001");
});