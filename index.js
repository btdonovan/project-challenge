const express = require('express')
const bodyParser = require('body-parser')
const { query } = require('express')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
let students = [
  {id: 1,
  lastName: 'Donovan',
  firstName: 'Benjamin',
  grades: ['A', 'B', 'A', 'C', 'D'],
  },
  {id: 2,
  lastName: 'Smith',
  firstName: 'John',
  grades: ['B', 'C', 'B', 'D', 'A']
  }
]

app.get('/students', (req, res) => {
  if (req.query.search) {
    let search = req.query.search
    res.send(students.filter((student) => (
      (student.firstName.toLowerCase().includes(search.toLowerCase()) || 
      student.lastName.toLowerCase().includes(search.toLowerCase()))
    )))
  } else {
    res.send(students)
  }
})

app.get('/student/:studentId', (req,res) => {
  console.log(req.params); 
  console.log(req.params.studentId);
  res.send(students.filter((student) => (student.id === Number(req.params.studentId)))[0])
})

app.get('/grades/:studentId', (req, res) => {
  res.send(students.filter((student) => (student.id === Number(req.params.studentId)))[0].grades)
})

app.post('/grades/', (req, res) => {
  let result;
  let newGrade = req.body
  if (newGrade.id && newGrade.grade) {
    students.filter((student) => (student.id === Number(newGrade.id)))[0].grades.push(newGrade.grade)
    result = {
      "status": "success",
      "message": "The grade was successfully recorded"
    }
  } else {
    result = {
      "status": "failed",
      "message": "The grade was not recorded"
    }
    res.status(400);
  }
  res.json(result)
})