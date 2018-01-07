class Dot{
  constructor(ctx, x, y, color){
    this._ctx = ctx;

    if (!Number.isInteger(x)) throw new Error(`The x must be integer.`);
    if (!Number.isInteger(y)) throw new Error(`The y must be integer.`);
    if (!color) throw new Error(`The color must implement.`);

    this._x = x;
    this._y = y;
    this._color = color;
  }

  draw(){
    this.ctx.fillRect(this.x,this.y,1,1);
  }

  getTitle(){
    return 'Точка (' + this.x + ', ' + this.y + ')'
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
  get ctx(){ return this._ctx; }
  set ctx(value) { throw new Error(`The ctx property cannot be written. ${value} was passed.`); }
}
