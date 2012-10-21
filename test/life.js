
var cellular = require('..'),
    assert = require('assert');
    
var game = cellular.createGameOfLife(10, 10);

assert.ok(game);
assert.equal(game.getSize(), 100);
assert.equal(game.getWidth(), 10);
assert.equal(game.getHeight(), 10);
assert.equal(game.getStates(), 2);
assert.equal(game.getRadius(), 1);

// get cell values

for (var x = 0; x < 10; x++)
    for (var y = 0; y < 10; y++)
        assert.equal(game.getCellValue(x, y), 0);

