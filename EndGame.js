AppStates.EndGame = function () {

};

AppStates.EndGame.prototype.create = function () {
    game.camera.flash(0x000000,1000,true);
    this.background = game.add.sprite(0,0,"bg");
    
    this.title = game.add.text(260,35,"passo");
    this.title.font = fontname;
    this.title.fontSize = 144;
    this.title.fill = "#3E4B6D";
    
    this.thanks = game.add.text(320,350,"Thank you for playing");
    this.thanks.font = fontname;
    this.thanks.fill = "#ECC599";
    
    this.info = game.add.text(395,200,"game by @la_wendt");
    this.info.font = fontname;
    this.info.fill = "#ECC599";
    this.info.fontSize = 15;
    
}
