
var cellular = require('../..');

var rule = process.argv[2] ? parseInt(process.argv[2]) : 110;
var width = process.argv[3] ? parseInt(process.argv[3]) : 20;
var nstates = 2;

var results = [];

for (var k = 0; k < 8; k++) {
	results[k] = rule % nstates;
	rule = Math.floor(rule / nstates);
}

var automata = cellular.createLinearAutomata(width * 2 + 1, 2, 1, results);

automata.setCellValue(width, 1);

function toString(automata) {
    var result = "";
    var size = automata.getSize();
    
    for (var k = 0; k < size; k++)
        if (automata.getCell(k).value)
            result += "X";
        else
            result += ".";
    
    return result;
}

for (var k = 0; k < width; k++) {
   console.log(toString(automata));
   automata.nextGeneration();
}

