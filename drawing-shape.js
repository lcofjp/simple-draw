function setDrawConfig() {
    this._shape.strokeWidth = this._drawConfig.strokeWidth || 1;
    this._shape.strokeColor = this._drawConfig.strokeColor || 'black';
}

// ----------------drawingRect------------------------
function DrawingRect(event, drawConfig) {
    this._startPoint = event.point;
    this._drawConfig = drawConfig;
    this._shape = new paper.Path.Rectangle(this._startPoint, this._startPoint);
    this.setDrawConfig();
}

DrawingRect.prototype.setDrawConfig = setDrawConfig;

DrawingRect.prototype.drawingDragTo = function(event) {
    this._shape.remove();
    this._shape = new paper.Shape.Rectangle(this._startPoint, event.point);
    this.setDrawConfig();
}
DrawingRect.prototype.drawingEnd = function(event) {

}


// ----------------drawingCircle------------------------
function DrawingCircle(event, drawConfig) {
    this._startPoint = event.point;
    this._drawConfig = drawConfig;
    this._shape = new paper.Path.Circle(event.point, 0);
    this.setDrawConfig();
}

DrawingCircle.prototype.setDrawConfig = setDrawConfig;

DrawingCircle.prototype.drawingDragTo = function(event) {
    this._shape.remove();
    this._shape = new paper.Path.Circle(this._startPoint, event.point.subtract(this._startPoint).length);
    this.setDrawConfig();
}
DrawingCircle.prototype.drawingEnd = function(event) {

}

// ----------------drawingLine------------------------
function DrawingLine(event, drawConfig) {
    this._startPoint = event.point;
    this._drawConfig = drawConfig;
    this._shape = new paper.Path(event.point);
    this.setDrawConfig();
}

DrawingLine.prototype.setDrawConfig = setDrawConfig;

DrawingLine.prototype.drawingEnd = 
DrawingLine.prototype.drawingDragTo = function(event) {
    this._shape.add(event.point);
    this._shape.remove();
    this._shape = new paper.Path.Line(this._startPoint, event.point);
    this.setDrawConfig();
}
// DrawingLine.prototype.drawingEnd = function(event) {
//     this._shape.add(event.point);
//     this._shape.remove();
//     this._shape = new paper.Path.Line(this._startPoint, event.point);
//     this.setDrawConfig();
// }

// ----------------drawingPath------------------------
function DrawingPath(event, drawConfig) {
    this._startPoint = event.point;
    this._drawConfig = drawConfig;
    this._shape = new paper.Path(event.point);
    this.setDrawConfig();
}

DrawingPath.prototype.setDrawConfig = setDrawConfig;

DrawingPath.prototype.drawingDragTo = function(event) {
    this._shape.add(event.point);
    this._shape.smooth();
}
DrawingPath.prototype.drawingEnd = function(event) {
    this._shape.simplify();
}
