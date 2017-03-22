function Scene( path, scenarySpr, considerInput, target, player, static) {
    

    this.scenarySprTag = scenarySpr;
   

    this.path = path;
    this.considerInput = considerInput;
    this.isStatic = static;
}

Scene.prototype.start = function(target, player) {
    
    this.cursors = game.input.keyboard.createCursorKeys();
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.target = target;
    this.player = player;
    player.setPath(this.path.x, this.path.y);
    
    this.bgWorld = game.add.sprite(-480,0,this.scenarySprTag);

    if(this.isStatic) {
        game.camera.unfollow();
        game.world.setBounds(0, 0, this.bgWorld.width, this.bgWorld.height);
    } 
    else {
        game.camera.follow(this.target, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        game.world.setBounds(-480, 0, this.bgWorld.width, this.bgWorld.height);
    }
   
  
    
}

Scene.prototype.end = function() {
    this.bgWorld.destroy();
}

Scene.prototype.update = function() {
    this.player.update();
    
    if(this.player.hasEnded) {
        this.updateWhenEndedPath();
    }
    else {
        if(this.considerInput) {
            if(this.cursors.right.isDown){
                this.player.vel = 30;
            }
            else{
                this.player.vel = 0;
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

    
 
}

Scene.prototype.updateWhenEndedPath = function() {
    
}
