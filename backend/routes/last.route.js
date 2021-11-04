import express from 'express'
import LastController from '../controllers/last.controller.js'

const lastRouter = new express.Router();

lastRouter.post('/last/signup',  LastController.signUp);  //datayı json gönder 
lastRouter.get('/last/users',  LastController.getAllUsers);
lastRouter.put('/last/user/:id/:name/:email/:password', LastController.updateUser) //url den data gönderebilirsin


export default lastRouter;