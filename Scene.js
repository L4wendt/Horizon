function Scene(width, height, path, scenarySpr, considerInput, target, player) {
    
    this.width = width;
    this.height = height;
    this.scenarySprTag = scenarySpr;
   

    this.path = path;
    this.considerInput = considerInput;
}

Scene.prototype.start = function(target, player) {

    this.cursors = game.input.keyboard.createCursorKeys();
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.target = target;
    this.player = player;
    player.setPath(this.path.x, this.path.y,1/100);
    game.world.setBounds(0, 0, this.width, this.height);
    
}

Scene.prototype.update = function() {
    this.player.update();
    if(this.considerInput) {
        if(this.cursors.right.isDown){
            //this.target.x = this.player.x + 60;
        }
    }
    if(this.cursors.left.isDown){
        this.target.x = this.player.x - 60;
    }
    else if(this.cursors.right.isDown){
        this.target.x = this.player.x + 120;
    }
    else {
        this.target.x = this.player.x + 30;
    }
}