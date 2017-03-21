/*// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};*/


var game = new Phaser.Game(960, 640, Phaser.AUTO);

var AppStates  = {
    readySocket : false,
    room : "",
    goFull: function() {
        if (game.scale.isFullScreen)
        {
            game.scale.stopFullScreen();
        }
        else
        {
            game.scale.startFullScreen(false);
        }
    }
};

var fontname = 'Merriweather';

function Lerp(xi,xf, t) {
    return xi + (xf - xi) * t;
}