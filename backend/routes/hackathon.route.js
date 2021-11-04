import express from 'express'
import HackathonController from './../controllers/hackathon.controller.js'

const router = new express.Router();

// Hackathon

router.get('/event/:id',  HackathonController.getEventById); // get event by id

router.get('/event/:id/livestream',  HackathonController.getLivestreamDetails);

router.post('/addEvent', HackathonController.addEvent); // event add

router.patch('/event/:id', HackathonController.editEvent); // edit event 

router.delete('/event/:id', HackathonController.deleteEvent); //delete event

router.get('/event-user/:id', HackathonController.getUsersByEventId); //gets the users who is participant in event

router.get('/event-group/:id', HackathonController.getGroupsByEventId); // gets the groups who is participant in event

router.patch('/users', HackathonController.editEventUsers); // edit event users

router.patch('/groups', HackathonController.editEventGroups); // edit event groups

router.get('/event/documents',HackathonController.getEventDocuments); // get event documents

router.get('/event/juries', HackathonController.getAllJuries); // get event juries

router.get('/event/juries/:id', HackathonController.getJurieById); // get jurie by id


export default router;