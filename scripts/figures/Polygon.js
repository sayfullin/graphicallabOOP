class Polygon extends Figure{
  constructor(ctx, x, y, width, height, angle, borderWidth, color, borderColor, sideCount, shadow){
    super(ctx, x, y, width, height, angle, borderWidth, color, borderColor, shadow);
    if (!Number.isInteger(sideCount)) throw new Error(`The sideCount must be integer.`);
    this._sideCount = sideCount;
  }

  _getFigureName(){
    switch (this.sideCount) {
      case 3:
        return 'Треугольник';
        break;
      case 4:
        return 'Чётырёхугольник';
        break;
      case 5:
        return 'Пятиугольник';
        break;
      case 6:
        return 'Шестиугольник';
        break;
      case 7:
        return 'Семиугольник';
        break;
      case 8:
        return 'Восьмиугольник';
        break;
      case 9:
        return 'Девятиугольник';
        break;
      case 10:
        return 'Десятиугольник';
        break;
      default:
        return "Многоугольник";
    }
  }

  draw(ctx){
    if (!ctx) ctx = this.ctx;
    ctx.translate(this.x, this.y);
    ctx.rotate((Math.PI / 180) * this.angle);
    if (this.shadow) {
      ctx.shadowColor = 'gray';
      ctx.shadowBlur = 10;
    }
    ctx.beginPath();
    ctx.moveTo(this.width, 0);
    let a = ((Math.PI * 2)/this.sideCount);
    for (let i = 1; i < this.sideCount; i++) {
        ctx.lineTo(this.width * Math.cos(a * i), this.height * Math.sin(a * i));
    }
    ctx.closePath();
    if (this.color != undefined) {
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    if (this.borderColor != undefined && this.borderWidth){
        ctx.lineWidth = this.borderWidth;
        ctx.strokeStyle = this.borderColor;
        ctx.stroke();
    }
    ctx.rotate(-(Math.PI / 180) * this.angle);
    ctx.translate(-this.x, -this.y);
    if (this.shadow) {
      ctx.shadowBlur = 0;
    }
  }

  toJson(){
    let json = super.toJson();
    Object.assign(json, {
      'type': 'Polygon',
      'sideCount': this.sideCount
    });
    return json;
  }

  changeSideCount(sideCount){
    if (!Number.isInteger(sideCount)) throw new Error(`The sideCount must be integer.`);
    this._sideCount = sideCount;
  }

  get sideCount(){ return this._sideCount; }
  set sideCount(value) { throw new Error(`The sideCount property cannot be written. ${value} was passed.`); }
}
