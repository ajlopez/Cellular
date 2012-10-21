
var cellular = require('..'),
    assert = require('assert');
    
var automata = cellular.createLinearAutomata(15, 2, 1, 0);

assert.ok(automata);
assert.equal(automata.getSize(), 15);
assert.equal(automata.getStates(), 2);
assert.equal(automata.getRadius(), 1);

// get cells

for (var k = 0; k < 15; k++)
    assert.equal(automata.getCellValue(k), 0);

// set cell value

automata.setCellValue(7, 1);

assert.equal(automata.getCellValue(7), 1);

// next generation zero rule

automata.nextGeneration();

for (var k = 0; k < 15; k++)
    assert.equal(automata.getCellValue(k), 0);

// from http://mathworld.wolfram.com/ElementaryCellularAutomaton.html
// rule 0 0 0 1 1 1 1 0 

var automata = cellular.createLinearAutomata(15, 2, 1, [0, 1, 1, 1, 1, 0, 0, 0]);
automata.setCellValue(7, 1);
automata.nextGeneration();

for (var k = 0; k < 15; k++) {
    var value = automata.getCellValue(k);
    if (k >= 6 && k <= 8)
        assert.equal(value, 1);
    else
        assert.equal(value, 0);
}

// rule 0 0 0 1 1 1 1 0 as number


var automata = cellular.createLinearAutomata(15, 2, 1, 30);
automata.setCellValue(7, 1);
automata.nextGeneration();

for (var k = 0; k < 15; k++) {
    var value = automata.getCellValue(k);
    if (k >= 6 && k <= 8)
        assert.equal(value, 1);
    else
        assert.equal(value, 0);
}

