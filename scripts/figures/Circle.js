class Circle extends Figure{
  constructor(ctx, x, y, width, height, angle, borderWidth, color, borderColor){
    super(ctx, x, y, width, height, angle, borderWidth, color, borderColor);
  }

  draw(){
    console.log('drawing Circle');
  }

  getTitle(){
    if (this.width == this.height)
      var name = 'Круг';
    else
      var name = 'Овал';

    return name + ' ' + this._getCoords();
  }

}
