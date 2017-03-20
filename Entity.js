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
    

    
};

Entity.prototype.move = function (x, y) {

    this.graphic.x = x;
    this.graphic.y = y;
    this.x = x;
    this.y = y;                            
};

Entity.prototype.setPath = function(arrayX,arrayY, slice) {
    this.path = [];
    for(var i = 0; i < 1; i+=slice) {
        x = game.math.catmullRomInterpolation(arrayX,i);
        y = game.math.catmullRomInterpolation(arrayY, i);
        this.path.push({x:x, y:y})
    }
}

Entity.prototype.update = function()
{

    if(this.vel != 0){
        this.pos += this.vel;
        if(this.path != null){
    
            if(this.pos >= this.path.length){
                this.pos = 0;
            }
            
            this.move(this.path[Math.floor(this.pos)].x, this.path[Math.floor(this.pos)].y);
        }
    }

}