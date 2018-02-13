class Figure extends Dot{
  constructor(ctx, x, y, width, height, angle, borderWidth, color, borderColor, shadow){
    super(ctx, x, y, color);

    if (!Number.isInteger(width)) throw new Error(`The width must be integer.`);
    if (!Number.isInteger(height)) throw new Error(`The height must be integer.`);
    if (!Number.isInteger(angle)) throw new Error(`The angle must be integer.`);
    if (!Number.isInteger(borderWidth)) throw new Error(`The angle must be integer.`);
    if (!borderColor) throw new Error(`The borderColor must implement.`);

    this._width = width;
    this._height = height;
    this._angle = angle+45;
    this._borderColor = borderColor;
    this._borderWidth = borderWidth;
    this._shadow = shadow;
  }

  draw(ctx){
    if (!ctx) ctx = this.ctx;
    throw new Error('You have to implement the method draw!');
  }

  _getFigureName(){
    return "Фигура"
  }
  _getPosition(){
    return "("+this.x+","+this.y+"; "+(this.x+this.width)+","+(this.y+this.height)+")"
  }

  rotate(angle){
    if (!Number.isInteger(angle)) throw new Error(`The angle must be integer.`);
    this._angle = angle+45;
  }

  resize(width, height){
    if (!Number.isInteger(width)) throw new Error(`The width must be integer.`);
    if (!Number.isInteger(height)) throw new Error(`The height must be integer.`);

    this._width = width;
    this._height = height;
  }

  move(x,y){
    if (!Number.isInteger(x)) throw new Error(`The x must be integer.`);
    if (!Number.isInteger(y)) throw new Error(`The y must be integer.`);

    this._x = x;
    this._y = y;
  }

  changeBorderColor(borderColor){
    this._borderColor = borderColor;
  }

  changeBorderWidth(borderWidth){
    if (!Number.isInteger(borderWidth)) throw new Error(`The angle must be integer.`);
      this._borderWidth = borderWidth;
  }

  setshadow(shadow){
    this._shadow = shadow;
  }

  get width(){ return this._width; }
  set width(value) { throw new Error(`The width property cannot be written. ${value} was passed.`); }
  get height(){ return this._height; }
  set height(value) { throw new Error(`The height property cannot be written. ${value} was passed.`); }
  get angle(){ return this._angle; }
  set angle(value) { throw new Error(`The angle property cannot be written. ${value} was passed.`); }
  get borderColor(){ return this._borderColor; }
  set borderColor(value) { throw new Error(`The borderColor property cannot be written. ${value} was passed.`); }
  get borderWidth(){ return this._borderWidth; }
  set borderWidth(value) { throw new Error(`The borderWidth property cannot be written. ${value} was passed.`); }
  get shadow(){ return this._shadow; }
  set shadow(value) { throw new Error(`The shadow property cannot be written. ${value} was passed.`); }
}
