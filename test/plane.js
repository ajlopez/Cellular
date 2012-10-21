
var cellular = require('..'),
    assert = require('assert');
    
var automata = cellular.createPlaneAutomata(10, 10, 2, 1, 0);

assert.ok(automata);
assert.equal(automata.getSize(), 100);
assert.equal(automata.getWidth(), 10);
assert.equal(automata.getHeight(), 10);
assert.equal(automata.getStates(), 2);
assert.equal(automata.getRadius(), 1);

// get cell values

for (var x = 0; x < 10; x++)
    for (var y = 0; y < 10; y++)
        assert.equal(automata.getCellValue(x, y), 0);

