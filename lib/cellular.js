
var cellular = (function() {
    function Cell() {
        this.value = 0;
        this.neighbours = [];
    }
    
    function CellularAutomata(cells, states, results, nneighbours) {
        var size = cells.length;
        var newvalues = new Array(size);
        this.getSize = function() { return size; };
        this.getStates = function() { return states; };

        this.getCellValue = function(x) { return cells[x].value; };
        this.setCellValue = function(x, value) { cells[x].value = value; }
        
        function evaluateCell(cell) {            
            var value = 0;
            var weigth = 1;
            for (var k = 0; k < nneighbours; k++) {
                var neighbour = cell.neighbours[k];
                
                if (neighbour)
                    value += neighbour.value * weigth;
                    
                weigth *= states;
            }
            
            return results[value] || 0;
        }
        
        this.nextGeneration = function() {
            for (var k = 0; k < size; k++)
                newvalues[k] = evaluateCell(cells[k]);
            for (var k = 0; k < size; k++)
                cells[k].value = newvalues[k];
        }
    }
    
    function LinearAutomata(size, states, radius, results) {
        var cells = new Array(size);
        var nneighbours = radius * 2 + 1;
        
        for (var k = 0; k < size; k++)
            cells[k] = new Cell();
            
        for (var k = 0; k < size; k++) {
            var cell = cells[k];
            for (var w = -radius; w <= radius; w++)
                cell.neighbours[radius+w] = cells[k-w] || null;
        }

        this.getRadius = function() { return radius; };
        CellularAutomata.prototype.constructor.call(this, cells, states, results, nneighbours);
    }
    
    LinearAutomata.prototype.__proto__ = CellularAutomata.prototype;
    
    function PlaneAutomata(width, height, states, radius, results) {
        var size = width * height;
        var cells = new Array(size);
        var nneighbours = (radius * 2 + 1) * (radius * 2 + 1);
        
        for (var k = 0; k < size; k++)
            cells[k] = new Cell();
            
        for (var k = 0; k < size; k++) {
            var cell = cells[k];
            var position = 0;
            for (var w = -radius; w <= radius; w++)
                for (var z = -radius; z <= radius; z++, position++)
                    cell.neighbours[position] = cells[k+w*width+z] || null;
        }

        this.getRadius = function() { return radius; };
        this.getWidth = function() { return width; };
        this.getHeight = function() { return height; };
        CellularAutomata.prototype.constructor.call(this, cells, states, results, nneighbours);
        this.getCellValue = function(x, y) { return cells[x + y * width].value; };
        this.setCellValue = function(x, y, value) { cells[x + y * width].value = value; }
    }
    
    PlaneAutomata.prototype.__proto__ = CellularAutomata.prototype;
    
    function createLinearAutomata(size, states, radius, results) {
        if (typeof(results) == "number")
            results = makeResultsFromNumber(states, radius * 2 + 1, results);
        else if (typeof(results) == "function")
            results = makeResultsFromFunction(states, radius * 2 + 1, results);
            
        var automata = new LinearAutomata(size, states, radius, results || []);
        
        return automata;
    }
    
    function createPlaneAutomata(width, height, states, radius, results) {
        if (typeof(results) == "number")
            results = makeResultsFromNumber(states, radius * 2 + 1, results);
        else if (typeof(results) == "function")
            results = makeResultsFromFunction(states, radius * 2 + 1, results);
            
        var automata = new PlaneAutomata(width, height, states, radius, results || []);
        
        return automata;
    }
    
    function makeResultsFromNumber(nstates, ncells, rule)
    {
        var results = [];
        var nresults = Math.pow(nstates, ncells);
        
        for (var k = 0; k < nresults; k++)
        {
            results[k] = rule % nstates;
            rule = Math.floor(rule / nstates);
        }

        return results;
    }
    
    function makeResultsFromFunction(nstates, ncells, fn)
    {
        var size = Math.pow(nstates, ncells);
        var results = new Array(size);
        
        for (var k = 0; k < size; k++) {
            var values = new Array(ncells);
            var value = k;
            
            for (var j = 0; j < ncells; j++) {
                values[j] = value % nstates;
                value = Math.floor(value / nstates);
            }
            
            results[k] = fn(values);
        }
        
        return results;
    }
    
    return {
        createLinearAutomata: createLinearAutomata,
        createPlaneAutomata: createPlaneAutomata
    }
}());

if (typeof(window) === 'undefined') {
    module.exports = cellular;
}

