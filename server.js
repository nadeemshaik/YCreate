(function() {

require('./drawing.js');

///////////
  var io;
  var users = {};
  var clients = {};
  var userDataListRow = {};
  var userDataListGroup = {};
  var rowLen = 0, groupLen = 0;
  var number = 0;
  var start =1;
  var bestImageURL;
  // var displayList = Array();
  //Initializing server canvas:
  var Canvas = require('dependencies/canvas-heroku'),
    canvas = new Canvas();
  canvas.height = 400;
  canvas.width = 800;
  canvas.id = 'myCan';
  var ctx=canvas.getContext('2d');
  ctx.fillStyle = "solid";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  function draw(x, y, type, color) {
    ctx.strokeStyle = color;
    if (type === "dragstart" || type === "touchstart") {
      ctx.beginPath();
      return ctx.moveTo(x, y);
    } else if (type === "drag" || type === "touchmove") {
      ctx.lineTo(x, y);
      return ctx.stroke();
    } else {
      return ctx.closePath();
    }
  }
  /////////////////////// end
  io = require('socket.io').listen(8080);
  io.sockets.on('connection', function(socket) {
    // the clients hash stores the sockets
    // the users hash stores the username of the connected user and its socket.id
    // get the handshake and the session object

    var hs = socket.handshake;
    users[users.length] = socket.id; // connected user with its socket.id
    clients[socket.id] = socket; // add the client data to the hash
    console.log(number+" : "+socket.id);
    number++;
    socket.on('disconnect', function () {
      // delete clients[socket.id]; // remove the client from the array
      // clients.splice(socket.id, 1);
      for(var i = 0;i<users.length;i++){
        if(users[i] === undefined) continue;
        if(users[i] == socket.id) {/*delete users[i];*//*users.splice(i,1);*/break;}
      }
    });

    socket.on('myInfo',function(data){
      // displayList[displayList.length].row = '<li>' + data.name + ' : ' + data.color + '</li>';
      // displayList[displayList.length]
      userDataListRow[rowLen++]= '<li><font color = ' +data.color +'>'+ data.name + ' : ' + data.color + '</font></li>';
      userDataListGroup[groupLen++] = data.group;
      console.log("<<<<<<<<<<<<<<" + "USER DATA ADDED!!!" + userDataListGroup[groupLen-1] + ' ' + userDataListRow[rowLen-1]);
      var displayList = "";
      for(var i=0;i<groupLen;i++)
      {
        if(userDataListGroup[i] == data.group)
            displayList += userDataListRow[i];
      }
      console.log('>>>>>>>>>>>>>>>>> ' + displayList);
      socket.broadcast.emit('newUserInfo',{item:displayList,  group:data.group});
      socket.emit('newUserInfo',{item:displayList,  group:data.group});
      socket.broadcast.emit('talkIt', {
        talker: "****" + data.name + " has joined. " + "*****",
        grouper: data.group,
        namer : data.name
      });
      socket.emit('talkIt', {
        talker: "****" + " Hello " + data.name+"!"+" Welcome to Y!Create." + " ****",
        grouper: data.group,
        namer:data.name
      });
    });

    // var newColor = String('#'+Math.floor(Math.random()*16777215).toString(16));
    var newColor = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
    if(!number)
      socket.emit('startDrawing',{color:newColor, url:undefined});
    else
    {
      socket.emit('startDrawing',{color:newColor, url:canvas.toDataURL()});
    }
    // // we want at some point to send a message to user 'alex'
    // if (users['alex']) {
    //   // we get the socket.id for the user alex
    //   // and with that we can sent him a message using his socket (stored in clients)
    //   clients[users['alex']].emit("Hello Alex, how've you been");
    // }

    socket.on('drawClick', function(operation) {
        Drawing.draw(canvas.getContext('2d'), operation);
        socket.broadcast.emit('draw', operation);
    });

    socket.on('chatGive', function(datas) {
      //console.log(datas.talk);  
      socket.broadcast.emit('talkIt', {
        talker : datas.talk,
        grouper : datas.group,
        namer : datas.name
      });
    });

  });
}).call(this);
