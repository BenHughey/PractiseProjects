//State for selecting player
//Written by Ben Hughey
var PlayerSelectState = {
    create: function(){
        
        this.cameraWidthCenter = this.game.camera.width/2;
        this.cameraHeightCenter = this.game.camera.height/2;
        
        
        this.greenChopper = this.add.button(this.cameraWidthCenter, this.cameraHeightCenter, "playerGreen");
        this.redChopper = this.add.button(this.cameraWidthCenter, this.cameraHeightCenter -50, "playerRed");
        this.blueChopper = this.add.button(this.cameraWidthCenter, this.cameraHeightCenter +50, "playerBlue");
        this.yellowChopper = this.add.button(this.cameraWidthCenter, this.cameraHeightCenter + 100, "playerYellow"); 
        
        var playerSelectHeader = this.game.add.text(this.cameraWidthCenter, this.cameraHeightCenter- 100, "Select your player",{font: '35px Arial', fill: '#fff'});
        playerSelectHeader.anchor.setTo(0.5);
        
        this.buttons = [this.greenChopper, this.redChopper, this.blueChopper, this.yellowChopper];
        this.buttons.forEach(function(element){
            element.scale.setTo(0.4);
            element.alpha = 1;
            element.anchor.setTo(0.5);
            element.events.onInputDown.add(function(){
                this.selectedItem = element.key;
                game.state.start("GameState");
                console.log(this.selectedItem);
            },this)
        },this);
        
        
       
    }
}