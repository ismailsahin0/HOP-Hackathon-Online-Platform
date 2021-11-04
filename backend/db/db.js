import mysql from 'mysql'


//Create connection
var db = mysql.createConnection({  
    host: "144.122.71.114",
    port: 8081,
    user: "user1",  
    password: "123456",
    database: "hop",
    ssl: true,

});  

db.connect(function(err) {  
        if (err) throw err;  
        console.log("db connected!");
 
});

export default db;
