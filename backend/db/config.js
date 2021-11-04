const express = require('express');
const db = require('mysql').connect('mysql://localhost');
const fs = require("fs");
const dotenv = require("dotenv");
const cors = require('cors')
const webpush = require('web-push')
const note = require('note');
const Notification = require('../models/notification');
const notifier = require('Notifier');
const path = require('path');

const app = express()

dotenv.config()

app.use(cors())

if (window.Notification) {
  Notification.requestPermission(() => {
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.register('./user.controller.js')
        .then((note) => {
          note.showNotification('Event Notifications');
        });
    }
  });
}

webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)


app.get('/', (req, res) => {
  res.send('Delivered')
})

app.post('/notifications', (req, res) => {
  const notification = req.body

  console.log(notification)

  webpush.sendNotification(notification, payload)
    .then(result => console.log(result))
    .catch(e => console.log(e.stack))

  res.status(200).json({'success': true})
});

app.listen(3000, () => console.log('The server has been started on the port 3000'))

Notification.remove({})
        .then(() => {
            const notifications = [];
            for (let i = 0; i < 5; i++) {
              notifications.push({
                    title: note.lorem.sentence(),
                    body: note.lorem.paragraph()
                });
            }
            return Notification.create(notifications);
        })
        .then(() => {
            process.exit();
        })
        .catch((e) => {
            console.log(e);
            process.exit(1);
        });

Notifier.notify(
{
  title: 'HackathonXXX', // To test
  message: 'About Time Change',
  icon: path.join(__dirname), // Absolute path
  sound: true, 
  icon: 'Terminal Icon', // Absolute Path to Triggering Icon
  contentImage: undefined, // Absolute Path to Attached Image
  open: undefined, // URL to open on Click
  wait: true,
  timeout: 5, // Takes precedence over wait if both are defined.
  closeLabel: undefined, // String. Label for cancel button
  actions: undefined, // String | Array<String>. Action label or list of labels in case of dropdown
  dropdownLabel: undefined, // String. Label to be used if multiple actions
  reply: false // Boolean. If notification should take input. Value passed as third argument in callback and event emitter.
},
  function (err, response, metadata) {
    console.log(response, metadata);
  // Response is response from notification
  // Metadata contains activationType, activationAt, deliveredAt
});
        
  notifier.on('click', function (notifierObject, options, event) {
  // Triggers if `wait: true` and user clicks notification
  });
        
  notifier.on('timeout', function (notifierObject, options) {
  // Triggers if `wait: true` and notification closes
  });

module.exports = {
    development: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: 3000,
      dialect: "mysql",
      dialectOptions: {
        bigNumberStrings: true,
      },
    },
}    