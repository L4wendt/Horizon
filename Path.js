function Path(sizeX, sizeY) {
    this.x = [];
    this.y = [];
    this.bmd = game.add.bitmapData(sizeX, sizeY);
    this.bmd.addToWorld();
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.spr = [];
    this.deleteButton = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.wasUpdated = false;
}

Path.prototype.AddArray = function(aar) {
    for (var i = 0; i < aar.x.length; i++) {
        this.AddPoint(aar.x[i],aar.y[i]);
    }
}

Path.prototype.AddPoint = function(x,y) {
    this.x.push(x);
    this.y.push(y);
    this.spr.push( game.add.sprite(x,y,"dot"));
    this.spr[this.spr.length -1].pivot.x = 15;
    this.spr[this.spr.length -1].pivot.y = 15;
    this.spr[this.spr.length -1].inputEnabled = true;
    this.spr[this.spr.length -1].input.enableDrag(true);
    this.spr[this.spr.length -1].events.onDragUpdate.add(this.onDragUpdate, this, {i:this.x.length-1});
   
    this.plot();
}

Path.prototype.RemovePoint = function(i) {
    console.log(this.x);

    this.x.splice(i,1);
    this.y.splice(i,1);
    this.spr[i].destroy();
    this.spr.splice(i,1);
    
    this.plot();
    
    console.log(this.x);
}

Path.prototype.plot = function() {
    this.wasUpdated = true;
    this.bmd.clear();

    var x = 1 / game.width;
    
    for (var i = 0; i <= 1; i += x)
    {
        //var px = this.math.linearInterpolation(this.x, i);
        //var py = this.math.linearInterpolation(this.y, i);

        // var px = this.math.bezierInterpolation(this.points.x, i);
        // var py = this.math.bezierInterpolation(this.points.y, i);

         var px = game.math.catmullRomInterpolation(this.x, i);
         var py = game.math.catmullRomInterpolation(this.y, i);

        this.bmd.rect(px, py, 1, 1, 'rgba(255, 255, 255, 1)');
    }
}

Path.prototype.onDragUpdate = function(sprite, pointer, dragX, dragY, snapPoint) {
   
    var tid = -1
    for (var i = 0; i < this.spr.length; i++){
        if(this.spr[i] == sprite){
            tid = i;
            break;
        }
    }
    if(tid == this.spr.length || tid == -1)
        return;
    
    if(this.deleteButton.isDown) {
        this.RemovePoint(tid);
    }
    else {
        this.x[tid] = sprite.x;
        this.y[tid] = sprite.y;
    }
    
  
    this.plot();
}