const express = require('express')
const mysql = require('mysql')

const app = express()

const connection = mysql.createConnection({
    host: 'aws.connect.psdb.cloud',
    user: 'tb18o64xbveul6u8w6kc',
    password: 'pscale_pw_AZAm2k4olEBvP5V5VW1aJAzq6LtK1EO1wolBfpefHF6',
    database: 'rec',
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