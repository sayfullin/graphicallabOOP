class Canvas{
  constructor(ctx){
      if (!ctx) throw new Error(`The ctx must implement.`);
      this._ctx = ctx;

      this._items = [];
  }

  addPolygon(x, y, options){
    let polygon =  new Polygon(this.ctx, x, y, options.width, options.width, options.angle, options.borderWidth, options.color, options.borderColor, options.sideCount);
    this.addItem(polygon);
    this.draw();
  }
  addStar(x, y, options){
    let polygon =  new Star(this.ctx, x, y, options.width, options.width, options.angle, options.borderWidth, options.color, options.borderColor, options.spikeCount);
    this.addItem(polygon);
    this.draw();
  }
  addCircle(x, y, options){
    let polygon =  new Circle(this.ctx, x, y, options.width, options.width, options.angle, options.borderWidth, options.color, options.borderColor);
    this.addItem(polygon);
    this.draw();
  }

  addItem(figure){
    if (figure instanceof Figure){
      this._items.push(figure);
    }else{
      throw new Error(`Parametr must be instance of Figure child`);
    }
  }

  deleteItem(index){
    this._items.splice(index, 1);
  }

  draw(){
    this._clear();
    this._items.forEach(function(figure) {
        figure.draw();
    });
  }

  _clear(){
    this.ctx.clearRect(0, 0, this.ctx.canvas.height, this.ctx.canvas.width)
  }

  get ctx(){ return this._ctx; }
  set ctx(value) { throw new Error(`The ctx property cannot be written. ${value} was passed.`); }
  get items(){ return this._items; }
  set items(value) { throw new Error(`The items property cannot be written. ${value} was passed.`); }
}
