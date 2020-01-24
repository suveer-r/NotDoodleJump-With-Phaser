var config = {
    type: Phaser.AUTO,
    scale : {
        parent: 'gamespace',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 600,
        height: 800
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true
        }
    },
    scene: [Game, ],
    backgroundColor: 0xeeeeee
};
// console.log(game.config.scale);
var game = new Phaser.Game(config);

