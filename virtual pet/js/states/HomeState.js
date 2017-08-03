var HomeState = {

  init: function(message) {
    this.message = message;
  },

  create: function() {
	  //sets background				(coordinates, key)
    var background = this.game.add.sprite(0,0,'backyard');
	//allows input on background
    background.inputEnabled = true;
	//listens for click or touch on background
    background.events.onInputDown.add(function(){
		//starts game
      this.state.start('GameState');
    }, this);

    var style = {font: '35px Arial', fill: '#fff'};
    this.game.add.text(30, this.game.world.centerY + 200, 'TOUCH TO START', style);
  
    if(this.message) {
      this.game.add.text(60, this.game.world.centerY - 200, this.message, style);
    }
  }
};