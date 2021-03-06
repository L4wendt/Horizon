// Em ordem inversa de aparição





// 4.4

pathOneOne = { x : [-76, 241, 366, 482, 594, 688, 778, 856, 955, 1060, 1147, 1242, 1340, 1467, 1581, 1723, 1851, 1957, 2024, 2089, 2184, 2300, 2395, 2521, 2668, 2753, 2812, 2884, 2974],
y : [363, 434, 452, 452, 428, 397, 359, 333, 308, 295, 328, 373, 415, 433, 404, 339, 295, 287, 318, 363, 394, 370, 347, 311, 277, 282, 316, 345, 343]};

pathFourFour = { x : [10, 241, 366, 482, 594, 688, 778, 856, 955, 1060, 1147, 1242, 1340, 1467, 1581, 1723, 1851, 1967, 2039, 2107, 2184, 2294, 2395, 2521, 2668, 2753, 2835, 2919],
y :  [384, 434, 452, 452, 428, 397, 359, 333, 308, 295, 328, 373, 415, 433, 404, 339, 295, 286, 325, 368, 394, 375, 347, 311, 277, 282, 337, 343]};

sceneFourFour = new Scene(pathFourFour, "OneOne");
sceneFourFour.updateWhenEndedPath = function() {
    if(this.target.x < 3390)
        this.target.x += 190 *game.time.physicsElapsed;
   // this.target.x = this.target.x + (3390 - this.target.x) * 0.01;
}
sceneFourFour.AdditionalStart = function(){
    game.camera.y = 960;
    
    this.other = new Entity(0,0,"cube",0xECC599);
    this.other.graphic.pivot.x = 30;
    this.other.graphic.pivot.y = 30;

    this.other.setPath(pathOneOne.x, pathOneOne.y);
}

sceneFourFour.AdditionalUpdate = function() {
    this.other.vel = this.player.vel;
    this.other.update();

}

sceneFourFour.AdditionalEnd = function() {
    this.other.destroy();
    
}


// 4.3

pathFourThree = {x:[30, 176, 336, 470, 588, 680, 750, 820, 872, 937, 971], y:[1200, 1217, 1162, 1093, 1021, 933, 843, 766, 719, 691, 689]};
sceneFourThree = new Scene(pathFourThree,"ThreeTwo", sceneFourFour);
sceneFourThree.targetFollowPlayer = true;
sceneFourThree.followTarget = false;
sceneFourThree.timeToEndAfterEndedPath = 1;

sceneFourThree.AdditionalStart = function(){
    game.camera.y = 960;
    
    this.other = new Entity(0,0,"cube",0xECC599);
    this.other.graphic.pivot.x = 30;
    this.other.graphic.pivot.y = 30;

    this.other.setPath(pathThreeTwo.x, pathThreeTwo.y);
}


sceneFourThree.AdditionalUpdate = function() {
    this.other.vel = this.player.vel;
    this.other.update();
    
    if(this.player.x > 180) {
        if(this.player.x < 730) {
            this.player.pos -= (0 + (20 - 0) * ((this.player.x - 180) / (730 - 180))) * game.time.physicsElapsed;
            this.other.pos -= (0 + (20 - 0) * ((this.player.x - 180) / (730 - 180))) * game.time.physicsElapsed;
        }
        else if (this.player.x < 850){
            this.player.pos -= 20 * game.time.physicsElapsed;
            this.other.pos -= 20 * game.time.physicsElapsed;
        }

       
        this.player.move();
        this.other.move();
    }
}


sceneFourThree.AdditionalEnd = function() {
    this.other.destroy();
    
}



// 1.4

pathOneFour = {x: [1630, 1898, 2013, 2097, 2185, 2391, 2529, 2679, 2763, 2819, 2883, 3001] , y: [374, 297, 307, 360, 397, 356, 309, 272, 286, 326, 350, 344]};

sceneOneFour = new Scene(pathOneFour, "OneOne", sceneFourThree);
sceneOneFour.maxVel = 90;
sceneOneFour.acceleration = 30;
sceneOneFour.stopAcceleration = false;
sceneOneFour.updateTargetAfterEnded = true;

sceneOneFour.AdditionalStart = function() {
    game.camera.x = 3390;
    this.targetFollowPos =  3010;
}

