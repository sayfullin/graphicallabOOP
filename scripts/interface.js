const EDIT = 10;
const DELETE_FIGURE = 11;
const ADD_STAR = 21;
const ADD_POLYGON = 22;
const ADD_CIRCLE = 23;

class Interface{
  constructor(ctx, domElements){
      if (!ctx) throw new Error(`The ctx must implement.`);
      this._ctx = ctx;

      this._canvas = new Canvas(this.ctx);
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
        if (that._currentOperation == EDIT){
          that._getCurrentFigure().changeColor(that._options.color);
          that._canvas.draw();
        }
      });
      domElements.borderColor.on('change', function(){
        that._options.borderColor =  $(this).val();
        if (that._currentOperation == EDIT){
          that._getCurrentFigure().changeBorderColor(that._options.borderColor);
          that._canvas.draw();
        }
      });
      domElements.borderWidth.on('change', function(){
        that._options.borderWidth = Number.parseInt($(this).val());
        if (that._currentOperation == EDIT){
          that._getCurrentFigure().changeBorderWidth(that._options.borderWidth);
          that._canvas.draw();
        }
      });
      domElements.width.on('change', function(){
        that._options.width = Number.parseInt($(this).val());
        if (that._currentOperation == EDIT){
          that._getCurrentFigure().resize(that._options.width, that._options.width);
          that._canvas.draw();
        }
      });
      domElements.height.on('change', function(){
        that._options.height = Number.parseInt($(this).val());
        if (that._currentOperation == EDIT){
          that._getCurrentFigure().resize(that._options.width, that._options.width);
          that._canvas.draw();
        }
      });
      domElements.angle.on('change', function(){
        that._options.angle = Number.parseInt($(this).val());
        if (that._currentOperation == EDIT){
          that._getCurrentFigure().rotate(that._options.angle);
          that._canvas.draw();
        }
      });
      domElements.sideCount.on('change', function(){
        that._options.sideCount = Number.parseInt($(this).val());
        if (that._currentOperation == EDIT && (that._getCurrentFigure() instanceof Polygon)){
          that._getCurrentFigure().changeSideCount(that._options.sideCount);
          that._canvas.draw();
        }
      });
      domElements.spikeCount.on('change', function(){
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
              if (that._getCurrentFigure()){
                that._getCurrentFigure().move(xPos, yPos);
              }
          }
          that._canvas.draw();
          that.refreshFiguresList(domElements.figuresList);
      })

      domElements.figuresList.on('click', '.radiobox-div', function(event){
        that._currentFigure = Number.parseInt(this.getAttribute('attr-index'));
        that._currentOperation = EDIT;
      })

      domElements.edit.on('click', function(){
        that._currentOperation = EDIT;
        that._currentFigure = null;
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
          that.refreshFiguresList(domElements.figuresList);
        }
        that._currentOperation = EDIT;
      });
      domElements.polygon.on('click', function(){
        that._currentOperation = ADD_POLYGON;
        that._currentFigure = null;
      });
      domElements.star.on('click', function(){
        that._currentOperation = ADD_STAR;
        that._currentFigure = null;
      });
      domElements.circle.on('click', function(){
        that._currentOperation = ADD_CIRCLE;
        that._currentFigure = null;
      });


  }

  _getCurrentFigure(){
    if (this._currentFigure != null)
      return this._canvas.items[this._currentFigure];
    else if(this._canvas.items.length > 0)
        return this._canvas.items[this._canvas.items.length-1];
      else
        return null;
  }

  refreshFiguresList(figuresList){
    figuresList.html("");
    for (var i = 0; i < this._canvas.items.length; i++) {
      name = (i+1) + '. ' + this._canvas.items[i].getTitle();
      let listItem = "<div class='radiobox-div' attr-index="+i+"><label class='radiobox'><input type='radio' name='selectedIdEneble'><span class='item'>"+name+"</span></label></div>"
      figuresList.append(listItem);
    }
    if (this._currentFigure != null)
      $('.radiobox-div[attr-index=' + this._currentFigure + '] .radiobox input').prop("checked", true)
  }

  get ctx(){ return this._ctx; }
  set ctx(value) { throw new Error(`The ctx property cannot be written. ${value} was passed.`); }
}