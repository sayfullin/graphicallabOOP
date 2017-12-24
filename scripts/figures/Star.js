class Star extends Figure{
  constructor(ctx, x, y, width, height, angle, borderWidth, color, borderColor, spikeCount, outerRadius, innerRadius){
    super(ctx, x, y, width, height, angle, borderWidth, color, borderColor);
    this._spikeCount = spikeCount;
    this._outerRadius = outerRadius;
    this._innerRadius = innerRadius;
  }

  draw(){
    let rot = Math.PI / 2 * 3;
    let step = Math.PI / this.spikeCount;
    let outerRadius = this._outerRadius;
    let innerRadius = this._innerRadius;
    let width = this._width;
    let height = this._height;

    this.ctx.translate(this.x, this.y);
    this.ctx.rotate((Math.PI / 180) * (this.angle - 45));
    this.ctx.beginPath();
    // this.ctx.moveTo(0, -outerRadius);
    for (let i = 0; i < this.spikeCount; i++) {
        let x = Math.cos(rot + width) * outerRadius;
        let y = Math.sin(rot + height) * outerRadius;
        this.ctx.lineTo(x, y);
        rot += step;

        x = Math.cos(rot + width) * innerRadius;
        y = Math.sin(rot + height) * innerRadius;
        this.ctx.lineTo(x, y);
        rot += step
    }
    // this.ctx.lineTo(0, -outerRadius);
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
    this.ctx.rotate(-(Math.PI / 180) * (this.angle - 45));
    this.ctx.translate(-this.x, -this.y);
  }

  changeSideCount(spikeCount){
    if (!Number.isInteger(spikeCount)) throw new Error(`The sideCount must be integer.`);
    this._spikeCount = spikeCount;
  }

  get spikeCount(){ return this._spikeCount; }
  set spikeCount(value) { throw new Error(`The spikeCount property cannot be written. ${value} was passed.`); }
}
