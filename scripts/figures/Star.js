class Star extends Figure{
  constructor(ctx, x, y, width, height, angle, borderWidth, color, borderColor, spikeCount){
    super(ctx, x, y, width, height, angle, borderWidth, color, borderColor);
    this._spikeCount = spikeCount;
  }

  draw(){
    let rot = Math.PI / 2 * 3;
    let x = this.x;
    let y = this.y;
    let step = Math.PI / this.spikeCount;
    let outerRadius = this._width;
    let innerRadius = Math.ceil(this._width * 0.5);
    this.ctx.rotate((Math.PI / 180) * this.angle);

    this.ctx.strokeSyle = "#000";
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y - outerRadius)
    for (let i = 0; i < this.spikeCount; i++) {
        x = this.x + Math.cos(rot) * outerRadius;
        y = this.y + Math.sin(rot) * outerRadius;
        this.ctx.lineTo(x, y)
        rot += step

        x = this.x + Math.cos(rot) * innerRadius;
        y = this.y + Math.sin(rot) * innerRadius;
        this.ctx.lineTo(x, y)
        rot += step
    }
    this.ctx.lineTo(this.x, this.y - outerRadius)
    this.ctx.closePath();
    if (this.color != 'none') {
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
    if (this.borderColor != 'none') {
        this.ctx.lineWidth = this.borderWidth;
        this.ctx.strokeStyle = this.borderColor;
        this.ctx.stroke();
    }
    this.ctx.rotate(-(Math.PI / 180) * this.angle);
  }

  changeSideCount(spikeCount){
    if (!Number.isInteger(spikeCount)) throw new Error(`The sideCount must be integer.`);
    this._spikeCount = spikeCount;
  }

  get spikeCount(){ return this._spikeCount; }
  set spikeCount(value) { throw new Error(`The spikeCount property cannot be written. ${value} was passed.`); }
}
