AppStates.Error = function() {
    
}

AppStates.Error.prototype.create = function() {
    game.stage.backgroundColor = "#701C1A";
    var button = game.add.button(game.world.centerX, game.world.centerY, "button", this.goToMenu)
    button.anchor.set(0.5,0.5);
    
    var error = game.add.text(game.world.centerX, game.world.centerY - game.world.centerY/2, "ERROR");
    error.fill = "#111111";
    error.font = fontname;
    error.fontSize = 72;
    error.anchor.set(0.5,0.5);
    
    var back = game.add.text(game.world.centerX, game.world.centerY , "back");
    back.fill = "#212121";
    back.font = fontname;
    back.fontSize = 21;
    back.anchor.set(0.5,0.5);
    button.tint = 0xFFCCCC
    
    key1 = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    key1.onDown.add(this.goToMenu, this);
}

AppStates.Error.prototype.goToMenu = function() {
    game.state.start("menu");
    socket.emit('logout');
}