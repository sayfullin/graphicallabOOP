class Polygon extends Figure{
  constructor(ctx, x, y, width, height, angle, borderWidth, color, borderColor, sideCount){
    super(ctx, x, y, width, height, angle, borderWidth, color, borderColor);
    if (!Number.isInteger(sideCount)) throw new Error(`The sideCount must be integer.`);
    this._sideCount = sideCount;
  }

  _getFigureName(){
    return "Многоугольник " + this.sideCount;
  }

  draw(){
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate((Math.PI / 180) * this.angle);
    this.ctx.beginPath();
    this.ctx.moveTo(this.width, 0);
    let a = ((Math.PI * 2)/this.sideCount);
    for (let i = 1; i < this.sideCount; i++) {
        this.ctx.lineTo(this.width * Math.cos(a * i), this.height * Math.sin(a * i));
    }
    this.ctx.closePath();
    if (this.color != undefined) {
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
    if (this.borderColor != undefined && this.borderWidth){
        this.ctx.lineWidth = this.borderWidth;
        this.ctx.strokeStyle = this.borderColor;
        this.ctx.stroke();
    }
    this.ctx.rotate(-(Math.PI / 180) * this.angle);
    this.ctx.translate(-this.x, -this.y);


  }

  changeSideCount(sideCount){
    if (!Number.isInteger(sideCount)) throw new Error(`The sideCount must be integer.`);
    this._sideCount = sideCount;
  }

  get sideCount(){ return this._sideCount; }
  set sideCount(value) { throw new Error(`The sideCount property cannot be written. ${value} was passed.`); }
}
