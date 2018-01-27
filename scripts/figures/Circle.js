class Circle extends Figure{
  constructor(ctx, x, y, width, height, angle, borderWidth, color, borderColor){
    super(ctx, x, y, width, height, angle, borderWidth, color, borderColor);
  }

  _getFigureName(){
    return "Круг"
  }

  draw(ctx){
    if (!ctx) ctx = this.ctx;
    console.log('drawing Circle');
  }
}
