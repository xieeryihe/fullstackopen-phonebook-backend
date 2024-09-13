const express = require('express')
const app = express()

app.use(express.json())

persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)  // 如果 id 不为数字，则会返回 NaN
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).send(`Error: Person not found.`)
    }
})

app.get('/info', (request, response) => {
    const requestTime = new Date();
    // console.log(`Request received at: ${requestTime}`);
    response.send(`
        <div>Phonebook has info for ${persons.length} people.</div>
        <div>${requestTime}</div>    
    `)
})

app.delete('/api/persons/:id', ({ params: { id } }, response) => {
    const person_id = Number(id)
    if (person_id) {
        persons = persons.filter(person => person.id !== person_id)
        response.status(204).send(`Delete person with id ${person_id} success.`)
    } else {
        response.status(404).send(`Person with id ${person_id} not exist.`)
    }
})

app.post('/api/persons', (request, response) => {
    const person = request.body
    console.log(person);
    
    if (!person.name) {
        return response.status(400).json({
          error: 'content missing'
        })
    }
    let new_id = 0
    while (true) {
        new_id = Math.floor(Math.random() * 1000000) // 随机生成一个 id
        const p = persons.find(person => person.id === new_id)
        if (!p) break
    }
    const newPerson = {
        id: new_id,
        ...person
    }
    persons = persons.concat(newPerson)
    response.json(person)
  })

const port = 3001
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})
