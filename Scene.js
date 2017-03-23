function Scene( path, scenarySpr, nextScene) {
    this.isStarted = false;
    
    this.scenarySprTag = scenarySpr;

    this.path = path;
    this.nextScene = nextScene;
    
    this.considerInput = true;
    this.isStatic = false;

    this.acceleration = 0;
    this.maxVel = 30
    this.playerWalkAlone = false;
    this.targetFollowPlayer = true;
    this.targetFollowPos = 480;
    this.followTarget = true;
    this.updateTargetAfterEnded = false;
    this.timeToEndAfterEndedPath = 5000;
    this.updateInputAfterEnded = false;
}

Scene.prototype.start = function(target, player, game) {
    this.HasEndedPath = false;
    this.isStarted = true;
    this.cursors = game.input.keyboard.createCursorKeys();
   
    this.target = target;
    this.player = player;
    if(this.path != null)
        player.setPath(this.path.x, this.path.y);
    
    if(this.followTarget) {
        game.camera.follow(this.target, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        this.bgWorld = game.add.sprite(-480,0,this.scenarySprTag);         
        game.world.setBounds(-480, 0, this.bgWorld.width + 120, this.bgWorld.height);
    }
    else {
        game.camera.unfollow();
        this.bgWorld = game.add.sprite(0,0,this.scenarySprTag);         
        game.world.setBounds(0, 0, this.bgWorld.width, this.bgWorld.height);
    }
    this.game = game;


    
    
    this.AdditionalStart();
    if(this.targetFollowPlayer)
        this.target.x = this.player.x + 30;
    else
        this.target.x = this.targetFollowPos;
    
    if(this.followTarget)
        game.camera.x = this.target.x - 480;
  
    
}

Scene.prototype.end = function() {
    this.player.hasEnded = false;
    this.bgWorld.destroy();
    this.AdditionalEnd();
    this.isStarted = false;
}   

Scene.prototype.update = function() {
    if(!this.isStarted)
        return;
    this.player.update();
    
    if(this.player.hasEnded) {
        if(!this.HasEndedPath) {
            this.HasEndedPath = true;
            this.OnEndedPath();
        }
        this.updateWhenEndedPath();
        
        if(this.updateInputAfterEnded){
            this.InputUpdate();
        }
        if(this.updateTargetAfterEnded) {
            this.TargetUpdate();
        }
    }
    else {
        this.InputUpdate();
        this.TargetUpdate();
    }
    
    if(this.playerWalkAlone) {
        this.Walk();
    }

    this.AdditionalUpdate();
    
}

Scene.prototype.InputUpdate = function() {
    if(this.considerInput) {
        if(this.cursors.right.isDown){
            this.Walk();
        }
        else{
            this.player.vel = 0;
        }
    }
}

Scene.prototype.TargetUpdate = function() {
    if(this.cursors.left.isDown){
        if(this.targetFollowPlayer)
            this.target.x = this.player.x - 60;
        else
            this.target.x =  this.targetFollowPos - 60;
    }
    else if(this.cursors.right.isDown){
        if(this.targetFollowPlayer)
            this.target.x = this.player.x + 120;
        else
            this.target.x = this.targetFollowPos + 120;
    }
    else {
        if(this.targetFollowPlayer)
            this.target.x = this.player.x + 30;
        else
            this.target.x = this.targetFollowPos + 30;
    }
}


Scene.prototype.Walk = function() {
    if(this.acceleration > 0) {
        this.player.vel += this.acceleration * game.time.physicsElapsed 
        if(this.maxVel != -1) {
            if(this.player.vel > this.maxVel) { 
                this.player.vel = this.maxVel
            }
        }   
    }
    else{
         this.player.vel =  this.maxVel;
    }
}

Scene.prototype.goToNextScene = function() {
    this.game.nextScene(this.nextScene);
}

/// Calbacks for especifics Scenes

Scene.prototype.updateWhenEndedPath = function() {
    
}

Scene.prototype.OnEndedPath = function() {
    if(this.timeToEndAfterEndedPath != -1){
          game.time.events.add(this.timeToEndAfterEndedPath, this.goToNextScene, this);
    }
}

Scene.prototype.AdditionalUpdate = function() {
    
}

Scene.prototype.AdditionalStart = function() {
    
}

Scene.prototype.AdditionalEnd  = function() {
    
}


