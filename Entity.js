var EntityList = {};
function Entity(x,y, tint, size, arrayX, arrayY) {
    this.x = et.x;
    this.y = et.y;
    this.tint = tint;
    this.size = size;

    this.sprite.tint = et.color;
    
    this.path = [];
    for(var i = 0; i < (arrayX.lenght -1); i++) {
        var distance = 
        var timeGap = (240 * )/ 240.0f
        for(var t = 0, t < maxT, t+= timeGap)
    }
    
    this.graphic = game.add.graphic(x,y);
    this.graphic.lineStyle(0);
    this.graphic.beginFill(tint);
    this.graphic.drawRect(0, 0,size, size);
    this.graphic.endFill();
    
    this.vel = 0;
    
};

Entity.prototype.move = function (x, y) {

    this.graphic.x = x;
    this.graphic.y = y;
    this.x = x;
    this.y = y;                            
};

Entity.prototype.update = function()
{
    
}