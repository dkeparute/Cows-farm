// EXPRESS SERVER
const express = require('express')
const app = express()
const port = 3003

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
// SQL
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "agurkas",
    password: "agurkas",
    database: "agurkas"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
// CORS
const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());
// ROUTER
app.get('/labas/:id', (req, res) => {
    res.send(`labas tau ${req.params.id} `)
})
app.get('/test', (req, res) => {
    res.send(JSON.stringify({ test: 'OK' }))
})
// READ NODE
app.get('/cow_farm', (req, res) => {
    const sql = `
    SELECT *
    FROM cow_farm
    `;
    con.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})
//DELETE NODE
app.delete('/cow_farm/:id', (req, res) => {
    const sql = `
        DELETE FROM cow_farm
        WHERE id = ?
        `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})
// CREATE NODE 
app.post('/cow_farm', (req, res) => {
    const sql = `
        INSERT INTO cow_farm
        (name, weight, total_milk, last_milking_time, day_milk)
        VALUES (?, ?, ?, ?, ?)
    `;
    con.query(sql, [
        req.body.name,
        req.body.weight,
        req.body.total_milk,
        req.body.last_milking_time,
        req.body.day_milk
    ], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})
// EDIT NODE
app.put('/cow_farm/:id', (req, res) => {
    const sql = `
        UPDATE cow_farm
        SET name = ?, weight = ?, last_milking_time = ?, total_milk = ?, day_milk = ?
        WHERE id = ?
    `;
    con.query(sql, [
        req.body.name,
        req.body.weight,
        req.body.last_milking_time,
        parseFloat(req.body.total_milk) + parseFloat(req.body.day_milk),
        req.body.day_milk,
        req.params.id
    ], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})
// STATS
app.get('/stats', (req, res) => {
    const sql = `
  SELECT COUNT(id) as cowsCount, SUM(total_milk+day_milk) as milkCount
  FROM cow_farm
  `;
    // console.log(req.query.s);
    con.query(sql, ['%' + req.query.s + '%'], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})