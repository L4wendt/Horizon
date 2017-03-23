// Em ordem inversa de aparição


// 1.3

sceneOneThree = new Scene(null, "OneOne");
sceneOneThree.AdditionalStart = function() {
    this.player.x = 3060.52;
    this.player.y =  341.07;
    this.player.graphic.x = 3060.52;
    this.player.graphic.y =  341.07;
    
    this.updateTargetAfterEnded = true;
    this.player.hasEnded = true;
    this.timeToEndAfterEndedPath = 10000;
    this.targetFollowPos = 3390;
    this.target.x = 3390;
    this.targetFollowPlayer = false;
    
    //game.camera.unfollow();
    game.camera.x = 3390 - 480;
   // game.camera.follow(this.target, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
}


// 4.1

pathFourOne = {x:[31, 142, 303, 437, 650, 849, 994, 1068, 1161, 1278, 1395, 1515, 1624, 1761, 1899, 1983],y : [318, 335, 391, 422, 397, 354, 337, 344, 388, 445, 467, 466, 502, 547, 543, 543]};

sceneFourOne = new Scene(pathFourOne, "FourOne", sceneOneThree);
sceneFourOne.AdditionalStart = function() {
    this.other = game.add.sprite(2132,542, "cube");
    this.other.pivot.x = 30;
    this.other.pivot.y = 30;
    this.other.tint = 0xECC599;
}

sceneFourOne.AdditionalEnd = function() {
    this.other.destroy();
}

sceneFourOne.timeToEndAfterEndedPath = 2000;


// 3.1

pathThreeOne = {x : [-36, 179, 315, 434, 567, 680, 804, 864, 936],
y :  [108, 264, 303, 356, 437, 497, 527, 578, 666]}

sceneThreeOne = new Scene(pathThreeOne, "ThreeOne", sceneFourOne);
sceneThreeOne.playerWalkAlone = true;
sceneThreeOne.maxVel = 30;
sceneThreeOne.followTarget = false;

sceneThreeOne.AdditionalUpdate = function() {
    if(this.cursors.right.isDown){
        this.player.vel = 45;
    }
    else if(this.cursors.left.isDown){
        this.player.vel = 15;
    }
    else {
        this.player.vel = 30;
    }
}

sceneThreeOne.timeToEndAfterEndedPath = 1;




// 1.1
pathOneOne = { x : [10, 241, 366, 482, 594, 688, 778, 856, 955, 1060, 1147, 1242, 1340, 1467, 1581, 1723, 1851, 1957, 2024, 2089, 2184, 2300, 2395, 2521, 2668, 2753, 2812, 2884, 2974],
y : [384, 434, 452, 452, 428, 397, 359, 333, 308, 295, 328, 373, 415, 433, 404, 339, 295, 287, 318, 363, 394, 370, 347, 311, 277, 282, 316, 345, 343]};


sceneOneOne = new Scene(pathOneOne, "OneOne", sceneThreeOne);
sceneOneOne.updateWhenEndedPath = function() {
    if(this.target.x < 3390)
        this.target.x += 190 *game.time.physicsElapsed;
   // this.target.x = this.target.x + (3390 - this.target.x) * 0.01;
}

