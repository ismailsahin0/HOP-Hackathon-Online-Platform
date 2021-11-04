
import express from 'express';
import db from './db/db.js';
import cors from 'cors';

import votingRouter from './routes/engine.route.js';
import userRouter from './routes/user.route.js';
import lastRouter from './routes/last.route.js';

const app = express();
const port = 8082;

app.use(cors());
app.use(express.json());
app.use(votingRouter);
app.use(userRouter);
app.use(lastRouter);

/*

****** REMINDER  ******
app.get('/users/:id', (req, res) => {
  console.log(req.params.id);
  var q = "SELECT * FROM users WHERE UserID =" + req.params.id;
  db.query(q,(err,rows,fields)=>{
    if(!err){
      console.log(rows);
    
    }else{
      console.log(err); 
    }
  })
  //res.send(rows);
});

app.get('/users', (req, res) => {

  db.query('SELECT * FROM users',(err,rows,fields)=>{
    if(!err){
      console.log(rows);
    
    }else{
      console.log(err); 
    }
  })
  //res.send(rows);
});

app.post('/signup', (req, res)=>{
  //req.body.fullname
  var q = "INSERT INTO users (UserID, LastName, FirstName, Address, City) VALUES ('4', 'emre', 'zinal', 'mamak', 'ankara');"
  db.query(q,(err,rows,fields)=>{
    if(!err){
      console.log(rows);
    
    }else{
      console.log(err);
    }
  })
})

*/
var server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

/* Handle server close signal (CTRL+C) */
process.on('SIGINT', function() {
  db.end(() => {
    console.log('Closed db connection. Bye :)');
    server.close();
    process.exit();
  });
});
