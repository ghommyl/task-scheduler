var express = require('express')
var router = express.Router()

var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_PASSWORD
})
connection.query('CREATE DATABASE IF NOT EXISTS task_scheduler')
connection.query('USE task_scheduler')
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'task_scheduler'
})

router.post('/get-tasks', (req, res) => {
  pool.query('SELECT * FROM tasks', (err, result) => {
    if (err) {
      console.error('Error:', err.message)
      return res.status(500).send({ error: 'Database query failed' })
    }
    res.status(200).send({ tasks: result })
  })
})

function formatDate(date) {
  return date ? date.slice(0, 16).replace('T', ' ') : null
}

router.post('/update-task', (req, res) => {
  console.log(req['body'])
  body = req['body']
  pool.query('UPDATE tasks SET title = ?, description = ?, end_date = ?, has_description = ?, has_end_date = ? WHERE id = ?',
    [body['title'], body['description'], formatDate(body['end_date']), body['has_description'], body['has_end_date'], body['id']],
    (err, result) => {
      if (err) {
        console.error('Error:', err)
        return res.status(500).send({ error: 'Database query failed' })
      }
      res.sendStatus(200)
    }
  )
})

router.post('/add-task', (req, res) => {
  pool.query("INSERT INTO tasks VALUES (NULL, '', '', NULL, false, false)",
    (err, result) => {
      if (err) {
        console.error('Error:', err.message)
        return res.status(500).send({ error: 'Database query failed' })
      }
      console.log('Result:', result)
      res.status(200).send({ result: result })
    }
  )
})

router.post('/delete-task', (req, res) => {
  console.log(req['body'])
  body = req['body']
  pool.query('DELETE FROM tasks WHERE id = ?', [body['id']], (err, result) => {
    if (err) {
      console.error('Error:', err.message)
      return res.status(500).send({ error: 'Database query failed' })
    }
    res.sendStatus(200)
  })
})

module.exports = router
