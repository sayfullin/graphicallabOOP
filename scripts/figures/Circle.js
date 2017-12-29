class Circle extends Figure{
  constructor(ctx, x, y, width, height, angle, borderWidth, color, borderColor){
    super(ctx, x, y, width, height, angle, borderWidth, color, borderColor);
  }

  draw(){
    let radiusX = this.width / 2;
    let radiusY = this.height / 2;
    let rotation = (Math.PI / 180) * this.angle;
    this.ctx.beginPath();
    this.ctx.ellipse(this.x, this.y, radiusX, radiusY, rotation, 0, Math.PI * 2, true);
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
  }
}
