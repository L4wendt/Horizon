AppStates.CreateRoom = function() {
    
}

AppStates.CreateRoom.prototype.create = function() {
    socket.emit('getMapsInfo');
    var t = this;
    socket.on('getMapsInfo', function(pack) {
        t.getMapsInfo(pack)
    });
    socket.on('createdRoom', function(id){
        AppStates.room = id;
        game.state.start('game');
    })
    this.buttons = {out : {}, create : {}};
   
    this.buttons.out = game.add.button(0, 0, 'out', function() {
        game.state.start('lobby')
    }, this, 1, 0, 2, 1);

    this.buttons.create = game.add.button(613,419, 'button', this.createRoom, this, 1, 0, 2, 0);
    this.buttons.create.anchor.set(1, 0);
    this.buttons.create.text = game.add.text(this.buttons.create.x - this.buttons.create.width/2, this.buttons.create.y, "Create");
    this.buttons.create.text.font = fontname;
    this.buttons.create.text.addColor("#000000", 0);
    this.buttons.create.text.anchor.set(0.5,-0.5);
    this.buttons.create.text.align = 'center';
    
    this.title = game.add.text(game.world.centerX, 20, "Create Room");
    this.title.anchor.set(0.5,0);
    this.title.font = fontname;
    this.title.fontSize = 30;
    this.title.align = 'center';
    this.title.addColor("#000000", 0);
    
    this.roomNameText = game.add.text(30, 130, "Room Name");
    this.roomNameText.font = fontname;
    this.roomNameText.fontSize = 12;

    this.roomName = game.add.inputField(30, 150, {
        font: '12px '+fontname,
        fill: '#212121',
        fontWeight: 'bold',
        width: 200,
        padding: 6,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 2,
        placeHolder: 'room name',
        type: Fabrique.InputType.text
    });
    
    this.numMaxText = game.add.text(400, 130, "N° max of players");
    this.numMaxText.font = fontname;
    this.numMaxText.fontSize = 12;

    this.numMax = game.add.inputField(400, 150, {
        font: '12px '+fontname,
        fill: '#212121',
        fontWeight: 'bold',
        width: 200,
        padding: 6,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 2,
        placeHolder: '-1 for infinite',
        type: Fabrique.InputType.number
    });
    
    this.holderMap = game.add.sprite(game.world.centerX, game.world.centerY, "holder", 0);
    this.holderMap.anchor.set(0.5, 0);
    this.holderMap.scale.set(0.5,1);
    this.holderMap.tint = 0x466834;
    
    this.holderMap.text = game.add.text(game.world.centerX, game.world.centerY, "");
    this.holderMap.text.font = fontname;
    this.holderMap.text.fontSize = 16;
    this.holderMap.text.anchor.set(0.5, -0.1);
    this.holderMap.text.align = 'center';
    
    this.buttons.right = game.add.button(game.world.centerX + this.holderMap.width/2 + 10, game.world.centerY + this.holderMap.height/2, 'arrow', function() {
        this.holderMap.c+=1;
        if(this.holderMap.c >= this.arrayMap.length) {
            this.holderMap.c = 0;
        }

        this.holderMap.text.text = this.arrayMap[this.holderMap.c].name + this.arrayMap[this.holderMap.c].info; 
    }, this, 2, 0, 1, 2);
    this.buttons.right.anchor.set(0.5, 0.5);
    this.buttons.right.rotation = 270 * 3.14 / 180;
    

    
    this.buttons.left = game.add.button(game.world.centerX - this.holderMap.width/2 - 10, game.world.centerY + this.holderMap.height/2, 'arrow', function() {
        this.holderMap.c-=1;
        if(this.holderMap.c < 0) {
            this.holderMap.c = this.arrayMap.length - 1;
        }
        this.holderMap.text.text = this.arrayMap[this.holderMap.c].name + this.arrayMap[this.holderMap.c].info; 
    }, this, 2, 0, 1, 2);
    this.buttons.left.anchor.set(0.5 , 0.5);
    this.buttons.left.rotation = 90 * 3.14 / 180;
    
    
    this.arrayMap = [];
}

AppStates.CreateRoom.prototype.getMapsInfo = function(pack) {
    this.holderMap.c = 0;
    for(var i = 0; i < pack.length; i+= 1 ) {
        this.arrayMap.push(pack[i]);
        console.log(this.arrayMap[0]);
    }
    console.log(this.arrayMap);
    this.holderMap.text.text = this.arrayMap[this.holderMap.c].name + this.arrayMap[this.holderMap.c].info; 
    
}

AppStates.CreateRoom.prototype.createRoom = function(){
    var info = {
        name : this.roomName.value,
        numMax : this.numMax.value,
        mapName : this.arrayMap[this.holderMap.c].name, 
        
    };
    socket.emit('CreateRoom', info);
}