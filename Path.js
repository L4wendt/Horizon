function Path(sizeX, sizeY) {
    this.x = [];
    this.y = [];
    this.bmd = game.add.bitmapData(sizeX, sizeY);
    this.bmd.addToWorld();
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.spr = [];
}

Path.prototype.AddPoint = function(x,y) {
    this.x.push(x);
    this.y.push(y);
    this.spr.push(game.add.sprite(x,y,"point"));
    this.spr[this.spr.length-1].inputEnabled = true;
    this.spr[this.spr.length-1].enableDrag();
    this.spr[this.spr.length-1].events.onDragUpdate.add(onDragUpdate, this, 0, this.spr.length-1);
    this.plot();
}

Path.prototype.RemovePoint = function(i) {
    this.x = this.x.splice(i,1);
    this.y = this.y.splice(i,1);
    this.spr = this.spr.splice(i,1);
    
    this.plot();
}

Path.prototype.plot = function() {
    
    this.bmd.clear();

    var x = 1 / game.width;
    
    for (var i = 0; i <= 1; i += x)
    {
        //var px = this.math.linearInterpolation(this.x, i);
        //var py = this.math.linearInterpolation(this.y, i);

        // var px = this.math.bezierInterpolation(this.points.x, i);
        // var py = this.math.bezierInterpolation(this.points.y, i);

         var px = this.math.catmullRomInterpolation(this.points.x, i);
         var py = this.math.catmullRomInterpolation(this.points.y, i);

        this.bmd.rect(px, py, 1, 1, 'rgba(255, 255, 255, 1)');
    }
}

Path.prototype.onDragUpdate = function(sprite, pointer, id) {
    console.log("Just moved " + id.toString());
    this.x[id] = this.spr[id].x;
    this.y[id] = this.spr[id].y;
    this.plot();
}