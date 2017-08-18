//Home State for Heli Escape game
//written by Ben Hughey
var HomeState = {
    
    init: function(message) {
        this.message = message;
    },
    
    create: function(){
        //putting these in variables so computer only has to calculate it once
        var cameraWidthCenter = this.game.camera.width/2;
        var cameraHeightCenter = this.game.camera.height/2;
        
        var style = {font: '35px Arial', fill: '#fff'};
        var headerText = this.game.add.text(cameraWidthCenter, cameraHeightCenter -120, 'Heli Escape', style);
        headerText.anchor.setTo(0.5);
  
        
      
        //creates button used to start game using the menuButton sprite places it in center of page
       var playbutton = this.game.add.button(cameraWidthCenter, cameraHeightCenter - 50, "menuButton");
        //calls setupButton to set buttons attributes
        this.setupButton(playbutton);
        //calls our addbuttontext method that places given text at same coordinates as given button
        this.addButtonText(playbutton, "Play Game");
         //creates button for instructions
       var instructionsbutton = this.game.add.button(cameraWidthCenter, cameraHeightCenter + 10, "menuButton");
        //calls setupButton to set buttons attributes
        this.setupButton(instructionsbutton);
        //calls our addbuttontext method that places given text at same coordinates as given button
        this.addButtonText(instructionsbutton, "Instructions");
        
        
         //creates button for accessing high scores
       var highscoresbutton = this.game.add.button(cameraWidthCenter, cameraHeightCenter + 70, "menuButton");
        //calls setupButton to set buttons attributes
        this.setupButton(highscoresbutton);
        //calls our addbuttontext method that places given text at same coordinates as given button
        this.addButtonText(highscoresbutton, "High Scores");
        
          //creates button for changing settings
       var settingsbutton = this.game.add.button(cameraWidthCenter, cameraHeightCenter + 130, "menuButton");
        //calls setupButton to set buttons attributes
        this.setupButton(settingsbutton);
        //calls our addbuttontext method that places given text at same coordinates as given button
        this.addButtonText(settingsbutton, "Orientation");
        
        game.menubuttons = [instructionsbutton, playbutton, highscoresbutton, settingsbutton];
        //listens for click or touch on playbutton
        playbutton.events.onInputDown.add(function(){
            //starts game
            this.state.start("PlayerSelectState");
        }, this);
        
        instructionsbutton.events.onInputDown.add(function(){
            //moves to instructions gamestate
            this.state.start("InstructionsState");
        }, this);
        
         highscoresbutton.events.onInputDown.add(function(){
            //moves to highscores gamestate
            this.state.start("HighScoresState");
        }, this);
        
        //now Orientation button, changes orientation from landscape to portrait/ vice verse
        settingsbutton.events.onInputDown.add(function(){
            
            if(this.camera.width > this.camera.height){
                
            
            game.scale.setGameSize(375, 667);
        cameraWidthCenter = this.game.camera.width/2;
        cameraHeightCenter = this.game.camera.height/2;
                
                //places header text back in center
                headerText.x = cameraWidthCenter;
                
                game.menubuttons.forEach(function(element){
                    element.x = cameraWidthCenter;
                });
            }
            else{
                //Changes view back to landscape and refreshes gamestte
                game.scale.setGameSize(570, 320);
                
                this.state.start("HomeState");
                
                
            }
        },this);
        
        


        
    },
    //method to add text to center of given button
    addButtonText: function(buttonName, text) {
        var style = {font: '35px Arial', fill: '#fff'};
        var textname = this.game.add.text(0.5, 0.5, text);
        buttonName.addChild(textname);
        textname.anchor.setTo(0.5);
        
    },
        
        
    
    //sets up buttons anchor points, size etc
    setupButton: function(button) {
        //anchor point to center
        button.anchor.setTo(0.5);
        
        //make playbutton smaller
        button.scale.setTo(0.7);
        //allow input on background sprite
        button.inputEnabled = true;
       
        
    }
    
            
            
    
};