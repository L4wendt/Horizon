AppStates.Game = function () {

};

AppStates.Game.prototype.create = function () {
   
    game.input.keyboard.addKey(Phaser.Keyboard.F).onUp.add(AppStates.goFull);
    game.time.advancedTiming = true;
    game.time.desiredFps = 60;
    
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    
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
    this.currentScene.start(this.target, this.player, this);
    
    this.pause = false;
 
    
    this.renderingGroup = game.add.group();
    this.renderingGroup.add(this.player.graphic);
    //this.renderingGroup.add(this.currentScene.bgWorld);   
   //this.renderingGroup.add(this.player);
  
    game.input.keyboard.addKey(Phaser.Keyboard.C).onUp.add(this.printPos,this);

};

AppStates.Game.prototype.printPos = function() {
    console.log("pos : " + this.player.x + ", " + this.player.y);
}

AppStates.Game.prototype.update = function () {
    
   // game.debug.text(game.time.fps, 2, 14, "#00ff00");
    
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

AppStates.Game.prototype.nextScene = function(scene){
    this.currentScene.end();
    this.currentScene = scene;
    game.time.events.add(500, this.nextScenept2, this);
    game.camera.flash(0x000000,1000,true);
   


}


AppStates.Game.prototype.nextScenept2 = function() {
    if(this.currentScene != null)
        this.currentScene.start(this.target, this.player, this);
    
    this.renderingGroup.destroy(false);
    this.renderingGroup = game.add.group();
    this.renderingGroup.add(this.player.graphic);
}





