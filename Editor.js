AppStates.Editor = function () {

};

AppStates.Editor.prototype.create = function () {
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.input.keyboard.addKey(Phaser.Keyboard.F).onUp.add(AppStates.goFull);
    
    game.world.setBounds(0, 0, 3840, 1280);
    
    
    game.time.advancedTiming = true;
    game.time.desiredFps = 60;
    
    this.inputs = { right : {}, left : {}, esc : {}, space : {}};
    this.inputs.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.inputs.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.inputs.esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    this.inputs.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    this.background = game.add.sprite(0,0,"bg");
    
    this.player = new Entity(960/2, 640/2, "cube", 0x3E4B6D);
    
    this.player.vel = 0.5;
    game.input.onTap.add(this.handleTap, this);
    
    this.path = new Path(3840,1280);
    

    
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
        this.background.x = game.camera.x;
    }
    else if (this.inputs.right.isDown)
    {
        game.camera.x += 4;
        this.background.x = game.camera.x;
    }
    
};

AppStates.Editor.prototype.addPoint = function() {
    this.path.AddPoint(game.input.x + game.camera.x, game.input.y + game.camera.y);
}

AppStates.Editor.prototype.handleTap = function(pointer, doubleTap) {
   this.addPoint();
}

