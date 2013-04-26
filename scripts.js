 // (function() {
  var App;
  App = {};
   isStarted = false;
   myColor=null;
   isClicked = false;
   mX=null, mY=null;
  myName = null,myGroup=null;

  /*
    Init 
    */

  App.init = function() {
    App.canvas = document.createElement('canvas');
    App.canvas.height = 400;
    App.canvas.width = 800;
    App.canvas.id = 'myCan';
    document.getElementsByTagName('article')[0].appendChild(App.canvas);
    App.ctx = App.canvas.getContext("2d");
    App.ctx.lineWidth = 5;
    App.ctx.fillStyle = "solid";
    /////////////////// Code for initial canvas image
  App.ctx.font = '100px Arial';
  App.ctx.fillStyle = "black";
  App.ctx.fillText("Please Wait...", 100, 200);

  var te = App.ctx.measureText('Please Wait.....');
  App.ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  App.ctx.beginPath();
  App.ctx.lineTo(50, 102);
  App.ctx.lineTo(50 + te.width, 102);
  App.ctx.stroke();
  App.ctx.closePath();

  App.ctx.beginPath();
  App.ctx.lineTo(50, 220);
  App.ctx.lineTo(50+te.width, 220);
  App.ctx.stroke();
  App.ctx.closePath();
    ///////////////////////////////
  // App.ctx.strokeStyle = "#ECD018";
  App.ctx.lineWidth = 5;
  App.ctx.lineCap = "round";
  App.socket = io.connect('http://localhost:8080/');

  App.socket.on('draw', function(operation) {
    return Drawing.draw(App.ctx, operation);
  });

  App.socket.on('news', function(data){
    console.log(data);
  });

  App.socket.on('startDrawing',function(data){
    isStarted = true;
    myColor = data.color;
    App.ctx.strokeStyle = myColor;
    console.log("Connection completed!");
    console.log("My color = "+myColor);
    // for reloading earlier image from server:
    App.socket.emit('myInfo',{name : myName, group:myGroup, color : myColor});
    App.ctx.clearRect(0, 0, App.canvas.width, App.canvas.height);
    if(data.url === undefined)
    {
      return;
    }
    var img = new Image();
    img.src = data.url;
    img.onload = function(){
      App.ctx.drawImage(img,0,0); // Or at whatever offset you like
    };
  });
  App.socket.on('newUserInfo',function(data){
    if(data.group != myGroup){console.log("GROUPS NOT SAME!!!!");return;}
    console.log('data group = ' + data.group + ', myGroup = ' + myGroup);
    // $('#chatList').append('<li>'+data.name+ ' : '+data.color+'</li>');
    console.log(data.item);
    $('#chatList').html(data.item);
  });
  App.socket.on('talkIt',function(data){
    console.log('>>>>>>' +data.talker + ' , ' + data.grouper +', mygroup=' + myGroup);
    if(data.grouper != myGroup)return;
    var t = data.talker;

    $('.chatbox').append('<li>'+data.namer+' : '+t+'<li>');
  });
  $('#chatItUp').click(function() {
    var text = $('#chat').val();
    $('#chat').val("");
    console.log(text);
    $('.chatbox').append('<li>Me : '+text+'<li>');
    App.socket.emit('chatGive',{
      talk : text,
      name : myName,
      group : myGroup
    });
    return false;
  });

  $('#incSize').click(function(){
    Drawing.incSize();
  });
  $('#decSize').click(function(){
    Drawing.decSize();
  });
  $('.eraser').click(function(){
    console.log('eraser!');
    Drawing.setEraser(true);
    $('.eraser').addClass('disabled');
    $('.penTool').removeClass('disabled');
  });
  $('.penTool').click(function(){
    console.log('pencil!');
    $('.penTool').addClass('disabled');
    $('.eraser').removeClass('disabled');
    Drawing.setEraser(false);
  });
  $('#setName').click(function(){
    myName = $('#name').val();
    myGroup = $('#join').val();
    $('#name').val("Thanxs");
    $('#join').val("Thanxs");
    return false;
  });


};

/*
  Draw Events
  */
  $('canvas').live('drag dragstart dragend touchstart touchmove touchend', function(e) {
    if(!isStarted)
      return;
    if(isClicked)
      return;
    var operation = Drawing.createOperation($(this), e, myColor);
    Drawing.draw(App.ctx, operation);
    App.socket.emit('drawClick', operation);
  });
  // document.addEventListener('touchmove', function(e){
  //   if(!isStarted)
  //     return;
  //   if(isClicked)
  //     return;
  //   var operation = Drawing.createOperation($(this), e, myColor);
  //   Drawing.draw(App.ctx, operation);
  //   App.socket.emit('drawClick', operation);
  // });
  // document.addEventListener('touchstart', function(e){
  //   if(!isStarted)
  //     return;
  //   if(isClicked)
  //     return;
  //   var operation = Drawing.createOperation($(this), e, myColor);
  //   Drawing.draw(App.ctx, operation);
  //   App.socket.emit('drawClick', operation);
  // });
  // document.addEventListener('touchend', function(e){
  //   if(!isStarted)
  //     return;
  //   if(isClicked)
  //     return;
  //   var operation = Drawing.createOperation($(this), e, myColor);
  //   Drawing.draw(App.ctx, operation);
  //   App.socket.emit('drawClick', operation);
  // });
  $(function() {

    return App.init();
  });
 // }).call(this);
