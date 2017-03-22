var EntityList = {};
function Entity(x,y, spr, tint) {
    
    this.x = x;
    this.y = y;
    this.tint = tint;
    this.graphic = game.add.sprite(x,y,spr);
    this.graphic.tint = tint;
    
    
    /*
     
     // Bitmap
     this.bmp = game.add.bitmapData(size, size);
    
    var grd = this.bmp.context.createLinearGradient(0,0,0,size);
    if(tint != null){
        for (var i = 0; i < tint.length; i++){
            grd.addColorStop(tint[i].t, tint[i].c);
        }
    }
   
    
    this.bmp.context.fillStyle=grd;
    this.bmp.context.fillRect(0,0,size,size);
    this.graphic = game.add.sprite(x,y,this.bmp);
      
    // Graphic
  
    this.graphic = game.add.graphics(x,y);
    this.graphic.lineStyle(0);
    this.graphic.beginFill(tint);
    this.graphic.drawRect(0, 0,size, size);
    this.graphic.endFill();
      */
    
    
    this.vel = 0;
    this.pos = 0;
    
    this.debugMode = false;
    this.hasEnded = false;
};

Entity.prototype.move = function () {
    var f = Math.floor(this.pos)
    var t = this.pos - f;
    if(this.pos >= (this.path.length-1)){
        x = this.path[f].x;
        y = this.path[f].y;
    }
    else {
        x = this.path[f].x + (this.path[f+1].x - this.path[f].x) * t;
        y = this.path[f].y + (this.path[f+1].y - this.path[f].y) * t
    }
    
    this.graphic.x = x;
    this.graphic.y = y;
    this.x = x;
    this.y = y;                            
};

Entity.prototype.setPath = function(arrayX,arrayY, slice) {
    this.path = [];
    var timeBetweenPoints = 1 / (arrayX.length -1); 
    var currentPoint = 0;
    for(var i = 0; i < (arrayX.length-1); i+=1) {
        var sliceSize = Math.sqrt(Math.pow(arrayX[i+1] - arrayX[i],2)+Math.pow(arrayY[i+1] - arrayY[i],2));
        sliceSize /= 6;
        sliceSize = timeBetweenPoints / sliceSize;
        
        for(var j = 0; j < timeBetweenPoints; j+=sliceSize) {
            currentPoint += sliceSize;
            x = game.math.catmullRomInterpolation(arrayX, currentPoint);
            y = game.math.catmullRomInterpolation(arrayY, currentPoint);
             this.path.push({x:x, y:y})
        }
        
   
       
    }
     this.move(this.path[0].x, this.path[0].y);
}

Entity.prototype.update = function()
{

    if(this.vel != 0){
        this.pos += this.vel * game.time.physicsElapsed ;
        if(this.path != null){
            if(this.path.length == 0 || this.path.lengt == 0)
                return;
        
            if(this.pos >= this.path.length){
              
                if(this.debugMode)
                    this.pos = 0;
                else {
                    this.hasEnded = true;
                   
                    this.pos = this.path.length -1;
                }
            }
            if(this.pos < 0){
                if(this.debugMode)
                    this.pos = this.path.length -1;
                else
                    this.pos = 0;
            }
            
            this.move();
        }
    }

}