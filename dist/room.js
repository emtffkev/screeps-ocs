// save original API functions
let e=Room.prototype.find,t={};module.exports=t,t.register=function(){for(const e of Object.keys(Room._ext))Room._ext[e].register&&Room._ext[e].register();Room.costMatrixInvalid.on(e=>Room.rebuildCostMatrix(e.name||e)),Room.RCLChange.on(e=>e.structures.all.filter(e=>![STRUCTURE_ROAD,STRUCTURE_WALL,STRUCTURE_RAMPART].includes(e.structureType)).forEach(t=>{t.isActive()||_.set(e.memory,["structures",t.id,"active"],!1)}))},Room.pathfinderCache={},Room.pathfinderCacheDirty=!1,Room.pathfinderCacheLoaded=!1,Room.COSTMATRIX_CACHE_VERSION=3,t.extend=function(){for(const t of Object.keys(Room._ext))Room._ext[t].extend&&Room._ext[t].extend();let o=function(e){this.room=e,Object.defineProperties(this,{all:{configurable:!0,get:function(){return _.isUndefined(this._all)&&(this._all=this.room.find(FIND_STRUCTURES)),this._all}},my:{configurable:!0,get:function(){return _.isUndefined(this._my)&&(this._my=this.room.find(FIND_MY_STRUCTURES)),this._my}},towers:{configurable:!0,get:function(){if(_.isUndefined(this._towers)){this._towers=[];var e=e=>{addById(this._towers,e)};_.forEach(this.room.memory.towers,e)}return this._towers}},repairable:{configurable:!0,get:function(){if(_.isUndefined(this._repairable)){let e=this;this._repairable=_.sortBy(e.all.filter(t=>t.hits<t.hitsMax&&(!e.room.my||t.hits<MAX_REPAIR_LIMIT[e.room.controller.level]||t.hits<LIMIT_URGENT_REPAIRING+(2*DECAY_AMOUNT[t.structureType]||0))&&(!DECAYABLES.includes(t.structureType)||t.hitsMax-t.hits>GAP_REPAIR_DECAYABLE)&&(void 0===Memory.pavementArt[e.room.name]||Memory.pavementArt[e.room.name].indexOf("x"+t.pos.x+"y"+t.pos.y+"x")<0)&&!FlagDir.list.some(e=>e.roomName==t.pos.roomName&&e.color==COLOR_ORANGE&&e.x==t.pos.x&&e.y==t.pos.y)),"hits")}return this._repairable}},urgentRepairable:{configurable:!0,get:function(){if(_.isUndefined(this._urgentRepairableSites)){var e=e=>e.hits<LIMIT_URGENT_REPAIRING+(DECAY_AMOUNT[e.structureType]||0);this._urgentRepairableSites=_.filter(this.repairable,e)}return this._urgentRepairableSites}},feedable:{configurable:!0,get:function(){return _.isUndefined(this._feedable)&&(this._feedable=this.extensions.concat(this.spawns)),this._feedable}},fortifyable:{configurable:!0,get:function(){if(_.isUndefined(this._fortifyableSites)){let e=this;this._fortifyableSites=_.sortBy(e.all.filter(t=>e.room.my&&t.hits<t.hitsMax&&t.hits<MAX_FORTIFY_LIMIT[e.room.controller.level]&&(t.structureType!=STRUCTURE_CONTAINER||t.hits<MAX_FORTIFY_CONTAINER)&&(!DECAYABLES.includes(t.structureType)||t.hitsMax-t.hits>3*GAP_REPAIR_DECAYABLE)&&(void 0===Memory.pavementArt[e.room.name]||Memory.pavementArt[e.room.name].indexOf("x"+t.pos.x+"y"+t.pos.y+"x")<0)&&!FlagDir.list.some(e=>e.roomName==t.pos.roomName&&e.color==COLOR_ORANGE&&e.x==t.pos.x&&e.y==t.pos.y)),"hits")}return this._fortifyableSites}},fuelable:{configurable:!0,get:function(){if(_.isUndefined(this._fuelables)){var e=this,t=e.room.situation.invasion?1:.82,o=e=>e.energy<e.energyCapacity*t;this._fuelables=_.sortBy(_.filter(this.towers,o),"energy")}return this._fuelables}},container:{configurable:!0,get:function(){return _.isUndefined(this._container)&&(this._container=new Room.Containers(this.room)),this._container}},links:{configurable:!0,get:function(){return _.isUndefined(this._links)&&(this._links=new Room.Links(this.room)),this._links}},labs:{configurable:!0,get:function(){return _.isUndefined(this._labs)&&(this._labs=new Room.Labs(this.room)),this._labs}},virtual:{configurable:!0,get:function(){return _.isUndefined(this._virtual)&&(this._virtual=_(this.all).concat(this.piles)),this._virtual}},piles:{configurable:!0,get:function(){if(_.isUndefined(this._piles)){const e=this.room;this._piles=FlagDir.filter(FLAG_COLOR.command.drop,e.getPositionAt(25,25),!0).map(function(t){const o=Game.flags[t.name],i=e.lookForAt(LOOK_ENERGY,o.pos.x,o.pos.y);return i.length&&i[0]||o})}return this._piles}},observer:{configurable:!0,get:function(){return _.isUndefined(this._observer)&&this.room.memory.observer&&(this._observer=Game.getObjectById(this.room.memory.observer.id)),this._observer}},nuker:{configurable:!0,get:function(){return _.isUndefined(this._nuker)&&this.room.memory.nukers&&this.room.memory.nukers.length>0&&(this._nuker=Game.getObjectById(this.room.memory.nukers[0].id)),this._nuker}},nukers:{configurable:!0,get:function(){return _.isUndefined(this._nukers)&&(this._nukers=new Room.Nuker(this.room)),this._nukers}},powerSpawn:{configurable:!0,get:function(){return _.isUndefined(this._powerSpawn)&&this.room.memory.powerSpawns&&this.room.memory.powerSpawns.length>0&&(this._powerSpawn=Game.getObjectById(this.room.memory.powerSpawns[0].id)),this._powerSpawn}},powerSpawns:{configurable:!0,get:function(){return _.isUndefined(this._powerSpawns)&&(this._powerSpawns=new Room.PowerSpawn(this.room)),this._powerSpawns}},extensions:{configurable:!0,get:function(){return _.isUndefined(this.room.memory.extensions)&&this.room.saveExtensions(),_.isUndefined(this._extensions)&&(this._extensions=_.map(this.room.memory.extensions,e=>Game.getObjectById(e))),this._extensions}},spawns:{configurable:!0,get:function(){if(_.isUndefined(this._spawns)){this._spawns=[];var e=e=>{addById(this._spawns,e)};_.forEach(this.room.memory.spawns,e)}return this._spawns}}})};Object.defineProperties(Room.prototype,{structures:{configurable:!0,get:function(){return _.isUndefined(this._structures)&&(this._structures=new o(this)),this._structures}},relativeEnergyAvailable:{configurable:!0,get:function(){return _.isUndefined(this._relativeEnergyAvailable)&&(this._relativeEnergyAvailable=this.energyCapacityAvailable>0?this.energyAvailable/this.energyCapacityAvailable:0),this._relativeEnergyAvailable}},relativeRemainingEnergyAvailable:{configurable:!0,get:function(){return this.energyCapacityAvailable>0?this.remainingEnergyAvailable/this.energyCapacityAvailable:0}},remainingEnergyAvailable:{configurable:!0,get:function(){return this.energyAvailable-this.reservedSpawnEnergy}},reservedSpawnEnergy:{configurable:!0,get:function(){return _.isUndefined(this._reservedSpawnEnergy)&&(this._reservedSpawnEnergy=0),this._reservedSpawnEnergy},set:function(e){this._reservedSpawnEnergy=e}},creeps:{configurable:!0,get:function(){return _.isUndefined(this._creeps)&&(this._creeps=this.find(FIND_MY_CREEPS)),this._creeps}},allCreeps:{configurable:!0,get:function(){return _.isUndefined(this._allCreeps)&&(this._allCreeps=this.find(FIND_CREEPS)),this._allCreeps}},immobileCreeps:{configurable:!0,get:function(){return _.isUndefined(this._immobileCreeps)&&(this._immobileCreeps=_.filter(this.creeps,e=>{const t=e.data&&e.data.determinatedSpot;return t&&e.pos.isEqualTo(e.room.getPositionAt(t.x,t.y))})),this._immobileCreeps}},situation:{configurable:!0,get:function(){return _.isUndefined(this._situation)&&(this._situation={noEnergy:0==this.sourceEnergyAvailable,invasion:this.hostiles.length>0&&(!this.controller||!this.controller.safeMode)}),this._situation}},adjacentRooms:{configurable:!0,get:function(){return _.isUndefined(this.memory.adjacentRooms)&&(this.memory.adjacentRooms=Room.adjacentRooms(this.name)),this.memory.adjacentRooms}},adjacentAccessibleRooms:{configurable:!0,get:function(){return _.isUndefined(this.memory.adjacentAccessibleRooms)&&(this.memory.adjacentAccessibleRooms=Room.adjacentAccessibleRooms(this.name)),this.memory.adjacentAccessibleRooms}},privateerMaxWeight:{configurable:!0,get:function(){if(_.isUndefined(this._privateerMaxWeight)&&(this._privateerMaxWeight=0,!this.situation.invasion&&!this.conserveForDefense)){let e,t,o,i,r=1e3*this.controller.level,n=this,s=FlagDir.filter([FLAG_COLOR.invade.robbing,FLAG_COLOR.invade.exploit]),a=e=>{e!=n.name&&Room.isMine(e)&&t++},c=s=>{this.adjacentAccessibleRooms.includes(s.roomName)&&(o=Game.rooms[s.roomName],o?(e=o.adjacentAccessibleRooms,i=o.sources.length):(e=Room.adjacentAccessibleRooms(s.roomName),i=1),t=1,e.forEach(a),n._privateerMaxWeight+=i*r/t)};s.forEach(c)}return this._privateerMaxWeight}},claimerMaxWeight:{configurable:!0,get:function(){if(_.isUndefined(this._claimerMaxWeight)){this._claimerMaxWeight=0;let e,t,o,i=1250,r=2,n=this,s=this.controller.level,a=FlagDir.filter([FLAG_COLOR.claim,FLAG_COLOR.claim.reserve,FLAG_COLOR.invade.exploit]),c=a=>{if(s>3||a.color==FLAG_COLOR.claim.color&&a.secondaryColor==FLAG_COLOR.claim.secondaryColor){if(e=Room.roomDistance(n.name,a.roomName),e>r)return;if(o=Game.flags[a.name],o.room&&o.room.controller&&o.room.controller.reservation&&o.room.controller.reservation.ticksToEnd>2500)return;t=o.targetOf&&o.targetOf?_.sum(o.targetOf.map(e=>"claimer"==e.creepType?e.weight:0)):0,n._claimerMaxWeight+=i-t}};a.forEach(c)}return this._claimerMaxWeight}},structureMatrix:{configurable:!0,get:function(){if(_.isUndefined(this._structureMatrix)){const t=Room.getCachedStructureMatrix(this.name);if(t&&t.valid)this._structureMatrix=t.costMatrix;else{global.DEBUG&&logSystem(this.name,"Calculating cost matrix");var e=new PathFinder.CostMatrix;let t=t=>{const o=t instanceof ConstructionSite;if(o&&!t.my&&Task.reputation.allyOwner(t))return e.set(t.pos.x,t.pos.y,255);if(t.structureType===STRUCTURE_ROAD){if(!o||USE_UNBUILT_ROADS)return e.set(t.pos.x,t.pos.y,1)}else{if(t.structureType===STRUCTURE_PORTAL)return e.set(t.pos.x,t.pos.y,255);if(OBSTACLE_OBJECT_TYPES.includes(t.structureType)){if(!o||Task.reputation.allyOwner(t))return e.set(t.pos.x,t.pos.y,255)}else if(t.structureType===STRUCTURE_RAMPART&&!t.my&&!t.isPublic&&(!o||Task.reputation.allyOwner(t)))return e.set(t.pos.x,t.pos.y,255)}};this.structures.all.forEach(t),this.constructionSites.forEach(t),this.immobileCreeps.forEach(t=>e.set(t.pos.x,t.pos.y,255));const o=_.get(Room.pathfinderCache,[this.name,"updated"]);Room.pathfinderCache[this.name]={costMatrix:e,updated:Game.time,version:Room.COSTMATRIX_CACHE_VERSION},Room.pathfinderCacheDirty=!0,global.DEBUG&&global.TRACE&&trace("PathFinder",{roomName:this.name,prevTime:o,structures:this.structures.all.length,PathFinder:"CostMatrix"},"updated costmatrix"),this._structureMatrix=e}}return this._structureMatrix}},creepMatrix:{configurable:!0,get:function(){if(_.isUndefined(this._creepMatrix)){const e=Room.isSKRoom(this.name)?this.structureMatrix.clone():this.avoidSKMatrix.clone();this.allCreeps.forEach(function(t){e.set(t.pos.x,t.pos.y,255)}),this._creepMatrix=e}return this._creepMatrix}},avoidSKMatrix:{configurable:!0,get:function(){if(_.isUndefined(this._avoidSKMatrix)){const e=this.hostiles.filter(e=>"Source Keeper"===e.owner.username);this._avoidSKMatrix=this.getAvoidMatrix({"Source Keeper":e})}return this._avoidSKMatrix}},my:{configurable:!0,get:function(){return _.isUndefined(this._my)&&(this._my=this.controller&&this.controller.my),this._my}},reserved:{configurable:!0,get:function(){if(_.isUndefined(this._reserved))if(this.controller){const e=_.find(Game.spawns).owner.username;this._reserved=this.controller.my||this.controller.reservation&&this.controller.reservation.username===e}else this._reserved=!1;return this._reserved}},owner:{configurable:!0,get:function(){return _.isUndefined(this._owner)&&(this.controller&&this.controller.owner?this._owner=this.controller.owner.username:this._owner=!1),this._owner}},reservation:{configurable:!0,get:function(){return _.isUndefined(this._reservation)&&(this.controller&&this.controller.reservation?this._reservation=this.controller.reservation.username:this._reservation=!1),this._reservation}},ally:{configurable:!0,get:function(){return _.isUndefined(this._ally)&&(this.reserved?this._ally=!0:this.controller?this._ally=Task.reputation.isAlly(this.owner)||Task.reputation.isAlly(this.reservation):this._ally=!1),this._ally}},pavementArt:{configurable:!0,get:function(){return _.isUndefined(this.memory.pavementArt)&&(this.memory.pavementArt=[]),this.memory.pavementArt}},collapsed:{configurable:!0,get:function(){if(_.isUndefined(this._collapsed)){if(!this.my)return void(this._collapsed=!1);if(!this.population)return void(this._collapsed=!0);let e=this.population.typeCount.worker?this.population.typeCount.worker:0,t=this.population.typeCount.hauler?this.population.typeCount.hauler:0,o=this.population.typeCount.pioneer?this.population.typeCount.pioneer:0;this._collapsed=e+t+o===0}return this._collapsed}},RCL:{configurable:!0,get(){if(this.controller)return Util.get(this.memory,"RCL",this.controller.level)}}}),Room.prototype.checkRCL=function(){this.controller&&this.memory.RCL!==this.controller.level&&(Room.RCLChange.trigger(this),this.memory.RCL=this.controller.level)},Room.prototype.countMySites=function(){const e=_.size(this.myConstructionSites);_.isUndefined(this.memory.myTotalSites)||e===this.memory.myTotalSites||Room.costMatrixInvalid.trigger(this),e>0?this.memory.myTotalSites=e:delete this.memory.myTotalSites},Room.prototype.countMyStructures=function(){const e=_.size(this.structures.my);!_.isUndefined(this.memory.myTotalStructures)&&e<this.memory.myTotalStructures&&(Room.costMatrixInvalid.trigger(this),this.saveExtensions(),this.saveSpawns()),e>0?this.memory.myTotalStructures=e:delete this.memory.myTotalStructures},Room.prototype.getBorder=function(e){return _.findKey(Game.map.describeExits(this.name),function(e){return this.name===e},{name:e})},Room.prototype.find=function(t,o){return _.isArray(t)?_(t).map(t=>e.call(this,t,o)).flatten().value():e.apply(this,arguments)},Room.prototype.findRoute=function(e,t=true,o=true){if(this.name==e)return[];const i={checkOwner:t,preferHighway:o};return Game.map.findRoute(this,e,{routeCallback:Room.routeCallback(this.name,e,i)})},Room.prototype.recordMove=function(e){if(ROAD_CONSTRUCTION_ENABLE){let t=e.pos.x,o=e.pos.y;if(0!=t&&0!=o&&49!=t&&49!=o&&0!=e.carry.energy&&"building"!=e.data.actionName){let e=`${String.fromCharCode(32+t)}${String.fromCharCode(32+o)}_x${t}-y${o}`;this.roadConstructionTrace[e]?this.roadConstructionTrace[e]++:this.roadConstructionTrace[e]=1}}},Room.prototype.isWalkable=function(e,t,o){o=o?o[t][e]:this.lookAt(e,t);let i=e=>{return e.type==LOOK_TERRAIN&&"wall"==e.terrain||OBSTACLE_OBJECT_TYPES.includes(e[e.type].structureType)};return 0==o.filter(i).length},Room.prototype.exits=function(e,t){t===!0&&(t=.5);let o;o=0===e?_.chain(this.find(FIND_STRUCTURES)).filter(function(e){return e.structureType===STRUCTURE_PORTAL}).map("pos").value():this.find(e);let i,r,n={},s=-1;const a=[];for(let c=0;c<o.length;c++){const e=o[c];_.get(n,[e.x-1,e.y])||_.get(n,[e.x,e.y-1])||(t&&s!==-1&&(a[s].x+=Math.ceil(t*(i-a[s].x)),a[s].y+=Math.ceil(t*(r-a[s].y))),s++,a[s]=_.pick(e,["x","y"]),i=e.x,r=e.y,n={}),_.set(n,[e.x,e.y],!0),i=Math.max(i,e.x),r=Math.max(r,e.y)}return t&&s!==-1&&(a[s].x+=Math.ceil(t*(i-a[s].x)),a[s].y+=Math.ceil(t*(r-a[s].y))),a},Room.prototype.showCostMatrix=function(e,t){const o=this[e]||this.structureMatrix,i=new RoomVisual(this.name);let r=0,n=50,s=0,a=50;t&&(r=Math.max(0,t.y-3),n=Math.min(50,t.y+4),s=Math.max(0,t.x-3),a=Math.min(50,t.x+4));const c=_.max(o._bits),l=e=>{const t=(120*(1-e)).toString(10);return`hsl(${t}, 100%, 50%)`};for(var u=r;u<n;u++)for(var m=s;m<a;m++){const e=o.get(m,u);e&&i.text(e,m,u),i.rect(m-.5,u-.5,1,1,{fill:l(e/c)})}},Room.prototype.getAvoidMatrix=function(e){const t=this.structureMatrix.clone();for(const o in e){const i=e[o];for(const r of i)for(let n=Math.max(0,r.pos.x-3);n<=Math.min(49,r.pos.x+3);n++){const e=n<r.pos.x?r.pos.x-n:n-r.pos.x;for(let o=Math.max(0,r.pos.y-3);o<=Math.min(49,r.pos.y+3);o++){const i=o<r.pos.y?r.pos.y-o:o-r.pos.y,s=17-2*Math.max(e,i);t.set(n,o,s)}}}return t},Room.prototype.invalidateCostMatrix=function(){Room.costMatrixInvalid.trigger(this.name)},Room.prototype.highwayHasWalls=function(){return!!Room.isHighwayRoom(this.name)&&!!_.find(this.getPositionAt(25,25).lookFor(LOOK_STRUCTURES),e=>e instanceof StructureWall)},Room.prototype.isTargetAccessible=function(e,t){if(e&&t){e instanceof RoomObject&&(e=e.pos),t instanceof RoomObject&&(t=t.pos);for(const o of["x","y","roomName"])if(!Reflect.has(e,o)||!Reflect.has(t,o))return;if(Room.isHighwayRoom(this.name)){if(!this.highwayHasWalls())return!0;const[o,i]=Room.calcCoordinates(this.name,(e,t)=>[e,t]),r=e=>0===Math.floor(e.x/25)?LEFT:RIGHT,n=e=>0===Math.floor(e.y/25)?TOP:BOTTOM,s=e=>{const t=r(e),o=n(e);return t===LEFT?o===TOP?TOP_LEFT:BOTTOM_LEFT:o===TOP?TOP_RIGHT:BOTTOM_RIGHT};if(o%10===0){if(i%10===0){const o=!!_.find(this.getPositionAt(25,24).lookFor(LOOK_STRUCTURES),e=>e instanceof StructureWall),i=!!_.find(this.getPositionAt(24,25).lookFor(LOOK_STRUCTURES,e=>e instanceof StructureWall)),a=!!_.find(this.getPositionAt(25,26).lookFor(LOOK_STRUCTURES,e=>e instanceof StructureWall)),c=!!_.find(this.getPositionAt(26,25).lookFor(LOOK_STRUCTURES,e=>e instanceof StructureWall));if(s(e)===s(t))return!0;if(o&&i&&a&&c)return s(e)===s(t);if(o){if(a)return i?Util.areEqual(RIGHT,r(e),r(t)):Util.areEqual(LEFT,r(e),r(t));if(i&&c)return n(e)===n(t)&&Util.areEqual(BOTTOM,n(e),n(t));if(Util.areEqual(BOTTOM,n(e),n(t)))return!0;if(i){if(Util.areEqual(RIGHT,r(e),r(t)))return!0;if(s(e)===TOP_LEFT&&s(t)!==TOP_LEFT)return!1}else{if(Util.areEqual(LEFT,r(e),r(t)))return!0;if(s(e)===TOP_RIGHT&&s(t)!==TOP_RIGHT)return!1}}else{if(i&&c)return n(e)===n(t)&&Util.areEqual(TOP,n(e),n(t));if(Util.areEqual(TOP,n(e),n(t)))return!0;if(i){if(Util.areEqual(RIGHT,r(e),r(t)))return!0;if(s(e)===BOTTOM_LEFT&&s(t)!==BOTTOM_LEFT)return!1}else{if(Util.areEqual(LEFT,r(e),r(t)))return!0;if(s(e)===BOTTOM_RIGHT&&s(t)!==BOTTOM_RIGHT)return!1}}return!0}if(r(e)===r(t))return!0}return i%10===0&&n(e)===n(t),!0}}},Room.prototype.targetAccessible=function(e){if(e){e instanceof RoomObject&&(e=e.pos);for(const t of["x","y","roomName"])if(!Reflect.has(e,t))return;if(Room.isHighwayRoom(this.name)){if(!this.highwayHasWalls())return!0;const t=_(Game.rooms).filter("my").min(e=>Game.map.getRoomLinearDistance(e.name,this.name));if(t!==1/0){const[o,i]=Room.calcGlobalCoordinates(this.name,(e,t)=>[e,t]),[r,n]=Room.calcGlobalCoordinates(t,(e,t)=>[e,t]);let s="";if(i-n<0?s+="south":i-n>0&&(s+="north"),o-r<0?s+="east":o-r>0&&(s+="west"),o%10===0){if(i%10===0){if(s.includes("south")&&s.includes("east"))return this.isTargetAccessible(this.getPositionAt(49,49),e);if(s.includes("south")&&s.includes("west"))return this.isTargetAccessible(this.getPositionAt(0,49),e);if(s.includes("north")&&s.includes("east"))return this.isTargetAccessible(this.getPositionAt(49,0),e);if(s.includes("north")&&s.includes("west"))return this.isTargetAccessible(this.getPositionAt(0,0),e)}if(s.includes("east"))return this.isTargetAccessible(this.getPositionAt(49,25),e);if(s.includes("west"))return this.isTargetAccessible(this.getPositionAt(0,25),e)}if(i%10===0){if(s.includes("south"))return this.isTargetAccessible(this.getPositionAt(25,49),e);if(s.includes("north"))return this.isTargetAccessible(this.getPositionAt(25,0),e)}return!0}}}}},t.flush=function(){for(const e of Object.keys(Room._ext))Room._ext[e].flush&&Room._ext[e].flush();let t=e=>{for(const t of Object.keys(Room._ext))Room._ext[t].flushRoom&&Room._ext[t].flushRoom(e)};_.forEach(Game.rooms,t)},t.totalSitesChanged=function(){const e=_.size(Game.constructionSites),t=Memory.rooms.myTotalSites||0;return e>0?Memory.rooms.myTotalSites=e:delete Memory.rooms.myTotalSites,t&&t!==e},t.totalStructuresChanged=function(){const e=_.size(Game.structures),t=Memory.rooms.myTotalStructures||0;return e>0?Memory.rooms.myTotalStructures=e:delete Memory.rooms.myTotalStructures,t&&t!==e},t.needMemoryResync=function(e){return _.isUndefined(e.memory.initialized)?(e.memory.initialized=Game.time,!0):Game.time%global.MEMORY_RESYNC_INTERVAL===0||"sim"==e.name},t.analyze=function(){const e=Util.startProfiling("Room.analyze",{enabled:PROFILING.ROOMS});for(const t of Object.keys(Room._ext))Room._ext[t].analyze&&Room._ext[t].analyze();const o=Room.totalSitesChanged(),i=Room.totalStructuresChanged(),r=e=>{try{const t=Room.needMemoryResync(e);for(const r of Object.keys(Room._ext))Room._ext[r].analyzeRoom&&Room._ext[r].analyzeRoom(e,t);o&&e.countMySites(),i&&e.countMyStructures(),e.checkRCL()}catch(t){Game.notify('Error in room.js (Room.prototype.loop) for "'+e.name+'" : '+t.stack?t+"<br/>"+t.stack:t),console.log(dye(CRAYON.error,'Error in room.js (Room.prototype.loop) for "'+e.name+'": <br/>'+(t.stack||t.toString())+"<br/>"+t.stack))}};_.forEach(Game.rooms,t=>{r(t),e.checkCPU(t.name,PROFILING.ANALYZE_LIMIT/5)})},t.execute=function(){const e=Util.startProfiling("Room.execute",{enabled:PROFILING.ROOMS});for(const t of Object.keys(Room._ext))Room._ext[t].execute&&Room._ext[t].execute();let o=(e,t)=>{try{for(const o of Object.keys(Room._ext))Room._ext[o].executeRoom&&Room._ext[o].executeRoom(e,t);const i=Game.rooms[t];if(i&&i.collapsed){const e=Util.startProfiling(t+"execute",{enabled:PROFILING.ROOMS});Room.collapsed.trigger(i),e.checkCPU("collapsed",.5)}}catch(e){Util.logError(e.stack||e.message)}};_.forEach(Memory.rooms,(t,i)=>{o(t,i),e.checkCPU(i+".run",1)})},t.cleanup=function(){for(const e of Object.keys(Room._ext))Room._ext[e].cleanup&&Room._ext[e].cleanup();if(_.isUndefined(Memory.pathfinder)||(OCSMemory.saveSegment(MEM_SEGMENTS.COSTMATRIX_CACHE,Memory.pathfinder),delete Memory.pathfinder),Room.pathfinderCacheDirty&&Room.pathfinderCacheLoaded){let e={};for(const t in Room.pathfinderCache){const o=Room.pathfinderCache[t];o.version===Room.COSTMATRIX_CACHE_VERSION&&(e[t]={serializedMatrix:o.serializedMatrix||o.costMatrix.serialize(),updated:o.updated,version:o.version})}OCSMemory.saveSegment(MEM_SEGMENTS.COSTMATRIX_CACHE,e),Room.pathfinderCacheDirty=!1}},t.routeCallback=function(e,o,i){return(_.isUndefined(e)||_.isUndefined(o))&&logError("Room.routeCallback","both origin and destination must be defined - origin:"+e+" destination:"+o),function(r){if(Game.map.getRoomLinearDistance(e,r)>i.restrictDistance)return!1;if(r!==o&&ROUTE_ROOM_COST[r])return ROUTE_ROOM_COST[r];let n=!1;if(i.preferHighway){const e=/^[WE]([0-9]+)[NS]([0-9]+)$/.exec(r);n=e[1]%10===0||e[2]%10===0}let s=!1;const a=_.get(Memory.rooms[r],"hostile",!1);if(i.checkOwner){const e=Game.rooms[r];s=!a||e&&e.controller&&(e.controller.my||void 0===e.controller.owner)}return!i.allowSK&&t.isSKRoom(r)?10:!i.allowHostile&&a&&r!==o&&r!==e?Number.POSITIVE_INFINITY:s||r==e||r==o?1:n?3:Game.map.isRoomAvailable(r)?i.checkOwner||i.preferHighway?11:1:Number.POSITIVE_INFINITY}},t.getCostMatrix=function(e){var t=Game.rooms[e];if(t)return t.costMatrix},t.isMine=function(e){let t=Game.rooms[e];return t&&t.my},t.calcCardinalDirection=function(e){const t=/^([WE])[0-9]+([NS])[0-9]+$/.exec(e);return[t[1],t[2]]},t.calcGlobalCoordinates=function(e,t){if(!t)return null;const o=/^[WE]([0-9]+)[NS]([0-9]+)$/.exec(e),i=+o[1],r=+o[2];return t(i,r)},t.calcCoordinates=function(e,t){return t?Room.calcGlobalCoordinates(e,(e,o)=>{return t(e%10,o%10)}):null},t.isCenterRoom=function(e){return Room.calcCoordinates(e,(e,t)=>{return 5===e&&5===t})},t.isCenterNineRoom=function(e){return Room.calcCoordinates(e,(e,t)=>{return e>3&&e<7&&t>3&&t<7})},t.isControllerRoom=function(e){return Room.calcCoordinates(e,(e,t)=>{return 0!==e&&0!==t&&(e<4||e>6||t<4||t>6)})},t.isSKRoom=function(e){return Room.calcCoordinates(e,(e,t)=>{return e>3&&e<7&&t>3&&t<7&&(5!==e||5!==t)})},t.isHighwayRoom=function(e){return Room.calcCoordinates(e,(e,t)=>{return 0===e||0===t})},t.adjacentRooms=function(e){let t=e.split(/([NESW])/),o=["N","E","S","W"],i=e=>o[(o.indexOf(e)+2)%4],r=[];for(let n=parseInt(t[2])-1;n<parseInt(t[2])+2;n++)for(let s=parseInt(t[4])-1;s<parseInt(t[4])+2;s++)r.push((n<0?i(t[1])+"0":t[1]+n)+(s<0?i(t[3])+"0":t[3]+s));return r},t.adjacentAccessibleRooms=function(e,t=true){let o=[],i=Game.map.describeExits(e),r=(e,i)=>{if(t){let t=Game.map.describeExits(e),r=(i+1)%8+1,n=(i+5)%8+1;t&&t[r]&&!o.includes(t[r])&&o.push(t[r]),t&&t[n]&&!o.includes(t[n])&&o.push(t[n])}o.push(e)};return _.forEach(i,r),o},t.roomDistance=function(e,t,o,i){if(o)return Game.map.getRoomLinearDistance(e,t,i);if(e==t)return 0;let r=e.split(/([NESW])/),n=t.split(/([NESW])/),s=r[1]==n[1]?Math.abs(r[2]-n[2]):r[2]+n[2]+1,a=r[3]==n[3]?Math.abs(r[4]-n[4]):r[4]+n[4]+1;return s+a},t.rebuildCostMatrix=function(e){global.DEBUG&&logSystem(e,"Removing invalid costmatrix to force a rebuild."),Room.pathfinderCache[e]={},Room.pathfinderCacheDirty=!0},t.loadCostMatrixCache=function(e){let t=0;for(const o in e)(!Room.pathfinderCache[o]||Room.pathfinderCache[o].updated<e[o].updated)&&(t++,Room.pathfinderCache[o]=e[o]);global.DEBUG&&t>0&&logSystem("RawMemory","loading pathfinder cache.. updated "+t+" stale entries."),Room.pathfinderCacheLoaded=!0},t.getCachedStructureMatrix=function(e){const t=e=>{if(_.isUndefined(Room.pathfinderCache))return Room.pathfinderCache={},Room.pathfinderCache[e]={},!1;if(_.isUndefined(Room.pathfinderCache[e]))return Room.pathfinderCache[e]={},!1;const t=Room.pathfinderCache[e],o=Game.time-t.updated;return!!(t.version===Room.COSTMATRIX_CACHE_VERSION&&(t.serializedMatrix||t.costMatrix)&&o<COST_MATRIX_VALIDITY)&&(global.DEBUG&&global.TRACE&&trace("PathFinder",{roomName:e,ttl:o,PathFinder:"CostMatrix"},"cached costmatrix"),!0)},o=Room.pathfinderCache[e];if(o){if(o.costMatrix)return{costMatrix:o.costMatrix,valid:t(e)};{const i=PathFinder.CostMatrix.deserialize(o.serializedMatrix);return o.costMatrix=i,{costMatrix:i,valid:t(e)}}}},t.getStructureMatrix=function(e,t){const o=Game.rooms[e];let i;return i=Room.isSKRoom(e)&&t.avoidSK?_.get(o,"avoidSKMatrix"):_.get(o,"structureMatrix"),i||(i=_.get(Room.getCachedStructureMatrix(e),"costMatrix")),i},t.validFields=function(e,t,o,i,r,n=false,s=null){const a=Game.rooms[e],c=n?a.lookAtArea(i,t,r,o):null;let l=[];for(let u=t;u<=o;u++)for(let m=i;m<=r;m++)if(u>1&&u<48&&m>1&&m<48&&(!n||a.isWalkable(u,m,c))){let t=new RoomPosition(u,m,e);s&&!s(t)||l.push(t)}return l},t.fieldsInRange=function(e){let t=e.spots.map(e=>e.pos.x+e.range),o=e.spots.map(e=>e.pos.y+e.range),i=e.spots.map(e=>e.pos.x-e.range),r=e.spots.map(e=>e.pos.y-e.range),n=Math.max(...i),s=Math.min(...t),a=Math.max(...r),c=Math.min(...o);return Room.validFields(e.roomName,n,s,a,c,e.checkWalkable,e.where)};