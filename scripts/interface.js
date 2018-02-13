const EDIT = 10;
const DELETE_FIGURE = 11;
const ADD_STAR = 21;
const ADD_POLYGON = 22;
const ADD_CIRCLE = 23;
const MOVE = 24;

class Interface{
  constructor(ctx, pointPathCanvasCtx, domElements){
      if (!ctx) throw new Error(`The ctx must implement.`);
      this._ctx = ctx;

      if (!pointPathCanvasCtx) throw new Error(`The pointPathCanvasCtx must implement.`);

      this._canvas = new Canvas(this.ctx, pointPathCanvasCtx);
      this._currentFigure = null;
      this._currentOperation = null;

      this._options = new Options();

      if (!domElements) throw new Error(`The domElements must implement.`);
      if (!domElements.canvas) throw new Error(`The domElements.canvas must implement.`);
      if (!domElements.color) throw new Error(`The domElements.color must implement.`);
      if (!domElements.borderColor) throw new Error(`The domElements.borderColor must implement.`);
      if (!domElements.borderWidth) throw new Error(`The domElements.borderWidth must implement.`);
      if (!domElements.width) throw new Error(`The domElements.width must implement.`);
      if (!domElements.height) throw new Error(`The domElements.height must implement.`);
      if (!domElements.angle) throw new Error(`The domElements.angle must implement.`);
      if (!domElements.sideCount) throw new Error(`The domElements.sideCount must implement.`);
      if (!domElements.spikeCount) throw new Error(`The domElements.spikeCount must implement.`);

      if (!domElements.polygon) throw new Error(`The domElements.polygon must implement.`);
      if (!domElements.star) throw new Error(`The domElements.star must implement.`);
      if (!domElements.circle) throw new Error(`The domElements.circle must implement.`);
      if (!domElements.edit) throw new Error(`The domElements.edit must implement.`);
      if (!domElements.deleteFigure) throw new Error(`The domElements.delete_figure must implement.`);

      this._domElements = domElements;


      this._options.color = domElements.color.val();
      this._options.borderColor = domElements.borderColor.val();
      this._options.borderWidth = Number.parseInt(domElements.borderWidth.val());
      this._options.width = Number.parseInt(domElements.width.val());
      this._options.height = Number.parseInt(domElements.height.val());
      this._options.angle = Number.parseInt(domElements.angle.val());
      this._options.sideCount = Number.parseInt(domElements.sideCount.val());
      this._options.spikeCount = Number.parseInt(domElements.spikeCount.val());

      let that = this;
      domElements.color.on('change', function(){
        that._options.color = $(this).val();
        if (that._currentOperation == EDIT && that._currentFigure != null){
          that._getCurrentFigure().changeColor(that._options.color);
          that._canvas.draw();
        }
      });
      domElements.borderColor.on('change', function(){
        that._options.borderColor =  $(this).val();
        if (that._currentOperation == EDIT && that._currentFigure != null){
          that._getCurrentFigure().changeBorderColor(that._options.borderColor);
          that._canvas.draw();
        }
      });
      domElements.borderWidth.on('change', function(){
        that._options.borderWidth = Number.parseInt($(this).val());
        if (that._currentOperation == EDIT && that._currentFigure != null){
          that._getCurrentFigure().changeBorderWidth(that._options.borderWidth);
          that._canvas.draw();
        }
      });
      domElements.width.on('input', function(){
        that._options.width = Number.parseInt($(this).val());
        if (that._currentOperation == EDIT && that._currentFigure != null){
          that._getCurrentFigure().resize(that._options.width, that._options.height);
          that._canvas.draw();
        }
      });
      domElements.height.on('input', function(){
        that._options.height = Number.parseInt($(this).val());
        if (that._currentOperation == EDIT && that._currentFigure != null){
          that._getCurrentFigure().resize(that._options.width, that._options.height);
          that._canvas.draw();
        }
      });
      domElements.angle.on('input', function(){
        that._options.angle = Number.parseInt($(this).val());
        if (that._currentOperation == EDIT && that._currentFigure != null){
          that._getCurrentFigure().rotate(that._options.angle);
          that._canvas.draw();
        }
      });
      domElements.sideCount.on('input', function(){
        that._options.sideCount = Number.parseInt($(this).val());
        if (that._currentOperation == EDIT && (that._getCurrentFigure() instanceof Polygon)){
          that._getCurrentFigure().changeSideCount(that._options.sideCount);
          that._canvas.draw();
        }
      });
      domElements.spikeCount.on('input', function(){
        that._options.spikeCount = Number.parseInt($(this).val());
        if (that._currentOperation == EDIT && (that._getCurrentFigure() instanceof Star)){
          that._getCurrentFigure().changeSpikeCount(that._options.spikeCount);
          that._canvas.draw();
        }
      });

      domElements.canvas.on('click', function(event){
          let xPos = Math.ceil(event.pageX - $(this).offset().left);
          let yPos = Math.ceil(event.pageY - $(this).offset().top);

          switch (that._currentOperation) {
            case ADD_POLYGON:
              that._canvas.addPolygon(xPos, yPos, that._options);
              break;
            case ADD_STAR:
              that._canvas.addStar(xPos, yPos, that._options);
              break;
            case ADD_CIRCLE:
              that._canvas.addCircle(xPos, yPos, that._options);
              break;
            case EDIT:
              that._currentFigure = that._canvas.getFigureIndexByCoord(xPos, yPos);
          }
          that._canvas.draw();
          that.refreshFiguresList();
      })
      domElements.canvas.on('mousedown', function(event){
        switch (that._currentOperation) {
          case EDIT:
            let xPos = Math.ceil(event.pageX - $(this).offset().left);
            let yPos = Math.ceil(event.pageY - $(this).offset().top);
            let mfigure = that._canvas.getFigureIndexByCoord(xPos, yPos);
            if (that._currentFigure != null && that._currentFigure == mfigure) {
              that._currentOperation = MOVE;
            }
        }
      })
      domElements.canvas.on('mousemove', function(event){
        switch (that._currentOperation) {
          case MOVE:
            let xPos = Math.ceil(event.pageX - $(this).offset().left);
            let yPos = Math.ceil(event.pageY - $(this).offset().top);
            that._getCurrentFigure().move(xPos, yPos);
            that._canvas.draw();
        }
      })
      domElements.canvas.on('mouseup', function(event){
        switch (that._currentOperation) {
          case MOVE:
            that._currentOperation = EDIT;
        }
      })
      domElements.figuresList.on('click', '.radiobox-div', function(event){
        that._currentFigure = Number.parseInt(this.getAttribute('attr-index'));
        that._currentOperation = EDIT;
        that.selectFigure();
      })

      domElements.edit.on('click', function(){
        that._currentOperation = EDIT;
        if (that._canvas.items.length > 0)
          that._currentFigure = that._canvas.items.length-1;
        else
          that._currentFigure = null;
        that.selectFigure();
      });
      domElements.deleteFigure.on('click', function(){
        if (that._currentFigure != null){
          that._canvas.deleteItem(that._currentFigure);
          that._canvas.draw();
          if (that._canvas.items.length == 0){
            that._currentFigure = null;
          }else if (that._currentFigure == that._canvas.items.length){
            that._currentFigure = that._canvas.items.length-1;
          }
          that.refreshFiguresList();
        }
        that._currentOperation = EDIT;
      });
      domElements.polygon.on('click', function(){
        that._currentOperation = ADD_POLYGON;
        that._currentFigure = null;
        that._domElements.spikeCount.hide();
        that._domElements.sideCount.show();
      });
      domElements.star.on('click', function(){
        that._currentOperation = ADD_STAR;
        that._currentFigure = null;
        that._domElements.spikeCount.show();
        that._domElements.sideCount.hide();
      });
      domElements.circle.on('click', function(){
        that._currentOperation = ADD_CIRCLE;
        that._currentFigure = null;
        that._domElements.spikeCount.hide();
        that._domElements.sideCount.hide();
      });


  }

