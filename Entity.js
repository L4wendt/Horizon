var EntityList = {};
function Entity(et) {
    this.x = et.x;
    this.y = et.y;
    this.id = et.id;
    this.sprite = game.add.sprite(et.x * 32, et.y * 32, et.name);
    this.sprite.animations.add('right', [8,6,7],15,false);
    this.sprite.animations.add('left',  [5,3,4],15,false);
    this.sprite.animations.add('up',  [11,9,10],15,false);
    this.sprite.animations.add('down',  [2,0,1],15,false);
    this.sprite.tint = et.color;
    
    //self.sprite.visible = true;
};

Entity.prototype.move = function (x, y) {
    if(this.x != x) {
        if(x>this.x){
            this.sprite.animations.play('right');
        }
        if(x<this.x){
            this.sprite.animations.play('left');
        }
        game.add.tween(this.sprite).to({x : x * 32}, 100, "Linear", true);
    }
    if(this.y != y) {
        if(y>this.y){
            this.sprite.animations.play('down');
        }
        if(y<this.y){
            this.sprite.animations.play('up');
        }
        game.add.tween(this.sprite).to({y : y * 32}, 100, "Linear", true);
    }
    this.x = x;
    this.y = y;                            
};


