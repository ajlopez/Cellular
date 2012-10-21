
var cellular = require('..'),
    assert = require('assert');
    
var automata = cellular.createLinearAutomata(15, 2, 1, 0);

assert.ok(automata);
assert.equal(automata.getSize(), 15);
assert.equal(automata.getStates(), 2);
assert.equal(automata.getWidth(), 1);

// get cells

for (var k = 0; k < 15; k++) {
    var cell = automata.getCell(k);
    assert.ok(cell);
    assert.equal(cell.value, 0);
    assert.ok(cell.neighbours);
    assert.equal(cell.neighbours.length, 3);
}

// set cell value

automata.setCellValue(7, 1);

cell = automata.getCell(7);
assert.ok(cell);
assert.equal(cell.value, 1);

// next generation zero rule

automata.nextGeneration();

for (var k = 0; k < 15; k++) {
    var cell = automata.getCell(k);
    assert.ok(cell);
    assert.equal(cell.value, 0);
}

// from http://mathworld.wolfram.com/ElementaryCellularAutomaton.html
// rule 0 0 0 1 1 1 1 0 

var automata = cellular.createLinearAutomata(15, 2, 1, [0, 1, 1, 1, 1, 0, 0, 0]);
automata.setCellValue(7, 1);
automata.nextGeneration();

for (var k = 0; k < 15; k++) {
    var cell = automata.getCell(k);
    assert.ok(cell);
    if (k >= 6 && k <= 8)
        assert.equal(cell.value, 1);
    else
        assert.equal(cell.value, 0);
}