  _getCurrentFigure(){
    if (this._currentFigure != null)
      return this._canvas.items[this._currentFigure];
    else
      return null;
  }

  selectFigure(){
    if (this._currentFigure != null){
      $('.radiobox-div[attr-index=' + this._currentFigure + '] .radiobox input').prop("checked", true);
      let figure = this._getCurrentFigure();
      this._domElements.width.val(figure.width);
      this._domElements.height.val(figure.height);
      this._domElements.angle.val(figure.angle);
      this._domElements.borderWidth.val(figure.borderWidth);
      this._domElements.color.simplecolorpicker('selectColor',figure.color);
      this._domElements.borderColor.simplecolorpicker('selectColor',figure.borderColor);
      if (figure instanceof Star){
        this._domElements.spikeCount.val(figure.spikeCount);
        this._domElements.spikeCount.show();
      }else
        this._domElements.spikeCount.hide();

      if (figure instanceof Polygon){
        this._domElements.sideCount.val(figure.sideCount);
        this._domElements.sideCount.show();
      }else
        this._domElements.sideCount.hide();
    }
  }

  refreshFiguresList(){
    let figuresList = this._domElements.figuresList;
    figuresList.html("");
    for (var i = 0; i < this._canvas.items.length; i++) {
      name = (i+1) + '. ' + this._canvas.items[i].getTitle();
      let listItem = "<div class='radiobox-div' attr-index="+i+"><label class='radiobox'><input type='radio' name='selectedIdEneble'><span class='item'>"+name+"</span></label></div>"
      figuresList.append(listItem);
    }
    this.selectFigure();
  }

  get ctx(){ return this._ctx; }
  set ctx(value) { throw new Error(`The ctx property cannot be written. ${value} was passed.`); }
}
