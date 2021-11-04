import db from '../db/db.js';


const LastController = {
    getAllUsers (req, res, next){
        db.query("SELECT * FROM user", function (err, q_result, fields) {

          if (err) throw err;
  
          res.send(q_result);
        });    
    },

    //doldurmak istemedeğin valuelara "" gönderebilirsin
    signUp (req, res){
        var jsonObject = req.body;
        db.query("INSERT INTO user (name,groupId,rank,city,email,password) VALUES ('"+jsonObject.name+"','"+jsonObject.groupId+"', '"+jsonObject.rank+"','"+jsonObject.city+"','"+jsonObject.email+"','"+jsonObject.password+"');", function (err, q_result, fields) {

          if (err) throw err;
  
          res.send(q_result);
        });    
    },

    updateUser (req, res, next){
        let password = req.params.password;
        let email = req.params.email;
        let name = req.params.name;
        let id = req.params.id;
      
        db.query("UPDATE user SET name="+name+",email="+email+",password="+password+" WHERE votingId="+id, function (err, q_result, fields) {
  
          if (err) throw err;
  
          res.send(q_result[0]);
  
        });    
      },


}

export default LastController;

