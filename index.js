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

app.get('/students/:studentId', (req,res) => {
  res.send(students.filter((student) => (student.id === Number(req.params.studentId)))[0])
})

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

app.get('/grades/:studentId', (req, res) => {
  res.send(students.filter((student) => (student.id === Number(req.params.studentId)))[0].grades)
})

app.post('/grades', (req, res) => {
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

app.post('/register', (req, res) => {
  let result;
  let newStudent = req.body
  if (newStudent.firstName && newStudent.lastName) {
    let highestID = 0
    for (let student of students) {
      if (student.id > highestID) {
        highestID = student.id
      }
    }
    students.push({
      id: highestID + 1,
      firstName: newStudent.firstName,
      lastName: newStudent.lastName,
      grades: []
    })
    result = {
      "status": "success",
      "message": "The student was successfully added"
    }
  } else {
    result = {
      "status": "failed",
      "message": "The student was not added"
    }
    res.status(400)
  }
  res.json(result)
})