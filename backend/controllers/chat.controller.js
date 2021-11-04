
import db from '../db/db.js';



const ChatController = {

    getById (req, res, next){
      let id = req.params.id;
    
      db.query("SELECT * FROM messages WHERE messageId="+id, function (err, q_result, fields) {

        if (err) throw err;
        console.log("ChatController.getById:" + q_result);
        res.send(q_result[0]);

      });    
    },

    getAll (req, res, next){
      
        db.query("SELECT * FROM messages where userId="+id, function (err, q_result, fields) {

          if (err) throw err;
  
          res.send(q_result);
        });    
    },

    createChat (req, res){
      var jsonObject = req.body;
      console.log(jsonObject);
  
      db.query("INSERT INTO chat (userId,userId2,chatStatus) VALUES ('"+jsonObject.userId+"', '"+jsonObject.userID+"','1');", function (err, q_result, fields) {

        if (err) throw err;

        res.send(q_result);
      });    
  },

  sendMessage (req, res){
    var jsonObject = req.body;
    console.log(jsonObject);

    db.query("INSERT INTO chat (userId,userId2,message) VALUES ('"+jsonObject.userId+"', '"+jsonObject.userID+"','"+jsonObject.message+"');", function (err, q_result, fields) {

      if (err) throw err;

      res.send(q_result);
    });    
  },

  getAllMessages (req, res, next){
    let id = req.params.id;
  
    db.query("SELECT * FROM chat WHERE userId="+id, function (err, q_result, fields) {

      if (err) throw err;

      res.send(q_result[0]);

    });    
  },
    

}

export default ChatController;

