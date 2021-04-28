const Joi = require('joi')
const express = require('express');
const app = express();
var cors = require('cors')
app.use(cors())
app.use(express.json())
app.use('/', express.static('./public'));

///////////////////////////////////////////////////////////////////////////////
/////Schemas///////////////////////////////////////////////////////////////////
const student_schema = Joi.object({
    name: Joi.string().regex(/^[A-Za-z\-']+$/).required(),
    code: Joi.string().min(7).max(7).regex(/^[0-9]+$/).required(),
})
const course_schema = Joi.object({
    name: Joi.string().min(5).required(),
    code: Joi.string().regex(/^[a-zA-Z]{3}[0-9]{3}$/).required(),
    description: Joi.string().max(200),
})
///////////////////////////////////////////////////////////////////////////////
////DUMMY DATABASE/////////////////////////////////////////////////////////////
let students = {
    incrementor: 8,
    list: [
        {
            name: 'Ahmed',
            code: '1600111',
            id: 1
        },
        {
            name: 'Hazem',
            code: '1600469',
            id: 2
        },
        {
            name: 'Mina',
            code: '1600712',
            id: 3
        },
        {
            name: 'Mona',
            code: '1600812',
            id: 4
        },
        {
            name: 'Sara',
            code: '1600860',
            id: 5
        },
        {
            name: 'Tarek',
            code: '1600910',
            id: 6
        }
    ]
}
///////////////////////////////////////////////////////////////////////////////
let courses = {
    incrementor: 8,
    list: [
        {
            name: 'Software Engineering',
            code: 'CSE412',
            id: 1,
            description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
        },
        {
            name: 'Software Engineering',
            code: 'CSE412',
            id: 2,
            description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
        },
        {
            name: 'Software Engineering',
            code: 'CSE412',
            id: 3,
            description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
        },
        {
            name: 'Software Engineering',
            code: 'CSE412',
            id: 4,
            description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
        }
    ]
}

///////////////////////////////////////////////////////////////////////////////
////CREATE/////////////////////////////////////////////////////////////////////
app.post('/api/students/', (req, res) => {
    const {error} = student_schema.validate(req.body)
    if (error) {
        res.status(400).send('Error 400: ' + error.message)
        return
    }
    const student = {
        name: req.body.name,
        code: req.body.code,
        id: students.incrementor + 1
    }
    students.list.push(student)
    students.incrementor += 1
    res.send(student)
});
///////////////////////////////////////////////////////////////////////////////
app.post('/api/courses/', (req, res) => {
    const {error} = course_schema.validate(req.body)
    if (error) {
        res.status(400).send('Error 400: ' + error.message)
        return
    }
    const course = {
        name: req.body.name,
        code: req.body.code,
        id: courses.incrementor + 1,
        description: req.body.description || "N/A"
    }
    courses.list.push(course)
    courses.incrementor += 1;
    res.send(course)
});
///////////////////////////////////////////////////////////////////////////////
////REQUEST////////////////////////////////////////////////////////////////////
app.get('/api/courses/', (req, res) => {
    res.send(courses.list)
});
app.get('/api/courses/:id', (req, res) => {
    const course = courses.list.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        res.status(404).send('Error 404: not found')
        return
    }
    res.send(course)
});
///////////////////////////////////////////////////////////////////////////////
app.get('/api/students/', (req, res) => {
    res.send(students.list)
});

app.get('/api/students/:id', (req, res) => {
    const student = students.list.find(c => c.id === parseInt(req.params.id))
    if (!student) {
        res.status(404).send('Error 404: not found')
        return
    }
    res.send(student)
});
///////////////////////////////////////////////////////////////////////////////
////UPDATE/////////////////////////////////////////////////////////////////////
app.put('/api/courses/:id', (req, res) => {
    //Check
    const course = courses.list.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        res.status(404).send('Error 404: not found')
        return
    }
    //Validate
    const {error} = course_schema.validate(req.body)
    if (error) {
        res.status(400).send('Error 400: ' + error.message)
        return
    }
    //Update
    course.name = req.body.name;
    course.code = req.body.code;
    course.description = req.body.description || course.description;
    //Send
    res.send(course)
})
///////////////////////////////////////////////////////////////////////////////
app.put('/api/students/:id', (req, res) => {
    //Check
    const student = students.list.find(c => c.id === parseInt(req.params.id))
    if (!student) {
        res.status(404).send('Error 404: not found')
        return
    }
    //Validate
    const {error} = student_schema.validate(req.body)
    if (error) {
        res.status(400).send('Error 400: ' + error.message)
        return
    }
    //Update
    student.name = req.body.name;
    student.code = req.body.code;
    //Send
    res.send(student)
})
///////////////////////////////////////////////////////////////////////////////
////DELETE/////////////////////////////////////////////////////////////////////
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.list.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        res.status(404).send('Error 404: not found')
        return
    }
    courses.list.splice(courses.list.indexOf(course), 1)
    res.send({})
});
///////////////////////////////////////////////////////////////////////////////
app.delete('/api/students/:id', (req, res) => {
    const student = students.list.find(c => c.id === parseInt(req.params.id))
    if (!student) {
        res.status(404).send('Error 404: not found')
        return
    }
    students.list.splice(students.list.indexOf(student), 1)
    res.send({})
});
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}...`));