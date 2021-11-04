import {findUserByToken} from "../controllers/user.controller.js"

// Basic user authentication by json web tokens
// Used in situations where only a logged in user can access
export function authenticate(req, res, next) {
  const token = req.header('x-auth');

  // check with 
  findUserByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    // update request object
    req.user = user; 
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).json({
      err: 'You are not authorized to make this request!',
    }); // 401 : unauthorized
  });
};
