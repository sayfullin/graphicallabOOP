class Circle extends Figure{
  constructor(ctx, x, y, width, height, angle, borderWidth, color, borderColor){
    super(ctx, x, y, width, height, angle, borderWidth, color, borderColor);
  }

  _getFigureName(){
    return "Круг"
  }

  draw(){
    console.log('drawing Circle');
  }
}
