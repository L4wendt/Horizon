AppStates.MenuScreen = function () {
   
}

AppStates.MenuScreen.prototype.create = function() {
    game.stage.backgroundColor = "#6F657F";
    //"#6F657F"
    //game.state.start("game");
    
    this.background = game.add.sprite(0,0,"bg");
    
    this.title = game.add.text(game.world.centerX, 20, "passo");
    this.title.anchor.set(0.5,0);
    this.title.font = fontname;
    this.title.fontSize = 90;
    this.title.align = 'center';
    this.title.addColor("#ecc599", 0);
    this.title.alpha = 0;
    
    this.menu1 = game.add.sprite(0, 412, "menu");
    this.menu2 = game.add.sprite(-960, 412, "menu");
    
    this.arrow1 = game.add.sprite(750, 250, "arrow");
    this.arrow1.alpha = 0;
    this.arrow2 = game.add.sprite(210, 250, "arrow");
    this.arrow2.alpha = 0;

    this.arrow2.scale.x = -1;
    
    
    this.player = game.add.sprite(960/2, 395, "cube");
    this.player.tint = 0x3E4B6D;
    this.player.pivot.x = 30;
    this.player.pivot.y = 30;
    this.player.vel = 0;
    this.player.alpha = 0;
    this.cursors = game.input.keyboard.createCursorKeys();

    
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

temp = 0

AppStates.MenuScreen.prototype.update = function() {
   
    
    if(this.title.alpha < 0.99) {
        this.title.alpha = Math.abs(Math.sin(game.time.now/3000));
        this.player.alpha = Math.abs(Math.sin(game.time.now/3000));
        
    }
    else{
        temp += game.time.physicsElapsed/2;
        
        this.arrow1.alpha = Math.abs(Math.sin(temp));
        
        if(temp > 0.2)
            this.arrow2.alpha = Math.abs(Math.sin(temp - 0.2));
        
    }
    
    
    
    
    if(this.cursors.right.isDown){
        this.player.vel += 1.5 * game.time.physicsElapsed;
        if(this.player.vel > 20)
            this.player.vel = 20;
    }
    if(this.cursors.left.isDown){
        this.player.vel -= 1.5 * game.time.physicsElapsed;
        if(this.player.vel < -20)
            this.player.vel = -20;
    }
    
    if((!this.cursors.right.isDown && !this.cursors.left.isDown) || this.player.x < -720){
        if(this.player.vel > 0) {
            this.player.vel -= 5 * game.time.physicsElapsed;
        if(this.player.vel < 0)
            this.player.vel = 0;
            
        }
        else {
            this.player.vel += 5 * game.time.physicsElapsed;
        if(this.player.vel > 0)
            this.player.vel = 0;
        }
    }
    
    this.player.x += this.player.vel;
    
    
    if(this.player.x > 960){
       game.state.start("game");
    }
    
    
}


