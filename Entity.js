var EntityList = {};
function Entity(x,y, tint, size) {
    this.x = x;
    this.y = y;
    this.tint = tint;
    this.size = size;
    
  
    
    this.graphic = game.add.graphics(x,y);
    this.graphic.lineStyle(0);
    this.graphic.beginFill(tint);
    this.graphic.drawRect(0, 0,size, size);
    this.graphic.endFill();
    
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
        x = game.math.bezierInterpolation(arrayX,i);
        y = game.math.bezierInterpolation(arrayY, i);
        this.path.push({x:x, y:y})
    }
}

Entity.prototype.update = function()
{
    if(this.vel != 0){
        this.pos += this.vel;
        if(this.pos >= this.path.length){
            this.pos = 0;
        }
        this.move(this.path[this.pos].x, this.path[this.pos].y);
    }

}