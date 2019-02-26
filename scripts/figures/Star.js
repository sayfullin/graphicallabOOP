class Star extends Figure{
  constructor(ctx, x, y, width, height, angle, borderWidth, color, borderColor, spikeCount, shadow){
    super(ctx, x, y, width, height, angle, borderWidth, color, borderColor, shadow);
    this._spikeCount = spikeCount;
  }

  _getFigureName(){
    return "Star " + this.spikeCount;
  }


  draw(ctx){
    if (!ctx) ctx = this.ctx;
    let rot = Math.PI / 2 * 3;
    let x = this.x;
    let y = this.y;
    let step = Math.PI / this.spikeCount;
    let outerRadius = this._width;
    let innerRadius = Math.ceil(this._width * 0.5);

    ctx.translate(this.x, this.y);
    ctx.rotate((Math.PI / 180) * this.angle);
    if (this.shadow) {
      ctx.shadowColor = 'gray';
      ctx.shadowBlur = 10;
    }
    ctx.beginPath();
    ctx.moveTo(0, 0 - outerRadius)
    for (let i = 0; i < this.spikeCount; i++) {
        x = Math.cos(rot) * outerRadius;
        y = Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y)
        rot += step

        x = Math.cos(rot) * innerRadius;
        y = Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y)
        rot += step
    }
    ctx.lineTo(0, 0 - outerRadius)
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
      'type': 'Star',
      'spikeCount': this.spikeCount
    });
    return json;
  }

  changeSpikeCount(spikeCount){
    if (!Number.isInteger(spikeCount)) throw new Error(`The sideCount must be integer.`);
    this._spikeCount = spikeCount;
  }

  get spikeCount(){ return this._spikeCount; }
  set spikeCount(value) { throw new Error(`The spikeCount property cannot be written. ${value} was passed.`); }
}
