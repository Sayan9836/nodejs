require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//app config
const app = express()
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//DB config
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/reminderApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => console.log('DB connected'))

//Schema and model
const reminderSchema = mongoose.Schema({
  reminderMsg: String,
  remindAt: String,
  isReminded: Boolean
})
const Reminder = new mongoose.model('reminders', reminderSchema)

// Whatsapp Reminding Functionality
setInterval(async () => {
  const list = await Reminder.find();
  if (list) {
    list.forEach((element) => {
      if (!element.isReminded) {
        const CurrentDate = new Date()
        if ((new Date(element.remindAt) - CurrentDate) < 0) {
           Reminder.findByIdAndUpdate(element._id, { isReminded: true }, (err, remindObj) => {
            if (err) {
              console.log(err);
            }

            const accountSid = process.env.ACCOUNT__SID;
            const authToken = process.env.AUTH__TOKEN;
            const client = require('twilio')(accountSid, authToken);

            client.messages
              .create({
                body: element.reminderMsg,
                from: 'whatsapp:+14155238886',
                to: 'whatsapp:+917596889179'
              })
              .then(message => console.log(message.sid))
              .done();
          })
        }
      }
    });
  }
}, 60000);

//Api routes
app.get('/getAllReminder', async (req, res) => {
  try {
    const list = await Reminder.find();
    if (list.length > 0) {
      res.send(list);
    }
  } catch (error) {
    res.status(404).send("Unable to fetch ReminderLists")
  }
})

app.post('/addReminder', async (req, res) => {
  const { remindAt,reminderMsg } = req.body
  let reminder = new Reminder({
    reminderMsg,
    remindAt,
    isReminded:false
  })
  try {
    let store = await reminder.save();
    if (store) {
      // res.send('added')
      try {
        const list = await Reminder.find();
        if (list.length > 0) {
          res.send(list);
        }
      } catch (error) {
        res.status(400).send("Unable to fetch ReminderLists")
      }
    }
  } catch (error) {
    res.status(400).send("Unable to add Reminder")
  }

});

app.delete('/deleteReminder', async (req, res) => {
  // const {id}=req.body
  try {
    const reminder = await Reminder.deleteOne({ _id: req.body.id })
    console.log(reminder);
    if (reminder) {
      try {
        const list = await Reminder.find();
        if (list.length > 0) {
          res.send(list);
        }
      } catch (error) {
        res.status(404).send("Unable to fetch ReminderLists")
      }
    }

  } catch (error) {
    res.send("Unable to delete Reminder", { error })
  }
  // res.redirect('/deleteReminder')

  //  await Reminder.deleteMany();

})


app.listen(3000, () => console.log("Backend started"))