
var cellular = (function() {
    function Cell() {
        this.value = 0;
        this.neighbours = [];
    }
    
    function LinearAutomata(size, states, radius, results) {
        var cells = new Array(size);
        var newvalues = new Array(size);
        var nneighbours = radius * 2 + 1;
        
        for (var k = 0; k < size; k++)
            cells[k] = new Cell();
            
        for (var k = 0; k < size; k++) {
            var cell = cells[k];
            for (var w = -radius; w <= radius; w++)
                cell.neighbours[radius+w] = cells[k-w] || null;
        }

        this.getSize = function() { return size; };
        this.getStates = function() { return states; };
        this.getRadius = function() { return radius; };
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
    
    function createLinearAutomata(size, states, width, results) {
        if (typeof(results) == "number")
            results = makeResults(states, width * 2 + 1, results);

        var automata = new LinearAutomata(size, states, width, results || []);
        
        return automata;
    }
    
    function makeResults(nstates, ncells, rule)
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
    
    return {
        createLinearAutomata: createLinearAutomata
    }
}());

if (typeof(window) === 'undefined') {
    module.exports = cellular;
}