sceneOneFour.AdditionalUpdate = function() {
     if(this.player.hasEnded) {
         this.targetFollowPlayer = false;
         
         this.targetFollowPos += 250 * game.time.physicsElapsed;
         this.target.x = this.targetFollowPos + 120;
     }
}

// 4.2


pathFourTwoOther = {x:[36, 163, 263, 357, 459, 585, 718, 815, 911, 995, 1071, 1149, 1259, 1412, 1541, 1674, 1793, 1884, 1985, 2069, 2152, 2253, 2341],y:[273, 321, 349, 374, 397, 413, 383, 335, 285, 277, 309, 345, 354, 296, 270, 313, 346, 358, 333, 307, 277, 265, 253]};


pathFourTwo = {x: [102, 263, 357, 459, 585, 718, 815, 911, 995, 1071, 1149, 1259, 1412, 1541, 1674, 1793, 1884, 1985, 2069, 2152, 2253, 2341], y: [321, 349, 374, 397, 413, 383, 335, 285, 277, 309, 345, 354, 296, 270, 313, 346, 358, 333, 307, 277, 265, 253]};
sceneFourTwo = new Scene(pathFourTwo, "FourTwo", sceneOneFour)
sceneFourTwo.timeToEndAfterEndedPath = 1;
sceneFourTwo.AdditionalStart = function() {
    this.other = new Entity(0,0,"cube",0xECC599);
    this.other.graphic.pivot.x = 30;
    this.other.graphic.pivot.y = 30;

    this.other.setPath(pathFourTwoOther.x, pathFourTwoOther.y);
}

sceneFourTwo.AdditionalEnd = function() {
    this.other.destroy();
    
}

sceneFourTwo.AdditionalUpdate = function() {
    this.other.vel = this.player.vel;
    this.other.update();
}


// 3.2



pathThreeTwo = {x:[71, 176, 336, 470, 588, 680, 750, 820, 872, 937, 971], y:[1200, 1217, 1162, 1093, 1021, 933, 843, 766, 719, 691, 689]};
sceneThreeTwo = new Scene(pathThreeTwo,"ThreeTwo", sceneFourTwo);
sceneThreeTwo.targetFollowPlayer = false;
sceneThreeTwo.followTarget = false;
sceneThreeTwo.updateInputAfterEnded = true;

sceneThreeTwo.AdditionalStart = function(){
    this.travelling = true;
    this.considerInput = false;
    this.targetFollowPlayer = false;
    game.camera.follow(this.target, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    
}

sceneThreeTwo.AdditionalUpdate = function() {
    this.player.x = 30;
    if(this.travelling) {
        this.target.x = 510;
        this.target.y += 320 *game.time.physicsElapsed;
        if(this.target.y > 960) {
            this.target.y = 960
            this.considerInput = true;
            this.travelling = false;
        }
    }
    else 
    {
        if(this.player.x > 180) {
            this.player.pos -= (0 + (30 - 0) * ((this.player.x - 180) / (730 - 180))) * game.time.physicsElapsed;
            this.player.move();
        }
        if(this.player.x > 690){
            this.player.hasEnded = true;
        }
    }
    
}

// 1.3

sceneOneThree = new Scene(null, "OneOne", sceneThreeTwo);
sceneOneThree.considerInput = false;
sceneOneThree.AdditionalStart = function() {
    this.player.x = 3060.52;
    this.player.y =  341.07;
    this.player.graphic.x =  this.player.x;
    this.player.graphic.y =  this.player.y;
    
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
    this.otherSpr = game.add.sprite(2132,542, "cube");
    this.otherSpr.pivot.x = 30;
    this.otherSpr.pivot.y = 30;
    this.otherSpr.tint = 0xECC599;
}

sceneFourOne.AdditionalEnd = function() {
    this.otherSpr.destroy();
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


sceneOneOne = new Scene(pathOneOne, "OneOne", sceneThreeOne);
sceneOneOne.updateWhenEndedPath = function() {
    if(this.target.x < 3390)
        this.target.x += 190 *game.time.physicsElapsed;
   // this.target.x = this.target.x + (3390 - this.target.x) * 0.01;
}

