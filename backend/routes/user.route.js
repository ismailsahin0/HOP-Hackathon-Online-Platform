import express from 'express';
import * as UserController from './../controllers/user.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = new express.Router();

// User
router.get('/user/:id',  UserController.getUserById); // get user by id

router.post('/signUp', UserController.add); // user add

router.post('/register', UserController.register ); //register

router.post('/login', UserController.login ); //login

router.patch('/user/:id', authenticate, UserController.edit); // edit user 

router.delete('/user/:id', UserController.deleteUser); //delete user

// user has to be logged in first to be able to log out
router.delete('/user/me', authenticate, UserController.logout); // logout route 


// User-Group Info
router.get('/groups',UserController.getAllGroups);

router.get('/users/',UserController.getAllUsers); 


// admin routes
router.get('/', authenticate, (req,res)=>{
    if(req.user.admin){
        res.send('admin')
    } else{
        res.status(401).send('Not an admin request!! - Access denied!')
    }
})

router.get('/account', authenticate, (req,res)=>{
    res.render('profile')
})

router.get('/user/group/chat/:id',UserController.getUserGroupChatInfoById); // get users group chat info 

export default router;