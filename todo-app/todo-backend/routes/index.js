const express = require('express');
const router = express.Router();
const redis = require('../redis')
const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (_, res) => {
  const addedCount = await redis.getAsync("added_todos")
  console.log('Raw value from Redis:', addedCount, 'Type:', typeof addedCount)
  const count = addedCount ? Number(addedCount) : 0
  console.log('Sending count:', count)
  res.send({ "added_todos": count })
})

module.exports = router;
