
import db from '../db/db.js';

const EngineController = {

    getAllUserInfo (req, res, next){
        db.query("SELECT * FROM user", function (err, q_result, fields) {
  
          if (err) throw err;
  
          res.send(q_result);
  
        });    
    },

    getUserInfoById (req, res, next){
        let id = req.params.id;
    
        db.query("SELECT * FROM user WHERE userId="+id, function (err, q_result, fields) {
  
          if (err) throw err;
  
          res.send(q_result[0]);
  
        });    
    },

    getAllGroupInfo (req, res, next){
    
        db.query("select * from group1", function (err, q_result, fields) {
  
          if (err) throw err;
  
          res.send(q_result);
  
        });    
    },

    getGroupInfoOfUser (req, res, next){
        let id = req.params.id;
    
        db.query("select g.groupId, g.eventID, g.name from group1 g, user u where g.groupId = u.userId and u.userId="+id, function (err, q_result, fields) {
  
          if (err) throw err;
  
          res.send(q_result[0]);
  
        });    
    },

    getAllSkillInfo(req, res, next){
    
      db.query("select * from skills", function (err, q_result, fields) {

        if (err) throw err;

        res.send(q_result);

      });    
    },

    async getRecommendedUsers(req, res, next){
    
      var userid=req.params.id;
      var userskills = await getUserSkills(userid);
      var userIds = await getUserIds();
      console.log(userskills);

      var result = this.getRecommendedUsers(userskills,userIds);

      return result;
      
    }
}


function getUserIds2(){
  return db.query("select distinct userId from user;", function (err, q_result, fields) {
    if (err) throw err;
    return q_result;
  });    
}

/*function getUserIds1(){
  return db.query("select distinct userId from user;", function (err, q_result, fields) {
    if (err) throw err;
    return q_result;
  });    
}*/

var getUserSkills = function (id) {
  return new Promise(function (resolve, reject) {
      var sql = `select userskill.skillid from userskill, user where user.userId=userskill.userId and user.userId=?`;
      db.query(sql, [id], function (err, result) {
          if (!err) {
              resolve(result);
          } else {
              resolve({
                  status: "error",
                  message: "Error Getting Data",
                  debug: err
              });
          }
      });
  });
};

var getUserIds = function (id) {
  return new Promise(function (resolve, reject) {
      var sql = `select distinct userId from user;`;
      db.query(sql, function (err, result) {
          if (!err) {
              resolve(result);
          } else {
              resolve({
                  status: "error",
                  message: "Error Getting Data",
                  debug: err
              });
          }
      });
  });
};



function count_similarities(arr1, arr2) {
  var matches = 0;
  for (i=0;i<arr1.length;i++) {
      if (arr2.indexOf(arr1[i]) != -1)
          matches++;
  }
  return matches;
}

export default EngineController;

