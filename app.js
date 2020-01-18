var scaleRatio = window.devicePixelRatio / 3;
var player;
var tn;
var td;
var tb;
var rocket;
var spring;
var coin;
var enemy_m;
var enemy_s;

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    // scale :{
    //     parent: 'gamespace',
    //     mode: Phaser.scale.FIT,
    //     autoCenter: Phaser.scale.CENTER_BOTH
    // },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            // gravity: {y : 200}
        }
    },
    scene: [Game],
    // plugins: {
    //     scene: [
    //         {
    //             key: key,
    //             plugin: pluginName,
    //             start: true
    //         }
    //     ]
    // },
    backgroundColor: 0xeeeeee
};

var game = new Phaser.Game(config);

