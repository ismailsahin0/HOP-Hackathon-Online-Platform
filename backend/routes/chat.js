import express from 'express'
import ChatController from '../controllers/chat.controller.js'

const chatRouter = new express.Router();

// chat
chatRouter.get('/chat/:id',  ChatController.getById); //get chat message by id

chatRouter.get('/chatuser/:id',ChatController.getAll); //get all messages by user id

chatRouter.post('/chat/:id/:id2',  ChatController.createChat); //create chat

chatRouter.post('/message/:id/:id2',  ChatController.sendMessage); // send message

chatRouter.get('/messages',ChatController.getAllMessages); //get all messages


export default chatRouter;