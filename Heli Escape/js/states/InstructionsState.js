var InstructionsState = {
    
    create: function(){
        
        
        this.cameraWidthCenter = this.game.camera.width/2;
        this.cameraHeightCenter = this.game.camera.height/2;
        
        this.instructionImage = this.add.sprite(this.game.camera.width/2, 10, "exitpic");
        this.instructionImage.anchor.setTo(0.5, 0);
        this.instructionImage.scale.setTo(0.25);
         game.style = {font: '24px Arial', fill: '#fff'};
        this.instructionText1 = this.game.add.text(this.cameraWidthCenter, this.cameraWidthCenter, "Escape from the center of the \nearth by flying your chopper to \nthe exit as quickly as possible \nwithout crashing", game.style);
        this.instructionText1.scale.setTo(2);
        this.instructionText1.anchor.setTo(0.5);
        this.instructionImage.addChild(this.instructionText1);
        
        this.textplusbutton = this.game.add.button(this.cameraWidthCenter*1.2 , this.cameraHeightCenter* 1.5, "textplus");
        this.textplusbutton.scale.setTo(0.25);
        this.textplusbutton.anchor.setTo(0.5);
        
        this.textminusbutton = this.game.add.button(this.camera.width/2.5 , this.cameraHeightCenter *1.5, "textminus");
        this.textminusbutton.scale.setTo(0.25);
        this.textminusbutton.anchor.setTo(0.5)
        
                if(this.camera.width > this.camera.height){
        
        this.nextButton = this.add.button(this.cameraWidthCenter+ this.cameraWidthCenter/2, this.cameraHeightCenter, "leftarrow");
        this.nextButton.anchor.setTo(0.5);
        this.nextButton.scale.setTo(0.2);
        this.nextButton.alpha = 0.3;
        
        this.previousButton = this.add.button(140, 200, "leftarrow");
        this.previousButton.anchor.setTo(0.5);
        this.previousButton.alpha = 0;
        //scales to 0.2 and reverses direction
        this.previousButton.scale.setTo(-0.2, 0.2);
        
        this.arrowtext =  this.game.add.text(this.nextButton.x, this.nextButton.y, "next");
        this.arrowtext.anchor.setTo(0.5);
        this.arrowtext.scale.setTo(0.5);
        this.arrowtext.alpha = 0.5;
        
        this.nextButton.events.onInputDown.add(function(){
            this.page2 = true;
            this.instructionText1.alpha = 0;
             this.instructionImage.loadTexture("startpic");
                this.addInstruction2Text();
                this.nextButton.alpha = 0;
                this.arrowtext.alpha = 0;
            
                this.previousButton.alpha = 0.3;
        }, this);
        
            
        this.previousButton.events.onInputDown.add(function(){
            this.page2 = false;
            
            game.state.start("InstructionsState");
       
            
        }, this);
        }
        else {
            this.textplusbutton.x = this.game.camera.width/1.5
            this.textplusbutton.y = this.game.camera.height/2.5;
            this.textminusbutton.x = this.game.camera.width/2.5;
            this.textminusbutton.y = this.game.camera.height/2.5;
            //for protrait mode
            var startsprite = this.game.add.sprite(this.cameraWidthCenter, this.cameraHeightCenter, "startpic");
            startsprite.anchor.setTo(0.5, 0);
            startsprite.scale.setTo(0.25);
            
            this.instructionText1.scale.setTo(3);
            this.instructionText1.y += this.game.height/10
            
            this.addInstruction2Text();
            game.instructionTextpg2.forEach(function(element){
                element.y += this.game.camera.height/3;
                element.scale.setTo(0.7);
                
            });
            game.instructionTextpg2[1].x += this.game.width/6.5;
            game.instructionTextpg2[1].y += this.game.height/20
            game.instructionTextpg2[2].y -= this.game.height/6;
        }
        
       
    
        this.createHomeButton();
        
        
    },
    
    update: function() { 
     this.textplusbutton.events.onInputDown.add(function(){

         if(this.instructionText1.scale.x < 4.227){
            this.instructionscaleX = this.instructionText1.scale.x;
            this.instructionscaleY = this.instructionText1.scale.y;
            this.instructionscaleX += 0.002;
            this.instructionscaleY += 0.002;
            this.instructionText1.scale.setTo(this.instructionscaleX, this.instructionscaleY);
         
         }
            
          if((this.page2|| this.camera.height > this.camera.width) && game.instructionTextpg2[1].scale.x < 0.733){
           game.instructionTextpg2.forEach(function(element){
               this.instruction2scaleX = element.scale.x;
               this.instruction2scaleY = element.scale.y;
               this.instruction2scaleX += 0.0002;
               this.instruction2scaleY += 0.0002;
               element.scale.setTo(this.instruction2scaleX, this.instruction2scaleY);
               console.log(game.instructionTextpg2[1].scale.x);
           
           
               
           },);
          }
        
            
        },this)
        
        this.textminusbutton.events.onInputDown.add(function(){
            
            if(this.instructionText1.scale.x > 1.6 ){
            
            var instructionscalex = this.instructionText1.scale.x;
            var instructionscaley = this.instructionText1.scale.y;
            instructionscalex -= 0.001;
            instructionscaley -= 0.001;
            this.instructionText1.scale.setTo(instructionscalex, instructionscaley);
            console.log(this.instructionText1.scale.x);
        }
            if((this.page2|| this.camera.height > this.camera.width) && game.instructionTextpg2[1].scale.x > 0.349)
                {
         game.instructionTextpg2.forEach(function(element){
               this.instruction2scaleX = element.scale.x;
               this.instruction2scaleY = element.scale.y;
               this.instruction2scaleX -= 0.0002;
               this.instruction2scaleY -= 0.0002;
               element.scale.setTo(this.instruction2scaleX, this.instruction2scaleY);
               console.log(game.instructionTextpg2[1].scale.x);
         });
                }
           
            
        },this)
        
    
        

        
        
        
    
    },
    createHomeButton: function() {
            //creates button used to start game using the menuButton sprite places it in center of page
       var homebutton = game.add.button(this.cameraWidthCenter, this.cameraHeightCenter * 1.8, "menuButton");
        //anchor point to center
        homebutton.anchor.setTo(0.5);
        //make playbutton smaller
        homebutton.scale.setTo(0.7);
        //allow input on background sprite
        homebutton.inputEnabled = true;
        
        var buttontext =  this.game.add.text(homebutton.x, homebutton.y, "Main Menu");
        buttontext.anchor.setTo(0.5);
        
        //listens for click or touch on home button
        homebutton.events.onInputDown.add(function(){
            game.state.start("HomeState");
        }, this);
    },
        
    addInstruction2Text: function(){
            var instructionText2 = this.game.add.text(this.cameraWidthCenter/1.5, this.cameraHeightCenter/1.5, "Keep the chopper in the air\n using the up key on a keyboard\n or the middle purple touch\n button on mobile devices.\n Steer using the left and right\n keyboard keys or equivilant\n touch buttons", game.style);
            instructionText2.scale.setTo(0.5);
            instructionText2.anchor.setTo(0.5);
            var instructionText3 = this.game.add.text(this.cameraWidthCenter *1.3, this.cameraHeightCenter/1.6, "Avoid the \nfalling rocks\n and shooting lava", game.style);
            instructionText3.anchor.setTo(0.5);
            instructionText3.scale.setTo(0.5);
            var instructionText4 = this.game.add.text(this.cameraWidthCenter * 1.4, this.cameraHeightCenter*1.3, "Toggle sound\n on/ off", game.style);
            instructionText4.anchor.setTo(0.5);
            instructionText4.scale.setTo(0.5);
            game.instructionTextpg2 = [instructionText2, instructionText3, instructionText4];
            
        
        
    
    }
}