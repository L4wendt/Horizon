

socket.on('forceLogout', function(){
    game.state.start('menu');
    if(gameSocket) {
        delete gameSocket;
    }
    //AppStates.MenuScreen.prototype.errorText.text = "Server disconnected";
})

          

game.state.add("boot", AppStates.bootState);
game.state.add("load", AppStates.loadState);
game.state.add("menu", AppStates.MenuScreen);
game.state.add("lobby", AppStates.LobbyState);
game.state.add("game", AppStates.Game);
game.state.add("error", AppStates.Error);
game.state.add("createRoom", AppStates.CreateRoom);

//game.state.add("waitStart", AppStates.WaitStart);

game.state.start("boot");
