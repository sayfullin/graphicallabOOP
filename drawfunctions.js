function initcanvas(id) {
    let canvas = document.getElementById(id);
    let context = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    return context;
}

function polygon(ctx, left, top, radius, angle, sides, strokestyle, fillstyle) {
    if (sides < 3) {
        return;
    }
    ctx.translate(left,top);
    ctx.rotate((Math.PI / 180) * angle);
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    let a = ((Math.PI * 2)/sides);
    for (let i = 1; i < sides; i++) {
        ctx.lineTo(radius * Math.cos(a * i), radius * Math.sin(a * i));
    }
    ctx.closePath();
    if (fillstyle != 'none') {
        ctx.fillStyle = fillstyle;
        ctx.fill();
    }
    if (strokestyle != 'none') {
        ctx.strokeStyle = strokestyle;
        ctx.stroke();
    }
    ctx.rotate(-(Math.PI / 180) * angle);
    ctx.translate(-left,-top);
}

let context = initcanvas('OOP');
polygon(context, 100, 100, 50, 0, 4, 'blue', 'red');