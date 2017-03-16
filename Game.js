AppStates.Game = function () {
   /*
    var myBitmap = game.add.bitmapData(800, 600);
    var grd = myBitmap.context.createLinearGradient(0,0,0,500);
    grd.addColorStop(0,"white");
    grd.addColorStop(1,"#0a68b0");
    myBitmap.context.fillStyle=grd;
    myBitmap.context.fillRect(0,0,800,580);
    grd=myBitmap.context.createLinearGradient(0,580,0,600);
    grd.addColorStop(0,"#0a68b0");
    grd.addColorStop(1,"black");
    myBitmap.context.fillStyle=grd;
    myBitmap.context.fillRect(0,580,800,20);
    game.add.sprite(0, 0, myBitmap);*/
};

AppStates.Game.prototype.create = function () {
   
    game.time.advancedTiming = true;
    game.time.desiredFps = 60;
    
    this.inputs = { right : {}, left : {}, esc : {}, space : {}};
    this.inputs.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.inputs.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.inputs.esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    this.inputs.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
 
    this.background = new Entity(0,0, [{c : "#6F657F", t: 0}, {c : "#866F76", t: 0.2}, {c: "#CAA19A", t:0.5}, {c:"#B26549", t:1}], 960);
    
    this.player = new Entity(game.world.centerX, game.world.centerY, [{c : "#3E4B6D", t: 0}, {c : "#3E4B6D", t: 1}], 60);
    
    x = [-60,20,80,100,160,300,320,360,380,440,460,580,500,600,700];
    y = [268,328,148,148,288,368,368,228,228,228,228,208,348,348,288];
    
    
/*    for(var i = 0; i < x.length; i++){
        x[i] = (x[i] + 60) * 2;
        y[i] = y[i];
    }
  */  
    
    this.player.setPath(x,y,1/100.0);
    this.player.vel = 0.5;

};

AppStates.Game.prototype.render = function() {
    
	
}

AppStates.Game.prototype.update = function () {
    
    game.debug.text(game.time.fps, 2, 14, "#00ff00");
    
    this.player.update()
    if(this.inputs.esc.isDown) {
        this.player.pos = 0;
    }
    
};

AppStates.Game.prototype.render = function () {
    //game.debug.text("inGame", 100, 100);
};

