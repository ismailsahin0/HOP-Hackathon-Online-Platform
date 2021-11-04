import db from '../db/db.js';
import _ from 'lodash'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export function add(req, res) {
  let pass = req.body.password;
  if (pass.length < 6) {
    res.status(400).json({
      err: "Password length should be greater than 5!"
    });
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(pass, salt, (err, hash) => {
      var user = new User(req.body);
      user.password = hash;
      user.save().then(() => {
        return user.generateAuthToken();
      }).then((token) => {
        res.header('x-auth', token).send(user);
      }).catch((e) => {
        res.status(400).send(e);
      });
    });
  });
}

export function findUserByToken(token) {
  db.query("SELECT * FROM user WHERE token=" + token, function (err, user, fields) {
    let decoded;
    if (err) throw err;
    try {
      decoded = jwt.verify(user[0].token, "akljglkajg;la21*"); // jwt secret
    } catch (e) {
      return Promise.reject();
    }

    db.query(`SELECT * FROM user WHERE userid=${user[0].id} AND token=${user[0].token}`, function (err, q_res, fields) {
      if (err) throw err;
      Promise.resolve(q_res[0]);
    });
  });

}

export function register(req, res) {
  db.query("SELECT * FROM user WHERE token=" + req.token, async function (err, user, fields) {
    if (res.email) return res.status(400).send('Email already exists')
    const user1 = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password)
    })

    try {
      const savedUser = await user1.save();
      res.send(savedUser);
    } catch (error) {
      console.log(error);
      res.status(400).send(error)
    }

  });

}

export function login(req, res) {
  db.query("SELECT * FROM user WHERE email=" + req.email, function (err, user, fields) {
    if (!res) return res.status(400).send('Email or password cant be found');

    const match = bcrypt.compareSync(req.body.password, selectUser.password);
    if (!match) return res.status(400).send('login fail')

    const token = jwt.sign({ id: selectUser._id, admin: selectUser.admin }, `${process.env.MY_SECRET_TOKEN}`)


    res.header('auth', token)
    res.redirect('/admin/account');

  });

}

export function getUserById(req, res, next) {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    console.log('Id not valid');
    return res.status(404).json({
      err: "Given user id is not a valid id!"
    });
  }
  User.findById(id).then((user) => {
    if (!user)
      return res.status(404).json({
        err: "There is no such user with the given id!"
      });
    res.send(user);
  }).catch(
    (e) => { res.status(400).send(); }
  );
}

export function deleteUser(req, res, next) {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    console.log('Id not valid');
    return res.status(400).json({
      err: "Given user id is not a valid id!"
    });
  }
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).json({
      err: "Could not remove the x-auth token!"
    });
  });
  User.findByIdAndRemove(id).then((doc) => {
    if (!doc) {
      return res.status(404).json({
        err: "There is no such user with the given id!"
      });
    }
    res.status(200).send(doc);
  }).catch((e) => {
    return res.status(400).send();
  });
}


// login(req, res, next){     
//   const body = _.pick(req.body, ['email', 'password']);
//   User.findByCredentials(body.email, body.password).then((user) => {
//     return user.generateAuthToken().then((token) => {
//       res.header('x-auth', token).send(user);
//     });
//   }).catch((e) => {
//     res.status(400).send();
//   })    
// },

export function edit(req, res, next) {
  res.type('application/json');
  console.log('Inside user edit function');
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    console.log('Id not valid');
    return res.status(400).json({
      err: 'Given user id is not a valid id!',
    });
  }
}

export function logout(req, res, next) {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).json({
      err: 'Could not remove the x-auth token!',
    });
  });
}

export function addEvent(req, res) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(id, salt, (err, hash) => {
      var event = new Event(req.body);
      event.id = hash;
      event.save().then(() => {
        return event.generateAuthToken();
      }).then((token) => {
        res.header('x-event', token).send(event);
      }).catch((e) => {
        res.status(400).send(e);
      });
    });
  });
}

export function getEventById(req, res, next) {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    console.log('Id not valid');
    return res.status(404).json({
      err: "Given event id is not a valid id!"
    });
  }
  Event.findById(id).then((event) => {
    if (!event)
      return res.status(404).json({
        err: "There is no such event with the given id!"
      });
    res.send(event);
  }).catch(
    (e) => { res.status(400).send(); }
  );
}

export function deleteEvent(req, res, next) {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    console.log('Id not valid');
    return res.status(400).json({
      err: "Given event id is not a valid id!"
    });
  }
  Event.findByIdAndRemove(id).then((doc) => {
    if (!doc) {
      return res.status(404).json({
        err: "There is no such event with the given id!"
      });
    }
    res.status(200).send(doc);
  }).catch((e) => {
    return res.status(400).send();
  });
}

export function editEvent(req, res, next) {
  res.type('application/json');
  console.log('Inside event edit function');
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    console.log('Id not valid');
    return res.status(400).json({
      err: 'Given event id is not a valid id!',
    });
  }
}

export function getAllGroups(id, res) {

  if (!ObjectID.isValid(id)) {
    console.log('Event id not valid');
    return res.status(404).json({
      err: "Given Event id is not a valid id!"
    });
  }
  Groups.getGroupsWithEventID(id).then((groups) => {
    res.send(groups);
  }).catch(
    (e) => { res.status(400).send(); }
  );
}

export function getUserGroupChatInfoById (req, res, next){
  let id = req.params.id;

  db.query("SELECT g.name, g.groupId FROM users u, group g where userId = groupId and userId="+id, function (err, q_result, fields) {

    if (err) throw err;

    res.send(q_result[0]);

  });    
}

export function getAllUsers(id, res) {
  if (!ObjectID.isValid(id)) {
    console.log('Event id not valid');
    return res.status(404).json({
      err: "Given Event id is not a valid id!"
    });
  }
  Users.getUsersWithEventID(id).then((users) => {
    res.send(users);
  }).catch(
    (e) => { res.status(400).send(); }
  );
}