class Options{
  constructor(){
    this._width = null;
    this._height = null;
    this._angle = null;
    this._color = null;
    this._borderWidth = null;
    this._borderColor = null;
    this._spikeCount = null;
    this._sideCount = null;
  }

  get color(){ return this._color; }
  set color(value){ this._color = value; }
  get borderColor(){ return this._borderColor; }
  set borderColor(value){ this._borderColor = value; }

  get width(){ return this._width; }
  set width(value){ if (!Number.isInteger(value)) throw new Error(`The width must be integer.`); this._width = value; }
  get height(){ return this._height; }
  set height(value){ if (!Number.isInteger(value)) throw new Error(`The height must be integer.`); this._height = value; }
  get angle(){ return this._angle; }
  set angle(value){ if (!Number.isInteger(value)) throw new Error(`The angle must be integer.`); this._angle = value; }
  get borderWidth(){ return this._borderWidth; }
  set borderWidth(value){ if (!Number.isInteger(value)) throw new Error(`The borderWidth must be integer.`); this._borderWidth = value; }
  get spikeCount(){ return this._spikeCount; }
  set spikeCount(value){ if (!Number.isInteger(value)) throw new Error(`The spikeCount must be integer.`); this._spikeCount = value; }
  get sideCount(){ return this._sideCount; }
  set sideCount(value){ if (!Number.isInteger(value)) throw new Error(`The sideCount must be integer.`); this._sideCount = value; }
  get sideCount(){ return this._sideCount; }
  set sideCount(value){ if (!Number.isInteger(value)) throw new Error(`The sideCount must be integer.`); this._sideCount = value; }
}
