const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const addedCount = await redis.getAsync("added_todos") || 0
  console.log('Current count from Redis:', addedCount)
  const newCount = Number(addedCount) + 1
  console.log('Setting new count:', newCount)
  await redis.setAsync("added_todos", newCount)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.status(200).send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todo = req.todo
  todo.text = req.body.text
  todo.done = req.body.done
  try {
    todo.save()
    res.status(200).send(todo);
  } catch (error) {
    console.log(error)
    res.status(403).send(error);
  }


});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
