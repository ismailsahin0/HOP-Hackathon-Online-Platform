import db from '../db/db.js';


const VotingController = {

    getById (req, res, next){
      let id = req.params.id;
    
      db.query("SELECT * FROM voting WHERE votingId="+id, function (err, q_result, fields) {

        if (err) throw err;
        console.log("votingController.getById:" + q_result);
        res.send(q_result[0]);

      });    
    },

    getAll (req, res, next){
      
        db.query("SELECT * FROM voting", function (err, q_result, fields) {

          if (err) throw err;
  
          res.send(q_result);
        });    
    },
    createVoting (req, res){
        var jsonObject = req.body;
        console.log(jsonObject);
    
        db.query("INSERT INTO voting (groupId,eventId) VALUES ('"+jsonObject.groupId+"', '"+jsonObject.eventId+"');", function (err, q_result, fields) {

          if (err) throw err;
  
          res.send(q_result);
        });    
    },

    sendVote (req, res){
      var jsonObject = req.body;
      console.log(jsonObject);
  
      db.query("UPDATE voting SET vote = vote + 1 WHERE votingId = '" +req.params.id+ "';", function (err, q_result, fields) {

        if (err) throw err;

        res.send(q_result);
      });    
    },

    //

    getByEventId (req, res, next){
      let id = req.params.id;
    
      db.query("SELECT * FROM voting WHERE eventId="+id, function (err, q_result, fields) {

        if (err) throw err;

        res.send(q_result[0]);

      });    
    },

    getCountById (req, res, next){
      let id = req.params.id;
    
      db.query("SELECT user_count FROM voting WHERE id="+id, function (err, q_result, fields) {

        if (err) throw err;

        res.send(q_result[0]);

      });    
    },

    deleteById (req, res, next){
      let id = req.params.id;
    
      db.query("DELETE FROM voting WHERE votingId="+id, function (err, q_result, fields) {

        if (err) throw err;

        res.send(q_result);

      });    
    },

    deleteByEventId (req, res, next){
      let id = req.params.id;
    
      db.query("DELETE FROM voting WHERE eventId="+id, function (err, q_result, fields) {

        if (err) throw err;

        res.send(q_result);

      });    
    },

    updateId (req, res, next){
      let id = req.params.id;
    
      db.query("UPDATE voting SET id="+id+" WHERE eventId"+id, function (err, q_result, fields) {

        if (err) throw err;

        res.send(q_result[0]);

      });    
    },

    updateEventId (req, res, next){
      let id = req.params.id;
    
      db.query("UPDATE voting SET eventId="+id+" WHERE eventId="+id, function (err, q_result, fields) {

        if (err) throw err;

        res.send(q_result[0]);

      });    
    },

    updateVote (req, res, next){
      let vote = req.params.vote;
      let id = req.params.id;
    
      db.query("UPDATE voting SET vote="+vote+" WHERE votingId="+id, function (err, q_result, fields) {

        if (err) throw err;

        res.send(q_result[0]);

      });    
    },

    updateGroup (req, res, next){
      let group = req.params.group;
      let id = req.params.id;
    
      db.query("UPDATE voting SET groupId="+group+" WHERE votingId="+id, function (err, q_result, fields) {

        if (err) throw err;

        res.send(q_result[0]);

      });    
    },


}

export default VotingController;

