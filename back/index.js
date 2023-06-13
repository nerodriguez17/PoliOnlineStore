const express = require('express')
const mysql = require('mysql')


const app = express()
const conection = mysql.createConnection({
  host: 'localhost',
  database: 'dbo_polionlinestore',
  user: 'root',
  password: ''
})

conection.connect(function (error) {
  if (error) {
    throw error
  } else {
    console.log('Conectado con éxito a base de datos');
  }
});


//API Inicio
app.get('/', function (req, res) {
  res.send('ok')
})

//API Usuarios
app.get('/users', function (req, res) {
  const query = 'SELECT * FROM users'
  conection.query(query, (error, response) => {

    if (error) return console.log(error.message)
    if (response.length > 0) {
      res.json(response)
    } else {
      res.json('No hay registros en la consulta de usuarios')
    }
  })
})

//llamado a usuario especifico
app.get('/users/:id', (req, res) => {
  const {
    id
  } = req.params

  const query = `SELECT * FROM users WHERE id = ${id}`
  conection.query(query, (error, response) => {

    if (error) return console.log(error.message)
    if (response.length > 0) {
      res.json(response)
    } else {
      res.json('No hay registros con el id específicado')
    }
  })
})

//Inserción de usuarios
app.post('/users/add', (req, res) => {
  const {names,lastnames} = req.body;
  
  const query = 'INSERT INTO users (names, lastnames) VALUES (?,?)';
  conection.query(query,[names, lastnames],(error, response) => {
    if (error) return console.log(error.message)
    res.json('Inserción de usuarios correcta')
  })
})

//Edición de usuarios
app.put('/users/edit/:id', (req, res) => {
    const { id } = req.params
    const { names, lastnames } = req.body

    const query = `UPDATE users SET ? names = ${names} , lastnames = ${lastnames} WHERE id = ${id}`;
    conection.query(query, (error, response) => {
      if (error) return console.log(error.message)
      res.json('Se actualizó de forma correcta el usuario')
    })
  })


app.listen(3000)
