var drawConfig = {
    shape: 'curve',
    arrow: false,
    strokeWidth: 2,
    strokeColor: 'red'
}

function handlerInit() {
    $('.draw-tools input').on('change', function() {
        var i = $(this);
        console.log(i.attr('name'), i.attr('value'))
        var name = i.attr('name');
        var value = i.attr('value') || i.val();
        switch(name) {
            case 'shape-type':
                drawConfig.shape = value;
                if (value === 'arrow') {
                    drawConfig.shape = 'line';
                    drawConfig.arrow = true;
                }
                break;
            case 'pen-color':
                drawConfig.strokeColor = value;
                $('input[name=custom-color]').removeClass('active');
                break;
            case 'custom-color':
                drawConfig.strokeColor = i.val();
                $('input[name=pen-color]').prop('checked', false);
                i.addClass('active');
                break;
            case 'pen-width':
                drawConfig.strokeWidth = parseInt(value, 10);
                break;
        }
    })
}
$(handlerInit);

paper.setup(document.querySelector('#canvas'));
var drawingShape;

paper.view.onMouseDown = function(event) {
    drawingShape = makeShape(event, drawConfig);
}

paper.view.onMouseDrag = function(event) {
    drawingShape.drawingDragTo(event);
}

paper.view.onMouseUp = function(event) {
    drawingShape.drawingEnd(event);
}

function makeShape(event, drawingConfig) {
    var shape = drawingConfig.shape;
    if (shape === 'curve') {
        return new DrawingCurve(event, drawConfig);
    } else if (shape === 'rect') {
        return new DrawingRect(event, drawConfig);
    } else if (shape === 'circle') {
        return new DrawingCircle(event, drawingConfig);
    } else if (shape === 'line') {
        return new DrawingLine(event, drawingConfig);
    } else {
        throw new Error('unsupported shape: ' + shape);
    }
}

function generateSVG() {
    var svgStr = paper.project.exportSVG({asString: true});
    var bStr = Base64.encode(svgStr);
    $('#svg-output img').attr('src', 'data:image/svg+xml;base64,' + bStr);
}

$('#generate-svg').on('click', generateSVG);

$(window).on('resize', function(e) {
    var cWrap = $('#canvas-wrap');
    var canvas = $('#canvas');
    var w = cWrap.width();
    var h = cWrap.height();
    canvas.attr('width', w).attr('height', h);
})