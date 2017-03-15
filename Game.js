AppStates.Game = function () {
    this.playing = true;
};

AppStates.Game.prototype.update = function () {
    if(this.playing == true){
        if(this.inputs.down.isDown) {
            if(EntityList[this.id].state.state != "move") {
                EntityList[this.id].state = {state: "move", arg: "down"};
                gameSocket.emit("changeState", EntityList[this.id].state);
            }   
            else {
                if(EntityList[this.id].state.arg != "down") {
                    EntityList[this.id].state = {state: "move", arg: "down"};
                    gameSocket.emit("changeState", EntityList[this.id].state);
                } 
            };
        }
        if(this.inputs.up.isDown) {
            if(EntityList[this.id].state.state != "move") {
                EntityList[this.id].state = {state: "move", arg: "up"};
                gameSocket.emit("changeState", EntityList[this.id].state);
            }   
            else {
                if(EntityList[this.id].state.arg != "up") {
                    EntityList[this.id].state = {state: "move", arg: "up"};
                    gameSocket.emit("changeState", EntityList[this.id].state);
                } 
            };
        }
        if(this.inputs.right.isDown) {
            if(EntityList[this.id].state.state != "move") {
                EntityList[this.id].state = {state: "move", arg: "right"};
                gameSocket.emit("changeState", EntityList[this.id].state);
            }  
            else {
                if(EntityList[this.id].state.arg != "right") {
                    EntityList[this.id].state = {state: "move", arg: "right"};
                    gameSocket.emit("changeState", EntityList[this.id].state);
                } 
            };
        }
        if(this.inputs.left.isDown) {
            if(EntityList[this.id].state.state != "move") {
                EntityList[this.id].state = {state: "move", arg: "left"};
                gameSocket.emit("changeState", EntityList[this.id].state);
            } 
            else {
                if(EntityList[this.id].state.arg != "left") {
                    EntityList[this.id].state = {state: "move", arg: "left"};
                    gameSocket.emit("changeState", EntityList[this.id].state);
                } 
            };
        }
      
        if(this.inputs.space.isDown) {
            EntityList[this.id].state = {state: "", arg: ""};
            gameSocket.emit("changeState", EntityList[this.id].state);
        }
    }
    else{
        if(this.inputs.down.isDown && this.inputs.down.can) {
            this.inputs.down.can = false;
            
            if(this.spectatingIndex != undefined) {
                this.spectatingIndex--;
                if(this.spectatingIndex < 0) {
                    this.spectatingIndex = 0;
                }
                var temp = 0;
                for(var i in EntityList){
                    if(temp == this.spectatingIndex) {
                        this.spectatingId = i;
                        break;
                    }
                    temp++;
                }
            }
            else {
                for(var i in EntityList){
                    this.spectatingIndex = 0;
                    this.spectatingId = i;
                    break;
                }
            }
            
            if(this.spectatingId) {
                game.camera.follow(EntityList[this.spectatingId].sprite);
            }
        }
        else if(this.inputs.down.isUp) {
            this.inputs.down.can = true;

        }
        
        if(this.inputs.up.isDown && this.inputs.up.can) {
            this.inputs.up.can = false;
            
            if(this.spectatingIndex != undefined) {
                this.spectatingIndex++;
                var size = 0;
                for(var i in EntityList) {
                    size++;
                }
                if(this.spectatingIndex >= size) {
                    this.spectatingIndex = size -1;
                }
                var temp = 0;
                for(var i in EntityList){
                    if(temp == this.spectatingIndex) {
                        this.spectatingId = i;
                        break;
                    }
                    temp++;
                }
            }
            else {
                for(var i in EntityList){
                    this.spectatingIndex = 0;
                    this.spectatingId = i;
                    break;
                }
            }
            
            if(this.spectatingId) {
                game.camera.follow(EntityList[this.spectatingId].sprite);
            }
        }
        else if(this.inputs.up.isUp) {
            this.inputs.up.can = true;

        }
        
        if(this.inputs.left.isDown && this.inputs.left.can) {
            this.inputs.left.can = false;
            if(this.spectatingIndex != undefined ) {
                this.spectatingIndex--;
                if(this.spectatingIndex < 0) {
                    this.spectatingIndex = 0;
                }
                var temp = 0;
                for(var i in EntityList){
                    if(temp == this.spectatingIndex) {
                        this.spectatingId = i;
                        break;
                    }
                    temp++;
                }
            }
            else {
                for(var i in EntityList){
                    this.spectatingIndex = 0;
                    this.spectatingId = i;
                    break;
                }
            }
            
            if(this.spectatingId) {
                game.camera.follow(EntityList[this.spectatingId].sprite);
            }
        } 
        else if(this.inputs.left.isUp) {
            this.inputs.left.can = true;

        }
        
        if(this.inputs.right.isDown && this.inputs.right.can) {
            this.inputs.right.can = false;

            if(this.spectatingIndex != undefined) {
                this.spectatingIndex++;
                var size = 0;
                for(var i in EntityList) {
                    size++;
                }
                if(this.spectatingIndex >= size) {
                    this.spectatingIndex = size -1;
                }
                var temp = 0;
                for(var i in EntityList){
                    if(temp == this.spectatingIndex) {
                        this.spectatingId = i;
                        break;
                    }
                    temp++;
                }
            }
            else {
                for(var i in EntityList){
                    this.spectatingIndex = 0;
                    this.spectatingId = i;
                    break;
                }
            }
            
            if(this.spectatingId) {
                game.camera.follow(EntityList[this.spectatingId].sprite);
            }
        }
         else if(this.inputs.right.isUp) {
            this.inputs.right.can = true;

        }
    
    }
    if(this.inputs.esc.isDown) {
        game.state.start('lobby');
        gameSocket.emit('logout');  
        }
    
};

