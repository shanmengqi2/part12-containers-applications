require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Contact = require('./models/contact')
app.use(express.static('public'))
const cors = require('cors')

app.use(cors())

// morgan.token('body', (req, res) => {
//   return res.locals.body || ''
// })
morgan.token('filteredBody', (req, res) => {
  return res.locals.filteredBody || ''
})

app.use((req, res, next) => {
  const oldSend = res.send
  res.send = function (data) {
    res.locals.body = data
    try {
      const obj = JSON.parse(data)
      const { name, number } = obj
      res.locals.filteredBody = JSON.stringify({ name, number })
    } catch {
      res.locals.filteredBody = data
    }
    return oldSend.apply(res, arguments)
  }
  next()
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :filteredBody'))

app.use(express.json())

//get all persons
app.get('/api/persons', (req, res) => {
  Contact.find({}).then(contacts => {
    res.json(contacts)
  })

})

// get info
app.get('/info', async (req, res) => {
  // const count = data.length
  const count = await Contact.countDocuments({})
  const timeStamp = (new Date()).toString()
  const info = '<p>PhoneBook has info for ' + count + ' people</p>'
  const timeInfo = '<p>' + timeStamp + '</p>'
  res.end(info + timeInfo)
})

// get single personInfo
app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Contact.findById(id).then(contact => {
    res.json(contact)
  })
    .catch(error => next(error))
})

// delete info
app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Contact.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

// add contact
app.post('/api/persons', (req, res, next) => {
  // const newId = generateId()
  const body = req.body

  // check content missing
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  Contact.find({ name: body.name }).then(contacts => {
    // console.log(contacts)
    if (contacts.length > 0) {
      console.log('name exists')
      return res.status(400).json({
        error: 'name exists'
      })
    } else {
      const contact = new Contact({
        name: body.name,
        number: body.number
      })
      contact.save().then(savedContact => {
        res.json(savedContact)
      })
        .catch(error => next(error))
    }
  })
})

// update contact
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Contact.findById(request.params.id)
    .then(contact => {
      if (!contact) {
        return response.status(404).end()
      }

      contact.name = name
      contact.number = number

      return contact.save().then(updatedContact => {
        response.json(updatedContact)
      })
    })
    .catch(error => next(error))
})

// unknow Endpoint
const unknownEndpoint = (request, response, next) => {
  if (request.path.startsWith('/api/')) {
    response.status(404).send({ error: 'unknown endpoint' })
  } else {
    next()
  }
}
app.use(unknownEndpoint)

// error handler
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || '3000'
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
