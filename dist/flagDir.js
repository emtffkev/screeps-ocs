let e={};module.exports=e,e.flagFilter=function(e){if(e){let o;return o=e.filter?_.clone(e.filter):{color:e.color,secondaryColor:e.secondaryColor}}},e.findName=function(e,o,n=true,t,r){let i=this;if(null==e||0==this.list.length)return null;let a;o instanceof Room&&(o=o.getPositionAt(25,25)),"function"==typeof e?a=function(t){if(e(t)&&0==t.cloaking){if(!n)return!0;if(o&&o.roomName&&t.roomName==o.roomName)return!0}return!1}:(a=this.flagFilter(e),n&&o&&o.roomName?_.assign(a,{roomName:o.roomName,cloaking:"0"}):_.assign(a,{cloaking:"0"}));let l=_.filter(i.list,a);if(0==l.length)return null;if(1==l.length)return l[0].name;if(o&&o.roomName){let e=e=>{let n=0,i=routeRange(o.roomName,e.roomName);return n=0==i?_.max([Math.abs(e.x-o.x),Math.abs(e.y-o.y)]):50*i,t&&(n=t(n,e,r)),e.valid=n<1/0,n},n=_.min(l,e);return n.valid?n.name:null}return l[0].name},e.find=function(e,o,n=true,t,r){o instanceof Room&&(o=o.getPositionAt(25,25));let i=this.findName(e,o,n,t,r);return null===i?null:Game.flags[i]},e.removeFromDir=function(e){let o=this.list.indexOf(o=>o.name===e);o>-1&&(this.list=this.list.splice(o,1))},e.count=function(e,o,n=true){if(null==e||0==this.list.length)return 0;o instanceof Room&&(o=o.getPositionAt(25,25));let t=this.flagFilter(e);return n&&o&&o.roomName&&_.assign(t,{roomName:o.roomName}),_.countBy(this.list,t).true||0},e.filter=function(e,o,n=true){if(null==e||0==this.list.length)return[];let t;return o instanceof Room&&(o=o.getPositionAt(25,25)),Array.isArray(e)?t=(t=>{if(n&&o&&o.roomName&&t.roomName!=o.roomName)return!1;for(let r=0;r<e.length;r++)if(Flag.compare(e[r],t))return!0;return!1}):(t=this.flagFilter(e),n&&o&&o.roomName&&_.assign(t,{roomName:o.roomName})),_.filter(this.list,t)},e.filterCustom=function(e){return null==e||0==this.list.length?[]:_.filter(this.list,e)},e.rangeMod=function(e,o,n){let t=n&&n.rangeModPerCrowd?n.rangeModPerCrowd:20,r=n?n.rangeModByType:null;var i=Game.flags[o.name];let a;if(i.targetOf)if(r){let e=_.countBy(i.targetOf,"creepType")[r];a=e||0}else a=i.targetOf.length;else a=0;return e+a*t},e.exploitMod=function(e,o,n){if(e>100)return 1/0;var t=Game.flags[o.name];if(t.room){let o=t.targetOf?_.sum(t.targetOf.map(e=>"privateer"!=e.creepType||e.creepName==n?0:e.carryCapacityLeft)):0;return t.room.sourceEnergyAvailable<=o?1/0:e*e/(t.room.sourceEnergyAvailable-o)}return e},e.hasInvasionFlag=function(){return _.isUndefined(this._hasInvasionFlag)&&(this._hasInvasionFlag=null!=this.findName(FLAG_COLOR.invade)||null!=this.findName(FLAG_COLOR.destroy)),this._hasInvasionFlag},e.extend=function(){Object.defineProperty(Flag.prototype,"cloaking",{configurable:!0,get:function(){return this.memory.cloaking||"0"},set:function(e){this.memory.cloaking=e}}),Object.defineProperty(Flag,"compare",{configurable:!0,value:function(e,o){return e.color===o.color&&e.secondaryColor===o.secondaryColor}}),Object.defineProperty(Flag.prototype,"compareTo",{configurable:!0,value:function(e){return Flag.compare(this,e)}}),Object.defineProperty(RoomPosition.prototype,"newFlag",{configurable:!0,value:function(e,o){if(e||(e=_.get(FLAG_COLOR,e)),e)return this.createFlag(o,e.color,e.secondaryColor)}}),Object.defineProperty(Room.prototype,"newFlag",{configurable:!0,value:function(e,o,n){return o||(o=this.getPositionAt(25,25)),o.newFlag(e,n)}})},e.flush=function(){let e=e=>delete e.targetOf;_.forEach(Game.flags,e),this.list=[],this.stale=[],delete this._hasInvasionFlag},e.analyze=function(){let o=e=>{e.creeps={},e.cloaking&&e.cloaking>0&&e.cloaking--,this.list.push({name:e.name,color:e.color,secondaryColor:e.secondaryColor,roomName:e.pos.roomName,x:e.pos.x,y:e.pos.y,cloaking:e.cloaking})};_.forEach(Game.flags,o);let n=(e,o)=>{Game.flags[o]||this.stale.push(o)};_.forEach(Memory.flags,n);const t=e.specialFlag(!0);return!!t},e.execute=function(){let o=o=>{if(!o.cloaking||0==o.cloaking){const n=Util.startProfiling("Flag.execute",{enabled:PROFILING.FLAGS}),t=Game.flags[o.name];Flag.found.trigger(t),n.checkCPU(o.name,PROFILING.EXECUTE_LIMIT,e.flagType(t))}};this.list.forEach(o);let n=e=>Flag.FlagRemoved.trigger(e);this.stale.forEach(n)},e.cleanup=function(){let e=e=>delete Memory.flags[e];this.stale.forEach(e)},e.flagType=function(o){if(e.isSpecialFlag(o))return"_OCS";for(const n in FLAG_COLOR){const e=FLAG_COLOR[n];if(Flag.compare(o,e))return n;for(const t in e){const r=e[t];if(Flag.compare(o,r))return`${n}.${t}`}}return logError(`Unknown flag type for flag: ${o?o.name:"undefined flag"}.`),"undefined"},e.specialFlag=function(e){const o="_OCS",n=Game.flags[o];if(e){if(!n)return _(Game.rooms).values().some(function(e){return e.getPositionAt(49,49).newFlag({color:COLOR_WHITE,secondaryColor:COLOR_PURPLE},o),!0});"W0N0"!==n.pos.roomName&&n.setPosition(new RoomPosition(49,49,"W0N0"))}return n},e.isSpecialFlag=function(e){return"_OCS"===e.name};