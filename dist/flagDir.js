let e={};module.exports=e,e.flagFilter=function(e){if(e){let o;return o=e.filter?_.clone(e.filter):{color:e.color,secondaryColor:e.secondaryColor}}},e.findName=function(e,o,t=true,n,r){let a=this.list;if(!e||0===a.length)return null;let i;if(o instanceof Room&&(o=o.getPositionAt(25,25)),"function"==typeof e)i=function(n){if(e(n)&&0==n.cloaking){if(!t)return!0;if(o&&o.roomName&&n.roomName===o.roomName)return!0}return!1};else if(i=this.flagFilter(e),_.assign(i,{cloaking:"0"}),t&&o&&o.roomName){const e=Game.rooms[o.roomName];e?a=e.flags:_.assign(i,{roomName:o.roomName})}let l=_.filter(a,i);if(0===l.length)return null;if(1===l.length)return l[0].name;if(o&&o.roomName){let e=e=>{let t=0,a=routeRange(o.roomName,e.roomName);return t=0===a?_.max([Math.abs(e.x-o.x),Math.abs(e.y-o.y)]):50*a,n&&(t=n(t,e,r)),e.valid=t<1/0,t},t=_.min(l,e);return t.valid?t.name:null}return l[0].name},e.find=function(e,o,t=true,n,r){o instanceof Room&&(o=o.getPositionAt(25,25));let a=this.findName(e,o,t,n,r);return null===a?null:Game.flags[a]},e.removeFromDir=function(e){let o=this.list.indexOf(o=>o.name===e);o>-1&&(this.list=this.list.splice(o,1))},e.count=function(e,o,t=true){let n=this.list;if(!e||0===this.list.length)return 0;o instanceof Room&&(o=o.getPositionAt(25,25));let r=this.flagFilter(e);if(t&&o&&o.roomName){const e=Game.flags[o.roomName];e?n=e.flags:_.assign(r,{roomName:o.roomName})}return _.countBy(n,r).true||0},e.filter=function(e,o,t=true){if(!e||0===this.list.length)return[];let n,r=this.list;if(o instanceof Room&&(o=o.getPositionAt(25,25)),Array.isArray(e))n=(n=>{if(t&&o&&o.roomName&&n.roomName!==o.roomName)return!1;for(let r=0;r<e.length;r++)if(Flag.compare(e[r],n))return!0;return!1});else if(n=this.flagFilter(e),t&&o&&o.roomName){const e=Game.rooms[o.roomName];e?r=e.flags:_.assign(n,{roomName:o.roomName})}return _.filter(r,n)},e.filterCustom=function(e){return e&&0!==this.list.length?_.filter(this.list,e):[]},e.rangeMod=function(e,o,t){let n=t&&t.rangeModPerCrowd?t.rangeModPerCrowd:20,r=t?t.rangeModByType:null;var a=Game.flags[o.name];let i;if(a.targetOf)if(r){let e=_.countBy(a.targetOf,"creepType")[r];i=e||0}else i=a.targetOf.length;else i=0;return e+i*n},e.exploitMod=function(e,o,t){if(e>100)return 1/0;var n=Game.flags[o.name];if(n.room){if(n.room.my)return 1/0;let o=n.targetOf?_.sum(n.targetOf.map(e=>"privateer"!=e.creepType||e.creepName==t?0:e.carryCapacityLeft)):0;return n.room.sourceEnergyAvailable<=o?1/0:e*e/(n.room.sourceEnergyAvailable-o)}return e},e.hasInvasionFlag=function(){return _.isUndefined(this._hasInvasionFlag)&&(this._hasInvasionFlag=null!=this.findName(FLAG_COLOR.invade)||null!=this.findName(FLAG_COLOR.destroy)),this._hasInvasionFlag},e.extend=function(){Object.defineProperty(Flag.prototype,"cloaking",{configurable:!0,get:function(){return this.memory.cloaking||"0"},set:function(e){this.memory.cloaking=e}}),Object.defineProperty(Flag,"compare",{configurable:!0,value:function(e,o){return e.color===o.color&&e.secondaryColor===o.secondaryColor}}),Object.defineProperty(Flag.prototype,"compareTo",{configurable:!0,value:function(e){return Flag.compare(this,e)}}),Object.defineProperty(RoomPosition.prototype,"newFlag",{configurable:!0,value:function(e,o){if(e||(e=_.get(FLAG_COLOR,e)),e)return this.createFlag(o,e.color,e.secondaryColor)}}),Object.defineProperty(Room.prototype,"newFlag",{configurable:!0,value:function(e,o,t){return o||(o=this.getPositionAt(25,25)),o.newFlag(e,t)}})},e.flush=function(){let e=e=>delete e.targetOf;_.forEach(Game.flags,e),this.list=[],this.stale=[],delete this._hasInvasionFlag},e.analyze=function(){let o=e=>{try{e.creeps={},e.cloaking&&e.cloaking>0&&e.cloaking--,this.list.push({name:e.name,color:e.color,secondaryColor:e.secondaryColor,roomName:e.pos.roomName,x:e.pos.x,y:e.pos.y,cloaking:e.cloaking})}catch(e){Util.logError(e.stack||e.message)}};_.forEach(Game.flags,o);let t=(e,o)=>{try{Game.flags[o]||this.stale.push(o)}catch(e){Util.logError(e.stack||e.message)}};_.forEach(Memory.flags,t);const n=e.specialFlag(!0);return!!n},e.execute=function(){let o=o=>{try{if(!o.cloaking||0==o.cloaking){const t=Util.startProfiling("Flag.execute",{enabled:PROFILING.FLAGS}),n=Game.flags[o.name];Flag.found.trigger(n),t.checkCPU(o.name,PROFILING.EXECUTE_LIMIT,e.flagType(n))}}catch(e){Util.logError(e.stack||e.message)}};this.list.forEach(o);let t=e=>Flag.FlagRemoved.trigger(e);this.stale.forEach(t)},e.cleanup=function(){let e=e=>delete Memory.flags[e];this.stale.forEach(e)},e.flagType=function(o){if(e.isSpecialFlag(o))return"_OCS";for(const t in FLAG_COLOR){const e=FLAG_COLOR[t];if(Flag.compare(o,e))return t;for(const n in e){const r=e[n];if(Flag.compare(o,r))return`${t}.${n}`}}return logError(`Unknown flag type for flag: ${o?o.name:"undefined flag"}.`),"undefined"},e.specialFlag=function(e){const o="_OCS",t=Game.flags[o];if(e){if(!t)return _(Game.rooms).values().some(function(e){return e.getPositionAt(49,49).newFlag({color:COLOR_WHITE,secondaryColor:COLOR_PURPLE},o),!0});"W0N0"!==t.pos.roomName&&t.setPosition(new RoomPosition(49,49,"W0N0"))}return t},e.isSpecialFlag=function(e){return"_OCS"===e.name};