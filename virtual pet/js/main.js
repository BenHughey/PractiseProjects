//initiate the Phaser framework
var game = new Phaser.Game(360, 640, Phaser.AUTO);
//add gamestates
game.state.add('GameState', GameState);
game.state.add('HomeState', HomeState);
game.state.add('PreloadState', PreloadState);
game.state.add('BootState', BootState);
//initiate boot gamestate 
game.state.start('BootState');