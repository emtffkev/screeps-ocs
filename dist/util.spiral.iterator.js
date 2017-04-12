/**
 * An endless iterator which advances in a square box beginning at the top-center.
 *
 *     67 68 69 70 71
 *  19 P
 *  18 O  9  A  B  C
 *  17 N  8  1  2  D
 *  16 M  7  0  3  E
 *  15 L  6  5  4  F
 *  14 K  J  I  H  G
 *
 *  Easy starting-points are 0, 1, A, etc. Use the ring number to indicate these.
 */
class i{constructor(i,s,t){this._dir=TOP,this.x=i.x,void 0===s?(this._ring=0,this._step=2,this.y=i.y+1):(this._ring=s-1,this._step=1,this.y=i.y),void 0===t?this._ringLimit=Math.min(2,this._ring+1):Number.isFinite(t)&&(this._ringLimit=t)}depth(){return this._ring}next(){if(i.dirTransform(this,this._dir),--this._step,this._step<=0)switch(this._step=2*this._ring,this._dir){case TOP:this._ring++,this._step++,this._dir=RIGHT;break;case RIGHT:this._dir=BOTTOM;break;case BOTTOM:this._dir=LEFT;break;case LEFT:this._step++,this._dir=TOP;break;default:throw new Error("illegal _dir="+this._dir)}return{done:this._ring>=this._ringLimit,value:{x:this.x,y:this.y}}}static dirTransform(i,s){switch(s){case TOP_RIGHT:i.x++;case TOP:i.y--;break;case BOTTOM_RIGHT:i.y++;case RIGHT:i.x++;break;case BOTTOM_LEFT:i.x--;case BOTTOM:i.y++;break;case TOP_LEFT:i.y--;case LEFT:i.x--}return i}}module.exports=i;