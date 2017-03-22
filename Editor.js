AppStates.Editor = function () {

};

AppStates.Editor.prototype.create = function () {
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.input.keyboard.addKey(Phaser.Keyboard.F).onUp.add(AppStates.goFull);
    
    game.world.setBounds(0, 0, 3840, 1280);
      console.log(game.camera.x);

    
    game.time.advancedTiming = true;
    game.time.desiredFps = 60;
    
    this.inputs = { right : {}, left : {}, esc : {}, space : {}};
    this.cursors = game.input.keyboard.createCursorKeys();
    this.inputs.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.inputs.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.inputs.esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    this.inputs.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.inputs.printButton = game.input.keyboard.addKey(Phaser.Keyboard.C);
    this.background = game.add.sprite(0,0,"bg");
    

    this.bgWorld = game.add.sprite(-480,0,"OneOne");
   // this.bgWorld = game.add.sprite(0,0,"ThreeOne");
    this.path = new Path(this.bgWorld.width * 1.2, this.bgWorld.height* 1.2);
    this.path.AddArray(pathOneOne);
    
    game.world.setBounds(-480, -480, this.bgWorld.width * 1.2 + 480, this.bgWorld.height* 1.2 + 480);
      
    this.target = game.add.sprite(960/2+90,640/2, "target");
    this.target.pivot.x = 30;
    
 


    
    this.player = new Entity(960/2, 640/2, "cube", 0x3E4B6D);
    this.player.graphic.pivot.x = 30;
    this.player.graphic.pivot.y = 30;
    this.player.debugMode = true;
   
    game.input.onTap.add(this.handleTap, this);
    

    
    this.follow = true;
    game.camera.follow(this.target, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
  

};

AppStates.Editor.prototype.render = function() {
    
	
}

AppStates.Editor.prototype.update = function () {
  
    this.background.x = game.camera.x;
    game.debug.text(game.time.fps, 2, 14, "#00ff00");
    
    this.player.update()

    if(this.path.wasUpdated){
        this.path.wasUpdated = false;
        this.player.setPath(this.path.x,this.path.y,1/300);
    }
    if(this.inputs.space.isDown) {
        this.follow = !this.follow;
        if(this.follow) {
            game.camera.follow(this.target, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        }
        else{
            game.camera.unfollow();
        }
    }
    
    /// Player and Target
    if(this.inputs.left.isDown) {
        this.target.x = this.player.x - 30;
        this.player.vel = -30;
    }
    else if(this.inputs.right.isDown){
        this.target.x = this.player.x + 90;
        this.player.vel = 30;
    }
    else {
        this.target.x = this.player.x + 30;
        this.player.vel = 0;
    }
    
    /// Camera
    if (this.cursors.left.isDown)
    {
        game.camera.x -= 4;
    }
    else if (this.cursors.right.isDown)
    {
        game.camera.x += 4;
    }
    if (this.cursors.up.isDown)
    {
        game.camera.y -= 4;
    }
    else if (this.cursors.down.isDown)
    {
        game.camera.y += 4;
    }


    if(this.inputs.printButton.isDown) {
        console.log("Path: ");
        console.log(this.path.x);
        console.log(this.path.y);
        console.log("-End Path");

    }
};

AppStates.Editor.prototype.addPoint = function() {
    this.path.AddPoint(game.input.x + game.camera.x, game.input.y + game.camera.y);
}

AppStates.Editor.prototype.handleTap = function(pointer, doubleTap) {
   this.addPoint();
}

