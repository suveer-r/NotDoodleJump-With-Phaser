// var tile;
var scaleRatio = window.devicePixelRatio / 3;
var player;
var tilesGroup;
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
		super("Game");
	}

	preload() {
		/* Preload all assets. */
		this.load.svg("player", "assets/player-01.svg");
		this.load.svg("tile", "assets/");
		this.load.svg("tile-n", "assets/tile-n-01.svg", { scale: 1.3 });
		this.load.svg("tile-d", "assets/tile-d-01.svg", { scale: 1.3 });
		this.load.svg("tile-b", "assets/tile-b-01.svg", { scale: 1.3 });
		this.load.svg("rocket", "assets/");
		this.load.svg("spring", "assets/");
		this.load.svg("coin", "assets/");
		this.load.svg("enemy-m", "assets/");
		this.load.svg("enemy-s", "assets/");
	}

	create() {
		
		/* Create Floor */
		var floor = this.physics.add.image(game.config.width/2, 830,'tile-b');
		floor.setImmovable();
		floor.scale = 6;

		/* Create Tiles/Platforms */
		this.createTiles();
		/* Create Player Model */
        this.createPlayer();

		/* Collision checks and events */
		this.physics.add.collider(player, floor);
		this.physics.add.collider(player, tilesGroup, this.bounceBack, null, this);

		/* camera and tile tracking vars */
		this.cameraYMin = 99999;
		this.tileYMin = 99999;
		
		/* Control setup, Kbd only for now! Mouse and touch or Gyro later */
		this.key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		this.key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
		this.key_Up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
	}

	/* Bounce off Regular Tiles */
	bounceBack(_player, _tilesGroup){
		if (_player.body.touching.down && _tilesGroup.body.touching.up)
            {
				player.body.velocity.y = -400;                
            }
	}

	/* Create Player Model */
	createPlayer() {
        player = this.physics.add.image(game.config.width/2, 3*game.config.height/4, "player");
		// player.body.setCollideWorldBounds();
		player.setVelocity(0, -400);
		player.setGravityY(360);
		player.setBounce(0.4);
		player.body.checkCollision.up = false;
		player.body.checkCollision.down = true;
		player.body.checkCollision.left = false;
		player.body.checkCollision.right = false;
		player.scale = 0.5;
		player.depth = 1;

		player.yOrig = player.y;
        player.yChange = 0;
    }
	
	/* Create Regular Tiles/Platform */
    createTiles(){
        tilesGroup = this.physics.add.staticGroup({runChildUpdate: false});
		tilesGroup.enableBody = true;
		var tileChild = tilesGroup.getChildren();
		
		// spawnTile();
		for( var i = 0; i<5; i++){
			this.spawnTile( Phaser.Math.Between( 25, this.physics.world.bounds.width - 25 ), this.physics.world.bounds.height - 200 - 200 * i, 'tile-n');
		}
		
		
	} 
	/* Sub function for Regular tiles. Might be handy other tiles in future */  
    spawnTile(x, y, type){
		var tile = tilesGroup.create(x, y, type);
		tile.setImmovable();
		return tile;
	}

	update(delta) {

        /* Dynamically change world bounds based on player pos */
		// scene.physics.world.setBounds(x, y, width, height, checkLeft, checkRight, checkUp, checkDown);
        this.physics.world.setBounds(0, -player.yChange, this.physics.world.bounds.width, this.game.config.height + player.yChange);

        /* Camera tracking */
        // this.cameras.main.startFollow(player, true);
        this.cameras.main.setLerp(.5);
		this.cameras.main.centerOnY(player.y);
		
		if (this.key_left.isDown) player.body.velocity.x = -400;
		else if (this.key_right.isDown) player.body.velocity.x = 400;
		else player.body.velocity.x = 0;

		/* Up arrow to give Y velocity for debug beyond camera screen */
		if (this.key_Up.isDown) player.body.velocity.y = -400;

		this.physics.world.wrap(player, player.width / 6, false);

        /* track the maximum amount that the hero has travelled */
		player.yChange = Math.max( player.yChange, Math.abs( player.y - player.yOrig ) );

		/* For each tilesGroup child, find out which is the highest
		if one goes below the camera view, then create a new one at a distance from the highest one
		these are pooled so they are very performant */
		tilesGroup.children.iterate(function( item ) {
			this.tileYMin = Math.min( this.tileYMin, item.y )
			this.cameraYMin = Math.min( this.cameraYMin, player.y - this.game.config.height + 430 );
			if( item.y > this.cameraYMin + this.game.config.height ) {
				item.destroy();
				this.spawnTile( Phaser.Math.Between( 25, this.physics.world.bounds.width - 25 ), this.tileYMin - 200, 'tile-n');
			}
		}, this );
	
}
	
}
