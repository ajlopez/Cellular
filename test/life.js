
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

// blinker

var game = cellular.createGameOfLife(5, 5);
game.setCellValue(1, 2, 1);
game.setCellValue(2, 2, 1);
game.setCellValue(3, 2, 1);

game.nextGeneration();

for (var x = 0; x < 5; x++)
    for (var y = 0; y < 5; y++)
        if (x == 2 && y > 0 && y < 4)
            assert.equal(game.getCellValue(x, y), 1);
        else
            assert.equal(game.getCellValue(x, y), 0);
