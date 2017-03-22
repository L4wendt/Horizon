// Em ordem inversa de aparição

// 1.3

pathThreeOne = {x : [-36, 179, 315, 434, 567, 680, 804, 864, 936],
y :  [108, 264, 303, 356, 437, 497, 527, 578, 666]}

sceneThreeOne = new Scene(pathThreeOne, "ThreeOne");
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




// 1.1
pathOneOne = { x : [10, 241, 366, 482, 594, 688, 778, 856, 955, 1060, 1147, 1242, 1340, 1467, 1581, 1723, 1851, 1957, 2024, 2089, 2184, 2300, 2395, 2521, 2668, 2753, 2812, 2884, 2974],
y : [384, 434, 452, 452, 428, 397, 359, 333, 308, 295, 328, 373, 415, 433, 404, 339, 295, 287, 318, 363, 394, 370, 347, 311, 277, 282, 316, 345, 343]};


sceneOneOne = new Scene(pathOneOne, "OneOne", sceneThreeOne);
sceneOneOne.updateWhenEndedPath = function() {
    this.target.x = this.target.x + (3390 - this.target.x) * 0.01;
}

