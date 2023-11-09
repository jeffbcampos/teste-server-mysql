const express = require('express')
const mysql = require('mysql')

const app = express()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: {"rejectUnauthorized":true}
})

connection.connect();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.post('/cadastro', (req, res) => {
    const user = req.body

    const query = 'INSERT INTO users SET ?'

    connection.query(query, user, (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).send({'msg': 'Usuário criado com sucesso!'})
        }
    })
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})