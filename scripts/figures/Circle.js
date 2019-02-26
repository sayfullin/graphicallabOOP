class Circle extends Figure{
  constructor(ctx, x, y, width, height, angle, borderWidth, color, borderColor, shadow){
    super(ctx, x, y, width, height, angle, borderWidth, color, borderColor, shadow);
  }

  _getFigureName(){
    return "Circle"
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
    ctx.ellipse(0, 0, this.width, this.height, 0, 0, 2 * Math.PI);
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
      'type': 'Circle'
    });
    return json;
  }


}
