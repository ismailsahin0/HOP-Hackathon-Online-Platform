var app = express(),
var http = require('http'),
var server = http.createServer(app),
var io = require('socket.io').listen(server)
var xss = require('xss');

server.listen(3000);

io.sockets.on('connection', function (socket)
{
    connection.query('SELECT * FROM messages', function (err, docs) {
        if (err) throw err;
        socket.emit('load old msgs', docs);
    });

    socket.on('chat message', function(data) {
        var msg = data.msg
        data.user = xss(username || data.user);
        users[username] = data.user;
        data.msg = xss(msg);
        data.time = +new Date();
        console.log(data)
        if (!data.to) {
            sendmsg(data);
        } else {
            data.type = 2;
            console.log("one")
            sendUserMsg(data);
        }
        insertData(data);
        if(data.msg == quest && username !==home.name){
            sendmsg({
                type: 0,
                msg: "Name: "+username+"Home: "+home.name
            });
            homeLeave(home.name);
        }else{
            homeLeave(home.name);
        }
            
    });

    socket.on('user join', function(data) {
        counter++;
        username = xss(data.user);
        users[username] = username;
        usocket[username] = socket;
        data.type = 0;
        data.users = users;
        data.counter = counter;
        data.msg = "User Data: " + data.user;
        sendmsg(data);
    });

    socket.on('new user', function (data, callback)
    {
        if (data in users){
            callback('User already in !');
        } else {
            callback(true);
            socket.nickname = data;
            users[socket.nickname] = socket;
            updateNicknames();
        }
    });

    socket.on("home", function(data) {
        console.log('home:' + home.name)
        var user = data.user;
        if( !users[home.name] ){
            home = {};
        }
        if (!home.name) {
            home.name = user;
            home.socket = socket;
            usocket[user].emit('sys' + user, {
                user: user,
                msg: "Home: " + home.name
            });
            Quest();
        } else {
            usocket[user].emit('sys' + user, {
                user: home.name,
                msg: "Home: " + home.name
            });
        }
        console.log('home:' + home.name)
    });

    function updateNicknames() {
        io.sockets.emit('usernames', Object.keys(users));
    };

   socket.on('send message', function (data, callback)
   {
       var  msg = data.trim();
       if (msg.substr(0,3) === '/w ')
       {
            msg = msg.substr(3);
            var ind = msg.indexOf(' ');
            if (ind !== -1){
                var name = msg.substr(0, ind);
                var msg = msg.substr(ind + 1);
                if (name in users){
                    users[name].emit('whisper', {msg: msg, nick: socket.nickname});
                }else {
                    callback('Error! Enter a Valid user !');
                }

            }else {
                callback('Error! Please enter a message for your whisper !');
            }
       }else {

           var newMsg = {msg: msg, nick: socket.nickname};
           connection.query('INSERT INTO messages SET ?',newMsg, function (err) {
               if(err) throw err;
               console.log('Data inserted !')
           });

           io.sockets.emit('new message', {msg: msg, nick: socket.nickname});
       }
   });
   socket.on('home leave', function(uname) {
    homeLeave(uname);
    });

   socket.on('disconnect', function (data) {
      if (!socket.nickname){
        return;
      } else{
        delete users[socket.nickname];
        updateNicknames();
      }

   });
    
});


function homeLeave(uname) {
    if (home.name && home.name == uname) {
        home = {};
        io.emit('home leave', uname);
    }else{
        console.log("cannot exit!");
    }
}


function insertData(data) {
    console.log("insert...");
    var conn = db.connect();
    var post = {
        msg: data.msg,
        uname: data.user,
        time: data.time.toString(),
        to: data.to
    };
    var query = conn.query('insert into chatmsg set ?', post, function(err, result) {
        console.log(err);
        console.log(result)
    })
    conn.end();
}

function deleteData(data) {
    console.log("delete...");
    var conn = db.connect();
    var delete1 = {
        msg: data.msgID,
    };
    var query = conn.query('delete from chatmsg set ?', delete1 , function(err, result) {
        console.log(err);
        console.log(result)
    })
    conn.end();
}

function sendmsg(data) {
    io.emit('chat message', data);
}

function sendUserMsg(data) {
    if (data.to in usocket) {
        usocket[data.to].emit('to' + data.to, data);
        usocket[data.user].emit('to' + data.user, data);
    }else{
        console.log("Message cannot send!");
    }
}