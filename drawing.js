// Drawing;
Drawing = {};
Drawing.prevx = undefined;
Drawing.prevy = undefined;
Drawing.curSize = 5;
Drawing.isEraser = false;
Drawing.draw = function(context, operation)
{
	if(operation === undefined || operation === null)
		return;
	var ctx = context;
	var type = operation.type;
	ctx.strokeStyle = operation.color;
	ctx.lineWidth = operation.size;
	ctx.beginPath();
	ctx.moveTo(operation.prevx, operation.prevy);
	ctx.lineTo(operation.x, operation.y);
	ctx.stroke();
	return ctx.closePath();
};

Drawing.createOperation = function(canvas, e, myColor)
{
	var offset, type_, x_, y_;
    type_ = e.handleObj.type;
    offset = canvas.offset();
    e.offsetX = e.pageX - offset.left;
    e.offsetY = e.pageY - offset.top;
    x_ = e.offsetX;
    y_ = e.offsetY;
    if(type_ == "dragstart" || type_ == "touchstart")
	{
		Drawing.prevx = x_;
		Drawing.prevy = y_;
		return undefined;
	}
	if(type_ == "dragstop" || type_ == "touchend")
	{
		return undefined;
	}
	if(Drawing.prevx === undefined || Drawing.prevy === undefined)
	{
		prevx = x_;
		prevy = y_;
		return;
	}
    var operation = {prevx:Drawing.prevx, prevy:Drawing.prevy, x: x_, y: y_, type:type_, color:Drawing.isEraser?"#FFFFFF":myColor, size:Drawing.curSize};
    Drawing.prevx = x_;
    Drawing.prevy = y_;
    return operation;
};

Drawing.incSize = function(){
	Drawing.curSize+=3;
	if(Drawing.curSize > 50)
		Drawing.curSize = 20;
};

Drawing.decSize = function(){
	Drawing.curSize-=3;
	if(Drawing.curSize <2)
		Drawing.curSize = 2;
};

Drawing.setEraser = function(val){
	Drawing.isEraser = val;
};
// exports.draw = Drawing.draw