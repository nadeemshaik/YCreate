<!DOCTYPE HTML>
<html>
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="viewport" content="width=720,maximum-scale=1.0" />
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
	<script type="text/javascript" src="js/jquery.event.drag-2.0.js"></script>
	<script src="http://192.168.1.5:8080/socket.io/socket.io.js"></script>
	<script type="text/javascript" src="tet.js"></script><!-- Library to help text -->
	<script type="text/javascript" src="drawing.js"></script>
	<script type="text/javascript" src="scripts.js"></script>
	
	<link rel="stylesheet" href="style.css" />
	<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <script src="bootstrap/jquery.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
	<title>DiscussionBoard</title>
</head>
<body style="background-color:#392c44; overflow:hidden" >
	<div class="container-fluid">
		<div class="row-fluid">
			<div class="span1" style="margin-top:20px;">
				<div style="margin-left:20px;">
				<button class="btn btn-inverse disabled penTool" rel="tooltip" title="Marker"><i class="icon-pencil icon-white"></i></button><br><br>
				<button class="btn btn-inverse eraser" rel="tooltip" title="Duster"><i class="icon-hdd icon-white"></i></button><br><br>
				
	  				<button class="btn btn-inverse penSizePlus" id="incSize" rel="tooltip" title="Larger Marker" ><i class="icon-plus icon-white"></i></button><br>
					<button class="btn btn-inverse penSizeMinus" id="decSize" rel="tooltip" title="Smaller Marker" ><i class="icon-minus icon-white"></i></button><br>
				</div>			
				
			</div>
			<div class="span8">
				<article><!-- our canvas will be inserted here--></article>
							
			</div>
			<div class="span3 well" >
				<ul id="chatList" style="color:black;">
					
				</ul>
			</div>
		</div>
		<div class="row-fluid">
			<div class="span1"></div>
			<div class="span8">
				<div class="well img-polaroid" style="width:772px;height:100px;overflow-y:scroll;" id="chatbox">
					<ul class="chatbox unstyled" ></ul>
				</div>					
			</div>
		</div>
		<div class="row-fluid">
			<div class="span1"></div>
			<div class="span8">
				<form class="form-inline input-append" onsubmit="return false;">
					<input type="text" class="xxlarge" id="chat" onsubmit="return false;" style="width:740px" >
					
					<button class="btn btn-primary" type="button" id="chatItUp" style="">CHAT</button>
				</form>
			</div>
				
			
		</div>
	</div>
	

<script type="text/javascript">
	
	document.ontouch = (function(){return false;});
	document.getElementById('chatbox').scrollTop = 10000;
	myName = <?php echo $_GET['name']?>;
	myGroup = <?php echo $_GET['group']?>;
      if(myName === null){
            window.location.replace('index.html');
      }
    $("#chat").keyup(function (e) {
	    if (e.keyCode == 13) {
	        // Do something
	    }
	});
    </script>

</body>

