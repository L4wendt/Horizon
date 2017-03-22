AppStates.Game = function () {

};

AppStates.Game.prototype.create = function () {
   
    game.time.advancedTiming = true;
    game.time.desiredFps = 60;
    
    this.inputs = { right : {}, left : {}, esc : {}, space : {}};
    this.inputs.esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    this.inputs.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
 
    this.background = game.add.sprite(0,0,"bg");
    
    this.player = new Entity(960/2+90, 640/2, "cube", 0x3E4B6D);
    this.player.graphic.pivot.x = 30;
    this.player.graphic.pivot.y = 30;

    this.target = game.add.sprite(960/2+90,640/2, "target");
    this.target.pivot.x = 30;

   
    this.currentScene = sceneOneOne;
    this.currentScene.start(this.target, this.player);
    
    this.pause = false;
    game.camera.follow(this.target, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    
    this.renderingGroup = game.add.group();
    this.renderingGroup.add(this.player.graphic);
    //this.renderingGroup.add(this.currentScene.bgWorld);   
   //this.renderingGroup.add(this.player);
  


};

AppStates.Game.prototype.render = function() {
    
	
}

AppStates.Game.prototype.update = function () {
    
    game.debug.text(game.time.fps, 2, 14, "#00ff00");
    
    if(this.inputs.esc.isDown) {
        this.pause = !this.pause;
    }
    
    if(!this.pause) {
        if(this.currentScene != null)
            this.currentScene.update();
    }
    
    this.background.x = game.camera.x;
    this.background.y = game.camera.y;
    


};

AppStates.Game.prototype.render = function () {
    //game.debug.text("inGame", 100, 100);
};

