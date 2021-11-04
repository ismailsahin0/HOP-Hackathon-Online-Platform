
const HackathonController = {

  addEvent(req, res) {
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
  },

  getLivestreamDetails(req, res, next) {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
      return res.status(400).json({
        err: "Given event id is not a valid id!"
      });
    }
    Event.findById(id).then((event) => {
      if (!event || !event.livestream)
        return res.status(404).json({
          err: "There is no such event data found!"
        });
      res.send(event.livestream);
    }).catch(
      (e) => { res.status(400).send(); }
    );
  },

  getEventById(req, res, next) {
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
  },

  deleteEvent(req, res, next) {
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
  },

  editEvent(req, res, next) {
    res.type('application/json');
    console.log('Inside event edit function');
    const id = req.params.id;
    Event.findById(id).then((event) => {
      if (!ObjectID.isValid(id)) {
        console.log('Id not valid');
        return res.status(400).json({
          err: 'Given event id is not a valid id!',
        });
      }
      res.send(event);
    }).catch(
      (e) => { res.status(400).send(); }
    );
  },

  getUsersByEventId(req, res, next) {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
      console.log('Id is not valid');
      return res.status(404).json({
        err: "Event cannot be found!"
      });
    }
    Event.findById(id).then((users) => {
      if (!users)
        return res.status(404).json({
          err: "There is no such user with the given event!"
        });
      res.send(users);
    }).catch(
      (e) => { res.status(400).send(); }
    );
  },

  getGroupsByEventId(req, res, next) {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
      console.log('Id is not valid');
      return res.status(404).json({
        err: "Event cannot be found!"
      });
    }
    Event.findById(id).then((groups) => {
      if (!groups)
        return res.status(404).json({
          err: "There is no such group with the given event!"
        });
      res.send(groups);
    }).catch(
      (e) => { res.status(400).send(); }
    );
  },

  editEventUsers(req, res, next) {
    res.type('application/json');
    console.log('Inside event edit users');
    const id = req.params.id;
    Event.findById(id).then((event) => {
      if (!ObjectID.isValid(id)) {
        console.log('Id not valid');
        return res.status(400).json({
          err: 'Given event id is not a valid id!',
        });
      }
      res.send(event);
    }).catch(
      (e) => { res.status(400).send(); }
    );
  },

  editEventGroups(req, res, next) {
    res.type('application/json');
    console.log('Inside event edit groups');
    const id = req.params.id;
    Event.findById(id).then((event) => {
      if (!ObjectID.isValid(id)) {
        console.log('Id not valid');
        return res.status(400).json({
          err: 'Given event id is not a valid id!',
        });
      }
      res.send(event);
    }).catch(
      (e) => { res.status(400).send(); }
    );
  },

  getEventDocuments(req, res, next) {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
      console.log('Event id is not valid');
      return res.status(404).json({
        err: "Event cannot be found!"
      });
    }
    Event.findById(id).then((users) => {
      if (!users)
        return res.status(404).json({
          err: "There is no document with the given event!"
        });
      res.send(users);
    }).catch(
      (e) => { res.status(400).send(); }
    );
  },

  getAllJuries(req, res, next) {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
      console.log('Event id is not valid');
      return res.status(404).json({
        err: "Event cannot be found!"
      });
    }
    Event.findById(id).then((users) => {
      if (!users)
        return res.status(404).json({
          err: "There is no juries with the given event!"
        });
      res.send(users);
    }).catch(
      (e) => { res.status(400).send(); }
    );
  },


  getJurieById(req, res, next) {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
      console.log('Jurie id is not valid');
      return res.status(404).json({
        err: "Jurie cannot be found!"
      });
    }
    Event.findById(id).then((users) => {
      if (!users)
        return res.status(404).json({
          err: "There is no jurie with the given event!"
        });
      res.send(users);
    }).catch(
      (e) => { res.status(400).send(); }
    );
  },

  getPEventUserInfo(req, res, next) {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
      console.log('Id is not valid');
      return res.status(404).json({
        err: "Event cannot be found!"
      });
    }
    Event.findById(id).then((groups) => {
      if (!groups)
        return res.status(404).json({
          err: "There is no such user in the past event!"
        });
      res.send(groups);
    }).catch(
      (e) => { res.status(400).send(); }
    );
  },

  getPEventGroupInfo(req, res, next) {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
      console.log('Id is not valid');
      return res.status(404).json({
        err: "Group info cannot be found!"
      });
    }
    Event.findById(id).then((groups) => {
      if (!groups)
        return res.status(404).json({
          err: "There is no such group in the past event!"
        });
      res.send(groups);
    }).catch(
      (e) => { res.status(400).send(); }
    );
  }

}

export default HackathonController;

