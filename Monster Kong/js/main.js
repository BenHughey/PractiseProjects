//this game has only 1 state
var GameState = {
    //initiate game settings
    init: function() {
        //adapt to screen size, fit all the game
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
     
        
        //starts phasers arcade physics system on game allowing gravity
        //collision detection etc
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //allows gravity only on the y axis, 1000 is the strength of the gravity
        this.game.physics.arcade.gravity.y = 1000;
        
        
        //creates a variable called cursors that listens for keyboard input
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        //sets the size of the world, slightly taller than our screen size
        this.game.world.setBounds(0,0, 360, 700); //(start x, start y, end x, end y)
        
        this.RUNNING_SPEED = 180;
        this.JUMPING_SPEED = 550;
    },
    
    //load game assets
    preload: function() {
        this.load.image("ground", "assets/images/ground.png");
        this.load.image("platform", "assets/images/platform.png");
        this.load.image("goal", "assets/images/gorilla3.png");
        this.load.image("arrowButton", "assets/images/arrowButton.png");
        this.load.image("actionButton", "assets/images/actionButton.png");
        this.load.image("barrel", "assets/images/barrel.png");
        
        this.load.spritesheet("player", "assets/images/player_spritesheet.png", 28, 30, 5, 1, 1);
        this.load.spritesheet("fire", "assets/images/fire_spritesheet.png", 20, 21, 2, 1, 1);
        
        //loads json file containing data about platforms etc
        //as it's loaded as a text file, it still needs to be parsed as a json file
        this.load.text("level", "assets/data/level.json");
    },
    
    //executed after everything has loaded
    create: function() {
        //ground sprite
        this.ground = this.add.sprite(0, 638, "ground");
        //enables arcade physics on ground object
        this.game.physics.arcade.enable(this.ground);
        //stops ground falling off the game
        this.ground.body.allowGravity = false;
        //ground can't be moved by collision etc
        this.ground.body.immovable = true;
        
        
        //parse json file, gets, allows is to turn text that's formatted correctly into json object 
        this.levelData = JSON.parse(this.game.cache.getText('level'));
        
        console.log(this.levelData);
        
        //array containing coordinates of all our platform objects
        /** Now being imported from json file instead
        var platformData = [
            {"x":0, "y":430},
            {"x":45, "y":560},
            {"x":90, "y": 290},
            {"x":0, "y":140}
        ];
        **/
        
        //creates group for platforms
        this.platforms = this.add.group();
        
        //gives body (physics) to all objects in platforms group
        this.platforms.enableBody = true;
        
        //loops through each element in platform data array from json object
        this.levelData.platformData.forEach(function(element){
            //creates a platform using the platform sprite and the coordinates of each object given in our array
            this.platforms.create(element.x, element.y, "platform");
            
        }, this);
        
        //sets body immovable to true on all objects in the platforms group
        //platforms won't be able to be pushed by other objects
        this.platforms.setAll("body.immovable", true);
        this.platforms.setAll("body.allowGravity", false);
        
        //creates fires group using json fireData array
        this.fires = this.add.group();
        //enables physics for fire so we can check for collision/overlapping
        this.fires.enableBody = true;
        
          
       
        var fire;
        //creates a fire object for each object in firedata using x and y for its coordinates and using the fire spritesheet
        this.levelData.fireData.forEach(function(element){
           fire = this.fires.create(element.x, element.y, "fire");
            //creates animation, (animation name, frame sequence, fps, loop y/n?)
           fire.animations.add("fire", [0, 1], 4, true);
            //plays animation right away
           fire.play("fire");
        }, this);
            //turns gravity off for fires
         this.fires.setAll("body.allowGravity", false);
        
        //creates goal (gorilla) using coordinates stored in json file
        this.goal = this.add.sprite(this.levelData.goal.x, this.levelData.goal.y, "goal");
        //enables physics on goal, enableBody is only required when enabling physics on group
        this.game.physics.arcade.enable(this.goal);
        //disable gravity for gorilla
        this.goal.body.allowGravity = false;
        
        
        this.player = this.add.sprite(10, 545, "player", 3); //frame number 3
        this.player.anchor.setTo(0.5);
                                //(ref key, animation sequence, frames per second, loop y/n?)
        this.player.animations.add("walking", [0,1,2,1], 6, true);
        //enables arcade physics on player
        this.game.physics.arcade.enable(this.player);
        
        this.player.customParams = {};
        
        //stops player from walking out of world
        this.player.collideWorldBounds = true;
        
        //sets the camera to follow the player through the world
        this.game.camera.follow(this.player);
        
        //create on screen controls for mobile
        this.createOnScreenControls();
        
        //creates a group called barrels
        this.barrels = this.add.group();
        //enables physics on barrel group
        this.barrels.enableBody = true;
        
        //creates a barrel right away
        this.createBarrel();
        //creates a timer that executes the createBarrel method every how ever many seconds barrelFrequnecy JSON is set to
        this.barrelCreator = this.time.events.loop(Phaser.Timer.SECOND * this.levelData.barrelFrequency, this.createBarrel, this);
        
    },
    //executed multiple times per second
    update: function() {
        //uses the arcade collide method to check if 2 objects have collided
        this.game.physics.arcade.collide(this.player, this.ground); //can add a function to be executed as a 3rd parameter if required
   
        //checks for collision between barrels and platform
        this.game.physics.arcade.collide(this.barrels, this.platforms);
        //checks for collision between barrels and ground
        this.game.physics.arcade.collide(this.barrels, this.ground);
        //checks for collision between player and any items in the platforms group
        this.game.physics.arcade.collide(this.player, this.platforms);
        
        //checks for overlap between player and fires and executes killplayer method
        this.game.physics.arcade.overlap(this.player, this.fires, this.killPlayer);
        //checks for overplat between player and barrels and executes killPlayer method
        this.game.physics.arcade.overlap(this.player, this.barrels, this.killPlayer);
        
        //checks for overlap between player and gorilla and executes win method
        this.game.physics.arcade.overlap(this.player, this.goal, this.win)
        
        //sets so player is not moving in x direction without input
        this.player.body.velocity.x = 0;
        
        
        if(this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
            //when player presses left key player will move left at the velocity of running speed
            this.player.body.velocity.x = -this.RUNNING_SPEED;
            //makes sure player is facing right way
            this.player.scale.setTo(1, 1);
            //plays walking animation
            this.player.play("walking");
        }
        
        else if(this.cursors.right.isDown || this.player.customParams.isMovingRight) {
            //when player presses right keyboard key player will move right at velocity of running speed
            this.player.body.velocity.x = this.RUNNING_SPEED;
            //flips player on x axis so running animation faces right way
            this.player.scale.setTo(-1, 1);
            //plays walking animation
            this.player.play("walking");
        }
        else{
            //ends walking animation when player not moving
            this.player.animations.stop();
            //changes frame back to player standing facing camera
            this.player.frame = 3;
        }
        //checks if up arrow button or action touch button is pushed and player is still on ground or touching another object
        if((this.cursors.up.isDown || this.player.customParams.mustJump) && (this.player.body.touching.down)) {
            //player moves towards top of screen 
            this.player.body.velocity.y = -this.JUMPING_SPEED;
            //turns jump off again
            this.player.customParams.mustJump = false;
        }
        //kills barrel when it gets to the bottom left of the world 
        //reusing a pool of dead barrels prevents memory leak
        this.barrels.forEach(function(element){
            if(element.x < 10 && element.y > 600) {
                element.kill();
            }
        })
    },

    //method for creating on screen touch controls
    createOnScreenControls: function(){
        //creates left arrow button    (coordinates, reference key)
        this.leftArrow = this.add.button(20, 535, "arrowButton");
        this.rightArrow = this.add.button(110, 535, "arrowButton");
        this.actionButton = this.add.button(280, 535, "actionButton");
        
        //makes buttons semi transparent
        this.leftArrow.alpha = 0.5;
        this.rightArrow.alpha = 0.5;
        this.actionButton.alpha = 0.5;
        
        //stops on screen buttons from moving with camera
        this.leftArrow.fixedToCamera = true;
        this.rightArrow.fixedToCamera = true;
        this.actionButton.fixedToCamera = true;
        
        //event listener for action button
        this.actionButton.events.onInputDown.add(function(){
            this.player.customParams.mustJump = true;
        },this);
        // changes mustJump to false when button is released
        this.actionButton.events.onInputUp.add(function(){
            this.player.customParams.mustJump = false;
        },this);
        
        
        //event listener for hovering over buttons with mouse
         this.actionButton.events.onInputOver.add(function(){
            this.player.customParams.mustJump = true;
        },this);
        this.actionButton.events.onInputOut.add(function(){
            this.player.customParams.mustJump = false;
        },this);
        
        
        
            
        
                //event listener for left touch button
        this.leftArrow.events.onInputDown.add(function(){
        this.player.customParams.isMovingLeft = true;
        },this);
        // changes isMovingLeft to false when button is released
        this.leftArrow.events.onInputUp.add(function(){
        this.player.customParams.isMovingLeft = false;
        },this);
        
        //mouse hover on left button
        this.leftArrow.events.onInputOver.add(function(){
        this.player.customParams.isMovingLeft = true;
        },this);
        // changes isMovingLeft to false when button is released
        this.leftArrow.events.onInputOut.add(function(){
            this.player.customParams.isMovingLeft = false;
        },this);
        
        
        // event listener for right touch button
        this.rightArrow.events.onInputDown.add(function(){
        this.player.customParams.isMovingRight = true;
        },this);
        // changes isMovingRight to false when button is released
        this.rightArrow.events.onInputUp.add(function(){
        this.player.customParams.isMovingRight = false;
        },this);
        
        //mouse hover on right button
        this.rightArrow.events.onInputOver.add(function(){
        this.player.customParams.isMovingRight = true;
        },this);
        // changes isMovingLeft to false when button is released
        this.leftArrow.events.onInputOut.add(function(){
            this.player.customParams.isMovingRight = false;
        },this);
    },
    //method that executes when player is killed
    killPlayer: function(player, fire) {
        //restarts game
        alert("Game Over");
        game.state.start('GameState');
        
    },
    win: function(player, goal){
        alert("Congratulations! you won!");
        game.state.start('GameState');
        
    },
    //method for creating barrels
    createBarrel: function() {
        //gets the first dead sprite if it exists
        var barrel = this.barrels.getFirstExists(false);
        //if none already exist create one
        if(!barrel){
            barrel = this.barrels.create(0,0, "barrel");
        }
        //allows barrels to collide with the edges of the world
        barrel.body.collideWorldBounds = true;
        //makes barrels bounce on x when it hits something (edge of world)
        barrel.body.bounce.set(1,0);
        
        //places barrel at coordinates of gorilla
        barrel.reset(this.levelData.goal.x, this.levelData.goal.y);
        
        //sets the x velocity of the barrel using barrelSpeed in the json file
        barrel.body.velocity.x = this.levelData.barrelSpeed;
    }
};

var game = new Phaser.Game(360, 592, Phaser.AUTO);
game.state.add("GameState", GameState);
game.state.start("GameState");