$( document ).ready(function(){
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
    'color': $('#colorpicker_color'),
    'borderColor': $('#colorpicker_bordercolor'),
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