AppStates.Game.prototype.render = function () {
    //game.debug.text("inGame", 100, 100);
};

AppStates.Game.prototype.setMyID = function(id) {
    AppStates.Game.prototype.id = id;
    EntityList[id].state = {state : "", arg : {}};
    game.camera.follow(EntityList[this.id].sprite);
}

AppStates.Game.prototype.onTurn = function (pack) {
    var i; 
    for(i = 0; i < pack.entity.length; i+=1) {
        if(EntityList[pack.entity[i].id]) {
            if(pack.entity[i].state == "move") {
                EntityList[pack.entity[i].id].move(pack.entity[i].x, pack.entity[i].y);
            }
            if(pack.entity[i].state == "onHole") {
                EntityList[pack.entity[i].id].move(pack.entity[i].x, pack.entity[i].y);
                game.add.tween(EntityList[pack.entity[i].id].sprite.anchor).to({x : 1, y: 1}, 100, "Linear", true);
                game.add.tween(EntityList[pack.entity[i].id].sprite).to({angle : 180}, 200, "Linear", true);
                var deleteEntity = function(obj, tween){
                    var i = tween.index;
                    console.log(i);
                    if(pack.entity[i].id == this.id){
                        this.playing = false;
                        this.spectatingId = undefined;
                        this.spectatingIndex = undefined;
                        for(var ent in EntityList){
                            if(ent != pack.entity[i].id){
                                this.spectatingId = ent;
                                this.spectatingIndex = 0;

                                break;
                            }
                            
                        }
                        if(this.spectatingId == undefined){
                            console.log("No entity to be spectated!");
                        }
                        else{
                            game.camera.follow(EntityList[this.spectatingId].sprite);
                            console.log("Following player with id " + this.spectatingId);
                        }
                        
                        this.inputs.down.can = false;
                        this.inputs.up.can = false;
                        this.inputs.right.can = false;
                        this.inputs.left.can = false;

                    }
                    EntityList[pack.entity[i].id].sprite.destroy();
                    delete EntityList[pack.entity[i].id];
                };
                var scaleDown = game.add.tween(EntityList[pack.entity[i].id].sprite.scale).to({x : 0, y: 0}, 500, "Linear", true);
                scaleDown.index = i;
                scaleDown.onComplete.add(deleteEntity, this);
            }
        }
        else {
           // console.log(pack);
            EntityList[pack.entity[i].id] = new Entity(pack.entity[i]);
        }
    }
    if(this.id) {
        if(EntityList[this.id]){
             EntityList[this.id].state = {state : "", arg : {}};   
        }
    }
};

AppStates.Game.prototype.startGame = function (pack) {
    var x, y;
    console.log(pack.map);
    for(y = 0; y < pack.map.size.y; y++) {
        for(x = 0; x < pack.map.size.x; x++) {
            game.add.sprite(x * 32, y * 32, "grass");
            if(pack.map.coords[y * pack.map.size.x + x] != 0) {  
                if(pack.map.coords[y * pack.map.size.x + x] == 3) {
                   // game.add.sprite(x * 32, y * 32, "spawn");
                    game.add.sprite(x * 32, y * 32, "rabbitHole");
                }
                else if(pack.map.coords[y * pack.map.size.x + x] == 2) {
                    //game.add.sprite(x * 32, y * 32, "spawn");
                    //game.add.sprite(x * 32, y * 32, "rabbitHole");
                }
                else {
                    game.add.sprite(x * 32, y * 32, "brick");
                } 
            }
        }
    }
    
    var i;
    for (i = 0; i < pack.entity.length; i+=1) {
        console.log("Created a new Enitity on start");
        EntityList[pack.entity[i].id] = new Entity(pack.entity[i]);
    }
    game.world.setBounds(0, 0, pack.map.size.x*32, pack.map.size.y*32);
    
    AppStates.readySocket = true;
};

AppStates.Game.prototype.newEntity = function(pack){
    EntityList[pack.id] = new Entity(pack);
}

AppStates.Game.prototype.create = function () {
    gameSocket = io('/game');
    var gameThis = this;
    gameSocket.on('startGame', function(pack) {
        if(pack.state == "sucess") {
            gameThis.startGame(pack);
            console.log("Entered Room");
        }
        else if (pack.state == "Room Full") {
            game.state.start("lobby");
        }
        else
        {
            //game.state.start("lobby");
            game.state.start("error");
        }
    });

    gameSocket.on("EntityDeleted", function(idDeleted){ 
        console.log("Asked to destroy entity");
        EntityList[idDeleted].sprite.destroy();
        delete EntityList[idDeleted];
    });

    gameSocket.on('yourIDis', function(id){
        gameThis.setMyID(id);
        
    });

    gameSocket.on('onTurn', function(pack) { 
        gameThis.onTurn(pack);
       // AppStates.Game.onTurn(pack)
    });
    
    gameSocket.on('newEntity', function(pack) {
        gameThis.newEntity(pack);
    });
    gameSocket.on('message', function(data){
        console.log(data);
    });
    
    gameSocket.on('getID', function(id) {
        socket.emit('setIDGame', id);
    });
    
    gameSocket.on('forceLogout', function(){
        gameSocket.emit('logout');
    })
    
    socket.on('getID', function(id) {
        gameSocket.emit('setIDdefault', id)
        
        gameSocket.emit('enterRoom', AppStates.room);
    });
    
    

    gameSocket.emit('getID');
    socket.emit('getID');
    
    this.inputs = {down : {}, up : {}, right : {}, left : {}, esc : {}, space : {}};
    this.inputs.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.inputs.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.inputs.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.inputs.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.inputs.esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    this.inputs.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
 

};
