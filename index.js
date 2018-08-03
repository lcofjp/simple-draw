function test() {
    // Get a reference to the canvas object
    var canvas = document.getElementById('canvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);
    // Create a Paper.js Path to draw a line into it:
    var path = new paper.Path();
    // Give the stroke a color
    path.strokeColor = 'black';
    var start = new paper.Point(100, 100);
    // Move to start and draw a line from there
    path.moveTo(start);
    // Note that the plus operator on Point objects does not work
    // in JavaScript. Instead, we need to call the add() function:
    path.lineTo(start.add([ 200, -50 ]));
    // Draw the view now:
    paper.view.draw();

    paper.view.onMouseDown = function(event) {
        console.log('onMouseDown: ', event);
    }
    paper.view.onMouseDrag = function(event) {
        console.log('onDrag: ', event);
    }

    var path = new paper.Path.Rectangle([75, 75], [100, 100]);
    path.strokeColor = 'black';
    
    paper.view.onFrame = function(event) {
        path.rotate(1);
    }
}

test();