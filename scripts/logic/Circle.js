class Circle extends Figure{
  constructor(context, x, y, widht, height, angle, borderWidth, color, borderColor){
    super(context, x, y, widht, height, angle, borderWidth, color, borderColor);
  }

  draw(){
    console.log('drawing Circle');
  }
}
