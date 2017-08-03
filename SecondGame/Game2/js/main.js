//creates new instance of phaser.game object and sets dimensions
var game = new Phaser.Game(640, 360, Phaser.AUTO);
//Phaser.AUTO means phaser will try to use webgl for rendering but if not available will fall back to canvas

//game state, States are a javascript object
var GameState = {
    //method where all game files are loaded
    preload: function(){
        
        //loads background image to gamestate load is a phaser object
        this.load.image("background","assets/images/background.png"); //(image reference key to be used, filepath)
        
        
        /** using spritesheets now instead
        //loads chicken image
        this.load.image("chicken","assets/images/chicken.png");
        //loads horse image
        this.load.image("horse","assets/images/horse.png");
        //loads pig image
        this.load.image("pig","assets/images/pig.png");
        //loads sheep image
        this.load.image("sheep","assets/images/sheep3.png");
        **/
        //loads arrow image
        this.load.image("arrow","assets/images/arrow.png");
        
        
        //loads chicken spritesheet (reference key, file path, width, height, number of frames)                   
        this.load.spritesheet("chicken","assets/images/chicken_spritesheet.png", 131, 200, 3); 
        //loads horse spritesheet
        this.load.spritesheet("horse","assets/images/horse_spritesheet.png", 212, 200, 3); 
        //loads pig spritesheet
        this.load.spritesheet("pig","assets/images/pig_spritesheet.png", 297, 200, 3); 
        //loads sheep spritesheet
        this.load.spritesheet("sheep","assets/images/sheep_spritesheet.png", 244, 200, 3); 
        
        
        //loads animal sounds in both oog and mp3, phaser figures out which one to use
        this.load.audio("chickenSound",["assets/audio/chicken.ogg", "assets/audio/chicken.mp3"]);
        this.load.audio("horseSound",["assets/audio/horse.ogg", "assets/audio/horse.mp3"]);
        this.load.audio("pigSound",["assets/audio/pig.ogg", "assets/audio/pig.mp3"]);
        this.load.audio("sheepSound",["assets/audio/sheep.ogg", "assets/audio/sheep.mp3"]);
    },
    
    create: function(){
        //sets scale mode to take up the largest window space while maintaining the aspect ratio
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        //centers the game
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        
        //creates background sprite and adds it to the Gamestate Object so it can be referred to in other methods
        this.background = this.game.add.sprite(0,0,'background')//(coordinates for top left of image, image key)
        
        //group for animals
        //array of objects
        //key refers to our object keys created when we uploaded sprites
        var animalData = [
            {key:'chicken',text:'CHICKEN', audio:'chickenSound'},
            {key:'horse',text:'HORSE', audio:'horseSound'},
            {key:'pig',text:'PIG', audio:'pigSound'},
            {key:'sheep',text:'SHEEP', audio:'sheepSound'}
        ];
        
        //creates a group called animals
        this.animals = this.game.add.group();
        
        //variable created as we cannot use this. to target game inside a foreach loop
        var self = this;
        //variable for keeping each object in animalData
        var animal;
        
        animalData.forEach(function(element){ //element will take the value of each object in animalData 1 at a time
            
            //adds each animal to the group and renders them to screen well out of site
            animal = self.animals.create(-1000, self.game.world.centerY, element.key, 0); //final parameter = starting animation slide
            
            //object for everything not phaser related
            animal.customParams = {text: element.text, sound: self.game.add.audio(element.audio) };
            
            //sets anchor point of animal to center
            animal.anchor.setTo(0.5);
            
            //create an animal animation (name of animation, order of frames, frames per second, loop true or false?)
            animal.animations.add('animate', [0, 1, 2, 1, 0, 1], 3, false);
            
            //allows user input to object
            animal.inputEnabled = true;
            
            //user must click on actual animal
            animal.input.pixelPerfectClick = true;
            
            //runs the animateAnimal on animal when user clicks or touches
            animal.events.onInputDown.add(self.animateAnimal, self);
            
            
            
        });
        
        //variable for animal that's being shown
        //uses next method to get the next item in animals
        //will keep getting next animal each time it's called
        this.currentAnimal = this.animals.next();
        //puts current animal in center of screen
        this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);
        
        //show animal text
        this.showText(this.currentAnimal);
        

        //creates left arrow sprite
        this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, "arrow");
         //sets left arrow anchor to center
        this.leftArrow.anchor.setTo(0.5);
        //flips arrow to face left
        this.leftArrow.scale.x = -1;
        //custom parameters to be used later
        this.leftArrow.customParams = { direction: -1};
        
        //left arrow allow user input
        this.leftArrow.inputEnabled = true;
        //sets so that actual arrow must be clicked instead of rectangle around it
        this.leftArrow.input.pixelPerfectClick = true;
        //listens for touch or click event then executes the switchAnimal method
        this.leftArrow.events.onInputDown.add(this.switchAnimal, this);
        
      
        
        
        
        
        
        //creates right arrow sprite
        this.rightArrow = this.game.add.sprite(580, this.game.world.centerY,"arrow");
        //sets right arrows anchor to center
        this.rightArrow.anchor.setTo(0.5);
        
        //custom parameters to be used later
        this.rightArrow.customParams = { direction: 1 };
        
          //right arrow allow user input
        this.rightArrow.inputEnabled = true;
        //sets so that actual arrow must be clicked instead of rectangle around it
        this.rightArrow.input.pixelPerfectClick = true;
        //listens for touch or click event then executes the switchAnimal method
        this.rightArrow.events.onInputDown.add(this.switchAnimal, this);
        
        
        
        
        
        
        
        
        
    },
    //executed multiple times per second
    //collision detection etc
    update: function(){
    },
    
    //switch animal method
    //used in arrow click event handlers to change animal 
    switchAnimal: function(sprite, event) {
        
        //uses the isMoving method to return the value of false when object is moving and true when it's not
        if(this.isMoving) {
            return false;
        }
        this.isMoving = true;
        
        //hide text
        this.animalText.visibile = false;
        
        
        var newAnimal, endX;
        
        //get direction of arrow
        //if arrow is right, next animal in animals group
        if(sprite.customParams.direction > 0 ) {
            newAnimal = this.animals.next();
            
            //start position of new animal
            newAnimal.x = -newAnimal.width/2;
            
            //moves current animal just off the screen to right
            endX = 640 + this.currentAnimal.width/2;
        }
        //if arrow is left, previous animal in animals group
        else{
            newAnimal = this.animals.previous();
            //start position of new animal
            newAnimal.x = 640 + newAnimal.width/2;
            //moves current animal just off screen to left
            endX = -this.currentAnimal.width/2;
        }
        
        //adds a tween to newAnimal object
        var newAnimalMovement = game.add.tween(newAnimal);
        //tween is to move the x axis of newAnimal to the center of the screen and to take 1 second to do so
        newAnimalMovement.to({x: this.game.world.centerX}, 1000);
        
        //changes value of isMoving to false when newAnimalMovement is complete
        //allows next animation to be played
        newAnimalMovement.onComplete.add(function(){
            this.isMoving = false;
            
            this.showText(newAnimal);
        },this);
        //calls the newAnimalMovement method
        newAnimalMovement.start();
        
        //adds tween to currentAnimal object
        //moves it out of the way to make way for newAnimal
        var currentAnimalMovement = this.game.add.tween(this.currentAnimal);
        //move animal from current position to our predefined final position endX
        currentAnimalMovement.to({x: endX}, 1000);
        //fires the currentAnimalMovement method
        currentAnimalMovement.start();
        
        
        
        //moves currentAnimal to endX position when switchAnimal is called
        this.currentAnimal.x = endX;
        
        //puts new animal in center of screen
        newAnimal.x = this.game.world.centerX;
        
        //Sets new animal to value of current animal variable
        this.currentAnimal = newAnimal;
        
        
        
    },
        //play animal animation when called
    animateAnimal: function(sprite, event) {
        sprite.play('animate');
        
        //plays animals noise
        sprite.customParams.sound.play();
    },
    //shows animal text
  showText: function(animal) {
    if(!this.animalText) {
      var style = {
        font: 'bold 30pt Arial',
        fill: '#D0171B',
        align: 'center'
      }
      this.animalText = this.game.add.text(this.game.width/2, this.game.height * 0.85, '', style);
      this.animalText.anchor.setTo(0.5);
    }

    this.animalText.setText(animal.customParams.text);
    this.animalText.visible = true;
  }
};
//adds GameState variable as a new gamestate called GameState
game.state.add('GameState', GameState);
    
//launches game
game.state.start("GameState");
