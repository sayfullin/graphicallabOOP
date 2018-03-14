$( document ).ready(function(){

  $('select[name="colorpicker_color"]').simplecolorpicker({ picker: true });
  $('select[name="colorpicker_color"]').simplecolorpicker('selectColor', '#fbd75b');
  $('select[name="colorpicker_bordercolor"]').simplecolorpicker({ picker: true });
  $('select[name="colorpicker_bordercolor"]').simplecolorpicker('selectColor', '#e1e1e1');


  let canvas = document.getElementById('canvas');
  let ctx =  canvas.getContext('2d');
  canvas.width = canvas.parentElement.clientWidth - 10;
  canvas.height = canvas.parentElement.clientHeight - 1;

  let pointPathCanvas= document.getElementById('point_path_canvas_div');
  let pointPathCanvasCtx =  canvas.getContext('2d');
  pointPathCanvasCtx.width = canvas.width;
  pointPathCanvasCtx.height = canvas.height;

  interfac = new Interface(ctx, pointPathCanvasCtx, {
    'canvas': $('#canvas'),
    'color': $('select[name="colorpicker_color"]'),
    'borderColor': $('select[name="colorpicker_bordercolor"]'),
    'borderWidth':$('#borderWidth'),
    'width': $('#width'),
    'height': $('#height'),
    'angle': $('#angle'),
    'sideCount': $('#sideCount'),
    'spikeCount': $('#spikeCount'),
    'polygon': $('#polygon'),
    'star': $('#star'),
    'circle': $('#circle'),
    'edit': $('#edit'),
    'deleteFigure': $('#delete_figure'),
    'figuresList': $('#figures_list'),
    'export': $('#export'),
    'save': $('#save'),
    'load': $('#load'),
  });



});


/*
  poligon = new Polygon(ctx, 120, 180, 50, 50, 0, 2, 'grey', 'black', 4);
  poligon.draw();

  poligon = new Star(ctx, 180, 120, 50, 50, 0, 2, 'green', 'black', 5);
  poligon.draw();
*/
