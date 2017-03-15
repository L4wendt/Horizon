AppStates.Game = function () {
    this.playing = true;
};

AppStates.Game.prototype.update = function () {
    if(this.inputs.esc.isDown) {
        game.state.start('lobby');
        gameSocket.emit('logout');  
        }
    
};

AppStates.Game.prototype.render = function () {
    //game.debug.text("inGame", 100, 100);
};

AppStates.Game.prototype.startGame = function (pack) {
  
};

AppStates.Game.prototype.newEntity = function(pack){
    EntityList[pack.id] = new Entity(pack);
}

AppStates.Game.prototype.create = function () {
   
    var gameThis = this;
   

    this.inputs = { right : {}, left : {}, esc : {}, space : {}};
    this.inputs.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.inputs.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.inputs.esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    this.inputs.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
 

};
