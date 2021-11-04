const express = require('express')
const router = express.Router()
const { events } = require('../db/data')
const { authUser } = require('../auth')
const { canViewEvent, canDeleteEvent, scopedEvents } = require('../permissions/event')

router.get('/', authUser, (req, res) => {
  res.json(scopedEvents(req.user, events))
})

router.get('/:eventId', setEvent, authUser, authGetEvent, (req, res) => {
  res.json(req.event)
})

router.delete('/:eventId', setEvent, authUser, authDeleteEvent, (req, res) => {
  res.send('Deleted Event')
})

function setEvent(req, res, next) {
  const eventId = parseInt(req.params.eventId)
  req.event = events.find(event => event.id === eventId)
  
  if (req.event == null) {
    res.status(404)
    return res.send('Event not found')
  }
  next()
}

function authGetEvent(req, res, next) {
  if (!canViewEvent(req.user, req.event)) {
    res.status(401)
    return res.send('Not Allowed')
  }

  next()
}

function authDeleteEvent(req, res, next) {
  if (!canDeleteEvent(req.user, req.event)) {
    res.status(401)
    return res.send('Not Allowed')
  }

  next()
}

module.exports = router