/*AppStates.WaitStart = function() {
    
}
AppStates.WaitStart.prototype.update  = function() {
   
}*/



AppStates.MenuScreen = function () {
    this.errorText = 10
}

AppStates.MenuScreen.prototype.create = function() {
    game.stage.backgroundColor = "#B7D3AA";
    
    this.title = game.add.text(game.world.centerX, 20, "Rabit Hole");
    this.title.anchor.set(0.5,0);
    this.title.font = fontname;
    this.title.fontSize = 60;
    this.title.align = 'center';
    this.title.addColor("#7F0000", 0);
   // this.title.addColor("#007F00", 6);


    //this.title.tint = 0x7F0000;
    
    //-------LOGIN-SESSION-------//
    //Text Field
    this.username = game.add.inputField(30, 150, {
        font: '12px '+fontname,
        fill: '#212121',
        fontWeight: 'bold',
        width: 200,
        padding: 6,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 2,
        placeHolder: 'Username',
        type: Fabrique.InputType.text
    });
    
    //Text Field
    this.password = game.add.inputField(30, 200, {
        font: '12px '+fontname,
        fill: '#212121',
        fontWeight: 'bold',
        width: 200,
        padding: 6,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 2,
        placeHolder: 'Password',
        type: Fabrique.InputType.password
    });
    
    //Button
    this.button = game.add.button(40, 260,
                                  "button",
                                 this.loginDown, this,
                                 1, 0, 2, 0);
    this.button.text = game.add.text(this.button.x + this.button.width/2,
                                     this.button.y + this.button.height/2, "Login");
    this.button.text.anchor.set(0.5,0.4)
    this.button.text.font = fontname;
    this.button.text.align = 'center';
    //-----LOGIN-SESSION-ENDED-----//
    
    //------REGISTER-SESSION-------//
    //Text Field
    this.newUsername = game.add.inputField(390, 110, {
        font: '12px '+fontname,
        fill: '#212121',
        fontWeight: 'bold',
        width: 200,
        padding: 6,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 2,
        placeHolder: 'Username',
        type: Fabrique.InputType.text
    });
    
    //Text Field
    this.newPassword = game.add.inputField(390, 160, {
        font: '12px '+fontname,
        fill: '#212121',
        fontWeight: 'bold',
        width: 200,
        padding: 6,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 2,
        placeHolder: 'Password',
        type: Fabrique.InputType.password
    });
    
    //Text Field
    this.reNewPassword = game.add.inputField(390, 210, {
        font: '12px '+fontname,
        fill: '#212121',
        fontWeight: 'bold',
        width: 200,
        padding: 6,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 2,
        placeHolder: 'Confirm Password',
        type: Fabrique.InputType.password
    });
    
    //Color Pallet
    this.colorText = game.add.text(400+this.button.width/2, 245, "Chose your player color\nSelect one from bellow");
    this.colorText.anchor.set(0.5,0);
    this.colorText.fill = "212121";
    this.colorText.fontSize = 8;
    this.colorText.font = fontname;
    this.colorText.align = 'center';
    
    this.colorPallet = game.make.bitmapData(160, 30);
    this.colorPallet.draw('colorPallet', 0, -5, 160, 35);
    this.colorPallet.update();
    this.colorPalletSprite = game.add.sprite(400, 280,this.colorPallet);
    
    this.toolTip = game.make.bitmapData(30, 30);
    this.color = Phaser.Color.createColor(166, 166, 166);
    this.toolTip.fill(this.color.r, this.color.g, this.color.b);
    this.toolTipSprite = game.add.sprite(565, 280, this.toolTip);
    
    game.input.addMoveCallback(this.updateTooltip, this);
    
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
    //-----REGISTER-SESSION-END-----//
    
    
    //----------ERROR-LOG-----------//
    this.errorText = game.add.text(320, 430, "Error", { font: '12px ' + fontname, fill: "#ff0000", align: "center" });
    this.errorText.anchor.set(0.5, 0.5);
    this.errorText.text = "";
    //--------ERROR-LOG-END---------//
    
    AppStates.readySocket = false;
    
    //Callback for response
    var error = this.errorText;
    socket.on("loginResponse", function( response ){
        console.log(response);
        if(response == "connected"){
            console.log("Connected successfully with the server!");
            game.state.start("lobby");
            error.text = "";
        }
        else if(response == "wrong password"){
            console.log("Password is wrong, try again!");
            error.text = "Password is wrong, try again!";
        }
        else if(response == "no user"){
            console.log("User does not exists! Check your username and try again!");
            error.text = "User does not exists!\nCheck your username and try again!";
        }
        else if(response == "already connected") {
                    console.log("User already connected!");
                    error.text = "User already connected!";
        }
    });
    
    
}

AppStates.MenuScreen.prototype.updateTooltip = function(pointer, x, y) {
    if (pointer.isDown)
	{
        var cPSpr = this.colorPalletSprite;
        var cP = this.colorPallet;
		if (x >= cPSpr.x && x <= cPSpr.x + cP.width && y >= cPSpr.y && y <= cPSpr.y + cP.height)
        {
            this.color = cP.getPixelRGB((x-cPSpr.x), parseInt(y-cPSpr.y));
            this.toolTip.fill(this.color.r, this.color.g, this.color.b);
        }
	}
    
}

AppStates.MenuScreen.prototype.update = function() {
    
}

AppStates.MenuScreen.prototype.loginDown = function() {
    //Emit login information
    socket.emit('login', {name:this.username.value, password:this.password.value});
}

AppStates.MenuScreen.prototype.singInDown = function() {
    this.newPassword.value = this.newPassword.value.trim();
    this.reNewPassword.value = this.reNewPassword.value.trim();
    this.newUsername.value = this.newUsername.value.trim();
    
    if(this.newPassword.value.length * this.reNewPassword.value.length * this.newUsername.value.length != 0)
    {
        if(this.newPassword.value == this.reNewPassword.value){

            //Emit login information
            var colorHex = "0x"+("00"+this.color.r.toString(16)).slice(-2)+("00"+this.color.g.toString(16)).slice(-2)+("00"+this.color.b.toString(16)).slice(-2);
            socket.emit('signin', {name:this.newUsername.value, password:this.newPassword.value, color:colorHex});

            var error = this.errorText;
            //Callback for response
            socket.on("signinResponse", function( response ){
                if(response == "user exists"){
                    console.log("User already exists! Try another username...");
                    error.text = "User already exists! Try another username...";
                }
              
            });
        }
        else{
            console.log("Passwords don't match!");
            this.errorText.text = "Passwords don't match!";
        }
    }
    else{
        console.log("You must fill all fields!");
        this.errorText.text = "You must fill all fields!";
    }
    
}