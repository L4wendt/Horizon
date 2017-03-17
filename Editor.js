AppStates.Editor = function () {

};

AppStates.Editor.prototype.create = function () {
   
    game.time.advancedTiming = true;
    game.time.desiredFps = 60;
    
    this.inputs = { right : {}, left : {}, esc : {}, space : {}};
    this.inputs.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.inputs.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.inputs.esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    this.inputs.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
 
    this.background = game.add.sprite(0,0,"bg");
    
    this.player = new Entity(game.world.centerX, game.world.centerY, "cube", 0x3E4B6D);
    
    this.player.vel = 0.5;
    game.input.onTap.add(addPoint, this);
};

AppStates.Editor.prototype.render = function() {
    
	
}

AppStates.Editor.prototype.update = function () {
    
    game.debug.text(game.time.fps, 2, 14, "#00ff00");
    
    this.player.update()

    if(this.inputs.esc.isDown) {
        this.player.pos = 0;
    }
    
     if (this.inputs.left.isDown)
    {
        game.camera.x -= 4;
    }
    else if (this.inputs.right.isDown)
    {
        game.camera.x += 4;
    }
    
};

AppStates.Editor.prototype.addPoint() = function() {
    this.path.AddPoint(game.input.x, game.input.y);
}