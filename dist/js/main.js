var draw = (function(){
    
    
    //Get the height and width of the main we will use this set canvas to the full
    //size of the main element.
    var mWidth = document.querySelector('main').offsetWidth;
    var mHeight = document.querySelector('main').offsetHeight;

    //create the canvas
    var canvas = document.createElement('canvas');
    //canvas.width = mWidth;
    //canvas.height = mHeight;
    //document.querySelector('main').appendChild(canvas);

    //create a context
    var ctx = canvas.getContext('2d');

    //create theinitialbounding rect
    var rect = canvas.getBoundingClientRect();

    //current x,y position
    var x=0;
    var y=0;

    //starting position
    var x1=0;
    var y1=0;

    //ending position
    var x2=0;
    var y2=0;

    //what are we drawing
    var shape ='';

    var isDrawing=false;

    var fillColor='rand';
    var strokeColor='rand';


    //last x, y
    var lx=false;
    var ly=false;

    function randColor(){
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    return{

        setIsDrawing: function(bool){
            isDrawing = bool;
        },

        getIsDrawing: function(){
            return isDrawing;
        },

        //set x,y cord based on current event
        setXY: function(evt){

            //tack the last x,y position before setting the curent position
            lx=x;
            ly=y;
            x =(evt.clientX - rect.left) - canvas.offsetLeft;
            y =(evt.clientY - rect.top) - canvas.offsetTop;

            //console.log(x +' ' + y);
        },

        //set starting cords
        setStart: function(){
            x1=x;
            y1=y;
        },
        //set ending cords
        setEnd: function(){
            x2=x;
            y2=y;
        },

        setColor: function(type, color){
            if(type==='stroke'){
                strokeColor = color;
            }else{
                fillColor = color;
            }
            
        },

        getColor: function(type){
            console.log(type);
            console.log(fillColor);
            console.log(strokeColor);
            if(type==='stroke' && strokeColor!='rand'){
                return strokeColor;
            }
            if(type==='fill' && fillColor!='rand'){
                return fillColor;
            }
            return  randColor();
        },

        //sets the shape to be drawn
        setShape: function(shp){
            shape=shp;
        },

        getShape: function(){
            return shape;
        },
        
        //write the x,y cords to the GUI
        writeXY: function(){
            document.getElementById('trackX').innerHTML = 'X:= ' + x;
            document.getElementById('trackY').innerHTML = 'Y:= ' + y;
        },

        draw: function () {
            ctx.restore();

            if (shape === 'rectangle') {
                this.drawRect();
            } else if (shape === 'line') {
                this.drawLine();
            } else if (shape === 'circle') {
                this.drawCircle();
            } else if (shape === 'path') {
                this.drawPath();
            } else if (shape === 'triangle') {
                this.drawTriangle();
            }else{
                alert('Please choose a shape');
                //draw.drawRect();
            }
            ctx.save();
        },

        //Draw a line
        drawLine: function () {
            //Start by using random fill colors.
            //ctx.strokeStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
            ctx.strokeStyle = randColor();
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        },

        //draw a circle
        drawCircle: function () {
            //replace the next 2 lines with the randColor() function
            //ctx.strokeStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
            //ctx.fillStyle   = '#' + Math.floor(Math.random() * 16777215).toString(16);
            ctx.strokeStyle = randColor();
            ctx.fillStyle   = randColor();


            let a = x1-x2;
            let b = y1-y2;
            let radius = Math.sqrt(a*a + b*b);

            ctx.beginPath();
            ctx.arc(x1,y1, radius, 0, Math.PI*2);
            ctx.stroke();
            ctx.fill();

        },

        //draw a Path
        drawPath: function() {
            //Start by using random fill colors.
            ctx.strokeStyle = randColor();
            ctx.beginPath();
            ctx.moveTo(lx, ly);
            ctx.lineTo(x, y);
            ctx.stroke();
          },
        //draw a rect
        drawRect: function(){
            //ctx.fillStyle="rgb(200,0,0)";
            //ctx.fillRect(10,10,55,50);

            ctx.fillStyle =  randColor();
            ctx.fillRect(x1,y1,(x2-x1),(y2-y1));
        },

        //draw a triangle
        drawTriangle: function () {


            ctx.fillStyle = randColor();
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x1, y2);
            ctx.lineTo(x1, y1);

            ctx.stroke();
            ctx.fill();
        },

        getCanvas: function(){
            return canvas;
        },
       
        init: function(){
            
            canvas.width = mWidth;
            canvas.height = mHeight;
            document.querySelector('main').appendChild(canvas)

        }
    }

})();

draw.init();

//add a moujsemove listener to the canvas
//when the mouse reports a chnage of position  use the event data
//to set and report the x,y position of the mouse
draw.getCanvas().addEventListener('mousemove',function(evt){
    draw.setXY(evt);
    draw.writeXY();
    if(draw.getShape()==='path' && draw.getIsDrawing()===true) {
        draw.draw();
      }
});

draw.getCanvas().addEventListener('mousedown', function(evt){
    draw.setStart();
    draw.setIsDrawing(true);
});

draw.getCanvas().addEventListener('mouseup', function(evt){
    draw.setEnd();
    draw.draw();
    draw.setIsDrawing(false);
});


document.getElementById('btnRect').addEventListener('click', function(evt){
    
    draw.setShape('rectangle');
});
document.getElementById('btnLine').addEventListener('click', function(evt){
    draw.setShape('line');
});
document.getElementById('btnCircle').addEventListener('click', function(evt){
    draw.setShape('circle');
});
document.getElementById('btnPath').addEventListener('click', function(evt){
    draw.setShape('path');
});
document.getElementById('btnTriangle').addEventListener('click', function(evt){
    draw.setShape('triangle');
});
document.getElementById('strokeColor').addEventListener('change', function(evt){
    let color = document.getElementById('strokeColor').value;
    alert(color);
    draw.setColor('stroke', color);
});
document.getElementById('fillColor').addEventListener('change', function(evt){
    let color = document.getElementById('fillColor').value;
    alert(color);
    draw.setColor('fill', color);
});

document.getElementById('randStrokeColor').addEventListener('change', function (evt) {
    if (document.getElementById('randStrokeColor').checked == true) {
        console.log('stroke');
        alert("stroke");
        draw.setColor('stroke', 'rand');
    }
});
document.getElementById('randFillColor').addEventListener('change', function (evt) {
    if (document.getElementById('randFillColor').checked === true) {
        console.log('rand'+' we inside/outside the console log!!!');
        alert("rand");
        draw.setColor('fill', 'rand');
    }
});