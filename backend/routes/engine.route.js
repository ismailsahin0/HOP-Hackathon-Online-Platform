import express from 'express'
import EngineController from './../controllers/engine.controller.js'

const router = new express.Router();

router.get('/recommender/user',  EngineController.getAllUserInfo); // get all Users info

router.get('/recommender/user/:id',  EngineController.getUserInfoById); // get user info by id

router.get('/recommender/group/',  EngineController.getAllGroupInfo); // get all group info

router.get('/recommender/group/:id',  EngineController.getGroupInfoOfUser); // get group info of user

router.get('/recommender/skill/',  EngineController.getAllSkillInfo); // get all group info

router.get('/recommender/users/:id',  EngineController.getRecommendedUsers); // get recommended users



export default router;