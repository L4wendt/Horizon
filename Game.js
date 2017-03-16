AppStates.Game = function () {
   
   
};

AppStates.Game.prototype.create = function () {
   
    var gameThis = this;

    this.inputs = { right : {}, left : {}, esc : {}, space : {}};
    this.inputs.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.inputs.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.inputs.esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    this.inputs.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
 
    this.player = new Entity(game.world.centerX, game.world.centerY, 0x3E4B6D, 60);
    x = [-60,20,80,100,160,300,320,360,380,440,460,580,500,600,700];
    y = [268,328,148,148,288,368,368,228,228,228,228,208,348,348,288];
/*    for(var i = 0; i < x.length; i++){
        x[i] = (x[i] + 60) * 2;
        y[i] = y[i];
    }
  */  
    
    this.player.setPath(x,y,1/100.0);
    this.player.vel = 1;

};



AppStates.Game.prototype.update = function () {
    
    this.player.update()
    if(this.inputs.esc.isDown) {
        this.player.pos = 0;
    }
    
};

AppStates.Game.prototype.render = function () {
    //game.debug.text("inGame", 100, 100);
};

