var tile;
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
        /* AlignGrid util from https://phasergames.com/ */
        this.aGrid=new AlignGrid({scene:this,rows:11, cols:11});
        this.aGrid.showNumbers(); //debugging the Grid

        // this.physics.world.setBounds(false, false, false, true);
// scene.physics.world.setBounds(x, y, width, height, checkLeft, checkRight, checkUp, checkDown);
        
        this.createPlayer();
        this.cameraYMin = 99999;
        this.cameras.main.startFollow(player,true);
        

      /*   this.createTiles();
        

         */
        
        /* tn = this.add.image(0,0,'tile-n');
        this.aGrid.placeAtIndex(1,tn);
        // tn.displayWidth=game.config.width*.2;
        // tn.scaleY=tn.scaleX;
        tn.scale = .5; */

        // this.placeTile(80,'tile-n');
        // this.row = this.makeRow('tile-n','tile-d','tile-b');
        // row.setImmovable();
        // this.physics.add.collider(player, row);

        this.key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.key_Up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

    }
    
    

    createPlayer(){
        player = this.physics.add.image(0,0, 'player');
        this.aGrid.placeAtIndex(93,player);
        player.body.setCollideWorldBounds();
        player.setVelocity(0,-400);
        player.setGravityY(200);
        player.setBounce(.4);
        player.body.checkCollision.up = false;
        player.body.checkCollision.down = true;
        player.body.checkCollision.left = false;
        player.body.checkCollision.right = false;
        // player.displayWidth=game.config.width*.1;
        // player.scaleY=player.scaleX;
        player.scale = .5;

        /* this.player.yOrig = this.player.y;
        this.player.yChange = 0; */

    }
    
    /* controlPlayer(){
        this.world.wrap( this.player, this.player.width / 2, false );
        this.player.yChange = Math.max( this.player.yChange, Math.abs( this.player.y - this.player.yOrig ) );
        
        if( this.player.y > this.cameraYMin + this.game.height && this.player.alive ) {
            // game over
        }
        
    }
    */
    

    update (delta){
        // this.platforms.forEach(this.wrapPlatform, this);

        if(this.key_left.isDown)
            player.body.velocity.x = -400;
        else if(this.key_right.isDown)
            player.body.velocity.x = 400;
            else
                    player.body.velocity.x = 0;
            
        if(this.key_Up.isDown)
            player.body.velocity.y = -400;

        this.physics.world.wrap(player, 32 );

        /* if((player.y <= game.config.height/2) && (player.body.velocity.y < 0))
            tile.setVelocityY(0-player.body.velocity.y); */
    }

    

}