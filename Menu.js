AppStates.MenuScreen = function () {
   
}

AppStates.MenuScreen.prototype.create = function() {
    game.stage.backgroundColor = "#6F657F";
    //"#6F657F"
    game.state.start("game");
    this.title = game.add.text(game.world.centerX, 20, "Passo");
    this.title.anchor.set(0.5,0);
    this.title.font = fontname;
    this.title.fontSize = 60;
    this.title.align = 'center';
    this.title.addColor("#CF6052", 0);
  

    
    /*
    //Button
    this.button = game.add.button(400, 330,
                                  "button",
                                 this.singInDown, this,
                                 1, 0, 2, 0);
    this.button.text = game.add.text(this.button.x + this.button.width/2,
                                     this.button.y + this.button.height/2, "SignUp");
    this.button.text.anchor.set(0.5,0.4)
    this.button.text.font = fontname;
    this.button.text.align = 'center';
*/
    
}



AppStates.MenuScreen.prototype.update = function() {
   
}


