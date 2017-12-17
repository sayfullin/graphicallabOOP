class Dot{
  constructor(context, x, y, color){
    this._context = context;

    if (!Number.isInteger(x)) throw new Error(`The x must be integer.`);
    if (!Number.isInteger(y)) throw new Error(`The y must be integer.`);
    if (!color) throw new Error(`The color must implement.`);

    this._x = x;
    this._y = y;
    this._color = color;
  }

  draw(){
    this.context.fillRect(this.x,this.y,1,1);
  }

  move(x, y){
    if (!Number.isInteger(x)) throw new Error(`The x must be integer.`);
    if (!Number.isInteger(y)) throw new Error(`The y must be integer.`);
    this._x = x;
    this._y = y;
  }

  changeColor(color){
  if (!color) throw new Error(`The color must implement.`);
    this._color = color;
  }

  get x(){ return this._x; }
  set x(value) { throw new Error(`The x property cannot be written. ${value} was passed.`); }
  get y(){ return this._y; }
  set y(value) { throw new Error(`The y property cannot be written. ${value} was passed.`); }
  get color(){ return this._color; }
  set color(value) { throw new Error(`The color property cannot be written. ${value} was passed.`); }
  get context(){ return this._color; }
  set context(value) { throw new Error(`The context property cannot be written. ${value} was passed.`); }
}
