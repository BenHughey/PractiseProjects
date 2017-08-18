var HighScoresState = {
    create: function(){
        var style = {font: '24px Arial', fill: '#fff'};
            
        var cameraWidthCenter = (this.game.camera.width/2) -80;
        var cameraHeightCenter = this.game.camera.height/2;
        
        var number1 = this.game.add.text(cameraWidthCenter, 40, "1st:  ", style);
        var number2 = this.game.add.text(cameraWidthCenter, 60, "2nd:  ", style);
        var number3 = this.game.add.text(cameraWidthCenter, 80, "3rd:  ", style);
        var number4 = this.game.add.text(cameraWidthCenter, 100, "4th:  ", style);
        var number5 = this.game.add.text(cameraWidthCenter, 120, "5th:  ", style);
        var number6 = this.game.add.text(cameraWidthCenter, 140, "6th:  ", style);
        var number7 = this.game.add.text(cameraWidthCenter, 160, "7th:  ", style);
        var number8 = this.game.add.text(cameraWidthCenter, 180, "8th:  ", style);
        var number9 = this.game.add.text(cameraWidthCenter, 200, "9th:  ", style);
        var number10 = this.game.add.text(cameraWidthCenter, 220, "10th:  ", style);
        
        this.numberList = [number1, number2, number3, number4, number5, number6, number7, number8, number9, number10];
         this.numberList.forEach(function(element){
            element.anchor.setTo(0.5);
            element.fixedToCamera = true;
         });


        game.state.states.InstructionsState.createHomeButton();
        
    }
}