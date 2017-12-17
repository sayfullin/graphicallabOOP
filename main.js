$( document ).ready(function(){
  var canvas = document.getElementById('canvas');
  var ctx =  canvas.getContext('2d');

  poligon = new Polygon(ctx, 120, 180, 50, 50, 15, 2, 'grey', 'black', 4);
  poligon.draw();

  poligon = new Star(ctx, 180, 120, 50, 50, 15, 2, 'green', 'black', 5);
  poligon.draw();
});
