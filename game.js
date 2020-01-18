class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }
   
    preload (){
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

    create (){
        
        this.aGrid=new AlignGrid({scene:this,rows:11, cols:11});
        this.aGrid.showNumbers();
        
        player = this.physics.add.image(game.config.width /2, game.config.height/2, 'player');
        player.body.collideWorldBounds = true;
        player.setVelocity(0,-400);
        player.setGravityY(200);
        player.setBounce(.4);
        player.displayWidth=game.config.width*.1;
        player.scaleY=player.scaleX;
        
        tn = this.add.image(100,25,'tile-n');
        tn.displayWidth=game.config.width*.2;
        tn.scaleY=tn.scaleX;

        td = this.add.image(300,75,'tile-d');
        td.displayWidth=game.config.width*.2;
        td.scaleY=td.scaleX;

        tb = this.add.image(600,25,'tile-b');
        tb.displayWidth=game.config.width*.2;
        tb.scaleY=tb.scaleX;
        
        this.key_L = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.key_R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.key_U = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

    }

    update (delta){
        if(this.key_L.isDown)
            player.x -= 20;
        if(this.key_R.isDown)
            player.x += 20;
        if(this.key_U.isDown)
            player.setVelocityY(-400);
    }
}