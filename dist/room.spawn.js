const e={};module.exports=e,e.analyzeRoom=function(e,n){n&&e.saveSpawns()},e.extend=function(){Object.defineProperties(Room.prototype,{spawnQueueHigh:{configurable:!0,get:function(){return _.isUndefined(this.memory.spawnQueueHigh)&&(this.memory.spawnQueueHigh=[]),this.memory.spawnQueueHigh}},spawnQueueMedium:{configurable:!0,get:function(){return _.isUndefined(this.memory.spawnQueueMedium)&&(this.memory.spawnQueueMedium=[]),this.memory.spawnQueueMedium}},spawnQueueLow:{configurable:!0,get:function(){return _.isUndefined(this.memory.spawnQueueLow)&&(this.memory.spawnQueueLow=[]),this.memory.spawnQueueLow}}}),Room.prototype.saveSpawns=function(){let e=this.find(FIND_MY_SPAWNS);if(e.length>0){let n=e=>e.id;this.memory.spawns=_.map(e,n)}else delete this.memory.spawns},Room.bestSpawnRoomFor=function(e){var n=n=>n.my?routeRange(n.name,e):1/0;return _.min(Game.rooms,n)},Room.findSpawnRoom=function(e){if(!e||!e.targetRoom)return null;let n=n=>n.my&&(void 0===e.maxRange||Util.routeRange(n.name,e.targetRoom)<=e.maxRange)&&(void 0===e.minEnergyCapacity||e.minEnergyCapacity<=n.energyCapacityAvailable)&&(void 0===e.minEnergyAvailable||e.minEnergyAvailable<=n.energyAvailable)&&(n.name!=e.targetRoom||e.allowTargetRoom===!0)&&(void 0===e.minRCL||n.controller.level>=e.minRCL)&&(void 0===e.callBack||e.callBack(n)),o=_.filter(Game.rooms,n);if(0==o.length)return null;let i=e=>_.sum(e,e=>3*e.parts.length),t=e=>(.9*i(e.spawnQueueLow)+i(e.spawnQueueMedium)+1.1*i(e.spawnQueueHigh))/e.structures.spawns.length,a=n=>{return routeRange(n.name,e.targetRoom)+(8-n.controller.level)/(e.rangeRclRatio||3)+t(n)/(e.rangeQueueRatio||51)};return _.min(o,a)}};