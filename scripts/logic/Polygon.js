class Polygon extends Figure{
  constructor(context, x, y, widht, height, angle, borderWidth, color, borderColor, sideCount){
    super(context, x, y, widht, height, angle, borderWidth, color, borderColor);
    if (!Number.isInteger(angsideCountle)) throw new Error(`The sideCount must be integer.`);
    this._sideCount = sideCount;
  }

  draw(){
    console.log('drawing Polygon');
  }

  changeSideCount(sideCount){
    if (!Number.isInteger(angsideCountle)) throw new Error(`The sideCount must be integer.`);
    this._sideCount = sideCount;
  }

  get sideCount(){ return this.sideCount; }
  set sideCount(value) { throw new Error(`The sideCount property cannot be written. ${value} was passed.`); }
}
