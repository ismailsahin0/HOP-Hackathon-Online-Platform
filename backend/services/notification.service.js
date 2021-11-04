const path = require('path');
const router = require('express').Router();
const Notification = require('./../notifications/post');
const ObjectID = require('mysql');

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const publicVapidKey = '<public vapid key>';

const notification = document.querySelector('.notification');

async function triggerPushNotification() {
  if ('serviceWorker' in navigator) {
    const register = await navigator.serviceWorker.register('/notification.service.js', {
      scope: '/'
    });

    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    await fetch('/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    console.error('Service workers are not supported in this browser');
  }
}

router.get('/', (req, res, next) => {
  Notification.find({}, {title: true}).exec((err, notification) => {
      res.render('index', { notification });
  });
});

router.get('/notifications/:id', (req, res, next) => {
  Notification.findOne({ _id: req.params.id }).exec((err, notification) => {
      res.render('notification', { notification });
  });
});

router.post('/notifications/:id', (req, res, next) => {
  Notification.findByIdAndUpdate(req.params.id, {body: req.body.body}, (err, post) => {
    let Sender = require('sender');
    let sender = new Sender({
        appId: process.env.SENDER_APP_ID,
        key: process.env.SENDER_APP_KEY,
        secret: process.env.SENDER_APP_SECRET,
        cluster: process.env.SENDER_APP_CLUSTER
    });

    try {
      req.checkBody('title', 'Title is required').notEmpty();
      req.checkBody('body', 'Body is required').notEmpty();
  
      // Get Errors
      let errors = req.validationErrors();
  
      if (errors) {
        res.render('add_notification', {
          title: 'Add Notification',
          errors: errors
        });
      } else {
        let notification = await Notification.create({
          title: req.body.title,
          author: req.user._id,
          body: req.body.body,
        });
        notification.save();
        req.flash('success', 'Notification Added');
        res.redirect('/');
      }
    } catch (e) {
      res.send(e);
    }

    pusher.trigger('notifications', 'post_updated', post, req.headers['x-socket-id']);
    res.send('');
  });
});

// Delete Notification
router.delete('/:id', async (req, res) => {

  try {
    if (!req.notification._id) {
      res.status(500).send();
    }
    let query = { _id: req.params.id }
    const notification = await Notification.findById(req.params.id);

    if (notification.author != req.notification._id) {
      res.status(500).send();
    } else {
      remove = await Notification.findByIdAndRemove(query);
      if (remove) {
        res.send('Success');
      }
    };
  } catch (e) {
    res.send(e);
  }

});

// Access Control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/user/login');
  }
}

module.exports.add = function(req, res, next) {
  var notification = new Notification(req.body);
  notification.save().then((doc) => {
      return res.status(200).json({
          message: "New Notification has been added successfully.",
          data: doc
      });
  }, (e) => {
      console.log(e);
      e.status = '400';
      return next(e);
  });
};

module.exports.show = function(req, res, next) {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
      console.log('Id not valid');
      return res.status(400).json({
          err: "Given notification id is not a valid id!"
      });
  }
  Notification.findById(id).then((notification) => {
      if (!notification) {
          return res.status(404).json({
              err: "No such notification with the given id!"
          });
      }
      res.send({ notification });
  }).catch(
      (e) => { res.status(400).send(); }
  );
};

module.exports.edit = function(req, res, next) {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
      console.log('Id not valid');
      return res.status(400).json({
          err: "Given notification id is not a valid id!"
      });
  }
  Notification.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((notification) => {
      if (!notification)
          return res.status(404).json({
              err: "There is no such notification with the given id!"
          });
      return res.status(200).json({
          message: "Notification updated",
          data: notification
      });
  }).catch((e) => {
      console.log(e);
      e.status = '400';
      return next(e);
  });
};


module.exports = {
  'config': path.resolve('config', 'config.js')
}
