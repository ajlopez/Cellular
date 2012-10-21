
var cellular = require('../..');

var game = cellular.createGameOfLife(20, 20);
game.setCellValue(1, 0, 1);
game.setCellValue(2, 1, 1);
game.setCellValue(0, 2, 1);
game.setCellValue(1, 2, 1);
game.setCellValue(2, 2, 1);

function toString(automata, nrow) {
    var result = "";
    var width = automata.getWidth();
    
    for (var k = 0; k < width; k++) 
        result += automata.getCellValue(k, nrow) ? "X " : ". ";
    
    return result;
}

function log(automata) {
    var height = automata.getHeight();
    
    for (var nrow = 0; nrow < height; nrow++)
        console.log(toString(automata, nrow));        
}

while (true) {
    log(game);
    console.log();
    game.nextGeneration();
}
