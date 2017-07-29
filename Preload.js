AppStates.waitFont = false;


AppStates.FontReady = function () {
    this.waitFont = true;
    
}

WebFontConfig = {   

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, AppStates.FontReady, AppStates); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Merriweather']
    }

};

AppStates.bootState =  function(){
    this.progressBar;
    this.progress;
}

AppStates.bootState.prototype.preload = function () {   
    game.stage.setBackgroundColor(0x6F657F);
    game.stage.disableVisibilityChange = true;
    //show percentage   
    this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY-30, '0%', {fill: 'white'});    this.progress.anchor.setTo(.5,.5);        

    game.load.onFileComplete.add(this.fileComplete, this); 
    game.time.advancedTiming = true;
    game.state.start("load");
};

AppStates.bootState.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {  
    this.progress.text = progress+"%";
};

AppStates.loadState = function(){
    this.waitForFont = false;
}

AppStates.loadState.prototype.preload = function() {
    //  Load the Google WebFont Loader script
    if(this.waitForFont)
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    
    game.load.image("bg", "./asset/img/BG.png");    
    game.load.image("cube", "./asset/img/cube60.png");   
    game.load.image("menu", "./asset/img/menu.png"); 
    game.load.image("arrow", "./asset/img/arrow.png"); 
    game.load.image("dot", "./asset/img/dot.png");
    game.load.image("target", "./asset/img/target.png");
    game.load.image("OneOne", "./asset/img/Scenes/OneOne.png");   
    game.load.image("ThreeOne", "./asset/img/Scenes/ThreeOne.png");
    game.load.image("FourOne", "./asset/img/Scenes/FourOne.png");    
    game.load.image("ThreeTwo", "./asset/img/Scenes/ThreeTwo.png"); 
    game.load.image("FourTwo", "./asset/img/Scenes/FourTwo.png"); 
 


   
   /* game.load.image("brick", "./client/asset/img/brick.png");
    game.load.image("rabbitHole", "./client/asset/img/rabbitHole.png");
    game.load.image("pers", "./client/asset/img/pers.png");
    game.load.image("infinite", "./client/asset/img/infinite.png");
    game.load.image("colorPallet", "./client/asset/img/colorPallet.jpg");
    game.load.image("grass", "./client/asset/img/plants.png");
    game.load.spritesheet("button", "./client/asset/img/button.png", 194, 53);
    game.load.spritesheet("holder", "./client/asset/img/holder.png", 588, 81);
    game.load.spritesheet("arrow", "./client/asset/img/arrow.png", 20, 20);
    game.load.spritesheet("refresh", "./client/asset/img/refresh.png", 32, 32);
    game.load.spritesheet("out", "./client/asset/img/out.png", 32, 32);
    game.load.spritesheet("rabbit", "./client/asset/img/rabbitSprite.png", 32, 32);
*/
   
}

AppStates.loadState.prototype.create = function() {
    var progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY-30, '100%', {fill: 'white'});   
    progress.anchor.setTo(0.5, 0.5);
   
    
    //music.play();
}

AppStates.loadState.prototype.update = function () {
    
    if(AppStates.waitFont || !this.waitForFont) {
        game.state.start("menu");
    }
}