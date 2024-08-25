const express = require('express')
const router = express.Router()
const Subscriber = require('../subscriber')

//Getting all
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


//Getting One
router.get('/:id', getSubscriber, (req, res) => {
  res.send(res.subscriber.name);

})


// Creating one
router.post('/create', async (req, res) => {
  let subscriber = new Subscriber({
    name: req.body.name,
    subscribeToChannel: req.body.subscribeToChannel
  })
  try {
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


//Updating one
router.patch('/:id', getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }

  if (req.body.subscribeToChannel != null) {
    res.subscriber.subscribeToChannel = req.body.subscribeToChannel;
  }

  try {
    const updatedData = await res.subscriber.save()
    res.json(updatedData)
  } catch (error) {
    res.status(400).json({ message: 'Updation failed ' })
  }
})

// deleting one
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove()
    res.json({ message: 'Deleted Succesfully' })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

async function getSubscriber(req, res, next) {
  let subscriber
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber == null) {
      return res.status(404).json({ message: 'cannot find subscriber' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.subscriber = subscriber;
  next();
}

module.exports = router;