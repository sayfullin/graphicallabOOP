'use strict';

class spolygon {
    constructor() {
        this.ctx = initcanvas('OOP');
        this.left = 100;
        this.top = 100;
        this.height = 100;
        this.width = 100;
        this.angle = 0;
        this.sides = 4;
        this.strokestyle = 'black';
        this.linewidth = 1;
        this.fillstyle = 'gray';
    }
    draw() {
        polygon(this.ctx, this.left, this.top, this.height, this.width, this.angle, this.sides, this.strokestyle, this.linewidth, this.fillstyle);
    }
    move(left, top) {
        this.left = left;
        this.top = top;
        draw();
    }
}

function initcanvas(id) {
    let canvas = document.getElementById(id);
    let context = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    return context;
}

function polygon(ctx, left, top, height, width, angle, sides, strokestyle, linewidth, fillstyle) {
    if (sides < 3) {
        return;
    }
    ctx.translate(left,top);
    ctx.rotate((Math.PI / 180) * angle);
    ctx.beginPath();
    ctx.moveTo(width, 0);
    let a = ((Math.PI * 2)/sides);
    for (let i = 1; i < sides; i++) {
        ctx.lineTo(width * Math.cos(a * i), height * Math.sin(a * i));
    }
    ctx.closePath();
    if (fillstyle != 'none') {
        ctx.fillStyle = fillstyle;
        ctx.fill();
    }
    if (strokestyle != 'none') {
        ctx.lineWidth = linewidth;
        ctx.strokeStyle = strokestyle;
        ctx.stroke();
    }
    ctx.rotate(-(Math.PI / 180) * angle);
    ctx.translate(-left,-top);
}

var newpoly = new spolygon;
newpoly.draw();