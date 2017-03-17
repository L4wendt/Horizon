game.state.add("boot", AppStates.bootState);
game.state.add("load", AppStates.loadState);
game.state.add("menu", AppStates.MenuScreen);
game.state.add("editor", AppStates.Editor);
game.state.add("game", AppStates.Game);
game.state.add("error", AppStates.Error);


//game.state.add("waitStart", AppStates.WaitStart);

game.state.start("boot");
