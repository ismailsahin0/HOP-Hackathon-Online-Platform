import express from 'express'
import VotingController from '../controllers/voting.controller.js'

const votingRouter = new express.Router();

// voting
votingRouter.get('/voting/:id',  VotingController.getById); //get voting by votingId

votingRouter.get('/voting/event/:id',  VotingController.getByEventId); //get voting by event id

//votingRouter.get('/voting/count/:id', VotingController.getCountById); //get user count by id

votingRouter.get('/voting',VotingController.getAll); //get all votings

votingRouter.post('/voting',  VotingController.createVoting); //create voting

votingRouter.post('/voting/:id',  VotingController.sendVote); // send vote by votingId

votingRouter.delete('/voting/:id', VotingController.deleteById) // delete by id

votingRouter.delete('/voting/event/:id', VotingController.deleteByEventId) // delete by event id

//votingRouter.put('/voting/:id', VotingController.updateId) // update id

votingRouter.put('/voting/event/:id', VotingController.updateEventId) // update Event id

votingRouter.put('/voting/vote/:id/:vote', VotingController.updateVote) // update Vote

votingRouter.put('/voting/vote/:id/:group', VotingController.updateGroup) // update group


export default votingRouter;