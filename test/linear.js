var cellular = require('..'),    assert = require('assert');    var automata = cellular.createLinearAutomata(15, 2, 1, 0);assert.ok(automata);assert.equal(automata.getSize(), 15);assert.equal(automata.getStates(), 2);assert.equal(automata.getWidth(), 1);// get cellsfor (var k = 0; k < 15; k++) {    var cell = automata.getCell(k);    assert.ok(cell);    assert.equal(cell.value, 0);    assert.ok(cell.neighbours);    assert.equal(cell.neighbours.length, 3);}