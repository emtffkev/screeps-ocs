const e=load("strategy");let t={};module.exports=t,t.extend=function(){Creep.prototype.assignAction=function(e,t){if("string"==typeof e&&(e=Creep.action[e]),e&&e instanceof Creep.Action)return e.assign(this,t)},Creep.prototype.findGroupMemberByType=function(e,t){return Creep.prototype.findGroupMemberBy(t=>t.creepType===e,t)},Creep.prototype.findGroupMemberBy=function(e,t){if(_.isUndefined(t)&&(t=this.data.flagName),!_.isUndefined(e)&&t){const o=_(Memory.population).filter({flagName:t}).find(e);return o?o.creepName:null}return Util.logError(`${this.name} - Invalid arguments for Creep.findGroupMemberBy ${t} ${e}`),null},Creep.prototype.findByType=function(e){let t;for(let o in Memory.population)if(t=Memory.population[o],t.creepType===e)return o},Creep.prototype.hasActiveBodyparts=function(e){return this.hasBodyparts(e,this.body.length-Math.ceil(.01*this.hits))},Creep.prototype.hasBodyparts=function(e,t=0){const o=this.body,r=o.length;Array.isArray(e)||(e=[e]);for(let i=t;i<r;i++)if(e.includes(o[i].type))return!0;return!1},Creep.prototype.run=function(t){if(!this.spawning){if(!t&&this.data&&this.data.creepType&&(t=Creep.behaviour[this.data.creepType],Memory.CPU_CRITICAL&&!CRITICAL_ROLES.includes(this.data.creepType)))return;const e=Util.startProfiling("Creep.run",{enabled:PROFILING.CREEPS}),r=Util.startProfiling(this.name+".run",{enabled:this.data&&this.data.creepType&&PROFILING.CREEP_TYPE===this.data.creepType});if(this.data&&!_.contains(["remoteMiner","miner","upgrader"],this.data.creepType)&&(this.repairNearby(),r.checkCPU("repairNearby",PROFILING.MIN_THRESHOLD)),global.DEBUG&&global.TRACE&&trace("Creep",{creepName:this.name,pos:this.pos,Behaviour:t&&t.name,Creep:"run"}),t)t.run(this),r.checkCPU("behaviour.run",PROFILING.MIN_THRESHOLD);else if(!this.data){global.DEBUG&&global.TRACE&&trace("Creep",{creepName:this.name,pos:this.pos,Creep:"run"},"memory init");let e=this.memory.setup,t=this.memory.cost,i=this.memory.home,a=this.memory.mother,n=this.memory.breeding;if(e&&t&&i&&a&&n){var o=Population.setCreep({creepName:this.name,creepType:e,weight:t,roomName:this.pos.roomName,homeRoom:i,motherSpawn:a,actionName:this.action?this.action.name:null,targetId:this.target?this.target.id||this.target.name:null,spawningTime:n,flagName:null,body:_.countBy(this.body,"type")});Population.countCreep(this.room,o)}else{console.log(dye(CRAYON.error,"Corrupt creep without population entry!! : "+this.name),Util.stack());let e=_.countBy(this.body,"type");if(e[WORK]&&e[CARRY]){let t=e[WORK]*BODYPART_COST[WORK]+e[CARRY]*BODYPART_COST[CARRY]+e[MOVE]*BODYPART_COST[MOVE];var o=Population.setCreep({creepName:this.name,creepType:"worker",weight:t,roomName:this.pos.roomName,homeRoom:this.pos.roomName,motherSpawn:null,actionName:null,targetId:null,spawningTime:-1,flagName:null,body:_.countBy(this.body,"type")});Population.countCreep(this.room,o)}else this.suicide();r.checkCPU("!this.data",PROFILING.MIN_THRESHOLD)}}this.flee&&(this.fleeMove(),r.checkCPU("fleeMove",PROFILING.MIN_THRESHOLD),Creep.behaviour.ranger.heal(this),r.checkCPU("heal",PROFILING.MIN_THRESHOLD),SAY_ASSIGNMENT&&this.say(String.fromCharCode(10133),SAY_PUBLIC)),e.checkCPU(this.name,PROFILING.EXECUTE_LIMIT/3,this.data?this.data.creepType:"noType")}e.freeStrategy(this)},Creep.prototype.leaveBorder=function(){let e=0;return 0===this.pos.y?e=BOTTOM:0===this.pos.x?e=RIGHT:49===this.pos.y?e=TOP:49===this.pos.x&&(e=LEFT),e&&this.move(e),e},Creep.prototype.honk=function(){HONK&&this.say("⛔︎",SAY_PUBLIC)},Creep.prototype.honkEvade=function(){HONK&&this.say("🔀︎",SAY_PUBLIC)},Creep.prototype.fleeMove=function(){global.DEBUG&&global.TRACE&&trace("Creep",{creepName:this.name,pos:this.pos,Action:"fleeMove",Creep:"run"});let e=e=>{this.carry[e]>0&&this.drop(e)};if(_.forEach(Object.keys(this.carry),e),!(this.fatigue>0)){let e;if(!this.data.fleePath||this.data.fleePath.length<2||this.data.fleePath[0].x!=this.pos.x||this.data.fleePath[0].y!=this.pos.y||this.data.fleePath[0].roomName!=this.pos.roomName){let t=_.map(this.room.hostiles,function(e){return{pos:e.pos,range:5}}),o=PathFinder.search(this.pos,t,{flee:!0,plainCost:2,swampCost:10,maxOps:500,maxRooms:2,roomCallback:function(e){let t=Game.rooms[e];if(t)return t.creepMatrix}});e=o.path,this.data.fleePath=e}else this.data.fleePath.shift(),e=this.data.fleePath;e&&e.length>0&&this.move(this.pos.getDirectionTo(new RoomPosition(e[0].x,e[0].y,e[0].roomName)))}},Creep.prototype.idleMove=function(){if(!(this.fatigue>0)){let e=_.chain(this.room.structures.piles).filter("pos",this.pos).concat(this.room.lookForAt(LOOK_STRUCTURES,this.pos)).concat(this.room.lookForAt(LOOK_CONSTRUCTION_SITES,this.pos,{filter:e=>e.my})).value();if(e&&e.length>0){let e;if(!this.data.idlePath||this.data.idlePath.length<2||this.data.idlePath[0].x!=this.pos.x||this.data.idlePath[0].y!=this.pos.y||this.data.idlePath[0].roomName!=this.pos.roomName){let t=this.room.structures.all.map(function(e){return{pos:e.pos,range:1}}).concat(this.room.sources.map(function(e){return{pos:e.pos,range:2}})).concat(this.pos.findInRange(FIND_EXIT,2).map(function(e){return{pos:e,range:1}})).concat(this.room.myConstructionSites.map(function(e){return{pos:e.pos,range:1}})),o=PathFinder.search(this.pos,t,{flee:!0,plainCost:2,swampCost:10,maxOps:350,maxRooms:1,roomCallback:function(e){let t=Game.rooms[e];if(t)return t.creepMatrix}});e=o.path,this.data.idlePath=e}else this.data.idlePath.shift(),e=this.data.idlePath;e&&e.length>0&&this.move(this.pos.getDirectionTo(new RoomPosition(e[0].x,e[0].y,e[0].roomName)))}}},Creep.prototype.repairNearby=function(){if(!this.room.controller||!this.room.controller.owner||this.room.my||this.room.reserved||this.room.ally)if(this.carry.energy>0&&this.hasActiveBodyparts(WORK)){const e=this.data&&"remoteHauler"===this.data.creepType?REMOTE_HAULER.DRIVE_BY_REPAIR_RANGE:DRIVE_BY_REPAIR_RANGE;let t=this.pos.findInRange(this.room.structures.repairable,e);if(t&&t.length)global.DEBUG&&global.TRACE&&trace("Creep",{creepName:this.name,Action:"repairing",Creep:"repairNearby"},t[0].pos),this.repair(t[0]);else if(global.DEBUG&&global.TRACE&&trace("Creep",{creepName:this.name,Action:"repairing",Creep:"repairNearby"},"none"),REMOTE_HAULER.DRIVE_BY_BUILDING&&this.data&&"remoteHauler"===this.data.creepType){let e=this.pos.findInRange(this.room.myConstructionSites,REMOTE_HAULER.DRIVE_BY_BUILD_RANGE,{filter:e=>{return e.my&&REMOTE_HAULER.DRIVE_BY_BUILD_ALL||e.structureType===STRUCTURE_CONTAINER||e.structureType===STRUCTURE_ROAD}});e&&e.length?(global.DEBUG&&global.TRACE&&trace("Creep",{creepName:this.name,Action:"building",Creep:"buildNearby"},e[0].pos),this.build(e[0])===OK&&this.carry.energy<=this.getActiveBodyparts(WORK)*BUILD_POWER&&Creep.action.idle.assign(this)):global.DEBUG&&global.TRACE&&trace("Creep",{creepName:this.name,Action:"building",Creep:"buildNearby"},"none")}}else global.DEBUG&&global.TRACE&&trace("Creep",{creepName:this.name,pos:this.pos,Action:"repairing",Creep:"repairNearby"},"no WORK")},Creep.prototype.controllerSign=function(){const e=Util.fieldOrFunction(CONTROLLER_SIGN_MESSAGE,this.room);CONTROLLER_SIGN&&(!this.room.controller.sign||this.room.controller.sign.username!==this.owner.username||CONTROLLER_SIGN_UPDATE&&this.room.controller.sign.text!==e)&&this.signController(this.room.controller,e)},Object.defineProperties(Creep.prototype,{flee:{configurable:!0,get:function(){if(this.data)return this.data.flee?this.data.flee=this.hits!=this.hitsMax:this.data.flee=this.hits/this.hitsMax<.35,this.data.flee},set:function(e){this.data.flee=e}},sum:{configurable:!0,get:function(){return(_.isUndefined(this._sum)||this._sumSet!=Game.time)&&(this._sumSet=Game.time,this._sum=_.sum(this.carry)),this._sum}},threat:{configurable:!0,get:function(){return _.isUndefined(this._threat)&&(this._threat=Creep.bodyThreat(this.body)),this._threat}},trace:{configurable:!0,get:function(){return Memory.debugTrace.creepName===this.name},set:function(e){e?Memory.debugTrace.creepName=this.name:this.trace&&delete Memory.debugTrace.creepName}}}),Creep.prototype.handleError=function(e){Creep.resolvingError||(this.resolvingError=e,e.preventDefault=function(){Creep.resolvingError=null},Creep.error.trigger(e),Creep.resolvingError&&(global.DEBUG&&logErrorCode(this,e.errorCode),delete this.data.actionName,delete this.data.targetId,Creep.resolvingError=null))},e.decorateAgent(Creep.prototype,{default:e=>e.action&&e.action.name,selector:e=>Creep.action[e]},{default:e=>e.data.creepType,selector:e=>Creep.behaviour[e]&&Creep.behaviour[e]},{default:e=>e.data.destiny&&e.data.destiny.task,selector:e=>Task[e]&&Task[e]}),Creep.prototype.explainAgent=function(){return`ttl:${this.ticksToLive} pos:${this.pos}`},Creep.prototype.staticCustomStrategy=function(e,t,o){},Creep.prototype.customStrategy=function(e,t,o){}},t.execute=function(){global.DEBUG&&Memory.CPU_CRITICAL&&logSystem("system",`${Game.time}: CPU Bucket level is critical (${Game.cpu.bucket}). Skipping non critical creep roles.`);let e=e=>{try{e.run()}catch(t){console.log('<span style="color:FireBrick">Creep '+e.name+(t.stack||t.toString())+"</span>",Util.stack())}};_.forEach(Game.creeps,e)},t.bodyCosts=function(e){let t=0;return e&&e.forEach(function(e){t+=BODYPART_COST[e]}),t},t.multi=function(e,t){let o,r=Creep.bodyCosts(t.fixedBody),i=Creep.bodyCosts(t.multiBody);if(t&&t.minThreat){let e=Creep.bodyThreat(t.fixedBody),r=Creep.bodyThreat(t.multiBody);o=0;let i=e;for(;i<t.minThreat;)o+=1,i+=r}else o=1/0;if(0===i)return 0;let a=Math.floor((50-t.fixedBody.length)/t.multiBody.length),n=t.currentEnergy?e.energyAvailable:e.energyCapacityAvailable,s=Math.floor((n-r)/i),p=t&&t.maxWeight?Math.floor((t.maxWeight-r)/i):1/0,h=t&&t.maxMulti?t.maxMulti:1/0;return _.min([a,s,o,p,h])},t.partsComparator=function(e,t){let o=[TOUGH,CLAIM,WORK,CARRY,ATTACK,RANGED_ATTACK,HEAL,MOVE],r=o.indexOf(e),i=o.indexOf(t);return r-i},t.formatParts=function(e){if(e&&!Array.isArray(e)&&"object"==typeof e){const t=[];for(const o of BODYPARTS_ALL)o in e&&t.push(..._.times(e[o],e=>o));e=t}return e},t.formatBody=function(e,t){return e=Creep.formatParts(e),t=Creep.formatParts(t),{fixedBody:e,multiBody:t}},t.compileBody=function(e,t,o=true){const{fixedBody,multiBody}=Creep.formatBody(t.fixedBody||[],t.multiBody||[]);_.assign(t,{fixedBody:fixedBody,multiBody:multiBody}),void 0!==t.sort&&(o=t.sort);let r=[],i=Creep.multi(e,t);for(let a=0;a<i;a++)r=r.concat(t.multiBody);for(let n=0;n<t.fixedBody.length;n++)r[r.length]=t.fixedBody[n];if(o){const e="function"==typeof o?o:Creep.partsComparator;r.sort(e)}if(r.includes(HEAL)){let e=r.indexOf(HEAL);r.splice(e,1),r.push(HEAL)}return r},t.partThreat={move:{common:0,boosted:0},work:{common:1,boosted:3},carry:{common:0,boosted:0},attack:{common:2,boosted:5},ranged_attack:{common:2,boosted:5},heal:{common:4,boosted:10},claim:{common:1,boosted:3},tough:{common:1,boosted:3},tower:25},t.bodyThreat=function(e){let t=0,o=e=>{t+=Creep.partThreat[e.type?e.type:e][e.boost?"boosted":"common"]};return e&&e.forEach(o),t},t.register=function(){for(const e in Creep.action)Creep.action[e].register&&Creep.action[e].register(this);for(const t in Creep.behaviour)Creep.behaviour[t].register&&Creep.behaviour[t].register(this);for(const o in Creep.setup)Creep.setup[o].register&&Creep.setup[o].register(this)};