var config = {
    type: Phaser.AUTO,
    width: 900,
    height: 1600,
    scale :{
        mode: Phaser.scale.RESIZE,
        autoCenter: Phaser.scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y : 200}
        }
    },
    scene: {
        preload: preload,
        create: create
    },
    plugins: {
        scene: [
            {
                key: key,
                plugin: pluginName,
                start: true
            }
        ]
    },
    backgroundColor: 0x333333
};

var game = new Phaser.Game(config);

function preload (){
    this.load.svg('player', 'assets/player-01.svg')
    this.load.svg('tile', 'assets/')
    this.load.svg('tile-n', 'assets/tile-n-01.svg')
    this.load.svg('tile-d', 'assets/tile-d-01.svg')
    this.load.svg('tile-b', 'assets/tile-b-01.svg')
    this.load.svg('rocket', 'assets/')
    this.load.svg('spring', 'assets/')
    this.load.svg('coin', 'assets/')
    this.load.svg('enemy-m', 'assets/')
    this.load.svg('enemy-s', 'assets/')
}

function create (){

}