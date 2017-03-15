
AppStates.LobbyState = function () {
    this.id = null;
  
}

AppStates.LobbyState.prototype.createRoom = function() {
    
    this.nextRoom = 4;
    this.previousRoom = -1;
    
    for( i in this.blockRoom) {
        this.blockRoom[i].setVisible(false);
    }
    
    this.blockRoom = [];
    
    this.active = [];
    var y = 73;
    for(var i in this.rooms) {
        var room = new RoomBox(this.rooms[i]);
        room.move(5,y);
        this.blockRoom.push(room);
        y+= room.holder.height + 5;
        if(i >= 4) {
            room.setVisible(false);
        }
    }

    
    for(var i = 0; i < 4; i++) {
        
        this.active.push(i);
    }       
    
    this.active.reverse();
    
    gBlockRoom = this.blockRoom;
    
}
AppStates.LobbyState.prototype.Refresh = function() {
    
}

AppStates.LobbyState.prototype.Play = function() {
    /*if(AppStates.room){
        game.state.start('game');
    }*/
    socket.emit('canEnterRoom', AppStates.room);
}
AppStates.LobbyState.prototype.canEnterRoom = function(response) { 
    if(response == 'sucess') {
        game.state.start('game');
    }
    else if(response == "not found") {
        this.errorText.text = 'not Found';         
    }
    else if(response == "full room") {
        this.errorText.text = 'The room is Full';         
    }
    
}


AppStates.LobbyState.prototype.create = function() {
    var lobby = this;
    socket.on('canEnterRoom', function(response) {
        lobby.canEnterRoom(response);
    })
    socket.on('SendRoom', function(pack) {
        lobby.rooms = pack.valueOf();
    
        lobby.createRoom();
    });
    
    this.nextRoom = 4;
    this.previousRoom = -1;
    
    socket.emit('RequestRoom');
    this.buttons = {down: {}, up : {}, play : {}, create : {}, refresh : {}, out : {} };
    this.buttons.up = game.add.button(593, 73, 'arrow', this.MoveUp, this, 2, 0, 1, 2);
    this.buttons.up.anchor.set(0, 0.5);
    this.buttons.up.scale.y = -1;
    this.buttons.up.anchor.set(0, 1);
    
    
    this.buttons.down = game.add.button(593, 412, 'arrow', this.MoveDown, this, 2, 0, 1, 2);
    this.buttons.down.anchor.set(0, 1);
    
    this.buttons.refresh = game.add.button(640, 0, 'refresh', function() {
    socket.emit('RequestRoom');
    }, this, 1, 0, 2, 1);
    this.buttons.refresh.anchor.set(1,0);
    
    this.buttons.out = game.add.button(0, 0, 'out', function() {
        game.state.start('menu')
        socket.emit('logout');
    }, this, 1, 0, 2, 1);
    
    this.buttons.play = game.add.button(613,419, 'button', this.Play, this, 1, 0, 2, 0);
    this.buttons.play.anchor.set(1, 0);
    this.buttons.play.text = game.add.text(this.buttons.play.x - this.buttons.play.width/2, this.buttons.play.y, "Play");
    this.buttons.play.text.font = fontname;
    this.buttons.play.text.addColor("#000000", 0);
    this.buttons.play.text.anchor.set(0.5,-0.5);
    this.buttons.play.text.align = 'center';
    
    this.buttons.create = game.add.button(5,419, 'button', function() {
        game.state.start('createRoom');
    }, this, 1, 0, 2, 0);
    this.buttons.create.text = game.add.text(this.buttons.create.x , this.buttons.create.y + 1, "Create\nRoom");
    this.buttons.create.text.font = fontname;
    this.buttons.create.text.fontSize = 20;
    this.buttons.create.text.addColor("#000000", 0);
    this.buttons.create.text.anchor.set(-0.25, -0.02);
    this.buttons.create.text.align = 'center';
    
    
    this.errorText = game.add.text(10, 10, "Error", { font: '12px ' + fontname, fill: "#ff0000", align: "center" });
    this.errorText.anchor.set(0, 0);
    this.errorText.text = "";
    
}
    

AppStates.LobbyState.prototype.update = function() {
    
  
}

AppStates.LobbyState.prototype.MoveDown = function(){
    
    if(this.nextRoom < this.blockRoom.length) {
     
        this.blockRoom[this.active.pop()].setVisible(false);
        this.blockRoom[this.nextRoom].setVisible(true);
        this.active.unshift(this.nextRoom);
        this.nextRoom++;
        this.previousRoom++;
        for(var i in this.blockRoom) {
            this.blockRoom[i].move(0, - this.blockRoom[i].holder.height - 5 );
        }
    }
    if(this.nextRoom >= this.blockRoom.length) {
        
        this.buttons.down.setFrame(3);
    }
    
}
AppStates.LobbyState.prototype.MoveUp = function(){

    if(this.previousRoom >= 0) {
        this.blockRoom[this.active[0]].setVisible(false);
        this.active.shift();
        console.log(this.previousRoom);
        this.blockRoom[this.previousRoom].setVisible(true);
        this.active.push(this.previousRoom);
        this.previousRoom--;
        this.nextRoom--;
        for(var i in this.blockRoom) {
            this.blockRoom[i].move(0, + this.blockRoom[i].holder.height + 5 );
        }
    }
    if(this.previousRoom < 0) {
        this.buttons.up.setFrame(3);
    }

}

