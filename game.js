var tile;
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
        
        player = this.physics.add.image(0,0, 'player');
        this.aGrid.placeAtIndex(93,player);
        player.body.collideWorldBounds = true;
        player.setVelocity(0,-400);
        player.setGravityY(200);
        player.setBounce(.4);
        // player.displayWidth=game.config.width*.1;
        // player.scaleY=player.scaleX;
        player.scale = .5;
        console.log(this.player);
        
        this.key_L = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.key_R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.key_U = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        
        /* tn = this.add.image(0,0,'tile-n');
        this.aGrid.placeAtIndex(1,tn);
        // tn.displayWidth=game.config.width*.2;
        // tn.scaleY=tn.scaleX;
        tn.scale = .5;

        td = this.add.image(0,0,'tile-d');
        this.aGrid.placeAtIndex(3,td);
        // td.displayWidth=game.config.width*.2;
        // td.scaleY=td.scaleX;
        td.scale = .5;

        tb = this.add.image(0,0,'tile-b');
        this.aGrid.placeAtIndex(9,tb);
        // tb.displayWidth=game.config.width*.2;
        // tb.scaleY=tb.scaleX;
        tb.scale = .5; */

        // this.placeTile(80,'tile-n');
        this.row = this.makeRow('tile-n','tile-d','tile-b');
        // row.setImmovable();
        // this.physics.add.collider(player, row);



    }
    
    makeRow(key1, key2, key3){
        for (var i = 1; i < 54; i = i+4){
            this.placeTile(i,key1);
        }
        console.log(this.makeRow);
    }

    placeTile(pos, key){
        tile = this.physics.add.image(0,0,key);
        // tile.displayWidth=game.config.width*.2;
        // tile.scaleY=tile.scaleX;
        this.aGrid.placeAtIndex(pos, tile);
        tile.scale = .5;
        // tile.setVelocityY(200);
        // tile.setGravityY(200);
        tile.setImmovable();
        this.physics.add.collider(player, tile);
        // tile.setVelocityY = player.body.velocity.y;
    }

    update (delta){
        if(this.key_L.isDown)
            player.x -= 20;
        if(this.key_R.isDown)
            player.x += 20;
        if(this.key_U.isDown)
            player.setVelocityY(-400);
        if((player.y <= game.config.height/2) && (player.body.velocity.y < 0))
            tile.setVelocityY(0-player.body.velocity.y);

        console.log(tile.body.velocity);
    }

}